var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var settings = require('./routes/settings');
var models = require('./routes/models');
var util = require('./routes/util');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(multer({
	dest: './public/uploads/',
	onFileUploadComplete: function (file) {
		console.log(file.fieldname + ' uploaded to  ' + file.path);
	}
}));

app.post('/', function (req, res) {
	debugger;
	if(req.body.__type__ == "CV_OCR") {
		debugger;
		var CURRENT_HOME = "~/Desktop/myproj/Docbizz_Storage/";
		var imgLocation = CURRENT_HOME + "public/uploads/" + req.files.uploadedFile.name;
		var imgTag = req.body.__tag__;
		var langModelName = req.body.__model_name__;

		util.ocropyImage(imgLocation, imgTag, langModelName, CURRENT_HOME).then(function(result) {
			var output = result.stdout;
			res.send(JSON.stringify({ result : true, output : output }));
		}, function(err) {
			res.send(JSON.stringify({ result : false }));
		}).done();
	}
	else {
		res.end(JSON.stringify({result: true, url:'http://52.74.17.151/uploads/' + req.files.uploadedFile.name}));
	}
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});


module.exports = app;
