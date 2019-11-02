const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
console.log(`Page Token: ${PAGE_ACCESS_TOKEN}`)

app.get('/', (request, response) => {
  response.json({ info: 'I\'m here' })
})

app.get('/test', (request, response) => {
  response.json({ user: '93857129', name: 'John Doe', photo: 'https://scontent-ort2-2.xx.fbcdn.net/v/t1.0-9/14713509_995433853900445_4536229211525512364_n.jpg?_nc_cat=110&_nc_oc=AQlS8-ml5gj9IVkg39UG2AvelXlTSUDha-8X1VOxFUHi7ZvZOQptsHg2-ndhEZ_5hNY&_nc_ht=scontent-ort2-2.xx&oh=f30fe67bb424c708a35e1600bc3ea00c&oe=5E64E849' })
})

// this was for verification
app.get('/webhook', (req, res) => {
  const VERIFY_TOKEN = "blah";

    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    // Checks if a token and mode is in the query string of the request
    if (mode && token) {

      // Checks the mode and token sent is correct
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {

        // Responds with the challenge token from the request
        console.log('WEBHOOK_VERIFIED');
        res.status(200).send(challenge);

      } else {
        // Responds with '403 Forbidden' if verify tokens do not match
        res.sendStatus(403);
      }
    }
    res.status(303).send("ugh")

  });

app.post('/webhook', (req, res) => {
  // Parse the request body from the POST
  let body = req.body;

  // Check the webhook event is from a Page subscription
  if (body.object === 'page') {
    // Iterate over each entry - there may be multiple if batched
    body.entry.forEach(function(entry) {

      // Gets the body of the webhook event
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);

      // for the message text
      let text = webhook_event.message.text

      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      console.log('Sender PSID: ' + sender_psid);
      callSendAPI(sender_psid, text)

    });

    // Return a '200 OK' response to all events
    res.status(200).send('EVENT_RECEIVED');

  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    console.log('beep 404 on webhook')
    res.sendStatus(404);
  }

});

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

// Handles messages events
function handleMessage(sender_psid, received_message) {

}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {

}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
  console.log(`response: ${response}`)
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }
  console.log(`token ${PAGE_ACCESS_TOKEN}`)
  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    console.log(`res`)
    console.log(JSON.stringify(res));
    console.log(`body`)
    console.log(JSON.stringify(body))
    if (!err) {
      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  });
}