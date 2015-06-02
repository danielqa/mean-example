var app = angular.module('contatooh.services', ['ngResource']);

app.factory('Contato', function ($resource) {
    return $resource('/contatos/:id/:version');
});