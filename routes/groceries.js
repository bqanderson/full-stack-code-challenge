var router = require('express').Router();

var Grocery = require('../models/groceries');

router.post('/createGrocery', function(request, response){
  console.log('Create grocery item');
  var data = request.body;

  var createGrocery = new Grocery({
    itemName: data.itemName,
    quantity: data.quantity
  });

  createGrocery.save(function(err){
    if(err){
      console.log('Save error', err);
    };
  })
  response.sendStatus(200);
});

router.get('/getGroceries', function(request, response){
  Grocery.find({}, function(err, groceries){
    if(err){
      console.log(err);
      response.sendStatus(500);
    } else {
      response.send(groceries);
    }
  })

});

router.delete('/deleteGrocery/:id', function(request, response){
  var id = request.params.id;

  Grocery.findById(id, function(err, groceries){
    if(err){
      console.log(err);
      response.sendStatus(500);
    } else {

      groceries.remove(function(err){
        if(err){
          console.log(err);
        }
      })

      console.log('User deleted');
      response.sendStatus(200);
    }
  })
});

router.put('/updateGrocery/:id', function(request, response){
  var id = request.params.id;
  var data = request.body;

  Grocery.findById(id, function(err, groceries){
    if(err){
      console.log(err);
      response.sendStatus(500);
    } else {
      var itemName = data.itemName;
      var quantity = data.quantity;
      if(itemName){
        groceries.itemName = itemName;
      }
      if(quantity){
        groceries.quantity = quantity;
      }
      console.log('Updating list', groceries);
      groceries.save(function(err){
        if(err){
          console.log(err);
        }
      })
      console.log('List updated');
      response.sendStatus(200);
    }
  })
});




module.exports = router;
