const userModel = require('../../model/users.js')
const authCtrl  = require('./../auth/auth')
const bcrypt 		= require('bcrypt');

module.exports = {
	getUser: function (req, res) {
		authCtrl
			.getDecodedData(req.query.authToken)
			.then((data)=>{
				res.status(200).send({ 'userName': data.user.userName })
			})
			.catch((err)=>{
				res.status(403).send(
					{ 
						'error_msg'  : 'Please Provide Valid Authtoken!!',
						'error_code' : '403' 
					})
			})
	},
	creaateUser: function (req, res) {
		let firstName = req.body.firstName;
		let lastName  = req.body.lastName;
		let city 			= req.body.city;
		let phone  		= req.body.phone;
		let email  		= req.body.email;
		let password  = req.body.password;

		let user = new userModel({ firstName,lastName,city,phone,email,password });
		user
			.save()
			.then(function (data) {
				res.status(200).send({ 'message': 'Created User' })
			})
			.catch(function (err) {
				res.status(400).send({ 'err_msg': 'Unable to Create User!' })
			})
	},
	login: async function (req, res) {
		let email   			    = req.body.email;
		let password 			    = req.body.password;
		var userData 			    = await validateUser(email)
		var isPasswordMatched = userData.length? await isPasswordMatch(password,userData[0].password):false; 
		if(userData && isPasswordMatched){
			authCtrl
			.generateAuthToken(userData[0])
			.then((authToken)=>{
				res.status(200).send({
					'user' : userData[0],
					'authToken': authToken 
				})	
			})
		}else{
			res.status(401).send({ 'message': 'Invalid user!!' })
		}
	}
}
function validateUser(email) {
	return userModel.find({ email: email })
}

function isPasswordMatch(password,hash){
	return bcrypt.compare(password, hash)
}