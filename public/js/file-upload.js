var app = angular.module('myApp',['ngFileUpload']);

app.controller('myCtrl', function($scope,Upload){
	$scope.responsiveVoice = responsiveVoice;
	$scope.imageLinks = [
	"images/scenetext01.jpg",
	"images/scenetext02.jpg",
	"images/scenetext03.jpg",
	"images/scenetext04.jpg",
	"images/scenetext05.jpg"
	]
	$scope.outputVis = false;

	$scope.uploadFile = function(file){
		file.upload = Upload.upload({
			url : '',
			method : 'POST', 
			headers : {
				'Content-Type' : 'multipart/form-data',
			}, 
			fileFormDataName : 'uploadedFile',
			fields : {
				'__type__' : 'SEE_SHARP',
				'__model_name__' : 'eng'
			},
			sendFieldAs : 'form',
			file : file[0],
		});

		file.upload
		.then(function(response){
			$scope.text = response.data.output.text.join(' ');
			$scope.response = response.data.output;
			console.log($scope.text);
			$scope.responsiveVoice.speak($scope.text, "UK English Female");
		}, function(err){
			console.log(err);
		});
	};
	$scope.uploadSampleImage = function(link){
		file = {}
		file.upload = Upload.upload({
			url : '',
			method : 'POST', 
			headers : {
				'Content-Type' : 'multipart/form-data',
			}, 
			fields : {
				'__type__' : 'SEE_SHARP',
				'__model_name__' : 'eng',
				'__sample_path__' : link
			},
			sendFieldAs : 'form'
		});

		file.upload
		.then(function(response){
			$scope.text = response.data.output.text.join(' ');
			$scope.response = response.data.output;
			$scope.outputVis = true;
			console.log($scope.text);
			$scope.responsiveVoice.speak($scope.text, "UK English Female");
		}, function(err){
			console.log(err);
		});
	};
});
