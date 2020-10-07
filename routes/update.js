const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Doctor schema
const Doctor = require('../models/doctor_schema');
//Patient schema
const Patient = require('../models/patient_schema');

//Display doctor user details
router.get("/", function(req, res) {
	Doctor.findOne({_id:req.user._id}, function(err, account) {
		if(err){ 
            req.flash("error", err.message);
            res.redirect("/update");
        }
		res.render("update", {profilePic: account.profilePic});
	});
});

module.exports = router;