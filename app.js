var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json());

News = require('./models/news.js')
Promotions = require('./models/promotions.js')
Pricelist = require('./models/pricelist.js')
Nowplaying = require('./models/nowplaying.js')


// Connect to mongoose
// mongoose.connect('mongodb://dimebt.ddns.net:61001/fitnessdb');
// var db = mongoose.connection;
var db = mongoose.connect('mongodb://dimebt.ddns.net:61001/fitnessdb', {
  useMongoClient: true,
  /* other options */
});


// Setup the routes
app.get('/', function(req, res) {
	res.send('Please use /fitness/api/');
});




// get News
app.get('/fitness/api/news', function(req, res) {
	News.getNews(function(err, news) {
		if(err){
			throw err;
		}
		res.json(news);
	});
});

// get Promotion
app.get('/fitness/api/promotions', function(req, res) {
	Promotions.getPromotions(function(err, promotion) {
		if(err){
			throw err;
		}
		res.json(promotion);
	});
});

// get Pricelist
app.get('/fitness/api/pricelist', function(req, res) {
	Pricelist.getPricelist(function(err, pricelist) {
		if(err){
			throw err;
		}
		res.json(pricelist);
	});
});

// get Nowplaying
app.get('/fitness/api/nowplaying', function(req, res) {
	Nowplaying.getNowplaying(function(err, nowplaying) {
		if(err){
			throw err;
		}
		res.json(nowplaying);
	});
});




// added comment 01


// Listen on port 
app.listen(3100);
console.log('Running on port 3100...');