
(function() {

// Model
var Blog = Backbone.Model.extend({});

// Collection
var Blogs = Backbone.Collection.extend({
	url: 'http://localhost:3000/api/blogs'
});

// Instantiate Collection
var blogs = new Blogs();

// Blog Views
var BlogView = Backbone.View.extend({
	//model: new Blog(),
	events: {
		'click .edit-blog': 'editBlog',
		'click .delete-blog': 'deleteBlog',
		'click .update-blog': 'updateBlog',
		'click .cancel-blog': 'cancelBlog'
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

		// Hide Edit and Delete button
		$('.edit-blog').hide();
		$('.delete-blog').hide();
		
		// Show Save and Cance button
		this.$('.update-blog').show();
		this.$('.cancel-blog').show();

		// Store the values
		var author = this.$('.author').html();
		var title = this.$('.title').html();
		var url = this.$('.url').html();

		// Change html into an Input tag
		this.$('.author').html('<input type="text" class="author-update" value=' + author +'></input>');
		this.$('.title').html('<input type="text" class="title-update" value=' + title +'></input>');
		this.$('.url').html('<input type="text" class="url-update" value=' + url +'></input>');
	},
	deleteBlog: function() {
		this.model.destroy();
	},
	updateBlog: function() {
	
		// Update the model
		this.model.set('author',$('.author-update').val());
		this.model.set('title',$('.title-update').val());
		this.model.set('url',$('.url-update').val());
	},
	cancelBlog: function() {
		//blogsView.render();
		this.render();
	}
});

// Individual Blog View
var BlogsView = Backbone.View.extend({
	//model: blogs,
	el: $('.blogs-list'),
	initialize: function() {
		//this.model.on('add', this.render, this);
		blogs.on('add',this.render,this);
		blogs.on('change',function() {
			var self = this;
			setTimeout(function(){
				self.render();
			}, 30)
		},this);
		blogs.on('destroy', this.render, this);

		// GET data from Server
		blogs.fetch({
			success: function(response) {
				_.each(response.toJSON(), function(item) {
					console.log('Successfully Got' + item._id);
				})
			},
			error: function() {
				console.log('Failed');
			}
		});

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
		console.log('render');
		return this;
	}
});

var blogsView = new BlogsView();

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
		blog.save({
			success: function(response) {
				console.log('Successfully saved' + response.toJSON());
			},
			error: function() {
				console.log('Something wrong in save');
			}
		});
	})
		
})

})();

