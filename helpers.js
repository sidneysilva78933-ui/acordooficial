/* ===== Helpers do Funil PIX ===== */

function maskCPF(v) {
  var d = v.replace(/\D/g, '').slice(0, 11);
  return d
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

function isValidCPF(raw) {
  var cpf = raw.replace(/\D/g, '');
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  var s = 0;
  for (var i = 0; i < 9; i++) s += parseInt(cpf[i]) * (10 - i);
  var d1 = (s * 10) % 11; if (d1 === 10) d1 = 0;
  if (d1 !== parseInt(cpf[9])) return false;
  s = 0;
  for (var i = 0; i < 10; i++) s += parseInt(cpf[i]) * (11 - i);
  var d2 = (s * 10) % 11; if (d2 === 10) d2 = 0;
  return d2 === parseInt(cpf[10]);
}

function formatBRL(v) {
  return 'R$ ' + v.toFixed(2).replace('.', ',');
}

function padZero(n) {
  return n < 10 ? '0' + n : '' + n;
}

/* Countdown global */
function startCountdown(elementId, seconds, onExpire) {
  var el = document.getElementById(elementId);
  if (!el) return;
  var left = seconds;
  function tick() {
    if (left <= 0) {
      el.textContent = '00:00';
      if (onExpire) onExpire();
      return;
    }
    var mm = padZero(Math.floor(left / 60));
    var ss = padZero(left % 60);
    el.textContent = mm + ':' + ss;
    left--;
    setTimeout(tick, 1000);
  }
  tick();
}

/* CPF input mask */
function bindCpfMask(inputId) {
  var input = document.getElementById(inputId);
  if (!input) return;
  input.addEventListener('input', function() {
    this.value = maskCPF(this.value);
  });
}

/* Gera CPF válido aleatório (para PIX instantâneo sem formulário) */
function genCPF() {
  function r() { return Math.floor(Math.random() * 9); }
  var d = [];
  for (var i = 0; i < 9; i++) d.push(r());
  var s = 0; for (var i = 0; i < 9; i++) s += d[i] * (10 - i);
  var d1 = (s * 10) % 11; if (d1 === 10) d1 = 0; d.push(d1);
  s = 0; for (var i = 0; i < 10; i++) s += d[i] * (11 - i);
  var d2 = (s * 10) % 11; if (d2 === 10) d2 = 0; d.push(d2);
  return d.join('');
}

/* FAQ Accordion */
function initFaqAccordion() {
  document.querySelectorAll('.faq-toggle').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var answer = this.nextElementSibling;
      var icon = this.querySelector('.faq-icon');
      var isOpen = answer.style.display === 'block';
      document.querySelectorAll('.faq-answer').forEach(function(a) { a.style.display = 'none'; });
      document.querySelectorAll('.faq-icon').forEach(function(i) { i.textContent = '+'; });
      if (!isOpen) {
        answer.style.display = 'block';
        if (icon) icon.textContent = '\u2212';
      }
    });
  });
}

/* =============================================================================
 * EXIT TRAP (anti-abandono) — segura o lead no trilho do funil.
 * 1a tentativa de sair (botao voltar / gesto): abre o downsell (onFirstExit).
 * 2a tentativa: em vez de deixar sair, empurra para a proxima etapa (nextUrl).
 * Assim o lead NUNCA escapa do funil — ou ve o downsell, ou avanca.
 * Obs.: navegadores nao permitem redirecionar em beforeunload; o metodo de
 * trap do historico (pushState + popstate) e o unico confiavel no mobile.
 * ========================================================================== */
function initExitTrap(opts) {
  opts = opts || {};
  var fired = 0;
  function pushGuard() { try { history.pushState({ __et: 1 }, '', location.href); } catch (e) {} }
  pushGuard();
  window.addEventListener('popstate', function () {
    fired++;
    pushGuard(); // re-arma: impede a saida efetiva
    if (fired === 1 && typeof opts.onFirstExit === 'function') {
      opts.onFirstExit();
    } else if (opts.nextUrl) {
      window.location.href = opts.nextUrl;
    }
  });
  // Reforco: ao voltar o foco/aba, garante o guard armado.
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') pushGuard();
  });
}

