const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

//Connect
const connection = (closure) => {
  return MongoClient.connect('mongodb://Ylia:040608@ds259865.mlab.com:59865/heroesdb', (err, db) => {
    if (err) return console.log(err);
    let dbo = db.db("heroesdb");
    closure(dbo);
  });
};


// Get heroes
router.get('/heroes', (req, res) => {
  connection((dbo) => {
    dbo.collection("heroes").find({}).toArray(function (err, result) {
      if (err) {
        console.log(err);
        return res.sendStatus(500)
      }
      res.send(result)
    });
  });
});

//get single
router.get('/heroes/:id', (req, res) => {
  console.log("get query: " + req.params.id);
  connection((dbo) => {
    let id = req.params.id;
    dbo.collection("heroes").find({'_id': new ObjectId(id)}).toArray(function(err, post) {
      console.log(err);
      console.log(post);
      if (err) {
        console.log(err);
        return res.sendStatus(500)
      }
      res.send(post)
    });
  });
});

//Create
router.post('/heroes', (req, res) => {
  connection((dbo) => {
    let name = req.body.name;
    dbo.collection("heroes").insertOne({name: name},function(err,post){
          if (err) {
            console.log(err);
            return res.sendStatus(500)
          }
          res.send(post);
    });
  });
});

//Delete
router.delete('/heroes/:id', (req, res) => {
  console.log(req.body.name);
    connection((dbo) => {
      let id = req.params.id;
    dbo.collection("heroes").remove({'_id': new ObjectId(id)}, function (err, post) {
      if (err) {
        console.log(err);
        return res.sendStatus(500)
      }
      res.send(post);
    });
  });
});

//Update
router.put('/heroes/:id', (req, res) => {
    connection((dbo) => {
      let id = req.body.id;
    dbo.collection("heroes").updateOne({'_id': new ObjectID(id)}, {$set: {name: req.body.name}}, {returnOriginal: false}, function(err, post){
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
       res.send(post)
    });
  });
});


module.exports = router;
