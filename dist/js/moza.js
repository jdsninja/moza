(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

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
        this.showTile();
      }
    }
  });

  return Moza;
})(Tiles);

global.Moza = Moza;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qZXJvbWVkc291Y3kvU2l0ZXMvbW96YS9zcmMvanMvbW96YS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsWUFBWSxDQUFDOzs7Ozs7Ozs7Ozs7SUFFTixLQUFLLDJCQUFNLFNBQVM7Ozs7OztJQUtyQixJQUFJO0FBQ0csV0FEUCxJQUFJLEdBQ007MEJBRFYsSUFBSTs7QUFFTiwrQkFGRSxJQUFJLDZDQUVFO0dBQ1Q7O1lBSEcsSUFBSTs7ZUFBSixJQUFJO0FBU1IsU0FBSzs7Ozs7OzthQUFBLGVBQUMsTUFBTSxFQUFFO0FBQ1osWUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7QUFFdkIsWUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDOztBQUVsQixZQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7T0FDakI7Ozs7U0FmRyxJQUFJO0dBQVMsS0FBSzs7QUFrQnhCLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBUaWxlcyBmcm9tICcuL3RpbGVzJztcblxuLyoqXG4qIE1vemFcbiovXG5jbGFzcyBNb3phIGV4dGVuZHMgVGlsZXMge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpOyAvLyBUaGlzIHdpbGwgY2FsbCB0aGUgcGFyZW50IGNvbnN0cnVjdG9yXG4gIH1cblxuICAvKlxuICAqIEJ1aWxkXG4gICogQHBhcmFtIHtvYmplY3R9IHBhcmFtcyAtIGVsLCBjb2wgJiByb3dcbiAgKi9cbiAgYnVpbGQocGFyYW1zKSB7XG4gICAgdGhpcy5idWlsZEdyaWQocGFyYW1zKTtcbiAgICAvLyBCdWlsZCB0aGUgdGlsZXMuIEF0IHRoaXMgcG9pbnQgd2Ugd2lsbCBoYXZlIHRoZSBzaXplIGFuZCBwb3NpdGlvbiBvZiBhbGwgdGhlIHRpbGVzLlxuICAgIHRoaXMuYnVpbGRUaWxlcygpO1xuICAgIC8vIFRoaXMgd2lsbCBwYXJzZSB0aGVcbiAgICB0aGlzLnNob3dUaWxlKCk7XG4gIH1cbn1cblxuZ2xvYmFsLk1vemEgPSBNb3phO1xuIl19
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbW96YS5qcyIsIi9Vc2Vycy9qZXJvbWVkc291Y3kvU2l0ZXMvbW96YS9zcmMvanMvY29uZmlnLmpzIiwiL1VzZXJzL2plcm9tZWRzb3VjeS9TaXRlcy9tb3phL3NyYy9qcy9ncmlkLmpzIiwiL1VzZXJzL2plcm9tZWRzb3VjeS9TaXRlcy9tb3phL3NyYy9qcy90aWxlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNwREEsWUFBWSxDQUFDOztBQUVOLElBQU0sU0FBUyxHQUFHO0FBQ3ZCLE1BQUksRUFBRTtBQUNKLE9BQUcsRUFBRSxtQkFBbUI7R0FDekI7Ozs7QUFJRCxhQUFhO0FBQ1gsT0FBRyxFQUFFO0FBQ0gsZUFBUyxFQUFFLENBQUM7QUFDWixTQUFHLEVBQUUsQ0FBQztBQUNOLFNBQUcsRUFBRSxDQUFDO0tBQ1A7QUFDRCxNQUFFLEVBQUU7QUFDRixlQUFTLEVBQUUsQ0FBQztBQUNaLFNBQUcsRUFBRSxDQUFDO0FBQ04sU0FBRyxFQUFFLENBQUM7S0FDUDtBQUNELEtBQUMsRUFBRTtBQUNELGVBQVMsRUFBRSxFQUFFO0FBQ2IsU0FBRyxFQUFFLENBQUM7QUFDTixTQUFHLEVBQUUsQ0FBQztLQUNQO0FBQ0QsS0FBQyxFQUFFO0FBQ0QsZUFBUyxFQUFFLEVBQUU7QUFDYixTQUFHLEVBQUUsQ0FBQztBQUNOLFNBQUcsRUFBRSxDQUFDO0tBQ1A7QUFDRCxLQUFDLEVBQUU7QUFDRCxlQUFTLEVBQUUsRUFBRTtBQUNiLFNBQUcsRUFBRSxDQUFDO0FBQ04sU0FBRyxFQUFFLENBQUM7S0FDUDtBQUNELE1BQUUsRUFBRTtBQUNGLGVBQVMsRUFBRSxFQUFFO0FBQ2IsU0FBRyxFQUFFLENBQUM7QUFDTixTQUFHLEVBQUUsQ0FBQztLQUNQO0dBQ0Y7Q0FDRixDQUFDO1FBdkNXLFNBQVMsR0FBVCxTQUFTOzs7QUNGdEIsWUFBWSxDQUFDOzs7Ozs7SUFFTCxTQUFTLFdBQU8sVUFBVSxFQUExQixTQUFTOzs7Ozs7SUFLWCxJQUFJO0FBQ0csV0FEUCxJQUFJLEdBQ007MEJBRFYsSUFBSTs7QUFFTixRQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztBQUN0QixRQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztBQUN0QixRQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztBQUN2QixRQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQztBQUNoQixRQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQztBQUNoQixRQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztBQUM1QixRQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO0FBQzdCLFFBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0FBQ3RCLFFBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0FBQ3ZCLFFBQUksQ0FBQyxNQUFNLEdBQUc7QUFDWixTQUFHLEVBQUUsRUFBRTtBQUNQLFVBQUksRUFBRSxFQUFFO0FBQ1IsV0FBSyxFQUFFLEVBQUU7S0FDVixDQUFDO0dBQ0g7O2VBaEJHLElBQUk7QUFzQlIsc0NBQWtDOzs7Ozs7O2FBQUEsNENBQUMsTUFBTSxFQUFFOzs7QUFDekMsWUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ1YsY0FBTSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUssRUFBSTtBQUN0QixjQUFJLENBQUMsR0FBRyxNQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQ2hDLGlCQUFPLENBQUMsRUFBRSxFQUFFO0FBQ1YsZ0JBQUksTUFBSyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxJQUFJLE1BQUssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsRUFBRTtBQUMxRSxlQUFDLEVBQUUsQ0FBQzthQUNMO1dBQ0Y7U0FDRixDQUFDLENBQUM7QUFDSCxlQUFPLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO09BQzVCOztBQVNELDBCQUFzQjs7Ozs7Ozs7OzthQUFBLGdDQUFDLE1BQU0sRUFBRTtZQUN4QixRQUFRLEdBQXFCLE1BQU0sQ0FBbkMsUUFBUTtZQUFFLFFBQVEsR0FBVyxNQUFNLENBQXpCLFFBQVE7WUFBRSxLQUFLLEdBQUksTUFBTSxDQUFmLEtBQUs7O0FBQzlCLFlBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUNoQixZQUFJLEtBQUssRUFBRTtBQUNULGVBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDakMsaUJBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDakMsb0JBQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDdEQ7V0FDRjtBQUNELGlCQUFPLE1BQU0sQ0FBQztTQUNmOztBQUFBLE9BRUY7O0FBUUQsa0JBQWM7Ozs7Ozs7OzthQUFBLHdCQUFDLFFBQVEsRUFBRTs7O0FBQ3ZCLFlBQUksT0FBTyxHQUFHLEVBQUU7WUFDYixRQUFRLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHO1lBQzVDLFFBQVEsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQztBQUNoRCxZQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQSxTQUFTLEVBQUk7O0FBRXBDLGNBQUksYUFBYSxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUEsR0FBSSxNQUFLLFNBQVM7Y0FDekQsY0FBYyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUEsR0FBSSxNQUFLLFVBQVUsQ0FBQztBQUNoRSxjQUFJLGFBQWEsSUFBSSxNQUFLLFNBQVMsSUFBSSxjQUFjLElBQUksTUFBSyxVQUFVLEVBQUU7OztBQUd4RSxnQkFBSSxNQUFNLEdBQUcsTUFBSyxzQkFBc0IsQ0FBQyxFQUFDLFFBQVEsRUFBUixRQUFRLEVBQUUsUUFBUSxFQUFSLFFBQVEsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFDLENBQUMsQ0FBQztBQUNqRixnQkFBSSxNQUFLLGtDQUFrQyxDQUFDLE1BQU0sQ0FBQyxFQUFFO0FBQ25ELHFCQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ3pCO1dBQ0Y7U0FDRixDQUFDLENBQUM7Ozs7QUFJSCxlQUFPLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUyxDQUFDO09BQy9EOztBQU1ELDBCQUFzQjs7Ozs7OzthQUFBLGdDQUFDLEtBQUssRUFBRTs7OztBQUU1QixZQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsS0FBSyxFQUFLOztBQUUzQyxjQUFJLE9BQU8sQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLEVBQUU7QUFDbEQsa0JBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1dBQ25DO1NBQ0YsQ0FBQyxDQUFDO0FBQ0gsWUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO09BQy9COztBQU1ELFdBQU87Ozs7Ozs7YUFBQSxpQkFBQyxDQUFDLEVBQUU7QUFDVCxhQUFJLElBQUksQ0FBQyxZQUFBLEVBQUUsQ0FBQyxZQUFBLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFFO0FBQ3JHLGVBQU8sQ0FBQyxDQUFDO09BQ1Y7O0FBT0QsWUFBUTs7Ozs7Ozs7YUFBQSxrQkFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ1gsZUFBTyxFQUFDLENBQUMsRUFBRCxDQUFDLEVBQUUsQ0FBQyxFQUFELENBQUMsRUFBQyxDQUFDO09BQ2pCOztBQUtELGFBQVM7Ozs7OzthQUFBLHFCQUFHO0FBQ1YsYUFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDakMsZUFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDakMsZ0JBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1dBQzNDO1NBQ0Y7O0FBRUQsWUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7T0FDcEM7O0FBTUQsY0FBVTs7Ozs7OzthQUFBLHNCQUFHOzs7QUFDWCxZQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLLEVBQUk7QUFDL0IsY0FBSSxJQUFJLEdBQUcsTUFBSyxTQUFTLEdBQUcsTUFBSyxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUMvQyxjQUFJLEdBQUcsR0FBRyxNQUFLLFVBQVUsR0FBRyxNQUFLLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQy9DLGNBQUksR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLE1BQUssU0FBUyxDQUFDO0FBQ25DLGFBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLE1BQUssVUFBVSxDQUFDO0FBQ2xDLGNBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDekMsY0FBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLGNBQVcsR0FBRyxHQUFDLEdBQUcsQ0FBQSxrQkFBWSxJQUFJLEdBQUMsR0FBRyxDQUFBLE1BQUcsQ0FBQztBQUM1RCxnQkFBSyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2xDLENBQUMsQ0FBQztPQUNKOztBQVFELGFBQVM7Ozs7Ozs7OzthQUFBLG1CQUFDLE1BQU0sRUFBRTtZQUNYLEVBQUUsR0FBYyxNQUFNLENBQXRCLEVBQUU7WUFBRSxHQUFHLEdBQVMsTUFBTSxDQUFsQixHQUFHO1lBQUUsR0FBRyxHQUFJLE1BQU0sQ0FBYixHQUFHOztBQUNqQixZQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztBQUNiLFlBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUM3QyxZQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDO0FBQzVDLFlBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUM7QUFDOUMsWUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFDZixZQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUNmLFlBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO0FBQ2hELFlBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7QUFDbEQsWUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztBQUN0QyxZQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDOzs7QUFHeEMsWUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0FBQ2pCLFlBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztPQUNuQjs7OztTQXpLRyxJQUFJOzs7aUJBNEtLLElBQUk7OztBQ25MbkIsWUFBWSxDQUFDOzs7Ozs7Ozs7Ozs7SUFFTCxTQUFTLFdBQU8sVUFBVSxFQUExQixTQUFTOztJQUNWLElBQUksMkJBQU0sUUFBUTs7Ozs7O0lBS25CLEtBQUs7QUFDRSxXQURQLEtBQUssR0FDSzswQkFEVixLQUFLOztBQUVQLCtCQUZFLEtBQUssNkNBRUM7QUFDUixRQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNoQixRQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUNwQixTQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDdEMsVUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7QUFDZCxVQUFFLEVBQUUsQ0FBQztBQUNMLGFBQUssRUFBRSxPQUFPO0FBQ2QsV0FBRyxFQUFFLEVBQUU7T0FDUixDQUFDLENBQUM7S0FDSjtHQUNGOztZQVpHLEtBQUs7O2VBQUwsS0FBSztBQWNULFlBQVE7YUFBQSxvQkFBRTs7O0FBQ1IsWUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFLO0FBQ3RDLGNBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDekMsY0FBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLGFBQVcsSUFBSSxDQUFDLENBQUMsaUJBQVksSUFBSSxDQUFDLENBQUMsa0JBQWEsSUFBSSxDQUFDLEtBQUssbUJBQWMsSUFBSSxDQUFDLE1BQU0sTUFBRyxDQUFDO0FBQ3pHLGNBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO0FBQ3hCLGdCQUFLLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbEMsQ0FBQyxDQUFDO09BQ0o7O0FBT0QsbUJBQWU7Ozs7Ozs7O2FBQUEseUJBQUMsU0FBUyxFQUFFO0FBQ3pCLFlBQUksZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO0FBQ3pCLFlBQUksUUFBUSxHQUFHLElBQUksQ0FBQztBQUNwQixhQUFJLElBQUksSUFBSSxJQUFJLFNBQVMsQ0FBQyxTQUFTLEVBQUM7QUFDbEMsMEJBQWdCLEdBQUcsZ0JBQWdCLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUM7QUFDMUUsY0FBRyxTQUFTLEdBQUcsZ0JBQWdCLEVBQUM7QUFDOUIsbUJBQU8sSUFBSSxDQUFDO1dBQ2I7U0FDRjtBQUNELGVBQU8sUUFBUSxDQUFDO09BQ2pCOztBQVFELGtCQUFjOzs7Ozs7Ozs7YUFBQSx3QkFBQyxlQUFlLEVBQUU7QUFDOUIsWUFBSSxXQUFXLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUN2RCxZQUFJLGVBQWUsR0FBRyxXQUFXLENBQUMsR0FBRyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUM7QUFDeEQsWUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDO0FBQ3BCLGFBQUssSUFBSSxJQUFJLElBQUksU0FBUyxDQUFDLFNBQVMsRUFBRTtBQUNwQyxjQUFJLFlBQVksR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQztBQUNqRixjQUFJLFlBQVksR0FBRyxlQUFlLEVBQUU7QUFDbEMsbUJBQU8sSUFBSSxDQUFDO1dBQ2I7U0FDRjtBQUNELGVBQU8sUUFBUSxDQUFDO09BQ2pCOztBQUtELG1CQUFlOzs7Ozs7YUFBQSwyQkFBRztBQUNoQixZQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7QUFDckIsYUFBSyxJQUFJLElBQUksSUFBSSxTQUFTLENBQUMsU0FBUyxFQUFFO0FBQ3BDLHNCQUFZLEdBQUcsWUFBWSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDO1NBQ25FO0FBQ0QsZUFBTyxZQUFZLENBQUM7T0FDckI7O0FBS0QsY0FBVTs7Ozs7O2FBQUEsc0JBQUc7OztBQUNYLFlBQUksSUFBSSxHQUFHLElBQUksQ0FBQztBQUNoQixZQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7QUFDbEIsWUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDOztBQUVyQyxZQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUksRUFBRSxLQUFLLEVBQUs7QUFDbEMsY0FBRyxNQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxTQUFTLEdBQUcsT0FBTyxFQUFFOzs7QUFFckQsa0JBQUksQ0FBQyxJQUFJLEdBQUcsTUFBSyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDNUMsa0JBQUksbUJBQW1CLEdBQUcsSUFBSSxDQUFDOzs7O0FBSS9CLGtCQUFJLDJCQUEyQixHQUFHLENBQUEsWUFBVztBQUMzQyxvQkFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMzQyxvQkFBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7QUFDYix5QkFBTyxTQUFTLENBQUM7aUJBQ2xCO0FBQ0Qsb0JBQUksbUJBQW1CLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDekQsb0JBQUcsQ0FBQyxtQkFBbUIsRUFBQztBQUN0Qix5QkFBTywyQkFBMkIsRUFBRSxDQUFDO2lCQUN0QztBQUNELHVCQUFPLG1CQUFtQixDQUFDO2VBQzVCLENBQUEsQ0FBQyxJQUFJLE9BQU0sQ0FBQzs7O0FBR2IsaUNBQW1CLEdBQUcsMkJBQTJCLEVBQUUsQ0FBQzs7O0FBR3BELGtCQUFHLG1CQUFtQixFQUFDO0FBQ3JCLHlCQUFTLEVBQUUsQ0FBQztBQUNaLG9CQUFJLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQztBQUNqQixvQkFBSSxDQUFDLE1BQU0sR0FBRyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNyQyxvQkFBSSxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUM7QUFDOUMsb0JBQUksQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDO0FBQzlDLG9CQUFJLE1BQU0sR0FBRyxJQUFJLElBQUksUUFBTyxJQUFJLENBQUMsQ0FBQzs7O0FBR2xDLG9CQUFJLG9CQUFvQixHQUFHLE1BQUssc0JBQXNCLENBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBQyxDQUFDLENBQUM7QUFDckgsb0NBQW9CLENBQUMsT0FBTyxDQUFDLFVBQUEsTUFBTSxFQUFJO0FBQ3JDLHdCQUFLLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUNyQyxDQUFDLENBQUM7QUFDSCxzQkFBSyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO2VBQzVDLE1BQUksRUFFSjs7V0FDRjtTQUNGLENBQUMsQ0FBQztPQUNKOzs7O1NBekhHLEtBQUs7R0FBUyxJQUFJOzs7Ozs7O0FBa0l4QixTQUFTLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFO0FBQzFCLE1BQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLE1BQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0NBQ3RCOzs7OztBQUtELElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxHQUFHLFlBQVc7QUFDdkMsU0FBTztBQUNMLFFBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUk7QUFDdEIsS0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTO0FBQ3pFLEtBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVTtBQUMzRSxTQUFLLEVBQUUsQUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlO0FBQzFFLFVBQU0sRUFBRSxBQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBSSxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQjtBQUM1RSxNQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHO0dBQ3BCLENBQUM7Q0FDSCxDQUFDOztpQkFFYSxLQUFLIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcblwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlID0gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqW1wiZGVmYXVsdFwiXSA6IG9iajsgfTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBrZXkgaW4gcHJvcHMpIHsgdmFyIHByb3AgPSBwcm9wc1trZXldOyBwcm9wLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChwcm9wLnZhbHVlKSBwcm9wLndyaXRhYmxlID0gdHJ1ZTsgfSBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKTsgfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG52YXIgX2dldCA9IGZ1bmN0aW9uIGdldChvYmplY3QsIHByb3BlcnR5LCByZWNlaXZlcikgeyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7IGlmIChkZXNjID09PSB1bmRlZmluZWQpIHsgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpOyBpZiAocGFyZW50ID09PSBudWxsKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gZWxzZSB7IHJldHVybiBnZXQocGFyZW50LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpOyB9IH0gZWxzZSBpZiAoXCJ2YWx1ZVwiIGluIGRlc2MgJiYgZGVzYy53cml0YWJsZSkgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH07XG5cbnZhciBfaW5oZXJpdHMgPSBmdW5jdGlvbiAoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfTtcblxudmFyIF9jbGFzc0NhbGxDaGVjayA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9O1xuXG52YXIgVGlsZXMgPSBfaW50ZXJvcFJlcXVpcmUocmVxdWlyZShcIi4vdGlsZXNcIikpO1xuXG4vKipcbiogTW96YVxuKi9cblxudmFyIE1vemEgPSAoZnVuY3Rpb24gKF9UaWxlcykge1xuICBmdW5jdGlvbiBNb3phKCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBNb3phKTtcblxuICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKE1vemEucHJvdG90eXBlKSwgXCJjb25zdHJ1Y3RvclwiLCB0aGlzKS5jYWxsKHRoaXMpOyAvLyBUaGlzIHdpbGwgY2FsbCB0aGUgcGFyZW50IGNvbnN0cnVjdG9yXG4gIH1cblxuICBfaW5oZXJpdHMoTW96YSwgX1RpbGVzKTtcblxuICBfY3JlYXRlQ2xhc3MoTW96YSwge1xuICAgIGJ1aWxkOiB7XG5cbiAgICAgIC8qXG4gICAgICAqIEJ1aWxkXG4gICAgICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJhbXMgLSBlbCwgY29sICYgcm93XG4gICAgICAqL1xuXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gYnVpbGQocGFyYW1zKSB7XG4gICAgICAgIHRoaXMuYnVpbGRHcmlkKHBhcmFtcyk7XG4gICAgICAgIC8vIEJ1aWxkIHRoZSB0aWxlcy4gQXQgdGhpcyBwb2ludCB3ZSB3aWxsIGhhdmUgdGhlIHNpemUgYW5kIHBvc2l0aW9uIG9mIGFsbCB0aGUgdGlsZXMuXG4gICAgICAgIHRoaXMuYnVpbGRUaWxlcygpO1xuICAgICAgICAvLyBUaGlzIHdpbGwgcGFyc2UgdGhlXG4gICAgICAgIHRoaXMuc2hvd1RpbGUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBNb3phO1xufSkoVGlsZXMpO1xuXG5nbG9iYWwuTW96YSA9IE1vemE7XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWk5VmMyVnljeTlxWlhKdmJXVmtjMjkxWTNrdlUybDBaWE12Ylc5NllTOXpjbU12YW5NdmJXOTZZUzVxY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pTzBGQlFVRXNXVUZCV1N4RFFVRkRPenM3T3pzN096czdPenM3U1VGRlRpeExRVUZMTERKQ1FVRk5MRk5CUVZNN096czdPenRKUVV0eVFpeEpRVUZKTzBGQlEwY3NWMEZFVUN4SlFVRkpMRWRCUTAwN01FSkJSRllzU1VGQlNUczdRVUZGVGl3clFrRkdSU3hKUVVGSkxEWkRRVVZGTzBkQlExUTdPMWxCU0Vjc1NVRkJTVHM3WlVGQlNpeEpRVUZKTzBGQlUxSXNVMEZCU3pzN096czdPenRoUVVGQkxHVkJRVU1zVFVGQlRTeEZRVUZGTzBGQlExb3NXVUZCU1N4RFFVRkRMRk5CUVZNc1EwRkJReXhOUVVGTkxFTkJRVU1zUTBGQlF6czdRVUZGZGtJc1dVRkJTU3hEUVVGRExGVkJRVlVzUlVGQlJTeERRVUZET3p0QlFVVnNRaXhaUVVGSkxFTkJRVU1zVVVGQlVTeEZRVUZGTEVOQlFVTTdUMEZEYWtJN096czdVMEZtUnl4SlFVRkpPMGRCUVZNc1MwRkJTenM3UVVGclFuaENMRTFCUVUwc1EwRkJReXhKUVVGSkxFZEJRVWNzU1VGQlNTeERRVUZESWl3aVptbHNaU0k2SW1kbGJtVnlZWFJsWkM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JtbHRjRzl5ZENCVWFXeGxjeUJtY205dElDY3VMM1JwYkdWekp6dGNibHh1THlvcVhHNHFJRTF2ZW1GY2Jpb3ZYRzVqYkdGemN5Qk5iM3BoSUdWNGRHVnVaSE1nVkdsc1pYTWdlMXh1SUNCamIyNXpkSEoxWTNSdmNpZ3BJSHRjYmlBZ0lDQnpkWEJsY2lncE95QXZMeUJVYUdseklIZHBiR3dnWTJGc2JDQjBhR1VnY0dGeVpXNTBJR052Ym5OMGNuVmpkRzl5WEc0Z0lIMWNibHh1SUNBdktseHVJQ0FxSUVKMWFXeGtYRzRnSUNvZ1FIQmhjbUZ0SUh0dlltcGxZM1I5SUhCaGNtRnRjeUF0SUdWc0xDQmpiMndnSmlCeWIzZGNiaUFnS2k5Y2JpQWdZblZwYkdRb2NHRnlZVzF6S1NCN1hHNGdJQ0FnZEdocGN5NWlkV2xzWkVkeWFXUW9jR0Z5WVcxektUdGNiaUFnSUNBdkx5QkNkV2xzWkNCMGFHVWdkR2xzWlhNdUlFRjBJSFJvYVhNZ2NHOXBiblFnZDJVZ2QybHNiQ0JvWVhabElIUm9aU0J6YVhwbElHRnVaQ0J3YjNOcGRHbHZiaUJ2WmlCaGJHd2dkR2hsSUhScGJHVnpMbHh1SUNBZ0lIUm9hWE11WW5WcGJHUlVhV3hsY3lncE8xeHVJQ0FnSUM4dklGUm9hWE1nZDJsc2JDQndZWEp6WlNCMGFHVmNiaUFnSUNCMGFHbHpMbk5vYjNkVWFXeGxLQ2s3WEc0Z0lIMWNibjFjYmx4dVoyeHZZbUZzTGsxdmVtRWdQU0JOYjNwaE8xeHVJbDE5IiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgY29uc3QgY29uc3RhbnRzID0ge1xuICBkYXRhOiB7XG4gICAgdXJsOiAnLi4vZGF0YS9kYXRhLmpzb24nXG4gIH0sXG4gIC8vIFRoZSBmaXJzdCB0aWxlIHNpemUgaGF2ZSB0aGUgcHJpb3JpdHkuXG4gIC8vIFRoYXQgbWVhbiB3aWxsIHBhcnNlIHRoZSB0aWxlIHNpemUgZnJvbSB0b3AgdG8gYm90dG9tLlxuICAvLyBJdHMgYmV0dGVyIHRvIGFkZCB0aGUgYmlnZ2VzdCB0aWxlIGF0IHRoZSB0b3AuXG4gICdUSUxFX1NJWkUnOiB7XG4gICAgWFhMOiB7XG4gICAgICBtYXhBbW91bnQ6IDEsXG4gICAgICBjb2w6IDUsXG4gICAgICByb3c6IDVcbiAgICB9LFxuICAgIFhMOiB7XG4gICAgICBtYXhBbW91bnQ6IDIsXG4gICAgICBjb2w6IDQsXG4gICAgICByb3c6IDRcbiAgICB9LFxuICAgIEw6IHtcbiAgICAgIG1heEFtb3VudDogMTAsXG4gICAgICBjb2w6IDMsXG4gICAgICByb3c6IDJcbiAgICB9LFxuICAgIE06IHtcbiAgICAgIG1heEFtb3VudDogMTAsXG4gICAgICBjb2w6IDIsXG4gICAgICByb3c6IDJcbiAgICB9LFxuICAgIFM6IHtcbiAgICAgIG1heEFtb3VudDogMTAsXG4gICAgICBjb2w6IDIsXG4gICAgICByb3c6IDFcbiAgICB9LFxuICAgIFhTOiB7XG4gICAgICBtYXhBbW91bnQ6IDUwLFxuICAgICAgY29sOiAxLFxuICAgICAgcm93OiAxXG4gICAgfVxuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQge2NvbnN0YW50c30gZnJvbSAnLi9jb25maWcnO1xuXG4vKipcbiogR3JpZFxuKi9cbmNsYXNzIEdyaWQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmNvbnRhaW5lciA9IG51bGw7XG4gICAgdGhpcy5ncmlkV2lkdGggPSBudWxsO1xuICAgIHRoaXMuZ3JpZEhlaWdodCA9IG51bGw7XG4gICAgdGhpcy5jb2wgPSBudWxsO1xuICAgIHRoaXMucm93ID0gbnVsbDtcbiAgICB0aGlzLmdyaWRXaWR0aFNwYWNlciA9IG51bGw7XG4gICAgdGhpcy5ncmlkSGVpZ2h0U3BhY2VyID0gbnVsbDtcbiAgICB0aGlzLnRpbGVXaWR0aCA9IG51bGw7XG4gICAgdGhpcy50aWxlSGVpZ2h0ID0gbnVsbDtcbiAgICB0aGlzLmNvb3JkcyA9IHtcbiAgICAgIGFsbDogW10sXG4gICAgICBmcmVlOiBbXSxcbiAgICAgIHRha2VuOiBbXVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgKiBDaGVjayBhdmFpbGFiaWxpdHkgb2YgY29vcmRzIGZyb20gY29vcmRcbiAgKiBAcGFyYW0ge29iamVjdH0gY29vcmRzXG4gICovXG4gIGNoZWNrQXZhaWxhYmlsaXR5T2ZDb29yZHNGcm9tQ29vcmQoY29vcmRzKSB7XG4gICAgbGV0IHkgPSAwO1xuICAgIGNvb3Jkcy5mb3JFYWNoKGNvb3JkID0+IHtcbiAgICAgIGxldCBpID0gdGhpcy5jb29yZHMuZnJlZS5sZW5ndGg7XG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIGlmICh0aGlzLmNvb3Jkcy5mcmVlW2ldLnggPT09IGNvb3JkLnggJiYgdGhpcy5jb29yZHMuZnJlZVtpXS55ID09PSBjb29yZC55KSB7XG4gICAgICAgICAgeSsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGNvb3Jkcy5sZW5ndGggPT09IHk7XG4gIH07XG5cbiAgLypcbiAgKiBHZXQgb2NjdXBhdGlvbiBmcm9tIGNvb3JkXG4gICogVGhpcyB3aWxsIGdldCBhbiBhcnJheSB3aXRoIGFsbCB0aGUgcG9pbnQgb2NjdXBlZCBieSB0aGUgdGlsZVxuICAqIEBwYXJhbSB7bnVtYmVyfSB0b3RhbENvbFxuICAqIEBwYXJhbSB7bnVtYmVyfSB0b3RhbFJvd1xuICAqIEBwYXJhbSB7b2JqZWN0fSBjb29yZFxuICAqL1xuICBnZXRPY2N1cGF0aW9uRnJvbUNvb3JkKHBhcmFtcykge1xuICAgIHZhciB7dG90YWxDb2wsIHRvdGFsUm93LCBjb29yZH0gPSBwYXJhbXM7XG4gICAgbGV0IGNvb3JkcyA9IFtdO1xuICAgIGlmIChjb29yZCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b3RhbENvbDsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdG90YWxSb3c7IGorKykge1xuICAgICAgICAgIGNvb3Jkcy5wdXNoKHRoaXMuZ2V0Q29vcmQoaSArIGNvb3JkLngsIGogKyBjb29yZC55KSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBjb29yZHM7XG4gICAgfVxuICAgIC8vIHRvZG86IHNob3VsZCByZXR1cm4gc29tZXRoaW5nIGFueXdheVxuICB9O1xuXG4gIC8qXG4gICogR2V0IG5ldyB0aWxlQXJlYVxuICAqIEl0ZXJhdGUgYWNyb3NzIGVhY2ggZnJlZSBjb29yZGluYXRlcyB0byB0ZXN0IGlmIHRoZSB0aWxlIGNhbiBiZSBwbGFjZWRcbiAgKiBAcGFyYW0ge3N0cmluZ30gdGlsZVNpemVcbiAgKiBAcmV0dXJucyB7YXJyYXl8dW5kZWZpbmVkfVxuICAqL1xuICBnZXROZXdUaWxlQXJlYSh0aWxlU2l6ZSkge1xuICAgIGxldCB0YXJnZXRzID0gW10sXG4gICAgICAgdG90YWxDb2wgPSBjb25zdGFudHMuVElMRV9TSVpFW3RpbGVTaXplXS5jb2wsXG4gICAgICAgdG90YWxSb3cgPSBjb25zdGFudHMuVElMRV9TSVpFW3RpbGVTaXplXS5yb3c7XG4gICAgdGhpcy5jb29yZHMuZnJlZS5mb3JFYWNoKGZyZWVDb29yZCA9PiB7XG4gICAgICAvLyBtYWtlIHN1cmUgdGhlIHRpbGUgZW5kaW5nIGVuZCBkb24ndCBnbyBmdXRoZXIgdGhlbiB0aGUgZ3JpZCBlZGdlXG4gICAgICBsZXQgdGlsZVJpZ2h0RWRnZSA9IChmcmVlQ29vcmQueCArIHRvdGFsQ29sKSAqIHRoaXMudGlsZVdpZHRoLFxuICAgICAgICAgIHRpbGVCb3R0b21FZGdlID0gKGZyZWVDb29yZC55ICsgdG90YWxSb3cpICogdGhpcy50aWxlSGVpZ2h0O1xuICAgICAgaWYgKHRpbGVSaWdodEVkZ2UgPD0gdGhpcy5ncmlkV2lkdGggJiYgdGlsZUJvdHRvbUVkZ2UgPD0gdGhpcy5ncmlkSGVpZ2h0KSB7XG4gICAgICAgIC8vIFdlIGpzdXQgZm9uZCBhIGdvb2Qgc3BvdCBmb3IgdGhpcyB0aWxlLlxuICAgICAgICAvLyBJdCdzIHRpbWUgdG8gY2hlY2sgaWYgdGhlIGFyZWEgaXMgY2xlYXIuXG4gICAgICAgIGxldCBjb29yZHMgPSB0aGlzLmdldE9jY3VwYXRpb25Gcm9tQ29vcmQoe3RvdGFsQ29sLCB0b3RhbFJvdywgY29vcmQ6IGZyZWVDb29yZH0pO1xuICAgICAgICBpZiAodGhpcy5jaGVja0F2YWlsYWJpbGl0eU9mQ29vcmRzRnJvbUNvb3JkKGNvb3JkcykpIHtcbiAgICAgICAgICB0YXJnZXRzLnB1c2goZnJlZUNvb3JkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIC8vIElmIHRoZSB0YXJnZXRzIGlzIGVtcHR5IHRoYXQgbWVhbiAyIHRoaW5nczpcbiAgICAvLyAtIHRoZSB0aWxlIHdhcyB0byBiaWdcbiAgICAvLyAtIHRoZSB0aWxlIGhhZCB0aGUgcmlnaHQgc2l6ZSBidXQgbm8gYXJlYSB3YXMgYXZhaWxhYmxlXG4gICAgcmV0dXJuIHRhcmdldHMubGVuZ3RoID4gMCA/IHRoaXMuc2h1ZmZsZSh0YXJnZXRzKSA6IHVuZGVmaW5lZDtcbiAgfTtcblxuICAvKlxuICAqIFB1dCBmcmVlIGNvb3IgdG8gdGFrZW4gY29vclxuICAqIEBwYXJhbSB7b2JqZWN0fSBjb29yZFxuICAqL1xuICBwdXRGcmVlQ29vclRvVGFrZW5Db29yKGNvb3JkKSB7XG4gICAgLy90b2RvOiBSZW1vdmUgdGhlIGlmIHN0YXRlbWVudCBhbmQgYWRkIGEgZmlsdGVyIGJlZm9yZSBmb3JFYWNoXG4gICAgdGhpcy5jb29yZHMuZnJlZS5mb3JFYWNoKChteUNvb3JkLCBpbmRleCkgPT4ge1xuICAgICAgLy8gdG9kbzogY2xlYW4gdGhpcyB1cFxuICAgICAgaWYgKG15Q29vcmQueCA9PT0gY29vcmQueCAmJiBteUNvb3JkLnkgPT09IGNvb3JkLnkpIHtcbiAgICAgICAgdGhpcy5jb29yZHMuZnJlZS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuY29vcmRzLnRha2VuLnB1c2goY29vcmQpO1xuICB9O1xuXG4gIC8qXG4gICogU2h1ZmZsZVxuICAqIEBwYXJhbSB7b2JqZWN0fSBvXG4gICovXG4gIHNodWZmbGUobykge1xuICAgIGZvcihsZXQgaiwgeCwgaSA9IG8ubGVuZ3RoOyBpOyBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogaSksIHggPSBvWy0taV0sIG9baV0gPSBvW2pdLCBvW2pdID0geCk7XG4gICAgcmV0dXJuIG87XG4gIH07XG5cbiAgLypcbiAgKiBHZXQgY29vcmRcbiAgKiBAcGFyYW0ge251bWJlcn0geFxuICAqIEBwYXJhbSB7bnVtYmVyfSB5XG4gICovXG4gIGdldENvb3JkKHgsIHkpIHtcbiAgICAgIHJldHVybiB7eCwgeX07XG4gIH07XG5cbiAgLypcbiAgKiBTZXQgY29vcmRzXG4gICovXG4gIHNldENvb3JkcygpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29sOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5yb3c7IGorKykge1xuICAgICAgICB0aGlzLmNvb3Jkcy5hbGwucHVzaCh0aGlzLmdldENvb3JkKGksIGopKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gIENsb25lIHRoZSBhcnJheVkgb2YgYWxsIHBvc2l0aW9uIGFuZCBhZGQgaXQgdG8gZnJlZSBwb3NpdGlvbiBhcnJheS5cbiAgICB0aGlzLmNvb3Jkcy5mcmVlID0gdGhpcy5jb29yZHMuYWxsO1xuICB9O1xuXG4gIC8qXG4gICogU2hvdyBjb29yZHNcbiAgKiBUaGlzIHdpbGwgc2hvdyBibGFjayBkb3RzIGZvciBlYWNoIGNvb3Jkb25hdGVcbiAgKi9cbiAgc2hvd0Nvb3JkcygpIHtcbiAgICB0aGlzLmNvb3Jkcy5hbGwuZm9yRWFjaChjb29yZCA9PiB7XG4gICAgICBsZXQgbGVmdCA9IHRoaXMuZ3JpZFdpZHRoIC8gdGhpcy5jb2wgKiBjb29yZC54O1xuICAgICAgbGV0IHRvcCA9IHRoaXMuZ3JpZEhlaWdodCAvIHRoaXMucm93ICogY29vcmQueTtcbiAgICAgIGxlZnQgPSBsZWZ0ICogMTAwIC8gdGhpcy5ncmlkV2lkdGg7XG4gICAgICB0b3AgPSB0b3AgKiAxMDAgLyB0aGlzLmdyaWRIZWlnaHQ7XG4gICAgICBsZXQgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJESVZcIik7XG4gICAgICBub2RlLnN0eWxlLmNzc1RleHQgPSBgdG9wOiAke3RvcC0wLjV9JTsgbGVmdDogJHtsZWZ0LTAuMn0lYDtcbiAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKG5vZGUpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qXG4gICogQnVpbGQgZ3JpZFxuICAqIEBwYXJhbSB7c3RyaW5nfSBlbFxuICAqIEBwYXJhbSB7bnVtYmVyfSBnQ29sXG4gICogQHBhcmFtIHtudW1iZXJ9IGdSb3dcbiAgKi9cbiAgYnVpbGRHcmlkKHBhcmFtcykge1xuICAgIHZhciB7ZWwsIGNvbCwgcm93fSA9IHBhcmFtcztcbiAgICB0aGlzLmVsID0gZWw7XG4gICAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbCk7XG4gICAgdGhpcy5ncmlkV2lkdGggPSB0aGlzLmNvbnRhaW5lci5jbGllbnRXaWR0aDtcbiAgICB0aGlzLmdyaWRIZWlnaHQgPSB0aGlzLmNvbnRhaW5lci5jbGllbnRIZWlnaHQ7XG4gICAgdGhpcy5jb2wgPSBjb2w7Ly90b2RvOiB0aGlzIHNob3VsZCBiZSBtb3JlIHNwZWNpZmljLiBpdCB3aWxsIGhlbHAgdW5kZXJzdGFuZCB0aGUgY29kZSB3aGVuIHdlIGNhbGwgdGhpcyBmcm9tIGEgc3ViIGZ1bmN0aW9uLlxuICAgIHRoaXMucm93ID0gcm93O1xuICAgIHRoaXMuZ3JpZFdpZHRoU3BhY2VyID0gMiAqIDEwMCAvIHRoaXMuZ3JpZFdpZHRoO1xuICAgIHRoaXMuZ3JpZEhlaWdodFNwYWNlciA9IDIgKiAxMDAgLyB0aGlzLmdyaWRIZWlnaHQ7XG4gICAgdGhpcy50aWxlV2lkdGggPSB0aGlzLmdyaWRXaWR0aCAvIGNvbDsgLy90b2RvOiBmaW5kIGEgbW9yZSBzcGVjaWZpYyBuYW1lIGZvciB0aGlzLiBpdHMgbW9yZSBhIHpvbmUgb3IgYXJlYSB0aGVuIHRpbGVcbiAgICB0aGlzLnRpbGVIZWlnaHQgPSB0aGlzLmdyaWRIZWlnaHQgLyByb3c7XG5cbiAgICAvLyBTZXQgY29vcmRvbmF0ZVxuICAgIHRoaXMuc2V0Q29vcmRzKCk7XG4gICAgdGhpcy5zaG93Q29vcmRzKCk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdyaWQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7Y29uc3RhbnRzfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgR3JpZCBmcm9tICcuL2dyaWQnO1xuXG4vKipcbiogVGlsZVxuKi9cbmNsYXNzIFRpbGVzIGV4dGVuZHMgR3JpZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7IC8vIFRoaXMgd2lsbCBjYWxsIHRoZSBwYXJlbnQgY29uc3RydWN0b3JcbiAgICB0aGlzLnRpbGVzID0gW107XG4gICAgdGhpcy50aWxlUXVldWUgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gNDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgdGhpcy50aWxlcy5wdXNoKHtcbiAgICAgICAgaWQ6IGksXG4gICAgICAgIHRpdGxlOiAndGl0bGUnLFxuICAgICAgICBpbWc6ICcnXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBzaG93VGlsZSgpe1xuICAgIHRoaXMudGlsZVF1ZXVlLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICBsZXQgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJESVZcIik7XG4gICAgICBub2RlLnN0eWxlLmNzc1RleHQgPSBgdG9wOiAke2l0ZW0ueX0lOyBsZWZ0OiAke2l0ZW0ueH0lOyB3aWR0aDogJHtpdGVtLndpZHRofSU7IGhlaWdodDogJHtpdGVtLmhlaWdodH0lYDtcbiAgICAgIG5vZGUuY2xhc3NOYW1lID0gJ3RpbGUnO1xuICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQobm9kZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgLypcbiAgKiBHZXQgbmV4dCB0aWxlIHNpemVcbiAgKiBUaGlzIHdpbGwgZ2V0IHRoZSBuZXh0IHRpbGUgc2l6ZSB0byB1c2UuXG4gICogQHBhcmFtIHtzdHJpbmd9IHRpbGVJbmRleFxuICAqL1xuICBnZXROZXh0VGlsZVNpemUodGlsZUluZGV4KSB7XG4gICAgbGV0IGN1cnJlbnRUaWxlQ291bnQgPSAwO1xuICAgIGxldCB0aWxlU2l6ZSA9IG51bGw7XG4gICAgZm9yKGxldCBzaXplIGluIGNvbnN0YW50cy5USUxFX1NJWkUpe1xuICAgICAgY3VycmVudFRpbGVDb3VudCA9IGN1cnJlbnRUaWxlQ291bnQgKyBjb25zdGFudHMuVElMRV9TSVpFW3NpemVdLm1heEFtb3VudDtcbiAgICAgIGlmKHRpbGVJbmRleCA8IGN1cnJlbnRUaWxlQ291bnQpe1xuICAgICAgICByZXR1cm4gc2l6ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRpbGVTaXplO1xuICB9O1xuXG4gIC8qXG4gICogUmVkdWNlIHRpbGUgc2l6ZVxuICAqIFRoaXMgaXMgY2hlY2tpbmcgYWxsIHRoZSB0aWxlIHNpemUgYW5kIGxvb2sgZm9yIHRoZSBuZXh0IGFyZWEgc21hbGxlciB0aGVuIHRoZSBjdXJyZW50IG9uZS5cbiAgKiBUbyBmaW5kIHRoZSBhcmVhIHdlIGp1c3QgZW5lZCB0byBtdWx0aXBseSB0aGUgY29sIGFuZCByb3cgKGNvbnN0YW50cy5USUxFX1NJWkVbc2l6ZV0uY29sICogY29uc3RhbnRzLlRJTEVfU0laRVtzaXplXS5yb3cpXG4gICogQHBhcmFtIHtzdHJpbmd9IGN1cnJlbnRUaWxlU2l6ZSAtIGJpZywgbWVkaXVtLCBzbWFsbCwgZWN0LlxuICAqL1xuICByZWR1Y2VUaWxlU2l6ZShjdXJyZW50VGlsZVNpemUpIHtcbiAgICBsZXQgY3VycmVudFRpbGUgPSBjb25zdGFudHMuVElMRV9TSVpFW2N1cnJlbnRUaWxlU2l6ZV07XG4gICAgbGV0IGN1cnJlbnRUaWxlQXJlYSA9IGN1cnJlbnRUaWxlLmNvbCAqIGN1cnJlbnRUaWxlLnJvdztcbiAgICBsZXQgbmV4dFNpemUgPSBudWxsOyAvLyBUaGlzIHdpbGwgcmV0dXJuIG51bGwgaWYgbm8gc21hbGxlciB0aWxlIGFyZSBmb3VuZC5cbiAgICBmb3IgKGxldCBzaXplIGluIGNvbnN0YW50cy5USUxFX1NJWkUpIHtcbiAgICAgIGxldCBuZXh0VGlsZUFyZWEgPSBjb25zdGFudHMuVElMRV9TSVpFW3NpemVdLmNvbCAqIGNvbnN0YW50cy5USUxFX1NJWkVbc2l6ZV0ucm93O1xuICAgICAgaWYgKG5leHRUaWxlQXJlYSA8IGN1cnJlbnRUaWxlQXJlYSkge1xuICAgICAgICByZXR1cm4gc2l6ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5leHRTaXplO1xuICB9O1xuXG4gIC8qXG4gICogR2V0IG1heCB0aWxlIGNvdW50XG4gICovXG4gIGdldE1heFRpbGVDb3VudCgpIHtcbiAgICBsZXQgbWF4VGlsZUNvdW50ID0gMDtcbiAgICBmb3IgKGxldCBzaXplIGluIGNvbnN0YW50cy5USUxFX1NJWkUpIHtcbiAgICAgIG1heFRpbGVDb3VudCA9IG1heFRpbGVDb3VudCArIGNvbnN0YW50cy5USUxFX1NJWkVbc2l6ZV0ubWF4QW1vdW50O1xuICAgIH1cbiAgICByZXR1cm4gbWF4VGlsZUNvdW50O1xuICB9O1xuXG4gIC8qXG4gICogQnVpbGQgdGlsZXNcbiAgKi9cbiAgYnVpbGRUaWxlcygpIHtcbiAgICBsZXQgc2l6ZSA9IG51bGw7XG4gICAgbGV0IHRpbGVDb3VudCA9IDA7XG4gICAgbGV0IG1heFRpbGUgPSB0aGlzLmdldE1heFRpbGVDb3VudCgpO1xuXG4gICAgdGhpcy50aWxlcy5mb3JFYWNoKCh0aWxlLCBpbmRleCkgPT4ge1xuICAgICAgaWYodGhpcy5jb29yZHMuZnJlZS5sZW5ndGggPiAwICYmIHRpbGVDb3VudCA8IG1heFRpbGUpIHtcblxuICAgICAgICB0aWxlLnNpemUgPSB0aGlzLmdldE5leHRUaWxlU2l6ZSh0aWxlQ291bnQpO1xuICAgICAgICBsZXQgYXZhaWxhYmxlQXJlYUNvb3JkcyA9IG51bGw7XG5cbiAgICAgICAgLy8gSWYgbm8gc3BhY2Ugd2VyZSBmb3VuZCB0aGF0IG1lYW4gdGhlIHRpbGUgaXMgdG8gYmlnLlxuICAgICAgICAvLyBOZWVkIHRvIHNpemUgaXQgZG93biBhIGJpdFxuICAgICAgICBsZXQgZmluZE5leHRBdmFpbGFibGVBcmVhQ29vcmRzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdGlsZS5zaXplID0gdGhpcy5yZWR1Y2VUaWxlU2l6ZSh0aWxlLnNpemUpO1xuICAgICAgICAgIGlmKCF0aWxlLnNpemUpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIGxldCBhdmFpbGFibGVBcmVhQ29vcmRzID0gdGhpcy5nZXROZXdUaWxlQXJlYSh0aWxlLnNpemUpO1xuICAgICAgICAgIGlmKCFhdmFpbGFibGVBcmVhQ29vcmRzKXtcbiAgICAgICAgICAgIHJldHVybiBmaW5kTmV4dEF2YWlsYWJsZUFyZWFDb29yZHMoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGF2YWlsYWJsZUFyZWFDb29yZHM7XG4gICAgICAgIH0uYmluZCh0aGlzKTtcblxuICAgICAgICAvLyBDaGVjayBpZiB3ZSBmb3VuZCBhIHBsYWNlIGZvciB0aGUgdGlsZVxuICAgICAgICBhdmFpbGFibGVBcmVhQ29vcmRzID0gZmluZE5leHRBdmFpbGFibGVBcmVhQ29vcmRzKCk7XG4gICAgICAgIC8vIEp1c3QgbWFraW5nIHN1cmUgd2UgaGF2ZSBzcGFjZSBmb3IgdGhpcyB0aWxlLlxuICAgICAgICAvLyBXZSB3b250IG5lZWQgdGhpcyBjb25kaXRpb24gYWZ0ZXIgSSBtYWtlIGEgcmVjdXJzaW9uIGZvciB0aGUgZG93bnNpemluZyB0aWxlIGZ1bmN0aW9uXG4gICAgICAgIGlmKGF2YWlsYWJsZUFyZWFDb29yZHMpe1xuICAgICAgICAgIHRpbGVDb3VudCsrO1xuICAgICAgICAgIHRpbGUua2V5ID0gaW5kZXg7XG4gICAgICAgICAgdGlsZS50YXJnZXQgPSBhdmFpbGFibGVBcmVhQ29vcmRzWzBdOyAvL1Rha2UgdGhlIGZpcnN0IG9uZSBpbiB0aGUgYXJyYXkuIFRoZXkgYXJlIGFscmVhZHkgc2hvdmVsZWRcbiAgICAgICAgICB0aWxlLmNvbCA9IGNvbnN0YW50cy5USUxFX1NJWkVbdGlsZS5zaXplXS5jb2w7XG4gICAgICAgICAgdGlsZS5yb3cgPSBjb25zdGFudHMuVElMRV9TSVpFW3RpbGUuc2l6ZV0ucm93O1xuICAgICAgICAgIGxldCBteVRpbGUgPSBuZXcgVGlsZSh0aGlzLCB0aWxlKTtcblxuICAgICAgICAgIC8vIFVwZGF0ZSBmcmVlICYgdGFrZW4gY29vcmRzXG4gICAgICAgICAgbGV0IHRpbGVPY2N1cGF0aW9uQ29vcmRzID0gdGhpcy5nZXRPY2N1cGF0aW9uRnJvbUNvb3JkKHt0b3RhbENvbDogdGlsZS5jb2wsIHRvdGFsUm93OiB0aWxlLnJvdywgY29vcmQ6IHRpbGUudGFyZ2V0fSk7XG4gICAgICAgICAgdGlsZU9jY3VwYXRpb25Db29yZHMuZm9yRWFjaChjb29yZHMgPT4ge1xuICAgICAgICAgICAgdGhpcy5wdXRGcmVlQ29vclRvVGFrZW5Db29yKGNvb3Jkcyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy50aWxlUXVldWUucHVzaChteVRpbGUuZ2V0VGlsZUluZm9zKCkpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAvLyBubyB0aWxlIGFkZGVkIHRvIHRoZSBxdWV1ZSBiZWNhdXNlIHdlIGRpZCBub3QgZmluZCB0aGUgc3BhY2UgZm9yIGl0XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcbn1cblxuXG4vKipcbiogVGlsZVxuKiBAcGFyYW0ge29iamVjdH0gZ3JpZFxuKiBAcGFyYW0ge29iamVjdH0gcGFyYW1zXG4qL1xuZnVuY3Rpb24gVGlsZShncmlkLCBwYXJhbXMpIHtcbiAgdGhpcy5ncmlkID0gZ3JpZDtcbiAgdGhpcy5wYXJhbXMgPSBwYXJhbXM7XG59XG5cbi8qXG4qIEdldCB0aWxlIGluZm9zXG4qL1xuVGlsZS5wcm90b3R5cGUuZ2V0VGlsZUluZm9zID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB7XG4gICAgc2l6ZTogdGhpcy5wYXJhbXMuc2l6ZSxcbiAgICB4OiB0aGlzLnBhcmFtcy50YXJnZXQueCAqIHRoaXMuZ3JpZC50aWxlV2lkdGggKiAxMDAgLyB0aGlzLmdyaWQuZ3JpZFdpZHRoLFxuICAgIHk6IHRoaXMucGFyYW1zLnRhcmdldC55ICogdGhpcy5ncmlkLnRpbGVIZWlnaHQgKiAxMDAgLyB0aGlzLmdyaWQuZ3JpZEhlaWdodCxcbiAgICB3aWR0aDogKHRoaXMucGFyYW1zLmNvbCAqIDEwMCAvIHRoaXMuZ3JpZC5jb2wpIC0gdGhpcy5ncmlkLmdyaWRXaWR0aFNwYWNlcixcbiAgICBoZWlnaHQ6ICh0aGlzLnBhcmFtcy5yb3cgKiAxMDAgLyB0aGlzLmdyaWQucm93KSAtIHRoaXMuZ3JpZC5ncmlkSGVpZ2h0U3BhY2VyLFxuICAgIGlkOiB0aGlzLnBhcmFtcy5rZXlcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFRpbGVzO1xuIl19
