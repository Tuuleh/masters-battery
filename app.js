var express = require("express");
var Sequelize = require('sequelize');
var uuid = require("node-uuid");
var DataTypes = require("sequelize");
var validator = require("validator");

var app = express();
//start defining routes via app.VERB()
//check req and res from nodes documentation
//req.pipe(), req.on('data',callback)
//express augments these into higher level methods, e.g. res.send() 
//var serveStatic = require('serve-static');

app.set('views', './views')
app.set('view engine', 'ejs')
//call res.render() to render template code. This following line shouldn't be necessary.
var bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use( bodyParser.urlencoded({extended: true}) );

//allows for serving static files
app.use(express.static(__dirname + '/public'));

// gets database configurtion from database.json
var config = require('./database.json');
var password = config.password ? config.password : null;

// initialize database connection - pass this to all the other controllers
var sequelize = new Sequelize(
    config.database,
    config.user,
    config.password,
    {
        logging: console.log
    }
);
//creates Object.keys function for older browsers
if (typeof Object.keys !== "function") {
    (function() {
        Object.keys = Object_keys;
        function Object_keys(obj) {
            var keys = [], name;
            for (name in obj) {
                if (obj.hasOwnProperty(name)) {
                    keys.push(name);
                }
            }
            return keys;
        }
    })();
}


//app.listen() takes same args as node's net.Server#listen():
var server = app.listen(3000, function(){
    console.log("Listening on port %d", server.address().port);
});

//importing models
var Demographics = sequelize.import(__dirname + "/models/demographics");
var Surveys = sequelize.import(__dirname + "/models/surveys");
var Flanker = sequelize.import(__dirname + "/models/flanker");
var Mental_rotation = sequelize.import(__dirname + "/models/mental_rotation");
var London_tower = sequelize.import(__dirname + "/models/london_tower");
var Spatial_span = sequelize.import(__dirname + "/models/spatial_span");
var Finish = sequelize.import(__dirname + "/models/finish");

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

    var data_object = {
        user_id: req.body.userId,
        birth_year:req.body.birth_year,
        gender: req.body.gender,
        level: req.body.level,
        summoner_name: req.body.summoner_name,
        region: req.body.region,
        position: req.body.position,
        role: req.body.role,
        plays_ai: req.body.plays_ai,
        plays_normal_pvp: req.body.plays_normal_pvp,
        plays_non_team: req.body.plays_non_team,
        plays_3v3: req.body.plays_3v3,
        plays_5v5: req.body.plays_5v5,
        non_team_queue: req.body.non_team_queue,
        non_team_division: req.body.non_team_division,
        non_team_tier: req.body.non_team_tier,
        team_3v3: req.body.team_3v3,
        division_3v3: req.body.division_3v3,
        tier_3v3: req.body.tier_3v3,
        team_5v5: req.body.team_5v5,
        division_5v5: req.body.division_5v5,
        tier_5v5: req.body.tier_5v5
    };

    Demographics
        .build(data_object)
        .save()
        .then(function(){
            res.send('{"status":"ok"}');
        },function(err){
            console.log(err);

            if (err.name === "SequelizeUniqueConstraintError") {
                if (err.parent.errno == 1062) {
                    res.status(400).send({"error":"duplicate entry"});
                }
            }
            else if (err.name === "SequelizeValidationError") {
                var error_array = [];
                for (var error in err.errors) {
                    error_array.push({"path" : err.errors[error].path, "message" : err.errors[error].message});
                }
                res.status(400).send({"error" : error_array});
            }
            res.status(400).send({"status" : "unknown error"});
        }); 
});

app.get('/survey_with_intro', function (req, res) {
    var userId = req.query.userId;
    res.render('survey_with_intro', {userId:userId});
});

app.post('/survey_with_intro-data', function (req, res) {

    var data_object = {};
    data_object.user_id = req.body.userId;

    var tlx_columns = [
        "TLX_rt", 
        "mental_demand", 
        "physical_demand", 
        "temporal_demand", 
        "performance", 
        "effort", 
        "frustration"
    ];

    var tlx_counter = 0;
    var GEQ_counter = 1;

    for (var trial in req.body.data) {
        console.log("looping x " + trial);
        //this breaks upon TLX
        if (req.body.data[trial].hasOwnProperty("inventory")) {
            console.log("has inventory!")
            for (item in req.body.data[trial]) {
                //if key contains the value under key "inventory",
                var regex = new RegExp(req.body.data[trial].inventory); //regex for comparing if item name contains inventory
                if (item.match(regex) != null) { //if item name contains an inventory
                    //item is from TLX
                    if (item.match(/TLX/) != null) {      
                        data_object[tlx_columns[tlx_counter]] = req.body.data[trial][item];
                        tlx_counter++;
                    }
                    //item is from GEQ
                    else {
                        if (item.match(/rt/) != null) { //item is for reaction time - there have to be two of these
                            data_object[item + trial] = req.body.data[trial][item];
                        }
                        else {
                            data_object[req.body.data[trial].inventory+GEQ_counter] = req.body.data[trial][item];
                            GEQ_counter++;
                        }                        
                    }
                }
            }
        }
        else {
            continue;
        }
    }


    Surveys
        .build(data_object)
        .save()
        .then(function(){
            res.send('{"status":"ok"}');
        },function(err){
            console.log(err);

            if (err.name === "SequelizeUniqueConstraintError") {
                if (err.parent.errno == 1062) {
                    res.status(400).send({"error":"duplicate entry"});
                }
            }
            res.status(400).send({"status" : "unknown error"});
        }); 
});

app.get('/flanker', function (req, res) {
    var userId = req.query.userId;
    res.render('flanker', {userId:userId});
});

