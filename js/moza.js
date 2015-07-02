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
  };

  /**
  * Grid
  * @param {number} gCol - number of column
  * @param {number} gRow - number of row
  */
  function Grid(gCol, gRow) {
    this.column = gCol;
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

	function Coord(x, y) {
		this.x = x;
		this.y = y;
	}

	Grid.prototype.build = function() {
		/*
		* Build a multi dimensional array for all the position available
		*/
		var i, j;
		for (i = 0; i < this.col; i += 1) {
			for (j = 0; j < this.row; j += 1) {
				this.coords.all.push(new Coord(i, j));
			}
		}

		// Clone the arrayY of all position and add it to free position array.
		this.coords.free = _.clone(this.coords.all);
		return this.coords;
	};

  /**
  * Tile
  */
  function Tile() {
    this.sizeBig = {
      maxAmount: 1,
      col: 3,
      row: 3
    };
    this.sizeMedium = {
      maxAmount: 10,
      col: 2,
      row: 2
    };
    this.sizeSmall = {
      maxAmount: 10,
      col: 1,
      row: 1
    };

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

  Tile.prototype.placeTiles = function() {
  };

  Tile.prototype.getTileInfos = function() {
  };

  Tile.prototype.showTile = function() {
  };

  Tile.prototype.getImageSize = function() {
  };

  Tile.prototype.showImage = function() {
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

	Moza.prototype.build = function(containerID) {
		var container = document.getElementById(containerID);
		//todo: check if the container exist before doing anything else.
		if(container){

			var containerWidth = container.offsetWidth;
			var containerHeight = container.offsetHeight;

			var myStage = new Stage(containerWidth, containerHeight);
			myStage.build();

			var myGrid = new Grid(this.totalCol, this.totalRow);
			myGrid.build();

			var myTile = new Tile();
		}else{
			console.log('container not found');
		}

	};

	var moza = new Moza();
	moza.build("moza");

})( window );
