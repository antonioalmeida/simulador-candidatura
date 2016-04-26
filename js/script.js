



//Declare Variables
var soma = 0;
var mediaacesso = 0;
var provas = 0;
var provasdeingresso = new Array();
var somadeprovas = 0;
var banda = true;

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

function calcular3 (x,y,z) {
  numero = Math.round(( parseInt(x) + parseInt(y) + parseInt(z))/3);
  return numero;
};

function calcular2 (x,y) {
  numero = Math.round(( parseInt(x) + parseInt(y))/2);
  return numero;
};

function verificarnota(x) {
  if (parseInt(x) > 20 | parseInt(x) < 0) {
    banda = false;
  };
};

function verificarexame(x) {
  if(parseInt(x) < 0 | parseInt(x) > 200) {
    banda = false;
  };
};

function verificarpercentagem(x) {
  if(parseInt(x) < 0 | parseInt(x) > 100) {
    banda = false;
  };
};

function showDivErro() {
  div = document.getElementById("erro");
  div.style.display = "block";
};

function closeDivErro() {
  div = document.getElementById("erro");
  div.style.display = "none";
};
/*  function showDivModal() {
div = document.getElementById("modal");
div.style.display = "block";
};*/

function ola() {

  var pt = document.getElementById("pt").value;
  var fil = document.getElementById("fil").value;
  var ing = document.getElementById("ing").value;
  var mat = document.getElementById("mat").value;
  var fq = document.getElementById("fq").value;
  var geo = document.getElementById("geo").value;
  var ai = document.getElementById("ai").value;
  var fisi = document.getElementById("fisi").value;
  var provas = document.getElementById("provas").value;
  var provapt = document.getElementById("provapt").checked;
  var provamat = document.getElementById("provamat").checked;
  var provafq = document.getElementById("provafq").checked;
  var provageo = document.getElementById("provageo").checked;


  var percentagemsec = 100-parseInt(provas);

  var examept = document.getElementById("examept").value;
  var examemat = document.getElementById("examemat").value;
  var examefq = document.getElementById("examefq").value;
  var examegeo = document.getElementById("examegeo").value;


  pt = Math.round((0.03*parseInt(examept))+(0.7*pt));
  mat = Math.round((0.03*parseInt(examemat))+(0.7*mat));
  fq = Math.round((0.03*parseInt(examefq))+(0.7*fq));
  geo = Math.round((0.03*parseInt(examegeo))+(0.7*geo));

  var notas = [pt,fil,ing,mat,fq,geo,ai,fisi];



  if (provapt) {
    provasdeingresso[provasdeingresso.length] = parseInt(examept);
  };

  if (provamat) {
    provasdeingresso[provasdeingresso.length] = parseInt(examemat);
  };

  if (provafq) {
    provasdeingresso[provasdeingresso.length] = parseInt(examefq);
  };

  if (provageo) {
    provasdeingresso[provasdeingresso.length] = parseInt(examegeo);
  };

  for (var i = 0; i < provasdeingresso.length; i++) {
    somadeprovas+= provasdeingresso[i];
  };

  var mediaprovas = parseInt(somadeprovas)/parseInt(provasdeingresso.length);

  for (var i = 0; i < notas.length; i++) {
    soma+= parseInt(notas[i]);
  };

  mediasec = Math.round((soma/8)*10);

  var mediaacesso = ((parseInt(provas)*parseInt(mediaprovas))+(parseInt(percentagemsec)*parseInt(mediasec)))/100;


};


