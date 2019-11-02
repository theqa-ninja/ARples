const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const port = process.env.PORT || 3000;

const models = ['sunshine', 'mushroom'];

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

// Add headers
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type',
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

console.log(`Page Token: ${PAGE_ACCESS_TOKEN}`);

app.get('/', (request, response) => {
  response.json({ info: "I'm here" });
});

app.get('/test', (request, response) => {
  response.json({
    user: '93857129',
    name: 'John Doe',
    photo:
      'https://scontent-ort2-2.xx.fbcdn.net/v/t1.0-9/14713509_995433853900445_4536229211525512364_n.jpg?_nc_cat=110&_nc_oc=AQlS8-ml5gj9IVkg39UG2AvelXlTSUDha-8X1VOxFUHi7ZvZOQptsHg2-ndhEZ_5hNY&_nc_ht=scontent-ort2-2.xx&oh=f30fe67bb424c708a35e1600bc3ea00c&oe=5E64E849',
  });
});

// Game stuff here

app.get('/game/:id', (req, res) => {
  res.json({
    id: '1',
    rounds: ['1'],
  });
});

app.get('/round/:id', (req, res) => {
  res.json({
    id: '1',
    model_id: '<mushroom_id here>',
    winner: '1',
    judge: '1',
  });
});

app.get('/user/:id', (req, res) => {
  res.json({
    id: '1',
  });
});

// Facebook api below here

// this was for verification
app.get('/webhook', (req, res) => {
  const VERIFY_TOKEN = 'blah';

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
  res.status(303).send('ugh');
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

      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      console.log('Sender PSID: ' + sender_psid);

      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);
      } else if (webhook_event.postback) {
        handlePostback(sender_psid, webhook_event.postback);
      }
    });

    // Return a '200 OK' response to all events
    res.status(200).send('EVENT_RECEIVED');
  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    console.log('beep 404 on webhook');
    res.sendStatus(404);
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

// Handles messages events
function handleMessage(sender_psid, received_message) {
  let response;

  // Checks if the message contains text
  if (received_message.text) {
    // parse message
    let words = received_message.text.toLowerCase().split(' ');
    // judge message
    switch (words[0]) {
      case 'judge':
        response = {
          attachment: {
            type: 'template',
            payload: {
              template_type: 'generic',
              elements: [
                {
                  title: 'Go forth and Judge',
                  subtitle: 'Which category do you want to judge?',
                  default_action: {
                    type: 'web_url',
                    url: 'https://arples.herokuapp.com/?round_id=' + words[1],
                  },
                  buttons: [
                    {
                      type: 'postback',
                      title: 'Googly Eyes!',
                      payload: 'googly',
                    },
                    {
                      type: 'postback',
                      title: 'Mushroom',
                      payload: 'mushroom',
                    },
                  ],
                },
              ],
            },
          },
        };
        break;
      case 'rules':
        response = {
          text: `With the following models, find the funniest place to take a photo`,
        };
        break;
      case 'models':
        response = {
          text: `the models are ${models.toString()}`,
        };
        break;
      default:
        response = {
          text: `Sorry, the available commands are as follows
        New - start a new game
        Rules - what are the rules?
        Models - what are the images we're using?
        or you can upload the image!
        `,
        };
    }
  } else if (received_message.attachments) {
    // Get the URL of the message attachment
    let attachment_url = received_message.attachments[0].payload.url;
    response = {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          elements: [
            {
              title: 'Which model is this picture?',
              subtitle: 'Tap a button to answer.',
              image_url: attachment_url,
              buttons: [
                {
                  type: 'postback',
                  title: 'Googly Eyes!',
                  payload: 'googly',
                },
                {
                  type: 'postback',
                  title: 'Mushroom',
                  payload: 'mushroom',
                },
                {
                  type: 'postback',
                  title: 'Cancel Submission',
                  payload: 'sudo cancel my submission',
                },
              ],
            },
          ],
        },
      },
    };
  }

  // Send the response message
  callSendAPI(sender_psid, response);
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
  let response;

  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload
  switch (payload) {
    case 'googly':
      response = { text: 'Thanks for the Googly eye submission' };
      break;
    case 'mushroom':
      response = { text: 'Thanks for the mushroom submission' };
      break;
    case 'sunshine':
      response = { text: 'Thanks for the sunshine submission' };
      break;
    case 'sudo cancel my submission':
      response = { text: 'Cancelling your submission' };
      break;
    default:
      response = { text: 'Where am I supposed to put this?' };
  }
  // Send the message to acknowledge the postback
  callSendAPI(sender_psid, response);
}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
  console.log(`response: ${response}`);
  // Construct the message body
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    message: response,
  };
  console.log(`token ${PAGE_ACCESS_TOKEN}`);
  // Send the HTTP request to the Messenger Platform
  request(
    {
      uri: 'https://graph.facebook.com/v2.6/me/messages',
      qs: { access_token: PAGE_ACCESS_TOKEN },
      method: 'POST',
      json: request_body,
    },
    (err, res, body) => {
      console.log(`res`);
      console.log(JSON.stringify(res));
      console.log(`body`);
      console.log(JSON.stringify(body));
      if (!err) {
        console.log('message sent!');
      } else {
        console.error('Unable to send message:' + err);
      }
    },
  );
}
