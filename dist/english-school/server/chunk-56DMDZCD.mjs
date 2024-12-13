import './polyfills.server.mjs';
import{a as q,b as v,c as D,d as A,f as j,h as N,i as V,j as z,k as R,l as $,m as G}from"./chunk-2Z63PRNR.mjs";import{a as Q}from"./chunk-QKQ3LFN2.mjs";import{a as x}from"./chunk-PN6GMUDE.mjs";import{$a as m,Ja as l,Ka as u,L as b,Q as E,W as g,Za as p,db as a,eb as o,fb as c,kb as P,lb as _,lc as w,pa as O,pb as S,qb as T,rb as F,sb as r,tc as I,wb as f,yc as k}from"./chunk-OBIY6IM3.mjs";import"./chunk-VVCT4QZE.mjs";var U=(()=>{class e{constructor(t){this.http=t,this.apiUrl=`${x.apiUrl}/api/mensagens`}enviarMensagem(t){return this.http.post(this.apiUrl,t)}static{this.\u0275fac=function(n){return new(n||e)(E(k))}}static{this.\u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})();function L(e,s){e&1&&(a(0,"span",23),r(1,"O nome \xE9 obrigat\xF3rio."),o())}function W(e,s){if(e&1&&(a(0,"div"),p(1,L,2,0,"span",22),o()),e&2){let t,n=_();l(),m("ngIf",(t=n.contatoForm.get("nome"))==null?null:t.hasError("required"))}}function J(e,s){e&1&&(a(0,"span",23),r(1,"O email \xE9 obrigat\xF3rio."),o())}function X(e,s){e&1&&(a(0,"span",23),r(1,"Digite um email v\xE1lido."),o())}function Y(e,s){if(e&1&&(a(0,"div"),p(1,J,2,0,"span",22)(2,X,2,0,"span",22),o()),e&2){let t,n,i=_();l(),m("ngIf",(t=i.contatoForm.get("email"))==null?null:t.hasError("required")),l(),m("ngIf",(n=i.contatoForm.get("email"))==null?null:n.hasError("email"))}}function Z(e,s){e&1&&(a(0,"span",23),r(1,"O assunto \xE9 obrigat\xF3rio."),o())}function ee(e,s){if(e&1&&(a(0,"div"),p(1,Z,2,0,"span",22),o()),e&2){let t,n=_();l(),m("ngIf",(t=n.contatoForm.get("assunto"))==null?null:t.hasError("required"))}}function te(e,s){e&1&&(a(0,"span",23),r(1,"A mensagem \xE9 obrigat\xF3ria."),o())}function ne(e,s){if(e&1&&(a(0,"div"),p(1,te,2,0,"span",22),o()),e&2){let t,n=_();l(),m("ngIf",(t=n.contatoForm.get("mensagem"))==null?null:t.hasError("required"))}}function oe(e,s){e&1&&(a(0,"span"),r(1,"Enviando..."),o())}function ae(e,s){e&1&&(a(0,"span"),r(1,"Enviar"),o())}function ie(e,s){e&1&&(a(0,"div",24),r(1," Mensagem enviada com sucesso! \u{1F604} "),o())}function re(e,s){e&1&&(a(0,"div",25),r(1," Ops! Ocorreu um erro ao enviar a mensagem. \u{1F622} "),o())}var B=(()=>{class e{constructor(t,n,i,d){this.contatoService=t,this.fb=n,this.cursoService=i,this.authService=d,this.enviandoMensagem=!1,this.mensagemEnviada=!1,this.erroEnvio=!1,this.cursoSelecionado=null}ngOnInit(){this.criarFormulario(),this.inscricaoCurso=this.cursoService.cursoSelecionado$.subscribe(t=>{this.cursoSelecionado=t,this.cursoSelecionado&&this.contatoForm.patchValue({assunto:`Matr\xEDcula no curso ${this.cursoSelecionado.titulo}`,mensagem:`Ol\xE1, gostaria de me matricular no curso ${this.cursoSelecionado.titulo}.`})}),this.authService.currentUser$.subscribe(t=>{t&&this.contatoForm.patchValue({nome:t.name,email:t.email})})}ngOnDestroy(){this.inscricaoCurso&&this.inscricaoCurso.unsubscribe(),this.cursoService.limparCursoSelecionado()}criarFormulario(){this.contatoForm=this.fb.group({nome:["",v.required],email:["",[v.required,v.email]],telefone:[""],assunto:["",v.required],mensagem:["",v.required]})}enviarFormulario(){if(this.contatoForm.invalid){this.contatoForm.markAllAsTouched();return}this.enviandoMensagem=!0,this.mensagemEnviada=!1,this.erroEnvio=!1,this.contatoService.enviarMensagem(this.contatoForm.value).subscribe(t=>{console.log("Resposta da API:",t),this.contatoForm.reset(),this.enviandoMensagem=!1,this.mensagemEnviada=!0},t=>{console.error("Erro ao enviar mensagem:",t),this.enviandoMensagem=!1,this.erroEnvio=!0})}static{this.\u0275fac=function(n){return new(n||e)(u(U),u(R),u(Q),u(G))}}static{this.\u0275cmp=g({type:e,selectors:[["app-contato-main"]],standalone:!0,features:[f],decls:48,vars:10,consts:[[1,"contato-container"],[1,"contato-rapido"],["href","#","target","_blank","rel","noopener noreferrer"],[1,"fab","fa-whatsapp"],[1,"fab","fa-instagram"],[1,"contato-formulario"],[3,"ngSubmit","formGroup"],[1,"form-control"],["for","nome"],["type","text","id","nome","name","nome","formControlName","nome","required",""],[4,"ngIf"],["for","email"],["type","email","id","email","name","email","formControlName","email","required",""],["for","telefone"],["type","tel","id","telefone","name","telefone","formControlName","telefone"],["for","assunto"],["type","text","id","assunto","name","assunto","formControlName","assunto","required",""],["for","mensagem"],["id","mensagem","name","mensagem","rows","5","formControlName","mensagem","required",""],["type","submit",3,"disabled"],["class","mensagem-sucesso",4,"ngIf"],["class","mensagem-erro",4,"ngIf"],["class","error-message",4,"ngIf"],[1,"error-message"],[1,"mensagem-sucesso"],[1,"mensagem-erro"]],template:function(n,i){if(n&1&&(a(0,"section",0)(1,"div",1)(2,"h2"),r(3,"Entre em contato conosco!"),o(),a(4,"p"),r(5," Tem alguma d\xFAvida? Entre em contato conosco atrav\xE9s dos nossos canais de atendimento: "),o(),a(6,"ul")(7,"li")(8,"a",2),c(9,"i",3),r(10," WhatsApp "),o()(),a(11,"li")(12,"a",2),c(13,"i",4),r(14," Instagram "),o()()()(),a(15,"div",5)(16,"form",6),P("ngSubmit",function(){return i.enviarFormulario()}),a(17,"h2"),r(18,"Ou envie uma mensagem:"),o(),a(19,"div",7)(20,"label",8),r(21,"Nome completo:"),o(),c(22,"input",9),p(23,W,2,1,"div",10),o(),a(24,"div",7)(25,"label",11),r(26,"Email:"),o(),c(27,"input",12),p(28,Y,3,2,"div",10),o(),a(29,"div",7)(30,"label",13),r(31,"Telefone:"),o(),c(32,"input",14),o(),a(33,"div",7)(34,"label",15),r(35,"Assunto:"),o(),c(36,"input",16),p(37,ee,2,1,"div",10),o(),a(38,"div",7)(39,"label",17),r(40,"Mensagem:"),o(),c(41,"textarea",18),p(42,ne,2,1,"div",10),o(),a(43,"button",19),p(44,oe,2,0,"span",10)(45,ae,2,0,"span",10),o(),p(46,ie,2,0,"div",20)(47,re,2,0,"div",21),o()()()),n&2){let d,C,y,h;l(16),m("formGroup",i.contatoForm),l(7),m("ngIf",((d=i.contatoForm.get("nome"))==null?null:d.touched)&&((d=i.contatoForm.get("nome"))==null?null:d.invalid)),l(5),m("ngIf",((C=i.contatoForm.get("email"))==null?null:C.touched)&&((C=i.contatoForm.get("email"))==null?null:C.invalid)),l(9),m("ngIf",((y=i.contatoForm.get("assunto"))==null?null:y.touched)&&((y=i.contatoForm.get("assunto"))==null?null:y.invalid)),l(5),m("ngIf",((h=i.contatoForm.get("mensagem"))==null?null:h.touched)&&((h=i.contatoForm.get("mensagem"))==null?null:h.invalid)),l(),m("disabled",i.enviandoMensagem),l(),m("ngIf",i.enviandoMensagem),l(),m("ngIf",!i.enviandoMensagem),l(),m("ngIf",i.mensagemEnviada),l(),m("ngIf",i.erroEnvio)}},dependencies:[$,j,q,D,A,z,N,V,w],styles:['.contato-container[_ngcontent-%COMP%]{margin-top:.3rem;padding:5rem 0 2rem;background:linear-gradient(to bottom right,var(--cor-fundo-alternativa),var(--cor-fundo));background-image:url(https://res.cloudinary.com/dxokgmnnc/image/upload/v1734039309/contato-bg_vcishb.jpg);background-size:auto;background-repeat:repeat-x;border-radius:8px;display:flex;align-items:flex-start;justify-content:space-between}.contato-container[_ngcontent-%COMP%] > h2[_ngcontent-%COMP%]{color:var(--cor-texto-primaria);font-family:Raleway,sans-serif;font-size:2.5em;margin-bottom:2rem;text-align:center;width:100%;text-shadow:2px 2px 4px rgba(0,0,0,.5)}.contato-rapido[_ngcontent-%COMP%]{text-align:left;width:45%;border-right:1px solid var(--cor-texto-secundaria);padding-top:2rem;padding-right:3rem;margin-bottom:2rem;margin-top:1.5rem;margin-left:2rem}.contato-rapido[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], .contato-rapido[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:var(--cor-texto-primaria);text-align:left;margin-left:15px}.contato-rapido[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{list-style:none;padding:0;display:flex;gap:1rem}.contato-rapido[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:inline-block;padding:1rem 1.5rem;border-radius:5px;text-decoration:none;color:var(--cor-texto-primaria);transition:all .3s ease}.contato-rapido[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{color:var(--cor-secundaria)}.contato-formulario[_ngcontent-%COMP%]{width:30%;padding:0 .5rem 1rem 2rem;margin:0 8rem 0 2rem;margin-top:-30px;border-radius:8px;display:flex;flex-direction:column;align-items:flex-start;background:linear-gradient(to bottom right,var(--cor-primaria-transparente),var(--cor-fundo-alternativa-transparente),rgba(31,31,31,.7))}.contato-formulario[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{color:var(--cor-texto-primaria);align-self:flex-start}.contato-formulario[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]{width:90%;align-self:flex-start;display:flex;flex-direction:column;gap:0rem}.contato-formulario[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{color:var(--cor-texto-primaria);margin-bottom:.5rem}.contato-formulario[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .contato-formulario[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]{width:90%;padding:.3rem;border:1px solid var(--cor-texto-secundaria);border-radius:5px;background-color:transparent;color:var(--cor-texto-primaria)}.form-control[_ngcontent-%COMP%]{margin-bottom:.8rem}.contato-formulario[_ngcontent-%COMP%]   button[type=submit][_ngcontent-%COMP%]{padding:1rem;max-width:100px;border:none;border-radius:5px;background-color:var(--cor-secundaria);color:var(--cor-texto-primaria);font-weight:700;cursor:pointer;transition:all .3s ease}.contato-formulario[_ngcontent-%COMP%]   button[type=submit][_ngcontent-%COMP%]:hover{background-color:var(--cor-destaque-1)}.contato-formulario[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]{color:#f44336;font-size:.8rem;margin-bottom:.5rem}.enviandoMensagem[_ngcontent-%COMP%]:after{content:" .";animation:_ngcontent-%COMP%_loading 1s infinite steps(3)}@keyframes _ngcontent-%COMP%_loading{0%{content:"."}33%{content:".."}66%{content:"..."}to{content:"."}}.mensagem-sucesso[_ngcontent-%COMP%]{color:var(--cor-destaque-1)}.mensagem-erro[_ngcontent-%COMP%]{color:var(--cor-destaque-2)}@media (max-width: 768px){.contato-container[_ngcontent-%COMP%]{flex-direction:column;align-items:center;padding:2rem 1rem}.contato-rapido[_ngcontent-%COMP%]{width:100%;border:none;text-align:center;padding:1rem}.contato-rapido[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{flex-direction:row;gap:10px;align-items:center;padding:0}.contato-rapido[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], .contato-rapido[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-left:0}.contato-formulario[_ngcontent-%COMP%]{width:70%;margin:1.5rem auto;padding:1rem;align-items:center}.contato-formulario[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]{align-self:initial}}']})}}return e})();var le=["mapaContainer"],K=(()=>{class e{constructor(t){this.platformId=t}ngAfterViewInit(){this.carregarAPI()}carregarAPI(){if(I(this.platformId)){let t=x.googleMapsApiKey,n=document.createElement("script");n.src=`https://maps.googleapis.com/maps/api/js?key=${t}&callback=inicializarMapa&loading=async`,n.async=!0,n.defer=!0,document.body.appendChild(n),window.inicializarMapa=this.inicializarMapa.bind(this)}}inicializarMapa(){let t=window.google.maps,n=new t.Map(this.mapaContainer.nativeElement,{center:{lat:-23.5606,lng:-46.6576},zoom:15,styles:[{elementType:"geometry",stylers:[{color:"#242f3e"}]},{elementType:"labels.text.stroke",stylers:[{color:"#242f3e"}]},{elementType:"labels.text.fill",stylers:[{color:"#746855"}]},{featureType:"administrative.locality",elementType:"labels.text.fill",stylers:[{color:"#d59563"}]},{featureType:"poi",elementType:"labels.text.fill",stylers:[{color:"#d59563"}]},{featureType:"poi.park",elementType:"geometry",stylers:[{color:"#263c3f"}]},{featureType:"poi.park",elementType:"labels.text.fill",stylers:[{color:"#6b9a76"}]},{featureType:"road",elementType:"geometry",stylers:[{color:"#38414e"}]},{featureType:"road",elementType:"geometry.stroke",stylers:[{color:"#212a37"}]},{featureType:"road",elementType:"labels.text.fill",stylers:[{color:"#9ca5b3"}]},{featureType:"road.highway",elementType:"geometry",stylers:[{color:"#746855"}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{color:"#1f2835"}]},{featureType:"road.highway",elementType:"labels.text.fill",stylers:[{color:"#f3d19c"}]},{featureType:"transit",elementType:"geometry",stylers:[{color:"#2f3948"}]},{featureType:"transit.station",elementType:"labels.text.fill",stylers:[{color:"#d59563"}]},{featureType:"water",elementType:"geometry",stylers:[{color:"#17263c"}]},{featureType:"water",elementType:"labels.text.fill",stylers:[{color:"#515c6d"}]},{featureType:"water",elementType:"labels.text.stroke",stylers:[{color:"#17263c"}]}]});new t.Marker({position:{lat:-23.5606,lng:-46.6576},map:n,title:"Keystone English"})}static{this.\u0275fac=function(n){return new(n||e)(u(O))}}static{this.\u0275cmp=g({type:e,selectors:[["app-mapa"]],viewQuery:function(n,i){if(n&1&&S(le,7),n&2){let d;T(d=F())&&(i.mapaContainer=d.first)}},standalone:!0,features:[f],decls:7,vars:0,consts:[["mapaContainer",""],[1,"mapa-container"],[1,"mapa"]],template:function(n,i){n&1&&(a(0,"div",1)(1,"h2"),r(2,"Venha nos conhecer pessoalmente!"),o(),a(3,"p"),r(4,"Avenida Paulista, 1775 - Bela Vista, S\xE3o Paulo - SP, 01311-901"),o(),c(5,"div",2,0),o())},styles:["h2[_ngcontent-%COMP%], p[_ngcontent-%COMP%]{color:var(--cor-texto-primaria)}.mapa-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;background:linear-gradient(to top,var(--cor-fundo),var(--cor-primaria))}.mapa[_ngcontent-%COMP%]{width:100%;height:400px;margin:0}"]})}}return e})();var Pe=(()=>{class e{static{this.\u0275fac=function(n){return new(n||e)}}static{this.\u0275cmp=g({type:e,selectors:[["app-contato"]],standalone:!0,features:[f],decls:2,vars:0,template:function(n,i){n&1&&c(0,"app-contato-main")(1,"app-mapa")},dependencies:[B,K],encapsulation:2})}}return e})();export{Pe as ContatoComponent};
