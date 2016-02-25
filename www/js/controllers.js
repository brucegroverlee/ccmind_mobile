angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $state, sessionService) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.user = {
    id: null,
    name: null,
    email: null,
    key: null
  }

  $scope.getUser = function () {
    var user = sessionService.getUser()
    console.log('AppCtrl: ' + user)
    if ( user === false ) {
      $state.go('launchScreen')
    } else {
      $scope.user = user
    }
  } 

})

.controller('launchCtrl', ['$scope', '$state', 'sessionService', function ($scope, $state, sessionService) {
  //$state.go('login')
  (function () {
    if ( sessionService.getUser() !== false ) {
      $state.go('app.daemon')
    } 
    /*else {
      $state.go('login')
    }*/
    setTimeout( function () {
      //$window.document.location.href = "/#/login"
      $state.go('login')
    }, 500)
  }())
}])

.controller('sessionCtrl', ['$scope', '$state', 'sessionService', function ($scope, $state, sessionService) {
  var endPointAppDaemon = "/#/app/daemon"

  $scope.loginData = {
    "name": null,
    "email": null,
    "password": null,
    "password2": null
  }

  $scope.signup = function () {
    var signupResult = sessionService.signup(
      $scope.loginData.name,
      $scope.loginData.email,
      $scope.loginData.password)
    console.log($scope.loginData.name)
    console.log($scope.loginData.email)
    console.log($scope.loginData.password)
    console.log(signupResult)
    /*if ( signupResult === true ) {
      $state.go('app.daemon')
    } else {
      console.log('sessionCtrl: Signup fail')
    }*/
  }
  
  $scope.login = function () {
    var loginResult = sessionService.login($scope.loginData.email, $scope.loginData.password)
    console.log($scope.loginData.email)
    console.log($scope.loginData.password)
    console.log(loginResult)
    /*if ( loginResult === true ) {
      //$window.location.href = endPointAppDaemon;
      //$location.path(endPointAppDaemon)
      $state.go('app.daemon')
    } else {
      console.log('sessionCtrl: Login fail')
    }*/
  }

  $scope.logout = function () {
    sessionService.logout()
  }

  $scope.isLogin = function () {
    if ( sessionService.getUser() !== false ) {
      $state.go('app.daemon')
    }
  }
}])

.controller('chatCtrl', ['$scope', '$window', '$ionicScrollDelegate', 'chatService', function ($scope, $window, $ionicScrollDelegate, chatService) {
  var localStorage = $window.localStorage
  $scope.comments = chatService.getComments()
  $scope.comment = {}
  /*$scope.comments = [
    {
      author: 'user',
      message: 'hello!'
    },
    {
      author: 'daemon',
      message: 'hiiiii!'
    }
  ]*/

  //$scope.msg = 'null'

  /*$scope.send = function () {
    var elementHtml = document.getElementById('chat')
    angular.element(elementHtml)
    .append('<message-user message="1"></message-user>')
    
    //.append('holilili')
    var message = {
      author: 'user',
      message: $scope.msg
    }
    $scope.comments.push(message)
  }*/

  $scope.addComment = function () {
    //angular.element(elementHtml)
    //elementHtml.scrollTop(elementHtml.scrollHeight)

    $scope.comment.date = Date.now()
    $scope.comment.author = 'user'
    chatService.saveComment($scope.comment)
    $scope.comments = chatService.getComments()
    $scope.comment = {}
    //var elementHtml = document.getElementById('scroll')
    //elementHtml.scrollTop = elementHtml.scrollHeight
    $ionicScrollDelegate.$getByHandle('scroll').scrollBottom()
  }

  $scope.loadChat = function () {
    //$ionicScrollDelegate.$getByHandle('scroll').scrollBottom()
  }

}])