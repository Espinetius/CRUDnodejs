const express = require('express');
const {engine}= require ('express-handlebars');
const myconnection = require('express-myconnection');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const taskRoutes = require('./routes/tasks');

router = express.Router();

const app = express();
app.set('port', 4000)

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine( {
    extname: '.hbs'
}));
app.set('view engine', 'hbs');

app.use(myconnection(mysql, {
    host: 'localhost',
    user: 'david',
    password: '1234',
    database: '2evtrabajo'
}, 'single'));


app.listen(app.get('port'), () => {
    console.log('testeando en el puerto:', app.get('port'));
})



app.use('/', taskRoutes)

app.get('/', (req, res) => {
    res.render('home')
});