(function() {
	"use strict";
	angular.module('app.router')
		.config(['$stateProvider',
			function($stateProvider) {
				$stateProvider
					.state('app.user', {
						url: '/user',
						templateUrl: 'views/user/index.html'
					});
			}
		]);
})();