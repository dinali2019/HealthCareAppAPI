const Doctor = require('../models/doctor');

exports.create = (req, res) => {
    if(!req.body.FirstName && !req.body.LastName && !req.body.RegistrationCode && !req.body.Age && !req.body.Address) {
        return res.status(400).send({
            message: "Doctor details can not be empty"
        });
    }

    const doctor = new Doctor({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        RegistrationCode: req.body.RegistrationCode,
        Specialty: req.body.Specialty || 'General',
        Age: req.body.Age,
        Address: req.body.Address
    });

    doctor.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Doctor."
        });
    });
};

exports.getAll = (req, res) => {
    Doctor.find()
    .then(doctors => {
        res.send(doctors);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving doctors."
        });
    });
};  

exports.getByDoctorId = (req, res) => {
    Doctor.findById(req.params.idValue)
    .then(doctor => {
        if(!doctor) {
            return res.status(404).send({
                message: "Doctor not found with id " + req.params.idValue
            });            
        }
        res.send(doctor);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Doctor not found with id " + req.params.idValue
            });                
        }
        return res.status(500).send({
            message: "Error retrieving doctor with id " + req.params.idValue
        });
    });
};

exports.update = (req, res) => {
    if(!req.body.FirstName && !req.body.LastName && !req.body.RegistrationCode && !req.body.Age && !req.body.Address) {
        return res.status(400).send({
            message: "Doctor can not be empty"
        });
    }

    Doctor.findByIdAndUpdate(req.params.idValue, {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        RegistrationCode: req.body.RegistrationCode,
        Specialty: req.body.Specialty || 'General',
        Age: req.body.Age,
        Address: req.body.Address
    }, {new: true})
    .then(doctor => {
        if(!doctor) {
            return res.status(404).send({
                message: "Doctor not found with id " + req.params.idValue
            });
        }
        res.send(doctor);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Doctor not found with id " + req.params.idValue
            });                
        }
        return res.status(500).send({
            message: "Error updating doctor with id " + req.params.idValue
        });
    });
};

exports.delete = (req, res) => {
    Doctor.findByIdAndRemove(req.params.idValue)
    .then(doctor => {
        if(!doctor) {
            return res.status(404).send({
                message: "Doctor not found with id " + req.params.idValue
            });
        }
        res.send({message: "Doctor deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Doctor not found with id " + req.params.idValue
            });                
        }
        return res.status(500).send({
            message: "Could not delete doctor with id " + req.params.idValue
        });
    });
};