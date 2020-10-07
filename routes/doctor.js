const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
var fs = require('fs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Doctor schema
const doctor = require('../models/doctor_schema');

//Functions to validate user input
const validateRegisterInput = require('../validation/register');

//Doctor Register Auth
router.post("/register", function(req, res) {
	//Registration form validation
	const {errors, isValid} = validateRegisterInput(req.body);
	if (!isValid) {
		req.flash("error", errors);
        res.redirect("/");
	}
	const newDoctor = new Doctor({
		profilePic: {
			data: fs.readFileSync('./public/images/doctor.png'),
			contentType: 'image/png'
		},
		name: req.body.name,
		username: req.body.username
	});
	Doctor.register(newDoctor, req.body.password, function(err, doctor){
        if(err){
            req.flash("error", err.message);
            res.redirect("/");
        }
        passport.authenticate("doctorLocal")(req, res, function(){
        	req.flash("success", "Successfully registered!!");
            res.redirect("/"); 
        });
    });
});

//Doctor Login Auth
router.post("/login", passport.authenticate('doctorLocal', {
	successRedirect: '/dashboardDoc',
    failureRedirect: '/',
    failureFlash: true
}));

module.exports = router;