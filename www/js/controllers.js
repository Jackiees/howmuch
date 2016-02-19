angular.module('starter.controllers', [])

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

.controller('DashCtrl', function($scope, $localstorage) {
  $scope.answer = false;
  var x = $localstorage.get('currency_yen');
  var num_persons = $localstorage.get('persons');
  var changeRate = x;
  $scope.yen = changeRate;
  $scope.num_persons = num_persons;

  $scope.convert = function(amount) {
    var output = amount/changeRate;
    $scope.output = Math.round(output * 100) / 100;
    var perperson = amount/num_persons;
    var perperson_euro = output/num_persons;
    $scope.persons = Math.round(perperson * 100) / 100;
    $scope.persons_euro = Math.round(perperson_euro * 100) / 100;
    $scope.answer = true;
  }
})

.controller('ChatsCtrl', function($scope, $localstorage) {
  $scope.answer = false;
  var x = $localstorage.get('currency_hkd');
  var num_persons = $localstorage.get('persons');
  var changeRate = x;
  $scope.hkd = changeRate;
  $scope.num_persons = num_persons;

  $scope.convert = function(amount) {
    var output = amount/changeRate;
    $scope.output = Math.round(output * 100) / 100;
    var perperson = amount/num_persons;
    var perperson_euro = output/num_persons;
    $scope.persons = Math.round(perperson * 100) / 100;
    $scope.persons_euro = Math.round(perperson_euro * 100) / 100;
    $scope.answer = true;
  } 
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, $localstorage) {
  $scope.amount = parseFloat($localstorage.get('currency_yen'));
  $scope.amount2 = parseFloat($localstorage.get('currency_hkd'));
  $scope.persons = $localstorage.get('persons');

  $scope.click = function(amount,amount2,persons) {
    $localstorage.set('currency_yen', amount);
    $localstorage.set('currency_hkd', amount2);
    $localstorage.set('persons', persons);
    window.location.reload();
  };
});
