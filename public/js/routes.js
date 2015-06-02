var app = angular.module('contatooh.routes', ['ngRoute']);

app.config(function ($routeProvider, $httpProvider) {

    $routeProvider.when('/auth', {
        templateUrl: 'partials/auth.html'
    });

    $routeProvider.when('/contatos', {
        templateUrl: 'partials/contatos.html',
        controller: 'ContatosController'
    });

    $routeProvider.when('/contato', {
        templateUrl: 'partials/contato.html',
        controller: 'ContatoController'
    });

    $routeProvider.when('/contato/:id', {
        templateUrl: 'partials/contato.html',
        controller: 'ContatoController'
    });

    $routeProvider.otherwise({redirectTo: '/contatos'});

    $httpProvider.interceptors.push('meuInterceptor');
});