//Require Mongoose
const mongoose 				 = require('mongoose');
const bcrypt 					 = require('bcrypt');
const SALT_WORK_FACTOR = 10
//Define a schema
const Schema = mongoose.Schema;

const userSchema = new Schema({
	firstName : String,
	lastName  : String,
	city			: String,
	phone			: {
		type: Number,
		unique: true
	},
	email     : {
		type: String,
		unique: true
	},
	password	: String
});

userSchema.pre("save", function (next) {
	// store reference
	const user = this;
	bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
			if (err) console.log(err);
			// hash the password using our new salt
			bcrypt.hash(user.password, salt, function (err, hash) {
					if (err) console.log(err);
					user.password = hash;
					next();
			});
	});
})

// Compile model from schema
var userModel = mongoose.model('User', userSchema);

module.exports = userModel;