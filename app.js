var express = require("express");
var Sequelize = require('sequelize');
var uuid = require("node-uuid");
var crypto = require('crypto');
var DataTypes = require("sequelize");

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
app.use(express.static(__dirname + '/models'));

// gets database configurtion from database.json
var config = require('./database.json');
var password = config.password ? config.password : null;

// initialize database connection
var sequelize = new Sequelize(
    config.database,
    config.user,
    config.password,
    {
        logging: console.log
    }
);


//app.listen() takes same args as node's net.Server#listen():
var server = app.listen(3000, function(){
    console.log("Listening on port %d", server.address().port);
});

//importing finish model
//var Finish = sequelize.import(__dirname + "/models/finish");

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
    console.log("posting demographics data, queried userId is "+req.query.userId);
    console.log("posting demographics data, body userId is "+req.body.userId);
});

app.get('/survey_with_intro', function (req, res) {
    var userId = req.query.userId;
    res.render('survey_with_intro', {userId:userId});
    console.log("getting survey, queried userId is "+req.query.userId);
    console.log("getting survey, body userId is "+req.body.userId);
});

app.post('/survey_with_intro-data', function (req, res) {
    res.send('{"status":"ok"}');
    console.log("posting survey data, queried userId is "+req.query.userId);
    console.log("posting survey data, body userId is "+req.body.userId);
});

app.get('/flanker', function (req, res) {
    var userId = req.query.userId;
    console.log("getting flanker data, queried userId is "+req.query.userId);
    console.log("getting flanker data, body userId is "+req.body.userId);
    res.render('flanker', {userId:userId});
});

app.post('/flanker-data', function (req, res) {
    res.send('{"status":"ok"}');
    console.log("posting flanker data, queried userId is "+req.query.userId);
    console.log("posting flanker data, body userId is "+req.body.userId);
});

app.get('/mental_rotation', function (req, res) {
    var userId = req.query.userId;
    res.render('mental_rotation', {userId:userId});
    console.log("getting mental rotation, queried userId is "+req.query.userId);
    console.log("getting mental rotation, body userId is "+req.body.userId);
});

app.post('/mental_rotation-data', function (req, res) {
    res.send("{'status':'ok'}");
    console.log("queried userId is "+req.query.userId);
    console.log("posting mental_rotation data, queried userId is "+req.query.userId);
    console.log("posting mental_rotation data, body userId is "+req.body.userId);
});

app.get('/tol', function (req, res) {
    var userId = req.query.userId;
    res.render('tol', {userId:userId});
    console.log("getting ToL, queried userId is "+req.query.userId);
    console.log("getting ToL rotation, body userId is "+req.body.userId);
});

app.post('/tol-data', function (req, res) {
    res.send('{"status":"ok"}');
    console.log("posting tol data, queried userId is "+req.query.userId);
    console.log("posting ToL data, body userId is "+req.body.userId);
});


app.get('/palmer-experiments', function (req, res) {
    var userId = req.query.userId;
    res.render('palmer-experiments', {userId:userId});
});

app.post('/palmer-experiments-data', function (req, res) {
    res.send('{"status":"ok"}');
});

app.get('/finish', function (req, res) {
    var userId = req.query.userId;
    res.render('finish', {userId:userId});
    console.log("getting finish, queried userId is "+req.query.userId);
    console.log("getting finish, body userId is "+req.body.userId);
});


//POST FOR FINISH:

app.post('/finish-data', function (req, res) {

    console.log("posting finish data, queried userId is "+req.query.userId);
    console.log("posting finish data, body userId is "+req.body.userId);

    //model for the finish table in thesis_database:


    var Finish = sequelize.define('finish', {
        user_id: {type: Sequelize.UUID, primaryKey: true}, //CHAR(36)
        mail: DataTypes.STRING(100), //VARCHAR(100),
        message: DataTypes.TEXT,
        wants_results: DataTypes.INTEGER, //TINYINT,
        thank_you: DataTypes.INTEGER, //TINYINT
        created_at: DataTypes.DATE,
    },
        {
            timestamps: true,
            updatedAt: false,
            deletedAt: false,
            freezeTableName: true,
            createdAt: 'created_at',
        });

 //Adding instances to the finish table in my database
    Finish
        .build({
            user_id: req.body.userId, 
            mail: req.body.mail, 
            message: req.body.message, 
            wants_results: req.body.wants_results, 
            thank_you: req.body.thank_you
        })
        .save()
        .then(function(current_finish){
            console.log("We did it! " + current_finish.user_id)
        }), function(err){
            console.log("Almost there!")
        };

});

app.get('/thank_you', function (req, res) {
    var userId = req.query.userId;
    res.render('thank_you', {userId:userId});
});