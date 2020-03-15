const Patient = require('../models/patient');

exports.create = (req, res) => {
    if(!req.body.FirstName && !req.body.LastName && !req.body.Age && !req.body.Disease && !req.body.Address) {
        return res.status(400).send({
            message: "Patient details can not be empty"
        });
    }

    const patient = new Patient({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Birthday: new Date(req.body.Birthday) || new Date(),
        Age: req.body.Age,
        Disease: req.body.Disease,
        Address: req.body.Address
    });

    patient.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Patient."
        });
    });
};

exports.getAll = (req, res) => {
    Patient.find()
    .then(patients => {
        res.send(patients);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving patients."
        });
    });
};  

exports.getByPatientId = (req, res) => {
    Patient.findById(req.params.idValue)
    .then(patient => {
        if(!patient) {
            return res.status(404).send({
                message: "Patient not found with id " + req.params.idValue
            });            
        }
        res.send(patient);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Patient not found with id " + req.params.idValue
            });                
        }
        return res.status(500).send({
            message: "Error retrieving patient with id " + req.params.idValue
        });
    });
};

exports.update = (req, res) => {
    if(!req.body.FirstName && !req.body.LastName && !req.body.Age && !req.body.Disease && !req.body.Address) {
        return res.status(400).send({
            message: "Patient can not be empty"
        });
    }

    Patient.findByIdAndUpdate(req.params.idValue, {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Birthday: new Date(req.body.Birthday) || new Date(),
        Age: req.body.Age,
        Disease: req.body.Disease,
        Address: req.body.Address
    }, {new: true})
    .then(patient => {
        if(!patient) {
            return res.status(404).send({
                message: "Patient not found with id " + req.params.idValue
            });
        }
        res.send(patient);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Patient not found with id " + req.params.idValue
            });                
        }
        return res.status(500).send({
            message: "Error updating patient with id " + req.params.idValue
        });
    });
};

exports.delete = (req, res) => {
    Patient.findByIdAndRemove(req.params.idValue)
    .then(patient => {
        if(!patient) {
            return res.status(404).send({
                message: "Patient not found with id " + req.params.idValue
            });
        }
        res.send({message: "Patient deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Patient not found with id " + req.params.idValue
            });                
        }
        return res.status(500).send({
            message: "Could not delete patient with id " + req.params.idValue
        });
    });
};