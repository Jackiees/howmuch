angular.module('starter.controllers', [])

// .factory ('StorageService', function ($localStorage) {

//   $localStorage = $localStorage.$default({
//     things: []
//   });

//   var _getAll = function () {
//     return $localStorage.things;
//   };
//   var _add = function (thing) {
//     $localStorage.things.push(thing);
//   }
//   var _remove = function (thing) {
//     $localStorage.things.splice($localStorage.things.indexOf(thing), 1);
//   }
//   return {
//       getAll: _getAll,
//       add: _add,
//       remove: _remove
//     };
// })

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}])

// .controller('DashCtrl', function($scope, StorageService) {
.controller('DashCtrl', function($scope, $localstorage) {
  console.log('dashboard');
  $scope.answer = false;
  // var x = StorageService.getAll();
  var x = $localstorage.get('currency_yen');
  var changeRate = x;
  $scope.yen = changeRate;
  // $scope.amount = 111;

  $scope.convert = function(amount) {
    console.log('convert');
    console.log(amount);
    var output = amount/changeRate;
    console.log(output);
    $scope.output = Math.round(output * 100) / 100;
    $scope.answer = true;
  }
})

.controller('ChatsCtrl', function($scope, $localstorage) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // $scope.chats = Chats.all();
  // $scope.remove = function(chat) {
  //   Chats.remove(chat);
  // };
  
  $scope.answer = false;
  // var x = StorageService.getAll();
  var x = $localstorage.get('currency_hkd');
  var changeRate = x;
  $scope.hkd = changeRate;
  // $scope.amount = 111;

  $scope.convert = function(amount) {
    console.log('convert');
    console.log(amount);
    var output = amount/changeRate;
    console.log(output);
    $scope.output = Math.round(output * 100) / 100;
    $scope.answer = true;
  } 
   
  
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, $localstorage) {
// .controller('AccountCtrl', function($scope, StorageService) {
  $scope.settings = {
    enableFriends: true
  };

  // var x = StorageService.getAll();
  var x = $localstorage.get('currency_yen');
  var y = $localstorage.get('currency_hkd');
  console.log(x);
  $scope.amount = parseFloat(x);
  $scope.amount2 = parseFloat(y);

  $scope.click = function(amount,amount2) {
    $localstorage.set('currency_yen', amount);
    $localstorage.set('currency_hkd', amount2);
    console.log($localstorage.get('currency_yen'));
    console.log($localstorage.get('currency_hkd'));

    // StorageService.remove();
    // StorageService.add(amount);
    console.log(amount);
    console.log(amount2);
    window.location.reload();
  };
});
