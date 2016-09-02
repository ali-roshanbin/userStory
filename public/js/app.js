angular.module('userstory', ['userStoryServices', 'mainCtrl', 'ngRoute'])
    .config(userStoryRouter)
    .filter('reverse', function () {
        return function (items) {
            return items.slice().reverse();
        }
    });

function userStoryRouter($routeProvider, $locationProvider, $httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');

    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html'
        })
        .when('/login', {
            templateUrl: 'partials/login.html'
        })
        .when('/signup', {
            templateUrl: 'partials/signup.html'
        })
        .when('/allstories', {
            templateUrl: 'partials/allStories.html',
            resolve: {
                stories: function (Story) {
                    return Story.allStories();
                }
            }
        });
}