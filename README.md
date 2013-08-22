<h1>Node2Blog</h1>
<p>Node2Blog is a simple and easy to use blog template for the casual blogger.
For those who wish to setup an operable blog in minutes, this is the project for you.
The blog is built with Node.js, Express.js, and Mongodb (with the mongoose driver).
The instructions for quickly building a blog with the Node2Blog template is shown below.</p>

<h1>Features</h1>
<ul>
	<li>
		Integration of the lightweight rich text editor, NicEdit.
	</li>
	<li>
		Utilizes the Express framework.
	</li>
	<li>
		Uses MongoDB on the backend.
	</li>
	<li>
		An Admin interface, initiated by a password confirmation.
	</li> 
	<li>
		Simplistic design: Allowing for the user to easily build on top of the layout.
	</li>
	<li>
		Each post has a Facebook 'like' button and a Twitter 'tweet' button.
	</li>
	<li>
		Commenting system within each post.
	</li>
	<li>
		Easy Heroku integration.
	</li>

	<li>
		Create, edit, and delete your posts.
	</li>

	<li>
  	RSS
  </li>

	<li>
			And much more...
	</li>	
</ul>

<h1>Prerequisites</h1>
<ul>
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
</ul>

<h1>Tutorial: Getting Started</h1>
<p><b>*Note: Forking Node2Blog is the best way to get the repository.</b></p>
<p>In your terminal, 'cd' to the directory where you want to develop the blog and do the following commands</p>
<pre>$ git clone git@github.com:jawerty/Node2Blog.git blog-folder-name<br>$ cd blog-folder-name<br>$ npm install .</pre>
<p>In order to initiate the blog server on your local machine, do the following command (You need node.js to run the following command)</p>
<pre>$ node blog</pre>
<p>The blog should be running on your localhost at the 3000 port; go to <a href='http://localhost:3000'>http://localhost:3000</a> to view it. And it should look similar to the screenshot below. </p>

<img src='https://raw.github.com/kenshiro-o/Node2Blog/master/docs/node2blog_main_screen.png'></img>

<p>If you would like to make a post, go to the the url http://localhost:3000/admin in order to log in and use the admin settings.
<b>The password is <i>'Your mongoDB password'</i> by default</b>. To change the password, go to the file /config/blogConfig.json
and change the 'password' value</p>

<h4><b>*Note: You can also change the subtitle and title of the blog in the /config/blogConfig.json file (i.e st = 'Exploring the path of the Hackuto-Shinken').</b></h4>

<img src='https://raw.github.com/kenshiro-o/Node2Blog/master/docs/node2blog_admin_page_login_screen.png'></img>

<p>When successfully logged in, your navigation bar should have three new options appended to it...</p>
<ol>
	<li>Create Post</li>
	<li>Edit/Delete Post</li>
	<li>Log out</li>
</ol>

<img src='https://raw.github.com/kenshiro-o/Node2Blog/master/docs/node2blog_admin_page.png'></img>

<p>Creating, editing and deleting posts should be self-explanatory.
However, creating a new static page similar to the default 'about' page is detailed below.</p>
<h1>Adding a static page</h1>
<p>To create a new page, first you must go to the 'default-layout.jade' file in the /views folder.
Add the following code under the "About" 'a' tag which is in the div with the id 'widget-pages'</p>

<pre>
<code>
        #widgets
          #widget-pages
            h3.widget-title Pages
            a.widget-section-link(href="/") Home
            a.widget-section-link(href="/about") About
            a.widget-section-link(href="/newPage") New Page
</code>

</pre>
<p>Now create a new view with whatever name you want (i.e. newPage.jade) in the /views folder.
Add the following code to your new view</p>
<pre>
<code>
extends default-layout


block blog-content
  .container
    h1 This is the new page
    br
    p Random information
</code>
</pre>
<p>Now modify the get functions in the 'blog.js' file.</p>

<label>The new modified code</label>
<pre><code>
app.get('/', home.index);
app.get('/post/:id/:title', post.get);
app.get('/about', function (req, res) {
    res.render('about', {title: blogConfig.title + " - About", admin: req.session.admin});

});


// The code you added
app.get('/newPage', function(req, res){
    res.render("newPage", {title: "New Page", admin: req.session.admin});
});
</code></pre>

<p>You should now be able to go the the '/newPage' route and have a view similar to what is below</p>

<img src='https://raw.github.com/kenshiro-o/Node2Blog/master/docs/node2blog_new_page.png'><img>

<h1>Adding a side widget</h1>
<p>In order to add a side widget, you must go to the file 'default-layout.jade' and insert your widget inside
the div with id "widgets" </p>
<pre>
<code>
          #widgets
</pre>
</code>



<p>For instance the "Latest Posts widgets looks like this</p>
<pre>
<code>
          #widget-posts
            h3.widget-title Latest Posts
            for post in posts
              a.widget-section-link(href="/post/#{post._id}/#{post.friendly_link_title}") #{post.title}
</code>
</pre>

<p>Now you can input any sort of information you'd like in your new widget box. Remember that you can add any style
you want to your widgets by editing the <strong>style.css</strong> file

<br>
<h3>Congratulations! You now have a working blog suitable to your basic blogger needs.</h3>
<br>
<br>

<h1>Optional: Heroku Setup</h1>
<h4><b>*Note: You must have a heroku account along with the <a href='https://toolbelt.heroku.com/'>Heroku Toolbelt</a> to follow this part of the tutorial</b></h4>
<p>Simply follow the directions on <a href='https://devcenter.heroku.com/articles/nodejs'>this</a> page to deploy the blog with heroku. However, in order to use MongoDB, you must enter the following command in the directory of your project</p>
<pre>
<code>
$ heroku addons:add mongohq:sandbox
</code>
</pre>
<p>This addon is a <b>free</b> starter package for running a server with a MongoDB backend by MongoHQ. This is essentially all you need to setup the basic functions to your new blog.</p>

<h1>Contributors</h1>
<ul>
<li><a href="https://github.com/jawerty">jawerty</a>: Creator of Node2Blog</li>
<li><a href="https://github.com/patgannon">patgannon</a>: RSS support</li>
<li><a href="https://github.com/kenshiro-o">kenshiro</a>: Rewrite and style improvement</li>
</ul>

<h1>Contact</h1>
<p><b>Contact the developers here</b>
<br>
Email: jawerty210@gmail.com<br>Website: <a href='http://jawerty.github.io'>http://jawerty.github.io</a>
<br>
Email: kenshiro@kenshiro.me<br>Website: <a href='http://kenshiro.me'>http://kenshiro.me</a>

</p>

<h1>MIT LICENSE</h1>
The MIT License (MIT) Copyright (c) 2012 Jared Wright

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

