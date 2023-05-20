

const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');
const encoder = bodyParser.urlencoded({ extended: true });

// Import the service account key file
//!!! MAKE SURE TO CHANGE THE FILE LOCATION TO WHEREVER THE JSON FILE IS ON YOUR COMPUTER. THE FOLLOWING WON'T WORK ON YOUR COMPUTER AS IS
// so it should be something like: const serviceAccount = require('[your_file_path]\\cosc-480-firebase-adminsdk-feh47-e26da10889.json');
const serviceAccount = require('c:\\Users\\daman\\OneDrive\\Documents\\proj_jonathan\\cosc-480-firebase-adminsdk-feh47-e26da10889.json');

// Initialize the Firebase admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://COSC-480.firebaseio.com'
});

// Get a reference to the Firestore database
const db = admin.firestore();

// Create an instance of the Express application
const app = express();

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Serve static files from the 'assets' directory under the '/assets' route
app.use("/assets",express.static("assets"));

// Handle GET requests to the root route '/'
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");  // Send the 'index.html' file as the response
});

// Handle POST requests to the '/register' route
app.post('/register', encoder, async (req, res) => {
    const { username, password } = req.body;

    try {
        // Add a new document with username and password in the 'users' collection
        let docRef = db.collection('users').doc();

        // Set the user data in the 'user_info' document
        await docRef.set({
            username: username,
            password: password
        });

        // Add a new document with the same ID in the 'financial' collection
        let financialRef = db.collection('financial').doc(docRef.id);

        // Set the 'checking' and 'savings' fields to "0"
        await financialRef.set({
            checking: "0",
            savings: "0"
        });

        console.log("User created with ID: ", docRef.id);
        res.sendFile(__dirname + "/register.html");
    } catch (error) {
        console.error("Error adding user: ", error);
    }
});

// Handle POST requests to the root route '/'
app.post("/", encoder, async (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    let usersRef = db.collection('users');
    let query = usersRef.where('username', '==', username).where('password', '==', password).get()
    .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.');
          res.redirect("/");  // Redirect to the root route '/'
          return;
        }  
        snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
            res.redirect("/welcome?uid=" + doc.id);  // Redirect to the '/welcome' route with the user ID as a query parameter
        });
    })
    .catch(err => {
        console.log('Error getting documents', err);
    });
});

// Handle GET requests to the '/welcome' route
app.get("/welcome", function(req, res) {
    res.sendFile(__dirname + "/welcome.html");  // Send the 'welcome.html' file as the response
});

// Set the app to listen on port 4000
app.listen(4000);
