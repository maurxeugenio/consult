const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var fs = require('fs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//Patient schema
const Patient = require('../models/patient_schema');

//Functions to validate user input
const validateRegisterInput = require('../validation/register');

//Patient Register Auth
router.post("/register", function(req, res) {
	//Registration form validation
	const {errors, isValid} = validateRegisterInput(req.body);
	if (!isValid) {
		req.flash("error", errors);
        res.redirect("/");
	}
	const newPatient = new Patient({
		profilePic: {
			data: fs.readFileSync('./public/images/patient.png'),
			contentType: 'image/png'
		},
		name: req.body.name,
		username: req.body.username,
	});
	Patient.register(newPatient, req.body.password, function(err, patient){
        if(err){ 
            req.flash("error", err.message);
            res.redirect("/");
        }
        passport.authenticate("patientLocal")(req, res, function(){
        	req.flash("success", "Successfully registered!!");
        	res.redirect("/");
        });
    });
});

//Patient Login Auth
router.post("/login", passport.authenticate('patientLocal', {
	successRedirect: '/dashboardPat',
    failureRedirect: '/',
    failureFlash: true
}));

module.exports = router;