const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Doctor schema
const Doctor = require('../models/doctor_schema');

//Display doctors list based on speciality
router.get("/:speciality", function(req, res) {
	Doctor.find({speciality:req.params.speciality}, function(err, doctors) {
		if(err){ 
            req.flash("error", err.message);
            res.redirect("/view/doctors");
        }
		res.render("viewdocs",{docs:doctors});
	});
});

module.exports = router;