function ok() {

  closeDivErro();

  var pt10 = document.getElementById("pt10").value;
  var pt11 = document.getElementById("pt11").value;
  var pt12 = document.getElementById("pt12").value;
  var pt = calcular3 (pt10, pt11, pt12);
  var pttexto = pt.toString();
  verificarnota(pt10);
  verificarnota(pt11);
  verificarnota(pt10);


  var fil10 = document.getElementById("fil10").value;
  var fil11 = document.getElementById("fil11").value;
  var fil = calcular2 (fil10, fil11);
  var filtexto = fil.toString();
  verificarnota(fil10);
  verificarnota(fil11);

  var ing10 = document.getElementById("ing10").value;
  var ing11 = document.getElementById("ing11").value;
  var ing = calcular2 (ing10, ing11);
  var ingtexto = ing.toString();
  verificarnota(ing10);
  verificarnota(ing11);

  var ef10 = document.getElementById("ef10").value;
  var ef11 = document.getElementById("ef11").value;
  var ef12 = document.getElementById("ef12").value;
  var ef = calcular3 (ef10, ef11, ef12);
  var eftexto = toString();
  verificarnota(ef10);
  verificarnota(ef11);
  verificarnota(ef12);

  var mat10 = document.getElementById("mat10").value;
  var mat11 = document.getElementById("mat11").value;
  var mat12 = document.getElementById("mat12").value;
  var mat = calcular3 (mat10, mat11, mat12);
  var mattexto = mat.toString();
  verificarnota(mat10);
  verificarnota(mat11);
  verificarnota(mat12);

  var fq10 = document.getElementById("fq10").value;
  var fq11 = document.getElementById("fq11").value;
  var fq = calcular2 (fq10, fq11);
  var fqtexto = fq.toString();
  verificarnota(fq10);
  verificarnota(fq11);

  var geo10 = document.getElementById("geo10").value;
  var geo11 = document.getElementById("geo11").value;
  var geo = calcular2 (geo10, geo11);
  var geotexto = geo.toString();
  verificarnota(geo10);
  verificarnota(geo11);

  var ai = document.getElementById("ai").value;
  verificarnota(ai);

  var fisi = document.getElementById("fisi").value;
  verificarnota(fisi);

  var provas = document.getElementById("provas").value;

  var provapt = document.getElementById("provapt").checked;
  var provamat = document.getElementById("provamat").checked;
  var provafq = document.getElementById("provafq").checked;
  var provageo = document.getElementById("provageo").checked;
  var desporto = document.getElementById("desporto").checked;


  var percentagemsec = 100-parseInt(provas);

  var examept = document.getElementById("examept").value;
  var examemat = document.getElementById("examemat").value;
  var examefq = document.getElementById("examefq").value;
  var examegeo = document.getElementById("examegeo").value;

  verificarexame(examept);
  verificarexame(examemat);
  verificarexame(examefq);
  verificarexame(examegeo);

  verificarpercentagem(provas);


  pt = Math.round((0.03*parseInt(examept))+(0.7*pt));
  mat = Math.round((0.03*parseInt(examemat))+(0.7*mat));
  fq = Math.round((0.03*parseInt(examefq))+(0.7*fq));
  geo = Math.round((0.03*parseInt(examegeo))+(0.7*geo));

  var notas = [pt,fil,ing,mat,fq,geo,ai,fisi];

  if (desporto) {
    notas[notas.length] = ef;
  };



  if (provapt) {
    provasdeingresso[provasdeingresso.length] = parseInt(examept);
  };

  if (provamat) {
    provasdeingresso[provasdeingresso.length] = parseInt(examemat);
  };

  if (provafq) {
    provasdeingresso[provasdeingresso.length] = parseInt(examefq);
  };

  if (provageo) {
    provasdeingresso[provasdeingresso.length] = parseInt(examegeo);
  };

  for (var i = 0; i < provasdeingresso.length; i++) {
    somadeprovas+= provasdeingresso[i];
  };

  var mediaprovas = Math.round(parseInt(somadeprovas)/provasdeingresso.length);

  for (var i = 0; i < notas.length; i++) {
    soma+= parseInt(notas[i]);
  };

  var mediasec = Math.round((soma/notas.length)*10);

  var mediaacesso = (Math.round(((parseInt(provas)*parseInt(mediaprovas))+(parseInt(percentagemsec)*parseInt(mediasec)))/10))/10;

  document.getElementById("provasprint").innerHTML = provas;
  document.getElementById("mediasechtml").innerHTML = mediasec;
  document.getElementById("mediaprovashtml").innerHTML = mediaprovas;
  document.getElementById("mediaacessohtml").innerHTML = mediaacesso;
  document.getElementById("percentagemsec").innerHTML = percentagemsec;


  soma = 0;
  somadeprovas = 0;
  provasdeingresso = new Array();

  if(banda == false) {
    showDivErro();
  };

  banda = true;

};



