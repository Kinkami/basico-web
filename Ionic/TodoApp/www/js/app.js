// Ionic Starter App

var app = angular.module('todoapp', ['ionic']);
app.config(function($stateProvider, $urlRouterProvider){

  $stateProvider.state('list',{
    url: '/list',
    templateUrl: 'templates/lista.html'
  });

    $stateProvider.state('new',{
    url: '/new',
    templateUrl: 'templates/novo.html',
    controller: 'NovoCtrl'
  });

    $stateProvider.state('edit',{
    url: '/edit/:indice',
    templateUrl: 'templates/novo.html',
    controller: 'EditeCtrl'
  });

  $urlRouterProvider.otherwise('/list');
});


app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {

      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

var tarefas = [
    {
      "texto":"Realizar as atividades do curso",
      "data":new Date(),
      "feita":true
      
    },
    {
      "texto":"Que cachorro o que",
      "data":new Date(),
      "feita":false
      
    }
  ];

app.controller('ListaCtrl',function($scope, $state,TarefaService){
  $scope.tarefas = TarefaService.lista;

$scope.concluir = function(indice){
  $scope.tarefas[indice].feita = true;
}

$scope.apagar = function(indice){
  TarefaService.apagar(indice);
}

$scope.editar = function(indice){
  $state.go('edit', {indice :indice});
}

});

app.controller('NovoCtrl', function($scope, $state, TarefaService){

$scope.tarefa = {
      "texto" : '',
      "data" : new Date(),
      "feita" : false
};

  $scope.salvar = function() {

    TarefaService.inserir($scope.tarefa);
    $state.go('list');
  
  }
});


app.controller('EditeCtrl', function($scope, $state, $stateParams, TarefaService){

$scope.indice = $stateParams.indice;

$scope.tarefa = angular.copy(TarefaService.obtem($scope.indice));

  $scope.salvar = function() {

    TarefaService.alterar($scope.indice, $scope.tarefa)
    $state.go('list');
  
  }
});

app.factory('TarefaService', function(){
  
  var tarefas = [];

  return {

    lista: function(){
      return tarefas;
  },
    obtem: function(indice){
      return tarefas[indice];
  },
    inserir: function(tarefa){
        tarefas.push(tarefa);
  },
    alterar: function(indice,tarefa){
      tarefas[indice] = tarefa;
  },
    apagar: function(indice) {
  tarefas.splice(indice,1);

  }

}
});
