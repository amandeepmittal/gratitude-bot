var twit = require('twit');
var config = require('./config');

var Twitter = new twit(config);

console.log('Gratitude Bot is running...');
// Gratitude bot
// send a Gratitude message when someone follows you
var stream = Twitter.stream('user');

function followed(event) {
  console.log('Followed event Running...');
  var name = event.source.name;
  var screenName = event.source.screen_name;

  // function which replies to every user that follows
  tweetNow('@' + screenName + ' ' + 'Thank you for the follow. 😊  How are you today?');
}

function tweetNow(text) {
  var tweet = {status: text}
  Twitter.post('statuses/update', tweet, function (err, data, reponse) {
    if (err) {
      console.log('Error replying...');
    } else {
      console.log('Success in replying...');
    }
  });
}

stream.on('follow', followed);