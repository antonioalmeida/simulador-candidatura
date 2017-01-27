
//Clipboardjs
var clipboard = new Clipboard('.clip', {
  text: function() {
    return 'http://simulcand.whoisantonio.com';
  }
});

clipboard.on('success', function(e) {
  console.log(e);
});

clipboard.on('error', function(e) {
  console.log(e);
});


$(document).ready(function() {

    //Toggle grades' box when respective checkbox is clicked
    $(".checker").click(function() {
        $(this).next().toggle();
    });

    //Same as above but specific for 2nd phase exams
    $(".checkerPhase2").click(function() {
        $(this).next().toggle();
        $(this).next().next().toggle();
    });

    //Bootstap's tooltip
    $('[data-toggle="tooltip"]').tooltip();

});


//Calculate a unit's CIF (without exams)
var calculateUnitInternalScore = function(index) {
    var values = $('input[name^=grade' + index + ']').map(function(idx, elem) {
        return parseInt($(elem).val());
    }).get();
    var sum = values.reduce(function(a,b) {return a+b});
    return Math.round(sum/values.length);
}

//Get exams' values (including checkboxes)
var getUnitExams = function(index) {
    var values = $('input[name^=exam' + index + ']').map(function(idx, elem) {
        //if current value is a number (actually, a string that holds a number), return the value (as a number)
        var currentValue = parseInt($(elem).val());
        if(!isNaN(currentValue))
            return currentValue;

        //if it's not a number, it's a checkox -> get checkbox value
        return $(elem).is(':checked');
    }).get();
    return values;
}

//Calculates all CIFs - returns an array with the results
var calculateCIFs = function() {
    var res = [];
    for(var i = 0; i < 9; i++)
        res.push(calculateUnitInternalScore(i));
    return res;
}

//Calculates CFD for the unit at 'index'
var calculateCFD = function(index) {
    var currentExams = getUnitExams(index);
    if(currentExams[0])  //Type1
        return calculateCFDType1(index);
    //Type2
    return calculateCFDType2(index);
}

