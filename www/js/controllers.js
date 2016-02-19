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

.controller('BudgetCtrl', function($scope, $localstorage) {
  var exchangerate_yen = $localstorage.get('currency_yen');
  var exchangerate_hkd = $localstorage.get('currency_hkd');
  var budget = $localstorage.get('budget');
  $scope.budget = budget;

  var d = new Date();
  var dd = d.getDate();
  var mm = d.getMonth()+1;
  var weekday = new Array(7);
  weekday[0]=  "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  var n = weekday[d.getDay()];

  $scope.withdrawals = $localstorage.getObject('withdraws');
  console.log($scope.withdrawals);

  $scope.withdraw = function(amount_jpy,amount_hkd) {
    budget = $localstorage.get('budget');

    if (budget === undefined) {
      $localstorage.set('budget', 3000);
      $localstorage.setObject('withdraws', []);
      window.location.reload();
    }

    if (amount_jpy !== undefined && amount_jpy !== '') {
      if (amount_hkd !== undefined && amount_hkd !== '') {
        console.log('jpy and hkd');
      } else {
        var euro = Math.round((amount_jpy/exchangerate_yen) * 100) / 100;
 
        var array = $localstorage.getObject('withdraws');
        array.unshift({amount: euro, date: n + ' ' + dd + '/' + mm});
        console.log(array);
        // var x = Math.round(array * 100) / 100;
        $localstorage.setObject('withdraws',array);

        var outcome = budget - euro;
        var y = Math.round(outcome * 100) / 100;
        $scope.budget = outcome;
        $localstorage.set('budget', y);
        window.location.reload();
        // $state.reload();
      } 
    } else if (amount_hkd !== undefined && amount_hkd !== '') {
        var euro = Math.round((amount_hkd/exchangerate_hkd) * 100) / 100;

        var array = $localstorage.getObject('withdraws');
        array.unshift({amount: euro, date: n + ' ' + dd + '/' + mm});
        // var x = Math.round(array * 100) / 100;
        $localstorage.setObject('withdraws',array);

        var outcome = budget - euro;
        var y = Math.round(outcome * 100) / 100;
        $scope.budget = outcome;
        $localstorage.set('budget', y);
        window.location.reload();
      }
  }  

  $scope.erase = function($index) {
    if ($index === 0) {
      var array = $localstorage.getObject('withdraws');
      var budget = parseFloat($localstorage.get('budget'));

      var new_budget = budget + array[0].amount;
      $localstorage.set('budget',new_budget);

      array.shift();
      $localstorage.setObject('withdraws',array);
      window.location.reload();
    }
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
