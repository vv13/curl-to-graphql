(this["webpackJsonpcurl-to-graphql"]=this["webpackJsonpcurl-to-graphql"]||[]).push([[0],{100:function(e,t,r){},120:function(e,t,r){},145:function(e,t,r){"use strict";r.r(t);var a=r(0),n=r.n(a),c=r(78),s=r.n(c),i=(r(100),r(12)),u=r(30),o=r.n(u),l=r(46),d=r(54),b=r(79),h=r.n(b),j=r(80),x=r.n(j),f=r(55),p=r.n(f),O=r(187),v=r(188),m=r(183),y=r(190),g=r(184),k=r(186),C=r(189),w=r(87),q=r.n(w),S=r(90),H=r.n(S),N=r(85),E=r.n(N),A=r(88),I=r.n(A),T=r(181),G=r(89),D=r.n(G),J=r(182),z=(r(120),r(81)),M=r.n(z),R=r(82),B=r.n(R),F=r(16),L=r(83),P=r.n(L),U=function(e){var t=P.a.split(e);if("curl"!==t[0])return{};var r=function(e){return e.reduce((function(e,t){var r=Object(F.a)(e);return 0===t.indexOf("-X")?(r.push("-X"),r.push(t.slice(2))):r.push(t),r}),[])}(t),a={method:"GET",header:{},url:""},n="";return r.forEach((function(e){switch(!0){case $(e):a.url=e;break;case"-A"===e||"--user-agent"===e:n="user-agent";break;case"-H"===e||"--header"===e:n="header";break;case"-d"===e||"--data"===e||"--data-ascii"===e||"--data-raw"===e||"--data-binary"===e:n="data";break;case"-u"===e||"--user"===e:n="user";break;case"-I"===e||"--head"===e:a.method="HEAD";break;case"-X"===e||"--request"===e:n="method";break;case"-b"===e||"--cookie"===e:n="cookie";break;case"--compressed"===e:a.header["Accept-Encoding"]=a.header["Accept-Encoding"]||"deflate, gzip";break;case!!e:switch(n){case"header":var t=W(e);a.header[t[0]]=t[1],n="";break;case"user-agent":a.header["User-Agent"]=e,n="";break;case"data":"GET"!==a.method&&"HEAD"!==a.method||(a.method="POST"),a.header["Content-Type"]=a.header["Content-Type"]||"application/x-www-form-urlencoded",a.body=a.body?a.body+"&"+e:e,n="";break;case"user":a.header.Authorization="Basic "+btoa(e),n="";break;case"method":a.method=e,n="";break;case"cookie":a.header["Set-Cookie"]=e,n=""}}})),a};var V={url:"",query:"",header:"",variables:"",method:"GET"};var X=function(e){try{return JSON.stringify(e,null,2)}catch(t){return""}},Q=function(e){try{return M.a.format(e,{parser:"graphql",plugins:[B.a]})}catch(t){return""}},$=function(e){return/^https?:\/\//.test(e)},W=function(e){return e.split(/: (.+)/)},K=r(56),Y=r.n(K);function Z(){var e=(new Date).getTime();return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(t){var r=(e+16*Math.random())%16|0;return e=Math.floor(e/16),("x"===t?r:7&r|8).toString(16)}))}var _=r(2),ee=[{key:"query",title:"Graphql Queries"},{key:"variables",title:"Graphql Variables"},{key:"header",title:"Request Headers"}],te=function(){var e=Object(d.a)(o.a.mark((function e(t){var r,a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=U(t),e.prev=1,e.next=4,x.a.request({method:r.method,url:r.url,headers:Object(l.a)({"Access-Control-Allow-Origin":"*"},r.header||{}),data:r.body.replace(/^\$/,"").replace(/\\(\\)?n/g,"")}).then((function(e){return e.data}));case 4:a=e.sent,e.next=10;break;case 7:return e.prev=7,e.t0=e.catch(1),e.abrupt("return",{error:e.t0});case 10:return e.abrupt("return",{data:a});case 11:case"end":return e.stop()}}),e,null,[[1,7]])})));return function(t){return e.apply(this,arguments)}}();var re=function(){var e=Object(a.useState)(""),t=Object(i.a)(e,2),r=t[0],n=t[1],c=Object(a.useState)(!1),s=Object(i.a)(c,2),u=s[0],b=s[1],j=Object(a.useState)(0),x=Object(i.a)(j,2),f=x[0],w=x[1],S=Object(a.useState)(""),N=Object(i.a)(S,2),A=N[0],G=N[1],z=Object(a.useState)(""),M=Object(i.a)(z,2),R=M[0],B=M[1],L=Object(a.useState)(""),P=Object(i.a)(L,2),$=P[0],W=P[1],K=function(){var e=Object(a.useState)([]),t=Object(i.a)(e,2),r=t[0],n=t[1];Object(a.useEffect)((function(){Y.a.getItem("curlHistories").then((function(e){e&&n(e)}))}),[]);var c=function(e){n(e),Y.a.setItem("curlHistories",e)},s=Object(a.useCallback)((function(e){return c([{curl:e,id:Z(),name:""}].concat(r))}),[r]),u=Object(a.useCallback)((function(e){c(r.filter((function(t){return t.id!==e})))}),[r]),o=Object(a.useCallback)((function(e){var t=Object(F.a)(r);t.splice(r.findIndex((function(t){return t.id===e.id})),1,e),c(t)}),[r]);return{curlHistories:r,pushHistory:s,removeHistory:u,changeHistory:o}}(),re=K.curlHistories,ae=K.pushHistory,ne=K.removeHistory,ce=K.changeHistory,se=Object(a.useMemo)((function(){return function(e){if(!e)return V;var t,r,a,n,c,s;try{var i=U(e);t=i.body||"",r=i.header||{},c=i.method,s=i.url;var u=JSON.parse(t.replace(/^\$/,"").replace(/\\(\\)?n/g,""));a=u.variables,n=u.query}catch(o){return V}return{url:s,method:c,query:Q(n),header:X(r),variables:X(a)}}(r)}),[r]),ie=h()(),ue=Object(i.a)(ie,2)[1],oe=function(){A&&(ce(Object(l.a)(Object(l.a)({},re.find((function(e){return e.id===$}))||{}),{},{name:A})),W(""),G(""))},le=Object(a.useMemo)((function(){return r&&!se.variables&&!se.query&&!se.header}),[r,se]),de=function(){var e=Object(d.a)(o.a.mark((function e(){var t,a,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return w(0),b(!0),t=Date.now(),e.prev=3,e.next=6,te(r);case 6:a=e.sent,n=a.data,B(JSON.stringify(n,null,2)),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(3),B(JSON.stringify(e.t0,null,2));case 14:return e.prev=14,b(!1),w(Date.now()-t),e.finish(14);case 18:case"end":return e.stop()}}),e,null,[[3,11,14,18]])})));return function(){return e.apply(this,arguments)}}();return Object(a.useEffect)((function(){B(""),w(0)}),[r]),Object(_.jsx)("div",{className:"App",children:Object(_.jsxs)("div",{className:"container",children:[Object(_.jsxs)("div",{className:"codeWrap",children:[Object(_.jsx)("h3",{children:"Graphql cURL"}),Object(_.jsx)("textarea",{className:p()("code",{showError:le}),value:r,placeholder:"Paste code here...",onChange:function(e){return n(e.target.value)}})]}),Object(_.jsxs)("div",{className:"responseInfo",children:[Object(_.jsxs)("h3",{children:["Response Data",!!f&&"\uff08".concat(f,"ms\uff09")]}),Object(_.jsx)("textarea",{readOnly:!0,className:p()("code",{showError:le}),value:R,onChange:function(e){return n(e.target.value)}})]}),ee.map((function(e){var t=e.key,r=e.title,a=se[t];return Object(_.jsxs)("div",{className:"show",children:[Object(_.jsx)("h3",{children:r}),Object(_.jsx)("textarea",{readOnly:!0,className:"targetValue",value:a}),a&&Object(_.jsx)("button",{className:"copyBtn",onClick:function(){return ue(a)},children:"copy"})]})})),Object(_.jsxs)("div",{className:"operations",children:[Object(_.jsx)(T.a,{loading:u,disabled:le||!r,onClick:de,children:"Run"}),Object(_.jsx)(O.a,{disabled:le||!r,onClick:function(){return ue(function(e){return"\nGraphql Queries:\n".concat(e.query,"\nGraphql Variables:\n").concat(e.variables,"\n\nRequest Headers:\n").concat(e.header,"\n")}(se))},children:"Copy Info"}),Object(_.jsx)(O.a,{disabled:le||!r,onClick:function(){return ae(r)},children:"Save"}),Object(_.jsx)(O.a,{disabled:!r,onClick:function(){return n("")},children:"clear"}),Object(_.jsx)(v.a,{dense:!1,className:"curlHistories",children:re.map((function(e){return Object(_.jsx)("div",{children:Object(_.jsxs)(m.a,{secondaryAction:Object(_.jsxs)("div",{children:[Object(_.jsx)(C.a,{onClick:function(){return n(e.curl)},edge:"end","aria-label":"publish",children:Object(_.jsx)(E.a,{})}),Object(_.jsx)(C.a,{style:{marginLeft:"15px"},edge:"end","aria-label":"delete",onClick:function(){return ne(e.id)},children:Object(_.jsx)(q.a,{})})]}),children:[Object(_.jsx)(y.a,{children:Object(_.jsx)(k.a,{children:Object(_.jsx)(I.a,{})})}),Object(_.jsx)(g.a,{primary:Object(_.jsx)(J.a,{style:{width:"250px"},disabled:$!==e.id,disableUnderline:!0,endAdornment:$===e.id?Object(_.jsx)(C.a,{size:"small",onClick:oe,children:Object(_.jsx)(D.a,{})}):Object(_.jsx)(C.a,{onClick:function(){return W((t=e).id),void G(t.name);var t},size:"small",children:Object(_.jsx)(H.a,{})}),value:$===e.id?A:e.name||"curl",size:"small",id:"standard-basic",placeholder:"Input some specific name...",onChange:function(e){return G(e.target.value)}}),secondary:e.curl})]})})}))})]})]})})},ae=function(e){e&&e instanceof Function&&r.e(3).then(r.bind(null,191)).then((function(t){var r=t.getCLS,a=t.getFID,n=t.getFCP,c=t.getLCP,s=t.getTTFB;r(e),a(e),n(e),c(e),s(e)}))};s.a.render(Object(_.jsx)(n.a.StrictMode,{children:Object(_.jsx)(re,{})}),document.getElementById("root")),ae()}},[[145,1,2]]]);
//# sourceMappingURL=main.dbb49828.chunk.js.map