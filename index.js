/*
DIRECTIONS FOR STARTING THIS PROJECT:
- ensure that port 8000 is free on your device
- run a mongoDB server on port 27017
- ensure that mongoDB contains a database called 'nodesite', with
  a collection named 'contacts'
- run command 'npm run start' in your terminal
- then navigate to localhost:8000 in your browser
*/

// IMPORTS //
const path = require('path');
const bodyParser = require('body-parser');
// express and mongoose
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const mongoUrl = 'mongodb://localhost:27017/nodesite';
// controller and model
const contactController = require('./controllers/contactController');
require('./models/Contact');
// greetings module
const greeting = require('./models/Greetings');


// create HTTP server and listen on port 8000 for requests
const port = 8000;
app.listen(port, () => {
  console.log(`server is listening on port ${port}. ready to accept requests.`);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// create connection to db w/ mongoose
mongoose.connect(mongoUrl, { 
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.once('open', () => { console.log('connected to MongoDB') });

// bind connections to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// GET pages
app.get('/', (req, res) => {
  res.render('index', { heroText: greeting.greet() }); // interpolate random greeting
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/contacterrors', (req, res) => {
  res.render('contacterrors')
})

// serve stylesheet
app.use(express.static('public'));

// send form data to the server
app.use(bodyParser.urlencoded({ extended: false }));
app.post('/contact', contactController.createContactPost);

// display submitted form data
app.get('/showcontact', contactController.showContacts);

// display thank you page with personalized message
app.get('/thank-you', contactController.findLastEntry);

// show 404 error
app.use((req, res, next) => {
  res.status(404).render('404');
});
