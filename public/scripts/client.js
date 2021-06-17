/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
//const $tweet = $(`<article class="tweet">Hello world</article>`);

// Test / driver code (temporary). Eventually will get this from the server.

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function (tweet) {
  const userName = tweet.user["name"];
  const handle = tweet.user["handle"];
  const content = escape(tweet.content["text"]);
  const paragraphID = "tweet-paragraph";
  const tweetUserClass = "tweet-user";
  const tweetIconsClass = "tweet-icons";
  const $tweet = $(
    `<article>
      <h3>
        <div class=${tweetUserClass}>
          <span>${userName}</span>
          <span>${handle}</span>
        </div>
      </h3>
      <p id=${paragraphID}>${content}</p>
      </hr>
      <div>
        <time>21:00</time>
        <div class=${tweetIconsClass}>
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </div>

      </article>`
  );

  return $tweet;
};

const renderTweets = function (tweets) {
  //Iterate through data objects and create tweets for each one
  $("#section-article").html("");
  for (const tweet in tweets) {
    const $tweetElement = createTweetElement(tweets[tweet]);
    $("#section-article").append($tweetElement);
  }
};

$(document).ready(function () {

  
  const loadTweets = function(){
    $.ajax("/tweets/",{
      data: JSON,
      method: "GET"
    }).then((result) => {
      //Sort results by time before calling renderTweets
      renderTweets(result);
    })
    .catch(err => {
      console.log(err);
    });
  }

  loadTweets();

  //Submit event for the form
  $("#tweet-submit").submit(function(event) {

    event.preventDefault();

    const queryString = $(this).serialize();
    const formValues = $(this).serializeArray();
    const textAreaString = formValues[0]["value"];
    //console.log("Entered STRING: " + textAreaString);

    if (textAreaString && textAreaString.length < 140) {
      $.ajax("/tweets/",{
        data: queryString,
        method: "POST"
      }).then((result) => {
        $("#error-message").html("");
        loadTweets();
      })
      .catch(err => {
        console.log(err);
      });

    } else {

      if(textAreaString.length > 140) {
        const $errMessageTooLong = $(
          `<span color="red">
            <i class="fas fa-exclamation-triangle" color="red"></i>
              Tweet is too long, please limit to 140 characters.
            <i class="fas fa-exclamation-triangle" color="red"></i>
          </span>`
        );
        $("#error-message").append($errMessageTooLong);
      }

      //alert("Unable to Post");
    }
    
  });




});
