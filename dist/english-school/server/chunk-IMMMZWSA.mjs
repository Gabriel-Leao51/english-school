import './polyfills.server.mjs';
import{$a as c,W as i,db as l,eb as o,kb as r,la as s,mb as a,mc as f,nb as p,sb as d,wb as m,yb as u}from"./chunk-OBIY6IM3.mjs";var h=["*"],M=e=>({display:e}),b=(()=>{class e{constructor(){this.isOpen=!1,this.closed=new s}closeModal(){this.isOpen=!1,this.closed.emit()}static{this.\u0275fac=function(t){return new(t||e)}}static{this.\u0275cmp=i({type:e,selectors:[["app-modal"]],inputs:{isOpen:"isOpen"},outputs:{closed:"closed"},standalone:!0,features:[m],ngContentSelectors:h,decls:5,vars:3,consts:[[1,"modal",3,"ngStyle"],[1,"modal-content"],[1,"close",3,"click"]],template:function(t,n){t&1&&(a(),l(0,"div",0)(1,"div",1)(2,"span",2),r("click",function(){return n.closeModal()}),d(3,"\xD7"),o(),p(4),o()()),t&2&&c("ngStyle",u(1,M,n.isOpen?"block":"none"))},dependencies:[f],styles:[".modal[_ngcontent-%COMP%]{display:block;position:fixed;z-index:1;left:0;top:0;width:100%;height:100%;overflow:auto;background-color:#1c1c1ce6}.modal-content[_ngcontent-%COMP%]{padding:none;border:1px solid #888;box-shadow:0 4px 10px #00000080;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);border-radius:6px;width:30%}.close[_ngcontent-%COMP%]{color:#464545;float:right;margin-right:.5rem;font-size:28px;font-weight:300;cursor:pointer}.close[_ngcontent-%COMP%]:hover, .close[_ngcontent-%COMP%]:focus{color:#000;text-decoration:none;cursor:pointer}@media (max-width: 768px){.modal-content[_ngcontent-%COMP%]{width:60%}}"]})}}return e})();export{b as a};
