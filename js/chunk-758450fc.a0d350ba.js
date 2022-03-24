(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-758450fc"],{e01a:function(e,t,a){"use strict";var o=a("23e7"),c=a("83ab"),n=a("da84"),l=a("e330"),d=a("1a2d"),i=a("1626"),r=a("3a9b"),s=a("577e"),b=a("9bf2").f,u=a("e893"),m=n.Symbol,p=m&&m.prototype;if(c&&i(m)&&(!("description"in p)||void 0!==m().description)){var j={},g=function(){var e=arguments.length<1||void 0===arguments[0]?void 0:s(arguments[0]),t=r(p,this)?new m(e):void 0===e?m():m(e);return""===e&&(j[t]=!0),t};u(g,m),g.prototype=p,p.constructor=g;var O="Symbol(test)"==String(m("test")),h=l(p.toString),v=l(p.valueOf),f=/^Symbol\((.*)\)[^)]+$/,E=l("".replace),y=l("".slice);b(p,"description",{configurable:!0,get:function(){var e=v(this),t=h(e);if(d(j,e))return"";var a=O?y(t,7,-1):E(t,f,"$1");return""===a?void 0:a}}),o({global:!0,forced:!0},{Symbol:g})}},fd15:function(e,t,a){"use strict";a.r(t);var o=a("7a23"),c={class:"container"},n=Object(o["createElementVNode"])("h1",null,"產品列表",-1),l={class:"table align-middle"},d=Object(o["createElementVNode"])("thead",null,[Object(o["createElementVNode"])("tr",null,[Object(o["createElementVNode"])("th"),Object(o["createElementVNode"])("th",null,"品項"),Object(o["createElementVNode"])("th",null,"金額"),Object(o["createElementVNode"])("th")])],-1),i=["src"],r={class:"btn-group"},s=["onClick"],b=["onClick"];function u(e,t,a,u,m,p){var j=Object(o["resolveComponent"])("Loading"),g=Object(o["resolveComponent"])("ProductModal"),O=Object(o["resolveComponent"])("Pagination");return Object(o["openBlock"])(),Object(o["createElementBlock"])("div",c,[Object(o["createVNode"])(j,{active:m.isLoading},null,8,["active"]),n,Object(o["createElementVNode"])("table",l,[d,Object(o["createElementVNode"])("tbody",null,[(Object(o["openBlock"])(!0),Object(o["createElementBlock"])(o["Fragment"],null,Object(o["renderList"])(m.products,(function(e){return Object(o["openBlock"])(),Object(o["createElementBlock"])("tr",{key:e.id},[Object(o["createElementVNode"])("td",null,[e.imageUrl?(Object(o["openBlock"])(),Object(o["createElementBlock"])("img",{key:0,class:"img-fluid",src:e.imageUrl,alt:"item.title"},null,8,i)):Object(o["createCommentVNode"])("",!0)]),Object(o["createElementVNode"])("td",null,Object(o["toDisplayString"])(e.title),1),Object(o["createElementVNode"])("td",null,[Object(o["createElementVNode"])("del",null,"原價:"+Object(o["toDisplayString"])(e.origin_price),1),Object(o["createElementVNode"])("p",null,"現在只要"+Object(o["toDisplayString"])(e.price),1)]),Object(o["createElementVNode"])("td",null,[Object(o["createElementVNode"])("div",r,[Object(o["createElementVNode"])("button",{type:"button",class:"btn btn-outline-secondary me-1 rounded",onClick:Object(o["withModifiers"])((function(t){return p.getMore(e.id)}),["prevent"])}," 查看更多 ",8,s),Object(o["createElementVNode"])("button",{type:"button",class:"btn btn-outline-danger rounded",onClick:Object(o["withModifiers"])((function(t){return p.addToCart(e.id)}),["prevent"])}," 加入購物車 ",8,b)])])])})),128))])]),Object(o["createVNode"])(g,{ref:"productModal","modal-data":m.product,onAddToCart:p.addToCart},null,8,["modal-data","onAddToCart"]),Object(o["createVNode"])(O,{onEmitPages:p.getProducts,pages:m.pagination},null,8,["onEmitPages","pages"])])}a("99af"),a("a4d3"),a("e01a");var m={class:"modal fade",id:"productModal",tabindex:"-1","aria-labelledby":"productModalLabel","aria-hidden":"true",ref:"modal"},p={class:"modal-dialog modal-xl"},j={class:"modal-content"},g={class:"modal-header bg-dark text-white"},O={class:"modal-title",id:"productModalLabel"},h=Object(o["createElementVNode"])("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"},null,-1),v={class:"modal-body"},f={class:"row"},E={class:"col-sm-6"},y=["src","alt"],V={class:"col-sm-6"},N={class:"badge mb-1 bg-primary rounded-pill"},k={class:"h5 mb-3"},D={class:"h5 my-3"},M={key:0},S={class:"h5"},C={key:1},w={class:"h6 text-secondary"},B={class:"h5 fw-bold"},L={class:"input-group mb-3"},$=["disabled"];function P(e,t,a,c,n,l){return Object(o["openBlock"])(),Object(o["createElementBlock"])("div",m,[Object(o["createElementVNode"])("div",p,[Object(o["createElementVNode"])("div",j,[Object(o["createElementVNode"])("div",g,[Object(o["createElementVNode"])("h5",O,Object(o["toDisplayString"])(a.modalData.title),1),h]),Object(o["createElementVNode"])("div",v,[Object(o["createElementVNode"])("div",f,[Object(o["createElementVNode"])("div",E,[Object(o["createElementVNode"])("img",{class:"img-fluid",src:a.modalData.imageUrl,alt:a.modalData.title},null,8,y)]),Object(o["createElementVNode"])("div",V,[Object(o["createElementVNode"])("h5",null,[Object(o["createElementVNode"])("span",N,Object(o["toDisplayString"])(a.modalData.category),1)]),Object(o["createElementVNode"])("p",k,"商品描述:"+Object(o["toDisplayString"])(a.modalData.description),1),Object(o["createElementVNode"])("p",D,"商品內容:"+Object(o["toDisplayString"])(a.modalData.content),1),a.modalData.price&&a.modalData.origin_price!==a.modalData.price?(Object(o["openBlock"])(),Object(o["createElementBlock"])("div",C,[Object(o["createElementVNode"])("del",w,Object(o["toDisplayString"])(a.modalData.origin_price),1),Object(o["createElementVNode"])("div",B,"優惠價"+Object(o["toDisplayString"])(a.modalData.price),1)])):(Object(o["openBlock"])(),Object(o["createElementBlock"])("div",M,[Object(o["createElementVNode"])("p",S,Object(o["toDisplayString"])(a.modalData.origin_price),1)])),Object(o["createElementVNode"])("div",L,[Object(o["withDirectives"])(Object(o["createElementVNode"])("input",{type:"number",class:"form-control","onUpdate:modelValue":t[0]||(t[0]=function(e){return n.qty=e}),min:"1"},null,512),[[o["vModelText"],n.qty,void 0,{number:!0}]]),Object(o["createElementVNode"])("button",{disabled:n.qty<=0||!n.qty,class:"btn btn-outline-secondary",type:"button",onClick:t[1]||(t[1]=function(t){return e.$emit("add-to-cart",a.modalData.id,n.qty)})}," 加入購物車 ",8,$)])])])])])])],512)}var q=a("7c2b"),x=a.n(q),T={props:{modalData:{type:Object}},data:function(){return{modal:"",qty:1}},mounted:function(){this.modal=new x.a(this.$refs.modal,{keyboard:!1})},methods:{openModal:function(){this.qty=1,this.modal.show()},hideModal:function(){this.modal.hide()}}},_=a("6b0d"),U=a.n(_);const A=U()(T,[["render",P]]);var J=A,F=a("4dcd"),z=a("1799"),G={data:function(){return{products:[],product:{},isLoading:!1,currentPage:1,pagination:{}}},methods:{getProducts:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.isLoading=!0,this.currentPage=t;var a="".concat("https://vue3-course-api.hexschool.io/v2/","api/").concat("jasper07301","/products?page=").concat(t);this.$http.get(a).then((function(t){e.products=t.data.products,e.pagination=t.data.pagination,e.isLoading=!1})).catch((function(t){e.isLoading=!1,e.$httpMessageState(t.response,"產品列表")}))},getMore:function(e){var t=this;this.isLoading=!0;var a="".concat("https://vue3-course-api.hexschool.io/v2/","api/").concat("jasper07301","/product/").concat(e);this.$http.get(a).then((function(e){t.product=e.data.product,t.$refs.productModal.openModal(),t.isLoading=!1})).catch((function(e){t.isLoading=!1,t.$httpMessageState(e.response,"查看")}))},addToCart:function(e){var t=this,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;this.isLoading=!0;var o="".concat("https://vue3-course-api.hexschool.io/v2/","api/").concat("jasper07301","/cart"),c={data:{product_id:e,qty:a}};this.$http.post(o,c).then((function(e){t.$httpMessageState(e,"加入購物車"),t.$refs.productModal.hideModal(),t.isLoading=!1})).catch((function(e){t.$httpMessageState(e.response,"加入購物車")}))}},mounted:function(){var e=this;this.getProducts(),F["a"].on("get-cart",(function(){e.getCart()}))},components:{ProductModal:J,Pagination:z["a"]}};const H=U()(G,[["render",u]]);t["default"]=H}}]);
//# sourceMappingURL=chunk-758450fc.a0d350ba.js.map