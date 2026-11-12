/* ===== QR Code library (qrcode-generator@1.4.4) — EMBUTIDA no pix.js =====
   Embutida para eliminar dependencia de arquivo externo (qrcode.min.js).
   Assim o QR funciona mesmo que o arquivo separado nao seja enviado ao
   servidor, sem path resolution nem carregamento assincrono. */
(function(){
var qrcode=function(){var t=function(t,r){var e=t,n=g[r],o=null,i=0,a=null,u=[],f={},c=function(t,r){o=function(t){for(var r=new Array(t),e=0;e<t;e+=1){r[e]=new Array(t);for(var n=0;n<t;n+=1)r[e][n]=null}return r}(i=4*e+17),l(0,0),l(i-7,0),l(0,i-7),s(),h(),d(t,r),e>=7&&v(t),null==a&&(a=p(e,n,u)),w(a,r)},l=function(t,r){for(var e=-1;e<=7;e+=1)if(!(t+e<=-1||i<=t+e))for(var n=-1;n<=7;n+=1)r+n<=-1||i<=r+n||(o[t+e][r+n]=0<=e&&e<=6&&(0==n||6==n)||0<=n&&n<=6&&(0==e||6==e)||2<=e&&e<=4&&2<=n&&n<=4)},h=function(){for(var t=8;t<i-8;t+=1)null==o[t][6]&&(o[t][6]=t%2==0);for(var r=8;r<i-8;r+=1)null==o[6][r]&&(o[6][r]=r%2==0)},s=function(){for(var t=B.getPatternPosition(e),r=0;r<t.length;r+=1)for(var n=0;n<t.length;n+=1){var i=t[r],a=t[n];if(null==o[i][a])for(var u=-2;u<=2;u+=1)for(var f=-2;f<=2;f+=1)o[i+u][a+f]=-2==u||2==u||-2==f||2==f||0==u&&0==f}},v=function(t){for(var r=B.getBCHTypeNumber(e),n=0;n<18;n+=1){var a=!t&&1==(r>>n&1);o[Math.floor(n/3)][n%3+i-8-3]=a}for(n=0;n<18;n+=1){a=!t&&1==(r>>n&1);o[n%3+i-8-3][Math.floor(n/3)]=a}},d=function(t,r){for(var e=n<<3|r,a=B.getBCHTypeInfo(e),u=0;u<15;u+=1){var f=!t&&1==(a>>u&1);u<6?o[u][8]=f:u<8?o[u+1][8]=f:o[i-15+u][8]=f}for(u=0;u<15;u+=1){f=!t&&1==(a>>u&1);u<8?o[8][i-u-1]=f:u<9?o[8][15-u-1+1]=f:o[8][15-u-1]=f}o[i-8][8]=!t},w=function(t,r){for(var e=-1,n=i-1,a=7,u=0,f=B.getMaskFunction(r),c=i-1;c>0;c-=2)for(6==c&&(c-=1);;){for(var g=0;g<2;g+=1)if(null==o[n][c-g]){var l=!1;u<t.length&&(l=1==(t[u]>>>a&1)),f(n,c-g)&&(l=!l),o[n][c-g]=l,-1==(a-=1)&&(u+=1,a=7)}if((n+=e)<0||i<=n){n-=e,e=-e;break}}},p=function(t,r,e){for(var n=A.getRSBlocks(t,r),o=b(),i=0;i<e.length;i+=1){var a=e[i];o.put(a.getMode(),4),o.put(a.getLength(),B.getLengthInBits(a.getMode(),t)),a.write(o)}var u=0;for(i=0;i<n.length;i+=1)u+=n[i].dataCount;if(o.getLengthInBits()>8*u)throw"code length overflow. ("+o.getLengthInBits()+">"+8*u+")";for(o.getLengthInBits()+4<=8*u&&o.put(0,4);o.getLengthInBits()%8!=0;)o.putBit(!1);for(;!(o.getLengthInBits()>=8*u||(o.put(236,8),o.getLengthInBits()>=8*u));)o.put(17,8);return function(t,r){for(var e=0,n=0,o=0,i=new Array(r.length),a=new Array(r.length),u=0;u<r.length;u+=1){var f=r[u].dataCount,c=r[u].totalCount-f;n=Math.max(n,f),o=Math.max(o,c),i[u]=new Array(f);for(var g=0;g<i[u].length;g+=1)i[u][g]=255&t.getBuffer()[g+e];e+=f;var l=B.getErrorCorrectPolynomial(c),h=k(i[u],l.getLength()-1).mod(l);for(a[u]=new Array(l.getLength()-1),g=0;g<a[u].length;g+=1){var s=g+h.getLength()-a[u].length;a[u][g]=s>=0?h.getAt(s):0}}var v=0;for(g=0;g<r.length;g+=1)v+=r[g].totalCount;var d=new Array(v),w=0;for(g=0;g<n;g+=1)for(u=0;u<r.length;u+=1)g<i[u].length&&(d[w]=i[u][g],w+=1);for(g=0;g<o;g+=1)for(u=0;u<r.length;u+=1)g<a[u].length&&(d[w]=a[u][g],w+=1);return d}(o,n)};f.addData=function(t,r){var e=null;switch(r=r||"Byte"){case"Numeric":e=M(t);break;case"Alphanumeric":e=x(t);break;case"Byte":e=m(t);break;case"Kanji":e=L(t);break;default:throw"mode:"+r}u.push(e),a=null},f.isDark=function(t,r){if(t<0||i<=t||r<0||i<=r)throw t+","+r;return o[t][r]},f.getModuleCount=function(){return i},f.make=function(){if(e<1){for(var t=1;t<40;t++){for(var r=A.getRSBlocks(t,n),o=b(),i=0;i<u.length;i++){var a=u[i];o.put(a.getMode(),4),o.put(a.getLength(),B.getLengthInBits(a.getMode(),t)),a.write(o)}var g=0;for(i=0;i<r.length;i++)g+=r[i].dataCount;if(o.getLengthInBits()<=8*g)break}e=t}c(!1,function(){for(var t=0,r=0,e=0;e<8;e+=1){c(!0,e);var n=B.getLostPoint(f);(0==e||t>n)&&(t=n,r=e)}return r}())},f.createTableTag=function(t,r){t=t||2;var e="";e+='<table style="',e+=" border-width: 0px; border-style: none;",e+=" border-collapse: collapse;",e+=" padding: 0px; margin: "+(r=void 0===r?4*t:r)+"px;",e+='">',e+="<tbody>";for(var n=0;n<f.getModuleCount();n+=1){e+="<tr>";for(var o=0;o<f.getModuleCount();o+=1)e+='<td style="',e+=" border-width: 0px; border-style: none;",e+=" border-collapse: collapse;",e+=" padding: 0px; margin: 0px;",e+=" width: "+t+"px;",e+=" height: "+t+"px;",e+=" background-color: ",e+=f.isDark(n,o)?"#000000":"#ffffff",e+=";",e+='"/>';e+="</tr>"}return e+="</tbody>",e+="</table>"},f.createSvgTag=function(t,r,e,n){var o={};"object"==typeof arguments[0]&&(t=(o=arguments[0]).cellSize,r=o.margin,e=o.alt,n=o.title),t=t||2,r=void 0===r?4*t:r,(e="string"==typeof e?{text:e}:e||{}).text=e.text||null,e.id=e.text?e.id||"qrcode-description":null,(n="string"==typeof n?{text:n}:n||{}).text=n.text||null,n.id=n.text?n.id||"qrcode-title":null;var i,a,u,c,g=f.getModuleCount()*t+2*r,l="";for(c="l"+t+",0 0,"+t+" -"+t+",0 0,-"+t+"z ",l+='<svg version="1.1" xmlns="http://www.w3.org/2000/svg"',l+=o.scalable?"":' width="'+g+'px" height="'+g+'px"',l+=' viewBox="0 0 '+g+" "+g+'" ',l+=' preserveAspectRatio="xMinYMin meet"',l+=n.text||e.text?' role="img" aria-labelledby="'+y([n.id,e.id].join(" ").trim())+'"':"",l+=">",l+=n.text?'<title id="'+y(n.id)+'">'+y(n.text)+"</title>":"",l+=e.text?'<description id="'+y(e.id)+'">'+y(e.text)+"</description>":"",l+='<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>',l+='<path d="',a=0;a<f.getModuleCount();a+=1)for(u=a*t+r,i=0;i<f.getModuleCount();i+=1)f.isDark(a,i)&&(l+="M"+(i*t+r)+","+u+c);return l+='" stroke="transparent" fill="black"/>',l+="</svg>"},f.createDataURL=function(t,r){t=t||2,r=void 0===r?4*t:r;var e=f.getModuleCount()*t+2*r,n=r,o=e-r;return I(e,e,(function(r,e){if(n<=r&&r<o&&n<=e&&e<o){var i=Math.floor((r-n)/t),a=Math.floor((e-n)/t);return f.isDark(a,i)?0:1}return 1}))},f.createImgTag=function(t,r,e){t=t||2,r=void 0===r?4*t:r;var n=f.getModuleCount()*t+2*r,o="";return o+="<img",o+=' src="',o+=f.createDataURL(t,r),o+='"',o+=' width="',o+=n,o+='"',o+=' height="',o+=n,o+='"',e&&(o+=' alt="',o+=y(e),o+='"'),o+="/>"};var y=function(t){for(var r="",e=0;e<t.length;e+=1){var n=t.charAt(e);switch(n){case"<":r+="&lt;";break;case">":r+="&gt;";break;case"&":r+="&amp;";break;case'"':r+="&quot;";break;default:r+=n}}return r};return f.createASCII=function(t,r){if((t=t||1)<2)return function(t){t=void 0===t?2:t;var r,e,n,o,i,a=1*f.getModuleCount()+2*t,u=t,c=a-t,g={"██":"█","█ ":"▀"," █":"▄","  ":" "},l={"██":"▀","█ ":"▀"," █":" ","  ":" "},h="";for(r=0;r<a;r+=2){for(n=Math.floor((r-u)/1),o=Math.floor((r+1-u)/1),e=0;e<a;e+=1)i="█",u<=e&&e<c&&u<=r&&r<c&&f.isDark(n,Math.floor((e-u)/1))&&(i=" "),u<=e&&e<c&&u<=r+1&&r+1<c&&f.isDark(o,Math.floor((e-u)/1))?i+=" ":i+="█",h+=t<1&&r+1>=c?l[i]:g[i];h+="\n"}return a%2&&t>0?h.substring(0,h.length-a-1)+Array(a+1).join("▀"):h.substring(0,h.length-1)}(r);t-=1,r=void 0===r?2*t:r;var e,n,o,i,a=f.getModuleCount()*t+2*r,u=r,c=a-r,g=Array(t+1).join("██"),l=Array(t+1).join("  "),h="",s="";for(e=0;e<a;e+=1){for(o=Math.floor((e-u)/t),s="",n=0;n<a;n+=1)i=1,u<=n&&n<c&&u<=e&&e<c&&f.isDark(o,Math.floor((n-u)/t))&&(i=0),s+=i?g:l;for(o=0;o<t;o+=1)h+=s+"\n"}return h.substring(0,h.length-1)},f.renderTo2dContext=function(t,r){r=r||2;for(var e=f.getModuleCount(),n=0;n<e;n++)for(var o=0;o<e;o++)t.fillStyle=f.isDark(n,o)?"black":"white",t.fillRect(n*r,o*r,r,r)},f};t.stringToBytes=(t.stringToBytesFuncs={default:function(t){for(var r=[],e=0;e<t.length;e+=1){var n=t.charCodeAt(e);r.push(255&n)}return r}}).default,t.createStringToBytes=function(t,r){var e=function(){for(var e=S(t),n=function(){var t=e.read();if(-1==t)throw"eof";return t},o=0,i={};;){var a=e.read();if(-1==a)break;var u=n(),f=n()<<8|n();i[String.fromCharCode(a<<8|u)]=f,o+=1}if(o!=r)throw o+" != "+r;return i}(),n="?".charCodeAt(0);return function(t){for(var r=[],o=0;o<t.length;o+=1){var i=t.charCodeAt(o);if(i<128)r.push(i);else{var a=e[t.charAt(o)];"number"==typeof a?(255&a)==a?r.push(a):(r.push(a>>>8),r.push(255&a)):r.push(n)}}return r}};var r,e,n,o,i,a=1,u=2,f=4,c=8,g={L:1,M:0,Q:3,H:2},l=0,h=1,s=2,v=3,d=4,w=5,p=6,y=7,B=(r=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],e=1335,n=7973,i=function(t){for(var r=0;0!=t;)r+=1,t>>>=1;return r},(o={}).getBCHTypeInfo=function(t){for(var r=t<<10;i(r)-i(e)>=0;)r^=e<<i(r)-i(e);return 21522^(t<<10|r)},o.getBCHTypeNumber=function(t){for(var r=t<<12;i(r)-i(n)>=0;)r^=n<<i(r)-i(n);return t<<12|r},o.getPatternPosition=function(t){return r[t-1]},o.getMaskFunction=function(t){switch(t){case l:return function(t,r){return(t+r)%2==0};case h:return function(t,r){return t%2==0};case s:return function(t,r){return r%3==0};case v:return function(t,r){return(t+r)%3==0};case d:return function(t,r){return(Math.floor(t/2)+Math.floor(r/3))%2==0};case w:return function(t,r){return t*r%2+t*r%3==0};case p:return function(t,r){return(t*r%2+t*r%3)%2==0};case y:return function(t,r){return(t*r%3+(t+r)%2)%2==0};default:throw"bad maskPattern:"+t}},o.getErrorCorrectPolynomial=function(t){for(var r=k([1],0),e=0;e<t;e+=1)r=r.multiply(k([1,C.gexp(e)],0));return r},o.getLengthInBits=function(t,r){if(1<=r&&r<10)switch(t){case a:return 10;case u:return 9;case f:case c:return 8;default:throw"mode:"+t}else if(r<27)switch(t){case a:return 12;case u:return 11;case f:return 16;case c:return 10;default:throw"mode:"+t}else{if(!(r<41))throw"type:"+r;switch(t){case a:return 14;case u:return 13;case f:return 16;case c:return 12;default:throw"mode:"+t}}},o.getLostPoint=function(t){for(var r=t.getModuleCount(),e=0,n=0;n<r;n+=1)for(var o=0;o<r;o+=1){for(var i=0,a=t.isDark(n,o),u=-1;u<=1;u+=1)if(!(n+u<0||r<=n+u))for(var f=-1;f<=1;f+=1)o+f<0||r<=o+f||0==u&&0==f||a==t.isDark(n+u,o+f)&&(i+=1);i>5&&(e+=3+i-5)}for(n=0;n<r-1;n+=1)for(o=0;o<r-1;o+=1){var c=0;t.isDark(n,o)&&(c+=1),t.isDark(n+1,o)&&(c+=1),t.isDark(n,o+1)&&(c+=1),t.isDark(n+1,o+1)&&(c+=1),0!=c&&4!=c||(e+=3)}for(n=0;n<r;n+=1)for(o=0;o<r-6;o+=1)t.isDark(n,o)&&!t.isDark(n,o+1)&&t.isDark(n,o+2)&&t.isDark(n,o+3)&&t.isDark(n,o+4)&&!t.isDark(n,o+5)&&t.isDark(n,o+6)&&(e+=40);for(o=0;o<r;o+=1)for(n=0;n<r-6;n+=1)t.isDark(n,o)&&!t.isDark(n+1,o)&&t.isDark(n+2,o)&&t.isDark(n+3,o)&&t.isDark(n+4,o)&&!t.isDark(n+5,o)&&t.isDark(n+6,o)&&(e+=40);var g=0;for(o=0;o<r;o+=1)for(n=0;n<r;n+=1)t.isDark(n,o)&&(g+=1);return e+=Math.abs(100*g/r/r-50)/5*10},o),C=function(){for(var t=new Array(256),r=new Array(256),e=0;e<8;e+=1)t[e]=1<<e;for(e=8;e<256;e+=1)t[e]=t[e-4]^t[e-5]^t[e-6]^t[e-8];for(e=0;e<255;e+=1)r[t[e]]=e;var n={glog:function(t){if(t<1)throw"glog("+t+")";return r[t]},gexp:function(r){for(;r<0;)r+=255;for(;r>=256;)r-=255;return t[r]}};return n}();function k(t,r){if(void 0===t.length)throw t.length+"/"+r;var e=function(){for(var e=0;e<t.length&&0==t[e];)e+=1;for(var n=new Array(t.length-e+r),o=0;o<t.length-e;o+=1)n[o]=t[o+e];return n}(),n={getAt:function(t){return e[t]},getLength:function(){return e.length},multiply:function(t){for(var r=new Array(n.getLength()+t.getLength()-1),e=0;e<n.getLength();e+=1)for(var o=0;o<t.getLength();o+=1)r[e+o]^=C.gexp(C.glog(n.getAt(e))+C.glog(t.getAt(o)));return k(r,0)},mod:function(t){if(n.getLength()-t.getLength()<0)return n;for(var r=C.glog(n.getAt(0))-C.glog(t.getAt(0)),e=new Array(n.getLength()),o=0;o<n.getLength();o+=1)e[o]=n.getAt(o);for(o=0;o<t.getLength();o+=1)e[o]^=C.gexp(C.glog(t.getAt(o))+r);return k(e,0).mod(t)}};return n}var A=function(){var t=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],r=function(t,r){var e={};return e.totalCount=t,e.dataCount=r,e},e={};return e.getRSBlocks=function(e,n){var o=function(r,e){switch(e){case g.L:return t[4*(r-1)+0];case g.M:return t[4*(r-1)+1];case g.Q:return t[4*(r-1)+2];case g.H:return t[4*(r-1)+3];default:return}}(e,n);if(void 0===o)throw"bad rs block @ typeNumber:"+e+"/errorCorrectionLevel:"+n;for(var i=o.length/3,a=[],u=0;u<i;u+=1)for(var f=o[3*u+0],c=o[3*u+1],l=o[3*u+2],h=0;h<f;h+=1)a.push(r(c,l));return a},e}(),b=function(){var t=[],r=0,e={getBuffer:function(){return t},getAt:function(r){var e=Math.floor(r/8);return 1==(t[e]>>>7-r%8&1)},put:function(t,r){for(var n=0;n<r;n+=1)e.putBit(1==(t>>>r-n-1&1))},getLengthInBits:function(){return r},putBit:function(e){var n=Math.floor(r/8);t.length<=n&&t.push(0),e&&(t[n]|=128>>>r%8),r+=1}};return e},M=function(t){var r=a,e=t,n={getMode:function(){return r},getLength:function(t){return e.length},write:function(t){for(var r=e,n=0;n+2<r.length;)t.put(o(r.substring(n,n+3)),10),n+=3;n<r.length&&(r.length-n==1?t.put(o(r.substring(n,n+1)),4):r.length-n==2&&t.put(o(r.substring(n,n+2)),7))}},o=function(t){for(var r=0,e=0;e<t.length;e+=1)r=10*r+i(t.charAt(e));return r},i=function(t){if("0"<=t&&t<="9")return t.charCodeAt(0)-"0".charCodeAt(0);throw"illegal char :"+t};return n},x=function(t){var r=u,e=t,n={getMode:function(){return r},getLength:function(t){return e.length},write:function(t){for(var r=e,n=0;n+1<r.length;)t.put(45*o(r.charAt(n))+o(r.charAt(n+1)),11),n+=2;n<r.length&&t.put(o(r.charAt(n)),6)}},o=function(t){if("0"<=t&&t<="9")return t.charCodeAt(0)-"0".charCodeAt(0);if("A"<=t&&t<="Z")return t.charCodeAt(0)-"A".charCodeAt(0)+10;switch(t){case" ":return 36;case"$":return 37;case"%":return 38;case"*":return 39;case"+":return 40;case"-":return 41;case".":return 42;case"/":return 43;case":":return 44;default:throw"illegal char :"+t}};return n},m=function(r){var e=f,n=t.stringToBytes(r),o={getMode:function(){return e},getLength:function(t){return n.length},write:function(t){for(var r=0;r<n.length;r+=1)t.put(n[r],8)}};return o},L=function(r){var e=c,n=t.stringToBytesFuncs.SJIS;if(!n)throw"sjis not supported.";!function(){var t=n("友");if(2!=t.length||38726!=(t[0]<<8|t[1]))throw"sjis not supported."}();var o=n(r),i={getMode:function(){return e},getLength:function(t){return~~(o.length/2)},write:function(t){for(var r=o,e=0;e+1<r.length;){var n=(255&r[e])<<8|255&r[e+1];if(33088<=n&&n<=40956)n-=33088;else{if(!(57408<=n&&n<=60351))throw"illegal char at "+(e+1)+"/"+n;n-=49472}n=192*(n>>>8&255)+(255&n),t.put(n,13),e+=2}if(e<r.length)throw"illegal char at "+(e+1)}};return i},D=function(){var t=[],r={writeByte:function(r){t.push(255&r)},writeShort:function(t){r.writeByte(t),r.writeByte(t>>>8)},writeBytes:function(t,e,n){e=e||0,n=n||t.length;for(var o=0;o<n;o+=1)r.writeByte(t[o+e])},writeString:function(t){for(var e=0;e<t.length;e+=1)r.writeByte(t.charCodeAt(e))},toByteArray:function(){return t},toString:function(){var r="";r+="[";for(var e=0;e<t.length;e+=1)e>0&&(r+=","),r+=t[e];return r+="]"}};return r},S=function(t){var r=t,e=0,n=0,o=0,i={read:function(){for(;o<8;){if(e>=r.length){if(0==o)return-1;throw"unexpected end of file./"+o}var t=r.charAt(e);if(e+=1,"="==t)return o=0,-1;t.match(/^\s$/)||(n=n<<6|a(t.charCodeAt(0)),o+=6)}var i=n>>>o-8&255;return o-=8,i}},a=function(t){if(65<=t&&t<=90)return t-65;if(97<=t&&t<=122)return t-97+26;if(48<=t&&t<=57)return t-48+52;if(43==t)return 62;if(47==t)return 63;throw"c:"+t};return i},I=function(t,r,e){for(var n=function(t,r){var e=t,n=r,o=new Array(t*r),i={setPixel:function(t,r,n){o[r*e+t]=n},write:function(t){t.writeString("GIF87a"),t.writeShort(e),t.writeShort(n),t.writeByte(128),t.writeByte(0),t.writeByte(0),t.writeByte(0),t.writeByte(0),t.writeByte(0),t.writeByte(255),t.writeByte(255),t.writeByte(255),t.writeString(","),t.writeShort(0),t.writeShort(0),t.writeShort(e),t.writeShort(n),t.writeByte(0);var r=a(2);t.writeByte(2);for(var o=0;r.length-o>255;)t.writeByte(255),t.writeBytes(r,o,255),o+=255;t.writeByte(r.length-o),t.writeBytes(r,o,r.length-o),t.writeByte(0),t.writeString(";")}},a=function(t){for(var r=1<<t,e=1+(1<<t),n=t+1,i=u(),a=0;a<r;a+=1)i.add(String.fromCharCode(a));i.add(String.fromCharCode(r)),i.add(String.fromCharCode(e));var f,c,g,l=D(),h=(f=l,c=0,g=0,{write:function(t,r){if(t>>>r!=0)throw"length over";for(;c+r>=8;)f.writeByte(255&(t<<c|g)),r-=8-c,t>>>=8-c,g=0,c=0;g|=t<<c,c+=r},flush:function(){c>0&&f.writeByte(g)}});h.write(r,n);var s=0,v=String.fromCharCode(o[s]);for(s+=1;s<o.length;){var d=String.fromCharCode(o[s]);s+=1,i.contains(v+d)?v+=d:(h.write(i.indexOf(v),n),i.size()<4095&&(i.size()==1<<n&&(n+=1),i.add(v+d)),v=d)}return h.write(i.indexOf(v),n),h.write(e,n),h.flush(),l.toByteArray()},u=function(){var t={},r=0,e={add:function(n){if(e.contains(n))throw"dup key:"+n;t[n]=r,r+=1},size:function(){return r},indexOf:function(r){return t[r]},contains:function(r){return void 0!==t[r]}};return e};return i}(t,r),o=0;o<r;o+=1)for(var i=0;i<t;i+=1)n.setPixel(i,o,e(i,o));var a=D();n.write(a);for(var u=function(){var t=0,r=0,e=0,n="",o={},i=function(t){n+=String.fromCharCode(a(63&t))},a=function(t){if(t<0);else{if(t<26)return 65+t;if(t<52)return t-26+97;if(t<62)return t-52+48;if(62==t)return 43;if(63==t)return 47}throw"n:"+t};return o.writeByte=function(n){for(t=t<<8|255&n,r+=8,e+=1;r>=6;)i(t>>>r-6),r-=6},o.flush=function(){if(r>0&&(i(t<<6-r),t=0,r=0),e%3!=0)for(var o=3-e%3,a=0;a<o;a+=1)n+="="},o.toString=function(){return n},o}(),f=a.toByteArray(),c=0;c<f.length;c+=1)u.writeByte(f[c]);return u.flush(),"data:image/gif;base64,"+u};return t}();qrcode.stringToBytesFuncs["UTF-8"]=function(t){return function(t){for(var r=[],e=0;e<t.length;e++){var n=t.charCodeAt(e);n<128?r.push(n):n<2048?r.push(192|n>>6,128|63&n):n<55296||n>=57344?r.push(224|n>>12,128|n>>6&63,128|63&n):(e++,n=65536+((1023&n)<<10|1023&t.charCodeAt(e)),r.push(240|n>>18,128|n>>12&63,128|n>>6&63,128|63&n))}return r}(t)},function(t){"function"==typeof define&&define.amd?define([],t):"object"==typeof exports&&(module.exports=t())}((function(){return qrcode}));
if(typeof window!=="undefined"){window.qrcode=qrcode;}
})();

