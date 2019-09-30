$(function() {

  let index = 0;


  $("#activityText").text(header);
  $("#activityText").css({'color':headerColor});
  $('body').css({'background':bgColor});

  // url value
  let url = window.location.href;
  if(url.indexOf('?') > 0){
    let params = new URLSearchParams(url.substring(1));
    index = parseInt(params.get('qno'));
    console.log("url variable available....");
  }else{
    console.log("url variable not available...");
     let mainAudio = new Audio(data[0].audio);
     mainAudio.play();
  }
  



  let questionHtml = '';

  // function to load the data
  function loadData(){
      let question = data[index].question;

      // to append the questions
      $.each(question, function( index, value ) {
        let x = `<div class="suggData"><span>${value}</span></div>`;
        questionHtml = questionHtml +x;
      });
      $('.dropContainer').html(`<input type="text" class='${data[index].corrAns}' id='inputField' maxlength='1' />`)
      console.log(question);
      $('.dropSuggestions').html(questionHtml);
      
      // to play audio
       let mainAudio = new Audio(data[index].audio);
       mainAudio.play(); 


      // to append the img
      $('.imgContainer').html(`<img id="image" src="${data[index].img}" class="animated zoomIn slow">`);
  }  // end function to load the data



  loadData();



  // to check the input value.
  let inputField = $('#inputField');
  $(inputField).keyup(function(){
      checkValue();
  });

function checkValue(){
    let val = $(inputField).val().length;
    if(val == 1){
       if($(inputField).hasClass($(inputField).val())){
          console.log('correct');
                $(inputField).addClass('right');
                $('.happy').slideUp().fadeIn();
                $('.sad').hide();
                let audioData = new Audio(wellDone);
                audioData.play();
                  if(index == data.length-1){
                    $('#next').hide();
                  }else{
                    setTimeout(function(){
                       next();
                    },5000)
                  }
       }else{
        console.log('incorrect');
                $(inputField).addClass('wrong');
                $('.sad').slideUp().fadeIn();
                let audioData = new Audio(tryAgain);
                audioData.play();
                // setTimeout(function(){
                //   location.reload();
                // },5000)
       }
    }
  }

  $('#tryAgain').click(function(){
       location.reload();
  })

 function next(){
    console.log("i am the next one...");
    let audioData = new Audio(beepSound);
    audioData.play();
    index++;
    let url2 = window.location.pathname;
    var newurl = url2 + `?data=all&qno=${index}`;
    setTimeout(function(){
      window.location.href = newurl;
    },500)
    
  }

  $('#prev').click(function(){
    console.log("i am the prev one...");
    let audioData = new Audio(beepSound);
    audioData.play();
    index--;
    let url2 = window.location.pathname;
    var newurl = url2 + `?data=all&qno=${index}`;
    setTimeout(function(){
      window.location.href = newurl;
    },500)
  })

  if(index > 0){
    $('#prev').fadeIn();
  }else{
     $('#prev').hide();
  }




});