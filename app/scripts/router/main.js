(function() {
	angular.module('app.router')
		.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
			function($stateProvider, $urlRouterProvider, $locationProvider) {
				$stateProvider
					.state('app', {
						templateUrl: 'views/layout.html'
					})
					.state('app.home', {
						url: '/',
						controller: 'MainController',
						controllerAs: 'mainCtr',
						templateUrl: 'views/home/index.html'
					});
				$locationProvider.html5Mode(true);
				$urlRouterProvider.otherwise('/');
			}
		]);
})();