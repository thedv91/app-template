(function() {
	"use strict";
	angular.module('app.controllers')
		.controller('MainController', ['socketService', function(socketService) {
			var self = this;
			socketService.on('news', function(data) {
				console.log(data);
				/* Act on the event */
			});
			socketService.on('message', function(data) {
				console.log(data);
			});
			self.send = function() {
				socketService.emit('init', {
					name: 'Bin',
					users: 'Thedollar'
				});
			};
		}]);
})();