// Initialize Firebase
var config = {
    apiKey: "AIzaSyAM6HQJD6JPMbv0sUWGZs6UGkA9QWjYg7A",
    authDomain: "cwa-fileshare.firebaseapp.com",
    databaseURL: "https://cwa-fileshare.firebaseio.com",
    projectId: "cwa-fileshare",
    storageBucket: "cwa-fileshare.appspot.com",
    messagingSenderId: "226223406619"
};
firebase.initializeApp(config);

// Creating a reference to our db
const db = firebase.firestore();

// Configuring database
db.settings({timestampsInSnapshots: true});