module.exports = (app) => {
    const drugs = require('../controllers/drug.controllers.js');

    app.post('/drugs', drugs.create);

    app.get('/drugs', drugs.getAll);

    app.get('/drugs/:idValue', drugs.getByDrugId);

    app.put('/drugs/:idValue', drugs.update);

    app.delete('/drugs/:idValue', drugs.delete);
}