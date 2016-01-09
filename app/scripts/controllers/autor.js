'use strict';

angular.module('App').
		controller('autor', function (autorService, $state) {
			
			var vm = this;
			
			vm.message = '';
			
			//-----------user signIn----------------
			vm.signIn = function (login, passwd) {
				autorService.sigIn(login, passwd).then(function(res) {
							
					if (res.status === 'ok') {
						$state.go("products");
					}
						
					vm.message = res.status + '  '+  res.data.message;
					
				});
			};
			
			//-----------user signUp----------------
			vm.signUp = function (login, passwd, loginform) {
				if(loginform.$valid){
					
					autorService.signUp(login, passwd).then(function(res) { 
						if (res.status === 'ok') {
							$state.go("products");
						} 
						
						vm.message = res.status + '  '+ res.data.message;
						
					});
				}
			};
			
		});
