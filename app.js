var express = require("express");
var app = express();
//start defining routes via app.VERB()
//check req and res from nodes documentation
//req.pipe(), req.on('data',callback)
//express augments these into higher level methods, e.g. res.send() 
//var serveStatic = require('serve-static');

app.set('views', './views')
app.set('view engine', 'ejs')
//call res.render() to render template code. This following line shouldn't be necessary.
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use( bodyParser.urlencoded({extended: true}) );
//allows for serving static files
app.use(express.static(__dirname + '/public'));

/*
//import sequelize for mysql
var Sequelize = require('sequelize');

//CHECK FROM HERE ON 
// db config
var env = "dev";
var config = require('./database.json')[env];
var password = config.password ? config.password : null;

// initialize database connection
var sequelize = new Sequelize(
    config.database,
    config.user,
    config.password,
    {
        logging: console.log,
        define: {
            timestamps: false
        }
    }
);

var crypto = require('crypto');
var DataTypes = require("sequelize");

//CHECK UNTIL HERE 
*/

//app.listen() takes same args as node's net.Server#listen():
var server = app.listen(3000, function(){
    console.log("Listening on port %d", server.address().port);
});



//controllers/routers
app.get('/', function (req, res) {
    res.render('index', {});
});

app.get('/demographics', function (req, res) {
    res.render('demographics', {});
});

app.post('/demographics-data', function (req, res) {

    console.log(req.body.birth_year);
    console.log(req.body.gender);
    console.log(req.body.summoner_name);
    console.log(req.body.region);
    console.log(req.body.position);
    console.log(req.body.role);
    console.log(req.body.non_team_queue);
    console.log(req.body.non_team_division);
    console.log(req.body.non_team_tier);
    console.log(req.body.team_3v3);
    console.log(req.body.division_3v3);
    console.log(req.body.tier_3v3);
    console.log(req.body.team_5v5);
    console.log(req.body.division_5v5);
    console.log(req.body.tier_5v5);

    res.send('{"status":"ok"}');
});

app.get('/survey_with_intro', function (req, res) {
    res.render('survey_with_intro', {});
});

app.post('/survey_with_intro-data', function (req, res) {
    res.send('{"status":"ok"}');
});

app.get('/flanker', function (req, res) {
    res.render('flanker', {});
});

app.post('/flanker-data', function (req, res) {
    console.log(JSON.stringify(req.body));
    res.send('{"status":"ok"}');
});

app.get('/mental_rotation', function (req, res) {
    res.render('mental_rotation', {});
});

app.post('/mental_rotation-data', function (req, res) {
    console.log(JSON.stringify(req.body));
    res.send("{'status':'ok'}");
});

app.get('/tol', function (req, res) {
    res.render('tol', {});
});

app.post('/tol-data', function (req, res) {
    console.log(JSON.stringify(req.body));
    res.send('{"status":"ok"}');
});


app.get('/palmer-experiments', function (req, res) {
    res.render('palmer-experiments', {});
});

app.post('/palmer-experiments-data', function (req, res) {
    console.log(JSON.stringify(req.body));
    res.send('{"status":"ok"}');
});

app.get('/finish', function (req, res) {
    res.render('finish', {});
});

//do i need an app.post for the form is the resp is to email?
app.post('/finish-data', function (req, res) {
    console.log(JSON.stringify(req.body));
    res.send('{"status":"ok"}');
});