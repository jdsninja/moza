(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
})();

var _get = function get(_x, _x2, _x3) {
  var _again = true;_function: while (_again) {
    var object = _x,
        property = _x2,
        receiver = _x3;desc = parent = getter = undefined;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);if (parent === null) {
        return undefined;
      } else {
        _x = parent;_x2 = property;_x3 = receiver;_again = true;continue _function;
      }
    } else if ('value' in desc) {
      return desc.value;
    } else {
      var getter = desc.get;if (getter === undefined) {
        return undefined;
      }return getter.call(receiver);
    }
  }
};

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvamR1Z3VheS9TaXRlcy9Nb3phL3NyYy9qcy9tb3phLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQ0FBLFlBQVksQ0FBQzs7QUFFYixJQUFJLFlBQVksR0FBRyxDQUFDLFlBQVk7QUFBRSxXQUFTLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUU7QUFBRSxTQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUFFLFVBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFXLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDLFVBQVcsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUssT0FBTyxJQUFJLFVBQVUsRUFBRSxVQUFVLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0tBQUU7R0FBRSxPQUFRLFVBQVUsV0FBVyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUU7QUFBRSxRQUFJLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLElBQUssV0FBVyxFQUFFLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQyxPQUFRLFdBQVcsQ0FBQztHQUFFLENBQUM7Q0FBRSxDQUFBLEVBQUcsQ0FBQzs7QUFFdGpCLElBQUksSUFBSSxHQUFHLFNBQVMsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFO0FBQUUsTUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVUsRUFBRSxPQUFP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LEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUztBQUN6RSxLQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVU7QUFDM0UsU0FBSyxFQUFFLElBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBSSxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWU7QUFDMUUsVUFBTSxFQUFFLElBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBSSxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQjtBQUM1RSxNQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHO0dBQ3BCLENBQUM7Q0FDSCxDQUFDOzs7OztBQUtGLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxHQUFHLFlBQVc7QUFDdkMsU0FBTztBQUNMLFFBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUk7QUFDdEIsS0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTO0FBQ3pFLEtBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVTtBQUMzRSxTQUFLLEVBQUUsSUFBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZTtBQUMxRSxVQUFNLEVBQUUsSUFBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCO0FBQzVFLE1BQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUc7R0FDcEIsQ0FBQztDQUNILENBQUM7Ozs7OztBQWtDRixJQTVCTSxJQUFJLEdBQUEsQ0FBQSxVQUFBLE1BQUEsRUFBQTtBQTZCUixXQUFTLENBN0JMLElBQUksRUFBQSxNQUFBLENBQUEsQ0FBQTs7QUErQlIsV0EvQkksSUFBSSxHQUFBO0FBZ0NOLG1CQUFlLENBQUMsSUFBSSxFQWhDbEIsSUFBSSxDQUFBLENBQUE7O0FBa0NOLFFBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQWxDeEIsSUFBSSxDQUFBLFNBQUEsQ0FBQSxFQUFBLGFBQUEsRUFBQSxJQUFBLENBQUEsQ0FBQSxLQUFBLENBQUEsSUFBQSxFQUFBLFNBQUEsQ0FBQSxDQUFBO0dBbUNQOztBQUVELGNBQVksQ0FyQ1IsSUFBSSxFQUFBLENBQUE7QUFzQ04sT0FBRyxFQUFFLE9BQU87Ozs7Ozs7O0FBUVosU0FBSyxFQXZDRixTQUFBLEtBQUEsQ0FBQyxNQUFNLEVBQUU7QUFDWixVQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDOztBQUV2QixVQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7O0FBRWxCLFVBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUNqQjtHQXdDQSxDQUFDLENBQUMsQ0FBQzs7QUFFSixTQXZESSxJQUFJLENBQUE7Q0F3RFQsQ0FBQSxDQXhEa0IsS0FBSyxDQUFBLENBQUE7O0FBaUJ4QixNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbmxldCBjb25zdGFudHMgPSB7XG4gIGRhdGE6IHtcbiAgICB1cmw6ICcuLi9kYXRhL2RhdGEuanNvbidcbiAgfSxcbiAgLy8gVGhlIGZpcnN0IHRpbGUgc2l6ZSBoYXZlIHRoZSBwcmlvcml0eS5cbiAgLy8gVGhhdCBtZWFuIHdpbGwgcGFyc2UgdGhlIHRpbGUgc2l6ZSBmcm9tIHRvcCB0byBib3R0b20uXG4gIC8vIEl0cyBiZXR0ZXIgdG8gYWRkIHRoZSBiaWdnZXN0IHRpbGUgYXQgdGhlIHRvcC5cbiAgJ1RJTEVfU0laRSc6IHtcbiAgICBYWEw6IHtcbiAgICAgIG1heEFtb3VudDogMSxcbiAgICAgIGNvbDogNSxcbiAgICAgIHJvdzogNVxuICAgIH0sXG4gICAgWEw6IHtcbiAgICAgIG1heEFtb3VudDogMixcbiAgICAgIGNvbDogNCxcbiAgICAgIHJvdzogNFxuICAgIH0sXG4gICAgTDoge1xuICAgICAgbWF4QW1vdW50OiAxMCxcbiAgICAgIGNvbDogMyxcbiAgICAgIHJvdzogMlxuICAgIH0sXG4gICAgTToge1xuICAgICAgbWF4QW1vdW50OiAxMCxcbiAgICAgIGNvbDogMixcbiAgICAgIHJvdzogMlxuICAgIH0sXG4gICAgUzoge1xuICAgICAgbWF4QW1vdW50OiAxMCxcbiAgICAgIGNvbDogMixcbiAgICAgIHJvdzogMVxuICAgIH0sXG4gICAgWFM6IHtcbiAgICAgIG1heEFtb3VudDogNTAsXG4gICAgICBjb2w6IDEsXG4gICAgICByb3c6IDFcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuKiBHcmlkXG4qL1xuZnVuY3Rpb24gR3JpZCgpIHtcbiAgdGhpcy5jb250YWluZXIgPSBudWxsO1xuICB0aGlzLmdyaWRXaWR0aCA9IG51bGw7XG4gIHRoaXMuZ3JpZEhlaWdodCA9IG51bGw7XG4gIHRoaXMuY29sID0gbnVsbDtcbiAgdGhpcy5yb3cgPSBudWxsO1xuICB0aGlzLmdyaWRXaWR0aFNwYWNlciA9IG51bGw7XG4gIHRoaXMuZ3JpZEhlaWdodFNwYWNlciA9IG51bGw7XG4gIHRoaXMudGlsZVdpZHRoID0gbnVsbDtcbiAgdGhpcy50aWxlSGVpZ2h0ID0gbnVsbDtcbiAgdGhpcy5jb29yZHMgPSB7XG4gICAgYWxsOiBbXSxcbiAgICBmcmVlOiBbXSxcbiAgICB0YWtlbjogW11cbiAgfTtcbn1cblxuLyoqXG4qIENoZWNrIGF2YWlsYWJpbGl0eSBvZiBjb29yZHMgZnJvbSBjb29yZFxuKiBAcGFyYW0ge29iamVjdH0gY29vcmRzXG4qL1xuR3JpZC5wcm90b3R5cGUuY2hlY2tBdmFpbGFiaWxpdHlPZkNvb3Jkc0Zyb21Db29yZCA9IGZ1bmN0aW9uKGNvb3Jkcykge1xuICBsZXQgeSA9IDA7XG4gIGNvb3Jkcy5mb3JFYWNoKGNvb3JkID0+IHtcbiAgICBsZXQgaSA9IHRoaXMuY29vcmRzLmZyZWUubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGlmICh0aGlzLmNvb3Jkcy5mcmVlW2ldLnggPT09IGNvb3JkLnggJiYgdGhpcy5jb29yZHMuZnJlZVtpXS55ID09PSBjb29yZC55KSB7XG4gICAgICAgIHkrKztcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICByZXR1cm4gY29vcmRzLmxlbmd0aCA9PT0geTtcbn07XG5cbi8qXG4qIEdldCBvY2N1cGF0aW9uIGZyb20gY29vcmRcbiogVGhpcyB3aWxsIGdldCBhbiBhcnJheSB3aXRoIGFsbCB0aGUgcG9pbnQgb2NjdXBlZCBieSB0aGUgdGlsZVxuKiBAcGFyYW0ge251bWJlcn0gdG90YWxDb2xcbiogQHBhcmFtIHtudW1iZXJ9IHRvdGFsUm93XG4qIEBwYXJhbSB7b2JqZWN0fSBjb29yZFxuKi9cbkdyaWQucHJvdG90eXBlLmdldE9jY3VwYXRpb25Gcm9tQ29vcmQgPSBmdW5jdGlvbihwYXJhbXMpIHtcbiAgdmFyIHt0b3RhbENvbCwgdG90YWxSb3csIGNvb3JkfSA9IHBhcmFtcztcbiAgbGV0IGNvb3JkcyA9IFtdO1xuICBpZiAoY29vcmQpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvdGFsQ29sOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdG90YWxSb3c7IGorKykge1xuICAgICAgICBjb29yZHMucHVzaCh0aGlzLmdldENvb3JkKGkgKyBjb29yZC54LCBqICsgY29vcmQueSkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY29vcmRzO1xuICB9XG4gIC8vIHRvZG86IHNob3VsZCByZXR1cm4gc29tZXRoaW5nIGFueXdheVxufTtcblxuLypcbiogR2V0IG5ldyB0aWxlQXJlYVxuKiBJdGVyYXRlIGFjcm9zcyBlYWNoIGZyZWUgY29vcmRpbmF0ZXMgdG8gdGVzdCBpZiB0aGUgdGlsZSBjYW4gYmUgcGxhY2VkXG4qIEBwYXJhbSB7c3RyaW5nfSB0aWxlU2l6ZVxuKiBAcmV0dXJucyB7YXJyYXl8dW5kZWZpbmVkfVxuKi9cbkdyaWQucHJvdG90eXBlLmdldE5ld1RpbGVBcmVhID0gZnVuY3Rpb24odGlsZVNpemUpIHtcbiAgbGV0IHRhcmdldHMgPSBbXSxcbiAgICAgdG90YWxDb2wgPSBjb25zdGFudHMuVElMRV9TSVpFW3RpbGVTaXplXS5jb2wsXG4gICAgIHRvdGFsUm93ID0gY29uc3RhbnRzLlRJTEVfU0laRVt0aWxlU2l6ZV0ucm93O1xuICB0aGlzLmNvb3Jkcy5mcmVlLmZvckVhY2goZnJlZUNvb3JkID0+IHtcbiAgICAvLyBtYWtlIHN1cmUgdGhlIHRpbGUgZW5kaW5nIGVuZCBkb24ndCBnbyBmdXRoZXIgdGhlbiB0aGUgZ3JpZCBlZGdlXG4gICAgbGV0IHRpbGVSaWdodEVkZ2UgPSAoZnJlZUNvb3JkLnggKyB0b3RhbENvbCkgKiB0aGlzLnRpbGVXaWR0aCxcbiAgICAgICAgdGlsZUJvdHRvbUVkZ2UgPSAoZnJlZUNvb3JkLnkgKyB0b3RhbFJvdykgKiB0aGlzLnRpbGVIZWlnaHQ7XG4gICAgaWYgKHRpbGVSaWdodEVkZ2UgPD0gdGhpcy5ncmlkV2lkdGggJiYgdGlsZUJvdHRvbUVkZ2UgPD0gdGhpcy5ncmlkSGVpZ2h0KSB7XG4gICAgICAvLyBXZSBqc3V0IGZvbmQgYSBnb29kIHNwb3QgZm9yIHRoaXMgdGlsZS5cbiAgICAgIC8vIEl0J3MgdGltZSB0byBjaGVjayBpZiB0aGUgYXJlYSBpcyBjbGVhci5cbiAgICAgIGxldCBjb29yZHMgPSB0aGlzLmdldE9jY3VwYXRpb25Gcm9tQ29vcmQoe3RvdGFsQ29sLCB0b3RhbFJvdywgY29vcmQ6IGZyZWVDb29yZH0pO1xuICAgICAgaWYgKHRoaXMuY2hlY2tBdmFpbGFiaWxpdHlPZkNvb3Jkc0Zyb21Db29yZChjb29yZHMpKSB7XG4gICAgICAgIHRhcmdldHMucHVzaChmcmVlQ29vcmQpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIC8vIElmIHRoZSB0YXJnZXRzIGlzIGVtcHR5IHRoYXQgbWVhbiAyIHRoaW5nczpcbiAgLy8gLSB0aGUgdGlsZSB3YXMgdG8gYmlnXG4gIC8vIC0gdGhlIHRpbGUgaGFkIHRoZSByaWdodCBzaXplIGJ1dCBubyBhcmVhIHdhcyBhdmFpbGFibGVcbiAgcmV0dXJuIHRhcmdldHMubGVuZ3RoID4gMCA/IHRoaXMuc2h1ZmZsZSh0YXJnZXRzKSA6IHVuZGVmaW5lZDtcbn07XG5cbi8qXG4qIFB1dCBmcmVlIGNvb3IgdG8gdGFrZW4gY29vclxuKiBAcGFyYW0ge29iamVjdH0gY29vcmRcbiovXG5HcmlkLnByb3RvdHlwZS5wdXRGcmVlQ29vclRvVGFrZW5Db29yID0gZnVuY3Rpb24oY29vcmQpIHtcbiAgLy90b2RvOiBSZW1vdmUgdGhlIGlmIHN0YXRlbWVudCBhbmQgYWRkIGEgZmlsdGVyIGJlZm9yZSBmb3JFYWNoXG4gIHRoaXMuY29vcmRzLmZyZWUuZm9yRWFjaCgobXlDb29yZCwgaW5kZXgpID0+IHtcbiAgICAvLyB0b2RvOiBjbGVhbiB0aGlzIHVwXG4gICAgaWYgKG15Q29vcmQueCA9PT0gY29vcmQueCAmJiBteUNvb3JkLnkgPT09IGNvb3JkLnkpIHtcbiAgICAgIHRoaXMuY29vcmRzLmZyZWUuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH0pO1xuICB0aGlzLmNvb3Jkcy50YWtlbi5wdXNoKGNvb3JkKTtcbn07XG5cbi8qXG4qIFNodWZmbGVcbiogQHBhcmFtIHtvYmplY3R9IG9cbiovXG5HcmlkLnByb3RvdHlwZS5zaHVmZmxlID0gZnVuY3Rpb24obykge1xuICBmb3IobGV0IGosIHgsIGkgPSBvLmxlbmd0aDsgaTsgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGkpLCB4ID0gb1stLWldLCBvW2ldID0gb1tqXSwgb1tqXSA9IHgpO1xuICByZXR1cm4gbztcbn07XG5cbi8qXG4qIEdldCBjb29yZFxuKiBAcGFyYW0ge251bWJlcn0geFxuKiBAcGFyYW0ge251bWJlcn0geVxuKi9cbkdyaWQucHJvdG90eXBlLmdldENvb3JkID0gZnVuY3Rpb24oeCwgeSkge1xuICAgIHJldHVybiB7eCwgeX07XG59O1xuXG4vKlxuKiBTZXQgY29vcmRzXG4qL1xuR3JpZC5wcm90b3R5cGUuc2V0Q29vcmRzID0gZnVuY3Rpb24oKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb2w7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5yb3c7IGorKykge1xuICAgICAgdGhpcy5jb29yZHMuYWxsLnB1c2godGhpcy5nZXRDb29yZChpLCBqKSk7XG4gICAgfVxuICB9XG4gIC8vICBDbG9uZSB0aGUgYXJyYXlZIG9mIGFsbCBwb3NpdGlvbiBhbmQgYWRkIGl0IHRvIGZyZWUgcG9zaXRpb24gYXJyYXkuXG4gIHRoaXMuY29vcmRzLmZyZWUgPSB0aGlzLmNvb3Jkcy5hbGw7XG59O1xuXG4vKlxuKiBTaG93IGNvb3Jkc1xuKiBUaGlzIHdpbGwgc2hvdyBibGFjayBkb3RzIGZvciBlYWNoIGNvb3Jkb25hdGVcbiovXG5HcmlkLnByb3RvdHlwZS5zaG93Q29vcmRzID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuY29vcmRzLmFsbC5mb3JFYWNoKGNvb3JkID0+IHtcbiAgICBsZXQgbGVmdCA9IHRoaXMuZ3JpZFdpZHRoIC8gdGhpcy5jb2wgKiBjb29yZC54O1xuICAgIGxldCB0b3AgPSB0aGlzLmdyaWRIZWlnaHQgLyB0aGlzLnJvdyAqIGNvb3JkLnk7XG4gICAgbGVmdCA9IGxlZnQgKiAxMDAgLyB0aGlzLmdyaWRXaWR0aDtcbiAgICB0b3AgPSB0b3AgKiAxMDAgLyB0aGlzLmdyaWRIZWlnaHQ7XG4gICAgbGV0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiRElWXCIpO1xuICAgIG5vZGUuc3R5bGUuY3NzVGV4dCA9IGB0b3A6ICR7dG9wLTAuNX0lOyBsZWZ0OiAke2xlZnQtMC4yfSVgO1xuICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKG5vZGUpO1xuICB9KTtcbn07XG5cbi8qXG4qIEJ1aWxkIGdyaWRcbiogQHBhcmFtIHtzdHJpbmd9IGVsXG4qIEBwYXJhbSB7bnVtYmVyfSBnQ29sXG4qIEBwYXJhbSB7bnVtYmVyfSBnUm93XG4qL1xuR3JpZC5wcm90b3R5cGUuYnVpbGRHcmlkID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gIHZhciB7ZWwsIGNvbCwgcm93fSA9IHBhcmFtcztcbiAgdGhpcy5lbCA9IGVsO1xuICB0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsKTtcbiAgdGhpcy5ncmlkV2lkdGggPSB0aGlzLmNvbnRhaW5lci5jbGllbnRXaWR0aDtcbiAgdGhpcy5ncmlkSGVpZ2h0ID0gdGhpcy5jb250YWluZXIuY2xpZW50SGVpZ2h0O1xuICB0aGlzLmNvbCA9IGNvbDsvL3RvZG86IHRoaXMgc2hvdWxkIGJlIG1vcmUgc3BlY2lmaWMuIGl0IHdpbGwgaGVscCB1bmRlcnN0YW5kIHRoZSBjb2RlIHdoZW4gd2UgY2FsbCB0aGlzIGZyb20gYSBzdWIgZnVuY3Rpb24uXG4gIHRoaXMucm93ID0gcm93O1xuICB0aGlzLmdyaWRXaWR0aFNwYWNlciA9IDIgKiAxMDAgLyB0aGlzLmdyaWRXaWR0aDtcbiAgdGhpcy5ncmlkSGVpZ2h0U3BhY2VyID0gMiAqIDEwMCAvIHRoaXMuZ3JpZEhlaWdodDtcbiAgdGhpcy50aWxlV2lkdGggPSB0aGlzLmdyaWRXaWR0aCAvIGNvbDsgLy90b2RvOiBmaW5kIGEgbW9yZSBzcGVjaWZpYyBuYW1lIGZvciB0aGlzLiBpdHMgbW9yZSBhIHpvbmUgb3IgYXJlYSB0aGVuIHRpbGVcbiAgdGhpcy50aWxlSGVpZ2h0ID0gdGhpcy5ncmlkSGVpZ2h0IC8gcm93O1xuXG4gIC8vIFNldCBjb29yZG9uYXRlXG4gIHRoaXMuc2V0Q29vcmRzKCk7XG4gIHRoaXMuc2hvd0Nvb3JkcygpO1xufTtcblxuLyoqXG4qIFRpbGVcbiovXG5UaWxlcy5wcm90b3R5cGUgPSBuZXcgR3JpZCgpOyAvLyBpbmhlcml0IGZyb20gR3JpZFxuVGlsZXMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlsZXM7XG5mdW5jdGlvbiBUaWxlcygpIHtcbiAgdGhpcy50aWxlcyA9IFtdO1xuICB0aGlzLnRpbGVRdWV1ZSA9IFtdO1xuICBmb3IgKGxldCBpID0gMCwgbGVuID0gNDA7IGkgPCBsZW47IGkrKykge1xuICAgIHRoaXMudGlsZXMucHVzaCh7XG4gICAgICBpZDogaSxcbiAgICAgIHRpdGxlOiAndGl0bGUnLFxuICAgICAgaW1nOiAnJ1xuICAgIH0pO1xuICB9XG59XG5cbi8qXG4qIFNob3cgdGlsZVxuKi9cblRpbGVzLnByb3RvdHlwZS5zaG93VGlsZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnRpbGVRdWV1ZS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgIGxldCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIkRJVlwiKTtcbiAgICBub2RlLnN0eWxlLmNzc1RleHQgPSBgdG9wOiAke2l0ZW0ueX0lOyBsZWZ0OiAke2l0ZW0ueH0lOyB3aWR0aDogJHtpdGVtLndpZHRofSU7IGhlaWdodDogJHtpdGVtLmhlaWdodH0lYDtcbiAgICBub2RlLmNsYXNzTmFtZSA9ICd0aWxlJztcbiAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZChub2RlKTtcbiAgfSk7XG59O1xuXG4vKlxuKiBHZXQgbmV4dCB0aWxlIHNpemVcbiogVGhpcyB3aWxsIGdldCB0aGUgbmV4dCB0aWxlIHNpemUgdG8gdXNlLlxuKiBAcGFyYW0ge3N0cmluZ30gdGlsZUluZGV4XG4qL1xuVGlsZXMucHJvdG90eXBlLmdldE5leHRUaWxlU2l6ZSA9IGZ1bmN0aW9uKHRpbGVJbmRleCkge1xuICBsZXQgY3VycmVudFRpbGVDb3VudCA9IDA7XG4gIGxldCB0aWxlU2l6ZSA9IG51bGw7XG4gIGZvcihsZXQgc2l6ZSBpbiBjb25zdGFudHMuVElMRV9TSVpFKXtcbiAgICBjdXJyZW50VGlsZUNvdW50ID0gY3VycmVudFRpbGVDb3VudCArIGNvbnN0YW50cy5USUxFX1NJWkVbc2l6ZV0ubWF4QW1vdW50O1xuICAgIGlmKHRpbGVJbmRleCA8IGN1cnJlbnRUaWxlQ291bnQpe1xuICAgICAgcmV0dXJuIHNpemU7XG4gICAgfVxuICB9XG4gIHJldHVybiB0aWxlU2l6ZTtcbn07XG5cbi8qXG4qIFJlZHVjZSB0aWxlIHNpemVcbiogVGhpcyBpcyBjaGVja2luZyBhbGwgdGhlIHRpbGUgc2l6ZSBhbmQgbG9vayBmb3IgdGhlIG5leHQgYXJlYSBzbWFsbGVyIHRoZW4gdGhlIGN1cnJlbnQgb25lLlxuKiBUbyBmaW5kIHRoZSBhcmVhIHdlIGp1c3QgZW5lZCB0byBtdWx0aXBseSB0aGUgY29sIGFuZCByb3cgKGNvbnN0YW50cy5USUxFX1NJWkVbc2l6ZV0uY29sICogY29uc3RhbnRzLlRJTEVfU0laRVtzaXplXS5yb3cpXG4qIEBwYXJhbSB7c3RyaW5nfSBjdXJyZW50VGlsZVNpemUgLSBiaWcsIG1lZGl1bSwgc21hbGwsIGVjdC5cbiovXG5UaWxlcy5wcm90b3R5cGUucmVkdWNlVGlsZVNpemUgPSBmdW5jdGlvbihjdXJyZW50VGlsZVNpemUpIHtcbiAgbGV0IGN1cnJlbnRUaWxlID0gY29uc3RhbnRzLlRJTEVfU0laRVtjdXJyZW50VGlsZVNpemVdO1xuICBsZXQgY3VycmVudFRpbGVBcmVhID0gY3VycmVudFRpbGUuY29sICogY3VycmVudFRpbGUucm93O1xuICBsZXQgbmV4dFNpemUgPSBudWxsOyAvLyBUaGlzIHdpbGwgcmV0dXJuIG51bGwgaWYgbm8gc21hbGxlciB0aWxlIGFyZSBmb3VuZC5cbiAgZm9yIChsZXQgc2l6ZSBpbiBjb25zdGFudHMuVElMRV9TSVpFKSB7XG4gICAgbGV0IG5leHRUaWxlQXJlYSA9IGNvbnN0YW50cy5USUxFX1NJWkVbc2l6ZV0uY29sICogY29uc3RhbnRzLlRJTEVfU0laRVtzaXplXS5yb3c7XG4gICAgaWYgKG5leHRUaWxlQXJlYSA8IGN1cnJlbnRUaWxlQXJlYSkge1xuICAgICAgcmV0dXJuIHNpemU7XG4gICAgfVxuICB9XG4gIHJldHVybiBuZXh0U2l6ZTtcbn07XG5cbi8qXG4qIEdldCBtYXggdGlsZSBjb3VudFxuKi9cblRpbGVzLnByb3RvdHlwZS5nZXRNYXhUaWxlQ291bnQgPSBmdW5jdGlvbigpIHtcbiAgbGV0IG1heFRpbGVDb3VudCA9IDA7XG4gIGZvciAobGV0IHNpemUgaW4gY29uc3RhbnRzLlRJTEVfU0laRSkge1xuICAgIG1heFRpbGVDb3VudCA9IG1heFRpbGVDb3VudCArIGNvbnN0YW50cy5USUxFX1NJWkVbc2l6ZV0ubWF4QW1vdW50O1xuICB9XG4gIHJldHVybiBtYXhUaWxlQ291bnQ7XG59O1xuXG4vKlxuKiBCdWlsZCB0aWxlc1xuKi9cblRpbGVzLnByb3RvdHlwZS5idWlsZFRpbGVzID0gZnVuY3Rpb24oKSB7XG4gIGxldCBzaXplID0gbnVsbDtcbiAgbGV0IHRpbGVDb3VudCA9IDA7XG4gIGxldCBtYXhUaWxlID0gdGhpcy5nZXRNYXhUaWxlQ291bnQoKTtcblxuICB0aGlzLnRpbGVzLmZvckVhY2goKHRpbGUsIGluZGV4KSA9PiB7XG4gICAgaWYodGhpcy5jb29yZHMuZnJlZS5sZW5ndGggPiAwICYmIHRpbGVDb3VudCA8IG1heFRpbGUpIHtcblxuICAgICAgdGlsZS5zaXplID0gdGhpcy5nZXROZXh0VGlsZVNpemUodGlsZUNvdW50KTtcbiAgICAgIGxldCBhdmFpbGFibGVBcmVhQ29vcmRzID0gbnVsbDtcblxuICAgICAgLy8gSWYgbm8gc3BhY2Ugd2VyZSBmb3VuZCB0aGF0IG1lYW4gdGhlIHRpbGUgaXMgdG8gYmlnLlxuICAgICAgLy8gTmVlZCB0byBzaXplIGl0IGRvd24gYSBiaXRcbiAgICAgIGxldCBmaW5kTmV4dEF2YWlsYWJsZUFyZWFDb29yZHMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdGlsZS5zaXplID0gdGhpcy5yZWR1Y2VUaWxlU2l6ZSh0aWxlLnNpemUpO1xuICAgICAgICBpZighdGlsZS5zaXplKSB7XG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgYXZhaWxhYmxlQXJlYUNvb3JkcyA9IHRoaXMuZ2V0TmV3VGlsZUFyZWEodGlsZS5zaXplKTtcbiAgICAgICAgaWYoIWF2YWlsYWJsZUFyZWFDb29yZHMpe1xuICAgICAgICAgIHJldHVybiBmaW5kTmV4dEF2YWlsYWJsZUFyZWFDb29yZHMoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXZhaWxhYmxlQXJlYUNvb3JkcztcbiAgICAgIH0uYmluZCh0aGlzKTtcblxuICAgICAgLy8gQ2hlY2sgaWYgd2UgZm91bmQgYSBwbGFjZSBmb3IgdGhlIHRpbGVcbiAgICAgIGF2YWlsYWJsZUFyZWFDb29yZHMgPSBmaW5kTmV4dEF2YWlsYWJsZUFyZWFDb29yZHMoKTtcbiAgICAgIC8vIEp1c3QgbWFraW5nIHN1cmUgd2UgaGF2ZSBzcGFjZSBmb3IgdGhpcyB0aWxlLlxuICAgICAgLy8gV2Ugd29udCBuZWVkIHRoaXMgY29uZGl0aW9uIGFmdGVyIEkgbWFrZSBhIHJlY3Vyc2lvbiBmb3IgdGhlIGRvd25zaXppbmcgdGlsZSBmdW5jdGlvblxuICAgICAgaWYoYXZhaWxhYmxlQXJlYUNvb3Jkcyl7XG4gICAgICAgIHRpbGVDb3VudCsrO1xuICAgICAgICB0aWxlLmtleSA9IGluZGV4O1xuICAgICAgICB0aWxlLnRhcmdldCA9IGF2YWlsYWJsZUFyZWFDb29yZHNbMF07IC8vVGFrZSB0aGUgZmlyc3Qgb25lIGluIHRoZSBhcnJheS4gVGhleSBhcmUgYWxyZWFkeSBzaG92ZWxlZFxuICAgICAgICB0aWxlLmNvbCA9IGNvbnN0YW50cy5USUxFX1NJWkVbdGlsZS5zaXplXS5jb2w7XG4gICAgICAgIHRpbGUucm93ID0gY29uc3RhbnRzLlRJTEVfU0laRVt0aWxlLnNpemVdLnJvdztcbiAgICAgICAgbGV0IG15VGlsZSA9IG5ldyBUaWxlKHRoaXMsIHRpbGUpO1xuXG4gICAgICAgIC8vIFVwZGF0ZSBmcmVlICYgdGFrZW4gY29vcmRzXG4gICAgICAgIGxldCB0aWxlT2NjdXBhdGlvbkNvb3JkcyA9IHRoaXMuZ2V0T2NjdXBhdGlvbkZyb21Db29yZCh7dG90YWxDb2w6IHRpbGUuY29sLCB0b3RhbFJvdzogdGlsZS5yb3csIGNvb3JkOiB0aWxlLnRhcmdldH0pO1xuICAgICAgICB0aWxlT2NjdXBhdGlvbkNvb3Jkcy5mb3JFYWNoKGNvb3JkcyA9PiB7XG4gICAgICAgICAgdGhpcy5wdXRGcmVlQ29vclRvVGFrZW5Db29yKGNvb3Jkcyk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnRpbGVRdWV1ZS5wdXNoKG15VGlsZS5nZXRUaWxlSW5mb3MoKSk7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgLy8gbm8gdGlsZSBhZGRlZCB0byB0aGUgcXVldWUgYmVjYXVzZSB3ZSBkaWQgbm90IGZpbmQgdGhlIHNwYWNlIGZvciBpdFxuICAgICAgfVxuICAgIH1cbiAgfSk7XG59O1xuXG4vKipcbiogVGlsZVxuKiBAcGFyYW0ge29iamVjdH0gZ3JpZFxuKiBAcGFyYW0ge29iamVjdH0gcGFyYW1zXG4qL1xuZnVuY3Rpb24gVGlsZShncmlkLCBwYXJhbXMpIHtcbiAgdGhpcy5ncmlkID0gZ3JpZDtcbiAgdGhpcy5wYXJhbXMgPSBwYXJhbXM7XG59XG5cbi8qXG4qIEdldCB0aWxlIGluZm9zXG4qL1xuVGlsZS5wcm90b3R5cGUuZ2V0VGlsZUluZm9zID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB7XG4gICAgc2l6ZTogdGhpcy5wYXJhbXMuc2l6ZSxcbiAgICB4OiB0aGlzLnBhcmFtcy50YXJnZXQueCAqIHRoaXMuZ3JpZC50aWxlV2lkdGggKiAxMDAgLyB0aGlzLmdyaWQuZ3JpZFdpZHRoLFxuICAgIHk6IHRoaXMucGFyYW1zLnRhcmdldC55ICogdGhpcy5ncmlkLnRpbGVIZWlnaHQgKiAxMDAgLyB0aGlzLmdyaWQuZ3JpZEhlaWdodCxcbiAgICB3aWR0aDogKHRoaXMucGFyYW1zLmNvbCAqIDEwMCAvIHRoaXMuZ3JpZC5jb2wpIC0gdGhpcy5ncmlkLmdyaWRXaWR0aFNwYWNlcixcbiAgICBoZWlnaHQ6ICh0aGlzLnBhcmFtcy5yb3cgKiAxMDAgLyB0aGlzLmdyaWQucm93KSAtIHRoaXMuZ3JpZC5ncmlkSGVpZ2h0U3BhY2VyLFxuICAgIGlkOiB0aGlzLnBhcmFtcy5rZXlcbiAgfTtcbn07XG5cbi8qXG4qIEdldCBkYXRhIGluZm9zXG4qL1xuVGlsZS5wcm90b3R5cGUuZ2V0VGlsZUluZm9zID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB7XG4gICAgc2l6ZTogdGhpcy5wYXJhbXMuc2l6ZSxcbiAgICB4OiB0aGlzLnBhcmFtcy50YXJnZXQueCAqIHRoaXMuZ3JpZC50aWxlV2lkdGggKiAxMDAgLyB0aGlzLmdyaWQuZ3JpZFdpZHRoLFxuICAgIHk6IHRoaXMucGFyYW1zLnRhcmdldC55ICogdGhpcy5ncmlkLnRpbGVIZWlnaHQgKiAxMDAgLyB0aGlzLmdyaWQuZ3JpZEhlaWdodCxcbiAgICB3aWR0aDogKHRoaXMucGFyYW1zLmNvbCAqIDEwMCAvIHRoaXMuZ3JpZC5jb2wpIC0gdGhpcy5ncmlkLmdyaWRXaWR0aFNwYWNlcixcbiAgICBoZWlnaHQ6ICh0aGlzLnBhcmFtcy5yb3cgKiAxMDAgLyB0aGlzLmdyaWQucm93KSAtIHRoaXMuZ3JpZC5ncmlkSGVpZ2h0U3BhY2VyLFxuICAgIGlkOiB0aGlzLnBhcmFtcy5rZXlcbiAgfTtcbn07XG5cblxuLyoqXG4qIE1vemFcbiovXG5jbGFzcyBNb3phIGV4dGVuZHMgVGlsZXMge1xuICAvKlxuICAqIEJ1aWxkXG4gICogQHBhcmFtIHtzdHJpbmd9IGVsXG4gICogQHBhcmFtIHtudW1iZXJ9IGNvbFxuICAqIEBwYXJhbSB7bnVtYmVyfSByb3dcbiAgKi9cbiAgYnVpbGQocGFyYW1zKSB7XG4gICAgdGhpcy5idWlsZEdyaWQocGFyYW1zKTtcbiAgICAvLyBCdWlsZCB0aGUgdGlsZXMuIEF0IHRoaXMgcG9pbnQgd2Ugd2lsbCBoYXZlIHRoZSBzaXplIGFuZCBwb3NpdGlvbiBvZiBhbGwgdGhlIHRpbGVzLlxuICAgIHRoaXMuYnVpbGRUaWxlcygpO1xuICAgIC8vIFRoaXMgd2lsbCBwYXJzZSB0aGVcbiAgICB0aGlzLnNob3dUaWxlKCk7XG4gIH1cbn1cblxuXG5nbG9iYWwuTW96YSA9IE1vemE7XG4iXX0=
