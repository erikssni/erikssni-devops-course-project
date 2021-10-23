const { App } = require("@slack/bolt");
require("dotenv").config();
// Initializes your app with your bot token and signing secret
const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode:true, // enable the following to use socket mode
    appToken: process.env.APP_TOKEN
  });

app.command("/joke", async ({ command, ack, say }) => {
    try {
    await ack();

//file system module
var fs = require('fs');
 
// read file sample.json file
fs.readFile('./jokes.json',
    
    function(err, data) {       
        // json data
        var jsonData = data;
 
        // parse json
        var jsonParsed = JSON.parse(jsonData);

        // choose random joke
        const randomJoke = Math.round((Math.random() * jsonParsed.persons.length));

        // say joke
        say(jsonParsed.persons[randomJoke].body);
});
    } catch (error) {
        console.log("err")
    console.error(error);
    }
});

app.message(/.*/, async ({ command, say }) => {
  try {
    say("Hey! Write /joke to hear a joke");
  } catch (error) {
      console.log("err")
    console.error(error);
  }
});

(async () => {
  const port = 3000
  // Start your app
  await app.start(process.env.PORT || port);
  console.log(`⚡️ Slack Bolt app is running on port ${port}!`);
})();