var express = require("express");
var Sequelize = require('sequelize');
var uuid = require("node-uuid");

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
    var userId = uuid.v4();
    res.render('index', {userId: userId});
});

app.get('/demographics', function (req, res) {
    
    var userId = req.query.userId;
    res.render('demographics', {userId: userId});
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
    console.log(req.body.userId);

    res.send('{"status":"ok"}');
});

app.get('/survey_with_intro', function (req, res) {
    var userId = req.query.userId;
    console.log("logging in survey get " + req.query.userId);
    res.render('survey_with_intro', {userId: userId});
});

app.post('/survey_with_intro-data', function (req, res) {
    res.send('{"status":"ok"}');
});

app.get('/flanker', function (req, res) {
    var userId = req.query.userId;
    res.render('flanker', {userId:userId});
});

app.post('/flanker-data', function (req, res) {
    res.send('{"status":"ok"}');
});

app.get('/mental_rotation', function (req, res) {
    var userId = req.query.userId;
    res.render('mental_rotation', {userId:userId});
});

app.post('/mental_rotation-data', function (req, res) {
    res.send("{'status':'ok'}");
});

app.get('/tol', function (req, res) {
    var userId = req.query.userId;
    res.render('tol', {userId:userId});
});

app.post('/tol-data', function (req, res) {
    res.send('{"status":"ok"}');
});


app.get('/palmer-experiments', function (req, res) {
    var userId = req.query.userId;
    res.render('palmer-experiments', {userId:userId});
});

app.post('/palmer-experiments-data', function (req, res) {
    console.log(JSON.stringify(req.body));
    res.send('{"status":"ok"}');
});

app.get('/finish', function (req, res) {
    var userId = req.query.userId;
    res.render('finish', {userId:userId});
});

app.post('/finish-data', function (req, res) {
    console.log(req.body.mail);
    console.log(req.body.message);
    console.log(req.body.wants_results);
    console.log(req.body.thank_you_list);
    res.send('{"status":"ok"}');
});

app.get('/thank_you', function (req, res) {
    var userId = req.query.userId;
    res.render('thank_you', {userId:userId});
});