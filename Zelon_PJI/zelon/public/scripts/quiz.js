(function() 
 {
  
  try {
    var allQuestions = []
    var x = $("#capturaLeng").text();
    for(i=0; i<x;i++){
      ans = $("#capturaAns-"+i).text();
      allQuestions[i] = {
        question: quest = $("#capturaQuest-"+i).text(),
        option0: opt0 = $("#capturaOp0-"+i).text(),
        option1: opt1 = $("#capturaOp1-"+i).text(),
        option2: opt2 = $("#capturaOp2-"+i).text(),
        option3: opt3 = $("#capturaOp3-"+i).text(),
        answer: parseInt(ans)
      }  
    }
    
  } catch (error) {
    console.log(error);
    alert("Deu ruim");
  }
  var quesCounter = 0;
  var selectOptions = [];
  var quizSpace = $('#quiz');
    
  $('#avise').hide();

  $('.result-final').hide();
  nextQuestion();
    
  $('#next').click(function () 
    {
       
        chooseOption();
        if (isNaN(selectOptions[quesCounter])) 
        {
          $('#next').attr("disabled", true)
          $('#avise').fadeIn(1000)
          setTimeout(function(){$('#avise').fadeOut(1000)},2000);
          setTimeout(function(){$('#next').attr("disabled", false)},2000);
        } 
        else 
        {
          
          // // if(selectOptions[quesCounter] === allQuestions[quesCounter].answer){
          // //   $('#label'+selectOptions[quesCounter]).css("background-color","blue").delay(1000);
          // }
          $('#next').attr("disabled", true);
          quesCounter++;
          nextQuestion();
          setTimeout(function(){$('#next').attr("disabled", false)},800);
        }
    });
  
  $('#prev').click(function () 
    {
        $('#prev').attr("disabled", true);
        chooseOption();
        quesCounter--;
        nextQuestion();
        setTimeout(function(){$('#prev').attr("disabled", false)},800);
    });
  
  function createElement(index) 
    {
        var element = $('<div>',{id: 'question'});
        var header = $('<p id="num">' + (index + 1) +'/'+allQuestions.length+'</p>');
        element.append(header);

        var question = $('<p id="question-present">').append(allQuestions[index].question);
        element.append(question);

        var radio = radioButtons(index);
        element.append(radio);

        return element;
    }
  
  function radioButtons(index) 
    {
        var radioItems = $('<ul>');
        var item;
        var input = '';

        for (var i = 0; i < 4; i++) {
          item = $('<li>');
          input = '<input id='+i+' type="radio" name="answer" value=' + i + ' />';
          if(i==0){
            input += '<label class="option-answer" id="label'+i+'" for='+i+'>'+allQuestions[index].option0+'</label>';}
          if(i==1){
            input += '<label class="option-answer" id="label'+i+'" for='+i+'>'+allQuestions[index].option1+'</label>';}
          if(i==2){
            input += '<label class="option-answer" id="label'+i+'" for='+i+'>'+allQuestions[index].option2+'</label>';}
          if(i==3){
            input += '<label class="option-answer" id="label'+i+'" for='+i+'>'+allQuestions[index].option3+'</label>';}
          item.append(input);
          radioItems.append(item);
        }
        return radioItems;
  }
  
  function chooseOption() 
    {
        selectOptions[quesCounter] = +$('input[name="answer"]:checked').val();
    }
   
  function nextQuestion() 
    {
        quizSpace.fadeOut(function() 
            {
              $('#question').remove();
              if(quesCounter < allQuestions.length)
                {
                    var nextQuestion = createElement(quesCounter);
                    quizSpace.append(nextQuestion).fadeIn();
                    if (!(isNaN(selectOptions[quesCounter]))) 
                    {
                      $('input[value='+selectOptions[quesCounter]+']').prop('checked', true);
                    }
                    if(quesCounter === 1)
                    {
                      $('#prev').show();
                    } 
                    else if(quesCounter === 0)
                    {
                      $('#prev').hide();
                      $('#next').show();
                    }
                }
              else 
                {
                    var scoreRslt = displayResult();
                    quizSpace.append(scoreRslt).fadeIn();
                    $('#next').hide();
                    $('#prev').hide();
                }
        });
    }
  
  function displayResult() 
    {
        var score = $('<p>',{id: 'question'});
        var correct = 0;
        for (var i = 0; i < selectOptions.length; i++) 
        {
          if (selectOptions[i] === allQuestions[i].answer) 
          {
            correct++;
            $('#sugestao-'+i).hide();
          }
          if (correct == selectOptions.length){
            $('#com-base').hide();
            
          }
        }
        // score.append('You scored ' + correct + ' out of ' +allQuestions.length);
        $('.quiz-all').hide();
        $('.result-final').show();
        $('#pontuacao').append(correct+' / '+allQuestions.length)
        // return score;

  }
})();