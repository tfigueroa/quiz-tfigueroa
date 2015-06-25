var models = require('../models/models.js');

exports.new = function(req, res) {
	res.render('comments/new.ejs', {quizid: req.params.quizId, errors: []});
}

exports.create = function(req, res) {
	var comment = models.Comment.build({
		texto: req.body.comment.texto,
		QuizId: req.params.quizId
	});

	var errors = comment.validate();
	if (errors) {
		var i=0;
		var errores=new Array();
		for (var prop in errors) errores[i++]={message: errors[prop]};
		res.render('comments/new.ejs', {comment: comment, quizid: req.params.quizId, errors: errores});
	} else {
		comment.save().then(function() {
			res.redirect('/quizes/'+req.params.quizId);
		});
	}
}
