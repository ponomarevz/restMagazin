(function(){
'use strict';
	var server = "http://smktesting.herokuapp.com/"
	angular
		.module('App')
			.service('autorServ', autorServ);
	  
	function autorServ ($http) {
		//------------ИЗВЛЕЯЕНИЕ ДАННЫХ
		this.getUsers = function (login, passwd) {
			var res = server + "api/login/";
			var cred = {
				"username": login,
				"password": passwd
			};
			//-------------post запрос на авторизацию-------
			$http({method: 'Post', url: res, data: cred}).
					success(function() { 
					//location.hash = '#/personss/mod';
			});
		
		};
	};
	
	
	
})();



  
  	