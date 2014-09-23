//Re-write this as controllers for the different experimental html pages

exports.index = function(req, res){
  res.render('index', { title: 'Hello World' });
};