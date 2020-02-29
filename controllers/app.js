var app = angular.module('app',['ngRoute']);

app.config(function($routeProvider, $locationProvider) {

    $routeProvider

    // para a rota '/', carregaremos o template home.html
    .when('/', {
    templateUrl : 'views/home.html',
    controller: 'homeController',
    })

    // para a rota '/login', carregaremos o template login.html
    .when('/login', {
    templateUrl : 'views/login.html',
    controller: 'loginController',
    })

    /* // para a rota '/register', carregaremos o template register.html
    .when('/register', {
    templateUrl : 'views/register.html'
    }) */

    // para a rota '/users', carregaremos o template users.html
    .when('/users', {
    templateUrl : 'views/users.html',
    controller: 'usersController',
    })

    // para a rota '/404', carregaremos o template 404.html
    .when('/404', {
    templateUrl : 'views/404.html'
    })
    
    // caso não seja nenhum desses, redirecione para a rota '/404'
    .otherwise ({ redirectTo: '/404' });

});