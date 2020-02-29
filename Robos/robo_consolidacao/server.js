// const path = require('path');
const express = require('express');
var router = express.Router(),
	bodyParser = require('body-parser'),
	swaggerUi = require('swagger-ui-express'),
	swaggerDocument = require('./swagger.json');
// var https = require("https");
// var options = {
// 	key  : fs.readFileSync("my.private.key"),
// 	cert : fs.readFileSync("my.certificate.cer")
// };
const port = 3000;


// Iniciando o App
const app = express(); //rest API requirements
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());


// Primeira rota
app.get('/', (req, res) => {
	console.log('rota padrão');
	//res.send('Olá!');
	let dateNow = new Date();
	res.status(200).json({status: 'Servidor está online!', dateTime: dateNow});
})

// Teste de API
app.get('/teste', (req, res, next) => {
	console.log('rota de teste');

	return res.status(200).json( {rowsCount: 0, data: ''} );
});




app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', router);

//app.listen(port);
app.listen(port, () => {
	console.info(`Servidor rodando em localhost: ${port}`);
});
// https.createServer(options, app).listen(port, function () {
// 	console.log("Server started @ %s!", port);
// });
module.exports = app;