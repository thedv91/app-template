(function() {
	"use strict";
	angular.module('app.services')
		.factory('socketService', ['$rootScope', 'socket_url', function($rootScope, socket_url) {
			var socket = io.connect(socket_url);
			return {
				on: function(eventName, callback) {
					socket.on(eventName, function() {
						var args = arguments;
						$rootScope.$apply(function() {
							callback.apply(socket, args);
						});
					});
				},
				emit: function(eventName, data, callback) {
					socket.emit(eventName, data, function() {
						var args = arguments;
						$rootScope.$apply(function() {
							if (callback) {
								callback.apply(socket, args);
							}
						});
					});
				}
			};
		}]);
})();