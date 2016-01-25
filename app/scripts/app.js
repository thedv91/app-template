(function() {
	angular.module('myApp', [
		'ui.router',
		'app.config',
		'app.controllers',
		'app.router',
		'app.templates',
		'btford.socket-io',
		'app.run',
		'app.services',
		'app.values'
	]);

	angular.module('app.run', []);
	angular.module('app.config', []);
	angular.module('app.controllers', []);
	angular.module('app.router', []);
	angular.module('app.services', []);
	angular.module('app.templates', []);
	angular.module('app.values', []);
})();