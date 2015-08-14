(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";

var _interopRequire = function _interopRequire(obj) {
  return obj && obj.__esModule ? obj["default"] : obj;
};

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var key in props) {
      var prop = props[key];prop.configurable = true;if (prop.value) prop.writable = true;
    }Object.defineProperties(target, props);
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
})();

var _get = function get(_x, _x2, _x3) {
  var _again = true;

  _function: while (_again) {
    _again = false;
    var object = _x,
        property = _x2,
        receiver = _x3;
    desc = parent = getter = undefined;
    var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);if (parent === null) {
        return undefined;
      } else {
        _x = parent;
        _x2 = property;
        _x3 = receiver;
        _again = true;
        continue _function;
      }
    } else if ("value" in desc && desc.writable) {
      return desc.value;
    } else {
      var getter = desc.get;if (getter === undefined) {
        return undefined;
      }return getter.call(receiver);
    }
  }
};

var _inherits = function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) subClass.__proto__ = superClass;
};

var _classCallCheck = function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var Tiles = _interopRequire(require("./tiles"));

/**
* Moza
*/

var Moza = (function (_Tiles) {
  function Moza() {
    _classCallCheck(this, Moza);

    _get(Object.getPrototypeOf(Moza.prototype), "constructor", this).call(this); // This will call the parent constructor
  }

  _inherits(Moza, _Tiles);

  _createClass(Moza, {
    build: {

      /*
      * Build
      * @param {object} params - el, col & row
      */

      value: function build(params) {
        this.buildGrid(params);
        // Build the tiles. At this point we will have the size and position of all the tiles.
        this.buildTiles();
        // This will parse the
        this.showTile(params);
      }
    }
  });

  return Moza;
})(Tiles);

global.Moza = Moza;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qZXJvbWVkc291Y3kvU2l0ZXMvbW96YS9zcmMvanMvbW96YS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsWUFBWSxDQUFDOztBQUViLElBQUksZUFBZSxHQUFHLFNBQUEsZUFBQSxDQUFVLEdBQUcsRUFBRTtBQUFFLFNBQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztDQUFFLENBQUM7O0FBRTlGLElBQUksWUFBWSxHQUFHLENBQUMsWUFBWTtBQUFFLFdBQVMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRTtBQUFFLFNBQUssSUFBSSxHQUFHLElBQUksS0FBSyxFQUFFO0FBQUUsVUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUssQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUssSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztLQUFFLE1BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7R0FBRSxPQUFRLFVBQVUsV0FBVyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUU7QUFBRSxRQUFJLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLElBQUssV0FBVyxFQUFFLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQyxPQUFRLFdBQVcsQ0FBQztHQUFFLENBQUM7Q0FBRSxDQUFBLEVBQUcsQ0FBQzs7QUFFaGMsSUFBSSxJQUFJLEdBQUcsU0FBUyxHQUFHLENBQUEsRUFBQSxFQUFBLEdBQUEsRUFBQSxHQUFBLEVBQUE7QUFXckIsTUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDOztBQUVsQixXQUFTLEVBQUUsT0FBTyxNQUFNLEVBYjBCO0FBY2hELFVBQU0sR0FBRyxLQUFLLENBQUM7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Q0FBQyxDQUFDO09BQ3ZCO0tBb0JFO0dBQ0YsQ0FBQyxDQUFDOztBQUVILFNBdENJLElBQUksQ0FBQTtDQXVDVCxDQUFBLENBdkNrQixLQUFLLENBQUEsQ0FBQTs7QUFrQnhCLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBUaWxlcyBmcm9tICcuL3RpbGVzJztcblxuLyoqXG4qIE1vemFcbiovXG5jbGFzcyBNb3phIGV4dGVuZHMgVGlsZXMge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpOyAvLyBUaGlzIHdpbGwgY2FsbCB0aGUgcGFyZW50IGNvbnN0cnVjdG9yXG4gIH1cblxuICAvKlxuICAqIEJ1aWxkXG4gICogQHBhcmFtIHtvYmplY3R9IHBhcmFtcyAtIGVsLCBjb2wgJiByb3dcbiAgKi9cbiAgYnVpbGQocGFyYW1zKSB7XG4gICAgdGhpcy5idWlsZEdyaWQocGFyYW1zKTtcbiAgICAvLyBCdWlsZCB0aGUgdGlsZXMuIEF0IHRoaXMgcG9pbnQgd2Ugd2lsbCBoYXZlIHRoZSBzaXplIGFuZCBwb3NpdGlvbiBvZiBhbGwgdGhlIHRpbGVzLlxuICAgIHRoaXMuYnVpbGRUaWxlcygpO1xuICAgIC8vIFRoaXMgd2lsbCBwYXJzZSB0aGVcbiAgICB0aGlzLnNob3dUaWxlKHBhcmFtcyk7XG4gIH1cbn1cblxuZ2xvYmFsLk1vemEgPSBNb3phO1xuIl19
},{"./tiles":4}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
"use strict";

var constants = {
  data: {
    url: "../data/data.json"
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
exports.constants = constants;

},{}],3:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var constants = require("./config").constants;

/**
* Grid
*/

var Grid = (function () {
  function Grid() {
    _classCallCheck(this, Grid);

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

  _createClass(Grid, {
    checkAvailabilityOfCoordsFromCoord: {

      /**
      * Check availability of coords from coord
      * @param {object} coords
      */

      value: function checkAvailabilityOfCoordsFromCoord(coords) {
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
      }
    },
    getOccupationFromCoord: {

      /*
      * Get occupation from coord
      * This will get an array with all the point occuped by the tile
      * @param {number} totalCol
      * @param {number} totalRow
      * @param {object} coord
      */

      value: function getOccupationFromCoord(params) {
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
      }
    },
    getNewTileArea: {

      /*
      * Get new tileArea
      * Iterate across each free coordinates to test if the tile can be placed
      * @param {string} tileSize
      * @returns {array|undefined}
      */

      value: function getNewTileArea(tileSize) {
        var _this = this;

        var targets = [],
            totalCol = constants.TILE_SIZE[tileSize].col,
            totalRow = constants.TILE_SIZE[tileSize].row;
        this.coords.free.forEach(function (freeCoord) {
          // make sure the tile ending end don't go futher then the grid edge
          var tileRightEdge = (freeCoord.x + totalCol) * _this.tileWidth,
              tileBottomEdge = (freeCoord.y + totalRow) * _this.tileHeight;
          if (tileRightEdge <= _this.gridWidth && tileBottomEdge <= _this.gridHeight) {
            // We jsut fond a good spot for this tile.
            // It's time to check if the area is clear.
            var coords = _this.getOccupationFromCoord({ totalCol: totalCol, totalRow: totalRow, coord: freeCoord });
            if (_this.checkAvailabilityOfCoordsFromCoord(coords)) {
              targets.push(freeCoord);
            }
          }
        });
        // If the targets is empty that mean 2 things:
        // - the tile was to big
        // - the tile had the right size but no area was available
        return targets.length > 0 ? this.shuffle(targets) : undefined;
      }
    },
    putFreeCoorToTakenCoor: {

      /*
      * Put free coor to taken coor
      * @param {object} coord
      */

      value: function putFreeCoorToTakenCoor(coord) {
        var _this = this;

        //todo: Remove the if statement and add a filter before forEach
        this.coords.free.forEach(function (myCoord, index) {
          // todo: clean this up
          if (myCoord.x === coord.x && myCoord.y === coord.y) {
            _this.coords.free.splice(index, 1);
          }
        });
        this.coords.taken.push(coord);
      }
    },
    shuffle: {

      /*
      * Shuffle
      * @param {object} o
      */

      value: function shuffle(o) {
        for (var j = undefined, x = undefined, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x) {}
        return o;
      }
    },
    getCoord: {

      /*
      * Get coord
      * @param {number} x
      * @param {number} y
      */

      value: function getCoord(x, y) {
        return { x: x, y: y };
      }
    },
    setCoords: {

      /*
      * Set coords
      */

      value: function setCoords() {
        for (var i = 0; i < this.col; i++) {
          for (var j = 0; j < this.row; j++) {
            this.coords.all.push(this.getCoord(i, j));
          }
        }
        //  Clone the arrayY of all position and add it to free position array.
        this.coords.free = this.coords.all;
      }
    },
    showCoords: {

      /*
      * Show coords
      * This will show black dots for each coordonate
      */

      value: function showCoords() {
        var _this = this;

        this.coords.all.forEach(function (coord) {
          var left = _this.gridWidth / _this.col * coord.x;
          var top = _this.gridHeight / _this.row * coord.y;
          left = left * 100 / _this.gridWidth;
          top = top * 100 / _this.gridHeight;
          var node = document.createElement("DIV");
          node.style.cssText = "top: " + (top - 0.5) + "%; left: " + (left - 0.2) + "%";
          _this.container.appendChild(node);
        });
      }
    },
    buildGrid: {

      /*
      * Build grid
      * @param {string} el
      * @param {number} gCol
      * @param {number} gRow
      */

      value: function buildGrid(params) {
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
      }
    }
  });

  return Grid;
})();

module.exports = Grid;

},{"./config":2}],4:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var constants = require("./config").constants;

