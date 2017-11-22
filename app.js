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
Attendance = require('./models/attendance.js')
TrafficGraph = require('./models/trafficgraph.js')
Payments = require('./models/payments.js')
Nowplaying = require('./models/nowplaying.js')
Gallery = require('./models/gallery.js')
var Clen = require('./models/clen.js')
var Member = require('./models/member.js')
var Register = require('./models/register.js')
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file

var appsecurity = 'apipassword'
app.set('secretApiPassword', config.secret); // secret variable

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


// Insert member
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


// Register new user 
// dont forget to add all body fields
app.post('/fitness/api/register', function(req, res) {
var member = req.body;
	if (appsecurity != req.body.appsecurity) {
		res.json({ success: false, message: 'Authentication failed. Wrong api security key.' });
	} else {	
		Register.addRegistration(member, function(err, registration) {
			if (err) {
				res.json({ success: false, message: 'Request not valid. Provide all body fields!' });
			} else {
				res.json(
					{
						success: true,
						message: 'User registered.',
						ime: req.body.ime,
						prezime: req.body.prezime,
						lozinka: req.body.password,
						adresa: req.body.address,
						mesto: req.body.city,
						tel: req.body.phone,
						email: req.body.email,
						slika: req.body.photo
					});
			}
		});
	}  
});



// Update news view counter
app.get('/fitness/api/updatenewsviews/:id/', function(req, res) {
	News.findOneAndUpdate(
	{
		_id: req.params.id 
	}, 
	{ 
		$inc: { views: 1 }
	},
    function(err, response) {
      if (err) {
        throw err
      } else {
        res.json(response);
      }
    });
});





// Authentication with jsonwebtoken
// route to authenticate a user
app.post('/fitness/api/login', function(req, res) {

  // find the user
  Member.findOne({
    clenid: req.body.clenid
  }, function(err, user) {

    if (err) {
    	//res.json({ success: false, message: 'Authentication failed. User not found.' });
    }
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else if (appsecurity != req.body.appsecurity) {
      		res.json({ success: false, message: 'Authentication failed. Wrong api security key.' }); 
      	} else {
      		if (err) throw err;
	        // if user is found and password is right
	        // create a token
	        var token = jwt.sign({user}, app.get('secretApiPassword'), {          
	          expiresIn: 60*60*24 // expires in 24 hours
	        });      

	        // return the information including token as JSON
	        res.json({
	          success: true, 
	          message: 'Authentication Successful.',
	          token: token,
	          clenid: user.clenid,
	          password: user.password,
	          ime: user.ime,
	          prezime: user.prezime,
	          prekar: user.prekar,	
	          adresa: user.adresa,          
	          mesto: user.mesto,
	          pol: user.pol,
	          embg: user.embg,
	          brlicnakarta: user.brlicnakarta,
	          slika: user.slika,
	          tel: user.tel,
	          email: user.email
	        });
      	}     	      	
      }
  });
});





// route middleware to verify a token
app.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token1 = req.body.token;
  console.log('token1 ' + token1);
  var token2 = req.query.token;
  console.log('token2 ' + token2)
  var token3 = req.headers['x-access-token'];
  console.log('token3 ' + token3)

  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  console.log('token ' + token)


  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('secretApiPassword'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;          
        next();
      }
    });

  } else {
    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });

  }
});



// API routes with token authentication

// route for calendar attendace
app.post('/fitness/api/attendance', function(req, res) {
	if (appsecurity != req.body.appsecurity) {
		res.json({ success: false, message: 'Authentication failed. Wrong api security key.' });
	} else {
		Attendance.find({
		clenid: req.body.clenid
		}, function(err, attendance) {
			if(err) {
				//throw err;
				res.json({ success: false, message: 'Error' });
			}
			else if(attendance) {
				res.json(attendance);
			}
		});
	}	
});

// route for member payments
app.post('/fitness/api/payments', function(req, res) {
	if (appsecurity != req.body.appsecurity) {
		res.json({ success: false, message: 'Authentication failed. Wrong api security key.' });
	} else {		
		Payments.aggregate(
			[{ 	$match: { 'clenid' : Number(req.body.clenid) } },
			{				
				$lookup: {
					from: 'view_clenarina_cenovnik_json', // collection name in db
					localField: 'vidclenarina',
					foreignField: 'vidclenarina',
					as: 'opis'
				}
			}]
		).exec(function(err, payments) {
		    res.json(payments)
		});
	}
});

// route for last payment
app.post('/fitness/api/lastpayment', function(req, res) {
	if (appsecurity != req.body.appsecurity) {
		res.json({ success: false, message: 'Authentication failed. Wrong api security key.' });
	} else {		
		Payments.find({ "clenid": Number(req.body.clenid) }).sort({ "datum_naplata": -1 }).limit(1).exec(function(err, payments) {
		    res.json(payments)
		});
	}
});


// route for traffic chart
app.post('/fitness/api/trafficgraph', function(req, res) {
	if (appsecurity != req.body.appsecurity) {
		res.json({ success: false, message: 'Authentication failed. Wrong api security key.' });
	} else {
		TrafficGraph.getTrafficGraph(function(err, graph) {
			if(err){
				throw err;
			}
			res.json(graph);
		});		
	}
});


// update route for member info updating 
app.post('/fitness/api/updatemember', function(req, res) {
	if (appsecurity != req.body.appsecurity) {
		res.json({ success: false, message: 'Authentication failed. Wrong api security key.' });
	} else if (!req.body.ime) {
		res.json({ success: false, message: 'Request not valid. Provide all body fields!' });
	}
	else {
		Member.findOneAndUpdate(
		{
			'clenid': Number(req.body.clenid)
		}, 
		{ 
			$set: 
			{ 
				'ime': req.body.ime,
				'prezime': req.body.prezime,
				'adresa': req.body.adresa,
				'tel': req.body.tel,
				'email': req.body.email,
				'slika': req.body.slika
			}
		},
	    function(err, response) {
	      if (err) {
	        throw err
	      } else {
	        res.json({ success: true, message: 'Member profile updated.' });
	      }
	    });
	}
});







// Listen on port 
app.listen(3100);
console.log('Running on port 3100...');