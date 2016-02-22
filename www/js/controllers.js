angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.user = {
    name: null,
    email: null
  }

})

.controller('launchCtrl', ['$scope', '$state', function ($scope, $state) {
  //$state.go('login')
  (function () {
    setTimeout( function () {
      //$window.document.location.href = "/#/login"
      $state.go('login')
    }, 1000)
  }())
}])

.controller('sessionCtrl', ['$scope', '$window', '$location', '$state', 'sessionService', function ($scope, $window, $location, $state, sessionService) {
  var endPointAppDaemon = "/#/app/daemon"

  $scope.loginData = {
    "name": null,
    "email": null,
    "password": null,
    "password2": null
  }
  
  $scope.login = function () {
    var loginResult = sessionService.login($scope.loginData.email, $scope.loginData.password)
    console.log($scope.loginData.email)
    console.log($scope.loginData.password)
    console.log(loginResult)
    if ( loginResult === true ) {
      //$window.location.href = endPointAppDaemon;
      //$location.path(endPointAppDaemon)
      $state.go('app.daemon')
    } else {
      console.log('login fail')
    }
  }
}])