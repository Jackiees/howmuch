angular.module('starter.controllers', [])

.factory ('StorageService', function ($localStorage) {

  $localStorage = $localStorage.$default({
    things: []
  });

  var _getAll = function () {
    return $localStorage.things;
  };
  var _add = function (thing) {
    $localStorage.things.push(thing);
  }
  var _remove = function (thing) {
    $localStorage.things.splice($localStorage.things.indexOf(thing), 1);
  }
  return {
      getAll: _getAll,
      add: _add,
      remove: _remove
    };
})

.controller('DashCtrl', function($scope, StorageService) {
  console.log('dashboard');
  var x = StorageService.getAll();
  var changeRate = x[0];
  $scope.yen = changeRate;
  // $scope.amount = 111;

  $scope.convert = function(amount) {
    console.log('convert');
    console.log(amount);
    var output = amount/changeRate;
    console.log(output);
    $scope.output = Math.round(output * 100) / 100;
  }
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, StorageService) {
  $scope.settings = {
    enableFriends: true
  };

  var x = StorageService.getAll();
  console.log(x);
  $scope.amount = x;

  $scope.click = function(amount) {
    StorageService.remove();
    StorageService.add(amount);
    console.log(amount);
    window.location.reload();
  };
});
