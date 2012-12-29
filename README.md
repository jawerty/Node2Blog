
<h1>Node2Blog</h1>
<p>Node2Blog is a simple and easy to use blog template for the casual blogger. For those who wish to setup an operable blog in minutes, this is the project for you. The blog is built with Node.js, Express.js, and Mongodb (with the mongoose driver). The instructions for building a blog with the Node2Blog template is shown below.</p> 

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
<pre>$ git clone git@github.com:jawerty/Node2Blog.git blog-folder-name<br>$ cd blog-folder-name<br>$ npm install .</pre>
<p>In order to initiate the blog server on your local machine, do the following command (You need node.js to run the following command)</p>
<pre>$ node blog</pre>
<p>The blog should be running on your localhost at the 3000 port; go to <a href='http://localhost:3000'>http://localhost:3000</a> to view it. And it should look similar to the screenshot below. </p>

<img src='https://raw.github.com/jawerty/Node2Blog/master/public/images/screenshot1.png'></img>

<p>If you would like to make a post, go to the the url http://localhost:3000/admin in order to log in and use the admin settings. <b>The password is <i>'narwhal'</i> by default</b>. To change the password, go to the file 'blog.js' and change the p variable at the top to your desired password.</p>
<h4><b>*Note: Change the t variable in 'blog.js' to your blog title (i.e t = 'Jared's Tech Blog'). <br>Also, Change the st variable in 'blog.js' to whatever you would like your subtitle to be (i.e st = 'I am an App developer').</b></h4>

<img src='https://raw.github.com/jawerty/Node2Blog/master/public/images/screenshot2.png'></img>

<p>When successfully logged in, your navigation bar should have three new options appended to it...</p>
<ol>
	<li>Admin-New (create a new post)</li>
	<li>Admin-Delete (delete a post</li>
	<li>Admin-Logout (log out of admin view)</li>
</ol>

<img src='https://raw.github.com/jawerty/Node2Blog/master/public/images/screenshot3.png'></img>

<p>Creating and deleting posts should be self-explanatory; however, creating a new static page similar to the default 'about' page is detailed below.</p>
<h1>Adding a static page</h1>
<p>To create a new page, first you must go to the 'layout.jade' file in the /views folder. Add the following code under the about 'li' tag which is in the 'ol' tag in the #nav div.</p>
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

<label>The new modified code</label>
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

//The code you added
app.get('/new-page-name', function(req, res) {
  res.render('new_page_name', { title: t, admin:req.session.admin});
});

///////////////////
</code></pre>

<p>You should now be able to go the the '/new-page-name' route and have a view similar to what is below</p>

<img src='https://raw.github.com/jawerty/Node2Blog/master/public/images/screenshot4.png'><img>

<h3 style='color:lime'>Congratulations you now have a working blog suitable to your basic blogger needs.</h3>

<h1>Heroku Setup</h1>
<p>Simply follow the directions on <a href=''>this</a> page to deploy the blog on heroku. However, in order to use MongoDB, you must enter the following command in the directory of your project</p>
<pre>
<code>
$ heroku addons:add mongohq:sandbox
</code>
</pre>
<p>This is the starter package for a server running on MongoDB with MongoHQ. This is essentially all you need to setup the basic functions to your new blog.</p>
<br>
<h1>Contact</h1>
<p><b>Contact the developer here</b><br>Email: jawerty210@gmail.com<br>Website: <a href='http://wrightdev.herokuapp.com'>http://wrightdev.herokuapp.com</a></p>

<h1>MIT LICENSE</h1>
The MIT License (MIT) Copyright (c) 2012 Jared Wright

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

