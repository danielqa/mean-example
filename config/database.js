var mongoose = require('mongoose');

module.exports = function (uri) {

    mongoose.connect(uri);

    // habilita o debbuger para visualização dos comandos executados
    mongoose.set('debug', true);

    mongoose.connection.on('connected', function () {
        console.log('Mongoose! Conectado em ' + uri);
    });

    mongoose.connection.on('disconnected', function () {
        console.log('Mongoose! Desconectado de ' + uri);
    });

    mongoose.connection.on('error', function (erro) {
        console.log('Mongoose! Erro na conexão: ' + erro);
    });

    // "process" objeto globalmente disponível pelo Node
    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log('Mongoose! Desconectado pelo término da aplicação');

            // 0 indica que a finalização ocorreu sem erros
            process.exit(0);
        });
    });
};