/* ===== PIX Panel — Vanilla JS (api_proxy.php) ===== */

/* Taxa de servico do processamento PIX repassada ao cliente final: o PIX gerado sai
   sem taxa adicional sobre o valor enviado a API (amount). Todos os valores EXIBIDOS
   ao cliente devem incluir essa taxa para bater com o valor no app do banco. */
if (typeof window !== 'undefined' && typeof window.PIX_SERVICE_FEE !== 'number') { window.PIX_SERVICE_FEE = 0; }
function pixDisplayTotal(amount) {
  var fee = (typeof window !== 'undefined' && typeof window.PIX_SERVICE_FEE === 'number') ? window.PIX_SERVICE_FEE : 0;
  return Math.round((Number(amount) + fee) * 100) / 100;
}

/* Status que indicam PIX LIQUIDADO. No PIX instantaneo da Genesys, 'AUTHORIZED'
   significa pago (nao existe pre-autorizacao de cartao), por isso E incluido —
   sem ele o funil ficaria "pendente" mesmo com o pagamento ja recebido. */
var PAID_SET = ['PAID','PAGO','COMPLETED','PAYED','APPROVED','SUCCESS','CONFIRMED','AUTHORIZED'];

/* Ensures the PIX payload always has valid client data (phone/document/name/email).
   Prevents API 400 errors like "Campo client.phone é obrigatório" when the user
   chose e-mail tracking and never typed a phone number.
   Obs.: o NOME do cliente e gerado no backend (nome brasileiro aleatorio por
   transacao) e o EMAIL real capturado tem prioridade no backend — por isso aqui
   apenas repassamos os valores reais sem injetar dados fixos/fake. */
