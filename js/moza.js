// We'll wrap all our code in a self executing function and then make it available in the global namespace. We'll start off like this:
;(function( window ) {

  'use strict';

  /**
  * Stage
  * @param {number} sWidth - width in pixel
  * @param {number} sHeight - height in pixel
  */
 function Stage(sWidth, sHeight) {
    this.width = sWidth;
    this.height = sHeight;
    this.widthSpacer = 2 * 100 / sWidth;
    this.heightSpacer = 2 * 100 / sHeight;
  }

  Stage.prototype.build = function(){
    console.log('build', this.width, this.height);
  };

  /**
  * Grid
  * @param {number} gCol - number of column
  * @param {number} gRow - number of row
  */
  function Grid(gCol, gRow) {
    this.col = gCol;
    this.row = gRow;
		this.coords = {
			all: [],
			free: [],
			taken: []
		};
  }

  Grid.prototype.checkPlacabilityOfTile = function() {

  };

  Grid.prototype.checkAvailabilityOfCoordsFromCoord = function() {

  };

  Grid.prototype.putFreeCoorToTakenCoor = function() {

  };

  Grid.prototype.shuffle = function() {

  };

  Grid.prototype.trimString = function() {

  };

  Grid.prototype.async_memoize = function() {

  };

  Grid.prototype.getCoord = function(x, y) {
      return {x: x, y: y};
  };

  Grid.prototype.setCoords = function() {
    console.log('Set coords');
      var i, j;
      for (i = 0; i < this.col; i += 1) {
        for (j = 0; j < this.row; j += 1) {
          this.coords.all.push(this.getCoord(i, j));
        }
      }
      // Clone the arrayY of all position and add it to free position array.
      this.coords.free = _.clone(this.coords.all);
  };

  Grid.prototype.showCoords = function(container, containerWidth, containerHeight) {
    // this.col this.row
    var myCoords = this.coords.all;
    for(var key in myCoords){
      var dotCoord = myCoords[key];
      console.log('===',dotCoord);

        var left = containerWidth / this.col * dotCoord.x;
        var top = containerHeight / this.row * dotCoord.y;
      if(!dotCoord.x || !dotCoord.y || isNaN(left) || isNaN(top)){
        console.log('here');
      }else{
          var div = document.createElement('div');

          var container2 = document.getElementById("moza");
          var node = document.createElement("DIV");

          node.style.cssText = 'top:' + (top - 1) + 'px; left:' + (left -1) + 'px';

          container2.appendChild(node);


          console.log(left, top);
      }

    }
  };

	Grid.prototype.build = function() {
    console.log('Grid build');
    // Set coordonate
	   this.setCoords();
     console.log(this.coords);
     this.showCoords();
	};

  /**
  * Tile
  */
  function Tiles(grid) {
    this.coords = grid.coords;
    this.size = {
      big: {
        maxAmount: 1,
        col: 3,
        row: 3
      },
      medium: {
        maxAmount: 10,
        col: 2,
        row: 2
      },
      small: {
        maxAmount: 10,
        col: 1,
        row: 1
      }
    }

    this.items = {};
    for (var i = 0, len = 40; i < len; i++) {
      this.items.push({
        id: i,
        title: 'title',
        img: ''
      });
    }

    /*
    var i, tile, tileSize;
    tile = this;
    tile.size = size;
    tile.width = settings.tile[size].width;
    tile.height = settings.tile[size].height;
    tile.coord = null;
    tile.targets = [];
    tile.target = [];
    */
  }

  Tiles.prototype.placeTiles = function() {
    console.log('placeTiles', this.coords);
    var i, j, tile, size = 'medium', tileOccupationCoords, tileQueue = [];
    //$('#dImg').html('');
    //settings.Items = articleList;
    for (i = 0; i < this.items.length; i += 1) {
      if (!_.isEmpty(this.coords.free)) {
        if (i < this.size.big.maxAmount) {
          size = 'big';
        } else if (i < this.size.big.maxAmount + this.size.medium.maxAmount) {
          size = 'medium';
        } else {
          size = 'small';
        }
        myTile = new Tile(size, i);
        // get all the coord neded for that tile
        tileOccupationCoords = myTile.getOccupationFromCoord(tile.target);
        // remove the needed coords in the free array and put them in the taken array
        for (j = 0; j < tileOccupationCoords.length; j += 1) {
          grid.putFreeCoorToTakenCoor(tileOccupationCoords[j]);
        }
        //add info to queue
        tileQueue[i] = grid.getTileInfos(myTile, this.items[i]);
      }
    }
    grid.showTile(tileQueue);
    grid.showImage(tileQueue);
  };

  Tiles.prototype.getTileInfos = function() {
  };

  Tiles.prototype.showTile = function() {
  };

  Tiles.prototype.getImageSize = function() {
  };

  Tiles.prototype.showImage = function() {
  };

  /**
  * Tile
  */
  function Tile(tiles, size) {
    this.size = size;
    this.width = tiles.tile[size].col;
    this.height = tiles.tile[size].row;
    this.coord = null;
    this.targets = [];
    this.target = [];
  }

  Tile.prototype.getOccupationFromCoord = function(coord) {
    var i, j, coords = [];
    if (coord !== undef) {
      for (i = 0; i < this.width; i = i + 1) {
        for (j = 0; j < this.height; j = j + 1) {
          coords.push(new Coord(i + coord.x, j + coord.y));
        }
      }
      return coords;
    }
  };

  Tile.prototype.build = function() {
    this.targets = grid.checkPlacabilityOfTile(this, callNumber);
    if (_.isEmpty(this.targets)) {
      for (tileSize in settings.tile) {
        if (settings.tile[tileSize].width < this.width) {
          tile.width = settings.tile[tileSize].width;
          tile.height = settings.tile[tileSize].height;
          tile.size = tileSize;
          tile.targets = grid.checkPlacabilityOfTile(this, callNumber);
        }
      }
    }
    tile.target = this.targets[0];
  };

	/**
	* Moza
	*/
	function Moza() {
		this.stageWidth = 500;
		this.stageHeight = 400;
		this.totalCol = 4;
		this.totalRow = 4;
	}

	Moza.prototype.build = function(containerId) {
    // Set default value
    var container = document.getElementById(containerId);
    var containerWidth = container.clientWidth;
    var containerHeight = container.clientHeight;
    var col = 5;
    var row = 4;

    // Stage
		var myStage = new Stage(containerWidth, containerHeight);
		myStage.build();

    // Grid
		var myGrid = new Grid(col, row);
		myGrid.build();
		myGrid.showCoords(container, containerWidth, containerHeight);

    // Tile
		//var myTiles = new Tiles(myGrid);
  //  myTiles.placeTiles();
	};

	var moza = new Moza();
	moza.build("moza");

})( window );
