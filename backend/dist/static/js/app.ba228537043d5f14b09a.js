webpackJsonp([1],{NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("7+uW"),n=a("mvHQ"),l=a.n(n),s={name:"Search",data:function(){return{input:"",goodsList:[],detail:{},detail_flag:!1}},methods:{onSearch:function(){if(this.detail_flag=!1,""!==this.input){var t=this;this.$axios.post("http://localhost:8000/searchSys/search/",{name:this.input}).then(function(e){if(e.data.status){var a=JSON.parse(l()(e.data.data));console.log(a),t.goodsList=a,console.log(t.goodsList)}console.log(e)}).catch(function(t){console.log(t)})}else alert("请先输入商品名称")},getImageUrl:function(t){return"http://localhost:8000/searchSys/img/"+t+"/"},getDetail:function(t){var e=this;this.$axios.post("http://localhost:8000/searchSys/detail/",{id:t}).then(function(t){if(t.data.status){var a=JSON.parse(l()(t.data.data));e.detail=a,e.detail_flag=!0}console.log(t)}).catch(function(t){console.log(t)})}}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{margin:"auto","margin-top":"40px"}},[a("el-container",[a("div",{staticStyle:{"margin-right":"5px"}},[a("el-input",{staticStyle:{"margin-right":"5px"},attrs:{placeholder:"请输入商品名称"},model:{value:t.input,callback:function(e){t.input=e},expression:"input"}})],1),t._v(" "),a("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.onSearch}},[t._v("搜索\n    ")])],1),t._v(" "),a("el-container",[a("div",[t.goodsList.length>0?a("p",{staticStyle:{"margin-bottom":"20px"}},[t._v("为您搜索到以下结果:")]):t._e(),t._v(" "),t._l(t.goodsList,function(e){return a("div",{key:e.id,on:{click:function(a){return t.getDetail(e.id)}}},[a("el-card",{staticStyle:{"margin-bottom":"10px",width:"500px"}},[a("el-container",[a("el-image",{staticStyle:{width:"100px",height:"auto"},attrs:{src:t.getImageUrl(e.id),fit:"contain"}}),t._v(" "),a("div",{staticStyle:{"margin-left":"30%"}},[a("div",[t._v("\n                商品名称："+t._s(e.name)+"\n              ")]),t._v(" "),a("div",[t._v("\n                剩余："+t._s(e.available)+" 件\n              ")]),t._v(" "),a("div",[t._v("\n                价格："+t._s(e.simple_image)+" 元\n              ")])])],1)],1)],1)})],2),t._v(" "),!0===t.detail_flag?a("div",{staticStyle:{"margin-left":"20px"}},[a("el-header",{staticStyle:{"text-align":"left","font-size":"20px"}},[a("span",[t._v(t._s(t.detail.name)+" 的详情页")])]),t._v(" "),a("el-card",{staticStyle:{"margin-bottom":"10px",width:"600px"}},[a("el-image",{staticStyle:{width:"auto",height:"300px"},attrs:{src:t.getImageUrl(t.detail.id),fit:"contain"}}),t._v(" "),a("div",{},[a("div",[t._v("\n              商品名称："+t._s(t.detail.name)+"\n            ")]),t._v(" "),a("div",[t._v("\n              库存："+t._s(t.detail.available)+" 件\n            ")]),t._v(" "),a("div",[t._v("\n              价格："+t._s(t.detail.image)+" 元\n            ")]),t._v(" "),a("div",[t._v("\n              上架日期："+t._s(t.detail.pub_date)+"\n            ")]),t._v(" "),a("div",{staticStyle:{"white-space":"pre-wrap"}},[a("hr"),t._v(" "),a("div",[t._v("商品介绍：")]),t._v("\n              "+t._s(t.detail.detail)+"\n            ")])])],1)],1):t._e()])],1)},staticRenderFns:[]};var r=a("VU/8")(s,o,!1,function(t){a("wDMx")},null,null).exports,c={name:"App",components:{Search:r}},d={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("h2",[this._v("欢迎使用简易商品检索系统")]),this._v(" "),e("Search",{attrs:{msg:" 欢迎使用简易商品搜索系统 "}})],1)},staticRenderFns:[]},p=a("VU/8")(c,d,!1,null,null,null).exports,v=a("/ocq");i.default.use(v.a);var u=new v.a({routes:[{path:"/",name:"Search",component:r}]}),_=a("zL8q"),h=a.n(_),g=(a("tvR6"),a("mtWM")),m=a.n(g);i.default.use(h.a),i.default.prototype.$axios=m.a,i.default.config.productionTip=!1,new i.default({el:"#app",router:u,components:{App:p},template:"<App/>"})},tvR6:function(t,e){},wDMx:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.ba228537043d5f14b09a.js.map