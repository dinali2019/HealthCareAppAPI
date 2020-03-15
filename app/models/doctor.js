const mongoose = require('mongoose');

const DoctorSchema = mongoose.Schema({
    FirstName: String,
    LastName: String,
    RegistrationCode: String,
    Specialty: String,
    Age: Number,
    Address: String
}, 
{
    timestamps: true
});

module.exports = mongoose.model('Doctor', DoctorSchema);