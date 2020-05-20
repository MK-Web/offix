(window.webpackJsonp=window.webpackJsonp||[]).push([[104],{256:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return a})),n.d(t,"metadata",(function(){return l})),n.d(t,"rightToc",(function(){return c})),n.d(t,"default",(function(){return d}));var o=n(1),i=n(11),r=(n(0),n(288)),a={id:"conflict-client",title:"Client Side Conflict Resolution",sidebar_label:"Conflicts Client"},l={id:"version-0.8.2/conflict-client",title:"Client Side Conflict Resolution",description:"When performing data synchronization between multiple clients it is common for remote devices to become offline for a certain amount of time. As a result of being offline, data that is modified by a client can become outdated with the server. Further operations on that record can cause a conflict (often called a collision). For more information about offline workflows, please see [Offline Support](ref-offline.md)",source:"@site/versioned_docs/version-0.8.2/ref-conflict-client.md",permalink:"/docs/0.8.2/conflict-client",editUrl:"https://github.com/aerogear/graphback/edit/master/website/versioned_docs/version-0.8.2/ref-conflict-client.md",version:"0.8.2",sidebar_label:"Conflicts Client",sidebar:"version-0.8.2/docs",previous:{title:"Offix Cache",permalink:"/docs/0.8.2/offix-cache"},next:{title:"Server Side Conflict Resolution",permalink:"/docs/0.8.2/conflict-server"}},c=[{value:"Working with Conflict Resolution on Client",id:"working-with-conflict-resolution-on-client",children:[]},{value:"Default Conflict Implementation",id:"default-conflict-implementation",children:[{value:"Custom Conflict implementation by extening ObjectState",id:"custom-conflict-implementation-by-extening-objectstate",children:[]}]},{value:"Conflict Resolution Strategies",id:"conflict-resolution-strategies",children:[]},{value:"Listening to Conflicts",id:"listening-to-conflicts",children:[]}],s={rightToc:c};function d(e){var t=e.components,n=Object(i.a)(e,["components"]);return Object(r.b)("wrapper",Object(o.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(r.b)("p",null,"When performing data synchronization between multiple clients it is common for remote devices to become offline for a certain amount of time. As a result of being offline, data that is modified by a client can become outdated with the server. Further operations on that record can cause a conflict (often called a collision). For more information about offline workflows, please see ",Object(r.b)("a",Object(o.a)({parentName:"p"},{href:"/docs/0.8.2/offline-client"}),"Offline Support")),Object(r.b)("p",null,"Offix provides a way to manage and resolve these conflicts for any GraphQL type.\nConflict implementation will require additional elements in your application in order to work:"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"Mutation ",Object(r.b)("inlineCode",{parentName:"li"},"returnType")," added on context to any mutation"),Object(r.b)("li",{parentName:"ul"},"Additional metadata inside types (for example version field) depending on conflict implementation ")),Object(r.b)("p",null,"Conflict mechanism is divided between:"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"Conflict detection\nDevelopers can detect conflicts on resolver level"),Object(r.b)("li",{parentName:"ul"},"Conflict resolution\nConflicts are sent back to client and resolved by resending data back to server.")),Object(r.b)("p",null,"Offix allows developers to detect and resolve conflict without user interactions.\nBy default when no changes were made on the same fields, the implementation will try to resend the modified payload back to the server. When changes on the server and the client cover the same fields one of the specified conflict resolution strategies can be used. The default strategy will apply client changes on top of the server side.\nDevelopers can modify strategies to suit their needs."),Object(r.b)("h2",{id:"working-with-conflict-resolution-on-client"},"Working with Conflict Resolution on Client"),Object(r.b)("p",null,"To enable conflict resolution we fist need to configure our server side resolvers to perform conflict detection. Detection can rely on many different implementations and return the conflict error back to the client. For more information about how to do this, please see ",Object(r.b)("a",Object(o.a)({parentName:"p"},{href:"/docs/0.8.2/conflict-server"}),"Server Side Conflict Resolution")),Object(r.b)("p",null,"The client will then automatically resolve them based on the current strategy and notify listeners if the developer supplied any."),Object(r.b)("p",null,"Conflict resolution will work out of the box with the recommended defaults and does not require any specific handling on the client. "),Object(r.b)("blockquote",null,Object(r.b)("p",{parentName:"blockquote"},"For advanced use cases developers may customize their conflict implementation by supplying a custom ",Object(r.b)("inlineCode",{parentName:"p"},"conflictProvider")," in config. See Conflict Resolution Strategies below.")),Object(r.b)("h2",{id:"default-conflict-implementation"},"Default Conflict Implementation"),Object(r.b)("p",null,"By default, conflict resolution is configured to rely on a ",Object(r.b)("inlineCode",{parentName:"p"},"version")," field on each GraphQL type.\nVersion field will also need to be saved to the database in order to detect changes on the server"),Object(r.b)("p",null,"For example:"),Object(r.b)("pre",null,Object(r.b)("code",Object(o.a)({parentName:"pre"},{className:"language-javascript"}),"type User {\n  id: ID!\n  version: String!\n  name: String!\n}\n")),Object(r.b)("p",null,"The version field is controlled on the server and will map the last version that was sent from the server. All operations on the version field happen automatically, however, users need to make sure that the version field is always passed to server for mutations that supports conflict resolution:"),Object(r.b)("pre",null,Object(r.b)("code",Object(o.a)({parentName:"pre"},{className:"language-javascript"}),"type Mutation {\n  updateUser(id: ID!, version: String!): User\n}\n")),Object(r.b)("p",null,"Alternatively developers can create input elements that can be reused in every mutation and support conflict resolution."),Object(r.b)("pre",null,Object(r.b)("code",Object(o.a)({parentName:"pre"},{className:"language-javascript"}),"type Mutation {\n  updateUser(user: UserInput): User\n}\n")),Object(r.b)("h3",{id:"custom-conflict-implementation-by-extening-objectstate"},"Custom Conflict implementation by extening ObjectState"),Object(r.b)("p",null,"Offix enables flexibility on how conflicts are detected and resolved.\nIn many cases developers may need different ways of detecting conflits than relying on version field\nstored in database. For example if database already have ",Object(r.b)("inlineCode",{parentName:"p"},"changedAt")," field that is being supported by trigger it can be used as custom conflict implemementation."),Object(r.b)("p",null,"Under the hood conflicts implementations are extending an ",Object(r.b)("inlineCode",{parentName:"p"},"ObjectState")," interface.\nThis interface exist on both client and server and provides functions that help with detection and resolution of conflicts."),Object(r.b)("p",null,"The default implementation is ",Object(r.b)("inlineCode",{parentName:"p"},"VersionedObjectState"),". This means Offix expects all data which could be conflicted to have a version field. If this is not the case, developers can also provide custom state which Offix will then use for conflict resolution. To do this, Offix expects certain functions to be available under the ",Object(r.b)("inlineCode",{parentName:"p"},"conflictProvider")," option in config. These functions and their signatures are:"),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"assignServerState(client, server)")," - assigns the server state to the client state to reduce the chance of a second conflict."),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"hasConlict(client, server)")," - detects whether or not both sets of data are conflicted."),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"getStateFields()")," - returns an array of fields that should not be taken into account for conflict purposes."),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"currentState(objectWithState)")," - returns the current state of the object."),Object(r.b)("h2",{id:"conflict-resolution-strategies"},"Conflict Resolution Strategies"),Object(r.b)("p",null,"Offix allows developers to define custom conflict resolution strategies. You can provide custom conflict resolution strategies to the client in the config by using the provided ",Object(r.b)("inlineCode",{parentName:"p"},"ConflictResolutionStrategies")," type. By default developers do not need to pass any strategy as ",Object(r.b)("inlineCode",{parentName:"p"},"UseClient")," is the default. Custom strategies can be used also to provide different resolution strategy for certain operations:"),Object(r.b)("pre",null,Object(r.b)("code",Object(o.a)({parentName:"pre"},{className:"language-javascript"}),'let customStrategy = {\n  resolve = (base, server, client, operationName) => {\n    let resolvedData;\n    switch (operationName) {\n      case "updateUser":\n        delete client.socialKey\n        resolvedData = Object.assign(base, server, client)\n        break\n      case "updateRole":\n        client.role = "none"\n        resolvedData = Object.assign(base, server, client)\n        break\n      default:\n        resolvedData = Object.assign(base, server, client)\n    }\n    return resolvedData\n  }\n}\n')),Object(r.b)("p",null,"This custom strategy provides two custom strategies to be used when a conflict occurs. They are based on the name of the operation to give developers granular control. To use this custom strategy pass it as an argument to conflictStrategy in your config object:"),Object(r.b)("pre",null,Object(r.b)("code",Object(o.a)({parentName:"pre"},{className:"language-javascript"}),"let config = {\n...\n  conflictStrategy: customStrategy\n...\n}\n")),Object(r.b)("h2",{id:"listening-to-conflicts"},"Listening to Conflicts"),Object(r.b)("p",null,"Offix allows developers to receive information about the data conflict that occurred between the client and the server. The client can be notified in one of two scenarios."),Object(r.b)("p",null,"When a conflict occurs Offix will attempt to do a field level resolution of data - meaning it will check all fields of your type to see if both the client or server has changed them."),Object(r.b)("p",null,"If both client and server have changed any of the same fields then the ",Object(r.b)("inlineCode",{parentName:"p"},"conflictOccurred")," method of your ",Object(r.b)("inlineCode",{parentName:"p"},"ConflictListener")," will be triggered."),Object(r.b)("p",null,"If the client and server have not changed any of the same fields and the data can be easily merged then the ",Object(r.b)("inlineCode",{parentName:"p"},"mergeOccurred")," method of your ",Object(r.b)("inlineCode",{parentName:"p"},"ConflictListener")," will be triggered."),Object(r.b)("p",null,"Developers can supply their own ",Object(r.b)("inlineCode",{parentName:"p"},"conflictListener")," implementation"),Object(r.b)("pre",null,Object(r.b)("code",Object(o.a)({parentName:"pre"},{className:"language-typescript"}),'class ConflictLogger implements ConflictListener {\n    conflictOccurred(operationName, resolvedData, server, client) {\n      console.log("Conflict occurred with the following:")\n      console.log(`data: ${JSON.stringify(resolvedData)}, server: ${JSON.stringify(server)}, client: ${JSON.stringify(client)}, operation:  ${JSON.stringify(operationName)}`);\n    }\n    mergeOccurred(operationName, resolvedData, server, client) {\n      console.log("Merge occurred with the following:")\n      console.log(`data: ${JSON.stringify(resolvedData)}, server: ${JSON.stringify(server)}, client: ${JSON.stringify(client)}, operation:  ${JSON.stringify(operationName)}`);\n    }\n  }\n}\n\nlet config = {\n...\n  conflictListener: new ConflictLogger()\n...\n}\n')))}d.isMDXComponent=!0},288:function(e,t,n){"use strict";n.d(t,"a",(function(){return f})),n.d(t,"b",(function(){return b}));var o=n(0),i=n.n(o);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,o,i=function(e,t){if(null==e)return{};var n,o,i={},r=Object.keys(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=i.a.createContext({}),d=function(e){var t=i.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l({},t,{},e)),n},f=function(e){var t=d(e.components);return i.a.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},u=Object(o.forwardRef)((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,a=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),f=d(n),u=o,b=f["".concat(a,".").concat(u)]||f[u]||p[u]||r;return n?i.a.createElement(b,l({ref:t},s,{components:n})):i.a.createElement(b,l({ref:t},s))}));function b(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,a=new Array(r);a[0]=u;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:o,a[1]=l;for(var s=2;s<r;s++)a[s]=n[s];return i.a.createElement.apply(null,a)}return i.a.createElement.apply(null,n)}u.displayName="MDXCreateElement"}}]);