//Calculates CFD for the unit at 'index' - Type1 - unit with Exame 1ª Fase Interno checked
var calculateCFDType1 = function(index) {
    var firstPhase = 0;
    var secondPhase = 0;
    var currentExams = getUnitExams(index);
    var internal = calculateUnitInternalScore(index);

    //Normalize exam results (from 1-200 to 1-20)
    var exam1a = Math.round(currentExams[1]*0.1); //Interno 1ª Fase
    var exam2a = Math.round(currentExams[3]*0.1); //Interno 2ª Fase
    var exam1b = Math.round(currentExams[6]*0.1); //Externo 1ª Fase
    var exam2b = Math.round(currentExams[8]*0.1); //Externo 2ª Fase

    if(!currentExams[5]) { // Não realizou Exame 1ª Fase Externo
        if(currentExams[2]) { // Exame 2ª Fase Interno
            if(currentExams[4]) {// Exame 2ª Fase -> checkbox ano anterior
                firstPhase = Math.round(0.7 * internal + 0.3 * Math.max(exam1a, exam2a));
                secondPhase = firstPhase;
            }
            else {
                firstPhase = Math.round(0.7 * internal + 0.3 * exam1a);
                secondPhase = Math.round(0.7* internal + 0.3 * Math.max(exam1a, exam2a))
            }
        }
        else { //Não realizou exame 2ª Fase Interno
            firstPhase = Math.round(0.7 * internal + 0.3 * exam1a);
            secondPhase = firstPhase;
        }
    }
    else { //Realizou Exame 1ª Fase Externo
        if(!currentExams[2] && !currentExams[7]) { //Não realizou Exame 2ª Fase Interno nem Exame 2ª Fase Externo
            firstPhase = Math.round(Math.max(0.7*internal + 0.3*exam1a,exam1b));
            secondPhase = firstPhase;
        }
        else if(currentExams[2] && !currentExams[7]) { //Realizou Externo 1ªFase mas não realizou Externo 2ª Fase
            if(currentExams[4]) { //Exame 2ª Fase Interno de ano anterior
                firstPhase = Math.round(Math.max(0.7*internal + 0.3 * Math.max(exam1a,exam2a), exam1b));
                secondPhase = Math.round(Math.max(firstPhase, 0.7*internal + 0.3*exam2a));
            }
            else {
                firstPhase = Math.round(Math.max(0.7*internal + 0.3*exam1a, exam1b));
                secondPhase = Math.round(Math.max(0.7*internal + 0.3*Math.max(exam1a,exam2a), exam1b));
            }
        }
        else if(!currentExams[2] && currentExams[7]) { //Não realizou Interno 2ª Fase e realizou Externo 2ª Fase
            if(currentExams[9]) { //Exame Externo 2ª Fase de ano anterior
                firstPhase = Math.round(Math.max(0.7*internal + 0.3*exam1a,exam1b,exam2b));
                secondPhase = firstPhase;
            }
            else {
                firstPhase = Math.round(Math.max(0.7*internal + 0.3*exam1a,exam1b));
                secondPhase = Math.round(Math.max(firstPhase, exam2b));
            }
        }
        else { //Realizou Interno 2ª Fase e Externo 2ª Fase
            if(currentExams[4] && currentExams[9]) { //Interno 2ª Fase e Externo 2ª Fase são de ano anterior
                firstPhase = Math.round(Math.max(0.7*internal + 0.3*Math.max(exam1a,exam2a), exam1b, exam2b));
                secondPhase = firstPhase;
            }
            if(!currentExams[4] && currentExams[9]) { //Apenas Externo 2ª Fase ano anterior
                firstPhase = Math.round(Math.max(0.7*internal + 0.3*exam1a, exam1b, exam2b));
                secondPhase = Math.round(Math.max(firstPhase, 0.7*internal + 0.3*exam2a));
            }
            if(currentExams[4] && !currentExams[9]) { //Apenas Interno 2ª Fase ano anterior
                firstPhase = Math.round(Math.max(0.7*internal + 0.3*Math.max(exam1a, exam2a, exam1b)));
                secondPhase = Math.round(Math.max(firstPhase,exam2b));
            }
            else {
                firstPhase = Math.round(Math.max(0.7*internal + 0.3*exam1a, exam1b));
                secondPhase = Math.round(Math.max(firstPhase, 0.7*internal + 0.3*exam2a, exam2b));
            }
        }
    }

    return [firstPhase,secondPhase];
}

//Calculates CFD for the unit at 'index' - Type2 - unit with Exame 1ª Fase Interno unchecked
var calculateCFDType2 = function(index) {
    var firstPhase = 0;
    var secondPhase = 0;
    var currentExams = getUnitExams(index);
    var internal = calculateUnitInternalScore(index);

    //Normalize exam results (from 1-200 to 1-20)
    var exam1b = Math.round(currentExams[6]*0.1); //Externo 1ª Fase
    var exam2b = Math.round(currentExams[8]*0.1); //Externo 2ª Fase

    if(!currentExams[5]) { //Não realizou Externo 1ª Fase
        firstPhase = internal;
        secondPhase = firstPhase;
    }
    else { //Realizou Externo 1ª Fase
        if(currentExams[7]) { //Realizou Externo 2ª Fase
            if(currentExams[9]) { //Externo 2ª Fase ano anterior
                firstPhase = Math.round(Math.max(internal, exam1b, exam2b));
                secondPhase = firstPhase;
            }
            else {
                firstPhase = Math.round(Math.max(internal, exam1b));
                secondPhase = Math.round(Math.max(firstPhase, exam2b));
            }
        }
    }

    return [firstPhase, secondPhase];
}


