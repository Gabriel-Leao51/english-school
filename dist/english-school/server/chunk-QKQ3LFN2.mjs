import './polyfills.server.mjs';
import{a as n}from"./chunk-PN6GMUDE.mjs";import{L as i,Q as s,f as e,yc as c}from"./chunk-OBIY6IM3.mjs";var h=(()=>{class o{constructor(t){this.http=t,this.apiUrl=`${n.apiUrl}/api/cursos`,this.cursoSelecionadoSubject=new e(null),this.cursoSelecionado$=this.cursoSelecionadoSubject.asObservable()}obterCursos(){return this.http.get(this.apiUrl)}obterCursoPorId(t){let r=`${this.apiUrl}/${t}`;return this.http.get(r)}selecionarCurso(t){this.cursoSelecionadoSubject.next(t)}limparCursoSelecionado(){this.cursoSelecionadoSubject.next(null)}static{this.\u0275fac=function(r){return new(r||o)(s(c))}}static{this.\u0275prov=i({token:o,factory:o.\u0275fac,providedIn:"root"})}}return o})();export{h as a};
