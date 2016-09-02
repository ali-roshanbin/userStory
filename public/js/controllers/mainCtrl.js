angular.module('mainCtrl', [])
    .controller('AuthenticationController', function ($rootScope, $location, Auth) {

        var vm = this;
        vm.LoggedIn = Auth.isLoggedIn();

        $rootScope.$on('$routeChangeStart', function () {
            vm.LoggedIn = Auth.isLoggedIn();
            Auth.getUser()
                .then(function (data) {
                    vm.user = data.data;
                });
        });

        vm.doLogin = function () {
            vm.processing = true;
            vm.error = '';
            Auth.login(vm.loginData.username, vm.loginData.password)
                .success(function (data) {
                    vm.processing = true;
                    Auth.getUser()
                        .then(function (data) {
                            vm.user = data.data;
                        });
                    if (data.success) {
                        $location.path('/');
                    } else {
                        vm.error = data.message;
                    }

                });
        }

        vm.logout = function () {
            Auth.logout();
            $location.path('/logout');
        }
    })

    .controller('AllUserController', function (User) {
        var vm = this;
        User.all()
            .success(function (data) {
                vm.users = data;
            });
    })

    .controller('CreateUserController', function (User, $location, $window) {
        var vm = this;
        vm.signUpUser = function () {
            vm.message = "";
            User.create(vm.userData)
                .then(function (response) {
                    vm.userData = {};
                    vm.message = response.data.message;
                    $window.localStorage.setItem('token', response.data.token);
                    $location.path('/');
                });
        }
    })

    .controller('StoryController', function (Story, Socket) {
        var vm = this;
        Story.all()
            .success(function (data) {
                vm.stories = data;
            });
        vm.createStory = function () {
            vm.processing = true;
            vm.message = "";
            Story.create(vm.storyData)
                .success(function (data) {
                    vm.processing = false;
                    vm.storyData = {};
                    vm.message = data.message;
                });
        };
        Socket.on('refreshStories', function (data) {
            vm.stories.push(data);
        });
    })

    .controller('AllStoriesController', function (Story, Socket) {
        var vm = this;
        Story.allStories()
            .success(function (data) {
                vm.stories = data;
            });
        Socket.on('refreshStories', function (data) {
           vm.stories.push(data);
        });
    });