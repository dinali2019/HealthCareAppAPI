module.exports = (app) => {
    const patients = require('../controllers/patient.controllers.js');

    app.post('/patients', patients.create);

    app.get('/patients', patients.getAll);

    app.get('/patients/:idValue', patients.getByPatientId);

    app.put('/patients/:idValue', patients.update);

    app.delete('/patients/:idValue', patients.delete);
}