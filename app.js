var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var multer = require('multer')

// use body parser so we can get info from POST and/or URL parameters
// The Body Parser to parse incoming data from request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

News = require('./models/news.js')
Promotions = require('./models/promotions.js')
Pricelist = require('./models/pricelist.js')
Nowplaying = require('./models/nowplaying.js')
Gallery = require('./models/gallery.js')
var Clen = require('./models/clen.js')
var Member = require('./models/member.js')

var appsecurity = 'apipassword'

// Connect to mongoose
// mongoose.connect('mongodb://dimebt.ddns.net:61001/fitnessdb');
// var db = mongoose.connection;
var db = mongoose.connect('mongodb://localhost:27017/fitnessdb', {
  useMongoClient: true,
  /* other options */
});




//////////////////////////////////////////////////////////////////////
//  Upload multer multipart data
//////////////////////////////////////////////////////////////////////

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/home/o2universal/public_html/api/profilephotos')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpg')
  }
})

var upload = multer({ storage: storage }).single('profileImage')

app.post('/fitness/api/profile', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      // An error occurred when uploading
        res.json({
    	    success: false,
    	    message: 'Image not uploaded!',
    	    image: req.file.filename
        })
        return
    }
    res.json({
    	success: true,
    	message: 'Image uploaded!',
    	image: req.file.filename
    })
  })
})

//////////////////////////////////////////////////////////////////////////








//  PUBLIC API

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

// get Gallery
app.get('/fitness/api/gallery', function(req, res) {
	Gallery.getGallery(function(err, gallery) {
		if(err){
			throw err;
		}
		res.json(gallery);
	});
});



// get Clen from tbl_clenovi
app.post('/fitness/api/alreadyamember', function(req, res) {	
	Clen.findOne({
		clenid: req.body.clenid
	}, function(err, clen) {
		if(err) throw err;
		if(!clen) {
			res.json({ success: false, message: 'User not found.' });
		} else if (clen) {
			if(clen.tel != req.body.tel) {
				res.json({ success: false, message: 'Wrong phone.' });
			} else {
				if(appsecurity != req.body.appsecurity) {
					res.json({ success: false, message: 'You dont have authorization.' });
				}
				else {
					res.json(clen)
				}				
			}
		}
		
	})
});



app.post('/fitness/api/insertmember', function(req, res) {
	var member = req.body;
	Member.findOne({
		clenid: req.body.clenid
	}, function(err, clen) {
		if(err) {
			//throw err;
			res.json({ success: false, message: 'Request not valid. Provide all body fields!' });
		}
		if(clen) {
			res.json({ success: false, message: 'User already member.' });			
		} else if (!clen) {
			if(appsecurity != req.body.appsecurity)	{
				res.json({ success: false, message: 'You dont have authorization.' });
				} else {
					Member.addMember(member, function(err, member) {
						if(err) {
							//throw err;
							res.json({ success: false, message: 'Request not valid. Provide all body fields!' });
						} else {
							res.json({ success: true, message: 'Member inserted' });
						}
						//res.json(member)						
					});										
				}								
			}
		});		
	});



// Listen on port 
app.listen(3100);
console.log('Running on port 3100...');