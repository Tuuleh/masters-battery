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

//importing finish model
var Demographics = sequelize.import(__dirname + "/models/demographics");
var Surveys = sequelize.import(__dirname + "/models/surveys");
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
        summoner_name: req.body.summoner_name,
        region: req.body.region,
        position: req.body.position,
        role: req.body.role,
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
        .then(function(demographics){
            console.log("We did it! " + demographics.user_id)
            res.send('{"status":"ok"}');
        }).error(function(err){
            res.status(400).send('{"status":"error"}');
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

    console.log(req.body.data);

    for (var trial in req.body.data) {
        console.log("looping x " + trial);
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
/*
    console.log("data object: "+data_object);
    console.log("Stringified: "+JSON.stringify(data_object));
*/
    /*
[
    {
        "trial_type": "text",
        "trial_index": 0,
        "rt": 559,
        "key_press": 40
    },
    {
        "inventory": "GEQ",
        "trial_type": "survey-likert",
        "GEQ_rt": 1863,
        "GEQ_Q1": 5,
        "GEQ_Q2": 5,
        "GEQ_Q3": 5,
        "GEQ_Q4": 5,
        "GEQ_Q5": 5,
        "GEQ_Q6": 5,
        "GEQ_Q7": 5,
        "GEQ_Q8": 5,
        "GEQ_Q9": 5
    },
    {
        "inventory": "GEQ",
        "trial_type": "survey-likert",
        "GEQ_rt": 1629,
        "GEQ_Q1": 5,
        "GEQ_Q2": 5,
        "GEQ_Q3": 5,
        "GEQ_Q4": 5,
        "GEQ_Q5": 5,
        "GEQ_Q6": 5,
        "GEQ_Q7": 5,
        "GEQ_Q8": 5,
        "GEQ_Q9": 5
    },
    {
        "inventory": "TLX",
        "trial_type": "survey-likert",
        "TLX_rt": 1705,
        "TLX_Q1": 10,
        "TLX_Q2": 10,
        "TLX_Q3": 10,
        "TLX_Q4": 10,
        "TLX_Q5": 10,
        "TLX_Q6": 10
    }
]


    */

    Surveys
        .build(data_object)
        .save()
        .then(function(current_survey){
            console.log("We did it! " + current_survey.user_id)
            res.send('{"status":"ok"}');
        }).error(function(err){
            res.status(400).send('{"status":"error"}');
        });
});

app.get('/flanker', function (req, res) {
    var userId = req.query.userId;
    res.render('flanker', {userId:userId});
});

app.post('/flanker-data', function (req, res) {
    res.send('{"status":"ok"}');
    var data_object_array = [];
/*
user_id
trial_index
rt
type
direction
correct
(created_at)
*/
    data_object.user_id = req.body.userId;
    for (var trial in req.body.data) {
        //if the trial is not for training and not for instructions, 
        //create data object for single trial in the sequence
        if (req.body.data.trial_type = "single-stim") {
            trial_object = {};
            trial_object.user_id = req.body.userId;
            trial_object.trial_index = req.body.data[trial].trial_index;
            trial_object.rt = req.body.data[trial].rt;
            trial_object.type = req.body.data[trial].type;
            trial_object.direction = req.body.data[trial].direction;
            trial_object.correct = req.body.data[trial].correct;
        }

    }




    /*

{
    "userId": "023dc884-4f5b-4311-994f-8149e57d54ef",
    "data": [
        {
            "trial_type": "text",
            "trial_index": 0,
            "rt": 1084,
            "key_press": 39
        },
        {
            "trial_type": "categorize",
            "trial_index": 0,
            "rt": 1859,
            "correct": true,
            "stimulus": "img/incongruent_left.gif",
            "key_press": 37
        },
        {
            "trial_type": "text",
            "trial_index": 0,
            "rt": 46,
            "key_press": 39
        },
        {
            "trial_type": "single-stim",
            "trial_index": 0,
            "rt": 113,
            "stimulus": "img/congruent_left.gif",
            "key_press": 39,
            "correct": false,
            "type": "congruent",
            "direction": "left",
            "correct_key": "37"
        }
    ]
}

    */
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
    res.send('{"status":"ok"}');
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
        .then(function(current_finish){
            console.log("We did it! " + current_finish.user_id)
            res.send('{"status":"ok"}');
        }).error(function(err){
            res.status(400).send('{"status":"error"}');
        });
    
});

app.get('/thank_you', function (req, res) {
    var userId = req.query.userId;
    res.render('thank_you', {userId:userId});
});