(function () {

    angular
        .module('app')
        .controller('loginController', Controller);

    function Controller($rootScope, $location, AuthenticationService) {
        var vm = this;

        $rootScope.activetab = $location.path();
        vm.login = login;
        
        initController();

        function initController() {
            // reset login status
            AuthenticationService.Logout();
        };

        function login() {
            vm.loading = true;
            AuthenticationService.Login(vm.email, vm.password, function (result) {
                if (result === true) {
                    $location.path('/');
                } else {
                    vm.error = 'Email ou senha invalido!';
                    vm.loading = false;
                }
            });
        };

    }

})();