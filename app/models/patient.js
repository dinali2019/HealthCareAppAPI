const mongoose = require('mongoose');

const PatientScheme = mongoose.Schema({
    FirstName: String,
    LastName: String,
    Birthday: Date,
    Age: Number,
    Disease: String,
    Address: String
}, 
{
    timestamps: true
});

module.exports = mongoose.model('Patient', PatientScheme);