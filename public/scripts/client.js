angular.module('groceryApp', []);

angular.module('groceryApp').controller('GroceryController', function($http){
  var vm = this;

  // Add New Items
  vm.createGrocery = function(){
    console.log('Add Item Clicked');

    var sendData = {};

    sendData.itemName = vm.itemName;
    sendData.quantity = vm.quantity;

    $http.post('/groceries/createGrocery', sendData).then(function(response){
      console.log(response);
      console.log(sendData);
    }, function(response){
      console.log('Fail!');
    })

    vm.getGroceries();
    vm.itemName = null;
    vm.quantity = null;

  }

  // List all Items
  vm.getGroceries = function(){
    $http.get('/groceries/getGroceries').then(function(response){
      console.log(response.data);
      vm.groceries = response.data;

    }, function(response){
    console.log('Failure is not accepted!', response);
    })
  }

  // Delete one item
  vm.deleteGrocery = function(itemId){
    $http.delete('/groceries/deleteGrocery/' + itemId).then(function(response){
      vm.groceries = response.data;
      vm.getGroceries();
    }, function(response){
      console.log('Failure', response);
    })
  }

  // Edit each item
  vm.showEditor = function(index){
    console.log('Editor Clicked');
    var toggle;
    if(vm.groceries[index].clicked){
      toggle = false;
    } else {
      toggle = true;
    }
    for (var i = 0; i < vm.groceries.length; i++) {
      vm.groceries[i].clicked = false;
    }
    vm.groceries[index].clicked = toggle;
    vm.updateItemName = vm.groceries[index].itemName;
    vm.updateQuantity = vm.groceries[index].quantity;
  }

  vm.updateGroceries = function(index){

      vm.groceries[index].clicked = false;
      var id = vm.groceries[index]._id;

      var sendData = {};

      sendData.itemName = vm.updateItemName;
      sendData.quantity = vm.updateQuantity;

    $http.put('/groceries/updateGrocery/' + id, sendData).then(function(response){
      console.log(response);
      vm.getGroceries();
      vm.updateItemName = null;
      vm.updateQuantity = null;

    }, function(response){
      console.log('Failure is not accepted!', response);
    })
  }

  // Show all items on page load
  vm.getGroceries();


})