var Grid = _interopRequire(require("./grid"));

/**
* Tile
*/

var Tiles = (function (_Grid) {
  function Tiles() {
    _classCallCheck(this, Tiles);

    _get(Object.getPrototypeOf(Tiles.prototype), "constructor", this).call(this); // This will call the parent constructor
    this.tiles = [];
    this.tileQueue = [];
    for (var i = 0, len = 40; i < len; i++) {
      this.tiles.push({
        id: i,
        title: "title",
        img: ""
      });
    }
  }

  _inherits(Tiles, _Grid);

  _createClass(Tiles, {
    showTile: {
      value: function showTile() {
        var _this = this;

        this.tileQueue.forEach(function (item, index) {
          var node = document.createElement("DIV");
          node.style.cssText = "top: " + item.y + "%; left: " + item.x + "%; width: " + item.width + "%; height: " + item.height + "%";
          node.className = "tile";
          _this.container.appendChild(node);
        });
      }
    },
    getNextTileSize: {

      /*
      * Get next tile size
      * This will get the next tile size to use.
      * @param {string} tileIndex
      */

      value: function getNextTileSize(tileIndex) {
        var currentTileCount = 0;
        var tileSize = null;
        for (var size in constants.TILE_SIZE) {
          currentTileCount = currentTileCount + constants.TILE_SIZE[size].maxAmount;
          if (tileIndex < currentTileCount) {
            return size;
          }
        }
        return tileSize;
      }
    },
    reduceTileSize: {

      /*
      * Reduce tile size
      * This is checking all the tile size and look for the next area smaller then the current one.
      * To find the area we just ened to multiply the col and row (constants.TILE_SIZE[size].col * constants.TILE_SIZE[size].row)
      * @param {string} currentTileSize - big, medium, small, ect.
      */

      value: function reduceTileSize(currentTileSize) {
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
      }
    },
    getMaxTileCount: {

      /*
      * Get max tile count
      */

      value: function getMaxTileCount() {
        var maxTileCount = 0;
        for (var size in constants.TILE_SIZE) {
          maxTileCount = maxTileCount + constants.TILE_SIZE[size].maxAmount;
        }
        return maxTileCount;
      }
    },
    buildTiles: {

      /*
      * Build tiles
      */

      value: function buildTiles() {
        var _this = this;

        var size = null;
        var tileCount = 0;
        var maxTile = this.getMaxTileCount();

        this.tiles.forEach(function (tile, index) {
          if (_this.coords.free.length > 0 && tileCount < maxTile) {
            (function () {

              tile.size = _this.getNextTileSize(tileCount);
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
              }).bind(_this);

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
                var myTile = new Tile(_this, tile);

                // Update free & taken coords
                var tileOccupationCoords = _this.getOccupationFromCoord({ totalCol: tile.col, totalRow: tile.row, coord: tile.target });
                tileOccupationCoords.forEach(function (coords) {
                  _this.putFreeCoorToTakenCoor(coords);
                });
                _this.tileQueue.push(myTile.getTileInfos());
              } else {}
            })();
          }
        });
      }
    }
  });

  return Tiles;
})(Grid);

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

module.exports = Tiles;