app.post('/flanker-data', function (req, res) {

    var data_object_array = [];

    for (var trial in req.body.data) {
        //if the trial is not for training and not for instructions, 
        //create data object for single trial in the sequence
        var data_object = {};
        if (req.body.data[trial].trial_type == "single-stim") {
            data_object.user_id = req.body.userId;
            data_object.trial_index = req.body.data[trial].trial_index;
            data_object.rt = req.body.data[trial].rt;
            data_object.type = req.body.data[trial].type;
            data_object.direction = req.body.data[trial].direction;
            data_object.correct = req.body.data[trial].correct;

            data_object_array.push(data_object);

        }

    }

    console.log("storing data...");

    Flanker
    .bulkCreate(data_object_array)
    .then(function(){
            res.send('{"status":"ok"}');
    },function(err){
        console.log(err);
        if (err.name === "SequelizeUniqueConstraintError") {
            if (err.parent.errno == 1062) {
                res.status(400).send({"error":"duplicate entry"});
            }
        }
        res.status(400).send({"status" : "unknown error"});
    }); 
});

app.get('/mental_rotation', function (req, res) {
    var userId = req.query.userId;
    res.render('mental_rotation', {userId:userId});
});

app.post('/mental_rotation-data', function (req, res) {

    var data_object_array = [];

    for (var trial in req.body.data) {

        //trial is not a training trial and is of the right type
        if ((req.body.data[trial].training == false) && (req.body.data[trial].trial_type == "two-stim")) {

            console.log("making a trial");
            var data_object = {};

            data_object.user_id = req.body.userId;
            data_object.trial_index = req.body.data[trial].trial_index;
            data_object.rt = req.body.data[trial].rt;
            data_object.item = req.body.data[trial].item;
            data_object.type = req.body.data[trial].type;
            data_object.rotation = req.body.data[trial].rotation;
            data_object.correct = req.body.data[trial].correct;

            data_object_array.push(data_object);
        }
    }

    console.log("storing data...");
    console.log(data_object_array);

    Mental_rotation
    .bulkCreate(data_object_array)
    .then(function(){
        res.send('{"status":"ok"}');
    },function(err){
        console.log(err);

        if (err.name === "SequelizeUniqueConstraintError") {
            if (err.parent.errno == 1062) {
                res.status(400).send({"error":"duplicate entry"});
            }
        }
        res.status(400).send({"status" : "unknown error"});
    }); 


});

app.get('/tol', function (req, res) {
    var userId = req.query.userId;
    res.render('tol', {userId:userId});
});

app.post('/tol-data', function (req, res) {
    
    var data_object_array = [];

    for (var trial in req.body.data) {
        
        //trial is not a training trial and is of the right type
        if (req.body.data[trial].trial_type == "single-stim") {

            var data_object = {};

            data_object.user_id = req.body.userId;
            data_object.trial_index = req.body.data[trial].trial_index;
            data_object.rt = req.body.data[trial].rt;
            data_object.moves = req.body.data[trial].moves;
            data_object.missed_by = req.body.data[trial].missed_by;

            data_object_array.push(data_object);
        }
    }

    London_tower
    .bulkCreate(data_object_array)
    .then(function(){
        res.send('{"status":"ok"}');
    },function(err){
        console.log(err);

        if (err.name === "SequelizeUniqueConstraintError") {
            if (err.parent.errno == 1062) {
                res.status(400).send({"error":"duplicate entry"});
            }
        }
        res.status(400).send({"status" : "unknown error"});
    }); 

});


app.get('/palmer-experiments', function (req, res) {
    var userId = req.query.userId;
    res.render('palmer-experiments', {userId:userId});
});

app.post('/palmer-experiments-data', function (req, res) {
    res.send('{"status":"ok"}');
});

app.get('/spatial_span', function (req, res) {
    var userId = req.query.userId;
    res.render('spatial_span', {userId:userId});
});

app.post('/spatial_span-data', function (req, res) {

    console.log(req.body);
    Spatial_span
        .build({
            user_id: req.body.user_id,
            max_correct: req.body.max_correct,
            trials_run: req.body.trials_run,
            max_length: req.body.max_length
        })
        .save()
        .then(function(){
            res.send('{"status":"ok"}');
        },function(err){
            console.log(err);

            if (err.name === "SequelizeUniqueConstraintError") {
                if (err.parent.errno == 1062) {
                    res.status(400).send({"error":"duplicate entry"});
                }
            }
            res.status(400).send({"status" : "unknown error"});
        }); 
});

app.get('/finish', function (req, res) {
    var userId = req.query.userId;
    res.render('finish', {userId:userId});
});

//POST FOR FINISH:
app.post('/finish-data', function (req, res) {

    Finish
        .build({
            user_id: req.body.userId, 
            mail: req.body.mail, 
            message: req.body.message, 
            wants_results: req.body.wants_results, 
            thank_you: req.body.thank_you
        })
        .save()
        .then(function(){
            res.send('{"status":"ok"}');
        },function(err){
            console.log(err);

            if (err.name === "SequelizeUniqueConstraintError") {
                if (err.parent.errno == 1062) {
                    res.status(400).send({"error":"duplicate entry"});
                }
            }
            else if (err.name === "SequelizeValidationError") {
                console.log("validation error");
                var error_array = [];
                for (var error in err.errors) {
                    error_array.push({"path" : err.errors[error].path, "message" : err.errors[error].message});
                }
                res.status(400).send({"error" : error_array});
            }
            res.status(400).send({"status" : "unknown error"});
        }); 
    
});

app.get('/thank_you', function (req, res) {
    var userId = req.query.userId;
    res.render('thank_you', {userId:userId});
});