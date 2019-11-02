const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const morgan = require('morgan');
const app = express();
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const port = process.env.PORT || 3000;
const filter_url = "https://www.facebook.com/fbcameraeffects/testit/1233099840193548/ZWZlNWEyMWYyZmE0ZGE0MzU3Zjc2YWVmYzViYzI1YzM=/"

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
app.use(morgan('tiny'));

app.get('/', (request, response) => {
  response.json({
    info: "I'm here",
  });
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
    rounds: [
      {
        id: '1',
        model_id: '<mushroom_id here>',
        winner: '1',
        judge: '1',
        images: [
          'https://picsum.photos/1080/1920',
          'https://scontent-ort2-2.xx.fbcdn.net/v/t1.0-9/14713509_995433853900445_4536229211525512364_n.jpg?_nc_cat=110&_nc_oc=AQlS8-ml5gj9IVkg39UG2AvelXlTSUDha-8X1VOxFUHi7ZvZOQptsHg2-ndhEZ_5hNY&_nc_ht=scontent-ort2-2.xx&oh=f30fe67bb424c708a35e1600bc3ea00c&oe=5E64E849',
        ],
      },
    ],
    users: {
      id: '1',
    },
  });
});

app.get('/round/:id', (req, res) => {
  res.json({
    id: '1',
    model_id: '<mushroom_id here>',
    winner: '1',
    judge: '1',
    images: {
      1: {
        id: 1,
        url: 'https://picsum.photos/1080/1920',
      },
      2: {
        id: 2,
        url:
          'https://scontent-ort2-2.xx.fbcdn.net/v/t1.0-9/14713509_995433853900445_4536229211525512364_n.jpg?_nc_cat=110&_nc_oc=AQlS8-ml5gj9IVkg39UG2AvelXlTSUDha-8X1VOxFUHi7ZvZOQptsHg2-ndhEZ_5hNY&_nc_ht=scontent-ort2-2.xx&oh=f30fe67bb424c708a35e1600bc3ea00c&oe=5E64E849',
      },
    },
    users: {
      1: {
        id: '1',
      },
    },
  });
});

app.get('/fakeround/:id', (req, res) => {
  getPhotosInAlbum(req.params['id'], res)
})

app.post('/submit/:roundId', (req, res) => {
  console.log(req.body);

  res.json({ success: true });
});

app.get('/family', (req, res) => {
  let temp = uploadToAlbum(
    'sunny',
    108815843893898, // hard coded to upload test
    'https://scontent.xx.fbcdn.net/v/t1.15752-9/75250876_401139800772827_1141236539271938048_n.jpg?_nc_cat=107&_nc_oc=AQn7WIbXsLkCtkLluQdcq3-eRYSA2JQr73Vr8TW3wV6zoMdqFNPHlWtbdXMoucTkFu-nMFfrluqlzkpavfCbVvnI&_nc_ad=z-m&_nc_cid=0&_nc_zor=9&_nc_ht=scontent.xx&oh=f72d36b946ab731367f05c84ac332a95&oe=5E1B85A3'
  );

  res.status(205).send(JSON.stringify(temp));
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
      case 'setup':
          response = {
            text: `Click this link to add the filter ${filter_url}`,
          };
          break;
      default:
        response = {
          text: `Sorry, the available commands are as follows
        Setup - How do I play?
        Rules - what are the rules?
        Models - what are the images we're using?
        Judge <Googly|Mushroom> - It's time to judge!
        or you can upload the image!
        `,
        };
    }
  } else if (received_message.attachments) {
    console.log(`attachments: ${JSON.stringify(received_message.attachments)}`);
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
                  title: 'Round 1',
                  payload: `googly:::${attachment_url}`,
                },
                {
                  type: 'postback',
                  title: 'Round 2',
                  payload: `mushroom:::${attachment_url}`,
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
  let words = payload.split(':::');
  // Set the response based on the postback payload
  switch (words[0]) {
    case 'googly':
      uploadToAlbum('googly', 108815843893898, words[1]);
      let googly_url = "https://www.facebook.com/pg/ARples-to-ARples-108555977253218/photos/?tab=album&album_id=108815843893898"
      response = {
        text: `Thanks for the Round 1 submission, view it at ${googly_url}`
      };
      break;
    case 'mushroom':
      uploadToAlbum('mushroom', 108823223893160, words[1]);
      let mushroom_url = "https://www.facebook.com/pg/ARples-to-ARples-108555977253218/photos/?tab=album&album_id=108823223893160"
      response = {
        text: `Thanks for the Round 2 submission, view it at ${mushroom_url}`,
      };
      break;
    case 'sunshine':
      uploadToAlbum('sunshine', 108744723901010, words[1]);
      response = {
        text: 'Thanks for the sunshine submission',
      };
      break;
    case 'sudo cancel my submission':
      response = {
        text: 'Cancelling your submission',
      };
      break;
    default:
      response = {
        text: 'Where am I supposed to put this?',
      };
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
      qs: {
        access_token: PAGE_ACCESS_TOKEN,
      },
      method: 'POST',
      json: request_body,
    },
    (err, res, body) => {
      // console.log(`res`);
      console.log(JSON.stringify(res));
      // console.log(`body`);
      console.log(JSON.stringify(body));
      if (!err) {
        console.log('message sent!');
      } else {
        console.error('Unable to send message:' + err);
      }
    },
  );
}

function getPhotosInAlbum(album_id, res)
{
  var options = {
    method: 'GET',
    url: `https://graph.facebook.com/v5.0/${album_id}/photos`,
    headers: {},
    qs: { access_token: PAGE_ACCESS_TOKEN }
  };
  console.log(options);
  request(options, function(error, response, body) {
    if (error) {
      res.status(403).send(JSON.stringify(body));
      throw new Error(error);
    }
    else {
      console.log(body)
      let ids = JSON.parse(body).data.map(a => `https://graph.facebook.com/v5.0/${a.id}/picture?access_token=${PAGE_ACCESS_TOKEN}`);
      console.log(ids)
      res.status(200).send(ids);
    }
  });
}

function uploadToAlbum(tag, album_id, url) {
  console.log(`submitting to https://graph.facebook.com/v5.0/${album_id}/photos`)
  var options = {
    method: 'POST',
    url: `https://graph.facebook.com/v5.0/${album_id}/photos`,
    headers: {},
    form: {
      url: url,
      caption: tag,
      access_token: PAGE_ACCESS_TOKEN
    }
  };
  console.log(options);
  request(options, function(error, response, body) {
    if (error) throw new Error(error);
      console.log(body);
      body;
    // res.status(303).send(JSON.stringify(body));
  });
}
