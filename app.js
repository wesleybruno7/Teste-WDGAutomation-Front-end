(function () {
   
    angular
        .module('app', ['ui.router', 'ngMessages', 'ngStorage'])
        .factory('AuthenticationService', Service)
        .config(config)
        .run(run);

    function config($stateProvider, $urlRouterProvider) {

        // rota default
        $urlRouterProvider.otherwise("/404"); 

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
            .state('about', {
                url: '/about',
                templateUrl: 'views/about.html',
                controller: 'aboutController',
                controllerAs: 'vm',
            })
            .state('404', {
                url: '/404',
                templateUrl: 'views/404.html',
                controllerAs: 'vm',
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

            if ($localStorage.currentUser) {
                // exibe o item do menu para deslogar
                document.querySelector("#logout-menu").classList.remove('d-none');
            } else {
                // exibe o item do menu para deslogar
                document.querySelector("#logout-menu").classList.add('d-none');
            }

        });
    }

    function Service($http, $localStorage) {
        var service = {};

        service.Login = Login;
        service.Logout = Logout;

        return service;

        function Login(username, password, callback) {
console.log(username);
            if(username != 'eve.holt@reqres.in') {
                username = 'peter@klaven';
            }

            $http.post('https://reqres.in/api/login?delay=2', { username: username, password: password })
                .success(function (response) {
                 console.log(response);   
                    if (response.token) {
                        // armazena username e o token no local storage para continuar logado quando ocorrer a troca de paginas
                        $localStorage.currentUser = { username: username, token: response.token };

                        // adidiona o jwt token de autenticacao ao header para todas as requests feitas pelo $http service
                        $http.defaults.headers.common.Authorization = 'Bearer ' + response.token;

                        // executa o callback quando for true para indicar que esta logado
                        callback(true);
                    } else {
                        //  executa o callback quando for false para indicar que nao esta logado
                        callback(false);
                    }
                })
                .error(function(error){
                    callback(false);
                });

            }

        function Logout() {
            // remove usuario do local storage e limpa o header de autenticacao http
            delete $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = '';

            // oculta o item do menu para deslogar
            document.querySelector("#logout-menu").classList.add('d-none');
        }
    }

})();