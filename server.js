var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect to mongodb
mongoose.connect('mongodb://localhost/blogroll');

// Create Schema
var Schema = mongoose.Schema;

var BlogSchema = new Schema({
	author: String,
	title: String,
	url: String
});

mongoose.model('Blog',BlogSchema);

var Blog = mongoose.model('Blog');

/*var blog = new Blog({
	author: 'Anoop',
	title: 'Mundathan',
	url: 'www.abc.com'
});

// Save the model
blog.save();*/

var app = express();
app.use(express.static(__dirname + '/'));

// Use Body Parser
app.use(bodyParser.json());

// ROUTES

app.get('/api/blogs', function(req, res) {
	Blog.find(function(err, docs){
			docs.forEach(function(item) {
				console.log("Received a GET request:" + item._id);
			})
		res.send(docs);
	});
});

app.post('/api/blogs', function(req, res) {
	console.log('Received a POST request');
	for (var key in req.body) {
		console.log('Key'+req.body[k])
	}
	var blog = new Blog(req.body);
	blog.save(function() {
		res.send(doc);
	});
});

var port = 3000;
app.listen(port);
console.log('server running on ' + port);