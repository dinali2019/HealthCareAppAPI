const mongoose = require('mongoose');

const DrugSchema = mongoose.Schema({
    Manufacturer: String,
    Name: String,
    ScientificName: String,
    Unit: String,
    Dosage: Number
}, 
{
    timestamps: true
});

module.exports = mongoose.model('Drug', DrugSchema);