closeDivErro();

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */
var saveAs=saveAs||function(e){"use strict";if("undefined"==typeof navigator||!/MSIE [1-9]\./.test(navigator.userAgent)){var t=e.document,n=function(){return e.URL||e.webkitURL||e},o=t.createElementNS("http://www.w3.org/1999/xhtml","a"),r="download"in o,i=function(e){var t=new MouseEvent("click");e.dispatchEvent(t)},a=e.webkitRequestFileSystem,c=e.requestFileSystem||a||e.mozRequestFileSystem,u=function(t){(e.setImmediate||e.setTimeout)(function(){throw t},0)},f="application/octet-stream",s=0,d=500,l=function(t){var o=function(){"string"==typeof t?n().revokeObjectURL(t):t.remove()};e.chrome?o():setTimeout(o,d)},v=function(e,t,n){t=[].concat(t);for(var o=t.length;o--;){var r=e["on"+t[o]];if("function"==typeof r)try{r.call(e,n||e)}catch(i){u(i)}}},p=function(e){return/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob(["﻿",e],{type:e.type}):e},w=function(t,u,d){d||(t=p(t));var w,y,m,S=this,h=t.type,O=!1,R=function(){v(S,"writestart progress write writeend".split(" "))},b=function(){if((O||!w)&&(w=n().createObjectURL(t)),y)y.location.href=w;else{var o=e.open(w,"_blank");void 0==o&&"undefined"!=typeof safari&&(e.location.href=w)}S.readyState=S.DONE,R(),l(w)},g=function(e){return function(){return S.readyState!==S.DONE?e.apply(this,arguments):void 0}},E={create:!0,exclusive:!1};return S.readyState=S.INIT,u||(u="download"),r?(w=n().createObjectURL(t),o.href=w,o.download=u,void setTimeout(function(){i(o),R(),l(w),S.readyState=S.DONE})):(e.chrome&&h&&h!==f&&(m=t.slice||t.webkitSlice,t=m.call(t,0,t.size,f),O=!0),a&&"download"!==u&&(u+=".download"),(h===f||a)&&(y=e),c?(s+=t.size,void c(e.TEMPORARY,s,g(function(e){e.root.getDirectory("saved",E,g(function(e){var n=function(){e.getFile(u,E,g(function(e){e.createWriter(g(function(n){n.onwriteend=function(t){y.location.href=e.toURL(),S.readyState=S.DONE,v(S,"writeend",t),l(e)},n.onerror=function(){var e=n.error;e.code!==e.ABORT_ERR&&b()},"writestart progress write abort".split(" ").forEach(function(e){n["on"+e]=S["on"+e]}),n.write(t),S.abort=function(){n.abort(),S.readyState=S.DONE},S.readyState=S.WRITING}),b)}),b)};e.getFile(u,{create:!1},g(function(e){e.remove(),n()}),g(function(e){e.code===e.NOT_FOUND_ERR?n():b()}))}),b)}),b)):void b())},y=w.prototype,m=function(e,t,n){return new w(e,t,n)};return"undefined"!=typeof navigator&&navigator.msSaveOrOpenBlob?function(e,t,n){return n||(e=p(e)),navigator.msSaveOrOpenBlob(e,t||"download")}:(y.abort=function(){var e=this;e.readyState=e.DONE,v(e,"abort")},y.readyState=y.INIT=0,y.WRITING=1,y.DONE=2,y.error=y.onwritestart=y.onprogress=y.onwrite=y.onabort=y.onerror=y.onwriteend=null,m)}}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||this.content);"undefined"!=typeof module&&module.exports?module.exports.saveAs=saveAs:"undefined"!=typeof define&&null!==define&&null!=define.amd&&define([],function(){return saveAs});

function xixi () {
  var blob = new Blob(["Calculador da Média do Acesso ao Ensino Superior\nNotas finais:\nMédia de Ensino Secundário: " + mediasechtml.innerHTML + " pontos.\nMédia de Provas de Ingresso: " + mediaprovashtml.innerHTML + " pontos.\nMédia de Acesso ao Ensino Superior: " + mediaacessohtml.innerHTML + " pontos.\n\nObrigado por usar o nosso Calculador de Média de Acesso ao Ensino Superior\nAntónio Almeida © Copyright 2015"], {type: "text/plain;charset=utf-8"});
  saveAs(blob, "Média de Acesso ao Ensino Superior.txt");
};
