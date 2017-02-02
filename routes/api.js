const router = require('express').Router();

const Model = require('../models/model');


//Returns all humans in the database
router.get('/human', function (request, response) {
  Model.find({}, function (err, resources) {
    if(err) {
      response.send(err).status(404);
    } else {
      response.send(resources).status(200);
    }
  });
});

//Returns specific human
router.get('human/:id', function(request, response) {
  var id = request.params.id;
  
  Model.findOne({ '_id' : id } , function(err, result) {
    if(err) {
      response.send(err).status(501);
    } else {
      response.json(result).status(201);
    }
  });
});

//Stores a new human and send the saved value as response back
router.post('/human', function (request, response) {
  var human = new Model(request.body);

  human.save(function (err, resource) {
    if(err) {
      response.send(err).status(501);
    } else {
      response.json(resource).status(201);
    }
  });
});

router.put('/human/:id', function(request, response) {
  var id = request.params.id;
  Model.update({_id: id}, { 
    $set: {
      name: request.body.name,
      age: request.body.age
    }
  }, function(err, rawResponse) {
    if (err) {
      response.send(err).status(501);
    } else {
      response.send(rawResponse).status(200);
    }
  });
});

//Deletes a human
router.delete('/human/:id', function (request, response) {
  var id = request.params.id;

  Model.remove({_id: id}, function(err, resources) {
    if(err) {
      response.send(err).status(404);
    } else {
      response.send(resources).status(200);
    }
  });
});




module.exports = router;

