module.exports = (app) => {
    const doctors = require('../controllers/doctor.controllers.js');

    app.post('/doctors', doctors.create);

    app.get('/doctors', doctors.getAll);

    app.get('/doctors/:idValue', doctors.getByDoctorId);

    app.put('/doctors/:idValue', doctors.update);

    app.delete('/doctors/:idValue', doctors.delete);
}