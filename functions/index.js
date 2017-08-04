// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.status = functions.https.onRequest((request, response) => {
  let r = admin.database().ref('shitter').once('value');

  r.then((data) => {
    console.log(data.val().available);
    response.send(data.val().available);
  });
});