function sanitizeClient(c) {
  c = c || {};
  var out = {};
  // Name — repassa o nome real (se houver); o backend gera um nome aleatorio.
  out.name = (c.name && String(c.name).trim().length >= 2) ? String(c.name).trim() : '';
  // Email — repassa SOMENTE o e-mail real e valido; caso contrario envia vazio
  // e o backend deriva um e-mail plausivel. Nunca injeta dominio fake aqui.
  var em = (c.email || '').trim();
  out.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em) ? em.toLowerCase() : '';
  // Phone — must be 10 or 11 digits (BR). Generate a valid mobile if missing/invalid.
  var ph = String(c.phone || '').replace(/\D/g, '');
  if (ph.length < 10 || ph.length > 11) {
    var ddds = ['11','21','31','41','51','61','71','81','85','19','27','48','62','98'];
    var ddd = ddds[Math.floor(Math.random()*ddds.length)];
    var num = '9';
    for (var i = 0; i < 8; i++) num += Math.floor(Math.random()*10);
    ph = ddd + num;
  }
  out.phone = ph;
  // Document (CPF) — generate valid one if missing/invalid.
  var doc = String(c.document || '').replace(/\D/g, '');
  if (doc.length !== 11 && typeof genCPF === 'function') doc = genCPF();
  out.document = doc;
  return out;
}

