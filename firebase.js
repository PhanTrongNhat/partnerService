const admin = require('firebase-admin')

let serviceAccount = require("./udpt-6a982-firebase-adminsdk-e90vo-ca1c8683c4.json");
// Initialize firebase admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://udpt-6a982.appspot.com",
});
// Cloud storage
const bucket = admin.storage().bucket()

module.exports = {
  bucket
}