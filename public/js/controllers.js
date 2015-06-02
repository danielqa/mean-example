var app = angular.module('contatooh.controllers', []);

app.controller('ContatoController', function ($scope, $routeParams, Contato) {

    if ($routeParams.id) {
        Contato.get({id: $routeParams.id},
            function (contato) {
                $scope.contato = contato;
            },
            function (erro) {
                console.log(erro);
                $scope.mensagem = {
                    texto: 'Contato não existe. Novo contato.'
                };
            }
        );
    } else {
        $scope.contato = new Contato();
    }

    Contato.query(function (contatos) {
        $scope.contatos = contatos;
    });

    $scope.salva = function () {
        $scope.contato.$save()
            .then(function () {
                $scope.mensagem = {texto: 'Salvo com sucesso'};
                $scope.contato = new Contato();
            })
            .catch(function (erro) {
                console.log(erro);
                $scope.mensagem = {texto: 'Não foi possível salvar'};
            });
    };
});

app.controller('ContatosController', function ($scope, Contato) {
    $scope.contatos = [];

    function buscaContatos() {
        Contato.query(function (contatos) {
                $scope.contatos = contatos;
                $scope.mensagem = {};
            },
            function (erro) {
                console.log(erro);
                $scope.mensagem = {
                    texto: 'Não foi possível obter a lista'
                };
            });
    }

    buscaContatos();

    $scope.remove = function (contato) {
        Contato.delete({id: contato._id},
            buscaContatos,
            function (erro) {
                $scope.mensagem = {
                    texto: 'Não foi possível remover o contato'
                };
                console.log(erro);
            }
        );
    };
});