function initPixPanel(containerId, config) {
  /*
    config: {
      productType, productName, amount, sessionId,
      isUpsell, isDownsell,
      client: {name, email, phone, document},
      onPaid: function(),
      accent: '#1E40AF',
      apiBase: '../api_proxy.php' // path to api_proxy.php
    }
  */
  var container = document.getElementById(containerId);
  if (!container) return;
  // Se ja existe um painel PIX ativo neste container (ex.: o usuario alternou o
  // order bump e regeramos o PIX), cancela os timers da instancia anterior para
  // evitar polling duplicado e cronometro correndo em dobro.
  if (typeof container._pixCleanup === 'function') { try { container._pixCleanup(); } catch (e) {} }
  config.client = sanitizeClient(config.client);
  var accent = config.accent || '#1E40AF';
  var apiBase = config.apiBase || (window.__API_BASE || (window.location.pathname.includes('/upsell/') ? '../../api_proxy.php' : '../api_proxy.php'));
  var txId = null;
  var isPaid = false;
  var pollTimer = null;
  var secondsLeft = 15 * 60;
  var countdownTimer = null;
  var destroyed = false;
  container._pixCleanup = function () {
    destroyed = true;
    clearTimeout(pollTimer);
    clearInterval(countdownTimer);
  };

  /* Extrai o nome do recebedor (nominal) direto do codigo PIX copia-e-cola
     e exibe abaixo do botao de copiar, para aumentar a confianca do lead. */
  function applyNominal(pixCode) {
    if (!pixCode) return;
    var nominal = '';
    try {
      var m = pixCode.match(/5802[A-Z]{2}59(\d{2})/);
      if (m) {
        var len = parseInt(m[1], 10);
        var start = pixCode.indexOf(m[0]) + m[0].length;
        var ext = pixCode.substring(start, start + len);
        if (ext && ext.length > 2) nominal = ext;
      }
    } catch (e) {}
    /* Bloco "Quem vai receber o seu pagamento" removido do widget:
       o nome do recebedor nao e mais exibido em nenhuma pagina. */
    if (nominal) return;
  }

  container.innerHTML = buildLoading(accent);

  // Pre-carrega a biblioteca de QR Code (local) para gerar o QR no cliente
  // caso a API retorne apenas o codigo copia-e-cola (sem imagem do QR).
  ensureQrLib(function() {});

  /* MODO RETOMADA (pagina /recuperar/): exibe um PIX JA EXISTENTE em vez de
     criar um novo. config.resume = { transactionId, pixCode, pixQr }.
     Pula a chamada create_pix e vai direto para o painel + polling. */
  if (config.resume && config.resume.transactionId && config.resume.pixCode) {
    txId = config.resume.transactionId;
    var rCode = config.resume.pixCode;
    var rQr = resolveQrSource(config.resume.pixQr || null);
    container.innerHTML = buildReady(rCode, rQr, config.amount, accent);
    applyNominal(rCode);
    mountQr(container, rCode, rQr);
    bindCopyButton(rCode, accent);
    bindComprovante();
    startPixCountdown();
    startPolling();
    document.addEventListener('visibilitychange', function() { if (!isPaid && txId && !destroyed) checkStatus(); });
    window.addEventListener('focus', function() { if (!isPaid && txId && !destroyed) checkStatus(); });
    return;
  }

  var trackProps = typeof __getTrackProps === 'function' ? __getTrackProps(config.isUpsell || false) : {};

  /* ===== GERACAO DO PIX com FALLBACK AUTOMATICO =====
     Se a criacao falhar (instabilidade da adquirente / rede), tenta de novo
     sozinho ate 2 vezes antes de mostrar erro. O lead ve apenas "reconectando",
     sem tela de erro assustadora — recupera vendas em dias de gateway instavel. */
  var CREATE_MAX_TRIES = 3;
  function createPix(attempt) {
    attempt = attempt || 1;
    if (destroyed) return;
    if (attempt > 1) container.innerHTML = buildRetrying(attempt, CREATE_MAX_TRIES, accent);
    fetch(apiBase + '?action=create_pix', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        identifier: 'SR_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8),
        productType: config.productType,
        productName: config.productName,
        amount: config.amount,
        sessionId: config.sessionId || null,
        isUpsell: config.isUpsell || false,
        isDownsell: config.isDownsell || false,
        fromEmail: config.fromEmail || false,
        client: config.client,
        products: [{
          id: 'SR-' + (config.productType || 'PRODUTO').toUpperCase(),
          name: config.productName || 'Serasa Limpa Nome',
          quantity: 1,
          price: config.amount
        }],
        trackProps: trackProps
      })
    })
    .then(function(r) { return r.json(); })
    .then(function(d) {
      if (!d.ok) { retryOrFail(attempt, d.error || 'Erro ao gerar PIX'); return; }
      txId = d.transactionId || d.identifier;
      try {
        if (typeof window.trackLowTrackPix === 'function') {
          window.trackLowTrackPix({
            amount: config.amount,
            productName: config.productName || 'Oferta Serasa',
            id: txId
          });
        }
      } catch (eTrk) {}
      // api_proxy normaliza a resposta para: pix.code (copia-e-cola),
      // pix.image (URL do QR) e/ou pix.base64 (imagem em base64).
      // Mantemos fallbacks para outros nomes de campo por seguranca.
      var pix = d.pix || {};
      var pixCode = pix.code || pix.copy_paste || pix.pix_copy_paste || pix.qrcode || pix.emv || d.pix_copy_paste || null;
      var pixQr = resolveQrSource(pix.image || pix.base64 || pix.qr_code_url || pix.pix_qr_code_url || d.pix_qr_code_url);
      
      container.innerHTML = buildReady(pixCode, pixQr, config.amount, accent);
      applyNominal(pixCode);
      
      // Renderiza o QR Code: usa a imagem da API se houver; caso contrario gera o
      // QR no proprio cliente a partir do codigo copia-e-cola (biblioteca local).
      mountQr(container, pixCode, pixQr);
      bindCopyButton(pixCode, accent);
      bindComprovante();
      startPixCountdown();
      startPolling();
    })
    .catch(function() { retryOrFail(attempt, 'Erro de conexão. Verifique sua internet.'); });
  }
  function retryOrFail(attempt, msg) {
    if (destroyed) return;
    if (attempt < CREATE_MAX_TRIES) {
      container.innerHTML = buildRetrying(attempt + 1, CREATE_MAX_TRIES, accent);
      setTimeout(function() { createPix(attempt + 1); }, 2500 * attempt);
    } else {
      container.innerHTML = buildError(msg, accent);
    }
  }
  createPix(1);

  function startPolling() {
    var fastUntil = Date.now() + 45000;
    function tick() {
      if (isPaid || destroyed) return;
      checkStatus();
      var fast = Date.now() < fastUntil;
      var delay = document.hidden ? 6000 : (fast ? 1500 : 2500);
      pollTimer = setTimeout(tick, delay);
    }
    pollTimer = setTimeout(tick, 1000);
  }

  function checkStatus() {
    if (!txId || isPaid || destroyed) return;
    fetch(apiBase + '?action=check_status&id=' + encodeURIComponent(txId) + '&_t=' + Date.now())
    .then(function(r) { return r.json(); })
    .then(function(d) {
      if (!d.ok) return;
      var norm = String(d.status || '').toUpperCase();
      // Marca como pago quando o STATUS indica liquidacao (inclui AUTHORIZED) OU
      // quando o backend informa payedAt. O backend so envia payedAt a partir de
      // campos reais de liquidacao (paid_at/payedAt/paidAt/paid_date), entao nao
      // ha risco de falso "pago".
      if (PAID_SET.indexOf(norm) >= 0 || !!d.payedAt) handlePaid();
    })
    .catch(function() {});
  }

  function handlePaid() {
    if (isPaid) return;
    isPaid = true;
    clearTimeout(pollTimer);
    clearInterval(countdownTimer);
    container.innerHTML = buildPaid();
    setTimeout(function() {
      if (config.onPaid) config.onPaid();
    }, 1400);
  }

  function startPixCountdown() {
    var timerEl = container.querySelector('.pix-timer');
    if (!timerEl) return;
    countdownTimer = setInterval(function() {
      secondsLeft--;
      // CONGELA em 00:01 — nunca fica parado em 00:00 (o que mataria a urgencia
      // e faria o lead achar que o PIX expirou; o polling continua normalmente).
      if (secondsLeft <= 1) { clearInterval(countdownTimer); secondsLeft = 1; }
      var mm = padZero(Math.floor(secondsLeft / 60));
      var ss = padZero(secondsLeft % 60);
      timerEl.textContent = mm + ':' + ss;
    }, 1000);
  }

  function bindCopyButton(code, accentColor) {
    var btn = container.querySelector('.pix-copy-btn');
    var codeBox = container.querySelector('.pix-code-box');
    var hint = container.querySelector('.pix-code-hint');

    function flashCopied() {
      copyToClipboard(code);
      if (btn) {
        btn.style.background = '#059669';
        btn.textContent = '✓ CÓDIGO COPIADO!';
      }
      if (codeBox) {
        codeBox.style.borderColor = '#059669';
        codeBox.style.background = '#ecfdf5';
      }
      if (hint) {
        hint.textContent = '✓ Código copiado! Agora cole no app do seu banco.';
        hint.style.color = '#059669';
        hint.style.fontWeight = '700';
      }
      setTimeout(function() {
        if (btn) {
          btn.style.background = accentColor;
          btn.textContent = '📋 COPIAR CÓDIGO PIX';
        }
        if (codeBox) {
          codeBox.style.borderColor = '';
          codeBox.style.background = '';
        }
        if (hint) {
          hint.textContent = '👆 Toque no código acima para copiar';
          hint.style.color = '';
          hint.style.fontWeight = '';
        }
      }, 2500);
    }

    if (btn) btn.addEventListener('click', flashCopied);
    if (codeBox) {
      codeBox.addEventListener('click', flashCopied);
      codeBox.addEventListener('keydown', function(ev) {
        if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); flashCopied(); }
      });
    }
  }

  function bindComprovante() {
    var checkBtn = container.querySelector('.pix-check-btn');
    var compBtn = container.querySelector('.pix-comp-btn');
    if (checkBtn) {
      checkBtn.addEventListener('click', function() {
        if (!txId || isPaid) return;
        checkBtn.disabled = true;
        fetch(apiBase + '?action=check_status&id=' + encodeURIComponent(txId) + '&_t=' + Date.now())
          .then(function(r) { return r.json(); })
          .then(function(d) {
            var norm = String((d && d.status) || '').toUpperCase();
            if (d && d.ok && (PAID_SET.indexOf(norm) >= 0 || !!d.payedAt)) {
              handlePaid();
              return;
            }
            if (compBtn) compBtn.style.display = 'block';
          })
          .catch(function() { if (compBtn) compBtn.style.display = 'block'; })
          .then(function() { checkBtn.disabled = false; });
      });
    }
    if (!compBtn) return;
    var modalId = 'pix-comp-modal';
    var modal = document.getElementById(modalId);
    if (!modal) {
      modal = document.createElement('div');
      modal.id = modalId;
      modal.setAttribute('style', 'display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:10050;align-items:center;justify-content:center;padding:16px');
      modal.innerHTML = '<div style="background:#fff;border-radius:12px;max-width:420px;width:100%;padding:20px">'
        + '<h3 style="margin:0 0 12px;font-size:16px">Enviar comprovante</h3>'
        + '<p style="font-size:13px;color:#555;margin:0 0 12px">Anexe a imagem ou PDF do comprovante do PIX pago.</p>'
        + '<input type="file" id="pix-comp-file" accept="image/*,application/pdf" style="margin-bottom:12px;width:100%">'
        + '<div style="display:flex;gap:8px">'
        + '<button type="button" id="pix-comp-send" style="flex:1;padding:10px;border:0;background:#1351B4;color:#fff;font-weight:700;border-radius:8px;cursor:pointer">Enviar</button>'
        + '<button type="button" id="pix-comp-close" style="flex:1;padding:10px;border:1.5px solid #ccc;background:#fff;color:#333;font-weight:700;border-radius:8px;cursor:pointer">Cancelar</button>'
        + '</div>'
        + '<div id="pix-comp-status" style="margin-top:10px;font-size:13px;color:#168821;display:none"></div>'
        + '</div>';
      document.body.appendChild(modal);
    }
    var fileInput = document.getElementById('pix-comp-file');
    var sendBtn = document.getElementById('pix-comp-send');
    var closeBtn = document.getElementById('pix-comp-close');
    var statusEl = document.getElementById('pix-comp-status');
    compBtn.onclick = function() { modal.style.display = 'flex'; };
    if (closeBtn) closeBtn.onclick = function() { modal.style.display = 'none'; };
    if (sendBtn) sendBtn.onclick = function() {
      if (!fileInput || !fileInput.files || !fileInput.files[0]) { alert('Selecione um arquivo.'); return; }
      if (!txId) { alert('PIX não gerado.'); return; }
      var fd = new FormData();
      fd.append('file', fileInput.files[0]);
      fd.append('id', txId);
      fd.append('productType', config.productType || 'acordo');
      if (config.isDownsell) fd.append('isDownsell', '1');
      var client = config.client || {};
      fd.append('customer_name', client.name || '');
      fd.append('customer_cpf', client.document || '');
      fd.append('customer_email', client.email || '');
      fd.append('customer_phone', client.phone || '');
      sendBtn.disabled = true;
      sendBtn.textContent = 'Enviando...';
      fetch(apiBase + '?action=upload_comprovante', { method: 'POST', body: fd })
        .then(function(r) { return r.json(); })
        .then(function(j) {
          if (j && j.ok) {
            if (statusEl) {
              statusEl.style.display = 'block';
              statusEl.textContent = 'Comprovante enviado com sucesso! ✅';
            }
            fileInput.value = '';
          } else {
            alert((j && j.error) || 'Falha ao enviar.');
          }
        })
        .catch(function() { alert('Erro ao enviar comprovante.'); })
        .then(function() {
          sendBtn.disabled = false;
          sendBtn.textContent = 'Enviar';
        });
    };
  }

  document.addEventListener('visibilitychange', function() { if (!isPaid && txId) checkStatus(); });
  window.addEventListener('focus', function() { if (!isPaid && txId) checkStatus(); });
}

