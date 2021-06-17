

$(document).ready(function() {
  console.log("ready");

  /* EVENT HANDLERS ***********************************************************************
  //On click event
  $('#tweet-text').on('input',function(){

  });

  //KeyPress Event
  $( "#tweet-text" ).keypress(function() {
    console.log( "Handler for .keypress() called." );
  });

  //KeyDown Event
  $( "#tweet-text" ).keydown(function() {
    console.log( "Handler for .keydown() called." );
  });

  //OnChange
  $( ".tweet-text" ).change(function() {
    console.log( "Handler for .change() called." );
  });

 **********************************************************************************************/

  //KeyUP Event
  $( "#tweet-text" ).keyup(function() {
    $("#error-message").html("");
    const chars = $(this).val(); //Capture the characters from the text area
    //Update the counter
    if (chars.length === 141) {
      $('#current-count').css('color','red');
      $('#current-count').html('-1');  
    }
    if (chars.length < 141) {
      $('#current-count').html(String(chars.length));    
      $('#current-count').css('color','black');
    } else if (chars.length > 141) {
      negativeCount = Number($('#current-count').html());
      $('#current-count').css('color','red');
      $('#current-count').html(String(negativeCount - 1));  
    }
  });

});




