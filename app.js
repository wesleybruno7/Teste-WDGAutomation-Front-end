(function () {
//.module('app', ['ui.router', 'ngMessages', 'ngStorage', 'ngMockE2E'])
    angular
        .module('app', ['ui.router', 'ngMessages', 'ngStorage'])
        .factory('AuthenticationService', Service)
        .config(config)
        .run(run);

    function config($stateProvider, $urlRouterProvider) {

        // rota default
        $urlRouterProvider.otherwise("/"); 

        // rotas
        $stateProvider
            .state('/', {
                url: '/',
                templateUrl: 'views/home.html',
                controller: 'homeController',
                controllerAs: 'vm',
            })
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'loginController',
                controllerAs: 'vm'
            })
            .state('users', {
                url: '/users',
                templateUrl: 'views/users.html',
                controller: 'usersController',
                controllerAs: 'vm',
            })
            .state('404', {
                url: '/404',
                templateUrl: 'views/404.html',
                controllerAs: 'vm'
            })

    }

    function run($rootScope, $http, $location, $localStorage) {
        if ($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
        }

        // redireciona para a tela de login caso nao esteja logado e tente acessar uma pagina restrita
        $rootScope.$on('$locationChangeStart', function (event, next, current) {

            var publicPages = ['/login','/404'];
            var restrictedPage = publicPages.indexOf($location.path()) === -1;

            if (restrictedPage && !$localStorage.currentUser) {
                $location.path('/login');
            }

        });
    }

    function Service($http, $localStorage) {
        var service = {};

        service.Login = Login;
        service.Logout = Logout;

        return service;

        function Login(username, password, callback) {
            $http.post('https://reqres.in/api/login', { username: username, password: password })
                .success(function (response) {
                    // login successful if there's a token in the response
                    if (response.token) {
                        // store username and token in local storage to keep user logged in between page refreshes
                        $localStorage.currentUser = { username: username, token: response.token };

                        // add jwt token to auth header for all requests made by the $http service
                        $http.defaults.headers.common.Authorization = 'Bearer ' + response.token;

                        // exibe o item do menu para deslogar
                        document.querySelector("#logout-menu").classList.remove('d-none');

                        // execute callback with true to indicate successful login
                        callback(true);
                    } else {
                        // execute callback with false to indicate failed login
                        callback(false);
                    }
                });
        }

        function Logout() {
            // remove user from local storage and clear http auth header
            delete $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = '';

            // oculta o item do menu para deslogar
            document.querySelector("#logout-menu").classList.add('d-none');
        }
    }

})();