/*! For license information please see 8d0344ba.aceea07f.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[82],{234:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return a})),n.d(t,"metadata",(function(){return l})),n.d(t,"rightToc",(function(){return c})),n.d(t,"default",(function(){return f}));var r=n(1),o=n(11),i=(n(289),n(288)),a={id:"getting-started",title:"Getting Started",sidebar_label:"Getting Started"},l={id:"getting-started",title:"Getting Started",description:"Offix can be used with existing Apollo GraphQL applications as an extension to the Apollo Client.",source:"@site/../docs/getting-started.md",permalink:"/docs/next/getting-started",editUrl:"https://github.com/aerogear/graphback/edit/master/website/../docs/getting-started.md",version:"next",sidebar_label:"Getting Started",sidebar:"docs",next:{title:"Client Configuration",permalink:"/docs/next/client-configuration"}},c=[{value:"Installing Offix Client",id:"installing-offix-client",children:[]},{value:"Using the Client inside your application",id:"using-the-client-inside-your-application",children:[]},{value:"Offix Client Boost",id:"offix-client-boost",children:[]},{value:"Working with client",id:"working-with-client",children:[]},{value:"Non Offline realated API",id:"non-offline-realated-api",children:[]}],u={rightToc:c};function f(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(i.b)("wrapper",Object(r.a)({},u,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"Offix can be used with existing Apollo GraphQL applications as an extension to the Apollo Client.\nThe Offix Client provides additional methods that support various offline use cases. "),Object(i.b)("p",null,"Offix supports multiple platforms by extendable javascript library and individual wrappers for\nspecific web and cross platform frameworks. "),Object(i.b)("h2",{id:"installing-offix-client"},"Installing Offix Client"),Object(i.b)("p",null,"Using ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://www.npmjs.com/package/offix-client"}),"npm"),":"),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-shell"}),"npm install offix-client\n")),Object(i.b)("p",null,"Or ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://yarnpkg.com/en/package/offix-client"}),"yarn"),":"),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-shell"}),"yarn add offix-client\n")),Object(i.b)("h2",{id:"using-the-client-inside-your-application"},"Using the Client inside your application"),Object(i.b)("p",null,"To work with Offix you should create Offix client. "),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"NOTE: Offix client extends Apollo Client - if you already using Apollo Client you would need to\nswap it with the Offix client implementation")),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-javascript"}),"import { ApolloOfflineClient } from 'offix-client';\nimport { InMemoryCache } from 'apollo-cache-inmemory';\nimport { HttpLink } from \"apollo-link-http\";\n\nconst config = {\n  link: new HttpLink({ uri: 'http://example.com/graphql' })\n  cache: new InMemoryCache()\n};\n\n// create the client\nconst client = new ApolloOfflineClient(config);\n\n// initialise the client\n// Client needs to be installised before any other queries and mutations will happen.\n// Please see platform guide to see how this can be done in React, Angular etc.\nawait client.init();\n")),Object(i.b)("p",null,"The ",Object(i.b)("inlineCode",{parentName:"p"},"ApolloOfflineClient")," is a full ",Object(i.b)("inlineCode",{parentName:"p"},"ApolloClient")," but with some additional features for building offline workflows."),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Note")," ",Object(i.b)("inlineCode",{parentName:"p"},"client.init")," must be resolved before the application makes any queries/mutations, otherwise the cache and storage mechanisms may not work properly."),Object(i.b)("h2",{id:"offix-client-boost"},"Offix Client Boost"),Object(i.b)("p",null,"The ",Object(i.b)("inlineCode",{parentName:"p"},"offix-client-boost")," is a convenient way to create a client already bundled with all you nead to work with GraphQL.\nMainly an cache and ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://www.apollographql.com/docs/link/"}),"Apollo Links")," subscriptions and file uploads.\nOffix Boost is recomended if you trying to build your first GraphQL application and want to have seamless experience."),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),"import { createClient } from 'offix-client-boost'\n\nconst config = {\n  httpUrl: 'http://example.com/graphql',\n  wsUrl: 'ws://example.com/graphql'\n}\n\nconst client = await createClient(config)\n")),Object(i.b)("h2",{id:"working-with-client"},"Working with client"),Object(i.b)("p",null,"Client will offer the same API as Apollo GraphQL client.\nOffix will supply additional methods that help with offline experience."),Object(i.b)("p",null,"The following example shows the ",Object(i.b)("inlineCode",{parentName:"p"},"client.offlineMutate()")," method which support sending new mutation while the application is considered offline. "),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),"const options = {\n  mutation: gql`\n    mutation greeting($name: String!){\n    greeting(name: $name) {\n      body\n    }\n  }`,\n  variables: {\n    name: 'hello world!'\n  }\n};\n\nclient.offlineMutate(options).catch((error) => {\n  // we are offline - lets wait for changes\n  if(error.offline) {\n    error.watchOfflineChange().then((result) => {\n      console.log('mutation was completed after we came back online!', result)\n    })\n  }\n});\n")),Object(i.b)("p",null,"When offline, an error is returned with a reference to a promise which can be used to wait for the mutation to complete. This will happen when the application comes back online."),Object(i.b)("p",null,Object(i.b)("inlineCode",{parentName:"p"},"async/await")," can be used too."),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),"try {\n  await client.offlineMutate(options)\n} catch(error) {\n  if(error.offline) {\n    const result = await error.watchOfflineChange()\n    console.log('mutation was completed after we came back online!', result)\n  }\n}\n")),Object(i.b)("h2",{id:"non-offline-realated-api"},"Non Offline realated API"),Object(i.b)("p",null,Object(i.b)("inlineCode",{parentName:"p"},"ApolloOfflineClient")," is and extension of the Apollo GraphQL client and can be used with various web and mobile frameworks.\nFor basic concepts about Apollo GraphQL please refer to the documentation for your own platform."),Object(i.b)("p",null,"For React:\n",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://www.apollographql.com/docs/react/"}),"https://www.apollographql.com/docs/react/")),Object(i.b)("p",null,"For Angular:\n",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://www.apollographql.com/docs/angular/"}),"https://www.apollographql.com/docs/angular/")))}f.isMDXComponent=!0},288:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return d}));var r=n(0),o=n.n(r);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var u=o.a.createContext({}),f=function(e){var t=o.a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):l({},t,{},e)),n},p=function(e){var t=f(e.components);return o.a.createElement(u.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},b=Object(r.forwardRef)((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,a=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),p=f(n),b=r,d=p["".concat(a,".").concat(b)]||p[b]||s[b]||i;return n?o.a.createElement(d,l({ref:t},u,{components:n})):o.a.createElement(d,l({ref:t},u))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,a=new Array(i);a[0]=b;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:r,a[1]=l;for(var u=2;u<i;u++)a[u]=n[u];return o.a.createElement.apply(null,a)}return o.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"},289:function(e,t,n){"use strict";e.exports=n(290)},290:function(e,t,n){"use strict";var r=n(291),o="function"==typeof Symbol&&Symbol.for,i=o?Symbol.for("react.element"):60103,a=o?Symbol.for("react.portal"):60106,l=o?Symbol.for("react.fragment"):60107,c=o?Symbol.for("react.strict_mode"):60108,u=o?Symbol.for("react.profiler"):60114,f=o?Symbol.for("react.provider"):60109,p=o?Symbol.for("react.context"):60110,s=o?Symbol.for("react.forward_ref"):60112,b=o?Symbol.for("react.suspense"):60113,d=o?Symbol.for("react.memo"):60115,h=o?Symbol.for("react.lazy"):60116,m="function"==typeof Symbol&&Symbol.iterator;function y(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var O={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},g={};function w(e,t,n){this.props=e,this.context=t,this.refs=g,this.updater=n||O}function j(){}function v(e,t,n){this.props=e,this.context=t,this.refs=g,this.updater=n||O}w.prototype.isReactComponent={},w.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error(y(85));this.updater.enqueueSetState(this,e,t,"setState")},w.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},j.prototype=w.prototype;var x=v.prototype=new j;x.constructor=v,r(x,w.prototype),x.isPureReactComponent=!0;var C={current:null},k=Object.prototype.hasOwnProperty,S={key:!0,ref:!0,__self:!0,__source:!0};function N(e,t,n){var r,o={},a=null,l=null;if(null!=t)for(r in void 0!==t.ref&&(l=t.ref),void 0!==t.key&&(a=""+t.key),t)k.call(t,r)&&!S.hasOwnProperty(r)&&(o[r]=t[r]);var c=arguments.length-2;if(1===c)o.children=n;else if(1<c){for(var u=Array(c),f=0;f<c;f++)u[f]=arguments[f+2];o.children=u}if(e&&e.defaultProps)for(r in c=e.defaultProps)void 0===o[r]&&(o[r]=c[r]);return{$$typeof:i,type:e,key:a,ref:l,props:o,_owner:C.current}}function P(e){return"object"==typeof e&&null!==e&&e.$$typeof===i}var E=/\/+/g,_=[];function A(e,t,n,r){if(_.length){var o=_.pop();return o.result=e,o.keyPrefix=t,o.func=n,o.context=r,o.count=0,o}return{result:e,keyPrefix:t,func:n,context:r,count:0}}function $(e){e.result=null,e.keyPrefix=null,e.func=null,e.context=null,e.count=0,10>_.length&&_.push(e)}function R(e,t,n){return null==e?0:function e(t,n,r,o){var l=typeof t;"undefined"!==l&&"boolean"!==l||(t=null);var c=!1;if(null===t)c=!0;else switch(l){case"string":case"number":c=!0;break;case"object":switch(t.$$typeof){case i:case a:c=!0}}if(c)return r(o,t,""===n?"."+T(t,0):n),1;if(c=0,n=""===n?".":n+":",Array.isArray(t))for(var u=0;u<t.length;u++){var f=n+T(l=t[u],u);c+=e(l,f,r,o)}else if(null===t||"object"!=typeof t?f=null:f="function"==typeof(f=m&&t[m]||t["@@iterator"])?f:null,"function"==typeof f)for(t=f.call(t),u=0;!(l=t.next()).done;)c+=e(l=l.value,f=n+T(l,u++),r,o);else if("object"===l)throw r=""+t,Error(y(31,"[object Object]"===r?"object with keys {"+Object.keys(t).join(", ")+"}":r,""));return c}(e,"",t,n)}function T(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+(""+e).replace(/[=:]/g,(function(e){return t[e]}))}(e.key):t.toString(36)}function q(e,t){e.func.call(e.context,t,e.count++)}function I(e,t,n){var r=e.result,o=e.keyPrefix;e=e.func.call(e.context,t,e.count++),Array.isArray(e)?L(e,r,n,(function(e){return e})):null!=e&&(P(e)&&(e=function(e,t){return{$$typeof:i,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(e,o+(!e.key||t&&t.key===e.key?"":(""+e.key).replace(E,"$&/")+"/")+n)),r.push(e))}function L(e,t,n,r,o){var i="";null!=n&&(i=(""+n).replace(E,"$&/")+"/"),R(e,I,t=A(t,i,r,o)),$(t)}var M={current:null};function U(){var e=M.current;if(null===e)throw Error(y(321));return e}var D={ReactCurrentDispatcher:M,ReactCurrentBatchConfig:{suspense:null},ReactCurrentOwner:C,IsSomeRendererActing:{current:!1},assign:r};t.Children={map:function(e,t,n){if(null==e)return e;var r=[];return L(e,r,null,t,n),r},forEach:function(e,t,n){if(null==e)return e;R(e,q,t=A(null,null,t,n)),$(t)},count:function(e){return R(e,(function(){return null}),null)},toArray:function(e){var t=[];return L(e,t,null,(function(e){return e})),t},only:function(e){if(!P(e))throw Error(y(143));return e}},t.Component=w,t.Fragment=l,t.Profiler=u,t.PureComponent=v,t.StrictMode=c,t.Suspense=b,t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=D,t.cloneElement=function(e,t,n){if(null==e)throw Error(y(267,e));var o=r({},e.props),a=e.key,l=e.ref,c=e._owner;if(null!=t){if(void 0!==t.ref&&(l=t.ref,c=C.current),void 0!==t.key&&(a=""+t.key),e.type&&e.type.defaultProps)var u=e.type.defaultProps;for(f in t)k.call(t,f)&&!S.hasOwnProperty(f)&&(o[f]=void 0===t[f]&&void 0!==u?u[f]:t[f])}var f=arguments.length-2;if(1===f)o.children=n;else if(1<f){u=Array(f);for(var p=0;p<f;p++)u[p]=arguments[p+2];o.children=u}return{$$typeof:i,type:e.type,key:a,ref:l,props:o,_owner:c}},t.createContext=function(e,t){return void 0===t&&(t=null),(e={$$typeof:p,_calculateChangedBits:t,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider={$$typeof:f,_context:e},e.Consumer=e},t.createElement=N,t.createFactory=function(e){var t=N.bind(null,e);return t.type=e,t},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:s,render:e}},t.isValidElement=P,t.lazy=function(e){return{$$typeof:h,_ctor:e,_status:-1,_result:null}},t.memo=function(e,t){return{$$typeof:d,type:e,compare:void 0===t?null:t}},t.useCallback=function(e,t){return U().useCallback(e,t)},t.useContext=function(e,t){return U().useContext(e,t)},t.useDebugValue=function(){},t.useEffect=function(e,t){return U().useEffect(e,t)},t.useImperativeHandle=function(e,t,n){return U().useImperativeHandle(e,t,n)},t.useLayoutEffect=function(e,t){return U().useLayoutEffect(e,t)},t.useMemo=function(e,t){return U().useMemo(e,t)},t.useReducer=function(e,t,n){return U().useReducer(e,t,n)},t.useRef=function(e){return U().useRef(e)},t.useState=function(e){return U().useState(e)},t.version="16.13.1"},291:function(e,t,n){"use strict";var r=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable;function a(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},n=0;n<10;n++)t["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach((function(e){r[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(o){return!1}}()?Object.assign:function(e,t){for(var n,l,c=a(e),u=1;u<arguments.length;u++){for(var f in n=Object(arguments[u]))o.call(n,f)&&(c[f]=n[f]);if(r){l=r(n);for(var p=0;p<l.length;p++)i.call(n,l[p])&&(c[l[p]]=n[l[p]])}}return c}}}]);