angular.module('engageApp', ['ngRoute', "ngResource", 'mainCtrl', 'orgService', 'eventService'])
	.config(function($routeProvider, $locationProvider) {
		$routeProvider
		// Home page
			.when("/", {
			templateUrl: "/app/views/pages/home.html"
		})

		.when("/organizations", {
			templateUrl: "/app/views/pages/organizations.html",
			controller: "mainController",
			controllerAs: "orgCont"
		})

		.when("/create", {
			templateUrl: "/app/views/pages/create.html",
			controller: "mainController",
			controllerAs: "createCont"
		});
		// Format URL to remove "#"	
		$locationProvider.html5Mode(true);
	});
// CONTROLLERS
angular.module('mainCtrl', ['orgService'])
	.controller('mainController', function($rootScope, $location, Org) {
		// Set vm = to scope of function
		let vm = this;


		vm.organizations = Org.all().then(
			function(data) {

				vm.organizations = data.data;
			});


	});
//SERVICES
// Organization Service: Responsible for handling Organization routes
angular.module('orgService', [])
	.factory('Org', function($http) {
		// Initialize empty object for factory to be returned 
		orgFactory = {};

		orgFactory.all = function() {
			return $http.get('/api/organizations');
		};

		orgFactory.register = function(groupData) {
			return $http.post('/api/organizations', groupData);
		};

		orgFactory.join = function(id, userData) {
			return $http.post('/api/organizations/' + id, userData);
		};

		orgFactory.findOne = function(id) {
			return $http.get('/api/organizations/' + id);
		};

		return orgFactory;
	});
// Event Service: Responsible for handling event routes
angular.module('eventService', [])
	.factory('Event', function($http) {
		eventFactory = {};

		eventFactory.all = function(id) {
			return $http.get('/api/events/' + id);
		};

		eventFactory.create = function(id, userData) {
			return $http.post('/api/events/' + id);
		};

		eventFactory.join = function(id, userData) {
			return $http.post('/api/event/' + id);
		}

		return eventFactory;

	});