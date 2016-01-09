'use strict';

angular.module('App').
		controller('product', function ($localStorage, coments, product, comentService) {
			
			var vm = this;
			
			vm.product = product;
			vm.coments = coments;
			//alert(JSON.stringify(coments));
			vm.addComent = function(coment, rating, comentform) {
								
				if(comentform.$valid){
					comentService.putComent(product.id, rating, coment)
						.then(function(res){
							//---обновляем модель---------
						if (res.success === true) {
							var nevComent = { 
								'created_by': {
									'username': $localStorage.user 
								},
								'created_at': '2130-12-23T10:23:02.685Z', //---необх JS Date конвертировать Unix timestamp
								'rate': rating,
								'text': coment
							};
							
							vm.coments.unshift(nevComent);
							
						}
							
						});
				}
			};
			
			vm.getClass = function(rating) {
				return rating >= 3 ? 'positiv' : 'negativ';
			};
			
			vm.getData = function(date) {
				if (date !== '2130-12-23T10:23:02.685Z') {
					return date;
				} else {
					return 'сейчас';
				}
			};
			
		});
		