(function() {

    var app = angular.module('app', []);

    app.controller('mainController', ['$scope', '$http', function($scope, $http) {

		$scope.currentPage = 0;
		$scope.pageSize = 10;

		$scope.numberOfPages = function() {
			return Math.ceil($scope.totalMoviesInSearch / $scope.pageSize);
		};

		$scope.getActors = function(movie) {
			if (!movie.hasOwnProperty('actors')) { 
				return null;
			}
			
			return movie.actors.list
				.map(function(item){
					return item.name;
				})
				.reduce(function(p, n){
					if (p) { 
						return p + ', ' + n;
					}
					return n;
				}, null);
		};

		$scope.getMoviesForPage = function(filter, pageDirection) {

			$scope.currentPage = $scope.currentPage + pageDirection;

			var criteria = { 
				filter: filter,
				skip: ($scope.pageSize * $scope.currentPage),
				limit: $scope.pageSize
			};

	     	return $http.post('/api/movies', criteria).then(function(response) {
				$scope.movies = response.data.movies;
				$scope.totalMovies = response.data.total;
				$scope.totalMoviesInSearch = response.data.totalInSearch;

				$scope.previousPageVisible = ($scope.currentPage !== 0);
				$scope.nextPageVisible = ($scope.currentPage < ($scope.numberOfPages() - 1));
			});
		};

		$scope.getMoviesForPage(null, 0);
    }]);

})();