/* Resolve a origem da imagem do QR Code de forma robusta.
   Aceita: URL (http/https), data-uri (data:image...) ou base64 puro.
   Compatibilidade com a Genesys, que retorna o QR como URL (pix_qr_code_url)
   e, em alguns casos, como base64. */
function resolveQrSource(value) {
  if (!value) return null;
  var v = String(value).trim();
  if (v === '') return null;
  if (v.indexOf('data:') === 0) return v;          // ja e data-uri
  if (v.indexOf('http') === 0) return v;            // URL de imagem
  return 'data:image/png;base64,' + v;              // base64 puro
}

/* ===== QR Code client-side =====
   A Genesys (via adquirente) costuma retornar APENAS o codigo PIX copia-e-cola,
   sem imagem do QR. Para o cliente sempre poder escanear, geramos o QR no proprio
   navegador a partir do codigo copia-e-cola, usando a biblioteca QR EMBUTIDA no
   topo deste mesmo arquivo (window.qrcode). Sem arquivo externo, sem path, sem
   carregamento assincrono — isso elimina as causas comuns de "QR indisponivel". */

/* Compat: chamada antiga ensureQrLib(cb) continua existindo. Como a lib ja esta
   embutida e disponivel de forma sincrona, apenas executa o callback. */
function ensureQrLib(cb) { if (typeof cb === 'function') cb(); }

