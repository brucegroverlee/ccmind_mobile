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

.factory('sessionService', ['$http', 'config', function ($http, config) {
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
        console.log('Signup successful')
        console.log(response.data)
        //deferred.resolve( response.data )
        //$window.location.href = endPointApp;
      }, 
      function (response) {
        console.log('Signup failed')
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
        console.log('Login successful')
        console.log(response.data)
        //return true
      }, 
      function (response) {
        console.log('Login failed')
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

  return {
    signup: signup,
    login: login
  }
}])