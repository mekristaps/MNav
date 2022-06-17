
<a  href="https://www.instagram.com/mekristaps/"  target="_blank">
<img  src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/600px-Instagram_icon.png"  width="30"  height="30"  title="my works"  alt="instagram-link"/>
</a>
<h1  align="center">MNav</h1>
<p>MNav hides navigation items that doesn't fit in navigation container under more dropdown.</p>

<p  align="center">
<img  src="https://github.com/mekristaps/MNav/blob/master/preview.gif?raw=true"  width="450"  title="MNav preview gif">
</p>
<b><a href="https://mekristaps.github.io/MNav/"  target="_blank">Demo</a></b>

<h2  align="center">How to use?</h2>

<b>*This project has JQuery as dependency.</b>
<p>Load css & js files from <code>/dist/assets</code> into your project</p>

```html
<!DOCTYPE  html>
<head>
	<link  rel="stylesheet"  href="mnav.css">
</head>
<body>

	<script  async  src="mnav.js"></script>
</body>
```
<p>Set basic navigation html structure</p>

```html
<div  class="navigation"  data-mnav>
	<ul  class="navigation-list"  data-mnav-list>
		<li  class="navigation-item"  data-mnav-item>
			<a  href="#">Navigation Item</a>
		</li>
		<li  class="navigation-more"  data-mnav-dropdown>
			<a  href="#">More</a>
			<div  class="navigation-more-wrapper">
				<div  class="navigation-more-inner">
					<ul  class="navigation-more-list"  data-mnav-dropdown-list>
					</ul>
				</div>
			</div>
		</li>
	</ul>
</div>
```

<p>Make sure to install node modules using <code>npm i</code> and compile code using <code>npm run prod</code></p>
<h3>Data attribute definitions</h3>
<p>These data attributes must be present in html structure for this to work.</p>

```js
// HTML data attributes
data-mnav // Main navigation container. Must have - display: flex;
data-mnav-list // Main navigation ul element. Must have - display: flex; flex: 1  0  auto;
data-mnav-item // Main navigation item
data-mnav-dropdown // More dropdown element container
data-mnav-dropdown-list // More dropdown list item container
```
<h3>Style</h3>
<p>It is not necessary to use mnav.css file. All the styles can be adjusted to ones liking.</p>
<p>There are additional css classes added to items:</p>

```js
data-mnav-item // if item move back from dropdown list, it will have "navigation-item" class added to them
data-mnav-dropdown-list // items added to list will have "navigation-childrens-item" class added to them.
```
<br />
<br />
<br />
<p align="center">There is no IE support</p>