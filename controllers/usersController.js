(function () {

    angular
        .module('app')
        .controller('usersController', Controller);

    function Controller($rootScope, $location, $http) {
        var vm = this;

        $rootScope.activetab = $location.path();

        //oculta os botoes de proxima pagina
        document.querySelector('#pagination-btns').classList.remove('d-flex');
        document.querySelector('#pagination-btns').classList.add('d-none');
        //oculta o input de busca/filtro
        document.querySelector('#search-input').classList.remove('d-flex');
        document.querySelector('#search-input').classList.add('d-none');
        //desativa e oculta o botao para voltar pagina
        document.querySelector('#btn-prev').disabled = true;
        document.querySelector('#btn-prev').style.opacity = '0';

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

                    //mostra os botoes de proxima pagina apos carregar os itens
                    document.querySelector('#pagination-btns').classList.remove('d-none');
                    document.querySelector('#pagination-btns').classList.add('d-flex');
                    //mostra o input de busca/filtro apos carregar os itens
                    document.querySelector('#search-input').classList.remove('d-none');
                    document.querySelector('#search-input').classList.add('d-flex');

                }, function errorCallback(response) {
                    $rootScope.data = response.statusText;
                }
            );

        }

        $rootScope.changePage = function (current, operator, max) {

            let changeTo = eval(current + operator);

            if(changeTo > 0 && changeTo <= max) {

                $http({
                    method : "GET",
                    url : "https://reqres.in/api/users?delay=1&page="+ changeTo
                    }).then(function successCallback(response) {
                
                        $rootScope.pagination = {
                            "page": response.data.page,
                            "per_page": response.data.per_page,
                            "total": response.data.total,
                            "total_pages": response.data.total_pages
                        };
                        $rootScope.data = response.data.data;
    
                        //mostra os botoes de proxima pagina apos carregar os itens
                        document.querySelector('#pagination-btns').classList.remove('d-none');
                        document.querySelector('#pagination-btns').classList.add('d-flex');
                        //mostra o input de busca/filtro apos carregar os itens
                        document.querySelector('#search-input').classList.remove('d-none');
                        document.querySelector('#search-input').classList.add('d-flex');
    
                    }, function errorCallback(response) {
                        $rootScope.data = response.statusText;
                    }
                );

                //desativa/ativa e mostra/oculta os botoes proxima pagina e pagina anterior
                if(changeTo <= 1) {
                    document.querySelector('#btn-prev').disabled = true;
                    document.querySelector('#btn-prev').style.opacity = '0';
                } else {
                    document.querySelector('#btn-prev').disabled = false;
                    document.querySelector('#btn-prev').style.opacity = '1';
                }
                if(changeTo >= max) {
                    document.querySelector('#btn-next').disabled = true;
                    document.querySelector('#btn-next').style.opacity = '0';
                } else {
                    document.querySelector('#btn-next').disabled = false;
                    document.querySelector('#btn-next').style.opacity = '1';
                }
                $rootScope.data = '';

            }

        }
    }

})();