//var config = require('config.js')

angular.module('starter.services', [])

.constant('config', {
  server: 'http://localhost:3000',
  api: {
    sessionLogin: '/api/session/login',
    sessionSignup: '/api/session/signup',
    sessionUser: '/api/session/user'
  }
})

.factory('$localstorage', ['$window', '$q', function ($window, $q) {
  return {
    set: function (key, value) {
      $window.localstorage[key] = value
    },
    get: function (key, defaultValue) {
      return $window.localStorage[key] || defaultValue
    },
    setObject: function(key, value) {
      return $q(function(resolve, reject) {
        setTimeout(function() {
          if ($window.localStorage[key] = JSON.stringify(value)) {
            resolve(true);
          } else {
            reject(false);
          }
        }, 1000);
      });
      /*var deferred = $q.defer()
      $window.localStorage[key] = JSON.stringify(value)
      deferred.resolve(true)
      deferred.reject(false)
      return deferred.promise*/

      /*process.nextTick( function () {
        $window.localStorage[key] = JSON.stringify(value)
        callback(true)
      })*/
      //$window.localStorage[key] = JSON.stringify(value)
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || false)
    },
    reset: function () {
      $window.localStorage.clear()
    }
  }
}])

.factory('sessionService', ['$http', '$state', '$localstorage', 'config', function ($http, $state, $localstorage, config) {
  var loginTmp = {
    name: "bruce",
    email: "bruce@gmail.com",
    password: "1234"
  }

  function signup (name, email, password) {
    //var deferred = $q.defer()
    $http({
      method: 'POST',
      url: config.server + config.api.sessionSignup,
      data: {
        name: name,
        email: email,
        password: password
      }
    })
    .then(
      function (response) {
        console.log('sessionService: Signup successful')
        console.log(response.data)
        $localstorage.setObject('user', response.data.user)
        .then(function (data) {
          $state.go('app.daemon')
          return true
        })
        //$state.go('app.daemon')
        //return true
        //deferred.resolve( response.data )
        //$window.location.href = endPointApp;
      }, 
      function (response) {
        console.log('sessionService: Signup failed')
        console.log(response.data)
        //deferred.reject({error: 'error 500'})
        return false
      }
    )
    //return deferred.promise
  }

  function login (email, password) {
    $http({
      method: 'POST',
      url: config.server + config.api.sessionLogin,
      data: {
        email: email,
        password: password
      }
    })
    .then(
      function (response) {
        console.log('sessionService: Login successful')
        console.log(response.data)
        $localstorage.setObject('user', response.data.user)
        .then(function (data) {
          $state.go('app.daemon')
          return true
        })
        //$localstorage.setObject('user', response.data.user)
        //$state.go('app.daemon')
        //return true
      }, 
      function (response) {
        console.log('sessionService: Login failed')
        console.log(response.data)
        return false
      })
      /*if ( email === loginTmp.email && 
         password === loginTmp.password ) {
        return true;
      } else {
        return false;
      }*/
  }

  function getUser () {
    var user = $localstorage.getObject('user')
    console.log('sessionService: ' + user)
    if ( user === false ) {
      return false
    } else {
      return user
    }
  }

  function logout () {
    $localstorage.reset()
    $state.go('launchScreen')
  }

  return {
    signup: signup,
    login: login,
    getUser: getUser,
    logout: logout
  }
}])

.factory('chatService', ['$window', function ($window) {
  
  function saveComment(comment) {
    var comments = getComments();

    comments.push(comment);
    localStorage.setItem('chat', JSON.stringify(comments));
  }

  function getComments() {
    var comments = localStorage.getItem('chat');

    if (!comments) {
      comments = [];
    } else {
      comments = JSON.parse(comments);
    }
    return comments;
  }

  return {
    saveComment: saveComment,
    getComments: getComments
  }
}])