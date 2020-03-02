(function () {

    angular
        .module('app')
        .controller('aboutController', Controller);

    function Controller($rootScope, $location, $http) {
        var vm = this;

        $rootScope.activetab = $location.path();

        initController();

        function initController() {

            
        }
    }
    
})();