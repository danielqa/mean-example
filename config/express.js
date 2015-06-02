var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var helmet = require('helmet');

module.exports = function () {
	var app = express();

	app.set('port', 3000);

	app.use(express.static('./public'));
    app.use('/node_modules', express.static('./node_modules'));

    // cria a engine "html" para habilitar o uso de arquivos com extensão ".html"
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');

	app.set('views', './app/views');

    // permite utilização do métodos http "delete" e "put"
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(require('method-override')());

    app.use(cookieParser());
    app.use(session({
        secret: 'homem avestruz',
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(helmet.xframe());
    app.use(helmet.xssFilter());
    app.use(helmet.nosniff());
    app.disable('x-powered-by');

    // carrega os scripts na pasta padrão definida "app"
    load('models', {cwd: 'app'})
        .then('controllers')
        .then('routes')
        .into(app);

    // se nenhum rota atender, direciona para página 404
    app.get('*', function(req, res) {
        res.status(404).render('404.ejs');
    });

	return app;
};
