var express = require('express');
var bodyParser = require('body-parser');
var dataRepository = require('./dataRepository');

var app = express();

app.use(express.static(__dirname + '/../public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api/movies', function(req, res) {

	dataRepository.getMovies(req.body.filter, req.body.skip , req.body.limit).then(data => {
		res.json(data);
	}, (ex) => {
		res.status(500).json({ error: ex.message });
	});
});

var server = app.listen(8000, function(){
  	var port = server.address().port;
	console.log('App started listening on %s',  port);
});