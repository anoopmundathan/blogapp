
(function() {

// Model
var Blog = Backbone.Model.extend({});

// Collection
var Blogs = Backbone.Collection.extend();

// Instantiate Collection
var blogs = new Blogs();

// Blog Views
var BlogView = Backbone.View.extend({
	//model: new Blog(),
	events: {
		'click .edit-blog': 'editBlog',
		'click .delete-blog': 'deleteBlog'
	},
	tagName: 'tr',
	initialize: function() {
		this.template = _.template($('.blogs-list-template').html());
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},
	editBlog: function() {
		$('.edit-blog').hide();
		$('.delete-blog').hide();
		$('.save-blog').show();
		$('.cancel-blog').show();
	},
	deleteBlog: function() {
		
	}
});

// Individual Blog View
var BlogsView = Backbone.View.extend({
	//model: blogs,
	el: $('.blogs-list'),
	initialize: function() {
		//this.model.on('add', this.render, this);
		blogs.on('add',this.render,this);
	},
	render: function() {
		var self = this;
		this.$el.html('');
		_.each(blogs.toArray(), function(b){
			self.$el.append(new BlogView({model:b}).render().$el);
		});
		/*_.each(this.model.toArray(), function(b){
			self.$el.append(new BlogView({model:b}).render().$el);

		});*/
		return this;
	}
});

new BlogsView();

$(document).ready(function() {
	$('.add-blog').on('click', function() {
		var blog = new Blog({
			author: $('.author-input').val(),
			title: $('.title-input').val(),
			url: $('.url-input').val()
		});
		$('.author-input').val('');
		$('.title-input').val('');
		$('.url-input').val('');
		
		blogs.add(blog);
	})
		
})

})();

