// modules import
const express = require('express');
const app = express();
const path = require('path');
// const fs = require('fs');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

main().catch(err => console.log(err));
async function main() {
   mongoose.connect('mongodb://127.0.0.1:27017/ContactDance');  // connect to the database
}
const port = 3000;


//defining mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    gender: String,
    address: String,
    phone: String,
    email: String
  });
const contact = mongoose.model('contact', contactSchema);

// PUG SPECIFIC STUFF
app.set('view engine', 'pug');  // set the template engine as pug
app.set('views', path.join(__dirname, 'views'));  // set the views directory 

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'));  // for serving static file
app.use(express.urlencoded());  

app.get('/', (req, res) => {
    const params = {};
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res) => {
    const params = {};
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res) => {
    let myData = new contact(req.body);
    myData.save().then(() => {
        res.send("The data has been saved in the Database")
    }).catch(() => {
        res.status(404).send("The data has not been saved in the Database")
    });
    
    // res.status(200).render('contact.pug', params);
})
app.listen(port, () => {
    console.log(`listening on port ${port}`);
})