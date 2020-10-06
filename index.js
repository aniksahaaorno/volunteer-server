const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;


const uri = "mongodb+srv://aniksahaaorno:..gamechangeranik..@cluster0.3fkvj.mongodb.net/volunteerWebsite?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });



const app = express()

app.use(bodyParser.json());
app.use(cors());



client.connect(err => {
  const collection = client.db("volunteerWebsite").collection("volunteerDetails");
 
  app.post('/volunteerDetails',(req, res) => {
      const volunteerDetails = req.body;
      collection.insertOne(volunteerDetails)
      .then(result => {
          console.log('one product added');
          res.send(result. insertedCount>0 );
          console.log(result);
      })

  })

  app.get('/details/:loggedInUser',(req, res) => {
      collection.find({email:req.params.loggedInUser})
      .toArray((err,documents)=>{
          res.send(documents);
      })
  })

  app.delete('/delete/:id'),(req,res) =>{
      console.log(req.body);
      collection.deleteOne({_id:ObjectId(req.params.id)})
      .then(result =>{
          console.log(result);
      })

  }

});





app.listen(5000);