
(function() {
// Create Model
var Blog = Backbone.Model.extend({});

// Create Collection
var Blogs = Backbone.Collection.extend();

// Instantiate collection
var blogs = new Blogs();


// Backbone Blog Views
var BlogView = Backbone.View.extend({
	//model: new Blog(),
	tagName: 'tr',
	initialize: function() {
		this.template = _.template($('.blogs-list-template').html());
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});

// Backbone All Individual Blog View
var BlogsView = Backbone.View.extend({
	model: blogs,
	el: $('.blogs-list'),
	initialize: function() {
		this.model.on('add', this.render, this);
	},
	render: function() {
		var self = this;
		this.$el.html('');
		_.each(this.model.toArray(), function(b){
			self.$el.append(new BlogView({model:b}).render());

		});
		return this;
	}
});

new BlogsView();

$(document).ready(function() {
	$('.add-blog').click(function() {
		var blog = new Blog({
			author: $('.author-input').val(),
			title: $('.title-input').val(),
			url: $('.url-input').val()
		});
		blogs.add(blog);
	})
		
})

})();

