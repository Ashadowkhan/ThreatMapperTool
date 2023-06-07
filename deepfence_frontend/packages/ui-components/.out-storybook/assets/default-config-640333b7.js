function _(){for(var e=0,r,t,o="";e<arguments.length;)(r=arguments[e++])&&(t=K(r))&&(o&&(o+=" "),o+=t);return o}function K(e){if(typeof e=="string")return e;for(var r,t="",o=0;o<e.length;o++)e[o]&&(r=K(e[o]))&&(t&&(t+=" "),t+=r);return t}var V="-";function D(e){var r=er(e);function t(i){var l=i.split(V);return l[0]===""&&l.length!==1&&l.shift(),Q(l,r)||rr(i)}function o(i){return e.conflictingClassGroups[i]||[]}return{getClassGroupId:t,getConflictingClassGroupIds:o}}function Q(e,r){var n;if(e.length===0)return r.classGroupId;var t=e[0],o=r.nextPart.get(t),i=o?Q(e.slice(1),o):void 0;if(i)return i;if(r.validators.length!==0){var l=e.join(V);return(n=r.validators.find(function(a){var c=a.validator;return c(l)}))==null?void 0:n.classGroupId}}var P=/^\[(.+)\]$/;function rr(e){if(P.test(e)){var r=P.exec(e)[1],t=r==null?void 0:r.substring(0,r.indexOf(":"));if(t)return"arbitrary.."+t}}function er(e){var r=e.theme,t=e.prefix,o={nextPart:new Map,validators:[]},i=or(Object.entries(e.classGroups),t);return i.forEach(function(l){var n=l[0],a=l[1];j(a,o,n,r)}),o}function j(e,r,t,o){e.forEach(function(i){if(typeof i=="string"){var l=i===""?r:X(r,i);l.classGroupId=t;return}if(typeof i=="function"){if(tr(i)){j(i(o),r,t,o);return}r.validators.push({validator:i,classGroupId:t});return}Object.entries(i).forEach(function(n){var a=n[0],c=n[1];j(c,X(r,a),t,o)})})}function X(e,r){var t=e;return r.split(V).forEach(function(o){t.nextPart.has(o)||t.nextPart.set(o,{nextPart:new Map,validators:[]}),t=t.nextPart.get(o)}),t}function tr(e){return e.isThemeGetter}function or(e,r){return r?e.map(function(t){var o=t[0],i=t[1],l=i.map(function(n){return typeof n=="string"?r+n:typeof n=="object"?Object.fromEntries(Object.entries(n).map(function(a){var c=a[0],d=a[1];return[r+c,d]})):n});return[o,l]}):e}function nr(e){if(e<1)return{get:function(){},set:function(){}};var r=0,t=new Map,o=new Map;function i(l,n){t.set(l,n),r++,r>e&&(r=0,o=t,t=new Map)}return{get:function(n){var a=t.get(n);if(a!==void 0)return a;if((a=o.get(n))!==void 0)return i(n,a),a},set:function(n,a){t.has(n)?t.set(n,a):i(n,a)}}}var Y="!";function ar(e){var r=e.separator||":";return function(o){for(var i=0,l=[],n=0,a=0;a<o.length;a++){var c=o[a];i===0&&c===r[0]&&(r.length===1||o.slice(a,a+r.length)===r)&&(l.push(o.slice(n,a)),n=a+r.length),c==="["?i++:c==="]"&&i--}var d=l.length===0?o:o.substring(n),f=d.startsWith(Y),b=f?d.substring(1):d;return{modifiers:l,hasImportantModifier:f,baseClassName:b}}}function ir(e){if(e.length<=1)return e;var r=[],t=[];return e.forEach(function(o){var i=o[0]==="[";i?(r.push.apply(r,t.sort().concat([o])),t=[]):t.push(o)}),r.push.apply(r,t.sort()),r}function lr(e){return{cache:nr(e.cacheSize),splitModifiers:ar(e),...D(e)}}var sr=/\s+/;function cr(e,r){var t=r.splitModifiers,o=r.getClassGroupId,i=r.getConflictingClassGroupIds,l=new Set;return e.trim().split(sr).map(function(n){var a=t(n),c=a.modifiers,d=a.hasImportantModifier,f=a.baseClassName,b=o(f);if(!b)return{isTailwindClass:!1,originalClassName:n};var h=ir(c).join(":"),k=d?h+Y:h;return{isTailwindClass:!0,modifierId:k,classGroupId:b,originalClassName:n}}).reverse().filter(function(n){if(!n.isTailwindClass)return!0;var a=n.modifierId,c=n.classGroupId,d=a+c;return l.has(d)?!1:(l.add(d),i(c).forEach(function(f){return l.add(a+f)}),!0)}).reverse().map(function(n){return n.originalClassName}).join(" ")}function yr(){for(var e=arguments.length,r=new Array(e),t=0;t<e;t++)r[t]=arguments[t];var o,i,l,n=a;function a(d){var f=r[0],b=r.slice(1),h=b.reduce(function(k,m){return m(k)},f());return o=lr(h),i=o.cache.get,l=o.cache.set,n=c,c(d)}function c(d){var f=i(d);if(f)return f;var b=cr(d,o);return l(d,b),b}return function(){return n(_.apply(null,arguments))}}function s(e){var r=function(o){return o[e]||[]};return r.isThemeGetter=!0,r}var w=/^\[(.+)\]$/,dr=/^\d+\/\d+$/,ur=new Set(["px","full","screen"]),pr=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,fr=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh)/,br=/^-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;function g(e){return!Number.isNaN(Number(e))||ur.has(e)||dr.test(e)||I(e)}function I(e){var t;var r=(t=w.exec(e))==null?void 0:t[1];return r?r.startsWith("length:")||fr.test(r):!1}function gr(e){var t;var r=(t=w.exec(e))==null?void 0:t[1];return r?r.startsWith("size:"):!1}function vr(e){var t;var r=(t=w.exec(e))==null?void 0:t[1];return r?r.startsWith("position:"):!1}function mr(e){var t;var r=(t=w.exec(e))==null?void 0:t[1];return r?r.startsWith("url(")||r.startsWith("url:"):!1}function H(e){var t;var r=(t=w.exec(e))==null?void 0:t[1];return r?!Number.isNaN(Number(r))||r.startsWith("number:"):!1}function p(e){var t;var r=(t=w.exec(e))==null?void 0:t[1];return r?Number.isInteger(Number(r)):Number.isInteger(Number(e))}function u(e){return w.test(e)}function M(){return!0}function x(e){return pr.test(e)}function hr(e){var t;var r=(t=w.exec(e))==null?void 0:t[1];return r?br.test(r):!1}function xr(){var e=s("colors"),r=s("spacing"),t=s("blur"),o=s("brightness"),i=s("borderColor"),l=s("borderRadius"),n=s("borderSpacing"),a=s("borderWidth"),c=s("contrast"),d=s("grayscale"),f=s("hueRotate"),b=s("invert"),h=s("gap"),k=s("gradientColorStops"),m=s("inset"),C=s("margin"),y=s("opacity"),z=s("padding"),L=s("saturate"),R=s("scale"),N=s("sepia"),O=s("skew"),B=s("space"),U=s("translate"),E=function(){return["auto","contain","none"]},T=function(){return["auto","hidden","clip","visible","scroll"]},$=function(){return["auto",r]},F=function(){return["",g]},S=function(){return["auto",p]},Z=function(){return["bottom","center","left","left-bottom","left-top","right","right-bottom","right-top","top"]},A=function(){return["solid","dashed","dotted","double","none"]},q=function(){return["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity","plus-lighter"]},W=function(){return["start","end","center","between","around","evenly"]},G=function(){return["","0",u]},J=function(){return["auto","avoid","all","avoid-page","page","left","right","column"]};return{cacheSize:500,theme:{colors:[M],spacing:[g],blur:["none","",x,I],brightness:[p],borderColor:[e],borderRadius:["none","","full",x,I],borderSpacing:[r],borderWidth:F(),contrast:[p],grayscale:G(),hueRotate:[p],invert:G(),gap:[r],gradientColorStops:[e],inset:$(),margin:$(),opacity:[p],padding:[r],saturate:[p],scale:[p],sepia:G(),skew:[p,u],space:[r],translate:[r]},classGroups:{aspect:[{aspect:["auto","square","video",u]}],container:["container"],columns:[{columns:[x]}],"break-after":[{"break-after":J()}],"break-before":[{"break-before":J()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],float:[{float:["right","left","none"]}],clear:[{clear:["left","right","both","none"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:[].concat(Z(),[u])}],overflow:[{overflow:T()}],"overflow-x":[{"overflow-x":T()}],"overflow-y":[{"overflow-y":T()}],overscroll:[{overscroll:E()}],"overscroll-x":[{"overscroll-x":E()}],"overscroll-y":[{"overscroll-y":E()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:[m]}],"inset-x":[{"inset-x":[m]}],"inset-y":[{"inset-y":[m]}],top:[{top:[m]}],right:[{right:[m]}],bottom:[{bottom:[m]}],left:[{left:[m]}],visibility:["visible","invisible","collapse"],z:[{z:[p]}],basis:[{basis:[r]}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["wrap","wrap-reverse","nowrap"]}],flex:[{flex:["1","auto","initial","none",u]}],grow:[{grow:G()}],shrink:[{shrink:G()}],order:[{order:["first","last","none",p]}],"grid-cols":[{"grid-cols":[M]}],"col-start-end":[{col:["auto",{span:[p]}]}],"col-start":[{"col-start":S()}],"col-end":[{"col-end":S()}],"grid-rows":[{"grid-rows":[M]}],"row-start-end":[{row:["auto",{span:[p]}]}],"row-start":[{"row-start":S()}],"row-end":[{"row-end":S()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":["auto","min","max","fr",u]}],"auto-rows":[{"auto-rows":["auto","min","max","fr",u]}],gap:[{gap:[h]}],"gap-x":[{"gap-x":[h]}],"gap-y":[{"gap-y":[h]}],"justify-content":[{justify:W()}],"justify-items":[{"justify-items":["start","end","center","stretch"]}],"justify-self":[{"justify-self":["auto","start","end","center","stretch"]}],"align-content":[{content:[].concat(W(),["baseline"])}],"align-items":[{items:["start","end","center","baseline","stretch"]}],"align-self":[{self:["auto","start","end","center","stretch","baseline"]}],"place-content":[{"place-content":[].concat(W(),["baseline","stretch"])}],"place-items":[{"place-items":["start","end","center","baseline","stretch"]}],"place-self":[{"place-self":["auto","start","end","center","stretch"]}],p:[{p:[z]}],px:[{px:[z]}],py:[{py:[z]}],pt:[{pt:[z]}],pr:[{pr:[z]}],pb:[{pb:[z]}],pl:[{pl:[z]}],m:[{m:[C]}],mx:[{mx:[C]}],my:[{my:[C]}],mt:[{mt:[C]}],mr:[{mr:[C]}],mb:[{mb:[C]}],ml:[{ml:[C]}],"space-x":[{"space-x":[B]}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":[B]}],"space-y-reverse":["space-y-reverse"],w:[{w:["auto","min","max","fit",r]}],"min-w":[{"min-w":["min","max","fit",g]}],"max-w":[{"max-w":["0","none","full","min","max","fit","prose",{screen:[x]},x,I]}],h:[{h:[r,"auto","min","max","fit"]}],"min-h":[{"min-h":["min","max","fit",g]}],"max-h":[{"max-h":[r,"min","max","fit"]}],"font-size":[{text:["base",x,I]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:["thin","extralight","light","normal","medium","semibold","bold","extrabold","black",H]}],"font-family":[{font:[M]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractons"],tracking:[{tracking:["tighter","tight","normal","wide","wider","widest",I]}],leading:[{leading:["none","tight","snug","normal","relaxed","loose",g]}],"list-style-type":[{list:["none","disc","decimal",u]}],"list-style-position":[{list:["inside","outside"]}],"placeholder-color":[{placeholder:[e]}],"placeholder-opacity":[{"placeholder-opacity":[y]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"text-color":[{text:[e]}],"text-opacity":[{"text-opacity":[y]}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[].concat(A(),["wavy"])}],"text-decoration-thickness":[{decoration:["auto","from-font",g]}],"underline-offset":[{"underline-offset":["auto",g]}],"text-decoration-color":[{decoration:[e]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],indent:[{indent:[r]}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",I]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap"]}],break:[{break:["normal","words","all","keep"]}],content:[{content:["none",u]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-opacity":[{"bg-opacity":[y]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:[].concat(Z(),[vr])}],"bg-repeat":[{bg:["no-repeat",{repeat:["","x","y","round","space"]}]}],"bg-size":[{bg:["auto","cover","contain",gr]}],"bg-image":[{bg:["none",{"gradient-to":["t","tr","r","br","b","bl","l","tl"]},mr]}],"bg-color":[{bg:[e]}],"gradient-from":[{from:[k]}],"gradient-via":[{via:[k]}],"gradient-to":[{to:[k]}],rounded:[{rounded:[l]}],"rounded-t":[{"rounded-t":[l]}],"rounded-r":[{"rounded-r":[l]}],"rounded-b":[{"rounded-b":[l]}],"rounded-l":[{"rounded-l":[l]}],"rounded-tl":[{"rounded-tl":[l]}],"rounded-tr":[{"rounded-tr":[l]}],"rounded-br":[{"rounded-br":[l]}],"rounded-bl":[{"rounded-bl":[l]}],"border-w":[{border:[a]}],"border-w-x":[{"border-x":[a]}],"border-w-y":[{"border-y":[a]}],"border-w-t":[{"border-t":[a]}],"border-w-r":[{"border-r":[a]}],"border-w-b":[{"border-b":[a]}],"border-w-l":[{"border-l":[a]}],"border-opacity":[{"border-opacity":[y]}],"border-style":[{border:[].concat(A(),["hidden"])}],"divide-x":[{"divide-x":[a]}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":[a]}],"divide-y-reverse":["divide-y-reverse"],"divide-opacity":[{"divide-opacity":[y]}],"divide-style":[{divide:A()}],"border-color":[{border:[i]}],"border-color-x":[{"border-x":[i]}],"border-color-y":[{"border-y":[i]}],"border-color-t":[{"border-t":[i]}],"border-color-r":[{"border-r":[i]}],"border-color-b":[{"border-b":[i]}],"border-color-l":[{"border-l":[i]}],"divide-color":[{divide:[i]}],"outline-style":[{outline:[""].concat(A())}],"outline-offset":[{"outline-offset":[g]}],"outline-w":[{outline:[g]}],"outline-color":[{outline:[e]}],"ring-w":[{ring:F()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:[e]}],"ring-opacity":[{"ring-opacity":[y]}],"ring-offset-w":[{"ring-offset":[g]}],"ring-offset-color":[{"ring-offset":[e]}],shadow:[{shadow:["","inner","none",x,hr]}],"shadow-color":[{shadow:[M]}],opacity:[{opacity:[y]}],"mix-blend":[{"mix-blend":q()}],"bg-blend":[{"bg-blend":q()}],filter:[{filter:["","none"]}],blur:[{blur:[t]}],brightness:[{brightness:[o]}],contrast:[{contrast:[c]}],"drop-shadow":[{"drop-shadow":["","none",x,u]}],grayscale:[{grayscale:[d]}],"hue-rotate":[{"hue-rotate":[f]}],invert:[{invert:[b]}],saturate:[{saturate:[L]}],sepia:[{sepia:[N]}],"backdrop-filter":[{"backdrop-filter":["","none"]}],"backdrop-blur":[{"backdrop-blur":[t]}],"backdrop-brightness":[{"backdrop-brightness":[o]}],"backdrop-contrast":[{"backdrop-contrast":[c]}],"backdrop-grayscale":[{"backdrop-grayscale":[d]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[f]}],"backdrop-invert":[{"backdrop-invert":[b]}],"backdrop-opacity":[{"backdrop-opacity":[y]}],"backdrop-saturate":[{"backdrop-saturate":[L]}],"backdrop-sepia":[{"backdrop-sepia":[N]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":[n]}],"border-spacing-x":[{"border-spacing-x":[n]}],"border-spacing-y":[{"border-spacing-y":[n]}],"table-layout":[{table:["auto","fixed"]}],transition:[{transition:["none","all","","colors","opacity","shadow","transform",u]}],duration:[{duration:[p]}],ease:[{ease:["linear","in","out","in-out",u]}],delay:[{delay:[p]}],animate:[{animate:["none","spin","ping","pulse","bounce",u]}],transform:[{transform:["","gpu","none"]}],scale:[{scale:[R]}],"scale-x":[{"scale-x":[R]}],"scale-y":[{"scale-y":[R]}],rotate:[{rotate:[p,u]}],"translate-x":[{"translate-x":[U]}],"translate-y":[{"translate-y":[U]}],"skew-x":[{"skew-x":[O]}],"skew-y":[{"skew-y":[O]}],"transform-origin":[{origin:["center","top","top-right","right","bottom-right","bottom","bottom-left","left","top-left",u]}],accent:[{accent:["auto",e]}],appearance:["appearance-none"],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",u]}],"caret-color":[{caret:[e]}],"pointer-events":[{"pointer-events":["none","auto"]}],resize:[{resize:["none","y","x",""]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":[r]}],"scroll-mx":[{"scroll-mx":[r]}],"scroll-my":[{"scroll-my":[r]}],"scroll-mt":[{"scroll-mt":[r]}],"scroll-mr":[{"scroll-mr":[r]}],"scroll-mb":[{"scroll-mb":[r]}],"scroll-ml":[{"scroll-ml":[r]}],"scroll-p":[{"scroll-p":[r]}],"scroll-px":[{"scroll-px":[r]}],"scroll-py":[{"scroll-py":[r]}],"scroll-pt":[{"scroll-pt":[r]}],"scroll-pr":[{"scroll-pr":[r]}],"scroll-pb":[{"scroll-pb":[r]}],"scroll-pl":[{"scroll-pl":[r]}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","pinch-zoom","manipulation",{pan:["x","left","right","y","up","down"]}]}],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",u]}],fill:[{fill:[e,"none"]}],"stroke-w":[{stroke:[g,H]}],stroke:[{stroke:[e,"none"]}],sr:["sr-only","not-sr-only"]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],rounded:["rounded-t","rounded-r","rounded-b","rounded-l","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],"scroll-m":["scroll-mx","scroll-my","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"]}}}export{yr as c,xr as g};
//# sourceMappingURL=default-config-640333b7.js.map
