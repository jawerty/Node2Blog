
<h1>Node2Blog</h1>
<p>Node2Blog is a simple and easy to use blog template for the casual blogger. If you want a fast and quick blog setup, then this is the project for you. The blog is built with Node.js, Express.js, and Mongodb (with the mongoose driver). Instructions for building a blog with the Node2Blog template is below.</p> 

<h1>Prerequisites</h1>
<ol>
	<li>
		<b>Node.js</b> (version 0.8 or above, download <a href='http://nodejs.org/'>here</a>)
	</li>
	<li>
		<b>Express.js</b> (version 3 or above, and will be install with npm)
	</li>
	<li>
		A recent version of <b>Mongodb</b> (download <a href='http://docs.mongodb.org/manual/installation/'>here</a>)
	<li>
		<b>Mongoose</b> (will be installed with npm)
	</li>
</ol>
<h1>Setting it up</h1>
<p>In your terminal, 'cd' to the directory where you want to develop the blog and do the following commands</p>
<pre>$ git clone git@github.com:jawerty/Node2Blog.git blog-folder-name<br>$ cd blog-folder-name</pre>
<p>In order to initiate the blog server on your local machine, do the following command (You need node.js to run the following command)</p>
<pre>$ node blog</pre>
<p>Your blog should be running on your localhost at the 3000 port; go to <a href='http://localhost:3000'>http://localhost:3000</a> to view it. And it should look similar to the screenshot below. </p>

<img src='https://raw.github.com/jawerty/Node2Blog/master/public/images/screenshot1.png'></img>

<p>If you would like to make a post, go to the the url http://localhost:3000/admin in order to login and use the admin settings. <b>The password is <i>'narwhal'</i> by default</b>. To change the password, go to the file 'blog.js' and change the p variable at the top to your desired password.</p>
<p><b>Change the t variable in 'blog.js' to your blog title (i.e t = 'Jared's Tech Blog')</b></p>

<img src='https://raw.github.com/jawerty/Node2Blog/master/public/images/screenshot2.png'></img>

<p>When siccessfully logged in, your navigation bar should have three options appended to it...</p>
<ol>
	<li>Admin-New (create a new post)</li>
	<li>Admin-Delete (delete a post</li>
	<li>Admin-Logout (logout of admin view)</li>
</ol>

<img src='https://raw.github.com/jawerty/Node2Blog/master/public/images/screenshot3.png'></img>

<p>Creating and deleting posts should be self-explanatory; however, creating a new static page similar to the default 'about' page is detailed below</p>
<h1>Adding a static page</h1>
<p>To create a new page first you must go to the 'layout.jade' file in the /views folder. Add the following code below the about 'li' tags which are in an 'ol' tag in the #nav div.</p>
<pre>
<code>
a(href="/new-page-name")
	li new_page_name
</code>
</pre>
<p>Now create a new view with whatever name you want (i.e. new_page_name.jade) in the /views folder. Add the following code to your new view</p>
<pre>
<code>
extends layout

block wrapper_content
	.container
		h1 new_page_name
		br 
		p random information
</code>
</pre>
<p>Now modify the get functions in the 'blog.js' file.</p>

<label><b>After</b> adding the code</label>
<pre><code>
////////get////////
app.get('/', home.index);
app.get('/admin/delete', admin.delete);
app.get('/admin/new', admin.new);
app.get('/post/:id', post.post_view);
app.get('/admin' || '/admin/', admin.admin_check);
app.get('/admin/logout', function(req,res){
  delete req.session.admin;
  console.log('logged-out')
  res.redirect('/');
});

app.get('/about', function(req, res) {
  res.render('about', { title: t, admin:req.session.admin});
      
});

//The code your adding
app.get('/new-page-name', function(req, res) {
  res.render('new_page_name', { title: t, admin:req.session.admin});
});

///////////////////
</code></pre>

<p>You should now be able to go the the '/new-page-name' route and have a view similar to what is below</p>

<img src='https://raw.github.com/jawerty/Node2Blog/master/public/images/screenshot4.png'><img>

<p>Congratulations you now have a working blog suitable to your basic blogger needs.</p>
<br>
<p style='font-size:230%'><b>Contact the developer here</b><br>Email: jawerty210@gmail.com<br>Website: <a href='http://wrightdev.herokuapp.com'>http://wrightdev.herokuapp.com</a></p>
