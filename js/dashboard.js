/*global window, console, jQuery, Backbone, Dashboard*/
(function ($, Backbone) {
	"use strict";
	var Dashboard, dashboard;
	Backbone.sync = function (method, model, options) {
		$.ajax({
			url: model.url,
			type: 'GET',
			dataType: "json",
			success: function (result) {
				options.success(result);
			},
			error: function (result) {
				options.success(result);
			}
		});
	};

	Dashboard = window.Dashboard = function () {
		var dashboard = this, Router;
		dashboard.dataUrl = 'data/';
		dashboard.imagesUrl = 'img/';
		dashboard.articleId = '';
		dashboard.leftPanelContentCtn = $("#dashboard #dCcontent div");
		/*function showCategories() {
			var categoriesView = new dashboard.Views.Categories({
				collection: dashboard.collection.categories
			});
			return categoriesView;
		}*/
		function start() {
			Backbone.history.start();
			//showCategories();
		}

		function init() {
			$(window).ready(function () {
				var categories	= new dashboard.Collections.Categories();
				dashboard.collection.categories	= categories;
				categories.fetch({
					success: function (response) {
						start();
					}
				});
			});
		}

		function getActiveCategoryId() {
			var i, urlFragments, selectedCategory, categoryId, category, urlLength;
			//get slug
			urlFragments = Backbone.history.getFragment().split('/');
			urlLength = urlFragments.length;

			if (urlLength > 2) {
				//this is a allstories / selected category pag
				dashboard.pageSlug = urlFragments[0];
				//dashboard.pageNumber = urlFragments[urlLength - 1];
				dashboard.articleId	= urlFragments[1];
			} else {
				dashboard.pageSlug = urlFragments[0];
				dashboard.articleId	= urlFragments[1];
			}

			if (dashboard.pageSlug === 'all-stories') {
				dashboard.pageSlug = dashboard.articleId;
			} else {
				dashboard.articleId	= urlFragments[1];
			}
			//get active category id base on the slug
			for (i = 0; i < dashboard.collection.categories.models.length; i += 1) {
				selectedCategory = dashboard.collection.categories.models[i];
				if (selectedCategory.attributes.slug === dashboard.pageSlug) {
					categoryId = selectedCategory.id;
				}
			}
			return categoryId;
		}

		function getCategoryAttributes() {
			var i, category, models, categoryAttributes, categoryId;
			models = dashboard.collection.categories.models;
			categoryId = getActiveCategoryId();
			for (i = 0; i < models.length; i += 1) {
				if (categoryId === models[i].id) {
					categoryAttributes = models[i].attributes;
				}
			}
			return categoryAttributes;
		}

		function activateCategoryLnk(className) {
			var categoryAttributes, selector;

		}

		function renderTemplate(template, target, data) {
			console.log(template);
			$(template).tmpl(data).appendTo($(target));
		}

		function storeViewHistory(name) {
			/**
			* Keep the last view in history
			*/
			if (dashboard.viewHistory.length > 1) {
				dashboard.viewHistory.splice(0, 1);
			}
			dashboard.viewHistory.push(name);
		}

		function getPagesInfos(target, data, colPerPage, itemPerCol) {
			var pagesInfos = {};
			pagesInfos.count = Math.ceil(data.length / itemPerCol / colPerPage);
			pagesInfos.defaultWidth = $(target).width();
			pagesInfos.width = pagesInfos.defaultWidth * pagesInfos.count;
			return pagesInfos;
		}

		function getPageId() {
			var urlFragments, pageId;
			urlFragments = Backbone.history.getFragment().split('/');
			pageId = parseInt(urlFragments[urlFragments.length - 1]);
			if (isNaN(pageId) || urlFragments.length < 3) {
				pageId = 1;
			}
			return pageId;
		}

		function showPagination(template, target, pageCount, pageSlug) {
			var i, link;
			for (i = 1; i <= pageCount; i += 1) {
				renderTemplate(template, target, {pageNumber: i, pageSlug: pageSlug});
			}
			$('#dashboard .pagination a[data-id="' + getPageId() + '"]').addClass('active');
		}

		function enablePagination(itemTemplate, data, itemPerCol, colPerPage, pageSlug, categorySlug) {
			//#dArticleContent', '#associateTpl' articleContent, 5, 3);
			var i, colId = 0, pageInfos = {}, pagePosition, colCount, ctn = $('#dItemsCtn'), target = $('#dItems'), pageCount, pageDefaultWidth, pageWidth, colTotalCount, colWidth;

			if (categorySlug !== undefined) {
				pageSlug = categorySlug + '/' + pageSlug;
			}

			pageCount = Math.ceil(data.length / colPerPage / itemPerCol);
			pageDefaultWidth = ctn.width();
			pageWidth = pageDefaultWidth * pageCount;
			colTotalCount = colPerPage * pageCount;
			colWidth = pageWidth / colTotalCount;
			// change the width of the container
			target.width(pageWidth);
			//insert the column
			for (i = 0; i < colTotalCount; i += 1) {
				renderTemplate('#columnTpl', target, {id: i, width: colWidth + 'px', height: '100%'});
			}
			//insert the item in the column
			for (i = 0; i < data.length; i += 1) {
				if (i % itemPerCol === 0 && i > 0) {
					colId = colId + 1;
				}
				renderTemplate(itemTemplate, target.find('.column[data-id="' + colId + '"]'), data[i]);
			}
			//show the pagination
			/*if (pageCount > 1) {
				showPagination('#paginationTpl', '#dashboard #dCcontent .pagination', pageCount, pageSlug);
			}
*/
			pagePosition = ((getPageId() - 1) * pageDefaultWidth) * -1;
			/*if (dashboard.pageNumber > 1) {
				pagePosition = pagePosition;
			}*/
			//move the container to the selected page
			target.css('margin-left', pagePosition).css('opacity', 0).delay(250).animate({'opacity' : 1}, 250, 'easeOutQuart');
		}

		function resetStage(className, x, y, random) {
			//activateCategoryLnk(className);
			$("#dashboard").removeClass().addClass(className);
			if (dashboard.viewHistory[0] === dashboard.viewHistory[1] && className !== 'category') {
				if (className !== undefined && className !== 'home') {
					//dashboard.leftPanelContentCtn.html('');
				}
			} else {
				//activate category btn
				//remove old content
				$("#grid .tile").stop();
				$("#grid").html('');
				if (x !== undefined) {
					if (random === undefined) {
						random = true;
					}
					if (className === 'category') {
						$('#grid').showGrid({
							grid: {
								'width': x,
								'height': y
							},
							//Items: dashboard.articles,
							random: random,
							tile: {
								big : {
									'max': 1,
									'width': 4,
									'height': 4
								},
								medium : {
									'max': 6,
									'width': 2,
									'height': 2
								},
								small : {
									'max': 10,
									'width': 1,
									'height': 1
								}
							}
						});
					} else if (className === 'home') {
						$('#grid').showGrid({
							grid: {
								'width': x,
								'height': y
							},
							Items: dashboard.articles,
							random: random
						});

					} else {
						$('#grid').showGrid({
							grid: {
								'width': x,
								'height': y
							},
							Items: dashboard.articles,
							random: random,
							activeId: dashboard.articleId
						});
					}
				}
			}
		}

		function getCollections() {
			var collections = {};
			collections.Categories = Backbone.Collection.extend({
				url: dashboard.dataUrl + 'categories.json'
			});
			return collections;
		}

		function buildArticleObject(articles) {
			var articleList = [], dateString, myDate, categoryAttributes, categoryName, categoryId, categorySlug, selector, categoryActiveId, itemUrl;
			categoryActiveId = getActiveCategoryId();
			categoryAttributes = getCategoryAttributes();

			$.each(articles, function (key, value) {
				selector = $(this);
				dateString = selector.find('time').attr('datetime');  // mm/dd/yyyy [IE, FF]
				myDate = new Date(dateString);

				categoryId = $(this).data('categoryid');
				categorySlug = $(this).data('categoryslug');
				if (categoryActiveId === undefined && categoryId !== undefined) {
					categoryAttributes = dashboard.collection.categories.models[categoryId - 1].attributes;
				}

				//Build article url
				if (categorySlug !== undefined) {
					itemUrl = categorySlug;
				} else {
					itemUrl = categoryAttributes.slug + '/' + selector.data('id');
				}
				articleList.push({
					id: selector.data('id'),
					title: selector.find('h1').text(),
					categoryID: categoryId,
					categoryName: categoryAttributes.title,
					categorySlug: categoryAttributes.slug,
					itemUrl: itemUrl,
					preview: selector.find('.preview').html(),
					date: myDate,
					dateFormated: selector.find('time').html(),
					imgSrc: selector.data('imgsrc'),
					imgWidth: selector.data('imgwidth'),
					imgHeight: selector.data('imgheight'),
					content: selector.find('.content').html()
				});
			});
			return articleList;
		}

		function getArticles(type) {
			var articles;
			/**
			* Get related article by category id
			*/
			articles = $('#data #' + type).find('article');
			return buildArticleObject(articles);
		}


		function loadRelatedContent(view, url) {
			var animSpeed = 100;
			url = dashboard.dataUrl + url;
			console.log(url);
			dashboard.leftPanelContentCtn.animate({opacity:0}, animSpeed, function() {
				dashboard.leftPanelContentCtn.html('');
				loadRelatedContentAsync(url, view, function(articles) {
					if (status !== 'error') {
						dashboard.articles = articles;
						view.render();
					}
				});
			});
		}

		var loadRelatedContentAsync = async_memoize(function loadRelatedContentAsync(url, view, callback) {
			var articles;
			$('#data #related').html('').load(url + '.html', function (response, status, xhr) {
				articles = getArticles('related');
				callback(articles);
			});
		});

		/**
		 *
		 */
		function async_memoize(fn, hasher) {
			var memo = {}, args, callback, key;
			hasher = hasher || function (x) {
				return x;
			};
			return function () {
				args = Array.prototype.slice.call(arguments);
				callback = args.pop();
				key = hasher.apply(null, args);
				if (key in memo) {
					callback.apply(null, memo[key]);
				} else {
					fn.apply(null, args.concat([function () {
						memo[key] = arguments;
						callback.apply(null, arguments);
					}]));
				}
			};
		}



		function getRouter() {
			var Router = Backbone.Router.extend({
				routes: {
					"": "index"
				},
				initialize: function () {
				},
				index: function () {
					dashboard.dashboardView = new dashboard.Views.Index();
				}
			});
			return Router;
		}

		function getViews() {
			var Views = {};
			Views.Index = Backbone.View.extend({
				initialize: function () {
					storeViewHistory('home');
					loadRelatedContent(this, 'home');
				},
				render: function () {
					resetStage('home', 8, 8);
				}
			});
			return Views;
		}
		Router = getRouter();
		dashboard.Views = getViews();
		dashboard.Collections = getCollections();
		dashboard.Router = new Router();
		dashboard.collection = {};
		dashboard.viewHistory = [];
		init();
	};
}(jQuery, Backbone));

