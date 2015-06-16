# jQuery Moza Plugin
A better news mosaïc.

## [bower](http://bower.io) Dependencies
- [jQuery](http://code.jquery.com/jquery-1.8.2.min.js)
- [jQuery Template](http://ajax.aspnetcdn.com/ajax/jquery.templates/beta1/jquery.tmpl.min.js)
- [Underscore](http://underscorejs.org/underscore.js)


## Use
Put this jQuery Template in your header

	<script id="tileTpl" type="text/x-jquery-tmpl">
		<div class="tile ${size}" style="width:${width}%;height:${height}%;top:${y}%;left:${x}%;" data-id="${id}">
			<a href="#${itemUrl}">
				<img src="${imgSrc}" border="0" style="top:-${imageTop}%;left:-${imageLeft}%;${imgWidth}${imgHeight}">
			<span class="infos">
				<span class="wrapper">
					<span class="category">${categoryName}</span>
					<span class="title">${title}</span>
				</span>
			</span>
				<span class="selected" style="width:96%;height:93%;position:absolute;top:0;left:0;border:2px solid black;display:none;border-bottom:3px solid black"></span>
			</a>
		</div>
	</script>

## Backlog

- Convert jQuery plugin to vanilla javascript
- Remove the dependencies with jQuery

## License
This plugin is licensed under the MIT License (LICENSE.txt).

Copyright (c) 2011 [Jerome D.Soucy](http://jeromeds.com)
