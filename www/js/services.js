angular.module('starter.services', [])

.factory('sessionService', ['$http', function ($http) {
	var loginTmp = {
		name: "bruce",
		email: "bruce@gmail.com",
		password: "1234"
	}

	function login (email, password) {
		if ( email === loginTmp.email && 
			 password === loginTmp.password ) {
			return true;
		} else {
			return false;
		}
	}

	return {
		login: login
	}
}])