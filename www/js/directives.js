
angular.module('starter.directives', [])

.directive('messageUser', function () {
  return {
    templateUrl: 'partials/message-user.html',
    scope: {
    	messageAttr: '@message'
    }
  };
})