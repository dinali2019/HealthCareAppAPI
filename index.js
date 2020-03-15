const  express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Successfully connected to the Database!');
}).catch(err => {
    console.log('Connection to database is failed', err);
    process.exit();
});

app.get('/', (req, res) => {
    res.json({message: 'Hello World!'});
});

require('./app/routes/drug.routes.js')(app);
require('./app/routes/doctor.routes.js')(app);
require('./app/routes/patient.routes.js')(app);

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});