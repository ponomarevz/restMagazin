'use strict';

angular.module('App').
		controller('product', function ($scope, $localStorage, coments, product, comentService) {
			
			$scope.product = product;
			$scope.coments = coments;
			//alert(JSON.stringify(coments));
			$scope.addComent = function(coment, rating, comentform) {
								
				if(comentform.$valid){
					comentService.putComent(product.id, rating, coment)
						.then(function(res){
							//---обновляем модель---------
							
							var nevComent = { 
								'created_by': {
									'username': $localStorage.user 
								},
								'created_at': new Date(),
								'rate': rating,
								'text': coment
							};
							
							$scope.coments.push(nevComent);
						});
				}
			}
			
			$scope.getClass = function(rating) {
				return rating >= 3 ? 'positiv' : 'negativ';
			}
			
		});
		