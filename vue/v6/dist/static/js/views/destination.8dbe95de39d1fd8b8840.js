webpackJsonp([8],{124:function(e,t,n){var o=n(0)(n(175),n(489),null,null);o.options.__file="/Users/xyloveqx/WHEEL/vue/v6/src/views/destination/index.vue",o.esModule&&Object.keys(o.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions."),e.exports=o.exports},125:function(e,t,n){var o=n(0)(n(176),n(477),null,null);o.options.__file="/Users/xyloveqx/WHEEL/vue/v6/src/views/destination/search.vue",o.esModule&&Object.keys(o.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] search.vue: functional components are not supported with templates, they should use render functions."),e.exports=o.exports},152:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(3),r=n(124),s=n.n(r),u=n(125),i=n.n(u),a=new o.c({routes:[{path:"/",component:s.a},{name:"search",path:"/search/:keyword",component:i.a},{path:"*",redirect:"/"}]});new o.a({router:a}).$mount("#app")},175:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={mounted:function(){console.log(this.$route.query)}}},176:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{msg:""}},mounted:function(){this.msg=this.$route.params}}},477:function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",[e._v("\n  search url?参数： "+e._s(e.msg)+"\n")])},staticRenderFns:[]},e.exports.render._withStripped=!0},489:function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._v("\n  目的地首页"),n("br"),e._v(" "),n("router-link",{attrs:{to:{name:"search",params:{keyword:"h5"}}}},[e._v("search")])],1)},staticRenderFns:[]},e.exports.render._withStripped=!0}},[152]);