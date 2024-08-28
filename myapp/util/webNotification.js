// server.js or your server file
const admin = require('firebase-admin');

// Path to your service account key file
const serviceAccount = require('./mashreqwebapp-firebase-adminsdk-9hbnx-4e32203136.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;

