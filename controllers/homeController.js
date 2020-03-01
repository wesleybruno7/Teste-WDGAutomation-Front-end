(function () {

    angular
        .module('app')
        .controller('homeController', Controller);

    function Controller($rootScope, $location, $http) {
        var vm = this;

        initController();

        function initController() {
        }
    }

})();