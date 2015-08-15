var mongoose = require("mongoose");

var Models = {};

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

Models.User = mongoose.model('User', new Schema({
	username: String,
	password: String,
	dateCreated: Date,
	dateUpdated: Date,
	linkedTo: ObjectId,
	type: String,
	dateLastLogin: Date,
	dateLastLogout: Date,
	profilePicture: String
}));

Models.Token = mongoose.model('Token',new Schema({
	access_token:String,
	account:ObjectId
}));

Models.Doctor = mongoose.model('Doctor', new Schema({
	firstname: String,
	lastname: String,
	qualification: String,
	experience: String,
	speciality: String,
	jobApplications: [ObjectId],
	workshopsAttended: [ObjectId],
	dateOfBirth: Date,
	image: String
}));

var hospitalSchema = new Schema({
	name: String,
	description: String,
	address: String,
	location : {type:[Number],index:'2dsphere'},
	phone: String,
	jobs: [ObjectId],
	workshops: [ObjectId],
	image: String
});

hospitalSchema.index({ location : '2d' });

Models.Hospital = mongoose.model('Hospital', hospitalSchema);

Models.JobRequirement = mongoose.model('JobRequirement', new Schema({
	caption: String,
	description: String,
	qualification: String,
	experience: String,
	speciality: String,
}));

Models.WorkshopEvent = mongoose.model('WorkshopEvent', new Schema({
	caption: String,
	description: String,
	conductedBy: String,
	dateConducted: String
}));

Models.JobApplication = mongoose.model('JobApplication', new Schema({
	doctor: ObjectId,
	hospital: ObjectId,
	job: ObjectId,
	dateApplied: Date,
	status: String,
}));

module.exports = Models;