// no tile added to the queue because we did not find the space for it

},{"./config":2,"./grid":3}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbW96YS5qcyIsIi9Vc2Vycy9qZXJvbWVkc291Y3kvU2l0ZXMvbW96YS9zcmMvanMvY29uZmlnLmpzIiwiL1VzZXJzL2plcm9tZWRzb3VjeS9TaXRlcy9tb3phL3NyYy9qcy9ncmlkLmpzIiwiL1VzZXJzL2plcm9tZWRzb3VjeS9TaXRlcy9tb3phL3NyYy9qcy90aWxlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNqR0EsWUFBWSxDQUFDOztBQUVOLElBQU0sU0FBUyxHQUFHO0FBQ3ZCLE1BQUksRUFBRTtBQUNKLE9BQUcsRUFBRSxtQkFBbUI7R0FDekI7Ozs7QUFJRCxhQUFhO0FBQ1gsT0FBRyxFQUFFO0FBQ0gsZUFBUyxFQUFF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TSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlO0FBQzFFLFVBQU0sRUFBRSxBQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBSSxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQjtBQUM1RSxNQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHO0dBQ3BCLENBQUM7Q0FDSCxDQUFDOztpQkFFYSxLQUFLIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcblwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlID0gZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlKG9iaikge1xuICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqW1wiZGVmYXVsdFwiXSA6IG9iajtcbn07XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gcHJvcHMpIHtcbiAgICAgIHZhciBwcm9wID0gcHJvcHNba2V5XTtwcm9wLmNvbmZpZ3VyYWJsZSA9IHRydWU7aWYgKHByb3AudmFsdWUpIHByb3Aud3JpdGFibGUgPSB0cnVlO1xuICAgIH1PYmplY3QuZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKTtcbiAgfXJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gICAgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtyZXR1cm4gQ29uc3RydWN0b3I7XG4gIH07XG59KSgpO1xuXG52YXIgX2dldCA9IGZ1bmN0aW9uIGdldChfeCwgX3gyLCBfeDMpIHtcbiAgdmFyIF9hZ2FpbiA9IHRydWU7XG5cbiAgX2Z1bmN0aW9uOiB3aGlsZSAoX2FnYWluKSB7XG4gICAgX2FnYWluID0gZmFsc2U7XG4gICAgdmFyIG9iamVjdCA9IF94LFxuICAgICAgICBwcm9wZXJ0eSA9IF94MixcbiAgICAgICAgcmVjZWl2ZXIgPSBfeDM7XG4gICAgZGVzYyA9IHBhcmVudCA9IGdldHRlciA9IHVuZGVmaW5lZDtcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7aWYgKGRlc2MgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpO2lmIChwYXJlbnQgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF94ID0gcGFyZW50O1xuICAgICAgICBfeDIgPSBwcm9wZXJ0eTtcbiAgICAgICAgX3gzID0gcmVjZWl2ZXI7XG4gICAgICAgIF9hZ2FpbiA9IHRydWU7XG4gICAgICAgIGNvbnRpbnVlIF9mdW5jdGlvbjtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKFwidmFsdWVcIiBpbiBkZXNjICYmIGRlc2Mud3JpdGFibGUpIHtcbiAgICAgIHJldHVybiBkZXNjLnZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7aWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9cmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTtcbiAgICB9XG4gIH1cbn07XG5cbnZhciBfaW5oZXJpdHMgPSBmdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpO1xuICB9c3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTtpZiAoc3VwZXJDbGFzcykgc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzcztcbn07XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2sgPSBmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufTtcblxudmFyIFRpbGVzID0gX2ludGVyb3BSZXF1aXJlKHJlcXVpcmUoXCIuL3RpbGVzXCIpKTtcblxuLyoqXG4qIE1vemFcbiovXG5cbnZhciBNb3phID0gKGZ1bmN0aW9uIChfVGlsZXMpIHtcbiAgZnVuY3Rpb24gTW96YSgpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTW96YSk7XG5cbiAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihNb3phLnByb3RvdHlwZSksIFwiY29uc3RydWN0b3JcIiwgdGhpcykuY2FsbCh0aGlzKTsgLy8gVGhpcyB3aWxsIGNhbGwgdGhlIHBhcmVudCBjb25zdHJ1Y3RvclxuICB9XG5cbiAgX2luaGVyaXRzKE1vemEsIF9UaWxlcyk7XG5cbiAgX2NyZWF0ZUNsYXNzKE1vemEsIHtcbiAgICBidWlsZDoge1xuXG4gICAgICAvKlxuICAgICAgKiBCdWlsZFxuICAgICAgKiBAcGFyYW0ge29iamVjdH0gcGFyYW1zIC0gZWwsIGNvbCAmIHJvd1xuICAgICAgKi9cblxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGJ1aWxkKHBhcmFtcykge1xuICAgICAgICB0aGlzLmJ1aWxkR3JpZChwYXJhbXMpO1xuICAgICAgICAvLyBCdWlsZCB0aGUgdGlsZXMuIEF0IHRoaXMgcG9pbnQgd2Ugd2lsbCBoYXZlIHRoZSBzaXplIGFuZCBwb3NpdGlvbiBvZiBhbGwgdGhlIHRpbGVzLlxuICAgICAgICB0aGlzLmJ1aWxkVGlsZXMoKTtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHBhcnNlIHRoZVxuICAgICAgICB0aGlzLnNob3dUaWxlKHBhcmFtcyk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gTW96YTtcbn0pKFRpbGVzKTtcblxuZ2xvYmFsLk1vemEgPSBNb3phO1xuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYklpOVZjMlZ5Y3k5cVpYSnZiV1ZrYzI5MVkza3ZVMmwwWlhNdmJXOTZZUzl6Y21NdmFuTXZiVzk2WVM1cWN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU8wRkJRVUVzV1VGQldTeERRVUZET3p0QlFVVmlMRWxCUVVrc1pVRkJaU3hIUVVGSExGTkJRVUVzWlVGQlFTeERRVUZWTEVkQlFVY3NSVUZCUlR0QlFVRkZMRk5CUVU4c1IwRkJSeXhKUVVGSkxFZEJRVWNzUTBGQlF5eFZRVUZWTEVkQlFVY3NSMEZCUnl4RFFVRkRMRk5CUVZNc1EwRkJReXhIUVVGSExFZEJRVWNzUTBGQlF6dERRVUZGTEVOQlFVTTdPMEZCUlRsR0xFbEJRVWtzV1VGQldTeEhRVUZITEVOQlFVTXNXVUZCV1R0QlFVRkZMRmRCUVZNc1owSkJRV2RDTEVOQlFVTXNUVUZCVFN4RlFVRkZMRXRCUVVzc1JVRkJSVHRCUVVGRkxGTkJRVXNzU1VGQlNTeEhRVUZITEVsQlFVa3NTMEZCU3l4RlFVRkZPMEZCUVVVc1ZVRkJTU3hKUVVGSkxFZEJRVWNzUzBGQlN5eERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRWxCUVVzc1EwRkJReXhaUVVGWkxFZEJRVWNzU1VGQlNTeERRVUZETEVsQlFVc3NTVUZCU1N4RFFVRkRMRXRCUVVzc1JVRkJSU3hKUVVGSkxFTkJRVU1zVVVGQlVTeEhRVUZITEVsQlFVa3NRMEZCUXp0TFFVRkZMRTFCUVU4c1EwRkJReXhuUWtGQlowSXNRMEZCUXl4TlFVRk5MRVZCUVVVc1MwRkJTeXhEUVVGRExFTkJRVU03UjBGQlJTeFBRVUZSTEZWQlFWVXNWMEZCVnl4RlFVRkZMRlZCUVZVc1JVRkJSU3hYUVVGWExFVkJRVVU3UVVGQlJTeFJRVUZKTEZWQlFWVXNSVUZCUlN4blFrRkJaMElzUTBGQlF5eFhRVUZYTEVOQlFVTXNVMEZCVXl4RlFVRkZMRlZCUVZVc1EwRkJReXhEUVVGRExFbEJRVXNzVjBGQlZ5eEZRVUZGTEdkQ1FVRm5RaXhEUVVGRExGZEJRVmNzUlVGQlJTeFhRVUZYTEVOQlFVTXNRMEZCUXl4UFFVRlJMRmRCUVZjc1EwRkJRenRIUVVGRkxFTkJRVU03UTBGQlJTeERRVUZCTEVWQlFVY3NRMEZCUXpzN1FVRkZhR01zU1VGQlNTeEpRVUZKTEVkQlFVY3NVMEZCVXl4SFFVRkhMRU5CUVVFc1JVRkJRU3hGUVVGQkxFZEJRVUVzUlVGQlFTeEhRVUZCTEVWQlFVRTdRVUZYY2tJc1RVRkJTU3hOUVVGTkxFZEJRVWNzU1VGQlNTeERRVUZET3p0QlFVVnNRaXhYUVVGVExFVkJRVVVzVDBGQlR5eE5RVUZOTEVWQllqQkNPMEZCWTJoRUxGVkJRVTBzUjBGQlJ5eExRVUZMTEVOQlFVTTdRVUZEWml4UlFXWnZRaXhOUVVGTkxFZEJRVUVzUlVGQlFUdFJRVUZGTEZGQlFWRXNSMEZCUVN4SFFVRkJPMUZCUVVVc1VVRkJVU3hIUVVGQkxFZEJRVUVzUTBGQlFUdEJRVUZSTEZGQlFVa3NSMEZCYjBZc1RVRkJUU3hIUVVFMlRTeE5RVUZOTEVkQlFVRXNVMEZCUVN4RFFVRkJPMEZCUVhKVUxGRkJRVWtzU1VGQlNTeEhRVUZITEUxQlFVMHNRMEZCUXl4M1FrRkJkMElzUTBGQlF5eE5RVUZOTEVWQlFVVXNVVUZCVVN4RFFVRkRMRU5CUVVNc1NVRkJTeXhKUVVGSkxFdEJRVXNzVTBGQlV5eEZRVUZGTzBGQlFVVXNWVUZCU1N4TlFVRk5MRWRCUVVjc1RVRkJUU3hEUVVGRExHTkJRV01zUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXl4SlFVRkxMRTFCUVUwc1MwRkJTeXhKUVVGSkxFVkJRVVU3UVVGQlJTeGxRVUZQTEZOQlFWTXNRMEZCUXp0UFFVRkZMRTFCUVUwN1FVRjFRbXhQTEZWQlFVVXNSMEYyUWpaUExFMUJRVTBzUTBGQlFUdEJRWGRDY2xBc1YwRkJSeXhIUVhoQ2IxQXNVVUZCVVN4RFFVRkJPMEZCZVVJdlVDeFhRVUZITEVkQmVrSTRVQ3hSUVVGUkxFTkJRVUU3UVVFd1FucFJMR05CUVUwc1IwRkJSeXhKUVVGSkxFTkJRVU03UVVGRFpDeHBRa0ZCVXl4VFFVRlRMRU5CUVVNN1QwRXpRakJRTzB0QlFVVXNUVUZCVFN4SlFVRkpMRTlCUVU4c1NVRkJTU3hKUVVGSkxFbEJRVWtzU1VGQlNTeERRVUZETEZGQlFWRXNSVUZCUlR0QlFVRkZMR0ZCUVU4c1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF6dExRVUZGTEUxQlFVMDdRVUZCUlN4VlFVRkpMRTFCUVUwc1IwRkJSeXhKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZETEVsQlFVc3NUVUZCVFN4TFFVRkxMRk5CUVZNc1JVRkJSVHRCUVVGRkxHVkJRVThzVTBGQlV5eERRVUZETzA5QlFVVXNUMEZCVVN4TlFVRk5MRU5CUVVNc1NVRkJTU3hEUVVGRExGRkJRVkVzUTBGQlF5eERRVUZETzB0QlFVVTdSMEZCUlR0RFFVRkJMRU5CUVVNN08wRkJSVEZqTEVsQlFVa3NVMEZCVXl4SFFVRkhMRk5CUVVFc1UwRkJRU3hEUVVGVkxGRkJRVkVzUlVGQlJTeFZRVUZWTEVWQlFVVTdRVUZCUlN4TlFVRkpMRTlCUVU4c1ZVRkJWU3hMUVVGTExGVkJRVlVzU1VGQlNTeFZRVUZWTEV0QlFVc3NTVUZCU1N4RlFVRkZPMEZCUVVVc1ZVRkJUU3hKUVVGSkxGTkJRVk1zUTBGQlF5d3dSRUZCTUVRc1IwRkJSeXhQUVVGUExGVkJRVlVzUTBGQlF5eERRVUZETzBkQlFVVXNVVUZCVXl4RFFVRkRMRk5CUVZNc1IwRkJSeXhOUVVGTkxFTkJRVU1zVFVGQlRTeERRVUZETEZWQlFWVXNTVUZCU1N4VlFVRlZMRU5CUVVNc1UwRkJVeXhGUVVGRkxFVkJRVVVzVjBGQlZ5eEZRVUZGTEVWQlFVVXNTMEZCU3l4RlFVRkZMRkZCUVZFc1JVRkJSU3hWUVVGVkxFVkJRVVVzUzBGQlN5eEZRVUZGTEZGQlFWRXNSVUZCUlN4SlFVRkpMRVZCUVVVc1dVRkJXU3hGUVVGRkxFbEJRVWtzUlVGQlJTeEZRVUZGTEVOQlFVTXNRMEZCUXl4SlFVRkxMRlZCUVZVc1JVRkJSU3hSUVVGUkxFTkJRVU1zVTBGQlV5eEhRVUZITEZWQlFWVXNRMEZCUXp0RFFVRkZMRU5CUVVNN08wRkJSV2hpTEVsQlFVa3NaVUZCWlN4SFFVRkhMRk5CUVVFc1pVRkJRU3hEUVVGVkxGRkJRVkVzUlVGQlJTeFhRVUZYTEVWQlFVVTdRVUZCUlN4TlFVRkpMRVZCUVVVc1VVRkJVU3haUVVGWkxGZEJRVmNzUTBGQlFTeEZRVUZITzBGQlFVVXNWVUZCVFN4SlFVRkpMRk5CUVZNc1EwRkJReXh0UTBGQmJVTXNRMEZCUXl4RFFVRkRPMGRCUVVVN1EwRkJSU3hEUVVGRE96dEJRVVZxU3l4SlFWWlBMRXRCUVVzc1IwRkJRU3hsUVVGQkxFTkJRVUVzVDBGQlFTeERRVUZOTEZOQlFWTXNRMEZCUVN4RFFVRkJMRU5CUVVFN096czdPenRCUVdkQ00wSXNTVUZZVFN4SlFVRkpMRWRCUVVFc1EwRkJRU3hWUVVGQkxFMUJRVUVzUlVGQlFUdEJRVU5ITEZkQlJGQXNTVUZCU1N4SFFVTk5PMEZCV1Zvc2JVSkJRV1VzUTBGQlF5eEpRVUZKTEVWQllteENMRWxCUVVrc1EwRkJRU3hEUVVGQk96dEJRVVZPTEZGQlFVRXNRMEZCUVN4TlFVRkJMRU5CUVVFc1kwRkJRU3hEUVVaRkxFbEJRVWtzUTBGQlFTeFRRVUZCTEVOQlFVRXNSVUZCUVN4aFFVRkJMRVZCUVVFc1NVRkJRU3hEUVVGQkxFTkJRVUVzU1VGQlFTeERRVUZCTEVsQlFVRXNRMEZCUVN4RFFVVkZPMGRCUTFRN08wRkJaVVFzVjBGQlV5eERRV3hDVEN4SlFVRkpMRVZCUVVFc1RVRkJRU3hEUVVGQkxFTkJRVUU3TzBGQmIwSlNMR05CUVZrc1EwRndRbElzU1VGQlNTeEZRVUZCTzBGQlUxSXNVMEZCU3l4RlFVRkJPenM3T3pzN08wRkJiVUpFTEZkQlFVc3NSVUZ1UWtvc1UwRkJRU3hMUVVGQkxFTkJRVU1zVFVGQlRTeEZRVUZGTzBGQlExb3NXVUZCU1N4RFFVRkRMRk5CUVZNc1EwRkJReXhOUVVGTkxFTkJRVU1zUTBGQlF6czdRVUZGZGtJc1dVRkJTU3hEUVVGRExGVkJRVlVzUlVGQlJTeERRVUZET3p0QlFVVnNRaXhaUVVGSkxFTkJRVU1zVVVGQlVTeERRVUZETEUxQlFVMHNRMEZCUXl4RFFVRkRPMDlCUTNaQ08wdEJiMEpGTzBkQlEwWXNRMEZCUXl4RFFVRkRPenRCUVVWSUxGTkJkRU5KTEVsQlFVa3NRMEZCUVR0RFFYVkRWQ3hEUVVGQkxFTkJka05yUWl4TFFVRkxMRU5CUVVFc1EwRkJRVHM3UVVGclFuaENMRTFCUVUwc1EwRkJReXhKUVVGSkxFZEJRVWNzU1VGQlNTeERRVUZESWl3aVptbHNaU0k2SW1kbGJtVnlZWFJsWkM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JtbHRjRzl5ZENCVWFXeGxjeUJtY205dElDY3VMM1JwYkdWekp6dGNibHh1THlvcVhHNHFJRTF2ZW1GY2Jpb3ZYRzVqYkdGemN5Qk5iM3BoSUdWNGRHVnVaSE1nVkdsc1pYTWdlMXh1SUNCamIyNXpkSEoxWTNSdmNpZ3BJSHRjYmlBZ0lDQnpkWEJsY2lncE95QXZMeUJVYUdseklIZHBiR3dnWTJGc2JDQjBhR1VnY0dGeVpXNTBJR052Ym5OMGNuVmpkRzl5WEc0Z0lIMWNibHh1SUNBdktseHVJQ0FxSUVKMWFXeGtYRzRnSUNvZ1FIQmhjbUZ0SUh0dlltcGxZM1I5SUhCaGNtRnRjeUF0SUdWc0xDQmpiMndnSmlCeWIzZGNiaUFnS2k5Y2JpQWdZblZwYkdRb2NHRnlZVzF6S1NCN1hHNGdJQ0FnZEdocGN5NWlkV2xzWkVkeWFXUW9jR0Z5WVcxektUdGNiaUFnSUNBdkx5QkNkV2xzWkNCMGFHVWdkR2xzWlhNdUlFRjBJSFJvYVhNZ2NHOXBiblFnZDJVZ2QybHNiQ0JvWVhabElIUm9aU0J6YVhwbElHRnVaQ0J3YjNOcGRHbHZiaUJ2WmlCaGJHd2dkR2hsSUhScGJHVnpMbHh1SUNBZ0lIUm9hWE11WW5WcGJHUlVhV3hsY3lncE8xeHVJQ0FnSUM4dklGUm9hWE1nZDJsc2JDQndZWEp6WlNCMGFHVmNiaUFnSUNCMGFHbHpMbk5vYjNkVWFXeGxLSEJoY21GdGN5azdYRzRnSUgxY2JuMWNibHh1WjJ4dlltRnNMazF2ZW1FZ1BTQk5iM3BoTzF4dUlsMTkiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBjb25zdCBjb25zdGFudHMgPSB7XG4gIGRhdGE6IHtcbiAgICB1cmw6ICcuLi9kYXRhL2RhdGEuanNvbidcbiAgfSxcbiAgLy8gVGhlIGZpcnN0IHRpbGUgc2l6ZSBoYXZlIHRoZSBwcmlvcml0eS5cbiAgLy8gVGhhdCBtZWFuIHdpbGwgcGFyc2UgdGhlIHRpbGUgc2l6ZSBmcm9tIHRvcCB0byBib3R0b20uXG4gIC8vIEl0cyBiZXR0ZXIgdG8gYWRkIHRoZSBiaWdnZXN0IHRpbGUgYXQgdGhlIHRvcC5cbiAgJ1RJTEVfU0laRSc6IHtcbiAgICBYWEw6IHtcbiAgICAgIG1heEFtb3VudDogMSxcbiAgICAgIGNvbDogNSxcbiAgICAgIHJvdzogNVxuICAgIH0sXG4gICAgWEw6IHtcbiAgICAgIG1heEFtb3VudDogMixcbiAgICAgIGNvbDogNCxcbiAgICAgIHJvdzogNFxuICAgIH0sXG4gICAgTDoge1xuICAgICAgbWF4QW1vdW50OiAxMCxcbiAgICAgIGNvbDogMyxcbiAgICAgIHJvdzogMlxuICAgIH0sXG4gICAgTToge1xuICAgICAgbWF4QW1vdW50OiAxMCxcbiAgICAgIGNvbDogMixcbiAgICAgIHJvdzogMlxuICAgIH0sXG4gICAgUzoge1xuICAgICAgbWF4QW1vdW50OiAxMCxcbiAgICAgIGNvbDogMixcbiAgICAgIHJvdzogMVxuICAgIH0sXG4gICAgWFM6IHtcbiAgICAgIG1heEFtb3VudDogNTAsXG4gICAgICBjb2w6IDEsXG4gICAgICByb3c6IDFcbiAgICB9XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7Y29uc3RhbnRzfSBmcm9tICcuL2NvbmZpZyc7XG5cbi8qKlxuKiBHcmlkXG4qL1xuY2xhc3MgR3JpZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuY29udGFpbmVyID0gbnVsbDtcbiAgICB0aGlzLmdyaWRXaWR0aCA9IG51bGw7XG4gICAgdGhpcy5ncmlkSGVpZ2h0ID0gbnVsbDtcbiAgICB0aGlzLmNvbCA9IG51bGw7XG4gICAgdGhpcy5yb3cgPSBudWxsO1xuICAgIHRoaXMuZ3JpZFdpZHRoU3BhY2VyID0gbnVsbDtcbiAgICB0aGlzLmdyaWRIZWlnaHRTcGFjZXIgPSBudWxsO1xuICAgIHRoaXMudGlsZVdpZHRoID0gbnVsbDtcbiAgICB0aGlzLnRpbGVIZWlnaHQgPSBudWxsO1xuICAgIHRoaXMuY29vcmRzID0ge1xuICAgICAgYWxsOiBbXSxcbiAgICAgIGZyZWU6IFtdLFxuICAgICAgdGFrZW46IFtdXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAqIENoZWNrIGF2YWlsYWJpbGl0eSBvZiBjb29yZHMgZnJvbSBjb29yZFxuICAqIEBwYXJhbSB7b2JqZWN0fSBjb29yZHNcbiAgKi9cbiAgY2hlY2tBdmFpbGFiaWxpdHlPZkNvb3Jkc0Zyb21Db29yZChjb29yZHMpIHtcbiAgICBsZXQgeSA9IDA7XG4gICAgY29vcmRzLmZvckVhY2goY29vcmQgPT4ge1xuICAgICAgbGV0IGkgPSB0aGlzLmNvb3Jkcy5mcmVlLmxlbmd0aDtcbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgaWYgKHRoaXMuY29vcmRzLmZyZWVbaV0ueCA9PT0gY29vcmQueCAmJiB0aGlzLmNvb3Jkcy5mcmVlW2ldLnkgPT09IGNvb3JkLnkpIHtcbiAgICAgICAgICB5Kys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gY29vcmRzLmxlbmd0aCA9PT0geTtcbiAgfTtcblxuICAvKlxuICAqIEdldCBvY2N1cGF0aW9uIGZyb20gY29vcmRcbiAgKiBUaGlzIHdpbGwgZ2V0IGFuIGFycmF5IHdpdGggYWxsIHRoZSBwb2ludCBvY2N1cGVkIGJ5IHRoZSB0aWxlXG4gICogQHBhcmFtIHtudW1iZXJ9IHRvdGFsQ29sXG4gICogQHBhcmFtIHtudW1iZXJ9IHRvdGFsUm93XG4gICogQHBhcmFtIHtvYmplY3R9IGNvb3JkXG4gICovXG4gIGdldE9jY3VwYXRpb25Gcm9tQ29vcmQocGFyYW1zKSB7XG4gICAgdmFyIHt0b3RhbENvbCwgdG90YWxSb3csIGNvb3JkfSA9IHBhcmFtcztcbiAgICBsZXQgY29vcmRzID0gW107XG4gICAgaWYgKGNvb3JkKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvdGFsQ29sOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0b3RhbFJvdzsgaisrKSB7XG4gICAgICAgICAgY29vcmRzLnB1c2godGhpcy5nZXRDb29yZChpICsgY29vcmQueCwgaiArIGNvb3JkLnkpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGNvb3JkcztcbiAgICB9XG4gICAgLy8gdG9kbzogc2hvdWxkIHJldHVybiBzb21ldGhpbmcgYW55d2F5XG4gIH07XG5cbiAgLypcbiAgKiBHZXQgbmV3IHRpbGVBcmVhXG4gICogSXRlcmF0ZSBhY3Jvc3MgZWFjaCBmcmVlIGNvb3JkaW5hdGVzIHRvIHRlc3QgaWYgdGhlIHRpbGUgY2FuIGJlIHBsYWNlZFxuICAqIEBwYXJhbSB7c3RyaW5nfSB0aWxlU2l6ZVxuICAqIEByZXR1cm5zIHthcnJheXx1bmRlZmluZWR9XG4gICovXG4gIGdldE5ld1RpbGVBcmVhKHRpbGVTaXplKSB7XG4gICAgbGV0IHRhcmdldHMgPSBbXSxcbiAgICAgICB0b3RhbENvbCA9IGNvbnN0YW50cy5USUxFX1NJWkVbdGlsZVNpemVdLmNvbCxcbiAgICAgICB0b3RhbFJvdyA9IGNvbnN0YW50cy5USUxFX1NJWkVbdGlsZVNpemVdLnJvdztcbiAgICB0aGlzLmNvb3Jkcy5mcmVlLmZvckVhY2goZnJlZUNvb3JkID0+IHtcbiAgICAgIC8vIG1ha2Ugc3VyZSB0aGUgdGlsZSBlbmRpbmcgZW5kIGRvbid0IGdvIGZ1dGhlciB0aGVuIHRoZSBncmlkIGVkZ2VcbiAgICAgIGxldCB0aWxlUmlnaHRFZGdlID0gKGZyZWVDb29yZC54ICsgdG90YWxDb2wpICogdGhpcy50aWxlV2lkdGgsXG4gICAgICAgICAgdGlsZUJvdHRvbUVkZ2UgPSAoZnJlZUNvb3JkLnkgKyB0b3RhbFJvdykgKiB0aGlzLnRpbGVIZWlnaHQ7XG4gICAgICBpZiAodGlsZVJpZ2h0RWRnZSA8PSB0aGlzLmdyaWRXaWR0aCAmJiB0aWxlQm90dG9tRWRnZSA8PSB0aGlzLmdyaWRIZWlnaHQpIHtcbiAgICAgICAgLy8gV2UganN1dCBmb25kIGEgZ29vZCBzcG90IGZvciB0aGlzIHRpbGUuXG4gICAgICAgIC8vIEl0J3MgdGltZSB0byBjaGVjayBpZiB0aGUgYXJlYSBpcyBjbGVhci5cbiAgICAgICAgbGV0IGNvb3JkcyA9IHRoaXMuZ2V0T2NjdXBhdGlvbkZyb21Db29yZCh7dG90YWxDb2wsIHRvdGFsUm93LCBjb29yZDogZnJlZUNvb3JkfSk7XG4gICAgICAgIGlmICh0aGlzLmNoZWNrQXZhaWxhYmlsaXR5T2ZDb29yZHNGcm9tQ29vcmQoY29vcmRzKSkge1xuICAgICAgICAgIHRhcmdldHMucHVzaChmcmVlQ29vcmQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgLy8gSWYgdGhlIHRhcmdldHMgaXMgZW1wdHkgdGhhdCBtZWFuIDIgdGhpbmdzOlxuICAgIC8vIC0gdGhlIHRpbGUgd2FzIHRvIGJpZ1xuICAgIC8vIC0gdGhlIHRpbGUgaGFkIHRoZSByaWdodCBzaXplIGJ1dCBubyBhcmVhIHdhcyBhdmFpbGFibGVcbiAgICByZXR1cm4gdGFyZ2V0cy5sZW5ndGggPiAwID8gdGhpcy5zaHVmZmxlKHRhcmdldHMpIDogdW5kZWZpbmVkO1xuICB9O1xuXG4gIC8qXG4gICogUHV0IGZyZWUgY29vciB0byB0YWtlbiBjb29yXG4gICogQHBhcmFtIHtvYmplY3R9IGNvb3JkXG4gICovXG4gIHB1dEZyZWVDb29yVG9UYWtlbkNvb3IoY29vcmQpIHtcbiAgICAvL3RvZG86IFJlbW92ZSB0aGUgaWYgc3RhdGVtZW50IGFuZCBhZGQgYSBmaWx0ZXIgYmVmb3JlIGZvckVhY2hcbiAgICB0aGlzLmNvb3Jkcy5mcmVlLmZvckVhY2goKG15Q29vcmQsIGluZGV4KSA9PiB7XG4gICAgICAvLyB0b2RvOiBjbGVhbiB0aGlzIHVwXG4gICAgICBpZiAobXlDb29yZC54ID09PSBjb29yZC54ICYmIG15Q29vcmQueSA9PT0gY29vcmQueSkge1xuICAgICAgICB0aGlzLmNvb3Jkcy5mcmVlLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5jb29yZHMudGFrZW4ucHVzaChjb29yZCk7XG4gIH07XG5cbiAgLypcbiAgKiBTaHVmZmxlXG4gICogQHBhcmFtIHtvYmplY3R9IG9cbiAgKi9cbiAgc2h1ZmZsZShvKSB7XG4gICAgZm9yKGxldCBqLCB4LCBpID0gby5sZW5ndGg7IGk7IGogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBpKSwgeCA9IG9bLS1pXSwgb1tpXSA9IG9bal0sIG9bal0gPSB4KTtcbiAgICByZXR1cm4gbztcbiAgfTtcblxuICAvKlxuICAqIEdldCBjb29yZFxuICAqIEBwYXJhbSB7bnVtYmVyfSB4XG4gICogQHBhcmFtIHtudW1iZXJ9IHlcbiAgKi9cbiAgZ2V0Q29vcmQoeCwgeSkge1xuICAgICAgcmV0dXJuIHt4LCB5fTtcbiAgfTtcblxuICAvKlxuICAqIFNldCBjb29yZHNcbiAgKi9cbiAgc2V0Q29vcmRzKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb2w7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLnJvdzsgaisrKSB7XG4gICAgICAgIHRoaXMuY29vcmRzLmFsbC5wdXNoKHRoaXMuZ2V0Q29vcmQoaSwgaikpO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyAgQ2xvbmUgdGhlIGFycmF5WSBvZiBhbGwgcG9zaXRpb24gYW5kIGFkZCBpdCB0byBmcmVlIHBvc2l0aW9uIGFycmF5LlxuICAgIHRoaXMuY29vcmRzLmZyZWUgPSB0aGlzLmNvb3Jkcy5hbGw7XG4gIH07XG5cbiAgLypcbiAgKiBTaG93IGNvb3Jkc1xuICAqIFRoaXMgd2lsbCBzaG93IGJsYWNrIGRvdHMgZm9yIGVhY2ggY29vcmRvbmF0ZVxuICAqL1xuICBzaG93Q29vcmRzKCkge1xuICAgIHRoaXMuY29vcmRzLmFsbC5mb3JFYWNoKGNvb3JkID0+IHtcbiAgICAgIGxldCBsZWZ0ID0gdGhpcy5ncmlkV2lkdGggLyB0aGlzLmNvbCAqIGNvb3JkLng7XG4gICAgICBsZXQgdG9wID0gdGhpcy5ncmlkSGVpZ2h0IC8gdGhpcy5yb3cgKiBjb29yZC55O1xuICAgICAgbGVmdCA9IGxlZnQgKiAxMDAgLyB0aGlzLmdyaWRXaWR0aDtcbiAgICAgIHRvcCA9IHRvcCAqIDEwMCAvIHRoaXMuZ3JpZEhlaWdodDtcbiAgICAgIGxldCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIkRJVlwiKTtcbiAgICAgIG5vZGUuc3R5bGUuY3NzVGV4dCA9IGB0b3A6ICR7dG9wLTAuNX0lOyBsZWZ0OiAke2xlZnQtMC4yfSVgO1xuICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQobm9kZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgLypcbiAgKiBCdWlsZCBncmlkXG4gICogQHBhcmFtIHtzdHJpbmd9IGVsXG4gICogQHBhcmFtIHtudW1iZXJ9IGdDb2xcbiAgKiBAcGFyYW0ge251bWJlcn0gZ1Jvd1xuICAqL1xuICBidWlsZEdyaWQocGFyYW1zKSB7XG4gICAgdmFyIHtlbCwgY29sLCByb3d9ID0gcGFyYW1zO1xuICAgIHRoaXMuZWwgPSBlbDtcbiAgICB0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsKTtcbiAgICB0aGlzLmdyaWRXaWR0aCA9IHRoaXMuY29udGFpbmVyLmNsaWVudFdpZHRoO1xuICAgIHRoaXMuZ3JpZEhlaWdodCA9IHRoaXMuY29udGFpbmVyLmNsaWVudEhlaWdodDtcbiAgICB0aGlzLmNvbCA9IGNvbDsvL3RvZG86IHRoaXMgc2hvdWxkIGJlIG1vcmUgc3BlY2lmaWMuIGl0IHdpbGwgaGVscCB1bmRlcnN0YW5kIHRoZSBjb2RlIHdoZW4gd2UgY2FsbCB0aGlzIGZyb20gYSBzdWIgZnVuY3Rpb24uXG4gICAgdGhpcy5yb3cgPSByb3c7XG4gICAgdGhpcy5ncmlkV2lkdGhTcGFjZXIgPSAyICogMTAwIC8gdGhpcy5ncmlkV2lkdGg7XG4gICAgdGhpcy5ncmlkSGVpZ2h0U3BhY2VyID0gMiAqIDEwMCAvIHRoaXMuZ3JpZEhlaWdodDtcbiAgICB0aGlzLnRpbGVXaWR0aCA9IHRoaXMuZ3JpZFdpZHRoIC8gY29sOyAvL3RvZG86IGZpbmQgYSBtb3JlIHNwZWNpZmljIG5hbWUgZm9yIHRoaXMuIGl0cyBtb3JlIGEgem9uZSBvciBhcmVhIHRoZW4gdGlsZVxuICAgIHRoaXMudGlsZUhlaWdodCA9IHRoaXMuZ3JpZEhlaWdodCAvIHJvdztcblxuICAgIC8vIFNldCBjb29yZG9uYXRlXG4gICAgdGhpcy5zZXRDb29yZHMoKTtcbiAgICB0aGlzLnNob3dDb29yZHMoKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgR3JpZDtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHtjb25zdGFudHN9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCBHcmlkIGZyb20gJy4vZ3JpZCc7XG5cbi8qKlxuKiBUaWxlXG4qL1xuY2xhc3MgVGlsZXMgZXh0ZW5kcyBHcmlkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTsgLy8gVGhpcyB3aWxsIGNhbGwgdGhlIHBhcmVudCBjb25zdHJ1Y3RvclxuICAgIHRoaXMudGlsZXMgPSBbXTtcbiAgICB0aGlzLnRpbGVRdWV1ZSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSA0MDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICB0aGlzLnRpbGVzLnB1c2goe1xuICAgICAgICBpZDogaSxcbiAgICAgICAgdGl0bGU6ICd0aXRsZScsXG4gICAgICAgIGltZzogJydcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHNob3dUaWxlKCl7XG4gICAgdGhpcy50aWxlUXVldWUuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgIGxldCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIkRJVlwiKTtcbiAgICAgIG5vZGUuc3R5bGUuY3NzVGV4dCA9IGB0b3A6ICR7aXRlbS55fSU7IGxlZnQ6ICR7aXRlbS54fSU7IHdpZHRoOiAke2l0ZW0ud2lkdGh9JTsgaGVpZ2h0OiAke2l0ZW0uaGVpZ2h0fSVgO1xuICAgICAgbm9kZS5jbGFzc05hbWUgPSAndGlsZSc7XG4gICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZChub2RlKTtcbiAgICB9KTtcbiAgfTtcblxuICAvKlxuICAqIEdldCBuZXh0IHRpbGUgc2l6ZVxuICAqIFRoaXMgd2lsbCBnZXQgdGhlIG5leHQgdGlsZSBzaXplIHRvIHVzZS5cbiAgKiBAcGFyYW0ge3N0cmluZ30gdGlsZUluZGV4XG4gICovXG4gIGdldE5leHRUaWxlU2l6ZSh0aWxlSW5kZXgpIHtcbiAgICBsZXQgY3VycmVudFRpbGVDb3VudCA9IDA7XG4gICAgbGV0IHRpbGVTaXplID0gbnVsbDtcbiAgICBmb3IobGV0IHNpemUgaW4gY29uc3RhbnRzLlRJTEVfU0laRSl7XG4gICAgICBjdXJyZW50VGlsZUNvdW50ID0gY3VycmVudFRpbGVDb3VudCArIGNvbnN0YW50cy5USUxFX1NJWkVbc2l6ZV0ubWF4QW1vdW50O1xuICAgICAgaWYodGlsZUluZGV4IDwgY3VycmVudFRpbGVDb3VudCl7XG4gICAgICAgIHJldHVybiBzaXplO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGlsZVNpemU7XG4gIH07XG5cbiAgLypcbiAgKiBSZWR1Y2UgdGlsZSBzaXplXG4gICogVGhpcyBpcyBjaGVja2luZyBhbGwgdGhlIHRpbGUgc2l6ZSBhbmQgbG9vayBmb3IgdGhlIG5leHQgYXJlYSBzbWFsbGVyIHRoZW4gdGhlIGN1cnJlbnQgb25lLlxuICAqIFRvIGZpbmQgdGhlIGFyZWEgd2UganVzdCBlbmVkIHRvIG11bHRpcGx5IHRoZSBjb2wgYW5kIHJvdyAoY29uc3RhbnRzLlRJTEVfU0laRVtzaXplXS5jb2wgKiBjb25zdGFudHMuVElMRV9TSVpFW3NpemVdLnJvdylcbiAgKiBAcGFyYW0ge3N0cmluZ30gY3VycmVudFRpbGVTaXplIC0gYmlnLCBtZWRpdW0sIHNtYWxsLCBlY3QuXG4gICovXG4gIHJlZHVjZVRpbGVTaXplKGN1cnJlbnRUaWxlU2l6ZSkge1xuICAgIGxldCBjdXJyZW50VGlsZSA9IGNvbnN0YW50cy5USUxFX1NJWkVbY3VycmVudFRpbGVTaXplXTtcbiAgICBsZXQgY3VycmVudFRpbGVBcmVhID0gY3VycmVudFRpbGUuY29sICogY3VycmVudFRpbGUucm93O1xuICAgIGxldCBuZXh0U2l6ZSA9IG51bGw7IC8vIFRoaXMgd2lsbCByZXR1cm4gbnVsbCBpZiBubyBzbWFsbGVyIHRpbGUgYXJlIGZvdW5kLlxuICAgIGZvciAobGV0IHNpemUgaW4gY29uc3RhbnRzLlRJTEVfU0laRSkge1xuICAgICAgbGV0IG5leHRUaWxlQXJlYSA9IGNvbnN0YW50cy5USUxFX1NJWkVbc2l6ZV0uY29sICogY29uc3RhbnRzLlRJTEVfU0laRVtzaXplXS5yb3c7XG4gICAgICBpZiAobmV4dFRpbGVBcmVhIDwgY3VycmVudFRpbGVBcmVhKSB7XG4gICAgICAgIHJldHVybiBzaXplO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbmV4dFNpemU7XG4gIH07XG5cbiAgLypcbiAgKiBHZXQgbWF4IHRpbGUgY291bnRcbiAgKi9cbiAgZ2V0TWF4VGlsZUNvdW50KCkge1xuICAgIGxldCBtYXhUaWxlQ291bnQgPSAwO1xuICAgIGZvciAobGV0IHNpemUgaW4gY29uc3RhbnRzLlRJTEVfU0laRSkge1xuICAgICAgbWF4VGlsZUNvdW50ID0gbWF4VGlsZUNvdW50ICsgY29uc3RhbnRzLlRJTEVfU0laRVtzaXplXS5tYXhBbW91bnQ7XG4gICAgfVxuICAgIHJldHVybiBtYXhUaWxlQ291bnQ7XG4gIH07XG5cbiAgLypcbiAgKiBCdWlsZCB0aWxlc1xuICAqL1xuICBidWlsZFRpbGVzKCkge1xuICAgIGxldCBzaXplID0gbnVsbDtcbiAgICBsZXQgdGlsZUNvdW50ID0gMDtcbiAgICBsZXQgbWF4VGlsZSA9IHRoaXMuZ2V0TWF4VGlsZUNvdW50KCk7XG5cbiAgICB0aGlzLnRpbGVzLmZvckVhY2goKHRpbGUsIGluZGV4KSA9PiB7XG4gICAgICBpZih0aGlzLmNvb3Jkcy5mcmVlLmxlbmd0aCA+IDAgJiYgdGlsZUNvdW50IDwgbWF4VGlsZSkge1xuXG4gICAgICAgIHRpbGUuc2l6ZSA9IHRoaXMuZ2V0TmV4dFRpbGVTaXplKHRpbGVDb3VudCk7XG4gICAgICAgIGxldCBhdmFpbGFibGVBcmVhQ29vcmRzID0gbnVsbDtcblxuICAgICAgICAvLyBJZiBubyBzcGFjZSB3ZXJlIGZvdW5kIHRoYXQgbWVhbiB0aGUgdGlsZSBpcyB0byBiaWcuXG4gICAgICAgIC8vIE5lZWQgdG8gc2l6ZSBpdCBkb3duIGEgYml0XG4gICAgICAgIGxldCBmaW5kTmV4dEF2YWlsYWJsZUFyZWFDb29yZHMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICB0aWxlLnNpemUgPSB0aGlzLnJlZHVjZVRpbGVTaXplKHRpbGUuc2l6ZSk7XG4gICAgICAgICAgaWYoIXRpbGUuc2l6ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgICAgbGV0IGF2YWlsYWJsZUFyZWFDb29yZHMgPSB0aGlzLmdldE5ld1RpbGVBcmVhKHRpbGUuc2l6ZSk7XG4gICAgICAgICAgaWYoIWF2YWlsYWJsZUFyZWFDb29yZHMpe1xuICAgICAgICAgICAgcmV0dXJuIGZpbmROZXh0QXZhaWxhYmxlQXJlYUNvb3JkcygpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gYXZhaWxhYmxlQXJlYUNvb3JkcztcbiAgICAgICAgfS5iaW5kKHRoaXMpO1xuXG4gICAgICAgIC8vIENoZWNrIGlmIHdlIGZvdW5kIGEgcGxhY2UgZm9yIHRoZSB0aWxlXG4gICAgICAgIGF2YWlsYWJsZUFyZWFDb29yZHMgPSBmaW5kTmV4dEF2YWlsYWJsZUFyZWFDb29yZHMoKTtcbiAgICAgICAgLy8gSnVzdCBtYWtpbmcgc3VyZSB3ZSBoYXZlIHNwYWNlIGZvciB0aGlzIHRpbGUuXG4gICAgICAgIC8vIFdlIHdvbnQgbmVlZCB0aGlzIGNvbmRpdGlvbiBhZnRlciBJIG1ha2UgYSByZWN1cnNpb24gZm9yIHRoZSBkb3duc2l6aW5nIHRpbGUgZnVuY3Rpb25cbiAgICAgICAgaWYoYXZhaWxhYmxlQXJlYUNvb3Jkcyl7XG4gICAgICAgICAgdGlsZUNvdW50Kys7XG4gICAgICAgICAgdGlsZS5rZXkgPSBpbmRleDtcbiAgICAgICAgICB0aWxlLnRhcmdldCA9IGF2YWlsYWJsZUFyZWFDb29yZHNbMF07IC8vVGFrZSB0aGUgZmlyc3Qgb25lIGluIHRoZSBhcnJheS4gVGhleSBhcmUgYWxyZWFkeSBzaG92ZWxlZFxuICAgICAgICAgIHRpbGUuY29sID0gY29uc3RhbnRzLlRJTEVfU0laRVt0aWxlLnNpemVdLmNvbDtcbiAgICAgICAgICB0aWxlLnJvdyA9IGNvbnN0YW50cy5USUxFX1NJWkVbdGlsZS5zaXplXS5yb3c7XG4gICAgICAgICAgbGV0IG15VGlsZSA9IG5ldyBUaWxlKHRoaXMsIHRpbGUpO1xuXG4gICAgICAgICAgLy8gVXBkYXRlIGZyZWUgJiB0YWtlbiBjb29yZHNcbiAgICAgICAgICBsZXQgdGlsZU9jY3VwYXRpb25Db29yZHMgPSB0aGlzLmdldE9jY3VwYXRpb25Gcm9tQ29vcmQoe3RvdGFsQ29sOiB0aWxlLmNvbCwgdG90YWxSb3c6IHRpbGUucm93LCBjb29yZDogdGlsZS50YXJnZXR9KTtcbiAgICAgICAgICB0aWxlT2NjdXBhdGlvbkNvb3Jkcy5mb3JFYWNoKGNvb3JkcyA9PiB7XG4gICAgICAgICAgICB0aGlzLnB1dEZyZWVDb29yVG9UYWtlbkNvb3IoY29vcmRzKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLnRpbGVRdWV1ZS5wdXNoKG15VGlsZS5nZXRUaWxlSW5mb3MoKSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIC8vIG5vIHRpbGUgYWRkZWQgdG8gdGhlIHF1ZXVlIGJlY2F1c2Ugd2UgZGlkIG5vdCBmaW5kIHRoZSBzcGFjZSBmb3IgaXRcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9O1xufVxuXG5cbi8qKlxuKiBUaWxlXG4qIEBwYXJhbSB7b2JqZWN0fSBncmlkXG4qIEBwYXJhbSB7b2JqZWN0fSBwYXJhbXNcbiovXG5mdW5jdGlvbiBUaWxlKGdyaWQsIHBhcmFtcykge1xuICB0aGlzLmdyaWQgPSBncmlkO1xuICB0aGlzLnBhcmFtcyA9IHBhcmFtcztcbn1cblxuLypcbiogR2V0IHRpbGUgaW5mb3NcbiovXG5UaWxlLnByb3RvdHlwZS5nZXRUaWxlSW5mb3MgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHtcbiAgICBzaXplOiB0aGlzLnBhcmFtcy5zaXplLFxuICAgIHg6IHRoaXMucGFyYW1zLnRhcmdldC54ICogdGhpcy5ncmlkLnRpbGVXaWR0aCAqIDEwMCAvIHRoaXMuZ3JpZC5ncmlkV2lkdGgsXG4gICAgeTogdGhpcy5wYXJhbXMudGFyZ2V0LnkgKiB0aGlzLmdyaWQudGlsZUhlaWdodCAqIDEwMCAvIHRoaXMuZ3JpZC5ncmlkSGVpZ2h0LFxuICAgIHdpZHRoOiAodGhpcy5wYXJhbXMuY29sICogMTAwIC8gdGhpcy5ncmlkLmNvbCkgLSB0aGlzLmdyaWQuZ3JpZFdpZHRoU3BhY2VyLFxuICAgIGhlaWdodDogKHRoaXMucGFyYW1zLnJvdyAqIDEwMCAvIHRoaXMuZ3JpZC5yb3cpIC0gdGhpcy5ncmlkLmdyaWRIZWlnaHRTcGFjZXIsXG4gICAgaWQ6IHRoaXMucGFyYW1zLmtleVxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgVGlsZXM7XG4iXX0=
