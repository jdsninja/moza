(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = {
  data: {
    url: '../data/default.json'
  },
  // The first tile size have the priority.
  // That mean will parse the tile size from top to bottom.
  // Its better to add the biggest tile at the top.
  TILE_SIZE: {
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

},{}],2:[function(require,module,exports){
(function (global){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _constants = require('./constants');

/**
* Grid
*/

var _constants2 = _interopRequireDefault(_constants);

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
      totalCol = _constants2['default'].TILE_SIZE[tileSize].col,
      totalRow = _constants2['default'].TILE_SIZE[tileSize].row;
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
Tiles.prototype.showTile = function (params) {
  var that = this;
  if (params.url) {
    _utils2['default'].getJSON(params.url).then(function (response) {
      return JSON.parse(response);
    }).then(function (response) {
      that.buildTileElm(response);
    });
  } else {
    this.buildTileElm();
  }
};

/*
* Show tile
*/
Tiles.prototype.buildTileElm = function (response) {
  var _this5 = this;

  this.tileQueue.forEach(function (item, index) {
    var imgUrl = response ? response[index].img : '';
    var node = document.createElement("div");
    node.className = 'tile';
    node.style.cssText = 'top: ' + item.y + '%; left: ' + item.x + '%; width: ' + item.width + '%; height: ' + item.height + '%; background-image: url(' + imgUrl + '); background-size: 100% 100%';
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
  for (var size in _constants2['default'].TILE_SIZE) {
    currentTileCount = currentTileCount + _constants2['default'].TILE_SIZE[size].maxAmount;
    if (tileIndex < currentTileCount) {
      return size;
    }
  }
  return tileSize;
};

/*
* Reduce tile size
* This is checking all the tile size and look for the next area smaller then the current one.
* To find the area we just ened to multiply the col and row (Constants.TILE_SIZE[size].col * Constants.TILE_SIZE[size].row)
* @param {string} currentTileSize - big, medium, small, ect.
*/
Tiles.prototype.reduceTileSize = function (currentTileSize) {
  var currentTile = _constants2['default'].TILE_SIZE[currentTileSize];
  var currentTileArea = currentTile.col * currentTile.row;
  var nextSize = null; // This will return null if no smaller tile are found.
  for (var size in _constants2['default'].TILE_SIZE) {
    var nextTileArea = _constants2['default'].TILE_SIZE[size].col * _constants2['default'].TILE_SIZE[size].row;
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
  for (var size in _constants2['default'].TILE_SIZE) {
    maxTileCount = maxTileCount + _constants2['default'].TILE_SIZE[size].maxAmount;
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
          tile.col = _constants2['default'].TILE_SIZE[tile.size].col;
          tile.row = _constants2['default'].TILE_SIZE[tile.size].row;
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
      this.showTile(params);
    }
  }]);

  return Moza;
})(Tiles);

global.Moza = Moza;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./constants":1,"./utils":3}],3:[function(require,module,exports){
'use strict';

function getJSON(url) {
  // Return a new promise.
  return new Promise(function (resolve, reject) {
    // Do the usual XHR stuff
    var req = new XMLHttpRequest();
    req.open('GET', url);

    req.onload = function () {
      // This is called even on 404 etc
      // so check the status
      if (req.status == 200) {
        // Resolve the promise with the response text
        resolve(req.response);
      } else {
        // Otherwise reject with the status text
        // which will hopefully be a meaningful error
        reject(Error(req.statusText));
      }
    };

    // Handle network errors
    req.onerror = function () {
      reject(Error("Network Error"));
    };

    // Make the request
    req.send();
  });
}

module.exports = {
  getJSON: getJSON
};

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvamVyb21lZHNvdWN5L1NpdGVzL21vemEvc3JjL2pzL2NvbnN0YW50cy5qcyIsIi9Vc2Vycy9qZXJvbWVkc291Y3kvU2l0ZXMvbW96YS9zcmMvanMvbW96YS5qcyIsIi9Vc2Vycy9qZXJvbWVkc291Y3kvU2l0ZXMvbW96YS9zcmMvanMvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7O0FBRWIsTUFBTSxDQUFDLE9BQU8sR0FBRztBQUNmLE1BQUksRUFBRTtBQUNKLE9BQUcsRUFBRSxzQkFBc0I7R0FDNUI7Ozs7QUFJRCxXQUFTLEVBQUU7QUFDVCxPQUFHLEVBQUU7QUFDSCxlQUFTLEVBQUUsQ0FBQztBQUNaLFNBQUcsRUFBRSxDQUFDO0FBQ04sU0FBRyxFQUFFLENBQUM7S0FDUDtBQUNELE1BQUUsRUFBRTtBQUNGLGVBQVMsRUFBRSxDQUFDO0FBQ1osU0FBRyxFQUFFLENBQUM7QUFDTixTQUFHLEVBQUUsQ0FBQztLQUNQO0FBQ0QsS0FBQyxFQUFFO0FBQ0QsZUFBUyxFQUFFLEVBQUU7QUFDYixTQUFHLEVBQUUsQ0FBQztBQUNOLFNBQUcsRUFBRSxDQUFDO0tBQ1A7QUFDRCxLQUFDLEVBQUU7QUFDRCxlQUFTLEVBQUUsRUFBRTtBQUNiLFNBQUcsRUFBRSxDQUFDO0FBQ04sU0FBRyxFQUFFLENBQUM7S0FDUDtBQUNELEtBQUMsRUFBRTtBQUNELGVBQVMsRUFBRSxFQUFFO0FBQ2IsU0FBRyxFQUFFLENBQUM7QUFDTixTQUFHLEVBQUUsQ0FBQztLQUNQO0FBQ0QsTUFBRSxFQUFFO0FBQ0YsZUFBUyxFQUFFLEVBQUU7QUFDYixTQUFHLEVBQUUsQ0FBQztBQUNOLFNBQUcsRUFBRSxDQUFDO0tBQ1A7R0FDRjtDQUNGLENBQUM7Ozs7QUN6Q0YsWUFBWSxDQUFDOzs7Ozs7Ozs7Ozs7cUJBRUss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QSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBRTtBQUNyRyxTQUFPLENBQUMsQ0FBQztDQUNWLENBQUM7Ozs7Ozs7QUFPRixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxVQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDckMsU0FBTyxFQUFDLENBQUMsRUFBRCxDQUFDLEVBQUUsQ0FBQyxFQUFELENBQUMsRUFBQyxDQUFDO0NBQ2pCLENBQUM7Ozs7O0FBS0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsWUFBVztBQUNwQyxPQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNqQyxTQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNqQyxVQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUMzQztHQUNGOztBQUVELE1BQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO0NBQ3BDLENBQUM7Ozs7OztBQU1GLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFHLFlBQVc7OztBQUNyQyxNQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBQSxL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Q0FBQyxDQUFDO09BQ3ZCLE1BQ0k7OztBQUdILGNBQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7T0FDL0I7S0FDRixDQUFDOzs7QUFHRixPQUFHLENBQUMsT0FBTyxHQUFHLFlBQVc7QUFDdkIsWUFBTSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO0tBQ2hDLENBQUM7OztBQUdGLE9BQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztHQUNaLENBQUMsQ0FBQztDQUNKOztBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUc7QUFDZixTQUFPLEVBQVAsT0FBTztDQUNSLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZGF0YToge1xuICAgIHVybDogJy4uL2RhdGEvZGVmYXVsdC5qc29uJ1xuICB9LFxuICAvLyBUaGUgZmlyc3QgdGlsZSBzaXplIGhhdmUgdGhlIHByaW9yaXR5LlxuICAvLyBUaGF0IG1lYW4gd2lsbCBwYXJzZSB0aGUgdGlsZSBzaXplIGZyb20gdG9wIHRvIGJvdHRvbS5cbiAgLy8gSXRzIGJldHRlciB0byBhZGQgdGhlIGJpZ2dlc3QgdGlsZSBhdCB0aGUgdG9wLlxuICBUSUxFX1NJWkU6IHtcbiAgICBYWEw6IHtcbiAgICAgIG1heEFtb3VudDogMSxcbiAgICAgIGNvbDogNSxcbiAgICAgIHJvdzogNVxuICAgIH0sXG4gICAgWEw6IHtcbiAgICAgIG1heEFtb3VudDogMixcbiAgICAgIGNvbDogNCxcbiAgICAgIHJvdzogNFxuICAgIH0sXG4gICAgTDoge1xuICAgICAgbWF4QW1vdW50OiAxMCxcbiAgICAgIGNvbDogMyxcbiAgICAgIHJvdzogMlxuICAgIH0sXG4gICAgTToge1xuICAgICAgbWF4QW1vdW50OiAxMCxcbiAgICAgIGNvbDogMixcbiAgICAgIHJvdzogMlxuICAgIH0sXG4gICAgUzoge1xuICAgICAgbWF4QW1vdW50OiAxMCxcbiAgICAgIGNvbDogMixcbiAgICAgIHJvdzogMVxuICAgIH0sXG4gICAgWFM6IHtcbiAgICAgIG1heEFtb3VudDogNTAsXG4gICAgICBjb2w6IDEsXG4gICAgICByb3c6IDFcbiAgICB9XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBVdGlscyBmcm9tICcuL3V0aWxzJztcbmltcG9ydCBDb25zdGFudHMgZnJvbSAnLi9jb25zdGFudHMnO1xuXG4vKipcbiogR3JpZFxuKi9cbmZ1bmN0aW9uIEdyaWQoKSB7XG4gIHRoaXMuY29udGFpbmVyID0gbnVsbDtcbiAgdGhpcy5ncmlkV2lkdGggPSBudWxsO1xuICB0aGlzLmdyaWRIZWlnaHQgPSBudWxsO1xuICB0aGlzLmNvbCA9IG51bGw7XG4gIHRoaXMucm93ID0gbnVsbDtcbiAgdGhpcy5ncmlkV2lkdGhTcGFjZXIgPSBudWxsO1xuICB0aGlzLmdyaWRIZWlnaHRTcGFjZXIgPSBudWxsO1xuICB0aGlzLnRpbGVXaWR0aCA9IG51bGw7XG4gIHRoaXMudGlsZUhlaWdodCA9IG51bGw7XG4gIHRoaXMuY29vcmRzID0ge1xuICAgIGFsbDogW10sXG4gICAgZnJlZTogW10sXG4gICAgdGFrZW46IFtdXG4gIH07XG59XG5cbi8qKlxuKiBDaGVjayBhdmFpbGFiaWxpdHkgb2YgY29vcmRzIGZyb20gY29vcmRcbiogQHBhcmFtIHtvYmplY3R9IGNvb3Jkc1xuKi9cbkdyaWQucHJvdG90eXBlLmNoZWNrQXZhaWxhYmlsaXR5T2ZDb29yZHNGcm9tQ29vcmQgPSBmdW5jdGlvbihjb29yZHMpIHtcbiAgbGV0IHkgPSAwO1xuICBjb29yZHMuZm9yRWFjaChjb29yZCA9PiB7XG4gICAgbGV0IGkgPSB0aGlzLmNvb3Jkcy5mcmVlLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBpZiAodGhpcy5jb29yZHMuZnJlZVtpXS54ID09PSBjb29yZC54ICYmIHRoaXMuY29vcmRzLmZyZWVbaV0ueSA9PT0gY29vcmQueSkge1xuICAgICAgICB5Kys7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGNvb3Jkcy5sZW5ndGggPT09IHk7XG59O1xuXG4vKlxuKiBHZXQgb2NjdXBhdGlvbiBmcm9tIGNvb3JkXG4qIFRoaXMgd2lsbCBnZXQgYW4gYXJyYXkgd2l0aCBhbGwgdGhlIHBvaW50IG9jY3VwZWQgYnkgdGhlIHRpbGVcbiogQHBhcmFtIHtudW1iZXJ9IHRvdGFsQ29sXG4qIEBwYXJhbSB7bnVtYmVyfSB0b3RhbFJvd1xuKiBAcGFyYW0ge29iamVjdH0gY29vcmRcbiovXG5HcmlkLnByb3RvdHlwZS5nZXRPY2N1cGF0aW9uRnJvbUNvb3JkID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gIHZhciB7dG90YWxDb2wsIHRvdGFsUm93LCBjb29yZH0gPSBwYXJhbXM7XG4gIGxldCBjb29yZHMgPSBbXTtcbiAgaWYgKGNvb3JkKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b3RhbENvbDsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRvdGFsUm93OyBqKyspIHtcbiAgICAgICAgY29vcmRzLnB1c2godGhpcy5nZXRDb29yZChpICsgY29vcmQueCwgaiArIGNvb3JkLnkpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvb3JkcztcbiAgfVxuICAvLyB0b2RvOiBzaG91bGQgcmV0dXJuIHNvbWV0aGluZyBhbnl3YXlcbn07XG5cbi8qXG4qIEdldCBuZXcgdGlsZUFyZWFcbiogSXRlcmF0ZSBhY3Jvc3MgZWFjaCBmcmVlIGNvb3JkaW5hdGVzIHRvIHRlc3QgaWYgdGhlIHRpbGUgY2FuIGJlIHBsYWNlZFxuKiBAcGFyYW0ge3N0cmluZ30gdGlsZVNpemVcbiogQHJldHVybnMge2FycmF5fHVuZGVmaW5lZH1cbiovXG5HcmlkLnByb3RvdHlwZS5nZXROZXdUaWxlQXJlYSA9IGZ1bmN0aW9uKHRpbGVTaXplKSB7XG4gIGxldCB0YXJnZXRzID0gW10sXG4gICAgIHRvdGFsQ29sID0gQ29uc3RhbnRzLlRJTEVfU0laRVt0aWxlU2l6ZV0uY29sLFxuICAgICB0b3RhbFJvdyA9IENvbnN0YW50cy5USUxFX1NJWkVbdGlsZVNpemVdLnJvdztcbiAgdGhpcy5jb29yZHMuZnJlZS5mb3JFYWNoKGZyZWVDb29yZCA9PiB7XG4gICAgLy8gbWFrZSBzdXJlIHRoZSB0aWxlIGVuZGluZyBlbmQgZG9uJ3QgZ28gZnV0aGVyIHRoZW4gdGhlIGdyaWQgZWRnZVxuICAgIGxldCB0aWxlUmlnaHRFZGdlID0gKGZyZWVDb29yZC54ICsgdG90YWxDb2wpICogdGhpcy50aWxlV2lkdGgsXG4gICAgICAgIHRpbGVCb3R0b21FZGdlID0gKGZyZWVDb29yZC55ICsgdG90YWxSb3cpICogdGhpcy50aWxlSGVpZ2h0O1xuICAgIGlmICh0aWxlUmlnaHRFZGdlIDw9IHRoaXMuZ3JpZFdpZHRoICYmIHRpbGVCb3R0b21FZGdlIDw9IHRoaXMuZ3JpZEhlaWdodCkge1xuICAgICAgLy8gV2UganN1dCBmb25kIGEgZ29vZCBzcG90IGZvciB0aGlzIHRpbGUuXG4gICAgICAvLyBJdCdzIHRpbWUgdG8gY2hlY2sgaWYgdGhlIGFyZWEgaXMgY2xlYXIuXG4gICAgICBsZXQgY29vcmRzID0gdGhpcy5nZXRPY2N1cGF0aW9uRnJvbUNvb3JkKHt0b3RhbENvbCwgdG90YWxSb3csIGNvb3JkOiBmcmVlQ29vcmR9KTtcbiAgICAgIGlmICh0aGlzLmNoZWNrQXZhaWxhYmlsaXR5T2ZDb29yZHNGcm9tQ29vcmQoY29vcmRzKSkge1xuICAgICAgICB0YXJnZXRzLnB1c2goZnJlZUNvb3JkKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICAvLyBJZiB0aGUgdGFyZ2V0cyBpcyBlbXB0eSB0aGF0IG1lYW4gMiB0aGluZ3M6XG4gIC8vIC0gdGhlIHRpbGUgd2FzIHRvIGJpZ1xuICAvLyAtIHRoZSB0aWxlIGhhZCB0aGUgcmlnaHQgc2l6ZSBidXQgbm8gYXJlYSB3YXMgYXZhaWxhYmxlXG4gIHJldHVybiB0YXJnZXRzLmxlbmd0aCA+IDAgPyB0aGlzLnNodWZmbGUodGFyZ2V0cykgOiB1bmRlZmluZWQ7XG59O1xuXG4vKlxuKiBQdXQgZnJlZSBjb29yIHRvIHRha2VuIGNvb3JcbiogQHBhcmFtIHtvYmplY3R9IGNvb3JkXG4qL1xuR3JpZC5wcm90b3R5cGUucHV0RnJlZUNvb3JUb1Rha2VuQ29vciA9IGZ1bmN0aW9uKGNvb3JkKSB7XG4gIC8vdG9kbzogUmVtb3ZlIHRoZSBpZiBzdGF0ZW1lbnQgYW5kIGFkZCBhIGZpbHRlciBiZWZvcmUgZm9yRWFjaFxuICB0aGlzLmNvb3Jkcy5mcmVlLmZvckVhY2goKG15Q29vcmQsIGluZGV4KSA9PiB7XG4gICAgLy8gdG9kbzogY2xlYW4gdGhpcyB1cFxuICAgIGlmIChteUNvb3JkLnggPT09IGNvb3JkLnggJiYgbXlDb29yZC55ID09PSBjb29yZC55KSB7XG4gICAgICB0aGlzLmNvb3Jkcy5mcmVlLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9KTtcbiAgdGhpcy5jb29yZHMudGFrZW4ucHVzaChjb29yZCk7XG59O1xuXG4vKlxuKiBTaHVmZmxlXG4qIEBwYXJhbSB7b2JqZWN0fSBvXG4qL1xuR3JpZC5wcm90b3R5cGUuc2h1ZmZsZSA9IGZ1bmN0aW9uKG8pIHtcbiAgZm9yKGxldCBqLCB4LCBpID0gby5sZW5ndGg7IGk7IGogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBpKSwgeCA9IG9bLS1pXSwgb1tpXSA9IG9bal0sIG9bal0gPSB4KTtcbiAgcmV0dXJuIG87XG59O1xuXG4vKlxuKiBHZXQgY29vcmRcbiogQHBhcmFtIHtudW1iZXJ9IHhcbiogQHBhcmFtIHtudW1iZXJ9IHlcbiovXG5HcmlkLnByb3RvdHlwZS5nZXRDb29yZCA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICByZXR1cm4ge3gsIHl9O1xufTtcblxuLypcbiogU2V0IGNvb3Jkc1xuKi9cbkdyaWQucHJvdG90eXBlLnNldENvb3JkcyA9IGZ1bmN0aW9uKCkge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29sOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMucm93OyBqKyspIHtcbiAgICAgIHRoaXMuY29vcmRzLmFsbC5wdXNoKHRoaXMuZ2V0Q29vcmQoaSwgaikpO1xuICAgIH1cbiAgfVxuICAvLyAgQ2xvbmUgdGhlIGFycmF5WSBvZiBhbGwgcG9zaXRpb24gYW5kIGFkZCBpdCB0byBmcmVlIHBvc2l0aW9uIGFycmF5LlxuICB0aGlzLmNvb3Jkcy5mcmVlID0gdGhpcy5jb29yZHMuYWxsO1xufTtcblxuLypcbiogU2hvdyBjb29yZHNcbiogVGhpcyB3aWxsIHNob3cgYmxhY2sgZG90cyBmb3IgZWFjaCBjb29yZG9uYXRlXG4qL1xuR3JpZC5wcm90b3R5cGUuc2hvd0Nvb3JkcyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmNvb3Jkcy5hbGwuZm9yRWFjaChjb29yZCA9PiB7XG4gICAgbGV0IGxlZnQgPSB0aGlzLmdyaWRXaWR0aCAvIHRoaXMuY29sICogY29vcmQueDtcbiAgICBsZXQgdG9wID0gdGhpcy5ncmlkSGVpZ2h0IC8gdGhpcy5yb3cgKiBjb29yZC55O1xuICAgIGxlZnQgPSBsZWZ0ICogMTAwIC8gdGhpcy5ncmlkV2lkdGg7XG4gICAgdG9wID0gdG9wICogMTAwIC8gdGhpcy5ncmlkSGVpZ2h0O1xuICAgIGxldCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIkRJVlwiKTtcbiAgICBub2RlLnN0eWxlLmNzc1RleHQgPSBgdG9wOiAke3RvcC0wLjV9JTsgbGVmdDogJHtsZWZ0LTAuMn0lYDtcbiAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZChub2RlKTtcbiAgfSk7XG59O1xuXG4vKlxuKiBCdWlsZCBncmlkXG4qIEBwYXJhbSB7c3RyaW5nfSBlbFxuKiBAcGFyYW0ge251bWJlcn0gZ0NvbFxuKiBAcGFyYW0ge251bWJlcn0gZ1Jvd1xuKi9cbkdyaWQucHJvdG90eXBlLmJ1aWxkR3JpZCA9IGZ1bmN0aW9uKHBhcmFtcykge1xuICB2YXIge2VsLCBjb2wsIHJvd30gPSBwYXJhbXM7XG4gIHRoaXMuZWwgPSBlbDtcbiAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbCk7XG4gIHRoaXMuZ3JpZFdpZHRoID0gdGhpcy5jb250YWluZXIuY2xpZW50V2lkdGg7XG4gIHRoaXMuZ3JpZEhlaWdodCA9IHRoaXMuY29udGFpbmVyLmNsaWVudEhlaWdodDtcbiAgdGhpcy5jb2wgPSBjb2w7Ly90b2RvOiB0aGlzIHNob3VsZCBiZSBtb3JlIHNwZWNpZmljLiBpdCB3aWxsIGhlbHAgdW5kZXJzdGFuZCB0aGUgY29kZSB3aGVuIHdlIGNhbGwgdGhpcyBmcm9tIGEgc3ViIGZ1bmN0aW9uLlxuICB0aGlzLnJvdyA9IHJvdztcbiAgdGhpcy5ncmlkV2lkdGhTcGFjZXIgPSAyICogMTAwIC8gdGhpcy5ncmlkV2lkdGg7XG4gIHRoaXMuZ3JpZEhlaWdodFNwYWNlciA9IDIgKiAxMDAgLyB0aGlzLmdyaWRIZWlnaHQ7XG4gIHRoaXMudGlsZVdpZHRoID0gdGhpcy5ncmlkV2lkdGggLyBjb2w7IC8vdG9kbzogZmluZCBhIG1vcmUgc3BlY2lmaWMgbmFtZSBmb3IgdGhpcy4gaXRzIG1vcmUgYSB6b25lIG9yIGFyZWEgdGhlbiB0aWxlXG4gIHRoaXMudGlsZUhlaWdodCA9IHRoaXMuZ3JpZEhlaWdodCAvIHJvdztcblxuICAvLyBTZXQgY29vcmRvbmF0ZVxuICB0aGlzLnNldENvb3JkcygpO1xuICB0aGlzLnNob3dDb29yZHMoKTtcbn07XG5cbi8qKlxuKiBUaWxlXG4qL1xuVGlsZXMucHJvdG90eXBlID0gbmV3IEdyaWQoKTsgLy8gaW5oZXJpdCBmcm9tIEdyaWRcblRpbGVzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbGVzO1xuZnVuY3Rpb24gVGlsZXMoKSB7XG4gIHRoaXMudGlsZXMgPSBbXTtcbiAgdGhpcy50aWxlUXVldWUgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IDQwOyBpIDwgbGVuOyBpKyspIHtcbiAgICB0aGlzLnRpbGVzLnB1c2goe1xuICAgICAgaWQ6IGksXG4gICAgICB0aXRsZTogJ3RpdGxlJyxcbiAgICAgIGltZzogJydcbiAgICB9KTtcbiAgfVxufVxuXG4vKlxuKiBTaG93IHRpbGVcbiovXG5UaWxlcy5wcm90b3R5cGUuc2hvd1RpbGUgPSBmdW5jdGlvbihwYXJhbXMpIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICBpZihwYXJhbXMudXJsKXtcbiAgICBVdGlscy5nZXRKU09OKHBhcmFtcy51cmwpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKHJlc3BvbnNlKTtcbiAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICB0aGF0LmJ1aWxkVGlsZUVsbShyZXNwb25zZSk7XG4gICAgfSk7XG4gIH1lbHNle1xuICAgIHRoaXMuYnVpbGRUaWxlRWxtKCk7XG4gIH1cbn07XG5cbi8qXG4qIFNob3cgdGlsZVxuKi9cblRpbGVzLnByb3RvdHlwZS5idWlsZFRpbGVFbG0gPSBmdW5jdGlvbihyZXNwb25zZSl7XG4gIHRoaXMudGlsZVF1ZXVlLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgbGV0IGltZ1VybCA9IHJlc3BvbnNlID8gcmVzcG9uc2VbaW5kZXhdLmltZyA6ICcnO1xuICAgIGxldCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBub2RlLmNsYXNzTmFtZSA9ICd0aWxlJztcbiAgICBub2RlLnN0eWxlLmNzc1RleHQgPSBgdG9wOiAke2l0ZW0ueX0lOyBsZWZ0OiAke2l0ZW0ueH0lOyB3aWR0aDogJHtpdGVtLndpZHRofSU7IGhlaWdodDogJHtpdGVtLmhlaWdodH0lOyBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJHtpbWdVcmx9KTsgYmFja2dyb3VuZC1zaXplOiAxMDAlIDEwMCVgO1xuICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKG5vZGUpO1xuICB9KTtcbn07XG5cbi8qXG4qIEdldCBuZXh0IHRpbGUgc2l6ZVxuKiBUaGlzIHdpbGwgZ2V0IHRoZSBuZXh0IHRpbGUgc2l6ZSB0byB1c2UuXG4qIEBwYXJhbSB7c3RyaW5nfSB0aWxlSW5kZXhcbiovXG5UaWxlcy5wcm90b3R5cGUuZ2V0TmV4dFRpbGVTaXplID0gZnVuY3Rpb24odGlsZUluZGV4KSB7XG4gIGxldCBjdXJyZW50VGlsZUNvdW50ID0gMDtcbiAgbGV0IHRpbGVTaXplID0gbnVsbDtcbiAgZm9yKGxldCBzaXplIGluIENvbnN0YW50cy5USUxFX1NJWkUpe1xuICAgIGN1cnJlbnRUaWxlQ291bnQgPSBjdXJyZW50VGlsZUNvdW50ICsgQ29uc3RhbnRzLlRJTEVfU0laRVtzaXplXS5tYXhBbW91bnQ7XG4gICAgaWYodGlsZUluZGV4IDwgY3VycmVudFRpbGVDb3VudCl7XG4gICAgICByZXR1cm4gc2l6ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRpbGVTaXplO1xufTtcblxuLypcbiogUmVkdWNlIHRpbGUgc2l6ZVxuKiBUaGlzIGlzIGNoZWNraW5nIGFsbCB0aGUgdGlsZSBzaXplIGFuZCBsb29rIGZvciB0aGUgbmV4dCBhcmVhIHNtYWxsZXIgdGhlbiB0aGUgY3VycmVudCBvbmUuXG4qIFRvIGZpbmQgdGhlIGFyZWEgd2UganVzdCBlbmVkIHRvIG11bHRpcGx5IHRoZSBjb2wgYW5kIHJvdyAoQ29uc3RhbnRzLlRJTEVfU0laRVtzaXplXS5jb2wgKiBDb25zdGFudHMuVElMRV9TSVpFW3NpemVdLnJvdylcbiogQHBhcmFtIHtzdHJpbmd9IGN1cnJlbnRUaWxlU2l6ZSAtIGJpZywgbWVkaXVtLCBzbWFsbCwgZWN0LlxuKi9cblRpbGVzLnByb3RvdHlwZS5yZWR1Y2VUaWxlU2l6ZSA9IGZ1bmN0aW9uKGN1cnJlbnRUaWxlU2l6ZSkge1xuICBsZXQgY3VycmVudFRpbGUgPSBDb25zdGFudHMuVElMRV9TSVpFW2N1cnJlbnRUaWxlU2l6ZV07XG4gIGxldCBjdXJyZW50VGlsZUFyZWEgPSBjdXJyZW50VGlsZS5jb2wgKiBjdXJyZW50VGlsZS5yb3c7XG4gIGxldCBuZXh0U2l6ZSA9IG51bGw7IC8vIFRoaXMgd2lsbCByZXR1cm4gbnVsbCBpZiBubyBzbWFsbGVyIHRpbGUgYXJlIGZvdW5kLlxuICBmb3IgKGxldCBzaXplIGluIENvbnN0YW50cy5USUxFX1NJWkUpIHtcbiAgICBsZXQgbmV4dFRpbGVBcmVhID0gQ29uc3RhbnRzLlRJTEVfU0laRVtzaXplXS5jb2wgKiBDb25zdGFudHMuVElMRV9TSVpFW3NpemVdLnJvdztcbiAgICBpZiAobmV4dFRpbGVBcmVhIDwgY3VycmVudFRpbGVBcmVhKSB7XG4gICAgICByZXR1cm4gc2l6ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5leHRTaXplO1xufTtcblxuLypcbiogR2V0IG1heCB0aWxlIGNvdW50XG4qL1xuVGlsZXMucHJvdG90eXBlLmdldE1heFRpbGVDb3VudCA9IGZ1bmN0aW9uKCkge1xuICBsZXQgbWF4VGlsZUNvdW50ID0gMDtcbiAgZm9yIChsZXQgc2l6ZSBpbiBDb25zdGFudHMuVElMRV9TSVpFKSB7XG4gICAgbWF4VGlsZUNvdW50ID0gbWF4VGlsZUNvdW50ICsgQ29uc3RhbnRzLlRJTEVfU0laRVtzaXplXS5tYXhBbW91bnQ7XG4gIH1cbiAgcmV0dXJuIG1heFRpbGVDb3VudDtcbn07XG5cbi8qXG4qIEJ1aWxkIHRpbGVzXG4qL1xuVGlsZXMucHJvdG90eXBlLmJ1aWxkVGlsZXMgPSBmdW5jdGlvbigpIHtcbiAgbGV0IHNpemUgPSBudWxsO1xuICBsZXQgdGlsZUNvdW50ID0gMDtcbiAgbGV0IG1heFRpbGUgPSB0aGlzLmdldE1heFRpbGVDb3VudCgpO1xuXG4gIHRoaXMudGlsZXMuZm9yRWFjaCgodGlsZSwgaW5kZXgpID0+IHtcbiAgICBpZih0aGlzLmNvb3Jkcy5mcmVlLmxlbmd0aCA+IDAgJiYgdGlsZUNvdW50IDwgbWF4VGlsZSkge1xuXG4gICAgICB0aWxlLnNpemUgPSB0aGlzLmdldE5leHRUaWxlU2l6ZSh0aWxlQ291bnQpO1xuICAgICAgbGV0IGF2YWlsYWJsZUFyZWFDb29yZHMgPSBudWxsO1xuXG4gICAgICAvLyBJZiBubyBzcGFjZSB3ZXJlIGZvdW5kIHRoYXQgbWVhbiB0aGUgdGlsZSBpcyB0byBiaWcuXG4gICAgICAvLyBOZWVkIHRvIHNpemUgaXQgZG93biBhIGJpdFxuICAgICAgbGV0IGZpbmROZXh0QXZhaWxhYmxlQXJlYUNvb3JkcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aWxlLnNpemUgPSB0aGlzLnJlZHVjZVRpbGVTaXplKHRpbGUuc2l6ZSk7XG4gICAgICAgIGlmKCF0aWxlLnNpemUpIHtcbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGxldCBhdmFpbGFibGVBcmVhQ29vcmRzID0gdGhpcy5nZXROZXdUaWxlQXJlYSh0aWxlLnNpemUpO1xuICAgICAgICBpZighYXZhaWxhYmxlQXJlYUNvb3Jkcyl7XG4gICAgICAgICAgcmV0dXJuIGZpbmROZXh0QXZhaWxhYmxlQXJlYUNvb3JkcygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhdmFpbGFibGVBcmVhQ29vcmRzO1xuICAgICAgfS5iaW5kKHRoaXMpO1xuXG4gICAgICAvLyBDaGVjayBpZiB3ZSBmb3VuZCBhIHBsYWNlIGZvciB0aGUgdGlsZVxuICAgICAgYXZhaWxhYmxlQXJlYUNvb3JkcyA9IGZpbmROZXh0QXZhaWxhYmxlQXJlYUNvb3JkcygpO1xuICAgICAgLy8gSnVzdCBtYWtpbmcgc3VyZSB3ZSBoYXZlIHNwYWNlIGZvciB0aGlzIHRpbGUuXG4gICAgICAvLyBXZSB3b250IG5lZWQgdGhpcyBjb25kaXRpb24gYWZ0ZXIgSSBtYWtlIGEgcmVjdXJzaW9uIGZvciB0aGUgZG93bnNpemluZyB0aWxlIGZ1bmN0aW9uXG4gICAgICBpZihhdmFpbGFibGVBcmVhQ29vcmRzKXtcbiAgICAgICAgdGlsZUNvdW50Kys7XG4gICAgICAgIHRpbGUua2V5ID0gaW5kZXg7XG4gICAgICAgIHRpbGUudGFyZ2V0ID0gYXZhaWxhYmxlQXJlYUNvb3Jkc1swXTsgLy9UYWtlIHRoZSBmaXJzdCBvbmUgaW4gdGhlIGFycmF5LiBUaGV5IGFyZSBhbHJlYWR5IHNob3ZlbGVkXG4gICAgICAgIHRpbGUuY29sID0gQ29uc3RhbnRzLlRJTEVfU0laRVt0aWxlLnNpemVdLmNvbDtcbiAgICAgICAgdGlsZS5yb3cgPSBDb25zdGFudHMuVElMRV9TSVpFW3RpbGUuc2l6ZV0ucm93O1xuICAgICAgICBsZXQgbXlUaWxlID0gbmV3IFRpbGUodGhpcywgdGlsZSk7XG5cbiAgICAgICAgLy8gVXBkYXRlIGZyZWUgJiB0YWtlbiBjb29yZHNcbiAgICAgICAgbGV0IHRpbGVPY2N1cGF0aW9uQ29vcmRzID0gdGhpcy5nZXRPY2N1cGF0aW9uRnJvbUNvb3JkKHt0b3RhbENvbDogdGlsZS5jb2wsIHRvdGFsUm93OiB0aWxlLnJvdywgY29vcmQ6IHRpbGUudGFyZ2V0fSk7XG4gICAgICAgIHRpbGVPY2N1cGF0aW9uQ29vcmRzLmZvckVhY2goY29vcmRzID0+IHtcbiAgICAgICAgICB0aGlzLnB1dEZyZWVDb29yVG9UYWtlbkNvb3IoY29vcmRzKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudGlsZVF1ZXVlLnB1c2gobXlUaWxlLmdldFRpbGVJbmZvcygpKTtcbiAgICAgIH1lbHNle1xuICAgICAgICAvLyBubyB0aWxlIGFkZGVkIHRvIHRoZSBxdWV1ZSBiZWNhdXNlIHdlIGRpZCBub3QgZmluZCB0aGUgc3BhY2UgZm9yIGl0XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn07XG5cbi8qKlxuKiBUaWxlXG4qIEBwYXJhbSB7b2JqZWN0fSBncmlkXG4qIEBwYXJhbSB7b2JqZWN0fSBwYXJhbXNcbiovXG5mdW5jdGlvbiBUaWxlKGdyaWQsIHBhcmFtcykge1xuICB0aGlzLmdyaWQgPSBncmlkO1xuICB0aGlzLnBhcmFtcyA9IHBhcmFtcztcbn1cblxuLypcbiogR2V0IHRpbGUgaW5mb3NcbiovXG5UaWxlLnByb3RvdHlwZS5nZXRUaWxlSW5mb3MgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHtcbiAgICBzaXplOiB0aGlzLnBhcmFtcy5zaXplLFxuICAgIHg6IHRoaXMucGFyYW1zLnRhcmdldC54ICogdGhpcy5ncmlkLnRpbGVXaWR0aCAqIDEwMCAvIHRoaXMuZ3JpZC5ncmlkV2lkdGgsXG4gICAgeTogdGhpcy5wYXJhbXMudGFyZ2V0LnkgKiB0aGlzLmdyaWQudGlsZUhlaWdodCAqIDEwMCAvIHRoaXMuZ3JpZC5ncmlkSGVpZ2h0LFxuICAgIHdpZHRoOiAodGhpcy5wYXJhbXMuY29sICogMTAwIC8gdGhpcy5ncmlkLmNvbCkgLSB0aGlzLmdyaWQuZ3JpZFdpZHRoU3BhY2VyLFxuICAgIGhlaWdodDogKHRoaXMucGFyYW1zLnJvdyAqIDEwMCAvIHRoaXMuZ3JpZC5yb3cpIC0gdGhpcy5ncmlkLmdyaWRIZWlnaHRTcGFjZXIsXG4gICAgaWQ6IHRoaXMucGFyYW1zLmtleVxuICB9O1xufTtcblxuLyoqXG4qIE1vemFcbiovXG5jbGFzcyBNb3phIGV4dGVuZHMgVGlsZXMge1xuICAvKlxuICAqIEJ1aWxkXG4gICogQHBhcmFtIHtzdHJpbmd9IGVsXG4gICogQHBhcmFtIHtudW1iZXJ9IGNvbFxuICAqIEBwYXJhbSB7bnVtYmVyfSByb3dcbiAgKi9cbiAgYnVpbGQocGFyYW1zKSB7XG4gICAgdGhpcy5idWlsZEdyaWQocGFyYW1zKTtcbiAgICAvLyBCdWlsZCB0aGUgdGlsZXMuIEF0IHRoaXMgcG9pbnQgd2Ugd2lsbCBoYXZlIHRoZSBzaXplIGFuZCBwb3NpdGlvbiBvZiBhbGwgdGhlIHRpbGVzLlxuICAgIHRoaXMuYnVpbGRUaWxlcygpO1xuICAgIC8vIFRoaXMgd2lsbCBwYXJzZSB0aGVcbiAgICB0aGlzLnNob3dUaWxlKHBhcmFtcyk7XG4gIH1cbn1cblxuZ2xvYmFsLk1vemEgPSBNb3phO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBnZXRKU09OKHVybCkge1xuICAvLyBSZXR1cm4gYSBuZXcgcHJvbWlzZS5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgIC8vIERvIHRoZSB1c3VhbCBYSFIgc3R1ZmZcbiAgICB2YXIgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgcmVxLm9wZW4oJ0dFVCcsIHVybCk7XG5cbiAgICByZXEub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAvLyBUaGlzIGlzIGNhbGxlZCBldmVuIG9uIDQwNCBldGNcbiAgICAgIC8vIHNvIGNoZWNrIHRoZSBzdGF0dXNcbiAgICAgIGlmIChyZXEuc3RhdHVzID09IDIwMCkge1xuICAgICAgICAvLyBSZXNvbHZlIHRoZSBwcm9taXNlIHdpdGggdGhlIHJlc3BvbnNlIHRleHRcbiAgICAgICAgcmVzb2x2ZShyZXEucmVzcG9uc2UpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIC8vIE90aGVyd2lzZSByZWplY3Qgd2l0aCB0aGUgc3RhdHVzIHRleHRcbiAgICAgICAgLy8gd2hpY2ggd2lsbCBob3BlZnVsbHkgYmUgYSBtZWFuaW5nZnVsIGVycm9yXG4gICAgICAgIHJlamVjdChFcnJvcihyZXEuc3RhdHVzVGV4dCkpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgbmV0d29yayBlcnJvcnNcbiAgICByZXEub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmVqZWN0KEVycm9yKFwiTmV0d29yayBFcnJvclwiKSk7XG4gICAgfTtcblxuICAgIC8vIE1ha2UgdGhlIHJlcXVlc3RcbiAgICByZXEuc2VuZCgpO1xuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGdldEpTT05cbn07XG4iXX0=
