(this["webpackJsonpreact-complete-guide"]=this["webpackJsonpreact-complete-guide"]||[]).push([[0],{15:function(e,t,n){},17:function(e,t,n){},19:function(e,t,n){"use strict";n.r(t);var r=n(6),a=n.n(r),c=(n(15),n(7)),s=n(8),o=n(3),i=n(10),u=n(9),l=n(4),f=n(1),h=n.n(f);n(17);var p=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];for(var r=0,a=t;r<a.length;r++){var c=a[r];chrome.runtime.sendMessage(null,c,(function(e){return console.log("here from react!")}))}},g=n(2),d=n.n(g),b=n(0);function O(){return j.apply(this,arguments)}function j(){return j=Object(l.a)(h.a.mark((function e(){var t,n;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=function(){var e=Object(l.a)(h.a.mark((function e(t){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,t){chrome.storage.local.get("key",(function(t){e(null!==t&&void 0!==t&&t)}))})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),e.next=3,t("key");case 3:return n=e.sent,e.abrupt("return",n.key);case 5:case"end":return e.stop()}}),e)}))),j.apply(this,arguments)}var v={true:"iFrame on",false:"iFrame off"},m=function(e){Object(i.a)(n,e);var t=Object(u.a)(n);function n(e){var r;return Object(c.a)(this,n),p("51"),(r=t.call(this,e)).state={isToggleOn:null},r.handleClick=r.handleClick.bind(Object(o.a)(r)),r}return Object(s.a)(n,[{key:"componentDidMount",value:function(){var e=Object(l.a)(h.a.mark((function e(){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=this,e.next=3,O();case 3:e.t1=e.sent,e.t2={isToggleOn:e.t1},e.t3=function(){p("set value"+this.state.isToggleOn)},e.t0.setState.call(e.t0,e.t2,e.t3);case 7:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"handleClick",value:function(){this.setState((function(e){return{isToggleOn:!e.isToggleOn}}),(function(){chrome.storage.local.set({key:this.state.isToggleOn},p("state has been set to "+this.state.isToggleOn))}))}},{key:"render",value:function(){return Object(b.jsx)("button",{className:"hello",onClick:this.handleClick,children:v[this.state.isToggleOn]})}}]),n}(d.a.Component),k=m;function x(){return Object(b.jsx)("div",{class:"container",children:Object(b.jsxs)("div",{children:[Object(b.jsx)("h2",{children:"Javascript extension"}),Object(b.jsx)("p",{children:"Information: Grabs text from protected google docs pages"}),Object(b.jsx)(k,{})]})})}a.a.render(Object(b.jsx)(x,{}),document.getElementById("root"))}},[[19,1,2]]]);
//# sourceMappingURL=main.d7631345.chunk.js.map