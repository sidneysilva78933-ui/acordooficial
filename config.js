/* ===== Configuração do funil SERASA LIMPA NOME =====
   Edite aqui os IDs de pixel. Valores dos produtos são os da oferta original. */
window.SR_CONFIG = {
  META_PIXEL_ID: '',
  LOWTRACK_PIXEL_IDS: ['lt_px_1c8535a89a67', 'lt_px_ba5055685982', 'lt_px_92aaeeca0fa0'],
  UTMIFY_PIXEL_ID: '679fb0f4bbdfc9f47bf2c735',
  ACORDO_CODE: 'X1KAL-10S--',
  CONTRACT: 'ACC.3289898302-2026',
  ACORDO_PRICE: 27.90,
  ACORDO_DOWNSELL_PRICE: 34.90
};
(function(){
  var C = window.SR_CONFIG;
  /* Meta Pixel — so injeta se a pagina ainda nao tiver o snippet na <head>. */
  if (C.META_PIXEL_ID && typeof window.fbq !== 'function') {
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', C.META_PIXEL_ID); fbq('track', 'PageView');
  }
  /* UTMify pixel.js — so injeta se a pagina ainda nao tiver carregado. */
  if (C.UTMIFY_PIXEL_ID && C.UTMIFY_PIXEL_ID !== 'COLOQUE_SEU_PIXEL_ID') {
    if (!window.pixelId) window.pixelId = C.UTMIFY_PIXEL_ID;
    if (!document.querySelector('script[src*="cdn.utmify.com.br/scripts/pixel/pixel.js"]')) {
      var a = document.createElement('script'); a.async = true; a.defer = true; a.src = 'https://cdn.utmify.com.br/scripts/pixel/pixel.js'; document.head.appendChild(a);
    }
  }
  // utms/latest.js agora e carregado pelo script oficial da UTMify na <head> de cada pagina (zip 80).
})();
