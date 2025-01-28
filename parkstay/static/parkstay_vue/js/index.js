var B="top",T="bottom",L="right",$="left",Pe="auto",fe=[B,T,L,$],Q="start",oe="end",ct="clippingParents",Ke="viewport",ne="popper",lt="reference",Fe=fe.reduce(function(e,t){return e.concat([t+"-"+Q,t+"-"+oe])},[]),Qe=[].concat(fe,[Pe]).reduce(function(e,t){return e.concat([t,t+"-"+Q,t+"-"+oe])},[]),dt="beforeRead",vt="read",ht="afterRead",mt="beforeMain",gt="main",yt="afterMain",bt="beforeWrite",wt="write",xt="afterWrite",Ot=[dt,vt,ht,mt,gt,yt,bt,wt,xt];function V(e){return e?(e.nodeName||"").toLowerCase():null}function S(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function J(e){var t=S(e).Element;return e instanceof t||e instanceof Element}function k(e){var t=S(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function De(e){if(typeof ShadowRoot>"u")return!1;var t=S(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function At(e){var t=e.state;Object.keys(t.elements).forEach(function(r){var n=t.styles[r]||{},a=t.attributes[r]||{},i=t.elements[r];!k(i)||!V(i)||(Object.assign(i.style,n),Object.keys(a).forEach(function(u){var s=a[u];s===!1?i.removeAttribute(u):i.setAttribute(u,s===!0?"":s)}))})}function Et(e){var t=e.state,r={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,r.popper),t.styles=r,t.elements.arrow&&Object.assign(t.elements.arrow.style,r.arrow),function(){Object.keys(t.elements).forEach(function(n){var a=t.elements[n],i=t.attributes[n]||{},u=Object.keys(t.styles.hasOwnProperty(n)?t.styles[n]:r[n]),s=u.reduce(function(o,p){return o[p]="",o},{});!k(a)||!V(a)||(Object.assign(a.style,s),Object.keys(i).forEach(function(o){a.removeAttribute(o)}))})}}const Pt={name:"applyStyles",enabled:!0,phase:"write",fn:At,effect:Et,requires:["computeStyles"]};function H(e){return e.split("-")[0]}var G=Math.max,ge=Math.min,Z=Math.round;function Ae(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function Ze(){return!/^((?!chrome|android).)*safari/i.test(Ae())}function _(e,t,r){t===void 0&&(t=!1),r===void 0&&(r=!1);var n=e.getBoundingClientRect(),a=1,i=1;t&&k(e)&&(a=e.offsetWidth>0&&Z(n.width)/e.offsetWidth||1,i=e.offsetHeight>0&&Z(n.height)/e.offsetHeight||1);var u=J(e)?S(e):window,s=u.visualViewport,o=!Ze()&&r,p=(n.left+(o&&s?s.offsetLeft:0))/a,f=(n.top+(o&&s?s.offsetTop:0))/i,h=n.width/a,y=n.height/i;return{width:h,height:y,top:f,right:p+h,bottom:f+y,left:p,x:p,y:f}}function je(e){var t=_(e),r=e.offsetWidth,n=e.offsetHeight;return Math.abs(t.width-r)<=1&&(r=t.width),Math.abs(t.height-n)<=1&&(n=t.height),{x:e.offsetLeft,y:e.offsetTop,width:r,height:n}}function _e(e,t){var r=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(r&&De(r)){var n=t;do{if(n&&e.isSameNode(n))return!0;n=n.parentNode||n.host}while(n)}return!1}function N(e){return S(e).getComputedStyle(e)}function Dt(e){return["table","td","th"].indexOf(V(e))>=0}function q(e){return((J(e)?e.ownerDocument:e.document)||window.document).documentElement}function ye(e){return V(e)==="html"?e:e.assignedSlot||e.parentNode||(De(e)?e.host:null)||q(e)}function qe(e){return!k(e)||N(e).position==="fixed"?null:e.offsetParent}function jt(e){var t=/firefox/i.test(Ae()),r=/Trident/i.test(Ae());if(r&&k(e)){var n=N(e);if(n.position==="fixed")return null}var a=ye(e);for(De(a)&&(a=a.host);k(a)&&["html","body"].indexOf(V(a))<0;){var i=N(a);if(i.transform!=="none"||i.perspective!=="none"||i.contain==="paint"||["transform","perspective"].indexOf(i.willChange)!==-1||t&&i.willChange==="filter"||t&&i.filter&&i.filter!=="none")return a;a=a.parentNode}return null}function ue(e){for(var t=S(e),r=qe(e);r&&Dt(r)&&N(r).position==="static";)r=qe(r);return r&&(V(r)==="html"||V(r)==="body"&&N(r).position==="static")?t:r||jt(e)||t}function Re(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function ae(e,t,r){return G(e,ge(t,r))}function Rt(e,t,r){var n=ae(e,t,r);return n>r?r:n}function et(){return{top:0,right:0,bottom:0,left:0}}function tt(e){return Object.assign({},et(),e)}function rt(e,t){return t.reduce(function(r,n){return r[n]=e,r},{})}var Bt=function(t,r){return t=typeof t=="function"?t(Object.assign({},r.rects,{placement:r.placement})):t,tt(typeof t!="number"?t:rt(t,fe))};function $t(e){var t,r=e.state,n=e.name,a=e.options,i=r.elements.arrow,u=r.modifiersData.popperOffsets,s=H(r.placement),o=Re(s),p=[$,L].indexOf(s)>=0,f=p?"height":"width";if(!(!i||!u)){var h=Bt(a.padding,r),y=je(i),c=o==="y"?B:$,w=o==="y"?T:L,v=r.rects.reference[f]+r.rects.reference[o]-u[o]-r.rects.popper[f],d=u[o]-r.rects.reference[o],b=ue(i),O=b?o==="y"?b.clientHeight||0:b.clientWidth||0:0,A=v/2-d/2,l=h[c],m=O-y[f]-h[w],g=O/2-y[f]/2+A,x=ae(l,g,m),D=o;r.modifiersData[n]=(t={},t[D]=x,t.centerOffset=x-g,t)}}function Ct(e){var t=e.state,r=e.options,n=r.element,a=n===void 0?"[data-popper-arrow]":n;a!=null&&(typeof a=="string"&&(a=t.elements.popper.querySelector(a),!a)||_e(t.elements.popper,a)&&(t.elements.arrow=a))}const St={name:"arrow",enabled:!0,phase:"main",fn:$t,effect:Ct,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function ee(e){return e.split("-")[1]}var kt={top:"auto",right:"auto",bottom:"auto",left:"auto"};function Tt(e,t){var r=e.x,n=e.y,a=t.devicePixelRatio||1;return{x:Z(r*a)/a||0,y:Z(n*a)/a||0}}function Xe(e){var t,r=e.popper,n=e.popperRect,a=e.placement,i=e.variation,u=e.offsets,s=e.position,o=e.gpuAcceleration,p=e.adaptive,f=e.roundOffsets,h=e.isFixed,y=u.x,c=y===void 0?0:y,w=u.y,v=w===void 0?0:w,d=typeof f=="function"?f({x:c,y:v}):{x:c,y:v};c=d.x,v=d.y;var b=u.hasOwnProperty("x"),O=u.hasOwnProperty("y"),A=$,l=B,m=window;if(p){var g=ue(r),x="clientHeight",D="clientWidth";if(g===S(r)&&(g=q(r),N(g).position!=="static"&&s==="absolute"&&(x="scrollHeight",D="scrollWidth")),g=g,a===B||(a===$||a===L)&&i===oe){l=T;var P=h&&g===m&&m.visualViewport?m.visualViewport.height:g[x];v-=P-n.height,v*=o?1:-1}if(a===$||(a===B||a===T)&&i===oe){A=L;var E=h&&g===m&&m.visualViewport?m.visualViewport.width:g[D];c-=E-n.width,c*=o?1:-1}}var j=Object.assign({position:s},p&&kt),M=f===!0?Tt({x:c,y:v},S(r)):{x:c,y:v};if(c=M.x,v=M.y,o){var R;return Object.assign({},j,(R={},R[l]=O?"0":"",R[A]=b?"0":"",R.transform=(m.devicePixelRatio||1)<=1?"translate("+c+"px, "+v+"px)":"translate3d("+c+"px, "+v+"px, 0)",R))}return Object.assign({},j,(t={},t[l]=O?v+"px":"",t[A]=b?c+"px":"",t.transform="",t))}function Lt(e){var t=e.state,r=e.options,n=r.gpuAcceleration,a=n===void 0?!0:n,i=r.adaptive,u=i===void 0?!0:i,s=r.roundOffsets,o=s===void 0?!0:s,p={placement:H(t.placement),variation:ee(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:a,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,Xe(Object.assign({},p,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:u,roundOffsets:o})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,Xe(Object.assign({},p,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:o})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const Mt={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:Lt,data:{}};var he={passive:!0};function Wt(e){var t=e.state,r=e.instance,n=e.options,a=n.scroll,i=a===void 0?!0:a,u=n.resize,s=u===void 0?!0:u,o=S(t.elements.popper),p=[].concat(t.scrollParents.reference,t.scrollParents.popper);return i&&p.forEach(function(f){f.addEventListener("scroll",r.update,he)}),s&&o.addEventListener("resize",r.update,he),function(){i&&p.forEach(function(f){f.removeEventListener("scroll",r.update,he)}),s&&o.removeEventListener("resize",r.update,he)}}const Ht={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:Wt,data:{}};var Vt={left:"right",right:"left",bottom:"top",top:"bottom"};function me(e){return e.replace(/left|right|bottom|top/g,function(t){return Vt[t]})}var Nt={start:"end",end:"start"};function Ie(e){return e.replace(/start|end/g,function(t){return Nt[t]})}function Be(e){var t=S(e),r=t.pageXOffset,n=t.pageYOffset;return{scrollLeft:r,scrollTop:n}}function $e(e){return _(q(e)).left+Be(e).scrollLeft}function Ft(e,t){var r=S(e),n=q(e),a=r.visualViewport,i=n.clientWidth,u=n.clientHeight,s=0,o=0;if(a){i=a.width,u=a.height;var p=Ze();(p||!p&&t==="fixed")&&(s=a.offsetLeft,o=a.offsetTop)}return{width:i,height:u,x:s+$e(e),y:o}}function qt(e){var t,r=q(e),n=Be(e),a=(t=e.ownerDocument)==null?void 0:t.body,i=G(r.scrollWidth,r.clientWidth,a?a.scrollWidth:0,a?a.clientWidth:0),u=G(r.scrollHeight,r.clientHeight,a?a.scrollHeight:0,a?a.clientHeight:0),s=-n.scrollLeft+$e(e),o=-n.scrollTop;return N(a||r).direction==="rtl"&&(s+=G(r.clientWidth,a?a.clientWidth:0)-i),{width:i,height:u,x:s,y:o}}function Ce(e){var t=N(e),r=t.overflow,n=t.overflowX,a=t.overflowY;return/auto|scroll|overlay|hidden/.test(r+a+n)}function nt(e){return["html","body","#document"].indexOf(V(e))>=0?e.ownerDocument.body:k(e)&&Ce(e)?e:nt(ye(e))}function ie(e,t){var r;t===void 0&&(t=[]);var n=nt(e),a=n===((r=e.ownerDocument)==null?void 0:r.body),i=S(n),u=a?[i].concat(i.visualViewport||[],Ce(n)?n:[]):n,s=t.concat(u);return a?s:s.concat(ie(ye(u)))}function Ee(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function Xt(e,t){var r=_(e,!1,t==="fixed");return r.top=r.top+e.clientTop,r.left=r.left+e.clientLeft,r.bottom=r.top+e.clientHeight,r.right=r.left+e.clientWidth,r.width=e.clientWidth,r.height=e.clientHeight,r.x=r.left,r.y=r.top,r}function Ye(e,t,r){return t===Ke?Ee(Ft(e,r)):J(t)?Xt(t,r):Ee(qt(q(e)))}function It(e){var t=ie(ye(e)),r=["absolute","fixed"].indexOf(N(e).position)>=0,n=r&&k(e)?ue(e):e;return J(n)?t.filter(function(a){return J(a)&&_e(a,n)&&V(a)!=="body"}):[]}function Yt(e,t,r,n){var a=t==="clippingParents"?It(e):[].concat(t),i=[].concat(a,[r]),u=i[0],s=i.reduce(function(o,p){var f=Ye(e,p,n);return o.top=G(f.top,o.top),o.right=ge(f.right,o.right),o.bottom=ge(f.bottom,o.bottom),o.left=G(f.left,o.left),o},Ye(e,u,n));return s.width=s.right-s.left,s.height=s.bottom-s.top,s.x=s.left,s.y=s.top,s}function at(e){var t=e.reference,r=e.element,n=e.placement,a=n?H(n):null,i=n?ee(n):null,u=t.x+t.width/2-r.width/2,s=t.y+t.height/2-r.height/2,o;switch(a){case B:o={x:u,y:t.y-r.height};break;case T:o={x:u,y:t.y+t.height};break;case L:o={x:t.x+t.width,y:s};break;case $:o={x:t.x-r.width,y:s};break;default:o={x:t.x,y:t.y}}var p=a?Re(a):null;if(p!=null){var f=p==="y"?"height":"width";switch(i){case Q:o[p]=o[p]-(t[f]/2-r[f]/2);break;case oe:o[p]=o[p]+(t[f]/2-r[f]/2);break}}return o}function se(e,t){t===void 0&&(t={});var r=t,n=r.placement,a=n===void 0?e.placement:n,i=r.strategy,u=i===void 0?e.strategy:i,s=r.boundary,o=s===void 0?ct:s,p=r.rootBoundary,f=p===void 0?Ke:p,h=r.elementContext,y=h===void 0?ne:h,c=r.altBoundary,w=c===void 0?!1:c,v=r.padding,d=v===void 0?0:v,b=tt(typeof d!="number"?d:rt(d,fe)),O=y===ne?lt:ne,A=e.rects.popper,l=e.elements[w?O:y],m=Yt(J(l)?l:l.contextElement||q(e.elements.popper),o,f,u),g=_(e.elements.reference),x=at({reference:g,element:A,strategy:"absolute",placement:a}),D=Ee(Object.assign({},A,x)),P=y===ne?D:g,E={top:m.top-P.top+b.top,bottom:P.bottom-m.bottom+b.bottom,left:m.left-P.left+b.left,right:P.right-m.right+b.right},j=e.modifiersData.offset;if(y===ne&&j){var M=j[a];Object.keys(E).forEach(function(R){var X=[L,T].indexOf(R)>=0?1:-1,I=[B,T].indexOf(R)>=0?"y":"x";E[R]+=M[I]*X})}return E}function zt(e,t){t===void 0&&(t={});var r=t,n=r.placement,a=r.boundary,i=r.rootBoundary,u=r.padding,s=r.flipVariations,o=r.allowedAutoPlacements,p=o===void 0?Qe:o,f=ee(n),h=f?s?Fe:Fe.filter(function(w){return ee(w)===f}):fe,y=h.filter(function(w){return p.indexOf(w)>=0});y.length===0&&(y=h);var c=y.reduce(function(w,v){return w[v]=se(e,{placement:v,boundary:a,rootBoundary:i,padding:u})[H(v)],w},{});return Object.keys(c).sort(function(w,v){return c[w]-c[v]})}function Ut(e){if(H(e)===Pe)return[];var t=me(e);return[Ie(e),t,Ie(t)]}function Gt(e){var t=e.state,r=e.options,n=e.name;if(!t.modifiersData[n]._skip){for(var a=r.mainAxis,i=a===void 0?!0:a,u=r.altAxis,s=u===void 0?!0:u,o=r.fallbackPlacements,p=r.padding,f=r.boundary,h=r.rootBoundary,y=r.altBoundary,c=r.flipVariations,w=c===void 0?!0:c,v=r.allowedAutoPlacements,d=t.options.placement,b=H(d),O=b===d,A=o||(O||!w?[me(d)]:Ut(d)),l=[d].concat(A).reduce(function(K,F){return K.concat(H(F)===Pe?zt(t,{placement:F,boundary:f,rootBoundary:h,padding:p,flipVariations:w,allowedAutoPlacements:v}):F)},[]),m=t.rects.reference,g=t.rects.popper,x=new Map,D=!0,P=l[0],E=0;E<l.length;E++){var j=l[E],M=H(j),R=ee(j)===Q,X=[B,T].indexOf(M)>=0,I=X?"width":"height",C=se(t,{placement:j,boundary:f,rootBoundary:h,altBoundary:y,padding:p}),W=X?R?L:$:R?T:B;m[I]>g[I]&&(W=me(W));var pe=me(W),Y=[];if(i&&Y.push(C[M]<=0),s&&Y.push(C[W]<=0,C[pe]<=0),Y.every(function(K){return K})){P=j,D=!1;break}x.set(j,Y)}if(D)for(var ce=w?3:1,be=function(F){var re=l.find(function(de){var z=x.get(de);if(z)return z.slice(0,F).every(function(we){return we})});if(re)return P=re,"break"},te=ce;te>0;te--){var le=be(te);if(le==="break")break}t.placement!==P&&(t.modifiersData[n]._skip=!0,t.placement=P,t.reset=!0)}}const Jt={name:"flip",enabled:!0,phase:"main",fn:Gt,requiresIfExists:["offset"],data:{_skip:!1}};function ze(e,t,r){return r===void 0&&(r={x:0,y:0}),{top:e.top-t.height-r.y,right:e.right-t.width+r.x,bottom:e.bottom-t.height+r.y,left:e.left-t.width-r.x}}function Ue(e){return[B,L,T,$].some(function(t){return e[t]>=0})}function Kt(e){var t=e.state,r=e.name,n=t.rects.reference,a=t.rects.popper,i=t.modifiersData.preventOverflow,u=se(t,{elementContext:"reference"}),s=se(t,{altBoundary:!0}),o=ze(u,n),p=ze(s,a,i),f=Ue(o),h=Ue(p);t.modifiersData[r]={referenceClippingOffsets:o,popperEscapeOffsets:p,isReferenceHidden:f,hasPopperEscaped:h},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":f,"data-popper-escaped":h})}const Qt={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:Kt};function Zt(e,t,r){var n=H(e),a=[$,B].indexOf(n)>=0?-1:1,i=typeof r=="function"?r(Object.assign({},t,{placement:e})):r,u=i[0],s=i[1];return u=u||0,s=(s||0)*a,[$,L].indexOf(n)>=0?{x:s,y:u}:{x:u,y:s}}function _t(e){var t=e.state,r=e.options,n=e.name,a=r.offset,i=a===void 0?[0,0]:a,u=Qe.reduce(function(f,h){return f[h]=Zt(h,t.rects,i),f},{}),s=u[t.placement],o=s.x,p=s.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=o,t.modifiersData.popperOffsets.y+=p),t.modifiersData[n]=u}const er={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:_t};function tr(e){var t=e.state,r=e.name;t.modifiersData[r]=at({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const rr={name:"popperOffsets",enabled:!0,phase:"read",fn:tr,data:{}};function nr(e){return e==="x"?"y":"x"}function ar(e){var t=e.state,r=e.options,n=e.name,a=r.mainAxis,i=a===void 0?!0:a,u=r.altAxis,s=u===void 0?!1:u,o=r.boundary,p=r.rootBoundary,f=r.altBoundary,h=r.padding,y=r.tether,c=y===void 0?!0:y,w=r.tetherOffset,v=w===void 0?0:w,d=se(t,{boundary:o,rootBoundary:p,padding:h,altBoundary:f}),b=H(t.placement),O=ee(t.placement),A=!O,l=Re(b),m=nr(l),g=t.modifiersData.popperOffsets,x=t.rects.reference,D=t.rects.popper,P=typeof v=="function"?v(Object.assign({},t.rects,{placement:t.placement})):v,E=typeof P=="number"?{mainAxis:P,altAxis:P}:Object.assign({mainAxis:0,altAxis:0},P),j=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,M={x:0,y:0};if(g){if(i){var R,X=l==="y"?B:$,I=l==="y"?T:L,C=l==="y"?"height":"width",W=g[l],pe=W+d[X],Y=W-d[I],ce=c?-D[C]/2:0,be=O===Q?x[C]:D[C],te=O===Q?-D[C]:-x[C],le=t.elements.arrow,K=c&&le?je(le):{width:0,height:0},F=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:et(),re=F[X],de=F[I],z=ae(0,x[C],K[C]),we=A?x[C]/2-ce-z-re-E.mainAxis:be-z-re-E.mainAxis,it=A?-x[C]/2+ce+z+de+E.mainAxis:te+z+de+E.mainAxis,xe=t.elements.arrow&&ue(t.elements.arrow),ot=xe?l==="y"?xe.clientTop||0:xe.clientLeft||0:0,Se=(R=j==null?void 0:j[l])!=null?R:0,st=W+we-Se-ot,ft=W+it-Se,ke=ae(c?ge(pe,st):pe,W,c?G(Y,ft):Y);g[l]=ke,M[l]=ke-W}if(s){var Te,ut=l==="x"?B:$,pt=l==="x"?T:L,U=g[m],ve=m==="y"?"height":"width",Le=U+d[ut],Me=U-d[pt],Oe=[B,$].indexOf(b)!==-1,We=(Te=j==null?void 0:j[m])!=null?Te:0,He=Oe?Le:U-x[ve]-D[ve]-We+E.altAxis,Ve=Oe?U+x[ve]+D[ve]-We-E.altAxis:Me,Ne=c&&Oe?Rt(He,U,Ve):ae(c?He:Le,U,c?Ve:Me);g[m]=Ne,M[m]=Ne-U}t.modifiersData[n]=M}}const ir={name:"preventOverflow",enabled:!0,phase:"main",fn:ar,requiresIfExists:["offset"]};function or(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function sr(e){return e===S(e)||!k(e)?Be(e):or(e)}function fr(e){var t=e.getBoundingClientRect(),r=Z(t.width)/e.offsetWidth||1,n=Z(t.height)/e.offsetHeight||1;return r!==1||n!==1}function ur(e,t,r){r===void 0&&(r=!1);var n=k(t),a=k(t)&&fr(t),i=q(t),u=_(e,a,r),s={scrollLeft:0,scrollTop:0},o={x:0,y:0};return(n||!n&&!r)&&((V(t)!=="body"||Ce(i))&&(s=sr(t)),k(t)?(o=_(t,!0),o.x+=t.clientLeft,o.y+=t.clientTop):i&&(o.x=$e(i))),{x:u.left+s.scrollLeft-o.x,y:u.top+s.scrollTop-o.y,width:u.width,height:u.height}}function pr(e){var t=new Map,r=new Set,n=[];e.forEach(function(i){t.set(i.name,i)});function a(i){r.add(i.name);var u=[].concat(i.requires||[],i.requiresIfExists||[]);u.forEach(function(s){if(!r.has(s)){var o=t.get(s);o&&a(o)}}),n.push(i)}return e.forEach(function(i){r.has(i.name)||a(i)}),n}function cr(e){var t=pr(e);return Ot.reduce(function(r,n){return r.concat(t.filter(function(a){return a.phase===n}))},[])}function lr(e){var t;return function(){return t||(t=new Promise(function(r){Promise.resolve().then(function(){t=void 0,r(e())})})),t}}function dr(e){var t=e.reduce(function(r,n){var a=r[n.name];return r[n.name]=a?Object.assign({},a,n,{options:Object.assign({},a.options,n.options),data:Object.assign({},a.data,n.data)}):n,r},{});return Object.keys(t).map(function(r){return t[r]})}var Ge={placement:"bottom",modifiers:[],strategy:"absolute"};function Je(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return!t.some(function(n){return!(n&&typeof n.getBoundingClientRect=="function")})}function vr(e){e===void 0&&(e={});var t=e,r=t.defaultModifiers,n=r===void 0?[]:r,a=t.defaultOptions,i=a===void 0?Ge:a;return function(s,o,p){p===void 0&&(p=i);var f={placement:"bottom",orderedModifiers:[],options:Object.assign({},Ge,i),modifiersData:{},elements:{reference:s,popper:o},attributes:{},styles:{}},h=[],y=!1,c={state:f,setOptions:function(b){var O=typeof b=="function"?b(f.options):b;v(),f.options=Object.assign({},i,f.options,O),f.scrollParents={reference:J(s)?ie(s):s.contextElement?ie(s.contextElement):[],popper:ie(o)};var A=cr(dr([].concat(n,f.options.modifiers)));return f.orderedModifiers=A.filter(function(l){return l.enabled}),w(),c.update()},forceUpdate:function(){if(!y){var b=f.elements,O=b.reference,A=b.popper;if(Je(O,A)){f.rects={reference:ur(O,ue(A),f.options.strategy==="fixed"),popper:je(A)},f.reset=!1,f.placement=f.options.placement,f.orderedModifiers.forEach(function(E){return f.modifiersData[E.name]=Object.assign({},E.data)});for(var l=0;l<f.orderedModifiers.length;l++){if(f.reset===!0){f.reset=!1,l=-1;continue}var m=f.orderedModifiers[l],g=m.fn,x=m.options,D=x===void 0?{}:x,P=m.name;typeof g=="function"&&(f=g({state:f,options:D,name:P,instance:c})||f)}}}},update:lr(function(){return new Promise(function(d){c.forceUpdate(),d(f)})}),destroy:function(){v(),y=!0}};if(!Je(s,o))return c;c.setOptions(p).then(function(d){!y&&p.onFirstUpdate&&p.onFirstUpdate(d)});function w(){f.orderedModifiers.forEach(function(d){var b=d.name,O=d.options,A=O===void 0?{}:O,l=d.effect;if(typeof l=="function"){var m=l({state:f,name:b,instance:c,options:A}),g=function(){};h.push(m||g)}})}function v(){h.forEach(function(d){return d()}),h=[]}return c}}var hr=[Ht,rr,Mt,Pt,er,Jt,ir,St,Qt],mr=vr({defaultModifiers:hr});export{yt as afterMain,ht as afterRead,xt as afterWrite,Pt as applyStyles,St as arrow,Pe as auto,fe as basePlacements,mt as beforeMain,dt as beforeRead,bt as beforeWrite,T as bottom,ct as clippingParents,Mt as computeStyles,mr as createPopper,se as detectOverflow,oe as end,Ht as eventListeners,Jt as flip,Qt as hide,$ as left,gt as main,Ot as modifierPhases,er as offset,Qe as placements,ne as popper,vr as popperGenerator,rr as popperOffsets,ir as preventOverflow,vt as read,lt as reference,L as right,Q as start,B as top,Fe as variationPlacements,Ke as viewport,wt as write};
//# sourceMappingURL=index.js.map
