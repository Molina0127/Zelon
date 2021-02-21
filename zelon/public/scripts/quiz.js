(function() 
 {
  var allQuestions = [{
    question: "The tree sends downroots from its branches to the soil is know as:",
    options: ["Oak", "Pine", "Banyan", "Palm"],
    answer: 2
  }, {
    question: "Electric bulb filament is made of",
    options: ["Copper", "Aluminum", "lead", "Tungsten"],
    answer: 3
  }, {
    question: "Non Metal that remains liquid at room temprature is",
    options: ["Phophorous", "Bromine", "Clorine","Helium"],
    answer: 1
  }
  //,{
  //   question: "Which of the following is used in Pencils ?",
  //   options: ["Graphite", "Silicon", "Charcoal", "Phosphorous"],
  //   answer: 0
  // }, {
  //   question: "Chemical formula of water ?",
  //   options: ["NaA1O2", "H2O", "Al2O3", "CaSiO3"],
  //   answer: 1
  // },{
  //   question: "The gas filled in electric bulb is ?",
  //   options: ["Nitrogen", "Hydrogen", "Carbon Dioxide", "Oxygen"],
  //   answer: 0
  // },{
  //   question: "Whashing soda is the comman name for",
  //   options: ["Sodium Carbonate", "Calcium Bicarbonate", "Sodium Bicarbonate", "Calcium Carbonate"],
  //   answer: 0
  // },{
  //   question: "Which gas is not known as green house gas ?",
  //   options: ["Methane", "Nitrous oxide", "Carbon Dioxide", "Hydrogen"],
  //   answer: 3
  // },{
  //   question: "The hardest substance availabe on earth is",
  //   options: ["Gold", "Iron", "Diamond", "Platinum"],
  //   answer: 2
  // },{
  //   question: "Used as a lubricant",
  //   options: ["Graphite", "Silica", "Iron Oxide", "Diamond"],
  //   answer: 0
  //   }
  ];
  
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
          $('#avise').fadeIn(1000)
          setTimeout(function(){$('#avise').fadeOut(1000)},2000);
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
        for (var i = 0; i < allQuestions[index].options.length; i++) {
          item = $('<li>');
          input = '<input id='+i+' type="radio" name="answer" value=' + i + ' />';
          input += '<label class="option-answer" id="label'+i+'" for='+i+'>'+allQuestions[index].options[i]+'</label>';
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
        }
        // score.append('You scored ' + correct + ' out of ' +allQuestions.length);
        $('.quiz-all').hide();
        $('.result-final').show();
        $('#pontuacao').append(correct+' / '+allQuestions.length)
        // return score;

       
  }
})();