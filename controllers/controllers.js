app.controller('homeController', function($rootScope, $location) {
   $rootScope.activetab = $location.path();
});

app.controller('usersController', function($rootScope, $location) {

   $rootScope.activetab = $location.path();

   $(document).ready(function() {

      $.ajax({
      url: "https://reqres.in/api/users",
      type: "GET",
      dataType: 'JSON',
         success: function(response) {
            console.log(response.data);
            //cria a variavel data no angular.js com o retorno obtido pelo ajax
            //$rootScope.data = response.data;
            
            // chama a funcao para atualizar e ja atualiza a variavel data do angular.js
            $rootScope.$apply(function() {
               $rootScope.data = response.data;
            });

         },
         error: function(erro) {
            console.log(erro);
         }
      })

   });

});

app.controller('loginController', function($rootScope, $location) {
   $rootScope.activetab = $location.path();
});