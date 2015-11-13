var app = angular.module('myApp',['ngFileUpload']);

app.controller('myCtrl', function($scope,Upload){
	$scope.responsiveVoice = responsiveVoice;
	$scope.imageLinks = [
		"images/scenetext01.jpg",
		"images/scenetext02.jpg",
		"images/scenetext03.jpg",
		"images/scenetext04.jpg",
		"images/scenetext05.jpg",
		"images/scenetext06.jpg"
	]
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
			console.log($scope.text);
			$scope.responsiveVoice.speak($scope.text, "UK English Female");
		}, function(err){
			console.log(err);
		});
	};
});
