(function () {

    angular
        .module('app')
        .controller('usersController', Controller);

    function Controller($rootScope, $location, $http) {
        var vm = this;

        $rootScope.activetab = $location.path();

        initController();

        function initController() {

            $http({
                method : "GET",
                url : "https://reqres.in/api/users?delay=2"
                }).then(function successCallback(response) {
            
                    // console.log(response.data.data);
                    // console.log(response.status);
                    $rootScope.pagination = {
                        "page": response.data.page,
                        "per_page": response.data.per_page,
                        "total": response.data.total,
                        "total_pages": response.data.total_pages
                    };
                    $rootScope.data = response.data.data;
                        
                }, function errorCallback(response) {
                    $rootScope.data = response.statusText;
                }
            );

        }
    }

})();