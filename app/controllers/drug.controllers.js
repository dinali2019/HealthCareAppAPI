const Drug = require('../models/drug');

exports.create = (req, res) => {
    if(!req.body.Name && !req.body.Manufacturer && !req.body.ScientificName && !req.body.Unit && !req.body.Dosage) {
        return res.status(400).send({
            message: "Drug details can not be empty"
        });
    }

    const drug = new Drug({
        Manufacturer: req.body.Manufacturer,
        Name: req.body.Name,
        ScientificName: req.body.ScientificName,
        Unit: req.body.Unit,
        Dosage: req.body.Dosage
    });

    drug.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Drug."
        });
    });
};

exports.getAll = (req, res) => {
    Drug.find()
    .then(drugs => {
        res.send(drugs);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving drugs."
        });
    });
};  

exports.getByDrugId = (req, res) => {
    Drug.findById(req.params.idValue)
    .then(drug => {
        if(!drug) {
            return res.status(404).send({
                message: "Drug not found with id " + req.params.idValue
            });            
        }
        res.send(drug);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Drug not found with id " + req.params.idValue
            });                
        }
        return res.status(500).send({
            message: "Error retrieving drug with id " + req.params.idValue
        });
    });
};

exports.update = (req, res) => {
    if(!req.body.Name && !req.body.Manufacturer && !req.body.ScientificName && !req.body.Unit && !req.body.Dosage) {
        return res.status(400).send({
            message: "Drug can not be empty"
        });
    }

    Drug.findByIdAndUpdate(req.params.idValue, {
        Manufacturer: req.body.Manufacturer,
        Name: req.body.Name,
        ScientificName: req.body.ScientificName,
        Unit: req.body.Unit,
        Dosage: req.body.Dosage
    }, {new: true})
    .then(drug => {
        if(!drug) {
            return res.status(404).send({
                message: "Drug not found with id " + req.params.idValue
            });
        }
        res.send(drug);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Drug not found with id " + req.params.idValue
            });                
        }
        return res.status(500).send({
            message: "Error updating drug with id " + req.params.idValue
        });
    });
};

exports.delete = (req, res) => {
    Drug.findByIdAndRemove(req.params.idValue)
    .then(drug => {
        if(!drug) {
            return res.status(404).send({
                message: "Drug not found with id " + req.params.idValue
            });
        }
        res.send({message: "Drug deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Drug not found with id " + req.params.idValue
            });                
        }
        return res.status(500).send({
            message: "Could not delete drug with id " + req.params.idValue
        });
    });
};