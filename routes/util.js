var shellExecLine = function(cmdLine) {
	var exec = require('child-process-promise').exec;
	return exec(cmdLine);
}

var ocropyImage = function(imgLocation, imgTag, langModelName, CURRENT_HOME) {
	//var OCROPUS_HOME = "~/CV/ocropy/";
	var OCROPUS_HOME = "~/Desktop/myproj/ocropy/";
	var line1 = OCROPUS_HOME + "ocropus-nlbin" + " " + imgLocation + " " + "-o " + imgTag;
	console.log(line1);
	return shellExecLine(line1).then(function(result) {
		debugger;
		var line2 = OCROPUS_HOME + "ocropus-gpageseg" + " " + CURRENT_HOME + imgTag + "/????.bin.png";
		console.log(line2);
		return shellExecLine(line2);
	}).then(function(result) {
		debugger;
		var line3 = OCROPUS_HOME + "ocropus-rpred" + " " + "-Q 4 -m" + " " + OCROPUS_HOME + "models/";
		line3 = line3 + langModelName + " " + CURRENT_HOME + imgTag + "/????/??????.bin.png";
		console.log(line3);
		return shellExecLine(line3);
	}).then(function(result) {
		debugger;
		var line4 = OCROPUS_HOME + "ocropus-hocr" + " " + CURRENT_HOME + imgTag + "/????.bin.png";
		line4 = line4 + " " + "-o" + " " + CURRENT_HOME + imgTag + "/out.html";
		console.log(line4);
		return shellExecLine(line4);
	}).then(function(result) {
		debugger;
		var line5 = "cat" + " " + CURRENT_HOME + imgTag + "/out.html";
		console.log(line5);
		return shellExecLine(line5);
	});
}

var tesseractifyImage = function(imgLocation, imgTag, langModelName, CURRENT_HOME) {
	var CV_HOME = require("./routes/settings").CV_HOME;
	var output1 = CV_HOME + "tesseract/" + imgTag + ".tiff";
	var line1 = "convert " + imgLocation + " -type Grayscale " + output1;
	debugger;
	console.log(line1);
	return shellExecLine(line1).then(function(result) {
		var line2 = "tesseract " + output1 + " " + CV_HOME + "tesseract/" + imgTag;
		debugger;
		console.log(line2);
		return shellExecLine(line2);
	}).then(function(result) {
		debugger;
		var line5 = "cat" + " " + CV_HOME + "tesseract/" + imgTag + ".txt";
		console.log(line5);
		return shellExecLine(line5);
	});
}

module.exports = { shellExecLine : shellExecLine,
 ocropyImage : ocropyImage,
 tesseractifyImage : tesseractifyImage };