$(function () {
	//Dashboard = new Dashboard();

	/**
	* Tool tips that appear on roll over of both header menu and tile
	* todo: need to put this in moza.js and make is more flexible so dashboard can re-use it easly
	*/
	/*tooltips = $("#toolTips");
	function showToolTips(element, title, category) {
		var position = element.position(),
		tileW = element.width(), tileH = element.height(), left, top, delay;
		tooltips.css({'width':"auto"});
		tooltips.find(".category").html(category);
		tooltips.find(".title").html(title);
		tooltips.show().css({'visibility':'visible','width':tooltips.width()+"px"});
		left = position.left + tileW/2 - tooltips.width()/2 - 7;
		if($.browser.webkit) left = Math.round(left);

		if (category === '') { 
			tooltips.find('.category').hide(0);
			top = '50px';
			delay = 500;
		} else {
			tooltips.find('.category').show(0);
			top = position.top + tileH  + 16;
		}

		tooltips.css('left', left).css('top', top).delay(delay).animate({
			opacity: 1
		}, 0);
	}

	$("#grid .tile.small a").live("mouseenter", function(event) {
		var tile = $(this).parent();
		showToolTips(tile, tile.find('.title').html(), tile.find('.category').html());
	});

	$("#grid .tile.small a").live("mouseout click", function(event) {
		tooltips.stop().css({'opacity':0, 'visibility': 'hidden'});
	});

	$("#toolTips, .tile.medium, .tile.big").hover(function(){
		tooltips.css('opacity', 0).css('visibility', 'hidden');
	});*/
});