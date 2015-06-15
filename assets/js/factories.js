app.factory('feedFactory', function($http){
	return{
		getFeed: $http.get('feed.json')
	};
});