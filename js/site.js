var getToday = function() {
		var date = new Date();
		return date.getMonth() + 1 + '/' + date.getDate();
};

var makeDisplayVisible = function() {	
	document.getElementById('display').style.visibility = 'visible';
};

var addBackgroundImage = function(image) {
	document.getElementById('display').style.backgroundImage = 'url(' + image + ')';
};


var myApp = angular.module("myApp", []);

myApp.controller('myCntl', function($scope, $http) {
	$http.get("data/weather.json")
	.then(function(response) {
		$scope.cities = response.data.weather;
		var cities = [];
		for(var city in $scope.cities) {
			cities.push(city);
		}
		$scope.cityList = cities;
		$scope.today = getToday();
		$('#city_selector').change(function() {
			var citySelected = $(this).val();
			var backgroundImage = $scope.cities[citySelected].image;
			addBackgroundImage(backgroundImage);
			$scope.citySelected = citySelected;
			$scope.values = $scope.cities[citySelected];
			$scope.$apply();
			makeDisplayVisible();
		});
	});
});