/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */
var saveAs=saveAs||function(e){"use strict";if("undefined"==typeof navigator||!/MSIE [1-9]\./.test(navigator.userAgent)){var t=e.document,n=function(){return e.URL||e.webkitURL||e},o=t.createElementNS("http://www.w3.org/1999/xhtml","a"),r="download"in o,i=function(e){var t=new MouseEvent("click");e.dispatchEvent(t)},a=e.webkitRequestFileSystem,c=e.requestFileSystem||a||e.mozRequestFileSystem,u=function(t){(e.setImmediate||e.setTimeout)(function(){throw t},0)},f="application/octet-stream",s=0,d=500,l=function(t){var o=function(){"string"==typeof t?n().revokeObjectURL(t):t.remove()};e.chrome?o():setTimeout(o,d)},v=function(e,t,n){t=[].concat(t);for(var o=t.length;o--;){var r=e["on"+t[o]];if("function"==typeof r)try{r.call(e,n||e)}catch(i){u(i)}}},p=function(e){return/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob(["﻿",e],{type:e.type}):e},w=function(t,u,d){d||(t=p(t));var w,y,m,S=this,h=t.type,O=!1,R=function(){v(S,"writestart progress write writeend".split(" "))},b=function(){if((O||!w)&&(w=n().createObjectURL(t)),y)y.location.href=w;else{var o=e.open(w,"_blank");void 0==o&&"undefined"!=typeof safari&&(e.location.href=w)}S.readyState=S.DONE,R(),l(w)},g=function(e){return function(){return S.readyState!==S.DONE?e.apply(this,arguments):void 0}},E={create:!0,exclusive:!1};return S.readyState=S.INIT,u||(u="download"),r?(w=n().createObjectURL(t),o.href=w,o.download=u,void setTimeout(function(){i(o),R(),l(w),S.readyState=S.DONE})):(e.chrome&&h&&h!==f&&(m=t.slice||t.webkitSlice,t=m.call(t,0,t.size,f),O=!0),a&&"download"!==u&&(u+=".download"),(h===f||a)&&(y=e),c?(s+=t.size,void c(e.TEMPORARY,s,g(function(e){e.root.getDirectory("saved",E,g(function(e){var n=function(){e.getFile(u,E,g(function(e){e.createWriter(g(function(n){n.onwriteend=function(t){y.location.href=e.toURL(),S.readyState=S.DONE,v(S,"writeend",t),l(e)},n.onerror=function(){var e=n.error;e.code!==e.ABORT_ERR&&b()},"writestart progress write abort".split(" ").forEach(function(e){n["on"+e]=S["on"+e]}),n.write(t),S.abort=function(){n.abort(),S.readyState=S.DONE},S.readyState=S.WRITING}),b)}),b)};e.getFile(u,{create:!1},g(function(e){e.remove(),n()}),g(function(e){e.code===e.NOT_FOUND_ERR?n():b()}))}),b)}),b)):void b())},y=w.prototype,m=function(e,t,n){return new w(e,t,n)};return"undefined"!=typeof navigator&&navigator.msSaveOrOpenBlob?function(e,t,n){return n||(e=p(e)),navigator.msSaveOrOpenBlob(e,t||"download")}:(y.abort=function(){var e=this;e.readyState=e.DONE,v(e,"abort")},y.readyState=y.INIT=0,y.WRITING=1,y.DONE=2,y.error=y.onwritestart=y.onprogress=y.onwrite=y.onabort=y.onerror=y.onwriteend=null,m)}}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||this.content);"undefined"!=typeof module&&module.exports?module.exports.saveAs=saveAs:"undefined"!=typeof define&&null!==define&&null!=define.amd&&define([],function(){return saveAs});

function xixi () {
  var blob = new Blob(["Calculador da Média do Acesso ao Ensino Superior\nNotas finais:\nMédia de Ensino Secundário: " + mediasechtml.innerHTML + " pontos.\nMédia de Provas de Ingresso: " + mediaprovashtml.innerHTML + " pontos.\nMédia de Acesso ao Ensino Superior: " + mediaacessohtml.innerHTML + " pontos.\n\nObrigado por usar o nosso Calculador de Média de Acesso ao Ensino Superior\nAntónio Almeida © Copyright 2015"], {type: "text/plain;charset=utf-8"});
  saveAs(blob, "Média de Acesso ao Ensino Superior.txt");
};