/* UTM tracking - captura e salva UTMs do URL */
(function(){
  var STORAGE_KEY='funil_utms';
  var UTM_PARAMS=['utm_id','utm_source','utm_medium','utm_campaign','utm_content','utm_term','src','sck'];
  function getCookie(n){var m=document.cookie.match('(?:^|; )'+n.replace(/([.$?*|{}()\[\]\\/+^])/g,'\\$1')+'=([^;]*)');return m?decodeURIComponent(m[1]):'';}
  function getUrlParams(){var p={};try{new URLSearchParams(location.search).forEach(function(v,k){if(v)p[k]=v;});}catch(e){}return p;}
  function captureAndSave(){var stored={};try{stored=JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}');}catch(e){stored={};}
    var u=getUrlParams(),changed=false;
    for(var i=0;i<UTM_PARAMS.length;i++){var k=UTM_PARAMS[i];if(u[k]){stored[k]=u[k];changed=true;}}
    if(u['fbclid']){stored['fbc']='fb.1.'+Date.now()+'.'+u['fbclid'];changed=true;}
    var fc=getCookie('_fbc');if(fc){stored['fbc']=fc;changed=true;}
    var fp=getCookie('_fbp');if(fp){stored['fbp']=fp;changed=true;}
    if(changed)localStorage.setItem(STORAGE_KEY,JSON.stringify(stored));return stored;}
  window.__getTrackProps=function(isUpsell){var s={};try{s=JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}');}catch(e){s={};}
    var p={};p['isUpsell']=!!isUpsell;if(s['fbc'])p['fbc']=s['fbc'];if(s['fbp'])p['fbp']=s['fbp'];
    var utm=['utm_id','utm_source','utm_campaign','utm_medium','utm_content','utm_term'];
    for(var i=0;i<utm.length;i++){if(s[utm[i]])p[utm[i]]=s[utm[i]];}p['user_agent']=navigator.userAgent;return p;};
  captureAndSave();
})();

/* =============================================================================
 * UNLOCK DE VIDEO (robusto) — libera o botao da pagina depois de N segundos
 * REAIS, mesmo que o video entre em tela cheia ou a aba perca o foco.
 * Usa relogio real (Date.now) em vez de contador, entao NAO trava quando o
 * navegador do celular congela os timers durante o fullscreen do player.
 * Assim o lead nunca fica preso com o botao "Aguarde o video..." travado.
 *   unlockVideoBtn({ barId, ctaId, seconds, label }) 
 * ========================================================================== */
function unlockVideoBtn(o) {
  o = o || {};
  var bar = document.getElementById(o.barId);
  var cta = document.getElementById(o.ctaId);
  if (!cta) return;
  var total = (o.seconds || 15) * 1000;
  var start = Date.now();
  var label = o.label || 'Continuar \u2192';
  var baseCls = 'btn-primary w-full rounded-xl py-4 text-base' + (o.extraCls ? ' ' + o.extraCls : '');
  var scrolled = false;
  function unlock() {
    cta.disabled = false;
    cta.className = baseCls;
    cta.textContent = label;
    if (!scrolled) {
      scrolled = true;
      try { cta.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (e) { cta.scrollIntoView(); }
    }
  }
  function tick() {
    var elapsed = Date.now() - start;
    var pct = Math.min(100, (elapsed / total) * 100);
    if (bar) bar.style.width = pct + '%';
    if (elapsed >= total) { unlock(); return; }
    requestAnimationFrame(tick);
  }
  // Garante desbloqueio mesmo se a aba ficar em background o tempo todo.
  setTimeout(unlock, total + 200);
  requestAnimationFrame(tick);
  // Ao voltar o foco, recalcula a barra imediatamente.
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') {
      var elapsed = Date.now() - start;
      if (bar) bar.style.width = Math.min(100, (elapsed / total) * 100) + '%';
      if (elapsed >= total) unlock();
    }
  });
}
