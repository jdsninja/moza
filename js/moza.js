// We'll wrap all our code in a self executing function and then make it available in the global namespace. We'll start off like this:
;(function( window ) {

  var constants = {
    'TILE_SIZE': {
      big: {
        maxAmount: 5,
        col: 3,
        row: 2
      },
      medium: {
        maxAmount: 1,
        col: 2,
        row: 2
      },
      small: {
        maxAmount: 1,
        col: 1,
        row: 1
      }
    }
  };

  /**
  * Grid
  * @param {number} gCol - number of column
  * @param {number} gRow - number of row
  */
  function Grid() {
    this.container = null;
    this.gridWidth = null;
    this.gridHeight = null;
    this.col = null;
    this.row = null;
    this.gridWidthSpacer = null;
    this.gridHeightSpacer = null;
    this.tileWidth = null;
    this.tileHeight = null;
    this.coords = {
      all: [],
      free: [],
      taken: []
    };
  }

  /**
  * checkAvailabilityOfCoordsFromCoord
  * @param {object} coords
  */
  Grid.prototype.checkAvailabilityOfCoordsFromCoord = function(coords) {
    var y = 0;
    coords.forEach(coord => {
      var i = this.coords.free.length;
      while (i--) {
        if (this.coords.free[i].x === coord.x && this.coords.free[i].y === coord.y) {
          y++;
        }
      }
    });
    return coords.length === y;
  };

  /*
  * getOccupationFromCoord
  * This will get an array with all the point occuped by the tile
  * @param {number} totalCol
  * @param {number} totalRow
  * @param {object} coord
  */
  Grid.prototype.getOccupationFromCoord = function(totalCol, totalRow, coord) {
    //this.coords.free
    var i, j, coords = [];
    if (coord) {
      for (i = 0; i < totalCol; i = i + 1) {
        for (j = 0; j < totalRow; j = j + 1) {
          coords.push(this.getCoord(i + coord.x, j + coord.y));
        }
      }
      return coords;
    }
  };

  /*
  * checkPlacabilityOfTile
  * Iterate across each free coordinates to test if the tile can be placed
  * @param {number} totalCol
  * @param {number} totalRow
  * @param {number} callNumber
  */
  Grid.prototype.checkPlacabilityOfTile = function(totalCol, totalRow, callNumber) {
    console.log('checkPlacabilityOfTile');
    var targets = [];
    this.coords.free.forEach(freeCoord => {
      if ((freeCoord.x + totalCol) * this.tileWidth <= this.gridWidth && (freeCoord.y + totalRow) * this.tileHeight <= this.gridHeight) {
        var coords = this.getOccupationFromCoord(totalCol, totalRow, freeCoord);
        if (this.checkAvailabilityOfCoordsFromCoord(coords)) {
          targets.push(freeCoord);
        }
      }
    });
    return this.shuffle(targets);
  };

  /*
  * putFreeCoorToTakenCoor
  * @param {object} coord
  */
  Grid.prototype.putFreeCoorToTakenCoor = function(coord) {
    this.coords.free.forEach((myCoord, index) => {
      // todo: clean this up
      if (myCoord.x === coord.x && myCoord.y === coord.y) {
        this.coords.free.splice(index, 1);
      }
    });
    this.coords.taken.push(coord);
  };

  /*
  * shuffle
  * @param {object} o
  */
  Grid.prototype.shuffle = function(o) {
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  };

  /*
  * getCoord
  * @param {number} x
  * @param {number} y
  */
  Grid.prototype.getCoord = function(x, y) {
      return {x, y};
  };

  /*
  * setCoords
  */
  Grid.prototype.setCoords = function() {
    console.log('Grid setCoords');
    for (var i = 0; i < this.col; i++) {
      for (var j = 0; j < this.row; j++) {
        this.coords.all.push(this.getCoord(i, j));
      }
    }
    //  Clone the arrayY of all position and add it to free position array.
    this.coords.free = this.coords.all;
  };

  /*
  * Show coords
  * This will show black dots for each coordonate
  */
  Grid.prototype.showCoords = function() {
    console.log('Grid showCoords');
    this.coords.all.forEach(coord => {
      var left = this.gridWidth / this.col * coord.x;
      var top = this.gridHeight / this.row * coord.y;
      left = left * 100 / this.gridWidth;
      top = top * 100 / this.gridHeight;
      var node = document.createElement("DIV");
      node.style.cssText = `top: ${top-.5}%; left: ${left-.2}%`;
      this.container.appendChild(node);
    });
  };

  /*
  * buildGrid
  * @param {string} containerId
  * @param {number} gCol
  * @param {number} gRow
  */
  Grid.prototype.buildGrid = function(containerId, gCol, gRow) {
    console.log('Grid setup');
    this.containerId = containerId;
    this.container = document.getElementById(containerId);
    this.gridWidth = this.container.clientWidth;
    this.gridHeight = this.container.clientHeight;
    this.col = gCol;//todo: this should be more specific. it will help understand the code when we call this from a sub function.
    this.row = gRow;
    this.gridWidthSpacer = 2 * 100 / this.gridWidth;
    this.gridHeightSpacer = 2 * 100 / this.gridHeight;
    this.tileWidth = this.gridWidth / gCol; //todo: find a more specific name for this. its more a zone or area then tile
    this.tileHeight = this.gridHeight / gRow;

    // Set coordonate
    this.setCoords();
    this.showCoords();
  };

  /**
  * Tile
  */
  Tiles.prototype = new Grid(); // inherit from Grid
  Tiles.prototype.constructor = Tiles;
  function Tiles() {
    this.items = [];
    this.tileQueue = [];
    for (var i = 0, len = 40; i < len; i++) {
      this.items.push({
        id: i,
        title: 'title',
        img: ''
      });
    }
  }

  /*
  * showTile
  */
  Tiles.prototype.showTile = function() {
    console.log('Tiles: Show Tile');
    this.tileQueue.forEach((item, index) => {
      var node = document.createElement("DIV");
      node.style.cssText = `top: ${item.y}%; left: ${item.x}%; width: ${item.width}%; height: ${item.height}%`;
      node.className = 'tile';
      this.container.appendChild(node);
    });
  };

  /*
  * buildTiles
  */
  Tiles.prototype.buildTiles = function() {
    console.log('Tiles: Build Tiles');
    var size = null;
    this.items.forEach((item, index) => {
      if(this.coords.free.length > 0) {
        if (index < constants.TILE_SIZE['big'].maxAmount) {
          size = 'big';
        } else if (index < constants.TILE_SIZE['big'].maxAmount + constants.TILE_SIZE['medium'].maxAmount) {
          size = 'medium';
        } else {
          size = 'small';
        }
        item.size = size;
        item.queue = index;

        var myTile = new Tile(this, item);

        // Get all the coord neded for that tile
        // todo: This part should be inside the tile itself.
        var tileOccupationCoords = this.getOccupationFromCoord(myTile.col, myTile.row, myTile.target);

        // Remove the needed coords in the free array and put them in the taken array
        if(tileOccupationCoords){
          tileOccupationCoords.forEach(coords => {
            this.putFreeCoorToTakenCoor(coords);
          });
          this.tileQueue.push(myTile.getTileInfos());
        }
      }
    });
  };

  /**
  * Tile
  * @param {object} grid
  * @param {object} params
  */
  function Tile(grid, params) {
    this.grid = grid;
    this.size = params.size;
    this.col = constants.TILE_SIZE[params.size].col;
    this.row = constants.TILE_SIZE[params.size].row;
    this.callNumber = params.queue;
    this.coord = null;
    this.targets = this.grid.checkPlacabilityOfTile(this.col, this.row, this.callNumber);
    this.target = this.targets ? this.targets[0] : null;
  }

  /*
  * getTileInfos
  */
  Tile.prototype.getTileInfos = function() {
    console.log('Tile: Get Tile Infos');
    return {
      size: this.size,
      x: this.target.x * this.grid.tileWidth * 100 / this.grid.gridWidth,
      y: this.target.y * this.grid.tileHeight * 100 / this.grid.gridHeight,
      width: (this.col * 100 / this.grid.col) - this.grid.gridWidthSpacer,
      height: (this.row * 100 / this.grid.row) - this.grid.gridHeightSpacer,
      id: this.callNumber
    };
  };

  /*
  * resizeTileIfDosentFit
  */
  // todo: use it. its currently not used at all...
  Tile.prototype.resizeTileIfDosentFit = function() {
    console.log('Tile: Set Target');
    if (!this.targets || this.targets.length === 0) {
      for(size of constants.TILE_SIZE){
        if (constants.TILE_SIZE[size].col < this.col) {
          this.col = constants.TILE_SIZE[size].col;
          this.row = constants.TILE_SIZE[size].row;
          this.size = size;
          this.targets = this.grid.checkPlacabilityOfTile(this.col, this.row, this.callNumber);
        }
      }
    }
  };

  /*
  * Build
  */
  Tile.prototype.build = function() {
    console.log('Tile: Build');
    this.resizeTileIfDosentFit();
  };

  /**
  * Moza
  */
  Moza.prototype = new Tiles(); // inherit from Tiles that inherit from Grid
  Moza.prototype.constructor = Moza;
  function Moza() {
    this.container = null;
  }

  /*
  * Build
  * @param {string} containerId
  * @param {number} col
  * @param {number} row
  */
  Moza.prototype.build = function(containerId, col, row) {
    // Setup the grid
    this.buildGrid(containerId, col, row);
    // Build the tiles. At this point we will have the size and position of all the tiles.
    this.buildTiles();
    // This will parse the
    this.showTile();
  };

  var moza = new Moza();
  moza.build("moza", 6, 6);
})( window );
