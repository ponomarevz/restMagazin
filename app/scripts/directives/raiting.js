'use strict';
//-------------------деректива голосования звездочками------------
angular.module('App')
.directive('starRating',
	function() {
		return {
			restrict : 'A',
			templateUrl : 'scripts/directives/star.html',
			scope : {
				ratingValue : '=',
				max : '=',
				onRatingSelected : '&',
				vis : '='
			},
			link : function(scope) {
				var updateStars = function() {
					scope.stars = [];
					//alert(scope.ratingValue);
					for ( var i = 0; i < scope.max; i++) {
						scope.stars.push({
							filled : i < scope.ratingValue
						});
					}
				};
				
				scope.toggle = function(index) {
					if (scope.vis !== 1) {
						scope.ratingValue = index + 1;
						scope.onRatingSelected({
							rating : index + 1
						});
					}
				};
				
				scope.$watch('ratingValue',
					function(oldVal, newVal) {
						if (newVal) {
							updateStars();
						}
					}
				);
			}
		};
	}
);
//-------------------деректива повторной проверки пароля------------
 angular.module('App')
	.directive('passwordVerify',function(){
    return {
        require:'ngModel',
        link: function(scope,element,attrs,ctrl){
            ctrl.$parsers.unshift(function(viewValue){
                var origin = scope.$eval(attrs['passwordVerify']);
                if(origin!==viewValue){
                    ctrl.$setValidity('passwordVerify',false);
                    return undefined;
                }else{
                    ctrl.$setValidity('passwordVerify',true);
                    return viewValue;
                }
            });

        }
    };
});