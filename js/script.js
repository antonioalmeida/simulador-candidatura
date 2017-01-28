
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
        $(this).next().val('0');
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
        else if(currentExams[2] && !currentExams[7]) { //Realizou Interno 2ª Fase mas não realizou Externo 2ª Fase
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
            else if(!currentExams[4] && currentExams[9]) { //Apenas Externo 2ª Fase ano anterior
                firstPhase = Math.round(Math.max(0.7*internal + 0.3*exam1a, exam1b, exam2b));
                secondPhase = Math.round(Math.max(firstPhase, 0.7*internal + 0.3*exam2a));
            }
            else if(currentExams[4] && !currentExams[9]) { //Apenas Interno 2ª Fase ano anterior
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

//Calculates all CFDs
var calculateAllCFDs = function() {
    var res = [];
    for(var i = 0; i < 9; i++)
        res.push(calculateCFD(i));
    return res;
}

//Get access values (provas de ingresso)
var getAccessValues = function() {
    var res = [];
    var current = "";

    for(var i = 0; i < 7; i++)
        res.push($('input[name^=access' + i + ']:checked').val());
    return res;
}

//Calculate Internal Final Score - First and Second Phase - FOR SPORT COURSES
var calculateInternalScoresSport = function() {
    var CFDs = calculateAllCFDs();

    var firstPhase = 0;
    var secondPhase = 0;

    for(var i = 0; i < 9; i++) {
        firstPhase += CFDs[i][0];
        secondPhase += CFDs[i][1];
    }

    firstPhase = Math.trunc(firstPhase/9*10);
    secondPhase = Math.trunc(secondPhase/9*10);

    return [firstPhase, secondPhase];
}

//Calculate Internal Final Score - First and Second Phase
var calculateInternalScores = function() {
    var CFDs = calculateAllCFDs();

    var firstPhase = 0;
    var secondPhase = 0;

    for(var i = 0; i < 9; i++) {
        if(i != 3) { //All but Educação Física
            firstPhase += CFDs[i][0];
            secondPhase += CFDs[i][1];
        }
    }

    firstPhase = Math.trunc(firstPhase/8*10);
    secondPhase = Math.trunc(secondPhase/8*10);

    return [firstPhase, secondPhase];
}

//Calculate access exams score
var calculateAccessScores = function() {
    var accessValues = getAccessValues();

    var firstPhase = 0;
    var secondPhase = 0;
    var counter = 0;

    for(var i = 0; i < accessValues.length; i++) {
        var currentExams = getUnitExams(i);

        if(accessValues[i] == 'yes') {
            counter++;
            firstPhase += Math.max(currentExams[1], currentExams[6]); //Max First Phase Exam
            secondPhase += Math.max(currentExams[1], currentExams[6], currentExams[3], currentExams[8]); //Max of all exams
        }
    }
    firstPhase = Math.trunc((firstPhase/counter)*10)/10;
    secondPhase = Math.trunc((secondPhase/counter)*10)/10;

    return [firstPhase, secondPhase];
}

//Calculate final score (finally)
var calculateFinalScore = function() {
    var accessExamsWeight = $("#accessPercentage").val() / 100;
    var internalScoreWeight = 1 - accessExamsWeight;

    var accessScores = calculateAccessScores();
    var internalScores = calculateInternalScores();

    var firstPhase = accessScores[0] * accessExamsWeight + internalScores[0] * internalScoreWeight;
    var secondPhase = accessScores[1] * accessExamsWeight + internalScores[1] * internalScoreWeight;

    return [firstPhase, secondPhase];
}

//Calculate final score for SPORT courses
var calculateFinalScoreSport = function() {
    var accessExamsWeight = $("#accessPercentage").val() / 100;
    var internalScoreWeight = 1 - accessExamsWeight;

    var accessScores = calculateAccessScores();
    var internalScores = calculateInternalScoresSport();

    var firstPhase = (accessScores[0] * accessExamsWeight + internalScores[0] * internalScoreWeight).toPrecision(4);
    var secondPhase = (accessScores[1] * accessExamsWeight + internalScores[1] * internalScoreWeight).toPrecision(4);

    return [firstPhase, secondPhase];
}
