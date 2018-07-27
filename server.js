const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const db = require('knex')({
	client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'jiaxuanchen',
    password : '',
    database : 'smart-brain'
  }
});

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => res.json("Hello"))
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', register.handleRegister(db, bcrypt))
app.get('/profile/:id', profile.handleProfileGet(db))
app.put('/image', image.handleImageDetect(db))
app.post('/imageurl', image.handleApiCall)

app.listen(3000, () => {
	console.log('app is running on port 3000');
})
