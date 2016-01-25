(function() {
	angular.module('app.run').run([function() {
		(function(d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {
				return;
			}
			js = d.createElement(s);
			js.id = id;
			js.src = "//cdn.socket.io/socket.io-1.4.3.js";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'socket-jssdk'));
	}]);
})();