angular.module('userStoryServices', [])

    .factory('Auth', function ($http, $q, AuthToken) {

        var authFactory = {};

        authFactory.login = function (username, password) {
            return $http.post('/api/login', {
                username: username,
                password: password
            })
                .success(function (data) {
                    AuthToken.setToken(data.token);
                    return data;
                });
        }

        authFactory.logout = function () {
            AuthToken.setToken();
        }

        authFactory.isLoggedIn = function () {
            if (AuthToken.getToken()) {
                return true;
            } else {
                return false;
            }
        }

        authFactory.getUser = function () {
            if (AuthToken.getToken()) {
                return $http.get('/api/me');
            } else {
                return $q.reject({ message: "User Has No Token!" });
            }
        }

        return authFactory;
    })

    .factory('AuthToken', function ($window) {

        var authTokenFactory = {};

        authTokenFactory.getToken = function () {
            return $window.localStorage.getItem('token');
        }

        authTokenFactory.setToken = function (token) {
            if (token) {
                $window.localStorage.setItem('token', token);
            } else {
                $window.localStorage.removeItem('token');
            }
        }

        return authTokenFactory;
    })

    .factory('AuthInterceptor', function ($q, $location, AuthToken) {

        var authInterceptorFactory = {};

        authInterceptorFactory.request = function (config) {
            var token = AuthToken.getToken();
            if (token) {
                config.headers['x-access-token'] = token;
            }
            return config;
        }

        authInterceptorFactory.responseError = function (response) {
            if (response.status == 403) {
                $location.path('/login');
            }
            return $q.reject(response);
        }

        return authInterceptorFactory;
    })

    .factory('User', function ($http) {

        var userFactory = {};

        userFactory.create = function (userData) {
            return $http.post('/api/signup', userData);
        }

        userFactory.all = function () {
            return $http.get('/api/users');
        }

        return userFactory;
    })

    .factory('Story', function ($http) {

        var storyFactory = {};

        storyFactory.create = function (storyData) {
            return $http.post('/api/', storyData);
        }

        storyFactory.all = function () {
            return $http.get('/api/');
        }

        storyFactory.allStories = function () {
            return $http.get('/api/allstories');
        }

        return storyFactory;

    })

    .factory('Socket', function ($rootScope) {
        var socket = io.connect();
        return {
            on: function (eventName, callback) {
                socket.on(eventName, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    });
                });
            },
            emit: function (eventName, data, callback) {
                socket.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                });
            }
        };
    });