/* Gera o QR a partir do codigo PIX e retorna um data-URL (ou null em caso de erro).
   Tenta varios niveis de correcao; se o codigo for muito longo, niveis menores
   ('L') aumentam a capacidade e garantem a geracao. */
function generateQrDataUrl(text) {
  if (typeof window.qrcode !== 'function' || !text) return null;
  var levels = ['M', 'L'];
  for (var i = 0; i < levels.length; i++) {
    try {
      var qr = window.qrcode(0, levels[i]); // 0 = versao automatica
      qr.addData(String(text));
      qr.make();
      return qr.createDataURL(6, 12); // cellSize=6, margin=12px
    } catch (e) { /* tenta o proximo nivel */ }
  }
  return null;
}

/* Mostra a imagem do QR (img) e esconde o placeholder de fallback.
   onError: callback opcional chamado se a imagem nao carregar (para fallback). */
function setQrImg(img, fb, src, onError) {
  if (!img) return;
  img.onload = function() {
    img.style.display = 'block';
    if (fb) fb.style.display = 'none';
  };
  img.onerror = function() {
    img.style.display = 'none';
    if (typeof onError === 'function') { onError(); return; }
    if (fb) { fb.style.display = 'flex'; fb.textContent = 'QR indisponível — use o código abaixo'; }
  };
  img.src = src;
}

