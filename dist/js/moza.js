(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var constants = {
  data: {
    url: '../data/data.json'
  },
  // The first tile size have the priority.
  // That mean will parse the tile size from top to bottom.
  // Its better to add the biggest tile at the top.
  'TILE_SIZE': {
    XXL: {
      maxAmount: 1,
      col: 5,
      row: 5
    },
    XL: {
      maxAmount: 2,
      col: 4,
      row: 4
    },
    L: {
      maxAmount: 10,
      col: 3,
      row: 2
    },
    M: {
      maxAmount: 10,
      col: 2,
      row: 2
    },
    S: {
      maxAmount: 10,
      col: 2,
      row: 1
    },
    XS: {
      maxAmount: 50,
      col: 1,
      row: 1
    }
  }
};

/**
* Grid
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
* Check availability of coords from coord
* @param {object} coords
*/
Grid.prototype.checkAvailabilityOfCoordsFromCoord = function (coords) {
  var _this = this;

  var y = 0;
  coords.forEach(function (coord) {
    var i = _this.coords.free.length;
    while (i--) {
      if (_this.coords.free[i].x === coord.x && _this.coords.free[i].y === coord.y) {
        y++;
      }
    }
  });
  return coords.length === y;
};

/*
* Get occupation from coord
* This will get an array with all the point occuped by the tile
* @param {number} totalCol
* @param {number} totalRow
* @param {object} coord
*/
Grid.prototype.getOccupationFromCoord = function (params) {
  var totalCol = params.totalCol;
  var totalRow = params.totalRow;
  var coord = params.coord;

  var coords = [];
  if (coord) {
    for (var i = 0; i < totalCol; i++) {
      for (var j = 0; j < totalRow; j++) {
        coords.push(this.getCoord(i + coord.x, j + coord.y));
      }
    }
    return coords;
  }
  // todo: should return something anyway
};

/*
* Get new tileArea
* Iterate across each free coordinates to test if the tile can be placed
* @param {string} tileSize
* @returns {array|undefined}
*/
Grid.prototype.getNewTileArea = function (tileSize) {
  var _this2 = this;

  var targets = [],
      totalCol = constants.TILE_SIZE[tileSize].col,
      totalRow = constants.TILE_SIZE[tileSize].row;
  this.coords.free.forEach(function (freeCoord) {
    // make sure the tile ending end don't go futher then the grid edge
    var tileRightEdge = (freeCoord.x + totalCol) * _this2.tileWidth,
        tileBottomEdge = (freeCoord.y + totalRow) * _this2.tileHeight;
    if (tileRightEdge <= _this2.gridWidth && tileBottomEdge <= _this2.gridHeight) {
      // We jsut fond a good spot for this tile.
      // It's time to check if the area is clear.
      var coords = _this2.getOccupationFromCoord({ totalCol: totalCol, totalRow: totalRow, coord: freeCoord });
      if (_this2.checkAvailabilityOfCoordsFromCoord(coords)) {
        targets.push(freeCoord);
      }
    }
  });
  // If the targets is empty that mean 2 things:
  // - the tile was to big
  // - the tile had the right size but no area was available
  return targets.length > 0 ? this.shuffle(targets) : undefined;
};

/*
* Put free coor to taken coor
* @param {object} coord
*/
Grid.prototype.putFreeCoorToTakenCoor = function (coord) {
  var _this3 = this;

  //todo: Remove the if statement and add a filter before forEach
  this.coords.free.forEach(function (myCoord, index) {
    // todo: clean this up
    if (myCoord.x === coord.x && myCoord.y === coord.y) {
      _this3.coords.free.splice(index, 1);
    }
  });
  this.coords.taken.push(coord);
};

/*
* Shuffle
* @param {object} o
*/
Grid.prototype.shuffle = function (o) {
  for (var j = undefined, x = undefined, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x) {}
  return o;
};

/*
* Get coord
* @param {number} x
* @param {number} y
*/
Grid.prototype.getCoord = function (x, y) {
  return { x: x, y: y };
};

/*
* Set coords
*/
Grid.prototype.setCoords = function () {
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
Grid.prototype.showCoords = function () {
  var _this4 = this;

  this.coords.all.forEach(function (coord) {
    var left = _this4.gridWidth / _this4.col * coord.x;
    var top = _this4.gridHeight / _this4.row * coord.y;
    left = left * 100 / _this4.gridWidth;
    top = top * 100 / _this4.gridHeight;
    var node = document.createElement("DIV");
    node.style.cssText = 'top: ' + (top - 0.5) + '%; left: ' + (left - 0.2) + '%';
    _this4.container.appendChild(node);
  });
};

/*
* Build grid
* @param {string} el
* @param {number} gCol
* @param {number} gRow
*/
Grid.prototype.buildGrid = function (params) {
  var el = params.el;
  var col = params.col;
  var row = params.row;

  this.el = el;
  this.container = document.getElementById(el);
  this.gridWidth = this.container.clientWidth;
  this.gridHeight = this.container.clientHeight;
  this.col = col; //todo: this should be more specific. it will help understand the code when we call this from a sub function.
  this.row = row;
  this.gridWidthSpacer = 2 * 100 / this.gridWidth;
  this.gridHeightSpacer = 2 * 100 / this.gridHeight;
  this.tileWidth = this.gridWidth / col; //todo: find a more specific name for this. its more a zone or area then tile
  this.tileHeight = this.gridHeight / row;

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
  this.tiles = [];
  this.tileQueue = [];
  for (var i = 0, len = 40; i < len; i++) {
    this.tiles.push({
      id: i,
      title: 'title',
      img: ''
    });
  }
}

/*
* Show tile
*/
Tiles.prototype.showTile = function () {
  var _this5 = this;

  this.tileQueue.forEach(function (item, index) {
    var node = document.createElement("DIV");
    node.style.cssText = 'top: ' + item.y + '%; left: ' + item.x + '%; width: ' + item.width + '%; height: ' + item.height + '%';
    node.className = 'tile';
    _this5.container.appendChild(node);
  });
};

/*
* Get next tile size
* This will get the next tile size to use.
* @param {string} tileIndex
*/
Tiles.prototype.getNextTileSize = function (tileIndex) {
  var currentTileCount = 0;
  var tileSize = null;
  for (var size in constants.TILE_SIZE) {
    currentTileCount = currentTileCount + constants.TILE_SIZE[size].maxAmount;
    if (tileIndex < currentTileCount) {
      return size;
    }
  }
  return tileSize;
};

/*
* Reduce tile size
* This is checking all the tile size and look for the next area smaller then the current one.
* To find the area we just ened to multiply the col and row (constants.TILE_SIZE[size].col * constants.TILE_SIZE[size].row)
* @param {string} currentTileSize - big, medium, small, ect.
*/
Tiles.prototype.reduceTileSize = function (currentTileSize) {
  var currentTile = constants.TILE_SIZE[currentTileSize];
  var currentTileArea = currentTile.col * currentTile.row;
  var nextSize = null; // This will return null if no smaller tile are found.
  for (var size in constants.TILE_SIZE) {
    var nextTileArea = constants.TILE_SIZE[size].col * constants.TILE_SIZE[size].row;
    if (nextTileArea < currentTileArea) {
      return size;
    }
  }
  return nextSize;
};

/*
* Get max tile count
*/
Tiles.prototype.getMaxTileCount = function () {
  var maxTileCount = 0;
  for (var size in constants.TILE_SIZE) {
    maxTileCount = maxTileCount + constants.TILE_SIZE[size].maxAmount;
  }
  return maxTileCount;
};

/*
* Build tiles
*/
Tiles.prototype.buildTiles = function () {
  var _this6 = this;

  var size = null;
  var tileCount = 0;
  var maxTile = this.getMaxTileCount();

  this.tiles.forEach(function (tile, index) {
    if (_this6.coords.free.length > 0 && tileCount < maxTile) {
      (function () {

        tile.size = _this6.getNextTileSize(tileCount);
        var availableAreaCoords = null;

        // If no space were found that mean the tile is to big.
        // Need to size it down a bit
        var findNextAvailableAreaCoords = (function () {
          tile.size = this.reduceTileSize(tile.size);
          if (!tile.size) {
            return undefined;
          }
          var availableAreaCoords = this.getNewTileArea(tile.size);
          if (!availableAreaCoords) {
            return findNextAvailableAreaCoords();
          }
          return availableAreaCoords;
        }).bind(_this6);

        // Check if we found a place for the tile
        availableAreaCoords = findNextAvailableAreaCoords();
        // Just making sure we have space for this tile.
        // We wont need this condition after I make a recursion for the downsizing tile function
        if (availableAreaCoords) {
          tileCount++;
          tile.key = index;
          tile.target = availableAreaCoords[0]; //Take the first one in the array. They are already shoveled
          tile.col = constants.TILE_SIZE[tile.size].col;
          tile.row = constants.TILE_SIZE[tile.size].row;
          var myTile = new Tile(_this6, tile);

          // Update free & taken coords
          var tileOccupationCoords = _this6.getOccupationFromCoord({ totalCol: tile.col, totalRow: tile.row, coord: tile.target });
          tileOccupationCoords.forEach(function (coords) {
            _this6.putFreeCoorToTakenCoor(coords);
          });
          _this6.tileQueue.push(myTile.getTileInfos());
        } else {
          // no tile added to the queue because we did not find the space for it
        }
      })();
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
  this.params = params;
}

/*
* Get tile infos
*/
Tile.prototype.getTileInfos = function () {
  return {
    size: this.params.size,
    x: this.params.target.x * this.grid.tileWidth * 100 / this.grid.gridWidth,
    y: this.params.target.y * this.grid.tileHeight * 100 / this.grid.gridHeight,
    width: this.params.col * 100 / this.grid.col - this.grid.gridWidthSpacer,
    height: this.params.row * 100 / this.grid.row - this.grid.gridHeightSpacer,
    id: this.params.key
  };
};

/*
* Get data infos
*/
Tile.prototype.getTileInfos = function () {
  return {
    size: this.params.size,
    x: this.params.target.x * this.grid.tileWidth * 100 / this.grid.gridWidth,
    y: this.params.target.y * this.grid.tileHeight * 100 / this.grid.gridHeight,
    width: this.params.col * 100 / this.grid.col - this.grid.gridWidthSpacer,
    height: this.params.row * 100 / this.grid.row - this.grid.gridHeightSpacer,
    id: this.params.key
  };
};

/**
* Moza
*/

var Moza = (function (_Tiles) {
  _inherits(Moza, _Tiles);

  function Moza() {
    _classCallCheck(this, Moza);

    _get(Object.getPrototypeOf(Moza.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Moza, [{
    key: 'build',

    /*
    * Build
    * @param {string} el
    * @param {number} col
    * @param {number} row
    */
    value: function build(params) {
      this.buildGrid(params);
      // Build the tiles. At this point we will have the size and position of all the tiles.
      this.buildTiles();
      // This will parse the
      this.showTile();
    }
  }]);

  return Moza;
})(Tiles);

global.Moza = Moza;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvamR1Z3VheS9TaXRlcy9Nb3phL3NyYy9qcy9tb3phLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQ0FBLFlBQVksQ0FBQzs7Ozs7Ozs7OztBQUViLElBQUksU0FBUyxHQUFHO0FBQ2QsTUFBSSxFQUFFO0FBQ0osT0FBRyxFQUFFLG1CQUFtQjtHQUN6Qjs7OztBQUlELGFBQVcsRUFBRTtBQUNYLE9BQUcsRUFBRTtBQUNILGVBQVMsRUFBRSxDQUFDO0FBQ1osU0FBRyxFQUFFLENBQUM7QUFDTixTQUFHLEVBQUUsQ0FBQztLQUNQO0FBQ0QsTUFBRSxFQUFFO0FBQ0YsZUFBUyxFQUFFLENBQUM7QUFDWixTQUFHLEVBQUUsQ0FBQztBQUNOLFNBQUcsRUFBRSxDQUFDO0tBQ1A7QUFDRCxLQUFDLEVBQUU7QUFDRCxlQUFTLEVBQUUsRUFBRTtBQUNiLFNBQUcsRUFBRSxDQUFDO0FBQ04sU0FBRyxFQUFFLENBQUM7S0FDUDtBQUNELEtBQUMsRUFBRTtBQUNELGVBQVMsRUFBRSxFQUFFO0FBQ2IsU0FBRyxFQUFFLENBQUM7QUFDTixTQUFHLEVBQUUsQ0FBQztLQUNQO0FBQ0QsS0FBQyxFQUFFO0FBQ0QsZUFBUyxFQUFFLEVBQUU7QUFDYixTQUFHLEVBQUUsQ0FBQztBQUNOLFNBQUcsRUFBRSxDQUFDO0tBQ1A7QUFDRCxNQUFFLEVBQUU7QUFDRixlQUFTLEVBQUUsRUFBRTtBQUNiLFNBQUcsRUFBRSxDQUFDO0FBQ04sU0FBRyxFQUFFLENBQUM7S0FDUDtHQUNGO0NBQ0YsQ0FBQzs7Ozs7QUFLRixTQUFTLElBQUksR0FBRztBQUNkLE1BQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0FBQ3RCLE1BQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0FBQ3RCLE1BQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0FBQ3ZCLE1B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QyxTQUFTLENBQUMsWUFBWSxHQUFHLFlBQVc7QUFDdkMsU0FBTztBQUNMLFFBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUk7QUFDdEIsS0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTO0FBQ3pFLEtBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVTtBQUMzRSxTQUFLLEVBQUUsQUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlO0FBQzFFLFVBQU0sRUFBRSxBQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBSSxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQjtBQUM1RSxNQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHO0dBQ3BCLENBQUM7Q0FDSCxDQUFDOzs7OztBQUtGLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxHQUFHLFlBQVc7QUFDdkMsU0FBTztBQUNMLFFBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUk7QUFDdEIsS0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTO0FBQ3pFLEtBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVTtBQUMzRSxTQUFLLEVBQUUsQUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlO0FBQzFFLFVBQU0sRUFBRSxBQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBSSxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQjtBQUM1RSxNQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHO0dBQ3BCLENBQUM7Q0FDSCxDQUFDOzs7Ozs7SUFNSSxJQUFJO1lBQUosSUFBSTs7V0FBSixJQUFJOzBCQUFKLElBQUk7OytCQUFKLElBQUk7OztlQUFKLElBQUk7Ozs7Ozs7OztXQU9ILGVBQUMsTUFBTSxFQUFFO0FBQ1osVUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7QUFFdkIsVUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDOztBQUVsQixVQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDakI7OztTQWJHLElBQUk7R0FBUyxLQUFLOztBQWlCeEIsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG5sZXQgY29uc3RhbnRzID0ge1xuICBkYXRhOiB7XG4gICAgdXJsOiAnLi4vZGF0YS9kYXRhLmpzb24nXG4gIH0sXG4gIC8vIFRoZSBmaXJzdCB0aWxlIHNpemUgaGF2ZSB0aGUgcHJpb3JpdHkuXG4gIC8vIFRoYXQgbWVhbiB3aWxsIHBhcnNlIHRoZSB0aWxlIHNpemUgZnJvbSB0b3AgdG8gYm90dG9tLlxuICAvLyBJdHMgYmV0dGVyIHRvIGFkZCB0aGUgYmlnZ2VzdCB0aWxlIGF0IHRoZSB0b3AuXG4gICdUSUxFX1NJWkUnOiB7XG4gICAgWFhMOiB7XG4gICAgICBtYXhBbW91bnQ6IDEsXG4gICAgICBjb2w6IDUsXG4gICAgICByb3c6IDVcbiAgICB9LFxuICAgIFhMOiB7XG4gICAgICBtYXhBbW91bnQ6IDIsXG4gICAgICBjb2w6IDQsXG4gICAgICByb3c6IDRcbiAgICB9LFxuICAgIEw6IHtcbiAgICAgIG1heEFtb3VudDogMTAsXG4gICAgICBjb2w6IDMsXG4gICAgICByb3c6IDJcbiAgICB9LFxuICAgIE06IHtcbiAgICAgIG1heEFtb3VudDogMTAsXG4gICAgICBjb2w6IDIsXG4gICAgICByb3c6IDJcbiAgICB9LFxuICAgIFM6IHtcbiAgICAgIG1heEFtb3VudDogMTAsXG4gICAgICBjb2w6IDIsXG4gICAgICByb3c6IDFcbiAgICB9LFxuICAgIFhTOiB7XG4gICAgICBtYXhBbW91bnQ6IDUwLFxuICAgICAgY29sOiAxLFxuICAgICAgcm93OiAxXG4gICAgfVxuICB9XG59O1xuXG4vKipcbiogR3JpZFxuKi9cbmZ1bmN0aW9uIEdyaWQoKSB7XG4gIHRoaXMuY29udGFpbmVyID0gbnVsbDtcbiAgdGhpcy5ncmlkV2lkdGggPSBudWxsO1xuICB0aGlzLmdyaWRIZWlnaHQgPSBudWxsO1xuICB0aGlzLmNvbCA9IG51bGw7XG4gIHRoaXMucm93ID0gbnVsbDtcbiAgdGhpcy5ncmlkV2lkdGhTcGFjZXIgPSBudWxsO1xuICB0aGlzLmdyaWRIZWlnaHRTcGFjZXIgPSBudWxsO1xuICB0aGlzLnRpbGVXaWR0aCA9IG51bGw7XG4gIHRoaXMudGlsZUhlaWdodCA9IG51bGw7XG4gIHRoaXMuY29vcmRzID0ge1xuICAgIGFsbDogW10sXG4gICAgZnJlZTogW10sXG4gICAgdGFrZW46IFtdXG4gIH07XG59XG5cbi8qKlxuKiBDaGVjayBhdmFpbGFiaWxpdHkgb2YgY29vcmRzIGZyb20gY29vcmRcbiogQHBhcmFtIHtvYmplY3R9IGNvb3Jkc1xuKi9cbkdyaWQucHJvdG90eXBlLmNoZWNrQXZhaWxhYmlsaXR5T2ZDb29yZHNGcm9tQ29vcmQgPSBmdW5jdGlvbihjb29yZHMpIHtcbiAgbGV0IHkgPSAwO1xuICBjb29yZHMuZm9yRWFjaChjb29yZCA9PiB7XG4gICAgbGV0IGkgPSB0aGlzLmNvb3Jkcy5mcmVlLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBpZiAodGhpcy5jb29yZHMuZnJlZVtpXS54ID09PSBjb29yZC54ICYmIHRoaXMuY29vcmRzLmZyZWVbaV0ueSA9PT0gY29vcmQueSkge1xuICAgICAgICB5Kys7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGNvb3Jkcy5sZW5ndGggPT09IHk7XG59O1xuXG4vKlxuKiBHZXQgb2NjdXBhdGlvbiBmcm9tIGNvb3JkXG4qIFRoaXMgd2lsbCBnZXQgYW4gYXJyYXkgd2l0aCBhbGwgdGhlIHBvaW50IG9jY3VwZWQgYnkgdGhlIHRpbGVcbiogQHBhcmFtIHtudW1iZXJ9IHRvdGFsQ29sXG4qIEBwYXJhbSB7bnVtYmVyfSB0b3RhbFJvd1xuKiBAcGFyYW0ge29iamVjdH0gY29vcmRcbiovXG5HcmlkLnByb3RvdHlwZS5nZXRPY2N1cGF0aW9uRnJvbUNvb3JkID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gIHZhciB7dG90YWxDb2wsIHRvdGFsUm93LCBjb29yZH0gPSBwYXJhbXM7XG4gIGxldCBjb29yZHMgPSBbXTtcbiAgaWYgKGNvb3JkKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b3RhbENvbDsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRvdGFsUm93OyBqKyspIHtcbiAgICAgICAgY29vcmRzLnB1c2godGhpcy5nZXRDb29yZChpICsgY29vcmQueCwgaiArIGNvb3JkLnkpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvb3JkcztcbiAgfVxuICAvLyB0b2RvOiBzaG91bGQgcmV0dXJuIHNvbWV0aGluZyBhbnl3YXlcbn07XG5cbi8qXG4qIEdldCBuZXcgdGlsZUFyZWFcbiogSXRlcmF0ZSBhY3Jvc3MgZWFjaCBmcmVlIGNvb3JkaW5hdGVzIHRvIHRlc3QgaWYgdGhlIHRpbGUgY2FuIGJlIHBsYWNlZFxuKiBAcGFyYW0ge3N0cmluZ30gdGlsZVNpemVcbiogQHJldHVybnMge2FycmF5fHVuZGVmaW5lZH1cbiovXG5HcmlkLnByb3RvdHlwZS5nZXROZXdUaWxlQXJlYSA9IGZ1bmN0aW9uKHRpbGVTaXplKSB7XG4gIGxldCB0YXJnZXRzID0gW10sXG4gICAgIHRvdGFsQ29sID0gY29uc3RhbnRzLlRJTEVfU0laRVt0aWxlU2l6ZV0uY29sLFxuICAgICB0b3RhbFJvdyA9IGNvbnN0YW50cy5USUxFX1NJWkVbdGlsZVNpemVdLnJvdztcbiAgdGhpcy5jb29yZHMuZnJlZS5mb3JFYWNoKGZyZWVDb29yZCA9PiB7XG4gICAgLy8gbWFrZSBzdXJlIHRoZSB0aWxlIGVuZGluZyBlbmQgZG9uJ3QgZ28gZnV0aGVyIHRoZW4gdGhlIGdyaWQgZWRnZVxuICAgIGxldCB0aWxlUmlnaHRFZGdlID0gKGZyZWVDb29yZC54ICsgdG90YWxDb2wpICogdGhpcy50aWxlV2lkdGgsXG4gICAgICAgIHRpbGVCb3R0b21FZGdlID0gKGZyZWVDb29yZC55ICsgdG90YWxSb3cpICogdGhpcy50aWxlSGVpZ2h0O1xuICAgIGlmICh0aWxlUmlnaHRFZGdlIDw9IHRoaXMuZ3JpZFdpZHRoICYmIHRpbGVCb3R0b21FZGdlIDw9IHRoaXMuZ3JpZEhlaWdodCkge1xuICAgICAgLy8gV2UganN1dCBmb25kIGEgZ29vZCBzcG90IGZvciB0aGlzIHRpbGUuXG4gICAgICAvLyBJdCdzIHRpbWUgdG8gY2hlY2sgaWYgdGhlIGFyZWEgaXMgY2xlYXIuXG4gICAgICBsZXQgY29vcmRzID0gdGhpcy5nZXRPY2N1cGF0aW9uRnJvbUNvb3JkKHt0b3RhbENvbCwgdG90YWxSb3csIGNvb3JkOiBmcmVlQ29vcmR9KTtcbiAgICAgIGlmICh0aGlzLmNoZWNrQXZhaWxhYmlsaXR5T2ZDb29yZHNGcm9tQ29vcmQoY29vcmRzKSkge1xuICAgICAgICB0YXJnZXRzLnB1c2goZnJlZUNvb3JkKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICAvLyBJZiB0aGUgdGFyZ2V0cyBpcyBlbXB0eSB0aGF0IG1lYW4gMiB0aGluZ3M6XG4gIC8vIC0gdGhlIHRpbGUgd2FzIHRvIGJpZ1xuICAvLyAtIHRoZSB0aWxlIGhhZCB0aGUgcmlnaHQgc2l6ZSBidXQgbm8gYXJlYSB3YXMgYXZhaWxhYmxlXG4gIHJldHVybiB0YXJnZXRzLmxlbmd0aCA+IDAgPyB0aGlzLnNodWZmbGUodGFyZ2V0cykgOiB1bmRlZmluZWQ7XG59O1xuXG4vKlxuKiBQdXQgZnJlZSBjb29yIHRvIHRha2VuIGNvb3JcbiogQHBhcmFtIHtvYmplY3R9IGNvb3JkXG4qL1xuR3JpZC5wcm90b3R5cGUucHV0RnJlZUNvb3JUb1Rha2VuQ29vciA9IGZ1bmN0aW9uKGNvb3JkKSB7XG4gIC8vdG9kbzogUmVtb3ZlIHRoZSBpZiBzdGF0ZW1lbnQgYW5kIGFkZCBhIGZpbHRlciBiZWZvcmUgZm9yRWFjaFxuICB0aGlzLmNvb3Jkcy5mcmVlLmZvckVhY2goKG15Q29vcmQsIGluZGV4KSA9PiB7XG4gICAgLy8gdG9kbzogY2xlYW4gdGhpcyB1cFxuICAgIGlmIChteUNvb3JkLnggPT09IGNvb3JkLnggJiYgbXlDb29yZC55ID09PSBjb29yZC55KSB7XG4gICAgICB0aGlzLmNvb3Jkcy5mcmVlLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9KTtcbiAgdGhpcy5jb29yZHMudGFrZW4ucHVzaChjb29yZCk7XG59O1xuXG4vKlxuKiBTaHVmZmxlXG4qIEBwYXJhbSB7b2JqZWN0fSBvXG4qL1xuR3JpZC5wcm90b3R5cGUuc2h1ZmZsZSA9IGZ1bmN0aW9uKG8pIHtcbiAgZm9yKGxldCBqLCB4LCBpID0gby5sZW5ndGg7IGk7IGogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBpKSwgeCA9IG9bLS1pXSwgb1tpXSA9IG9bal0sIG9bal0gPSB4KTtcbiAgcmV0dXJuIG87XG59O1xuXG4vKlxuKiBHZXQgY29vcmRcbiogQHBhcmFtIHtudW1iZXJ9IHhcbiogQHBhcmFtIHtudW1iZXJ9IHlcbiovXG5HcmlkLnByb3RvdHlwZS5nZXRDb29yZCA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICByZXR1cm4ge3gsIHl9O1xufTtcblxuLypcbiogU2V0IGNvb3Jkc1xuKi9cbkdyaWQucHJvdG90eXBlLnNldENvb3JkcyA9IGZ1bmN0aW9uKCkge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29sOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMucm93OyBqKyspIHtcbiAgICAgIHRoaXMuY29vcmRzLmFsbC5wdXNoKHRoaXMuZ2V0Q29vcmQoaSwgaikpO1xuICAgIH1cbiAgfVxuICAvLyAgQ2xvbmUgdGhlIGFycmF5WSBvZiBhbGwgcG9zaXRpb24gYW5kIGFkZCBpdCB0byBmcmVlIHBvc2l0aW9uIGFycmF5LlxuICB0aGlzLmNvb3Jkcy5mcmVlID0gdGhpcy5jb29yZHMuYWxsO1xufTtcblxuLypcbiogU2hvdyBjb29yZHNcbiogVGhpcyB3aWxsIHNob3cgYmxhY2sgZG90cyBmb3IgZWFjaCBjb29yZG9uYXRlXG4qL1xuR3JpZC5wcm90b3R5cGUuc2hvd0Nvb3JkcyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmNvb3Jkcy5hbGwuZm9yRWFjaChjb29yZCA9PiB7XG4gICAgbGV0IGxlZnQgPSB0aGlzLmdyaWRXaWR0aCAvIHRoaXMuY29sICogY29vcmQueDtcbiAgICBsZXQgdG9wID0gdGhpcy5ncmlkSGVpZ2h0IC8gdGhpcy5yb3cgKiBjb29yZC55O1xuICAgIGxlZnQgPSBsZWZ0ICogMTAwIC8gdGhpcy5ncmlkV2lkdGg7XG4gICAgdG9wID0gdG9wICogMTAwIC8gdGhpcy5ncmlkSGVpZ2h0O1xuICAgIGxldCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIkRJVlwiKTtcbiAgICBub2RlLnN0eWxlLmNzc1RleHQgPSBgdG9wOiAke3RvcC0wLjV9JTsgbGVmdDogJHtsZWZ0LTAuMn0lYDtcbiAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZChub2RlKTtcbiAgfSk7XG59O1xuXG4vKlxuKiBCdWlsZCBncmlkXG4qIEBwYXJhbSB7c3RyaW5nfSBlbFxuKiBAcGFyYW0ge251bWJlcn0gZ0NvbFxuKiBAcGFyYW0ge251bWJlcn0gZ1Jvd1xuKi9cbkdyaWQucHJvdG90eXBlLmJ1aWxkR3JpZCA9IGZ1bmN0aW9uKHBhcmFtcykge1xuICB2YXIge2VsLCBjb2wsIHJvd30gPSBwYXJhbXM7XG4gIHRoaXMuZWwgPSBlbDtcbiAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbCk7XG4gIHRoaXMuZ3JpZFdpZHRoID0gdGhpcy5jb250YWluZXIuY2xpZW50V2lkdGg7XG4gIHRoaXMuZ3JpZEhlaWdodCA9IHRoaXMuY29udGFpbmVyLmNsaWVudEhlaWdodDtcbiAgdGhpcy5jb2wgPSBjb2w7Ly90b2RvOiB0aGlzIHNob3VsZCBiZSBtb3JlIHNwZWNpZmljLiBpdCB3aWxsIGhlbHAgdW5kZXJzdGFuZCB0aGUgY29kZSB3aGVuIHdlIGNhbGwgdGhpcyBmcm9tIGEgc3ViIGZ1bmN0aW9uLlxuICB0aGlzLnJvdyA9IHJvdztcbiAgdGhpcy5ncmlkV2lkdGhTcGFjZXIgPSAyICogMTAwIC8gdGhpcy5ncmlkV2lkdGg7XG4gIHRoaXMuZ3JpZEhlaWdodFNwYWNlciA9IDIgKiAxMDAgLyB0aGlzLmdyaWRIZWlnaHQ7XG4gIHRoaXMudGlsZVdpZHRoID0gdGhpcy5ncmlkV2lkdGggLyBjb2w7IC8vdG9kbzogZmluZCBhIG1vcmUgc3BlY2lmaWMgbmFtZSBmb3IgdGhpcy4gaXRzIG1vcmUgYSB6b25lIG9yIGFyZWEgdGhlbiB0aWxlXG4gIHRoaXMudGlsZUhlaWdodCA9IHRoaXMuZ3JpZEhlaWdodCAvIHJvdztcblxuICAvLyBTZXQgY29vcmRvbmF0ZVxuICB0aGlzLnNldENvb3JkcygpO1xuICB0aGlzLnNob3dDb29yZHMoKTtcbn07XG5cbi8qKlxuKiBUaWxlXG4qL1xuVGlsZXMucHJvdG90eXBlID0gbmV3IEdyaWQoKTsgLy8gaW5oZXJpdCBmcm9tIEdyaWRcblRpbGVzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbGVzO1xuZnVuY3Rpb24gVGlsZXMoKSB7XG4gIHRoaXMudGlsZXMgPSBbXTtcbiAgdGhpcy50aWxlUXVldWUgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IDQwOyBpIDwgbGVuOyBpKyspIHtcbiAgICB0aGlzLnRpbGVzLnB1c2goe1xuICAgICAgaWQ6IGksXG4gICAgICB0aXRsZTogJ3RpdGxlJyxcbiAgICAgIGltZzogJydcbiAgICB9KTtcbiAgfVxufVxuXG4vKlxuKiBTaG93IHRpbGVcbiovXG5UaWxlcy5wcm90b3R5cGUuc2hvd1RpbGUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy50aWxlUXVldWUuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICBsZXQgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJESVZcIik7XG4gICAgbm9kZS5zdHlsZS5jc3NUZXh0ID0gYHRvcDogJHtpdGVtLnl9JTsgbGVmdDogJHtpdGVtLnh9JTsgd2lkdGg6ICR7aXRlbS53aWR0aH0lOyBoZWlnaHQ6ICR7aXRlbS5oZWlnaHR9JWA7XG4gICAgbm9kZS5jbGFzc05hbWUgPSAndGlsZSc7XG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQobm9kZSk7XG4gIH0pO1xufTtcblxuLypcbiogR2V0IG5leHQgdGlsZSBzaXplXG4qIFRoaXMgd2lsbCBnZXQgdGhlIG5leHQgdGlsZSBzaXplIHRvIHVzZS5cbiogQHBhcmFtIHtzdHJpbmd9IHRpbGVJbmRleFxuKi9cblRpbGVzLnByb3RvdHlwZS5nZXROZXh0VGlsZVNpemUgPSBmdW5jdGlvbih0aWxlSW5kZXgpIHtcbiAgbGV0IGN1cnJlbnRUaWxlQ291bnQgPSAwO1xuICBsZXQgdGlsZVNpemUgPSBudWxsO1xuICBmb3IobGV0IHNpemUgaW4gY29uc3RhbnRzLlRJTEVfU0laRSl7XG4gICAgY3VycmVudFRpbGVDb3VudCA9IGN1cnJlbnRUaWxlQ291bnQgKyBjb25zdGFudHMuVElMRV9TSVpFW3NpemVdLm1heEFtb3VudDtcbiAgICBpZih0aWxlSW5kZXggPCBjdXJyZW50VGlsZUNvdW50KXtcbiAgICAgIHJldHVybiBzaXplO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGlsZVNpemU7XG59O1xuXG4vKlxuKiBSZWR1Y2UgdGlsZSBzaXplXG4qIFRoaXMgaXMgY2hlY2tpbmcgYWxsIHRoZSB0aWxlIHNpemUgYW5kIGxvb2sgZm9yIHRoZSBuZXh0IGFyZWEgc21hbGxlciB0aGVuIHRoZSBjdXJyZW50IG9uZS5cbiogVG8gZmluZCB0aGUgYXJlYSB3ZSBqdXN0IGVuZWQgdG8gbXVsdGlwbHkgdGhlIGNvbCBhbmQgcm93IChjb25zdGFudHMuVElMRV9TSVpFW3NpemVdLmNvbCAqIGNvbnN0YW50cy5USUxFX1NJWkVbc2l6ZV0ucm93KVxuKiBAcGFyYW0ge3N0cmluZ30gY3VycmVudFRpbGVTaXplIC0gYmlnLCBtZWRpdW0sIHNtYWxsLCBlY3QuXG4qL1xuVGlsZXMucHJvdG90eXBlLnJlZHVjZVRpbGVTaXplID0gZnVuY3Rpb24oY3VycmVudFRpbGVTaXplKSB7XG4gIGxldCBjdXJyZW50VGlsZSA9IGNvbnN0YW50cy5USUxFX1NJWkVbY3VycmVudFRpbGVTaXplXTtcbiAgbGV0IGN1cnJlbnRUaWxlQXJlYSA9IGN1cnJlbnRUaWxlLmNvbCAqIGN1cnJlbnRUaWxlLnJvdztcbiAgbGV0IG5leHRTaXplID0gbnVsbDsgLy8gVGhpcyB3aWxsIHJldHVybiBudWxsIGlmIG5vIHNtYWxsZXIgdGlsZSBhcmUgZm91bmQuXG4gIGZvciAobGV0IHNpemUgaW4gY29uc3RhbnRzLlRJTEVfU0laRSkge1xuICAgIGxldCBuZXh0VGlsZUFyZWEgPSBjb25zdGFudHMuVElMRV9TSVpFW3NpemVdLmNvbCAqIGNvbnN0YW50cy5USUxFX1NJWkVbc2l6ZV0ucm93O1xuICAgIGlmIChuZXh0VGlsZUFyZWEgPCBjdXJyZW50VGlsZUFyZWEpIHtcbiAgICAgIHJldHVybiBzaXplO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbmV4dFNpemU7XG59O1xuXG4vKlxuKiBHZXQgbWF4IHRpbGUgY291bnRcbiovXG5UaWxlcy5wcm90b3R5cGUuZ2V0TWF4VGlsZUNvdW50ID0gZnVuY3Rpb24oKSB7XG4gIGxldCBtYXhUaWxlQ291bnQgPSAwO1xuICBmb3IgKGxldCBzaXplIGluIGNvbnN0YW50cy5USUxFX1NJWkUpIHtcbiAgICBtYXhUaWxlQ291bnQgPSBtYXhUaWxlQ291bnQgKyBjb25zdGFudHMuVElMRV9TSVpFW3NpemVdLm1heEFtb3VudDtcbiAgfVxuICByZXR1cm4gbWF4VGlsZUNvdW50O1xufTtcblxuLypcbiogQnVpbGQgdGlsZXNcbiovXG5UaWxlcy5wcm90b3R5cGUuYnVpbGRUaWxlcyA9IGZ1bmN0aW9uKCkge1xuICBsZXQgc2l6ZSA9IG51bGw7XG4gIGxldCB0aWxlQ291bnQgPSAwO1xuICBsZXQgbWF4VGlsZSA9IHRoaXMuZ2V0TWF4VGlsZUNvdW50KCk7XG5cbiAgdGhpcy50aWxlcy5mb3JFYWNoKCh0aWxlLCBpbmRleCkgPT4ge1xuICAgIGlmKHRoaXMuY29vcmRzLmZyZWUubGVuZ3RoID4gMCAmJiB0aWxlQ291bnQgPCBtYXhUaWxlKSB7XG5cbiAgICAgIHRpbGUuc2l6ZSA9IHRoaXMuZ2V0TmV4dFRpbGVTaXplKHRpbGVDb3VudCk7XG4gICAgICBsZXQgYXZhaWxhYmxlQXJlYUNvb3JkcyA9IG51bGw7XG5cbiAgICAgIC8vIElmIG5vIHNwYWNlIHdlcmUgZm91bmQgdGhhdCBtZWFuIHRoZSB0aWxlIGlzIHRvIGJpZy5cbiAgICAgIC8vIE5lZWQgdG8gc2l6ZSBpdCBkb3duIGEgYml0XG4gICAgICBsZXQgZmluZE5leHRBdmFpbGFibGVBcmVhQ29vcmRzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHRpbGUuc2l6ZSA9IHRoaXMucmVkdWNlVGlsZVNpemUodGlsZS5zaXplKTtcbiAgICAgICAgaWYoIXRpbGUuc2l6ZSkge1xuICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGF2YWlsYWJsZUFyZWFDb29yZHMgPSB0aGlzLmdldE5ld1RpbGVBcmVhKHRpbGUuc2l6ZSk7XG4gICAgICAgIGlmKCFhdmFpbGFibGVBcmVhQ29vcmRzKXtcbiAgICAgICAgICByZXR1cm4gZmluZE5leHRBdmFpbGFibGVBcmVhQ29vcmRzKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGF2YWlsYWJsZUFyZWFDb29yZHM7XG4gICAgICB9LmJpbmQodGhpcyk7XG5cbiAgICAgIC8vIENoZWNrIGlmIHdlIGZvdW5kIGEgcGxhY2UgZm9yIHRoZSB0aWxlXG4gICAgICBhdmFpbGFibGVBcmVhQ29vcmRzID0gZmluZE5leHRBdmFpbGFibGVBcmVhQ29vcmRzKCk7XG4gICAgICAvLyBKdXN0IG1ha2luZyBzdXJlIHdlIGhhdmUgc3BhY2UgZm9yIHRoaXMgdGlsZS5cbiAgICAgIC8vIFdlIHdvbnQgbmVlZCB0aGlzIGNvbmRpdGlvbiBhZnRlciBJIG1ha2UgYSByZWN1cnNpb24gZm9yIHRoZSBkb3duc2l6aW5nIHRpbGUgZnVuY3Rpb25cbiAgICAgIGlmKGF2YWlsYWJsZUFyZWFDb29yZHMpe1xuICAgICAgICB0aWxlQ291bnQrKztcbiAgICAgICAgdGlsZS5rZXkgPSBpbmRleDtcbiAgICAgICAgdGlsZS50YXJnZXQgPSBhdmFpbGFibGVBcmVhQ29vcmRzWzBdOyAvL1Rha2UgdGhlIGZpcnN0IG9uZSBpbiB0aGUgYXJyYXkuIFRoZXkgYXJlIGFscmVhZHkgc2hvdmVsZWRcbiAgICAgICAgdGlsZS5jb2wgPSBjb25zdGFudHMuVElMRV9TSVpFW3RpbGUuc2l6ZV0uY29sO1xuICAgICAgICB0aWxlLnJvdyA9IGNvbnN0YW50cy5USUxFX1NJWkVbdGlsZS5zaXplXS5yb3c7XG4gICAgICAgIGxldCBteVRpbGUgPSBuZXcgVGlsZSh0aGlzLCB0aWxlKTtcblxuICAgICAgICAvLyBVcGRhdGUgZnJlZSAmIHRha2VuIGNvb3Jkc1xuICAgICAgICBsZXQgdGlsZU9jY3VwYXRpb25Db29yZHMgPSB0aGlzLmdldE9jY3VwYXRpb25Gcm9tQ29vcmQoe3RvdGFsQ29sOiB0aWxlLmNvbCwgdG90YWxSb3c6IHRpbGUucm93LCBjb29yZDogdGlsZS50YXJnZXR9KTtcbiAgICAgICAgdGlsZU9jY3VwYXRpb25Db29yZHMuZm9yRWFjaChjb29yZHMgPT4ge1xuICAgICAgICAgIHRoaXMucHV0RnJlZUNvb3JUb1Rha2VuQ29vcihjb29yZHMpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy50aWxlUXVldWUucHVzaChteVRpbGUuZ2V0VGlsZUluZm9zKCkpO1xuICAgICAgfWVsc2V7XG4gICAgICAgIC8vIG5vIHRpbGUgYWRkZWQgdG8gdGhlIHF1ZXVlIGJlY2F1c2Ugd2UgZGlkIG5vdCBmaW5kIHRoZSBzcGFjZSBmb3IgaXRcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufTtcblxuLyoqXG4qIFRpbGVcbiogQHBhcmFtIHtvYmplY3R9IGdyaWRcbiogQHBhcmFtIHtvYmplY3R9IHBhcmFtc1xuKi9cbmZ1bmN0aW9uIFRpbGUoZ3JpZCwgcGFyYW1zKSB7XG4gIHRoaXMuZ3JpZCA9IGdyaWQ7XG4gIHRoaXMucGFyYW1zID0gcGFyYW1zO1xufVxuXG4vKlxuKiBHZXQgdGlsZSBpbmZvc1xuKi9cblRpbGUucHJvdG90eXBlLmdldFRpbGVJbmZvcyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4ge1xuICAgIHNpemU6IHRoaXMucGFyYW1zLnNpemUsXG4gICAgeDogdGhpcy5wYXJhbXMudGFyZ2V0LnggKiB0aGlzLmdyaWQudGlsZVdpZHRoICogMTAwIC8gdGhpcy5ncmlkLmdyaWRXaWR0aCxcbiAgICB5OiB0aGlzLnBhcmFtcy50YXJnZXQueSAqIHRoaXMuZ3JpZC50aWxlSGVpZ2h0ICogMTAwIC8gdGhpcy5ncmlkLmdyaWRIZWlnaHQsXG4gICAgd2lkdGg6ICh0aGlzLnBhcmFtcy5jb2wgKiAxMDAgLyB0aGlzLmdyaWQuY29sKSAtIHRoaXMuZ3JpZC5ncmlkV2lkdGhTcGFjZXIsXG4gICAgaGVpZ2h0OiAodGhpcy5wYXJhbXMucm93ICogMTAwIC8gdGhpcy5ncmlkLnJvdykgLSB0aGlzLmdyaWQuZ3JpZEhlaWdodFNwYWNlcixcbiAgICBpZDogdGhpcy5wYXJhbXMua2V5XG4gIH07XG59O1xuXG4vKlxuKiBHZXQgZGF0YSBpbmZvc1xuKi9cblRpbGUucHJvdG90eXBlLmdldFRpbGVJbmZvcyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4ge1xuICAgIHNpemU6IHRoaXMucGFyYW1zLnNpemUsXG4gICAgeDogdGhpcy5wYXJhbXMudGFyZ2V0LnggKiB0aGlzLmdyaWQudGlsZVdpZHRoICogMTAwIC8gdGhpcy5ncmlkLmdyaWRXaWR0aCxcbiAgICB5OiB0aGlzLnBhcmFtcy50YXJnZXQueSAqIHRoaXMuZ3JpZC50aWxlSGVpZ2h0ICogMTAwIC8gdGhpcy5ncmlkLmdyaWRIZWlnaHQsXG4gICAgd2lkdGg6ICh0aGlzLnBhcmFtcy5jb2wgKiAxMDAgLyB0aGlzLmdyaWQuY29sKSAtIHRoaXMuZ3JpZC5ncmlkV2lkdGhTcGFjZXIsXG4gICAgaGVpZ2h0OiAodGhpcy5wYXJhbXMucm93ICogMTAwIC8gdGhpcy5ncmlkLnJvdykgLSB0aGlzLmdyaWQuZ3JpZEhlaWdodFNwYWNlcixcbiAgICBpZDogdGhpcy5wYXJhbXMua2V5XG4gIH07XG59O1xuXG5cbi8qKlxuKiBNb3phXG4qL1xuY2xhc3MgTW96YSBleHRlbmRzIFRpbGVzIHtcbiAgLypcbiAgKiBCdWlsZFxuICAqIEBwYXJhbSB7c3RyaW5nfSBlbFxuICAqIEBwYXJhbSB7bnVtYmVyfSBjb2xcbiAgKiBAcGFyYW0ge251bWJlcn0gcm93XG4gICovXG4gIGJ1aWxkKHBhcmFtcykge1xuICAgIHRoaXMuYnVpbGRHcmlkKHBhcmFtcyk7XG4gICAgLy8gQnVpbGQgdGhlIHRpbGVzLiBBdCB0aGlzIHBvaW50IHdlIHdpbGwgaGF2ZSB0aGUgc2l6ZSBhbmQgcG9zaXRpb24gb2YgYWxsIHRoZSB0aWxlcy5cbiAgICB0aGlzLmJ1aWxkVGlsZXMoKTtcbiAgICAvLyBUaGlzIHdpbGwgcGFyc2UgdGhlXG4gICAgdGhpcy5zaG93VGlsZSgpO1xuICB9XG59XG5cblxuZ2xvYmFsLk1vemEgPSBNb3phO1xuIl19
