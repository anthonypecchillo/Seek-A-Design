const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const inquiries = require('../database');
const findInquiryAndUpdate = require('../database/controllers/inquiry.js');

const app = express();
const PORT = process.env.PORT || 8000;
console.log('PORT IS: ', PORT);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../client/dist'));

app.post('/inquiries', (req, res) => {
  findInquiryAndUpdate(req.body, (err, data) => {
    if (err) {
      res.status(500).send(err);
    
    // A new document was inserted - Status code 201 (Created).
    } else if (!data.lastErrorObject.updatedExisting) {
      res.status(201).send(data);
    
    // An already existing document was updated. No new record was created, so status is not 201.
    } else {
      res.send(data);  // Status code defualts to 200 (OK)
    }
  });
});

app.get('/*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
});

// FIXME: This does not work! :(
app.get('/projects/*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});


//--------------------------------------------------
// Notes:
//--------------------------------------------------
//
// PUT vs POST - Which should I use here?
// https://jcalcote.wordpress.com/2008/10/16/put-or-post-the-rest-of-the-story/
// 
// How to know if upsert inserted or updated:
// https://stackoverflow.com/questions/29558418/what-parameters-are-passed-to-mongoose-callbacks?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
// 
// And...
// 
// https://stackoverflow.com/questions/26592128/how-to-know-if-mongooses-upsert-created-a-new-document?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
// 
// Though these are a little outdated.  It appears passRawResult has been refactored to rawResult, and it no longer
// comes as a third parameter to the callback, but rather is just part of the second parameter, data.