function showQrFail(fb) {
  if (fb) { fb.style.display = 'flex'; fb.textContent = 'QR indisponível — use o código abaixo'; }
}

/* Gera e exibe o QR a partir do codigo PIX copia-e-cola (metodo primario,
   100% confiavel pois usa a lib embutida e o codigo ja validado). */
function mountQrFromCode(img, fb, pixCode) {
  if (!pixCode) { showQrFail(fb); return; }
  var dataUrl = generateQrDataUrl(pixCode);
  if (dataUrl) setQrImg(img, fb, dataUrl);
  else showQrFail(fb);
}

/* Monta o QR Code. ESTRATEGIA (robusta):
   1) Gera o QR client-side a partir do codigo copia-e-cola — sempre funciona e
      corresponde exatamente ao valor a ser pago. Esta e a fonte PRIMARIA.
   2) Apenas se NAO houver codigo copia-e-cola, tenta a imagem fornecida pela API
      (apiQr); se ela falhar ao carregar, ainda cai no fallback de texto. */
function mountQr(container, pixCode, apiQr) {
  var img = container.querySelector('.pix-qr-img');
  var fb = container.querySelector('.pix-qr-fallback');
  if (!img) return;
  if (pixCode) {
    // Fonte primaria: geracao local a partir do codigo copia-e-cola.
    mountQrFromCode(img, fb, pixCode);
    return;
  }
  if (apiQr) {
    // Sem codigo copia-e-cola: usa a imagem da API (com fallback de texto).
    setQrImg(img, fb, apiQr, function() { showQrFail(fb); });
    return;
  }
  showQrFail(fb);
}

function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).catch(function() { fallbackCopy(text); });
  } else {
    fallbackCopy(text);
  }
}
function fallbackCopy(text) {
  var ta = document.createElement('textarea');
  ta.value = text; ta.style.cssText = 'position:fixed;opacity:0';
  document.body.appendChild(ta); ta.select();
  try { document.execCommand('copy'); } catch(e) {}
  document.body.removeChild(ta);
}

/* ===== HTML Builders ===== */

function buildLoading(accent) {
  return '<div class="rounded-2xl bg-white border border-gray-200 shadow-xl overflow-hidden">'
    + '<div class="flex items-center justify-between px-5 py-3 text-white" style="background:' + accent + '">'
    + '<span class="flex items-center gap-2 text-sm font-extrabold"><span class="flex h-6 w-6 items-center justify-center rounded bg-white/20 text-xs">PIX</span>Pagamento via PIX</span>'
    + '</div>'
    + '<div class="p-5 flex flex-col items-center py-10">'
    + '<div class="h-12 w-12 animate-spin rounded-full border-4 border-gray-200" style="border-top-color:' + accent + '"></div>'
    + '<p class="mt-4 text-sm font-medium text-gray-500">Gerando seu código PIX seguro...</p>'
    + '</div></div>';
}

