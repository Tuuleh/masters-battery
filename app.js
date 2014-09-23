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

app.use(express.static(__dirname + '/public'));

//app.listen() takes same args as node's net.Server#listen():
var server = app.listen(3000, function(){
    console.log("Listening on port %d", server.address().port);
});

//route the index file:
app.get('/', function (req, res) {
    res.render('index', {});
});

app.get('/demographics', function (req, res) {
    res.render('demographics', {});
});

app.get('/survey_with_intro', function (req, res) {
    res.render('survey_with_intro', {});
});

app.post('/survey_with_intro-data', function (req, res) {
    console.log(JSON.stringify(req.body));
    res.send("{'status':'ok'}");
});

app.get('/flanker', function (req, res) {
    res.render('flanker', {});
});

app.post('/flanker-data', function (req, res) {
    console.log(JSON.stringify(req.body));
    res.send("{'status':'ok'}");
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
    res.send("{'status':'ok'}");
});


app.get('/palmer-experiments', function (req, res) {
    res.render('palmer-experiments', {});
});