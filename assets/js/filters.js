angular.module('customFilters.markdown', [])
			.filter('markdown', function() {
				var converter = new Showdown.converter();
				return function(input){
					var html = converter.makeHtml(input || '');
					return html;
				}
			});

angular.module('customFilters.trust', [])
			.filter('trust', function($sce){
				return function(input){
					return $sce.trustAsHtml(input || '');
				}
			});