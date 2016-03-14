describe('app mainController', function () {
    var mainController;
    var $scope;
    var $httpBackend;


    var testMoveData = {
        "movies": [{
            "title": "2 Days in the Valley",
            "directors": {
                "list": [{
                    "name": "John Herzfeld"
                }]
            },
            "actors": {
                "list": [{
                    "name": "James Spader"
                }, {
                    "name": "Danny Aiello"
                }, {
                    "name": "Eric Stoltz"
                }, {
                    "name": "Marsha Mason"
                }]
            },
            "duration": 6000,
            "rating": 3,
            "year": 1996
        }]
    };

    beforeEach(function () {
        module('app');

        inject(function ($injector) {
            $scope = $injector.get('$rootScope').$new();
            $httpBackend = $injector.get('$httpBackend');

            $httpBackend
                .when('POST', '/api/movies')
                .respond(testMoveData);

            mainController = $injector.get('$controller')('mainController', {$scope: $scope});
        });
    });

    it('should initiate the Controller with data from backend', inject(function () {

        expect($scope.movies).toEqual(undefined);

        $httpBackend.flush();

        expect($scope.movies).not.toEqual(undefined);
    }));

    it('should process the actors list', inject(function () {

        var movie = testMoveData.movies[0];
        var result;

        result = $scope.getActors(movie);

        expect(result).toEqual('James Spader, Danny Aiello, Eric Stoltz, Marsha Mason');

        result = $scope.getActors({});

        expect(result).toEqual(null);

    }));

    it('should get the number of pages', inject(function () {

        var result;

        $httpBackend.flush();

        $scope.totalMoviesInSearch = 100;

        result = $scope.numberOfPages();

        expect(result).toEqual(10);

    }));

    it('should not have the next page result', inject(function () {

        $httpBackend.flush();
        expect($scope.nextPageVisible).toEqual(false);

    }));



});