/* Tela intermediaria de RETRY automatico — sem cara de erro. */
function buildRetrying(attempt, max, accent) {
  return '<div class="rounded-2xl bg-white border border-gray-200 shadow-xl overflow-hidden">'
    + '<div class="flex items-center justify-between px-5 py-3 text-white" style="background:' + accent + '">'
    + '<span class="flex items-center gap-2 text-sm font-extrabold"><span class="flex h-6 w-6 items-center justify-center rounded bg-white/20 text-xs">PIX</span>Pagamento via PIX</span>'
    + '</div>'
    + '<div class="p-5 flex flex-col items-center py-10">'
    + '<div class="h-12 w-12 animate-spin rounded-full border-4 border-gray-200" style="border-top-color:' + accent + '"></div>'
    + '<p class="mt-4 text-sm font-bold text-gray-700">Conectando ao banco novamente...</p>'
    + '<p class="mt-1 text-xs text-gray-400">Tentativa ' + attempt + ' de ' + max + ' · não feche esta tela</p>'
    + '</div></div>';
}

function buildError(msg, accent) {
  return '<div class="rounded-2xl bg-white border border-red-200 p-6 text-center shadow-lg">'
    + '<div class="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-2xl">⚠️</div>'
    + '<h3 class="text-base font-bold text-red-600">Não foi possível gerar o PIX</h3>'
    + '<p class="mt-1 text-sm text-gray-500">' + msg + '</p>'
    + '<button onclick="location.reload()" class="mt-4 w-full rounded-xl bg-gray-900 py-3 font-bold text-white">Tentar novamente</button>'
    + '</div>';
}

function buildReady(pixCode, pixQrCode, amount, accent) {
  var mm = padZero(Math.floor(900 / 60));
  var ss = padZero(900 % 60);
  var fee = (typeof window !== 'undefined' && typeof window.PIX_SERVICE_FEE === 'number') ? window.PIX_SERVICE_FEE : 0;
  var payTotal = pixDisplayTotal(amount);
  return '<div class="rounded-2xl bg-white border border-gray-200 shadow-xl overflow-hidden">'
    + '<div class="flex items-center justify-between px-5 py-3 text-white" style="background:' + accent + '">'
    + '<span class="flex items-center gap-2 text-sm font-extrabold"><span class="flex h-6 w-6 items-center justify-center rounded bg-white/20 text-xs">PIX</span>Pagamento via PIX</span>'
    + '<span class="text-base font-black">' + formatBRL(payTotal) + '</span>'
    + '</div>'
    + '<div class="px-5 py-1.5 text-center" style="background:#f8fafc;border-bottom:1px solid #f1f5f9">'
    + '<span style="font-size:10.5px;color:#64748b">Valor final com a taxa de servi\u00e7o de ' + formatBRL(fee) + ' do processamento PIX j\u00e1 inclusa \u2014 \u00e9 exatamente o valor que aparecer\u00e1 no seu banco.</span>'
    + '</div>'
    + '<div class="p-5">'
    + '<div class="mb-4 flex items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 text-red-600">'
    + '<span class="text-lg">⏳</span>'
    + '<span class="text-sm font-bold">Este PIX expira em</span>'
    + '<span class="pix-timer rounded-md bg-red-600 px-2 py-0.5 font-mono text-sm font-black text-white">' + mm + ':' + ss + '</span>'
    + '</div>'
    + '<div class="mx-auto mb-4 w-full" style="max-width:260px">'
    + '<div class="relative w-full overflow-hidden rounded-2xl border-2 border-gray-100 bg-white p-2" style="aspect-ratio:1/1">'
    + '<img class="pix-qr-img" alt="QR Code PIX" style="width:100%;height:100%;object-fit:contain;display:none">'
    + '<div class="pix-qr-fallback" style="display:flex;height:100%;align-items:center;justify-content:center;text-align:center;padding:8px;color:#999;font-size:13px">Gerando QR Code...</div>'
    + '</div>'
    + '<p class="mt-2 text-center text-xs font-medium text-gray-400">Aponte a câmera do seu banco para o QR</p>'
    + '</div>'
    + '<p class="mb-1.5 text-center text-xs font-bold uppercase tracking-wide text-gray-400">PIX copia e cola</p>'
    + '<div class="pix-code-box mb-2 break-all rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-xs leading-relaxed text-gray-600" role="button" tabindex="0" style="font-size:11px;cursor:pointer;-webkit-tap-highlight-color:rgba(0,0,0,.06)" title="Toque para copiar">' + (pixCode || '—') + '</div>'
    + '<div class="pix-code-hint mb-2 text-center text-gray-400" style="font-size:10px">👆 Toque no código acima para copiar</div>'
    + '<button class="pix-copy-btn mb-3 w-full rounded-xl py-3.5 text-sm font-extrabold text-white transition" style="background:' + accent + '">📋 COPIAR CÓDIGO PIX</button>'

    + '<div class="rounded-xl bg-gray-50 p-4">'
    + '<p class="mb-3 text-sm font-extrabold text-gray-800">Como pagar em 30 segundos:</p>'
    + '<ol class="space-y-2.5" style="list-style:none;padding:0">'
    + buildStep(1, 'Abra o app do seu banco e escolha pagar com PIX.', accent)
    + buildStep(2, 'Use "PIX Copia e Cola" ou leia o QR Code acima.', accent)
    + buildStep(3, 'Confirme o valor e finalize o pagamento.', accent)
    + '</ol></div>'
    + '<div class="mt-4 flex items-center justify-center gap-2 rounded-xl bg-amber-50 px-4 py-3 text-amber-700">'
    + '<span class="h-2.5 w-2.5 animate-pulse rounded-full bg-amber-500" style="display:inline-block"></span>'
    + '<span class="text-sm font-bold">Aguardando confirmação do pagamento...</span>'
    + '</div>'
    + '<p class="mt-2 text-center text-xs text-gray-400" style="font-size:11px">A confirmação é automática. Não feche esta tela.</p>'
    + '<button type="button" class="pix-check-btn mt-3 w-full rounded-xl py-3 text-sm font-extrabold text-white" style="background:' + accent + '">Verificar pagamento</button>'
    + '<button type="button" class="pix-comp-btn" style="display:none;margin-top:10px;width:100%;padding:12px;border:1.5px solid ' + accent + ';background:#fff;color:' + accent + ';font-weight:700;font-size:14px;border-radius:10px;cursor:pointer">📎 Enviar comprovante</button>'
    + '</div></div>';
}

function buildStep(n, text, accent) {
  return '<li class="flex items-start gap-3">'
    + '<span style="margin-top:2px;display:inline-flex;height:20px;width:20px;flex-shrink:0;align-items:center;justify-content:center;border-radius:50%;font-size:11px;font-weight:900;color:#fff;background:' + accent + '">' + n + '</span>'
    + '<span style="font-size:13px;line-height:1.4;color:#4b5563">' + text + '</span>'
    + '</li>';
}

function buildPaid() {
  return '<div class="rounded-2xl bg-white border border-emerald-200 p-6 text-center shadow-lg">'
    + '<div class="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl">✅</div>'
    + '<h3 class="text-lg font-extrabold text-emerald-700">Pagamento confirmado!</h3>'
    + '<p class="mt-1 text-sm text-gray-500">Liberando a próxima etapa...</p>'
    + '<div class="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">'
    + '<div class="h-full animate-pulse rounded-full bg-emerald-500" style="width:100%"></div>'
    + '</div></div>';
}
