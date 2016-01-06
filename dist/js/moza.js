(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";

var _interopRequire = function _interopRequire(obj) {
  return obj && obj.__esModule ? obj["default"] : obj;
};

var constants = require("./config").constants;

var request = _interopRequire(require("../../node_modules/superagent/lib/client.js"));

var _tiles = require("./tiles");

var Tile = _tiles.Tile;
var Tiles = _tiles.Tiles;

var Grid = _interopRequire(require("./grid"));

var Moza = function Moza(state) {
  var totalCol = state.totalCol;
  var totalRow = state.totalRow;
  var el = state.el;
  var url = state.url;
  var myGrid = Grid(state);
  var myTiles = Tiles(state);
  var _myGrid$getParams = myGrid.getParams();

  var gridWidth = _myGrid$getParams.gridWidth;
  var gridHeight = _myGrid$getParams.gridHeight;
  var gridWidthSpacer = _myGrid$getParams.gridWidthSpacer;
  var gridHeightSpacer = _myGrid$getParams.gridHeightSpacer;
  var spaceWidth = _myGrid$getParams.spaceWidth;
  var spaceHeight = _myGrid$getParams.spaceHeight;

  var coords = {
    all: [],
    free: [],
    taken: []
  },
      maxTiles = 40,
      tiles = [],
      tileQueue = [],
      container = document.getElementById(el);

  /**
  * Check availability of coords from coord
  * @param {object} coords
  */
  var checkAvailabilityOfCoordsFromCoord = function checkAvailabilityOfCoordsFromCoord(myCoords) {
    var y = 0;
    myCoords.forEach(function (coord) {
      var i = coords.free.length;
      while (i--) {
        if (coords.free[i].col === coord.col && coords.free[i].row === coord.row) {
          y++;
        }
      }
    });
    return myCoords.length === y;
  };

  /*
  * Get occupation from coord
  * This will get an array with all the point occuped by the tile
  * @param {number} totalCol
  * @param {number} totalRow
  * @param {object} coord
  */
  var getOccupationFromCoord = function getOccupationFromCoord(params) {
    var totalCol = params.totalCol;
    var totalRow = params.totalRow;
    var coord = params.coord;
    var coords = [];
    if (coord) {
      for (var i = 0; i < totalCol; i++) {
        for (var j = 0; j < totalRow; j++) {
          coords.push({ col: i + coord.col, row: j + coord.row });
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
  var getNewTileArea = function getNewTileArea(tileSize) {
    var targets = [],
        totalCol = constants.TILE_SIZE[tileSize].col,
        totalRow = constants.TILE_SIZE[tileSize].row;
    coords.free.forEach(function (freeCoord) {
      // make sure the tile ending end don't go futher then the grid edge
      var tileRightEdge = (freeCoord.col + totalCol) * spaceWidth,
          tileBottomEdge = (freeCoord.row + totalRow) * spaceHeight;

      if (tileRightEdge <= gridWidth && tileBottomEdge <= gridHeight) {
        // We jsut fond a good spot for this tile.
        // It's time to check if the area is clear.
        var _coords = getOccupationFromCoord({ totalCol: totalCol, totalRow: totalRow, coord: freeCoord });
        if (checkAvailabilityOfCoordsFromCoord(_coords)) {
          targets.push(freeCoord);
        }
      }
    });
    // If the targets is empty that mean 2 things:
    // - the tile was to big
    // - the tile had the right size but no area was available
    return targets.length > 0 ? shuffle(targets) : undefined;
  };

  /*
  * Put free coor to taken coor
  * @param {object} coord
  */
  var putFreeCoorToTakenCoor = function putFreeCoorToTakenCoor(coord) {
    //todo: Remove the if statement and add a filter before forEach
    coords.free.forEach(function (myCoord, index) {
      // todo: clean this up
      if (myCoord.col === coord.col && myCoord.row === coord.row) {
        coords.free.splice(index, 1);
      }
    });
    coords.taken.push(coord);
  };

  /*
  * Shuffle
  * @param {object} o
  */
  var shuffle = function shuffle(o) {
    for (var j = undefined, x = undefined, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x) {}
    return o;
  };

  var showTile = function showTile() {
    var url = state.url;

    //todo: optomize  code duplication.
    if (url) {
      request.get(url).end(function (err, res) {
        res = JSON.parse(res.text);
        tileQueue.forEach(function (item, index) {
          var node = document.createElement("DIV");
          node.style.cssText = "top: " + item.y + "%; left: " + item.x + "%; width: " + item.width + "%; height: " + item.height + "%; background-image: url(" + res[index].img + ")";
          node.className = "tile";
          container.appendChild(node);
        });
      });
    } else {
      tileQueue.forEach(function (item, index) {
        var node = document.createElement("DIV");
        node.style.cssText = "top: " + item.y + "%; left: " + item.x + "%; width: " + item.width + "%; height: " + item.height + "%";
        node.className = "tile";
        container.appendChild(node);
      });
    }
  };

  /*
  * Build tiles
  */
  var buildTiles = function buildTiles() {
    var size = null,
        tileCount = 0,
        maxTile = myTiles.getMaxTileCount();

    for (var i = 0, len = maxTiles; i < len; i++) {
      tiles.push({
        id: i
      });
    };

    tiles.forEach(function (tile, index) {
      if (coords.free.length > 0 && tileCount < maxTile) {
        (function () {

          tile.size = myTiles.getNextTileSize(tileCount);
          var availableAreaCoords = null;

          // If no space were found that mean the tile is to big.
          // Need to size it down a bit
          var findNextAvailableAreaCoords = (function () {
            tile.size = myTiles.reduceTileSize(tile.size);

            if (!tile.size) {
              return undefined;
            }
            var availableAreaCoords = getNewTileArea(tile.size);
            if (!availableAreaCoords) {
              return findNextAvailableAreaCoords();
            }
            return availableAreaCoords;
          }).bind(undefined);

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
            var myTile = new Tile(state, tile, myGrid.getParams());
            // Update free & taken coords
            var tileOccupationCoords = getOccupationFromCoord({ totalCol: tile.col, totalRow: tile.row, coord: tile.target });
            tileOccupationCoords.forEach(function (coords) {
              putFreeCoorToTakenCoor(coords);
            });
            tileQueue.push(myTile.getTileInfos());
          } else {}
        })();
      }
    });
  };

  return {
    build: function build() {
      myGrid.buildGrid();
      coords.all = coords.free = myGrid.getCoords();
      buildTiles();
      showTile();
    }
  };
};

Moza({ el: "myStage1", totalCol: 7, totalRow: 7, url: "../../data/default.json" }).build();

global.Moza = Moza;

// no tile added to the queue because we did not find the space for it

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9zdXBlcnMvU2l0ZXMvbW96YS9zcmMvanMvbW96YS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsWUFBWSxDQUFDOztBQUViLElBQUksZUFBZSxHQUFHLFNBQUEsZUFBQSxDQUFVLEdBQUcsRUFBRTtBQUFFLFNBQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztDQUFFLENBQUM7O0FBRTlGLElBRlMsU0FBUyxHQUFBLE9BQUEsQ0FBUSxVQUFVLENBQUEsQ0FBM0IsU0FBUyxDQUFBOztBQUlsQixJQUhPLE9BQU8sR0FBQSxlQUFBLENBQUEsT0FBQSxDQUFNLDZDQUE2QyxDQUFBLENBQUEsQ0FBQTs7QUFLakUsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUpRLFNBQVMsQ0FBQSxDQUFBOztBQU1yQyxJQU5TLElBQUksR0FBQSxNQUFBLENBQUosSUFBSSxDQUFBO0FBT2IsSUFQZSxLQUFLLEdBQUEsTUFBQSxDQUFMLEtBQUssQ0FBQTs7QUFTcEIsSUFSTyxJQUFJLEdBQUEsZUFBQSxDQUFBLE9BQUEsQ0FBTSxRQUFRLENBQUEsQ0FBQSxDQUFBOztBQUV6QixJQUFNLElBQUksR0FBRyxTQUFBLElBQUEsQ0FBQyxLQUFLLEVBQUs7QUFTdEIsTUFSUSxRQUFRLEdBQXdCLEtBQUssQ0FBckMsUUFBUSxDQUFBO0FBU2hCLE1BVGtCLFFBQVEsR0FBYyxLQUFLLENBQTNCLFFBQVEsQ0FBQTtBQVUxQixNQVY0QixFQUFFLEdBQVUsS0FBSyxDQUFqQixFQUFFLENBQUE7QUFBeEIsTUFBMEIsR0FBRyxHQUFLLEtBQUssQ0FBYixHQUFHLENBQVU7QUFDdkMsTUFBQSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBQ3BCLE1BQUEsT0FBTyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQVk1QixNQUFJLGlCQUFpQixHQVh3RSxNQUFNLENBQUMsU0FBUyxF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QUFFLElBQUksQ0FBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDO0FBQ2hILGdDQUFvQixDQUFDLE9BQU8sQ0FBQyxVQUFBLE1BQU0sRUFBSTtBQUNyQyxvQ0FBc0IsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNoQyxDQUFDLENBQUM7QUFDSCxxQkFBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztXQUN2QyxNQUFJLEVBRUo7U0FrQkEsQ0FBQSxFQUFHLENBQUM7T0FqQk47S0FDRixDQUFDLENBQUM7R0FDSixDQUFBOztBQUVELFNBQU87QUFDTCxTQUFLLEVBQUUsU0FBQSxLQUFBLEdBQU07QUFDWCxZQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7QUFDbkIsWUFBTSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztBQUM5QyxnQkFBVSxFQUFFLENBQUM7QUFDYixjQUFRLEVBQUUsQ0FBQztLQUNaO0dBQ0YsQ0FBQTtDQUNGLENBQUM7O0FBRUYsSUFBSSxDQUFDLEVBQUMsRUFBRSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLHlCQUF5QixFQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7QUFFdkYsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgY29uc3RhbnRzIH0gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHJlcXVlc3QgZnJvbSAnLi4vLi4vbm9kZV9tb2R1bGVzL3N1cGVyYWdlbnQvbGliL2NsaWVudC5qcyc7XG5pbXBvcnQgeyBUaWxlLCBUaWxlcyB9IGZyb20gJy4vdGlsZXMnO1xuaW1wb3J0IEdyaWQgZnJvbSAnLi9ncmlkJztcblxuY29uc3QgTW96YSA9IChzdGF0ZSkgPT4ge1xuICBjb25zdCB7IHRvdGFsQ29sLCB0b3RhbFJvdywgZWwsIHVybCB9ID0gc3RhdGUsXG4gICAgICAgIG15R3JpZCA9IEdyaWQoc3RhdGUpLFxuICAgICAgICBteVRpbGVzID0gVGlsZXMoc3RhdGUpLFxuICAgICAgICB7IGdyaWRXaWR0aCwgZ3JpZEhlaWdodCwgZ3JpZFdpZHRoU3BhY2VyLCBncmlkSGVpZ2h0U3BhY2VyLCBzcGFjZVdpZHRoLCBzcGFjZUhlaWdodH0gPSBteUdyaWQuZ2V0UGFyYW1zKCk7XG5cbiAgbGV0IGNvb3JkcyA9IHtcbiAgICAgICBhbGw6IFtdLFxuICAgICAgIGZyZWU6IFtdLFxuICAgICAgIHRha2VuOiBbXVxuICAgICB9LFxuICAgICBtYXhUaWxlcyA9IDQwLFxuICAgICB0aWxlcyA9IFtdLFxuICAgICB0aWxlUXVldWUgPSBbXSxcbiAgICAgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWwpO1xuXG4gIC8qKlxuICAqIENoZWNrIGF2YWlsYWJpbGl0eSBvZiBjb29yZHMgZnJvbSBjb29yZFxuICAqIEBwYXJhbSB7b2JqZWN0fSBjb29yZHNcbiAgKi9cbiAgbGV0IGNoZWNrQXZhaWxhYmlsaXR5T2ZDb29yZHNGcm9tQ29vcmQgPSAobXlDb29yZHMpID0+IHtcbiAgICBsZXQgeSA9IDA7XG4gICAgbXlDb29yZHMuZm9yRWFjaChjb29yZCA9PiB7XG4gICAgICBsZXQgaSA9IGNvb3Jkcy5mcmVlLmxlbmd0aDtcbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgaWYgKGNvb3Jkcy5mcmVlW2ldLmNvbCA9PT0gY29vcmQuY29sICYmIGNvb3Jkcy5mcmVlW2ldLnJvdyA9PT0gY29vcmQucm93KSB7XG4gICAgICAgICAgeSsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG15Q29vcmRzLmxlbmd0aCA9PT0geTtcbiAgfTtcblxuICAvKlxuICAqIEdldCBvY2N1cGF0aW9uIGZyb20gY29vcmRcbiAgKiBUaGlzIHdpbGwgZ2V0IGFuIGFycmF5IHdpdGggYWxsIHRoZSBwb2ludCBvY2N1cGVkIGJ5IHRoZSB0aWxlXG4gICogQHBhcmFtIHtudW1iZXJ9IHRvdGFsQ29sXG4gICogQHBhcmFtIHtudW1iZXJ9IHRvdGFsUm93XG4gICogQHBhcmFtIHtvYmplY3R9IGNvb3JkXG4gICovXG4gIGxldCBnZXRPY2N1cGF0aW9uRnJvbUNvb3JkID0gKHBhcmFtcykgPT4ge1xuICAgIGxldCB7dG90YWxDb2wsIHRvdGFsUm93LCBjb29yZH0gPSBwYXJhbXMsXG4gICAgICAgIGNvb3JkcyA9IFtdO1xuICAgIGlmIChjb29yZCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b3RhbENvbDsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdG90YWxSb3c7IGorKykge1xuICAgICAgICAgIGNvb3Jkcy5wdXNoKHtjb2w6IGkgKyBjb29yZC5jb2wsIHJvdzogaiArIGNvb3JkLnJvd30pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gY29vcmRzO1xuICAgIH1cbiAgICAvLyB0b2RvOiBzaG91bGQgcmV0dXJuIHNvbWV0aGluZyBhbnl3YXlcbiAgfTtcblxuICAvKlxuICAqIEdldCBuZXcgdGlsZUFyZWFcbiAgKiBJdGVyYXRlIGFjcm9zcyBlYWNoIGZyZWUgY29vcmRpbmF0ZXMgdG8gdGVzdCBpZiB0aGUgdGlsZSBjYW4gYmUgcGxhY2VkXG4gICogQHBhcmFtIHtzdHJpbmd9IHRpbGVTaXplXG4gICogQHJldHVybnMge2FycmF5fHVuZGVmaW5lZH1cbiAgKi9cbiAgbGV0IGdldE5ld1RpbGVBcmVhID0gKHRpbGVTaXplKSA9PiB7XG4gICAgbGV0IHRhcmdldHMgPSBbXSxcbiAgICAgICB0b3RhbENvbCA9IGNvbnN0YW50cy5USUxFX1NJWkVbdGlsZVNpemVdLmNvbCxcbiAgICAgICB0b3RhbFJvdyA9IGNvbnN0YW50cy5USUxFX1NJWkVbdGlsZVNpemVdLnJvdztcbiAgICBjb29yZHMuZnJlZS5mb3JFYWNoKGZyZWVDb29yZCA9PiB7XG4gICAgICAvLyBtYWtlIHN1cmUgdGhlIHRpbGUgZW5kaW5nIGVuZCBkb24ndCBnbyBmdXRoZXIgdGhlbiB0aGUgZ3JpZCBlZGdlXG4gICAgICBsZXQgdGlsZVJpZ2h0RWRnZSA9IChmcmVlQ29vcmQuY29sICsgdG90YWxDb2wpICogc3BhY2VXaWR0aCxcbiAgICAgICAgICB0aWxlQm90dG9tRWRnZSA9IChmcmVlQ29vcmQucm93ICsgdG90YWxSb3cpICogc3BhY2VIZWlnaHQ7XG5cbiAgICAgIGlmICh0aWxlUmlnaHRFZGdlIDw9IGdyaWRXaWR0aCAmJiB0aWxlQm90dG9tRWRnZSA8PSBncmlkSGVpZ2h0KSB7XG4gICAgICAgIC8vIFdlIGpzdXQgZm9uZCBhIGdvb2Qgc3BvdCBmb3IgdGhpcyB0aWxlLlxuICAgICAgICAvLyBJdCdzIHRpbWUgdG8gY2hlY2sgaWYgdGhlIGFyZWEgaXMgY2xlYXIuXG4gICAgICAgIGxldCBjb29yZHMgPSBnZXRPY2N1cGF0aW9uRnJvbUNvb3JkKHt0b3RhbENvbCwgdG90YWxSb3csIGNvb3JkOiBmcmVlQ29vcmR9KTtcbiAgICAgICAgaWYgKGNoZWNrQXZhaWxhYmlsaXR5T2ZDb29yZHNGcm9tQ29vcmQoY29vcmRzKSkge1xuICAgICAgICAgIHRhcmdldHMucHVzaChmcmVlQ29vcmQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgLy8gSWYgdGhlIHRhcmdldHMgaXMgZW1wdHkgdGhhdCBtZWFuIDIgdGhpbmdzOlxuICAgIC8vIC0gdGhlIHRpbGUgd2FzIHRvIGJpZ1xuICAgIC8vIC0gdGhlIHRpbGUgaGFkIHRoZSByaWdodCBzaXplIGJ1dCBubyBhcmVhIHdhcyBhdmFpbGFibGVcbiAgICByZXR1cm4gdGFyZ2V0cy5sZW5ndGggPiAwID8gc2h1ZmZsZSh0YXJnZXRzKSA6IHVuZGVmaW5lZDtcbiAgfTtcblxuICAvKlxuICAqIFB1dCBmcmVlIGNvb3IgdG8gdGFrZW4gY29vclxuICAqIEBwYXJhbSB7b2JqZWN0fSBjb29yZFxuICAqL1xuICBsZXQgcHV0RnJlZUNvb3JUb1Rha2VuQ29vciA9IChjb29yZCkgPT4ge1xuICAgIC8vdG9kbzogUmVtb3ZlIHRoZSBpZiBzdGF0ZW1lbnQgYW5kIGFkZCBhIGZpbHRlciBiZWZvcmUgZm9yRWFjaFxuICAgIGNvb3Jkcy5mcmVlLmZvckVhY2goKG15Q29vcmQsIGluZGV4KSA9PiB7XG4gICAgICAvLyB0b2RvOiBjbGVhbiB0aGlzIHVwXG4gICAgICBpZiAobXlDb29yZC5jb2wgPT09IGNvb3JkLmNvbCAmJiBteUNvb3JkLnJvdyA9PT0gY29vcmQucm93KSB7XG4gICAgICAgIGNvb3Jkcy5mcmVlLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29vcmRzLnRha2VuLnB1c2goY29vcmQpO1xuICB9O1xuXG4gIC8qXG4gICogU2h1ZmZsZVxuICAqIEBwYXJhbSB7b2JqZWN0fSBvXG4gICovXG4gIGxldCBzaHVmZmxlID0gKG8pID0+IHtcbiAgICBmb3IobGV0IGosIHgsIGkgPSBvLmxlbmd0aDsgaTsgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGkpLCB4ID0gb1stLWldLCBvW2ldID0gb1tqXSwgb1tqXSA9IHgpO1xuICAgIHJldHVybiBvO1xuICB9XG5cbiAgbGV0IHNob3dUaWxlID0gKCkgPT4ge1xuICAgIGxldCB7dXJsfSA9IHN0YXRlO1xuXG4gICAgLy90b2RvOiBvcHRvbWl6ZSAgY29kZSBkdXBsaWNhdGlvbi5cbiAgICBpZiAodXJsKSB7XG4gICAgICByZXF1ZXN0XG4gICAgICAgIC5nZXQodXJsKVxuICAgICAgICAuZW5kKGZ1bmN0aW9uKGVyciwgcmVzKXtcbiAgICAgICAgICByZXMgPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICB0aWxlUXVldWUuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGxldCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIkRJVlwiKTtcbiAgICAgICAgICAgIG5vZGUuc3R5bGUuY3NzVGV4dCA9IGB0b3A6ICR7aXRlbS55fSU7IGxlZnQ6ICR7aXRlbS54fSU7IHdpZHRoOiAke2l0ZW0ud2lkdGh9JTsgaGVpZ2h0OiAke2l0ZW0uaGVpZ2h0fSU7IGJhY2tncm91bmQtaW1hZ2U6IHVybCgke3Jlc1tpbmRleF0uaW1nfSlgO1xuICAgICAgICAgICAgbm9kZS5jbGFzc05hbWUgPSAndGlsZSc7XG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobm9kZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aWxlUXVldWUuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgbGV0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiRElWXCIpO1xuICAgICAgICBub2RlLnN0eWxlLmNzc1RleHQgPSBgdG9wOiAke2l0ZW0ueX0lOyBsZWZ0OiAke2l0ZW0ueH0lOyB3aWR0aDogJHtpdGVtLndpZHRofSU7IGhlaWdodDogJHtpdGVtLmhlaWdodH0lYDtcbiAgICAgICAgbm9kZS5jbGFzc05hbWUgPSAndGlsZSc7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChub2RlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICAvKlxuICAqIEJ1aWxkIHRpbGVzXG4gICovXG4gIGxldCBidWlsZFRpbGVzID0gKCkgPT4ge1xuICAgIGxldCBzaXplID0gbnVsbCxcbiAgICAgICAgdGlsZUNvdW50ID0gMCxcbiAgICAgICAgbWF4VGlsZSA9IG15VGlsZXMuZ2V0TWF4VGlsZUNvdW50KCk7XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gbWF4VGlsZXM7IGkgPCBsZW47IGkrKykge1xuICAgICAgdGlsZXMucHVzaCh7XG4gICAgICAgIGlkOiBpXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGlsZXMuZm9yRWFjaCgodGlsZSwgaW5kZXgpID0+IHtcbiAgICAgIGlmKGNvb3Jkcy5mcmVlLmxlbmd0aCA+IDAgJiYgdGlsZUNvdW50IDwgbWF4VGlsZSkge1xuXG4gICAgICAgIHRpbGUuc2l6ZSA9IG15VGlsZXMuZ2V0TmV4dFRpbGVTaXplKHRpbGVDb3VudCk7XG4gICAgICAgIGxldCBhdmFpbGFibGVBcmVhQ29vcmRzID0gbnVsbDtcblxuICAgICAgICAvLyBJZiBubyBzcGFjZSB3ZXJlIGZvdW5kIHRoYXQgbWVhbiB0aGUgdGlsZSBpcyB0byBiaWcuXG4gICAgICAgIC8vIE5lZWQgdG8gc2l6ZSBpdCBkb3duIGEgYml0XG4gICAgICAgIGxldCBmaW5kTmV4dEF2YWlsYWJsZUFyZWFDb29yZHMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICB0aWxlLnNpemUgPSBteVRpbGVzLnJlZHVjZVRpbGVTaXplKHRpbGUuc2l6ZSk7XG5cbiAgICAgICAgICBpZiAoIXRpbGUuc2l6ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgICAgbGV0IGF2YWlsYWJsZUFyZWFDb29yZHMgPSBnZXROZXdUaWxlQXJlYSh0aWxlLnNpemUpO1xuICAgICAgICAgIGlmICghYXZhaWxhYmxlQXJlYUNvb3Jkcykge1xuICAgICAgICAgICAgcmV0dXJuIGZpbmROZXh0QXZhaWxhYmxlQXJlYUNvb3JkcygpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gYXZhaWxhYmxlQXJlYUNvb3JkcztcbiAgICAgICAgfS5iaW5kKHRoaXMpO1xuXG4gICAgICAgIC8vIENoZWNrIGlmIHdlIGZvdW5kIGEgcGxhY2UgZm9yIHRoZSB0aWxlXG4gICAgICAgIGF2YWlsYWJsZUFyZWFDb29yZHMgPSBmaW5kTmV4dEF2YWlsYWJsZUFyZWFDb29yZHMoKTtcblxuICAgICAgICAvLyBKdXN0IG1ha2luZyBzdXJlIHdlIGhhdmUgc3BhY2UgZm9yIHRoaXMgdGlsZS5cbiAgICAgICAgLy8gV2Ugd29udCBuZWVkIHRoaXMgY29uZGl0aW9uIGFmdGVyIEkgbWFrZSBhIHJlY3Vyc2lvbiBmb3IgdGhlIGRvd25zaXppbmcgdGlsZSBmdW5jdGlvblxuICAgICAgICBpZihhdmFpbGFibGVBcmVhQ29vcmRzKXtcbiAgICAgICAgICB0aWxlQ291bnQrKztcbiAgICAgICAgICB0aWxlLmtleSA9IGluZGV4O1xuICAgICAgICAgIHRpbGUudGFyZ2V0ID0gYXZhaWxhYmxlQXJlYUNvb3Jkc1swXTsgLy9UYWtlIHRoZSBmaXJzdCBvbmUgaW4gdGhlIGFycmF5LiBUaGV5IGFyZSBhbHJlYWR5IHNob3ZlbGVkXG4gICAgICAgICAgdGlsZS5jb2wgPSBjb25zdGFudHMuVElMRV9TSVpFW3RpbGUuc2l6ZV0uY29sO1xuICAgICAgICAgIHRpbGUucm93ID0gY29uc3RhbnRzLlRJTEVfU0laRVt0aWxlLnNpemVdLnJvdztcbiAgICAgICAgICBsZXQgbXlUaWxlID0gbmV3IFRpbGUoc3RhdGUsIHRpbGUsIG15R3JpZC5nZXRQYXJhbXMoKSk7XG4gICAgICAgICAgLy8gVXBkYXRlIGZyZWUgJiB0YWtlbiBjb29yZHNcbiAgICAgICAgICBsZXQgdGlsZU9jY3VwYXRpb25Db29yZHMgPSBnZXRPY2N1cGF0aW9uRnJvbUNvb3JkKHt0b3RhbENvbDogdGlsZS5jb2wsIHRvdGFsUm93OiB0aWxlLnJvdywgY29vcmQ6IHRpbGUudGFyZ2V0fSk7XG4gICAgICAgICAgdGlsZU9jY3VwYXRpb25Db29yZHMuZm9yRWFjaChjb29yZHMgPT4ge1xuICAgICAgICAgICAgcHV0RnJlZUNvb3JUb1Rha2VuQ29vcihjb29yZHMpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRpbGVRdWV1ZS5wdXNoKG15VGlsZS5nZXRUaWxlSW5mb3MoKSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIC8vIG5vIHRpbGUgYWRkZWQgdG8gdGhlIHF1ZXVlIGJlY2F1c2Ugd2UgZGlkIG5vdCBmaW5kIHRoZSBzcGFjZSBmb3IgaXRcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBidWlsZDogKCkgPT4ge1xuICAgICAgbXlHcmlkLmJ1aWxkR3JpZCgpO1xuICAgICAgY29vcmRzLmFsbCA9IGNvb3Jkcy5mcmVlID0gbXlHcmlkLmdldENvb3JkcygpO1xuICAgICAgYnVpbGRUaWxlcygpO1xuICAgICAgc2hvd1RpbGUoKTtcbiAgICB9XG4gIH1cbn07XG5cbk1vemEoe2VsOiAnbXlTdGFnZTEnLCB0b3RhbENvbDo3LCB0b3RhbFJvdzo3LCB1cmw6ICcuLi8uLi9kYXRhL2RlZmF1bHQuanNvbid9KS5idWlsZCgpO1xuXG5nbG9iYWwuTW96YSA9IE1vemE7XG4iXX0=
},{"../../node_modules/superagent/lib/client.js":2,"./config":5,"./grid":6,"./tiles":7}],2:[function(require,module,exports){
/**
 * Module dependencies.
 */

var Emitter = require('emitter');
var reduce = require('reduce');

/**
 * Root reference for iframes.
 */

var root;
if (typeof window !== 'undefined') { // Browser window
  root = window;
} else if (typeof self !== 'undefined') { // Web Worker
  root = self;
} else { // Other environments
  root = this;
}

/**
 * Noop.
 */

function noop(){};

/**
 * Check if `obj` is a host object,
 * we don't want to serialize these :)
 *
 * TODO: future proof, move to compoent land
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isHost(obj) {
  var str = {}.toString.call(obj);

  switch (str) {
    case '[object File]':
    case '[object Blob]':
    case '[object FormData]':
      return true;
    default:
      return false;
  }
}

/**
 * Determine XHR.
 */

request.getXHR = function () {
  if (root.XMLHttpRequest
      && (!root.location || 'file:' != root.location.protocol
          || !root.ActiveXObject)) {
    return new XMLHttpRequest;
  } else {
    try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) {}
  }
  return false;
};

/**
 * Removes leading and trailing whitespace, added to support IE.
 *
 * @param {String} s
 * @return {String}
 * @api private
 */

var trim = ''.trim
  ? function(s) { return s.trim(); }
  : function(s) { return s.replace(/(^\s*|\s*$)/g, ''); };

/**
 * Check if `obj` is an object.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isObject(obj) {
  return obj === Object(obj);
}

/**
 * Serialize the given `obj`.
 *
 * @param {Object} obj
 * @return {String}
 * @api private
 */

function serialize(obj) {
  if (!isObject(obj)) return obj;
  var pairs = [];
  for (var key in obj) {
    if (null != obj[key]) {
      pushEncodedKeyValuePair(pairs, key, obj[key]);
        }
      }
  return pairs.join('&');
}

/**
 * Helps 'serialize' with serializing arrays.
 * Mutates the pairs array.
 *
 * @param {Array} pairs
 * @param {String} key
 * @param {Mixed} val
 */

function pushEncodedKeyValuePair(pairs, key, val) {
  if (Array.isArray(val)) {
    return val.forEach(function(v) {
      pushEncodedKeyValuePair(pairs, key, v);
    });
  }
  pairs.push(encodeURIComponent(key)
    + '=' + encodeURIComponent(val));
}

/**
 * Expose serialization method.
 */

 request.serializeObject = serialize;

 /**
  * Parse the given x-www-form-urlencoded `str`.
  *
  * @param {String} str
  * @return {Object}
  * @api private
  */

function parseString(str) {
  var obj = {};
  var pairs = str.split('&');
  var parts;
  var pair;

  for (var i = 0, len = pairs.length; i < len; ++i) {
    pair = pairs[i];
    parts = pair.split('=');
    obj[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
  }

  return obj;
}

/**
 * Expose parser.
 */

request.parseString = parseString;

/**
 * Default MIME type map.
 *
 *     superagent.types.xml = 'application/xml';
 *
 */

request.types = {
  html: 'text/html',
  json: 'application/json',
  xml: 'application/xml',
  urlencoded: 'application/x-www-form-urlencoded',
  'form': 'application/x-www-form-urlencoded',
  'form-data': 'application/x-www-form-urlencoded'
};

/**
 * Default serialization map.
 *
 *     superagent.serialize['application/xml'] = function(obj){
 *       return 'generated xml here';
 *     };
 *
 */

 request.serialize = {
   'application/x-www-form-urlencoded': serialize,
   'application/json': JSON.stringify
 };

 /**
  * Default parsers.
  *
  *     superagent.parse['application/xml'] = function(str){
  *       return { object parsed from str };
  *     };
  *
  */

request.parse = {
  'application/x-www-form-urlencoded': parseString,
  'application/json': JSON.parse
};

/**
 * Parse the given header `str` into
 * an object containing the mapped fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function parseHeader(str) {
  var lines = str.split(/\r?\n/);
  var fields = {};
  var index;
  var line;
  var field;
  var val;

  lines.pop(); // trailing CRLF

  for (var i = 0, len = lines.length; i < len; ++i) {
    line = lines[i];
    index = line.indexOf(':');
    field = line.slice(0, index).toLowerCase();
    val = trim(line.slice(index + 1));
    fields[field] = val;
  }

  return fields;
}

/**
 * Check if `mime` is json or has +json structured syntax suffix.
 *
 * @param {String} mime
 * @return {Boolean}
 * @api private
 */

function isJSON(mime) {
  return /[\/+]json\b/.test(mime);
}

/**
 * Return the mime type for the given `str`.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

function type(str){
  return str.split(/ *; */).shift();
};

/**
 * Return header field parameters.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function params(str){
  return reduce(str.split(/ *; */), function(obj, str){
    var parts = str.split(/ *= */)
      , key = parts.shift()
      , val = parts.shift();

    if (key && val) obj[key] = val;
    return obj;
  }, {});
};

/**
 * Initialize a new `Response` with the given `xhr`.
 *
 *  - set flags (.ok, .error, etc)
 *  - parse header
 *
 * Examples:
 *
 *  Aliasing `superagent` as `request` is nice:
 *
 *      request = superagent;
 *
 *  We can use the promise-like API, or pass callbacks:
 *
 *      request.get('/').end(function(res){});
 *      request.get('/', function(res){});
 *
 *  Sending data can be chained:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' })
 *        .end(function(res){});
 *
 *  Or passed to `.send()`:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' }, function(res){});
 *
 *  Or passed to `.post()`:
 *
 *      request
 *        .post('/user', { name: 'tj' })
 *        .end(function(res){});
 *
 * Or further reduced to a single call for simple cases:
 *
 *      request
 *        .post('/user', { name: 'tj' }, function(res){});
 *
 * @param {XMLHTTPRequest} xhr
 * @param {Object} options
 * @api private
 */

function Response(req, options) {
  options = options || {};
  this.req = req;
  this.xhr = this.req.xhr;
  // responseText is accessible only if responseType is '' or 'text' and on older browsers
  this.text = ((this.req.method !='HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text')) || typeof this.xhr.responseType === 'undefined')
     ? this.xhr.responseText
     : null;
  this.statusText = this.req.xhr.statusText;
  this.setStatusProperties(this.xhr.status);
  this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
  // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
  // getResponseHeader still works. so we get content-type even if getting
  // other headers fails.
  this.header['content-type'] = this.xhr.getResponseHeader('content-type');
  this.setHeaderProperties(this.header);
  this.body = this.req.method != 'HEAD'
    ? this.parseBody(this.text ? this.text : this.xhr.response)
    : null;
}

/**
 * Get case-insensitive `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

Response.prototype.get = function(field){
  return this.header[field.toLowerCase()];
};

/**
 * Set header related properties:
 *
 *   - `.type` the content type without params
 *
 * A response of "Content-Type: text/plain; charset=utf-8"
 * will provide you with a `.type` of "text/plain".
 *
 * @param {Object} header
 * @api private
 */

Response.prototype.setHeaderProperties = function(header){
  // content-type
  var ct = this.header['content-type'] || '';
  this.type = type(ct);

  // params
  var obj = params(ct);
  for (var key in obj) this[key] = obj[key];
};

/**
 * Parse the given body `str`.
 *
 * Used for auto-parsing of bodies. Parsers
 * are defined on the `superagent.parse` object.
 *
 * @param {String} str
 * @return {Mixed}
 * @api private
 */

Response.prototype.parseBody = function(str){
  var parse = request.parse[this.type];
  return parse && str && (str.length || str instanceof Object)
    ? parse(str)
    : null;
};

/**
 * Set flags such as `.ok` based on `status`.
 *
 * For example a 2xx response will give you a `.ok` of __true__
 * whereas 5xx will be __false__ and `.error` will be __true__. The
 * `.clientError` and `.serverError` are also available to be more
 * specific, and `.statusType` is the class of error ranging from 1..5
 * sometimes useful for mapping respond colors etc.
 *
 * "sugar" properties are also defined for common cases. Currently providing:
 *
 *   - .noContent
 *   - .badRequest
 *   - .unauthorized
 *   - .notAcceptable
 *   - .notFound
 *
 * @param {Number} status
 * @api private
 */

Response.prototype.setStatusProperties = function(status){
  // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
  if (status === 1223) {
    status = 204;
  }

  var type = status / 100 | 0;

  // status / class
  this.status = this.statusCode = status;
  this.statusType = type;

  // basics
  this.info = 1 == type;
  this.ok = 2 == type;
  this.clientError = 4 == type;
  this.serverError = 5 == type;
  this.error = (4 == type || 5 == type)
    ? this.toError()
    : false;

  // sugar
  this.accepted = 202 == status;
  this.noContent = 204 == status;
  this.badRequest = 400 == status;
  this.unauthorized = 401 == status;
  this.notAcceptable = 406 == status;
  this.notFound = 404 == status;
  this.forbidden = 403 == status;
};

/**
 * Return an `Error` representative of this response.
 *
 * @return {Error}
 * @api public
 */

Response.prototype.toError = function(){
  var req = this.req;
  var method = req.method;
  var url = req.url;

  var msg = 'cannot ' + method + ' ' + url + ' (' + this.status + ')';
  var err = new Error(msg);
  err.status = this.status;
  err.method = method;
  err.url = url;

  return err;
};

/**
 * Expose `Response`.
 */

request.Response = Response;

/**
 * Initialize a new `Request` with the given `method` and `url`.
 *
 * @param {String} method
 * @param {String} url
 * @api public
 */

function Request(method, url) {
  var self = this;
  Emitter.call(this);
  this._query = this._query || [];
  this.method = method;
  this.url = url;
  this.header = {};
  this._header = {};
  this.on('end', function(){
    var err = null;
    var res = null;

    try {
      res = new Response(self);
    } catch(e) {
      err = new Error('Parser is unable to parse the response');
      err.parse = true;
      err.original = e;
      // issue #675: return the raw response if the response parsing fails
      err.rawResponse = self.xhr && self.xhr.responseText ? self.xhr.responseText : null;
      return self.callback(err);
    }

    self.emit('response', res);

    if (err) {
      return self.callback(err, res);
    }

    if (res.status >= 200 && res.status < 300) {
      return self.callback(err, res);
    }

    var new_err = new Error(res.statusText || 'Unsuccessful HTTP response');
    new_err.original = err;
    new_err.response = res;
    new_err.status = res.status;

    self.callback(new_err, res);
  });
}

/**
 * Mixin `Emitter`.
 */

Emitter(Request.prototype);

/**
 * Allow for extension
 */

Request.prototype.use = function(fn) {
  fn(this);
  return this;
}

/**
 * Set timeout to `ms`.
 *
 * @param {Number} ms
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.timeout = function(ms){
  this._timeout = ms;
  return this;
};

/**
 * Clear previous timeout.
 *
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.clearTimeout = function(){
  this._timeout = 0;
  clearTimeout(this._timer);
  return this;
};

/**
 * Abort the request, and clear potential timeout.
 *
 * @return {Request}
 * @api public
 */

Request.prototype.abort = function(){
  if (this.aborted) return;
  this.aborted = true;
  this.xhr.abort();
  this.clearTimeout();
  this.emit('abort');
  return this;
};

/**
 * Set header `field` to `val`, or multiple fields with one object.
 *
 * Examples:
 *
 *      req.get('/')
 *        .set('Accept', 'application/json')
 *        .set('X-API-Key', 'foobar')
 *        .end(callback);
 *
 *      req.get('/')
 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
 *        .end(callback);
 *
 * @param {String|Object} field
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.set = function(field, val){
  if (isObject(field)) {
    for (var key in field) {
      this.set(key, field[key]);
    }
    return this;
  }
  this._header[field.toLowerCase()] = val;
  this.header[field] = val;
  return this;
};

/**
 * Remove header `field`.
 *
 * Example:
 *
 *      req.get('/')
 *        .unset('User-Agent')
 *        .end(callback);
 *
 * @param {String} field
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.unset = function(field){
  delete this._header[field.toLowerCase()];
  delete this.header[field];
  return this;
};

/**
 * Get case-insensitive header `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api private
 */

Request.prototype.getHeader = function(field){
  return this._header[field.toLowerCase()];
};

/**
 * Set Content-Type to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.xml = 'application/xml';
 *
 *      request.post('/')
 *        .type('xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 *      request.post('/')
 *        .type('application/xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 * @param {String} type
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.type = function(type){
  this.set('Content-Type', request.types[type] || type);
  return this;
};

/**
 * Force given parser
 *
 * Sets the body parser no matter type.
 *
 * @param {Function}
 * @api public
 */

Request.prototype.parse = function(fn){
  this._parser = fn;
  return this;
};

/**
 * Set Accept to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.json = 'application/json';
 *
 *      request.get('/agent')
 *        .accept('json')
 *        .end(callback);
 *
 *      request.get('/agent')
 *        .accept('application/json')
 *        .end(callback);
 *
 * @param {String} accept
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.accept = function(type){
  this.set('Accept', request.types[type] || type);
  return this;
};

/**
 * Set Authorization field value with `user` and `pass`.
 *
 * @param {String} user
 * @param {String} pass
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.auth = function(user, pass){
  var str = btoa(user + ':' + pass);
  this.set('Authorization', 'Basic ' + str);
  return this;
};

/**
* Add query-string `val`.
*
* Examples:
*
*   request.get('/shoes')
*     .query('size=10')
*     .query({ color: 'blue' })
*
* @param {Object|String} val
* @return {Request} for chaining
* @api public
*/

Request.prototype.query = function(val){
  if ('string' != typeof val) val = serialize(val);
  if (val) this._query.push(val);
  return this;
};

/**
 * Write the field `name` and `val` for "multipart/form-data"
 * request bodies.
 *
 * ``` js
 * request.post('/upload')
 *   .field('foo', 'bar')
 *   .end(callback);
 * ```
 *
 * @param {String} name
 * @param {String|Blob|File} val
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.field = function(name, val){
  if (!this._formData) this._formData = new root.FormData();
  this._formData.append(name, val);
  return this;
};

/**
 * Queue the given `file` as an attachment to the specified `field`,
 * with optional `filename`.
 *
 * ``` js
 * request.post('/upload')
 *   .attach(new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
 *   .end(callback);
 * ```
 *
 * @param {String} field
 * @param {Blob|File} file
 * @param {String} filename
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.attach = function(field, file, filename){
  if (!this._formData) this._formData = new root.FormData();
  this._formData.append(field, file, filename);
  return this;
};

/**
 * Send `data`, defaulting the `.type()` to "json" when
 * an object is given.
 *
 * Examples:
 *
 *       // querystring
 *       request.get('/search')
 *         .end(callback)
 *
 *       // multiple data "writes"
 *       request.get('/search')
 *         .send({ search: 'query' })
 *         .send({ range: '1..5' })
 *         .send({ order: 'desc' })
 *         .end(callback)
 *
 *       // manual json
 *       request.post('/user')
 *         .type('json')
 *         .send('{"name":"tj"}')
 *         .end(callback)
 *
 *       // auto json
 *       request.post('/user')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // manual x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send('name=tj')
 *         .end(callback)
 *
 *       // auto x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // defaults to x-www-form-urlencoded
  *      request.post('/user')
  *        .send('name=tobi')
  *        .send('species=ferret')
  *        .end(callback)
 *
 * @param {String|Object} data
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.send = function(data){
  var obj = isObject(data);
  var type = this.getHeader('Content-Type');

  // merge
  if (obj && isObject(this._data)) {
    for (var key in data) {
      this._data[key] = data[key];
    }
  } else if ('string' == typeof data) {
    if (!type) this.type('form');
    type = this.getHeader('Content-Type');
    if ('application/x-www-form-urlencoded' == type) {
      this._data = this._data
        ? this._data + '&' + data
        : data;
    } else {
      this._data = (this._data || '') + data;
    }
  } else {
    this._data = data;
  }

  if (!obj || isHost(data)) return this;
  if (!type) this.type('json');
  return this;
};

/**
 * Invoke the callback with `err` and `res`
 * and handle arity check.
 *
 * @param {Error} err
 * @param {Response} res
 * @api private
 */

Request.prototype.callback = function(err, res){
  var fn = this._callback;
  this.clearTimeout();
  fn(err, res);
};

/**
 * Invoke callback with x-domain error.
 *
 * @api private
 */

Request.prototype.crossDomainError = function(){
  var err = new Error('Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.');
  err.crossDomain = true;

  err.status = this.status;
  err.method = this.method;
  err.url = this.url;

  this.callback(err);
};

/**
 * Invoke callback with timeout error.
 *
 * @api private
 */

Request.prototype.timeoutError = function(){
  var timeout = this._timeout;
  var err = new Error('timeout of ' + timeout + 'ms exceeded');
  err.timeout = timeout;
  this.callback(err);
};

/**
 * Enable transmission of cookies with x-domain requests.
 *
 * Note that for this to work the origin must not be
 * using "Access-Control-Allow-Origin" with a wildcard,
 * and also must set "Access-Control-Allow-Credentials"
 * to "true".
 *
 * @api public
 */

Request.prototype.withCredentials = function(){
  this._withCredentials = true;
  return this;
};

/**
 * Initiate request, invoking callback `fn(res)`
 * with an instanceof `Response`.
 *
 * @param {Function} fn
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.end = function(fn){
  var self = this;
  var xhr = this.xhr = request.getXHR();
  var query = this._query.join('&');
  var timeout = this._timeout;
  var data = this._formData || this._data;

  // store callback
  this._callback = fn || noop;

  // state change
  xhr.onreadystatechange = function(){
    if (4 != xhr.readyState) return;

    // In IE9, reads to any property (e.g. status) off of an aborted XHR will
    // result in the error "Could not complete the operation due to error c00c023f"
    var status;
    try { status = xhr.status } catch(e) { status = 0; }

    if (0 == status) {
      if (self.timedout) return self.timeoutError();
      if (self.aborted) return;
      return self.crossDomainError();
    }
    self.emit('end');
  };

  // progress
  var handleProgress = function(e){
    if (e.total > 0) {
      e.percent = e.loaded / e.total * 100;
    }
    self.emit('progress', e);
  };
  if (this.hasListeners('progress')) {
    xhr.onprogress = handleProgress;
  }
  try {
    if (xhr.upload && this.hasListeners('progress')) {
      xhr.upload.onprogress = handleProgress;
    }
  } catch(e) {
    // Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
    // Reported here:
    // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
  }

  // timeout
  if (timeout && !this._timer) {
    this._timer = setTimeout(function(){
      self.timedout = true;
      self.abort();
    }, timeout);
  }

  // querystring
  if (query) {
    query = request.serializeObject(query);
    this.url += ~this.url.indexOf('?')
      ? '&' + query
      : '?' + query;
  }

  // initiate request
  xhr.open(this.method, this.url, true);

  // CORS
  if (this._withCredentials) xhr.withCredentials = true;

  // body
  if ('GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !isHost(data)) {
    // serialize stuff
    var contentType = this.getHeader('Content-Type');
    var serialize = this._parser || request.serialize[contentType ? contentType.split(';')[0] : ''];
    if (!serialize && isJSON(contentType)) serialize = request.serialize['application/json'];
    if (serialize) data = serialize(data);
  }

  // set header fields
  for (var field in this.header) {
    if (null == this.header[field]) continue;
    xhr.setRequestHeader(field, this.header[field]);
  }

  // send stuff
  this.emit('request', this);

  // IE11 xhr.send(undefined) sends 'undefined' string as POST payload (instead of nothing)
  // We need null here if data is undefined
  xhr.send(typeof data !== 'undefined' ? data : null);
  return this;
};

/**
 * Faux promise support
 *
 * @param {Function} fulfill
 * @param {Function} reject
 * @return {Request}
 */

Request.prototype.then = function (fulfill, reject) {
  return this.end(function(err, res) {
    err ? reject(err) : fulfill(res);
  });
}

/**
 * Expose `Request`.
 */

request.Request = Request;

/**
 * Issue a request:
 *
 * Examples:
 *
 *    request('GET', '/users').end(callback)
 *    request('/users').end(callback)
 *    request('/users', callback)
 *
 * @param {String} method
 * @param {String|Function} url or callback
 * @return {Request}
 * @api public
 */

function request(method, url) {
  // callback
  if ('function' == typeof url) {
    return new Request('GET', method).end(url);
  }

  // url first
  if (1 == arguments.length) {
    return new Request('GET', method);
  }

  return new Request(method, url);
}

/**
 * GET `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.get = function(url, data, fn){
  var req = request('GET', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.query(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * HEAD `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.head = function(url, data, fn){
  var req = request('HEAD', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * DELETE `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

function del(url, fn){
  var req = request('DELETE', url);
  if (fn) req.end(fn);
  return req;
};

request.del = del;
request.delete = del;

/**
 * PATCH `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} data
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.patch = function(url, data, fn){
  var req = request('PATCH', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * POST `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} data
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.post = function(url, data, fn){
  var req = request('POST', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * PUT `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.put = function(url, data, fn){
  var req = request('PUT', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * Expose `request`.
 */

module.exports = request;

},{"emitter":3,"reduce":4}],3:[function(require,module,exports){

/**
 * Expose `Emitter`.
 */

module.exports = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks[event] = this._callbacks[event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  var self = this;
  this._callbacks = this._callbacks || {};

  function on() {
    self.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks[event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks[event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks[event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks[event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

},{}],4:[function(require,module,exports){

/**
 * Reduce `arr` with `fn`.
 *
 * @param {Array} arr
 * @param {Function} fn
 * @param {Mixed} initial
 *
 * TODO: combatible error handling?
 */

module.exports = function(arr, fn, initial){  
  var idx = 0;
  var len = arr.length;
  var curr = arguments.length == 3
    ? initial
    : arr[idx++];

  while (idx < len) {
    curr = fn.call(null, curr, arr[idx], ++idx, arr);
  }
  
  return curr;
};
},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
"use strict";

var constants = require("./config").constants;

var Grid = function (state) {
  var el = state.el;
  var totalCol = state.totalCol;
  var totalRow = state.totalRow;

  var container = document.getElementById(el),
      gridWidth = container.clientWidth,
      gridHeight = container.clientHeight,
      gridWidthSpacer = 2 * 100 / gridWidth,
      gridHeightSpacer = 2 * 100 / gridHeight,
      spaceWidth = gridWidth / totalCol,
      spaceHeight = gridHeight / totalRow,
      coords = [];

  /*
  * Set coords
  */
  var setCoords = function () {
    for (var x = 0; x < totalCol; x++) {
      for (var y = 0; y < totalRow; y++) {
        coords.push({ col: x, row: y });
      }
    }
  };

  /*
  * Show coords
  * This will show black dots for each coordonate
  */
  var showCoords = function () {
    coords.forEach(function (coord) {
      var left = gridWidth / totalCol * coord.col,
          top = gridHeight / totalRow * coord.row;
      left = left * 100 / gridWidth;
      top = top * 100 / gridHeight;
      var node = document.createElement("DIV");
      node.style.cssText = "top: " + (top - 0.5) + "%; left: " + (left - 0.2) + "%";
      container.appendChild(node);
    });
  };

  return {
    buildGrid: function () {
      setCoords();
      showCoords();
    },
    getCoords: function () {
      return coords;
    },
    getSpace: function () {
      return { width: spaceWidth, height: spaceHeight };
    },
    getParams: function () {
      return {
        gridWidth: gridWidth,
        gridHeight: gridHeight,
        gridWidthSpacer: gridWidthSpacer,
        gridHeightSpacer: gridHeightSpacer,
        spaceWidth: spaceWidth,
        spaceHeight: spaceHeight
      };
    }
  };
};

module.exports = Grid;

},{"./config":5}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
"use strict";

var constants = require("./config").constants;

var Tiles = function Tiles(state) {
  var tiles = [],
      tileQueue = [];

  return {
    /*
    * Reduce tile size
    * This is checking all the tile size and look for the next area smaller then the current one.
    * To find the area we just need to multiply the col and row (constants.TILE_SIZE[size].col * constants.TILE_SIZE[size].row)
    * @param {string} currentTileSize - big, medium, small, ect.
    */
    reduceTileSize: function reduceTileSize(currentTileSize) {
      var currentTile = constants.TILE_SIZE[currentTileSize],
          currentTileArea = currentTile.col * currentTile.row;

      for (var size in constants.TILE_SIZE) {
        var nextTileArea = constants.TILE_SIZE[size].col * constants.TILE_SIZE[size].row;
        if (nextTileArea < currentTileArea) {
          return size;
        }
      }

      return null; // Return null if no smaller tile are found.
    },

    /*
    * Get next tile size
    * This will get the next tile size to use.
    * @param {string} tileIndex
    */
    getNextTileSize: function getNextTileSize(tileIndex) {
      var currentTileCount = 0;

      for (var size in constants.TILE_SIZE) {
        currentTileCount = currentTileCount + constants.TILE_SIZE[size].maxAmount;
        if (tileIndex < currentTileCount) {
          return size;
        }
      }

      return null; // Return null if there is no next tile size available
    },

    /*
    * Get max tile count
    */
    getMaxTileCount: function getMaxTileCount() {
      var maxTileCount = 0;
      for (var size in constants.TILE_SIZE) {
        maxTileCount = maxTileCount + constants.TILE_SIZE[size].maxAmount;
      }
      return maxTileCount;
    }
  };
};

/**
* Tile
* @param {object} grid
* @param {object} state
*/
var Tile = function Tile(state, tile, grid) {
  return {
    getTileInfos: function getTileInfos() {
      var size = tile.size;
      var target = tile.target;
      var col = tile.col;
      var row = tile.row;
      var key = tile.key;var spaceWidth = grid.spaceWidth;
      var spaceHeight = grid.spaceHeight;
      var gridWidth = grid.gridWidth;
      var gridHeight = grid.gridHeight;
      var gridWidthSpacer = grid.gridWidthSpacer;
      var gridHeightSpacer = grid.gridHeightSpacer;

      return {
        size: size,
        x: target.col * spaceWidth * 100 / gridWidth,
        y: target.row * spaceHeight * 100 / gridHeight,
        width: col * 100 / state.totalCol - gridWidthSpacer,
        height: row * 100 / state.totalRow - gridHeightSpacer,
        id: key
      };
    }
  };
};

exports.Tiles = Tiles;
exports.Tile = Tile;

},{"./config":5}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbW96YS5qcyIsIm5vZGVfbW9kdWxlcy9zdXBlcmFnZW50L2xpYi9jbGllbnQuanMiLCJub2RlX21vZHVsZXMvc3VwZXJhZ2VudC9ub2RlX21vZHVsZXMvY29tcG9uZW50LWVtaXR0ZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvc3VwZXJhZ2VudC9ub2RlX21vZHVsZXMvcmVkdWNlLWNvbXBvbmVudC9pbmRleC5qcyIsIi9Vc2Vycy9zdXBlcnMvU2l0ZXMvbW96YS9zcmMvanMvY29uZmlnLmpzIiwiL1VzZXJzL3N1cGVycy9TaXRlcy9tb3phL3NyYy9qcy9ncmlkLmpzIiwiL1VzZXJzL3N1cGVycy9TaXRlcy9tb3phL3NyYy9qcy90aWxlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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Q0FBekMsZUFBZSxDQUFBO0FBYXBFLFVBYnNFLGdCQUFnQixHQUFJLElBQUksQ0FBeEIsZ0JBQWdCLENBQUE7O0FBQ3RGLGFBQU87QUFDTCxZQUFJLEVBQUosSUFBSTtBQUNKLFNBQUMsRUFBRSxNQUFNLENBQUMsR0FBRyxHQUFHLFVBQVUsR0FBRyxHQUFHLEdBQUcsU0FBUztBQUM1QyxTQUFDLEVBQUUsTUFBTSxDQUFDLEdBQUcsR0FBRyxXQUFXLEdBQUcsR0FBRyxHQUFHLFVBQVU7QUFDOUMsYUFBSyxFQUFFLEdBQUksR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDLFFBQVEsR0FBSSxlQUFlO0FBQ3JELGNBQU0sRUFBRSxHQUFJLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQyxRQUFRLEdBQUksZ0JBQWdCO0FBQ3ZELFVBQUUsRUFBRSxHQUFHO09BQ1IsQ0FBQztLQUNIO0dBQ0YsQ0FBQTtDQUNGLENBQUE7O0FBZ0JELE9BQU8sQ0FkQyxLQUFLLEdBQUwsS0FBSyxDQUFBO0FBZWIsT0FBTyxDQWZRLElBQUksR0FBSixJQUFJLENBQUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmUgPSBmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmUob2JqKSB7XG4gIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmpbXCJkZWZhdWx0XCJdIDogb2JqO1xufTtcblxudmFyIGNvbnN0YW50cyA9IHJlcXVpcmUoXCIuL2NvbmZpZ1wiKS5jb25zdGFudHM7XG5cbnZhciByZXF1ZXN0ID0gX2ludGVyb3BSZXF1aXJlKHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvc3VwZXJhZ2VudC9saWIvY2xpZW50LmpzXCIpKTtcblxudmFyIF90aWxlcyA9IHJlcXVpcmUoXCIuL3RpbGVzXCIpO1xuXG52YXIgVGlsZSA9IF90aWxlcy5UaWxlO1xudmFyIFRpbGVzID0gX3RpbGVzLlRpbGVzO1xuXG52YXIgR3JpZCA9IF9pbnRlcm9wUmVxdWlyZShyZXF1aXJlKFwiLi9ncmlkXCIpKTtcblxudmFyIE1vemEgPSBmdW5jdGlvbiBNb3phKHN0YXRlKSB7XG4gIHZhciB0b3RhbENvbCA9IHN0YXRlLnRvdGFsQ29sO1xuICB2YXIgdG90YWxSb3cgPSBzdGF0ZS50b3RhbFJvdztcbiAgdmFyIGVsID0gc3RhdGUuZWw7XG4gIHZhciB1cmwgPSBzdGF0ZS51cmw7XG4gIHZhciBteUdyaWQgPSBHcmlkKHN0YXRlKTtcbiAgdmFyIG15VGlsZXMgPSBUaWxlcyhzdGF0ZSk7XG4gIHZhciBfbXlHcmlkJGdldFBhcmFtcyA9IG15R3JpZC5nZXRQYXJhbXMoKTtcblxuICB2YXIgZ3JpZFdpZHRoID0gX215R3JpZCRnZXRQYXJhbXMuZ3JpZFdpZHRoO1xuICB2YXIgZ3JpZEhlaWdodCA9IF9teUdyaWQkZ2V0UGFyYW1zLmdyaWRIZWlnaHQ7XG4gIHZhciBncmlkV2lkdGhTcGFjZXIgPSBfbXlHcmlkJGdldFBhcmFtcy5ncmlkV2lkdGhTcGFjZXI7XG4gIHZhciBncmlkSGVpZ2h0U3BhY2VyID0gX215R3JpZCRnZXRQYXJhbXMuZ3JpZEhlaWdodFNwYWNlcjtcbiAgdmFyIHNwYWNlV2lkdGggPSBfbXlHcmlkJGdldFBhcmFtcy5zcGFjZVdpZHRoO1xuICB2YXIgc3BhY2VIZWlnaHQgPSBfbXlHcmlkJGdldFBhcmFtcy5zcGFjZUhlaWdodDtcblxuICB2YXIgY29vcmRzID0ge1xuICAgIGFsbDogW10sXG4gICAgZnJlZTogW10sXG4gICAgdGFrZW46IFtdXG4gIH0sXG4gICAgICBtYXhUaWxlcyA9IDQwLFxuICAgICAgdGlsZXMgPSBbXSxcbiAgICAgIHRpbGVRdWV1ZSA9IFtdLFxuICAgICAgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWwpO1xuXG4gIC8qKlxuICAqIENoZWNrIGF2YWlsYWJpbGl0eSBvZiBjb29yZHMgZnJvbSBjb29yZFxuICAqIEBwYXJhbSB7b2JqZWN0fSBjb29yZHNcbiAgKi9cbiAgdmFyIGNoZWNrQXZhaWxhYmlsaXR5T2ZDb29yZHNGcm9tQ29vcmQgPSBmdW5jdGlvbiBjaGVja0F2YWlsYWJpbGl0eU9mQ29vcmRzRnJvbUNvb3JkKG15Q29vcmRzKSB7XG4gICAgdmFyIHkgPSAwO1xuICAgIG15Q29vcmRzLmZvckVhY2goZnVuY3Rpb24gKGNvb3JkKSB7XG4gICAgICB2YXIgaSA9IGNvb3Jkcy5mcmVlLmxlbmd0aDtcbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgaWYgKGNvb3Jkcy5mcmVlW2ldLmNvbCA9PT0gY29vcmQuY29sICYmIGNvb3Jkcy5mcmVlW2ldLnJvdyA9PT0gY29vcmQucm93KSB7XG4gICAgICAgICAgeSsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG15Q29vcmRzLmxlbmd0aCA9PT0geTtcbiAgfTtcblxuICAvKlxuICAqIEdldCBvY2N1cGF0aW9uIGZyb20gY29vcmRcbiAgKiBUaGlzIHdpbGwgZ2V0IGFuIGFycmF5IHdpdGggYWxsIHRoZSBwb2ludCBvY2N1cGVkIGJ5IHRoZSB0aWxlXG4gICogQHBhcmFtIHtudW1iZXJ9IHRvdGFsQ29sXG4gICogQHBhcmFtIHtudW1iZXJ9IHRvdGFsUm93XG4gICogQHBhcmFtIHtvYmplY3R9IGNvb3JkXG4gICovXG4gIHZhciBnZXRPY2N1cGF0aW9uRnJvbUNvb3JkID0gZnVuY3Rpb24gZ2V0T2NjdXBhdGlvbkZyb21Db29yZChwYXJhbXMpIHtcbiAgICB2YXIgdG90YWxDb2wgPSBwYXJhbXMudG90YWxDb2w7XG4gICAgdmFyIHRvdGFsUm93ID0gcGFyYW1zLnRvdGFsUm93O1xuICAgIHZhciBjb29yZCA9IHBhcmFtcy5jb29yZDtcbiAgICB2YXIgY29vcmRzID0gW107XG4gICAgaWYgKGNvb3JkKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRvdGFsQ29sOyBpKyspIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0b3RhbFJvdzsgaisrKSB7XG4gICAgICAgICAgY29vcmRzLnB1c2goeyBjb2w6IGkgKyBjb29yZC5jb2wsIHJvdzogaiArIGNvb3JkLnJvdyB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGNvb3JkcztcbiAgICB9XG4gICAgLy8gdG9kbzogc2hvdWxkIHJldHVybiBzb21ldGhpbmcgYW55d2F5XG4gIH07XG5cbiAgLypcbiAgKiBHZXQgbmV3IHRpbGVBcmVhXG4gICogSXRlcmF0ZSBhY3Jvc3MgZWFjaCBmcmVlIGNvb3JkaW5hdGVzIHRvIHRlc3QgaWYgdGhlIHRpbGUgY2FuIGJlIHBsYWNlZFxuICAqIEBwYXJhbSB7c3RyaW5nfSB0aWxlU2l6ZVxuICAqIEByZXR1cm5zIHthcnJheXx1bmRlZmluZWR9XG4gICovXG4gIHZhciBnZXROZXdUaWxlQXJlYSA9IGZ1bmN0aW9uIGdldE5ld1RpbGVBcmVhKHRpbGVTaXplKSB7XG4gICAgdmFyIHRhcmdldHMgPSBbXSxcbiAgICAgICAgdG90YWxDb2wgPSBjb25zdGFudHMuVElMRV9TSVpFW3RpbGVTaXplXS5jb2wsXG4gICAgICAgIHRvdGFsUm93ID0gY29uc3RhbnRzLlRJTEVfU0laRVt0aWxlU2l6ZV0ucm93O1xuICAgIGNvb3Jkcy5mcmVlLmZvckVhY2goZnVuY3Rpb24gKGZyZWVDb29yZCkge1xuICAgICAgLy8gbWFrZSBzdXJlIHRoZSB0aWxlIGVuZGluZyBlbmQgZG9uJ3QgZ28gZnV0aGVyIHRoZW4gdGhlIGdyaWQgZWRnZVxuICAgICAgdmFyIHRpbGVSaWdodEVkZ2UgPSAoZnJlZUNvb3JkLmNvbCArIHRvdGFsQ29sKSAqIHNwYWNlV2lkdGgsXG4gICAgICAgICAgdGlsZUJvdHRvbUVkZ2UgPSAoZnJlZUNvb3JkLnJvdyArIHRvdGFsUm93KSAqIHNwYWNlSGVpZ2h0O1xuXG4gICAgICBpZiAodGlsZVJpZ2h0RWRnZSA8PSBncmlkV2lkdGggJiYgdGlsZUJvdHRvbUVkZ2UgPD0gZ3JpZEhlaWdodCkge1xuICAgICAgICAvLyBXZSBqc3V0IGZvbmQgYSBnb29kIHNwb3QgZm9yIHRoaXMgdGlsZS5cbiAgICAgICAgLy8gSXQncyB0aW1lIHRvIGNoZWNrIGlmIHRoZSBhcmVhIGlzIGNsZWFyLlxuICAgICAgICB2YXIgX2Nvb3JkcyA9IGdldE9jY3VwYXRpb25Gcm9tQ29vcmQoeyB0b3RhbENvbDogdG90YWxDb2wsIHRvdGFsUm93OiB0b3RhbFJvdywgY29vcmQ6IGZyZWVDb29yZCB9KTtcbiAgICAgICAgaWYgKGNoZWNrQXZhaWxhYmlsaXR5T2ZDb29yZHNGcm9tQ29vcmQoX2Nvb3JkcykpIHtcbiAgICAgICAgICB0YXJnZXRzLnB1c2goZnJlZUNvb3JkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIC8vIElmIHRoZSB0YXJnZXRzIGlzIGVtcHR5IHRoYXQgbWVhbiAyIHRoaW5nczpcbiAgICAvLyAtIHRoZSB0aWxlIHdhcyB0byBiaWdcbiAgICAvLyAtIHRoZSB0aWxlIGhhZCB0aGUgcmlnaHQgc2l6ZSBidXQgbm8gYXJlYSB3YXMgYXZhaWxhYmxlXG4gICAgcmV0dXJuIHRhcmdldHMubGVuZ3RoID4gMCA/IHNodWZmbGUodGFyZ2V0cykgOiB1bmRlZmluZWQ7XG4gIH07XG5cbiAgLypcbiAgKiBQdXQgZnJlZSBjb29yIHRvIHRha2VuIGNvb3JcbiAgKiBAcGFyYW0ge29iamVjdH0gY29vcmRcbiAgKi9cbiAgdmFyIHB1dEZyZWVDb29yVG9UYWtlbkNvb3IgPSBmdW5jdGlvbiBwdXRGcmVlQ29vclRvVGFrZW5Db29yKGNvb3JkKSB7XG4gICAgLy90b2RvOiBSZW1vdmUgdGhlIGlmIHN0YXRlbWVudCBhbmQgYWRkIGEgZmlsdGVyIGJlZm9yZSBmb3JFYWNoXG4gICAgY29vcmRzLmZyZWUuZm9yRWFjaChmdW5jdGlvbiAobXlDb29yZCwgaW5kZXgpIHtcbiAgICAgIC8vIHRvZG86IGNsZWFuIHRoaXMgdXBcbiAgICAgIGlmIChteUNvb3JkLmNvbCA9PT0gY29vcmQuY29sICYmIG15Q29vcmQucm93ID09PSBjb29yZC5yb3cpIHtcbiAgICAgICAgY29vcmRzLmZyZWUuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBjb29yZHMudGFrZW4ucHVzaChjb29yZCk7XG4gIH07XG5cbiAgLypcbiAgKiBTaHVmZmxlXG4gICogQHBhcmFtIHtvYmplY3R9IG9cbiAgKi9cbiAgdmFyIHNodWZmbGUgPSBmdW5jdGlvbiBzaHVmZmxlKG8pIHtcbiAgICBmb3IgKHZhciBqID0gdW5kZWZpbmVkLCB4ID0gdW5kZWZpbmVkLCBpID0gby5sZW5ndGg7IGk7IGogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBpKSwgeCA9IG9bLS1pXSwgb1tpXSA9IG9bal0sIG9bal0gPSB4KSB7fVxuICAgIHJldHVybiBvO1xuICB9O1xuXG4gIHZhciBzaG93VGlsZSA9IGZ1bmN0aW9uIHNob3dUaWxlKCkge1xuICAgIHZhciB1cmwgPSBzdGF0ZS51cmw7XG5cbiAgICAvL3RvZG86IG9wdG9taXplICBjb2RlIGR1cGxpY2F0aW9uLlxuICAgIGlmICh1cmwpIHtcbiAgICAgIHJlcXVlc3QuZ2V0KHVybCkuZW5kKGZ1bmN0aW9uIChlcnIsIHJlcykge1xuICAgICAgICByZXMgPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgdGlsZVF1ZXVlLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XG4gICAgICAgICAgdmFyIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiRElWXCIpO1xuICAgICAgICAgIG5vZGUuc3R5bGUuY3NzVGV4dCA9IFwidG9wOiBcIiArIGl0ZW0ueSArIFwiJTsgbGVmdDogXCIgKyBpdGVtLnggKyBcIiU7IHdpZHRoOiBcIiArIGl0ZW0ud2lkdGggKyBcIiU7IGhlaWdodDogXCIgKyBpdGVtLmhlaWdodCArIFwiJTsgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgcmVzW2luZGV4XS5pbWcgKyBcIilcIjtcbiAgICAgICAgICBub2RlLmNsYXNzTmFtZSA9IFwidGlsZVwiO1xuICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChub2RlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGlsZVF1ZXVlLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XG4gICAgICAgIHZhciBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIkRJVlwiKTtcbiAgICAgICAgbm9kZS5zdHlsZS5jc3NUZXh0ID0gXCJ0b3A6IFwiICsgaXRlbS55ICsgXCIlOyBsZWZ0OiBcIiArIGl0ZW0ueCArIFwiJTsgd2lkdGg6IFwiICsgaXRlbS53aWR0aCArIFwiJTsgaGVpZ2h0OiBcIiArIGl0ZW0uaGVpZ2h0ICsgXCIlXCI7XG4gICAgICAgIG5vZGUuY2xhc3NOYW1lID0gXCJ0aWxlXCI7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChub2RlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICAvKlxuICAqIEJ1aWxkIHRpbGVzXG4gICovXG4gIHZhciBidWlsZFRpbGVzID0gZnVuY3Rpb24gYnVpbGRUaWxlcygpIHtcbiAgICB2YXIgc2l6ZSA9IG51bGwsXG4gICAgICAgIHRpbGVDb3VudCA9IDAsXG4gICAgICAgIG1heFRpbGUgPSBteVRpbGVzLmdldE1heFRpbGVDb3VudCgpO1xuXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IG1heFRpbGVzOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIHRpbGVzLnB1c2goe1xuICAgICAgICBpZDogaVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRpbGVzLmZvckVhY2goZnVuY3Rpb24gKHRpbGUsIGluZGV4KSB7XG4gICAgICBpZiAoY29vcmRzLmZyZWUubGVuZ3RoID4gMCAmJiB0aWxlQ291bnQgPCBtYXhUaWxlKSB7XG4gICAgICAgIChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICB0aWxlLnNpemUgPSBteVRpbGVzLmdldE5leHRUaWxlU2l6ZSh0aWxlQ291bnQpO1xuICAgICAgICAgIHZhciBhdmFpbGFibGVBcmVhQ29vcmRzID0gbnVsbDtcblxuICAgICAgICAgIC8vIElmIG5vIHNwYWNlIHdlcmUgZm91bmQgdGhhdCBtZWFuIHRoZSB0aWxlIGlzIHRvIGJpZy5cbiAgICAgICAgICAvLyBOZWVkIHRvIHNpemUgaXQgZG93biBhIGJpdFxuICAgICAgICAgIHZhciBmaW5kTmV4dEF2YWlsYWJsZUFyZWFDb29yZHMgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGlsZS5zaXplID0gbXlUaWxlcy5yZWR1Y2VUaWxlU2l6ZSh0aWxlLnNpemUpO1xuXG4gICAgICAgICAgICBpZiAoIXRpbGUuc2l6ZSkge1xuICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGF2YWlsYWJsZUFyZWFDb29yZHMgPSBnZXROZXdUaWxlQXJlYSh0aWxlLnNpemUpO1xuICAgICAgICAgICAgaWYgKCFhdmFpbGFibGVBcmVhQ29vcmRzKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmaW5kTmV4dEF2YWlsYWJsZUFyZWFDb29yZHMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhdmFpbGFibGVBcmVhQ29vcmRzO1xuICAgICAgICAgIH0pLmJpbmQodW5kZWZpbmVkKTtcblxuICAgICAgICAgIC8vIENoZWNrIGlmIHdlIGZvdW5kIGEgcGxhY2UgZm9yIHRoZSB0aWxlXG4gICAgICAgICAgYXZhaWxhYmxlQXJlYUNvb3JkcyA9IGZpbmROZXh0QXZhaWxhYmxlQXJlYUNvb3JkcygpO1xuXG4gICAgICAgICAgLy8gSnVzdCBtYWtpbmcgc3VyZSB3ZSBoYXZlIHNwYWNlIGZvciB0aGlzIHRpbGUuXG4gICAgICAgICAgLy8gV2Ugd29udCBuZWVkIHRoaXMgY29uZGl0aW9uIGFmdGVyIEkgbWFrZSBhIHJlY3Vyc2lvbiBmb3IgdGhlIGRvd25zaXppbmcgdGlsZSBmdW5jdGlvblxuICAgICAgICAgIGlmIChhdmFpbGFibGVBcmVhQ29vcmRzKSB7XG4gICAgICAgICAgICB0aWxlQ291bnQrKztcbiAgICAgICAgICAgIHRpbGUua2V5ID0gaW5kZXg7XG4gICAgICAgICAgICB0aWxlLnRhcmdldCA9IGF2YWlsYWJsZUFyZWFDb29yZHNbMF07IC8vVGFrZSB0aGUgZmlyc3Qgb25lIGluIHRoZSBhcnJheS4gVGhleSBhcmUgYWxyZWFkeSBzaG92ZWxlZFxuICAgICAgICAgICAgdGlsZS5jb2wgPSBjb25zdGFudHMuVElMRV9TSVpFW3RpbGUuc2l6ZV0uY29sO1xuICAgICAgICAgICAgdGlsZS5yb3cgPSBjb25zdGFudHMuVElMRV9TSVpFW3RpbGUuc2l6ZV0ucm93O1xuICAgICAgICAgICAgdmFyIG15VGlsZSA9IG5ldyBUaWxlKHN0YXRlLCB0aWxlLCBteUdyaWQuZ2V0UGFyYW1zKCkpO1xuICAgICAgICAgICAgLy8gVXBkYXRlIGZyZWUgJiB0YWtlbiBjb29yZHNcbiAgICAgICAgICAgIHZhciB0aWxlT2NjdXBhdGlvbkNvb3JkcyA9IGdldE9jY3VwYXRpb25Gcm9tQ29vcmQoeyB0b3RhbENvbDogdGlsZS5jb2wsIHRvdGFsUm93OiB0aWxlLnJvdywgY29vcmQ6IHRpbGUudGFyZ2V0IH0pO1xuICAgICAgICAgICAgdGlsZU9jY3VwYXRpb25Db29yZHMuZm9yRWFjaChmdW5jdGlvbiAoY29vcmRzKSB7XG4gICAgICAgICAgICAgIHB1dEZyZWVDb29yVG9UYWtlbkNvb3IoY29vcmRzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGlsZVF1ZXVlLnB1c2gobXlUaWxlLmdldFRpbGVJbmZvcygpKTtcbiAgICAgICAgICB9IGVsc2Uge31cbiAgICAgICAgfSkoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGJ1aWxkOiBmdW5jdGlvbiBidWlsZCgpIHtcbiAgICAgIG15R3JpZC5idWlsZEdyaWQoKTtcbiAgICAgIGNvb3Jkcy5hbGwgPSBjb29yZHMuZnJlZSA9IG15R3JpZC5nZXRDb29yZHMoKTtcbiAgICAgIGJ1aWxkVGlsZXMoKTtcbiAgICAgIHNob3dUaWxlKCk7XG4gICAgfVxuICB9O1xufTtcblxuTW96YSh7IGVsOiBcIm15U3RhZ2UxXCIsIHRvdGFsQ29sOiA3LCB0b3RhbFJvdzogNywgdXJsOiBcIi4uLy4uL2RhdGEvZGVmYXVsdC5qc29uXCIgfSkuYnVpbGQoKTtcblxuZ2xvYmFsLk1vemEgPSBNb3phO1xuXG4vLyBubyB0aWxlIGFkZGVkIHRvIHRoZSBxdWV1ZSBiZWNhdXNlIHdlIGRpZCBub3QgZmluZCB0aGUgc3BhY2UgZm9yIGl0XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWk5VmMyVnljeTl6ZFhCbGNuTXZVMmwwWlhNdmJXOTZZUzl6Y21NdmFuTXZiVzk2WVM1cWN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU8wRkJRVUVzV1VGQldTeERRVUZET3p0QlFVVmlMRWxCUVVrc1pVRkJaU3hIUVVGSExGTkJRVUVzWlVGQlFTeERRVUZWTEVkQlFVY3NSVUZCUlR0QlFVRkZMRk5CUVU4c1IwRkJSeXhKUVVGSkxFZEJRVWNzUTBGQlF5eFZRVUZWTEVkQlFVY3NSMEZCUnl4RFFVRkRMRk5CUVZNc1EwRkJReXhIUVVGSExFZEJRVWNzUTBGQlF6dERRVUZGTEVOQlFVTTdPMEZCUlRsR0xFbEJSbE1zVTBGQlV5eEhRVUZCTEU5QlFVRXNRMEZCVVN4VlFVRlZMRU5CUVVFc1EwRkJNMElzVTBGQlV5eERRVUZCT3p0QlFVbHNRaXhKUVVoUExFOUJRVThzUjBGQlFTeGxRVUZCTEVOQlFVRXNUMEZCUVN4RFFVRk5MRFpEUVVFMlF5eERRVUZCTEVOQlFVRXNRMEZCUVRzN1FVRkxha1VzU1VGQlNTeE5RVUZOTEVkQlFVY3NUMEZCVHl4RFFVcFJMRk5CUVZNc1EwRkJRU3hEUVVGQk96dEJRVTF5UXl4SlFVNVRMRWxCUVVrc1IwRkJRU3hOUVVGQkxFTkJRVW9zU1VGQlNTeERRVUZCTzBGQlQySXNTVUZRWlN4TFFVRkxMRWRCUVVFc1RVRkJRU3hEUVVGTUxFdEJRVXNzUTBGQlFUczdRVUZUY0VJc1NVRlNUeXhKUVVGSkxFZEJRVUVzWlVGQlFTeERRVUZCTEU5QlFVRXNRMEZCVFN4UlFVRlJMRU5CUVVFc1EwRkJRU3hEUVVGQk96dEJRVVY2UWl4SlFVRk5MRWxCUVVrc1IwRkJSeXhUUVVGQkxFbEJRVUVzUTBGQlF5eExRVUZMTEVWQlFVczdRVUZUZEVJc1RVRlNVU3hSUVVGUkxFZEJRWGRDTEV0QlFVc3NRMEZCY2tNc1VVRkJVU3hEUVVGQk8wRkJVMmhDTEUxQlZHdENMRkZCUVZFc1IwRkJZeXhMUVVGTExFTkJRVE5DTEZGQlFWRXNRMEZCUVR0QlFWVXhRaXhOUVZZMFFpeEZRVUZGTEVkQlFWVXNTMEZCU3l4RFFVRnFRaXhGUVVGRkxFTkJRVUU3UVVGQmVFSXNUVUZCTUVJc1IwRkJSeXhIUVVGTExFdEJRVXNzUTBGQllpeEhRVUZITEVOQlFWVTdRVUZEZGtNc1RVRkJRU3hOUVVGTkxFZEJRVWNzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkJPMEZCUTNCQ0xFMUJRVUVzVDBGQlR5eEhRVUZITEV0QlFVc3NRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJRVHRCUVZrMVFpeE5RVUZKTEdsQ1FVRnBRaXhIUVZoM1JTeE5RVUZOTEVOQlFVTXNVMEZCVXl4RlFVRkZMRU5CUVVFN08wRkJZUzlITEUxQllsRXNVMEZCVXl4SFFVRkJMR2xDUVVGQkxFTkJRVlFzVTBGQlV5eERRVUZCTzBGQlkycENMRTFCWkcxQ0xGVkJRVlVzUjBGQlFTeHBRa0ZCUVN4RFFVRldMRlZCUVZVc1EwRkJRVHRCUVdVM1FpeE5RV1lyUWl4bFFVRmxMRWRCUVVFc2FVSkJRVUVzUTBGQlppeGxRVUZsTEVOQlFVRTdRVUZuUWpsRExFMUJhRUpuUkN4blFrRkJaMElzUjBGQlFTeHBRa0ZCUVN4RFFVRm9RaXhuUWtGQlowSXNRMEZCUVR0QlFXbENhRVVzVFVGcVFtdEZMRlZCUVZVc1IwRkJRU3hwUWtGQlFTeERRVUZXTEZWQlFWVXNRMEZCUVR0QlFXdENOVVVzVFVGc1FqaEZMRmRCUVZjc1IwRkJRU3hwUWtGQlFTeERRVUZZTEZkQlFWY3NRMEZCUVRzN1FVRkZla1lzVFVGQlNTeE5RVUZOTEVkQlFVYzdRVUZEVWl4UFFVRkhMRVZCUVVVc1JVRkJSVHRCUVVOUUxGRkJRVWtzUlVGQlJTeEZRVUZGTzBGQlExSXNVMEZCU3l4RlFVRkZMRVZCUVVVN1IwRkRWanROUVVORUxGRkJRVkVzUjBGQlJ5eEZRVUZGTzAxQlEySXNTMEZCU3l4SFFVRkhMRVZCUVVVN1RVRkRWaXhUUVVGVExFZEJRVWNzUlVGQlJUdE5RVU5rTEZOQlFWTXNSMEZCUnl4UlFVRlJMRU5CUVVNc1kwRkJZeXhEUVVGRExFVkJRVVVzUTBGQlF5eERRVUZET3pzN096czdRVUZOTTBNc1RVRkJTU3hyUTBGQmEwTXNSMEZCUnl4VFFVRkJMR3REUVVGQkxFTkJRVU1zVVVGQlVTeEZRVUZMTzBGQlEzSkVMRkZCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF6dEJRVU5XTEZsQlFWRXNRMEZCUXl4UFFVRlBMRU5CUVVNc1ZVRkJRU3hMUVVGTExFVkJRVWs3UVVGRGVFSXNWVUZCU1N4RFFVRkRMRWRCUVVjc1RVRkJUU3hEUVVGRExFbEJRVWtzUTBGQlF5eE5RVUZOTEVOQlFVTTdRVUZETTBJc1lVRkJUeXhEUVVGRExFVkJRVVVzUlVGQlJUdEJRVU5XTEZsQlFVa3NUVUZCVFN4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eEhRVUZITEV0QlFVc3NTMEZCU3l4RFFVRkRMRWRCUVVjc1NVRkJTU3hOUVVGTkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRWRCUVVjc1MwRkJTeXhMUVVGTExFTkJRVU1zUjBGQlJ5eEZRVUZGTzBGQlEzaEZMRmRCUVVNc1JVRkJSU3hEUVVGRE8xTkJRMHc3VDBGRFJqdExRVU5HTEVOQlFVTXNRMEZCUXp0QlFVTklMRmRCUVU4c1VVRkJVU3hEUVVGRExFMUJRVTBzUzBGQlN5eERRVUZETEVOQlFVTTdSMEZET1VJc1EwRkJRenM3T3pzN096czdPMEZCVTBZc1RVRkJTU3h6UWtGQmMwSXNSMEZCUnl4VFFVRkJMSE5DUVVGQkxFTkJRVU1zVFVGQlRTeEZRVUZMTzBGQmJVSjJReXhSUVd4Q1N5eFJRVUZSTEVkQlFYRkNMRTFCUVUwc1EwRkJia01zVVVGQlVTeERRVUZCTzBGQmJVSmlMRkZCYmtKbExGRkJRVkVzUjBGQlZ5eE5RVUZOTEVOQlFYcENMRkZCUVZFc1EwRkJRVHRCUVVGdVFpeFJRVUZ4UWl4TFFVRkxMRWRCUVVrc1RVRkJUU3hEUVVGbUxFdEJRVXNzUTBGQlZUdEJRVU53UXl4UlFVRkJMRTFCUVUwc1IwRkJSeXhGUVVGRkxFTkJRVUU3UVVGRFppeFJRVUZKTEV0QlFVc3NSVUZCUlR0QlFVTlVMRmRCUVVzc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eEZRVUZGTEVOQlFVTXNSMEZCUnl4UlFVRlJMRVZCUVVVc1EwRkJReXhGUVVGRkxFVkJRVVU3UVVGRGFrTXNZVUZCU3l4SlFVRkpMRU5CUVVNc1IwRkJSeXhEUVVGRExFVkJRVVVzUTBGQlF5eEhRVUZITEZGQlFWRXNSVUZCUlN4RFFVRkRMRVZCUVVVc1JVRkJSVHRCUVVOcVF5eG5Ra0ZCVFN4RFFVRkRMRWxCUVVrc1EwRkJReXhGUVVGRExFZEJRVWNzUlVGQlJTeERRVUZETEVkQlFVY3NTMEZCU3l4RFFVRkRMRWRCUVVjc1JVRkJSU3hIUVVGSExFVkJRVVVzUTBGQlF5eEhRVUZITEV0QlFVc3NRMEZCUXl4SFFVRkhMRVZCUVVNc1EwRkJReXhEUVVGRE8xTkJRM1pFTzA5QlEwWTdRVUZEUkN4aFFVRlBMRTFCUVUwc1EwRkJRenRMUVVObU96dEJRVUZCTEVkQlJVWXNRMEZCUXpzN096czdPenM3UVVGUlJpeE5RVUZKTEdOQlFXTXNSMEZCUnl4VFFVRkJMR05CUVVFc1EwRkJReXhSUVVGUkxFVkJRVXM3UVVGRGFrTXNVVUZCU1N4UFFVRlBMRWRCUVVjc1JVRkJSVHRSUVVOaUxGRkJRVkVzUjBGQlJ5eFRRVUZUTEVOQlFVTXNVMEZCVXl4RFFVRkRMRkZCUVZFc1EwRkJReXhEUVVGRExFZEJRVWM3VVVGRE5VTXNVVUZCVVN4SFFVRkhMRk5CUVZNc1EwRkJReXhUUVVGVExFTkJRVU1zVVVGQlVTeERRVUZETEVOQlFVTXNSMEZCUnl4RFFVRkRPMEZCUTJoRUxGVkJRVTBzUTBGQlF5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMRlZCUVVFc1UwRkJVeXhGUVVGSk96dEJRVVV2UWl4VlFVRkpMR0ZCUVdFc1IwRkJSeXhEUVVGRExGTkJRVk1zUTBGQlF5eEhRVUZITEVkQlFVY3NVVUZCVVN4RFFVRkJMRWRCUVVrc1ZVRkJWVHRWUVVOMlJDeGpRVUZqTEVkQlFVY3NRMEZCUXl4VFFVRlRMRU5CUVVNc1IwRkJSeXhIUVVGSExGRkJRVkVzUTBGQlFTeEhRVUZKTEZkQlFWY3NRMEZCUXpzN1FVRkZPVVFzVlVGQlNTeGhRVUZoTEVsQlFVa3NVMEZCVXl4SlFVRkpMR05CUVdNc1NVRkJTU3hWUVVGVkxFVkJRVVU3T3p0QlFVYzVSQ3haUVVGSkxFOUJRVTBzUjBGQlJ5eHpRa0ZCYzBJc1EwRkJReXhGUVVGRExGRkJRVkVzUlVGQlVpeFJRVUZSTEVWQlFVVXNVVUZCVVN4RlFVRlNMRkZCUVZFc1JVRkJSU3hMUVVGTExFVkJRVVVzVTBGQlV5eEZRVUZETEVOQlFVTXNRMEZCUXp0QlFVTTFSU3haUVVGSkxHdERRVUZyUXl4RFFVRkRMRTlCUVUwc1EwRkJReXhGUVVGRk8wRkJRemxETEdsQ1FVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRExGTkJRVk1zUTBGQlF5eERRVUZETzFOQlEzcENPMDlCUTBZN1MwRkRSaXhEUVVGRExFTkJRVU03T3pzN1FVRkpTQ3hYUVVGUExFOUJRVThzUTBGQlF5eE5RVUZOTEVkQlFVY3NRMEZCUXl4SFFVRkhMRTlCUVU4c1EwRkJReXhQUVVGUExFTkJRVU1zUjBGQlJ5eFRRVUZUTEVOQlFVTTdSMEZETVVRc1EwRkJRenM3T3pzN08wRkJUVVlzVFVGQlNTeHpRa0ZCYzBJc1IwRkJSeXhUUVVGQkxITkNRVUZCTEVOQlFVTXNTMEZCU3l4RlFVRkxPenRCUVVWMFF5eFZRVUZOTEVOQlFVTXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhWUVVGRExFOUJRVThzUlVGQlJTeExRVUZMTEVWQlFVczdPMEZCUlhSRExGVkJRVWtzVDBGQlR5eERRVUZETEVkQlFVY3NTMEZCU3l4TFFVRkxMRU5CUVVNc1IwRkJSeXhKUVVGSkxFOUJRVThzUTBGQlF5eEhRVUZITEV0QlFVc3NTMEZCU3l4RFFVRkRMRWRCUVVjc1JVRkJSVHRCUVVNeFJDeGpRVUZOTEVOQlFVTXNTVUZCU1N4RFFVRkRMRTFCUVUwc1EwRkJReXhMUVVGTExFVkJRVVVzUTBGQlF5eERRVUZETEVOQlFVTTdUMEZET1VJN1MwRkRSaXhEUVVGRExFTkJRVU03UVVGRFNDeFZRVUZOTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF6dEhRVU14UWl4RFFVRkRPenM3T3pzN1FVRk5SaXhOUVVGSkxFOUJRVThzUjBGQlJ5eFRRVUZCTEU5QlFVRXNRMEZCUXl4RFFVRkRMRVZCUVVzN1FVRkRia0lzVTBGQlNTeEpRVUZKTEVOQlFVTXNSMEZCUVN4VFFVRkJMRVZCUVVVc1EwRkJReXhIUVVGQkxGTkJRVUVzUlVGQlJTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRTFCUVUwc1JVRkJSU3hEUVVGRExFVkJRVVVzUTBGQlF5eEhRVUZITEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1NVRkJTU3hEUVVGRExFMUJRVTBzUlVGQlJTeEhRVUZITEVOQlFVTXNRMEZCUXl4RlFVRkZMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUlVGQlJTeERRVUZETEVOQlFVTXNSVUZCUlN4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUjBGQlJ5eERRVUZETEVWQlFVRXNSVUZCUlR0QlFVTnlSeXhYUVVGUExFTkJRVU1zUTBGQlF6dEhRVU5XTEVOQlFVRTdPMEZCUlVRc1RVRkJTU3hSUVVGUkxFZEJRVWNzVTBGQlFTeFJRVUZCTEVkQlFVMDdRVUZ4UW01Q0xGRkJjRUpMTEVkQlFVY3NSMEZCU1N4TFFVRkxMRU5CUVZvc1IwRkJSeXhEUVVGQk96czdRVUZIVWl4UlFVRkpMRWRCUVVjc1JVRkJSVHRCUVVOUUxHRkJRVThzUTBGRFNpeEhRVUZITEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUTFJc1IwRkJSeXhEUVVGRExGVkJRVk1zUjBGQlJ5eEZRVUZGTEVkQlFVY3NSVUZCUXp0QlFVTnlRaXhYUVVGSExFZEJRVWNzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03UVVGRE0wSXNhVUpCUVZNc1EwRkJReXhQUVVGUExFTkJRVU1zVlVGQlF5eEpRVUZKTEVWQlFVVXNTMEZCU3l4RlFVRkxPMEZCUTJwRExHTkJRVWtzU1VGQlNTeEhRVUZITEZGQlFWRXNRMEZCUXl4aFFVRmhMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU03UVVGRGVrTXNZMEZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhQUVVGUExFZEJRVUVzVDBGQlFTeEhRVUZYTEVsQlFVa3NRMEZCUXl4RFFVRkRMRWRCUVVFc1YwRkJRU3hIUVVGWkxFbEJRVWtzUTBGQlF5eERRVUZETEVkQlFVRXNXVUZCUVN4SFFVRmhMRWxCUVVrc1EwRkJReXhMUVVGTExFZEJRVUVzWVVGQlFTeEhRVUZqTEVsQlFVa3NRMEZCUXl4TlFVRk5MRWRCUVVFc01rSkJRVUVzUjBGQk5FSXNSMEZCUnl4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRExFZEJRVWNzUjBGQlFTeEhRVUZITEVOQlFVTTdRVUZEYmtvc1kwRkJTU3hEUVVGRExGTkJRVk1zUjBGQlJ5eE5RVUZOTEVOQlFVTTdRVUZEZUVJc2JVSkJRVk1zUTBGQlF5eFhRVUZYTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1UwRkROMElzUTBGQlF5eERRVUZETzA5QlEwb3NRMEZCUXl4RFFVRkRPMHRCUTA0c1RVRkJUVHRCUVVOTUxHVkJRVk1zUTBGQlF5eFBRVUZQTEVOQlFVTXNWVUZCUXl4SlFVRkpMRVZCUVVVc1MwRkJTeXhGUVVGTE8wRkJRMnBETEZsQlFVa3NTVUZCU1N4SFFVRkhMRkZCUVZFc1EwRkJReXhoUVVGaExFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTTdRVUZEZWtNc1dVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eFBRVUZQTEVkQlFVRXNUMEZCUVN4SFFVRlhMRWxCUVVrc1EwRkJReXhEUVVGRExFZEJRVUVzVjBGQlFTeEhRVUZaTEVsQlFVa3NRMEZCUXl4RFFVRkRMRWRCUVVFc1dVRkJRU3hIUVVGaExFbEJRVWtzUTBGQlF5eExRVUZMTEVkQlFVRXNZVUZCUVN4SFFVRmpMRWxCUVVrc1EwRkJReXhOUVVGTkxFZEJRVUVzUjBGQlJ5eERRVUZETzBGQlEzcEhMRmxCUVVrc1EwRkJReXhUUVVGVExFZEJRVWNzVFVGQlRTeERRVUZETzBGQlEzaENMR2xDUVVGVExFTkJRVU1zVjBGQlZ5eERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMDlCUXpkQ0xFTkJRVU1zUTBGQlF6dExRVU5LTzBkQlEwWXNRMEZCUXpzN096czdRVUZMUml4TlFVRkpMRlZCUVZVc1IwRkJSeXhUUVVGQkxGVkJRVUVzUjBGQlRUdEJRVU55UWl4UlFVRkpMRWxCUVVrc1IwRkJSeXhKUVVGSk8xRkJRMWdzVTBGQlV5eEhRVUZITEVOQlFVTTdVVUZEWWl4UFFVRlBMRWRCUVVjc1QwRkJUeXhEUVVGRExHVkJRV1VzUlVGQlJTeERRVUZET3p0QlFVVjRReXhUUVVGTExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNSVUZCUlN4SFFVRkhMRWRCUVVjc1VVRkJVU3hGUVVGRkxFTkJRVU1zUjBGQlJ5eEhRVUZITEVWQlFVVXNRMEZCUXl4RlFVRkZMRVZCUVVVN1FVRkROVU1zVjBGQlN5eERRVUZETEVsQlFVa3NRMEZCUXp0QlFVTlVMRlZCUVVVc1JVRkJSU3hEUVVGRE8wOUJRMDRzUTBGQlF5eERRVUZETzB0QlEwb3NRMEZCUXpzN1FVRkZSaXhUUVVGTExFTkJRVU1zVDBGQlR5eERRVUZETEZWQlFVTXNTVUZCU1N4RlFVRkZMRXRCUVVzc1JVRkJTenRCUVVNM1FpeFZRVUZITEUxQlFVMHNRMEZCUXl4SlFVRkpMRU5CUVVNc1RVRkJUU3hIUVVGSExFTkJRVU1zU1VGQlNTeFRRVUZUTEVkQlFVY3NUMEZCVHl4RlFVRkZPMEZCYlVKb1JDeFRRVUZETEZsQlFWazdPMEZCYWtKaUxHTkJRVWtzUTBGQlF5eEpRVUZKTEVkQlFVY3NUMEZCVHl4RFFVRkRMR1ZCUVdVc1EwRkJReXhUUVVGVExFTkJRVU1zUTBGQlF6dEJRVU12UXl4alFVRkpMRzFDUVVGdFFpeEhRVUZITEVsQlFVa3NRMEZCUXpzN096dEJRVWt2UWl4alFVRkpMREpDUVVFeVFpeEhRVUZITEVOQlFVRXNXVUZCVnp0QlFVTXpReXhuUWtGQlNTeERRVUZETEVsQlFVa3NSMEZCUnl4UFFVRlBMRU5CUVVNc1kwRkJZeXhEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXpzN1FVRkZPVU1zWjBKQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hGUVVGRk8wRkJRMlFzY1VKQlFVOHNVMEZCVXl4RFFVRkRPMkZCUTJ4Q08wRkJRMFFzWjBKQlFVa3NiVUpCUVcxQ0xFZEJRVWNzWTBGQll5eERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRCUVVOd1JDeG5Ra0ZCU1N4RFFVRkRMRzFDUVVGdFFpeEZRVUZGTzBGQlEzaENMSEZDUVVGUExESkNRVUV5UWl4RlFVRkZMRU5CUVVNN1lVRkRkRU03UVVGRFJDeHRRa0ZCVHl4dFFrRkJiVUlzUTBGQlF6dFhRVU0xUWl4RFFVRkJMRU5CUVVNc1NVRkJTU3hEUVVGQkxGTkJRVUVzUTBGQlRTeERRVUZET3pzN1FVRkhZaXcyUWtGQmJVSXNSMEZCUnl3eVFrRkJNa0lzUlVGQlJTeERRVUZET3pzN08wRkJTWEJFTEdOQlFVY3NiVUpCUVcxQ0xFVkJRVU03UVVGRGNrSXNjVUpCUVZNc1JVRkJSU3hEUVVGRE8wRkJRMW9zWjBKQlFVa3NRMEZCUXl4SFFVRkhMRWRCUVVjc1MwRkJTeXhEUVVGRE8wRkJRMnBDTEdkQ1FVRkpMRU5CUVVNc1RVRkJUU3hIUVVGSExHMUNRVUZ0UWl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8wRkJRM0pETEdkQ1FVRkpMRU5CUVVNc1IwRkJSeXhIUVVGSExGTkJRVk1zUTBGQlF5eFRRVUZUTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRExFZEJRVWNzUTBGQlF6dEJRVU01UXl4blFrRkJTU3hEUVVGRExFZEJRVWNzUjBGQlJ5eFRRVUZUTEVOQlFVTXNVMEZCVXl4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF5eEhRVUZITEVOQlFVTTdRVUZET1VNc1owSkJRVWtzVFVGQlRTeEhRVUZITEVsQlFVa3NTVUZCU1N4RFFVRkRMRXRCUVVzc1JVRkJSU3hKUVVGSkxFVkJRVVVzVFVGQlRTeERRVUZETEZOQlFWTXNSVUZCUlN4RFFVRkRMRU5CUVVNN08wRkJSWFpFTEdkQ1FVRkpMRzlDUVVGdlFpeEhRVUZITEhOQ1FVRnpRaXhEUVVGRExFVkJRVU1zVVVGQlVTeEZRVUZGTEVsQlFVa3NRMEZCUXl4SFFVRkhMRVZCUVVVc1VVRkJVU3hGUVVGRkxFbEJRVWtzUTBGQlF5eEhRVUZITEVWQlFVVXNTMEZCU3l4RlFVRkZMRWxCUVVrc1EwRkJReXhOUVVGTkxFVkJRVU1zUTBGQlF5eERRVUZETzBGQlEyaElMR2REUVVGdlFpeERRVUZETEU5QlFVOHNRMEZCUXl4VlFVRkJMRTFCUVUwc1JVRkJTVHRCUVVOeVF5eHZRMEZCYzBJc1EwRkJReXhOUVVGTkxFTkJRVU1zUTBGQlF6dGhRVU5vUXl4RFFVRkRMRU5CUVVNN1FVRkRTQ3h4UWtGQlV5eERRVUZETEVsQlFVa3NRMEZCUXl4TlFVRk5MRU5CUVVNc1dVRkJXU3hGUVVGRkxFTkJRVU1zUTBGQlF6dFhRVU4yUXl4TlFVRkpMRVZCUlVvN1UwRnJRa0VzUTBGQlFTeEZRVUZITEVOQlFVTTdUMEZxUWs0N1MwRkRSaXhEUVVGRExFTkJRVU03UjBGRFNpeERRVUZCT3p0QlFVVkVMRk5CUVU4N1FVRkRUQ3hUUVVGTExFVkJRVVVzVTBGQlFTeExRVUZCTEVkQlFVMDdRVUZEV0N4WlFVRk5MRU5CUVVNc1UwRkJVeXhGUVVGRkxFTkJRVU03UVVGRGJrSXNXVUZCVFN4RFFVRkRMRWRCUVVjc1IwRkJSeXhOUVVGTkxFTkJRVU1zU1VGQlNTeEhRVUZITEUxQlFVMHNRMEZCUXl4VFFVRlRMRVZCUVVVc1EwRkJRenRCUVVNNVF5eG5Ra0ZCVlN4RlFVRkZMRU5CUVVNN1FVRkRZaXhqUVVGUkxFVkJRVVVzUTBGQlF6dExRVU5hTzBkQlEwWXNRMEZCUVR0RFFVTkdMRU5CUVVNN08wRkJSVVlzU1VGQlNTeERRVUZETEVWQlFVTXNSVUZCUlN4RlFVRkZMRlZCUVZVc1JVRkJSU3hSUVVGUkxFVkJRVU1zUTBGQlF5eEZRVUZGTEZGQlFWRXNSVUZCUXl4RFFVRkRMRVZCUVVVc1IwRkJSeXhGUVVGRkxIbENRVUY1UWl4RlFVRkRMRU5CUVVNc1EwRkJReXhMUVVGTExFVkJRVVVzUTBGQlF6czdRVUZGZGtZc1RVRkJUU3hEUVVGRExFbEJRVWtzUjBGQlJ5eEpRVUZKTEVOQlFVTWlMQ0ptYVd4bElqb2laMlZ1WlhKaGRHVmtMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSWlkMWMyVWdjM1J5YVdOMEp6dGNibHh1YVcxd2IzSjBJSHNnWTI5dWMzUmhiblJ6SUgwZ1puSnZiU0FuTGk5amIyNW1hV2NuTzF4dWFXMXdiM0owSUhKbGNYVmxjM1FnWm5KdmJTQW5MaTR2TGk0dmJtOWtaVjl0YjJSMWJHVnpMM04xY0dWeVlXZGxiblF2YkdsaUwyTnNhV1Z1ZEM1cWN5YzdYRzVwYlhCdmNuUWdleUJVYVd4bExDQlVhV3hsY3lCOUlHWnliMjBnSnk0dmRHbHNaWE1uTzF4dWFXMXdiM0owSUVkeWFXUWdabkp2YlNBbkxpOW5jbWxrSnp0Y2JseHVZMjl1YzNRZ1RXOTZZU0E5SUNoemRHRjBaU2tnUFQ0Z2UxeHVJQ0JqYjI1emRDQjdJSFJ2ZEdGc1EyOXNMQ0IwYjNSaGJGSnZkeXdnWld3c0lIVnliQ0I5SUQwZ2MzUmhkR1VzWEc0Z0lDQWdJQ0FnSUcxNVIzSnBaQ0E5SUVkeWFXUW9jM1JoZEdVcExGeHVJQ0FnSUNBZ0lDQnRlVlJwYkdWeklEMGdWR2xzWlhNb2MzUmhkR1VwTEZ4dUlDQWdJQ0FnSUNCN0lHZHlhV1JYYVdSMGFDd2daM0pwWkVobGFXZG9kQ3dnWjNKcFpGZHBaSFJvVTNCaFkyVnlMQ0JuY21sa1NHVnBaMmgwVTNCaFkyVnlMQ0J6Y0dGalpWZHBaSFJvTENCemNHRmpaVWhsYVdkb2RIMGdQU0J0ZVVkeWFXUXVaMlYwVUdGeVlXMXpLQ2s3WEc1Y2JpQWdiR1YwSUdOdmIzSmtjeUE5SUh0Y2JpQWdJQ0FnSUNCaGJHdzZJRnRkTEZ4dUlDQWdJQ0FnSUdaeVpXVTZJRnRkTEZ4dUlDQWdJQ0FnSUhSaGEyVnVPaUJiWFZ4dUlDQWdJQ0I5TEZ4dUlDQWdJQ0J0WVhoVWFXeGxjeUE5SURRd0xGeHVJQ0FnSUNCMGFXeGxjeUE5SUZ0ZExGeHVJQ0FnSUNCMGFXeGxVWFZsZFdVZ1BTQmJYU3hjYmlBZ0lDQWdZMjl1ZEdGcGJtVnlJRDBnWkc5amRXMWxiblF1WjJWMFJXeGxiV1Z1ZEVKNVNXUW9aV3dwTzF4dVhHNGdJQzhxS2x4dUlDQXFJRU5vWldOcklHRjJZV2xzWVdKcGJHbDBlU0J2WmlCamIyOXlaSE1nWm5KdmJTQmpiMjl5WkZ4dUlDQXFJRUJ3WVhKaGJTQjdiMkpxWldOMGZTQmpiMjl5WkhOY2JpQWdLaTljYmlBZ2JHVjBJR05vWldOclFYWmhhV3hoWW1sc2FYUjVUMlpEYjI5eVpITkdjbTl0UTI5dmNtUWdQU0FvYlhsRGIyOXlaSE1wSUQwK0lIdGNiaUFnSUNCc1pYUWdlU0E5SURBN1hHNGdJQ0FnYlhsRGIyOXlaSE11Wm05eVJXRmphQ2hqYjI5eVpDQTlQaUI3WEc0Z0lDQWdJQ0JzWlhRZ2FTQTlJR052YjNKa2N5NW1jbVZsTG14bGJtZDBhRHRjYmlBZ0lDQWdJSGRvYVd4bElDaHBMUzBwSUh0Y2JpQWdJQ0FnSUNBZ2FXWWdLR052YjNKa2N5NW1jbVZsVzJsZExtTnZiQ0E5UFQwZ1kyOXZjbVF1WTI5c0lDWW1JR052YjNKa2N5NW1jbVZsVzJsZExuSnZkeUE5UFQwZ1kyOXZjbVF1Y205M0tTQjdYRzRnSUNBZ0lDQWdJQ0FnZVNzck8xeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQjlYRzRnSUNBZ2ZTazdYRzRnSUNBZ2NtVjBkWEp1SUcxNVEyOXZjbVJ6TG14bGJtZDBhQ0E5UFQwZ2VUdGNiaUFnZlR0Y2JseHVJQ0F2S2x4dUlDQXFJRWRsZENCdlkyTjFjR0YwYVc5dUlHWnliMjBnWTI5dmNtUmNiaUFnS2lCVWFHbHpJSGRwYkd3Z1oyVjBJR0Z1SUdGeWNtRjVJSGRwZEdnZ1lXeHNJSFJvWlNCd2IybHVkQ0J2WTJOMWNHVmtJR0o1SUhSb1pTQjBhV3hsWEc0Z0lDb2dRSEJoY21GdElIdHVkVzFpWlhKOUlIUnZkR0ZzUTI5c1hHNGdJQ29nUUhCaGNtRnRJSHR1ZFcxaVpYSjlJSFJ2ZEdGc1VtOTNYRzRnSUNvZ1FIQmhjbUZ0SUh0dlltcGxZM1I5SUdOdmIzSmtYRzRnSUNvdlhHNGdJR3hsZENCblpYUlBZMk4xY0dGMGFXOXVSbkp2YlVOdmIzSmtJRDBnS0hCaGNtRnRjeWtnUFQ0Z2UxeHVJQ0FnSUd4bGRDQjdkRzkwWVd4RGIyd3NJSFJ2ZEdGc1VtOTNMQ0JqYjI5eVpIMGdQU0J3WVhKaGJYTXNYRzRnSUNBZ0lDQWdJR052YjNKa2N5QTlJRnRkTzF4dUlDQWdJR2xtSUNoamIyOXlaQ2tnZTF4dUlDQWdJQ0FnWm05eUlDaHNaWFFnYVNBOUlEQTdJR2tnUENCMGIzUmhiRU52YkRzZ2FTc3JLU0I3WEc0Z0lDQWdJQ0FnSUdadmNpQW9iR1YwSUdvZ1BTQXdPeUJxSUR3Z2RHOTBZV3hTYjNjN0lHb3JLeWtnZTF4dUlDQWdJQ0FnSUNBZ0lHTnZiM0prY3k1d2RYTm9LSHRqYjJ3NklHa2dLeUJqYjI5eVpDNWpiMndzSUhKdmR6b2dhaUFySUdOdmIzSmtMbkp2ZDMwcE8xeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQjlYRzRnSUNBZ0lDQnlaWFIxY200Z1kyOXZjbVJ6TzF4dUlDQWdJSDFjYmlBZ0lDQXZMeUIwYjJSdk9pQnphRzkxYkdRZ2NtVjBkWEp1SUhOdmJXVjBhR2x1WnlCaGJubDNZWGxjYmlBZ2ZUdGNibHh1SUNBdktseHVJQ0FxSUVkbGRDQnVaWGNnZEdsc1pVRnlaV0ZjYmlBZ0tpQkpkR1Z5WVhSbElHRmpjbTl6Y3lCbFlXTm9JR1p5WldVZ1kyOXZjbVJwYm1GMFpYTWdkRzhnZEdWemRDQnBaaUIwYUdVZ2RHbHNaU0JqWVc0Z1ltVWdjR3hoWTJWa1hHNGdJQ29nUUhCaGNtRnRJSHR6ZEhKcGJtZDlJSFJwYkdWVGFYcGxYRzRnSUNvZ1FISmxkSFZ5Ym5NZ2UyRnljbUY1ZkhWdVpHVm1hVzVsWkgxY2JpQWdLaTljYmlBZ2JHVjBJR2RsZEU1bGQxUnBiR1ZCY21WaElEMGdLSFJwYkdWVGFYcGxLU0E5UGlCN1hHNGdJQ0FnYkdWMElIUmhjbWRsZEhNZ1BTQmJYU3hjYmlBZ0lDQWdJQ0IwYjNSaGJFTnZiQ0E5SUdOdmJuTjBZVzUwY3k1VVNVeEZYMU5KV2tWYmRHbHNaVk5wZW1WZExtTnZiQ3hjYmlBZ0lDQWdJQ0IwYjNSaGJGSnZkeUE5SUdOdmJuTjBZVzUwY3k1VVNVeEZYMU5KV2tWYmRHbHNaVk5wZW1WZExuSnZkenRjYmlBZ0lDQmpiMjl5WkhNdVpuSmxaUzVtYjNKRllXTm9LR1p5WldWRGIyOXlaQ0E5UGlCN1hHNGdJQ0FnSUNBdkx5QnRZV3RsSUhOMWNtVWdkR2hsSUhScGJHVWdaVzVrYVc1bklHVnVaQ0JrYjI0bmRDQm5ieUJtZFhSb1pYSWdkR2hsYmlCMGFHVWdaM0pwWkNCbFpHZGxYRzRnSUNBZ0lDQnNaWFFnZEdsc1pWSnBaMmgwUldSblpTQTlJQ2htY21WbFEyOXZjbVF1WTI5c0lDc2dkRzkwWVd4RGIyd3BJQ29nYzNCaFkyVlhhV1IwYUN4Y2JpQWdJQ0FnSUNBZ0lDQjBhV3hsUW05MGRHOXRSV1JuWlNBOUlDaG1jbVZsUTI5dmNtUXVjbTkzSUNzZ2RHOTBZV3hTYjNjcElDb2djM0JoWTJWSVpXbG5hSFE3WEc1Y2JpQWdJQ0FnSUdsbUlDaDBhV3hsVW1sbmFIUkZaR2RsSUR3OUlHZHlhV1JYYVdSMGFDQW1KaUIwYVd4bFFtOTBkRzl0UldSblpTQThQU0JuY21sa1NHVnBaMmgwS1NCN1hHNGdJQ0FnSUNBZ0lDOHZJRmRsSUdwemRYUWdabTl1WkNCaElHZHZiMlFnYzNCdmRDQm1iM0lnZEdocGN5QjBhV3hsTGx4dUlDQWdJQ0FnSUNBdkx5QkpkQ2R6SUhScGJXVWdkRzhnWTJobFkyc2dhV1lnZEdobElHRnlaV0VnYVhNZ1kyeGxZWEl1WEc0Z0lDQWdJQ0FnSUd4bGRDQmpiMjl5WkhNZ1BTQm5aWFJQWTJOMWNHRjBhVzl1Um5KdmJVTnZiM0prS0h0MGIzUmhiRU52YkN3Z2RHOTBZV3hTYjNjc0lHTnZiM0prT2lCbWNtVmxRMjl2Y21SOUtUdGNiaUFnSUNBZ0lDQWdhV1lnS0dOb1pXTnJRWFpoYVd4aFltbHNhWFI1VDJaRGIyOXlaSE5HY205dFEyOXZjbVFvWTI5dmNtUnpLU2tnZTF4dUlDQWdJQ0FnSUNBZ0lIUmhjbWRsZEhNdWNIVnphQ2htY21WbFEyOXZjbVFwTzF4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNCOVhHNGdJQ0FnZlNrN1hHNGdJQ0FnTHk4Z1NXWWdkR2hsSUhSaGNtZGxkSE1nYVhNZ1pXMXdkSGtnZEdoaGRDQnRaV0Z1SURJZ2RHaHBibWR6T2x4dUlDQWdJQzh2SUMwZ2RHaGxJSFJwYkdVZ2QyRnpJSFJ2SUdKcFoxeHVJQ0FnSUM4dklDMGdkR2hsSUhScGJHVWdhR0ZrSUhSb1pTQnlhV2RvZENCemFYcGxJR0oxZENCdWJ5QmhjbVZoSUhkaGN5QmhkbUZwYkdGaWJHVmNiaUFnSUNCeVpYUjFjbTRnZEdGeVoyVjBjeTVzWlc1bmRHZ2dQaUF3SUQ4Z2MyaDFabVpzWlNoMFlYSm5aWFJ6S1NBNklIVnVaR1ZtYVc1bFpEdGNiaUFnZlR0Y2JseHVJQ0F2S2x4dUlDQXFJRkIxZENCbWNtVmxJR052YjNJZ2RHOGdkR0ZyWlc0Z1kyOXZjbHh1SUNBcUlFQndZWEpoYlNCN2IySnFaV04wZlNCamIyOXlaRnh1SUNBcUwxeHVJQ0JzWlhRZ2NIVjBSbkpsWlVOdmIzSlViMVJoYTJWdVEyOXZjaUE5SUNoamIyOXlaQ2tnUFQ0Z2UxeHVJQ0FnSUM4dmRHOWtiem9nVW1WdGIzWmxJSFJvWlNCcFppQnpkR0YwWlcxbGJuUWdZVzVrSUdGa1pDQmhJR1pwYkhSbGNpQmlaV1p2Y21VZ1ptOXlSV0ZqYUZ4dUlDQWdJR052YjNKa2N5NW1jbVZsTG1admNrVmhZMmdvS0cxNVEyOXZjbVFzSUdsdVpHVjRLU0E5UGlCN1hHNGdJQ0FnSUNBdkx5QjBiMlJ2T2lCamJHVmhiaUIwYUdseklIVndYRzRnSUNBZ0lDQnBaaUFvYlhsRGIyOXlaQzVqYjJ3Z1BUMDlJR052YjNKa0xtTnZiQ0FtSmlCdGVVTnZiM0prTG5KdmR5QTlQVDBnWTI5dmNtUXVjbTkzS1NCN1hHNGdJQ0FnSUNBZ0lHTnZiM0prY3k1bWNtVmxMbk53YkdsalpTaHBibVJsZUN3Z01TazdYRzRnSUNBZ0lDQjlYRzRnSUNBZ2ZTazdYRzRnSUNBZ1kyOXZjbVJ6TG5SaGEyVnVMbkIxYzJnb1kyOXZjbVFwTzF4dUlDQjlPMXh1WEc0Z0lDOHFYRzRnSUNvZ1UyaDFabVpzWlZ4dUlDQXFJRUJ3WVhKaGJTQjdiMkpxWldOMGZTQnZYRzRnSUNvdlhHNGdJR3hsZENCemFIVm1abXhsSUQwZ0tHOHBJRDArSUh0Y2JpQWdJQ0JtYjNJb2JHVjBJR29zSUhnc0lHa2dQU0J2TG14bGJtZDBhRHNnYVRzZ2FpQTlJRTFoZEdndVpteHZiM0lvVFdGMGFDNXlZVzVrYjIwb0tTQXFJR2twTENCNElEMGdiMXN0TFdsZExDQnZXMmxkSUQwZ2IxdHFYU3dnYjF0cVhTQTlJSGdwTzF4dUlDQWdJSEpsZEhWeWJpQnZPMXh1SUNCOVhHNWNiaUFnYkdWMElITm9iM2RVYVd4bElEMGdLQ2tnUFQ0Z2UxeHVJQ0FnSUd4bGRDQjdkWEpzZlNBOUlITjBZWFJsTzF4dVhHNGdJQ0FnTHk5MGIyUnZPaUJ2Y0hSdmJXbDZaU0FnWTI5a1pTQmtkWEJzYVdOaGRHbHZiaTVjYmlBZ0lDQnBaaUFvZFhKc0tTQjdYRzRnSUNBZ0lDQnlaWEYxWlhOMFhHNGdJQ0FnSUNBZ0lDNW5aWFFvZFhKc0tWeHVJQ0FnSUNBZ0lDQXVaVzVrS0daMWJtTjBhVzl1S0dWeWNpd2djbVZ6S1h0Y2JpQWdJQ0FnSUNBZ0lDQnlaWE1nUFNCS1UwOU9MbkJoY25ObEtISmxjeTUwWlhoMEtUdGNiaUFnSUNBZ0lDQWdJQ0IwYVd4bFVYVmxkV1V1Wm05eVJXRmphQ2dvYVhSbGJTd2dhVzVrWlhncElEMCtJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHeGxkQ0J1YjJSbElEMGdaRzlqZFcxbGJuUXVZM0psWVhSbFJXeGxiV1Z1ZENoY0lrUkpWbHdpS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJRzV2WkdVdWMzUjViR1V1WTNOelZHVjRkQ0E5SUdCMGIzQTZJQ1I3YVhSbGJTNTVmU1U3SUd4bFpuUTZJQ1I3YVhSbGJTNTRmU1U3SUhkcFpIUm9PaUFrZTJsMFpXMHVkMmxrZEdoOUpUc2dhR1ZwWjJoME9pQWtlMmwwWlcwdWFHVnBaMmgwZlNVN0lHSmhZMnRuY205MWJtUXRhVzFoWjJVNklIVnliQ2drZTNKbGMxdHBibVJsZUYwdWFXMW5mU2xnTzF4dUlDQWdJQ0FnSUNBZ0lDQWdibTlrWlM1amJHRnpjMDVoYldVZ1BTQW5kR2xzWlNjN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JqYjI1MFlXbHVaWEl1WVhCd1pXNWtRMmhwYkdRb2JtOWtaU2s3WEc0Z0lDQWdJQ0FnSUNBZ2ZTazdYRzRnSUNBZ0lDQWdJSDBwTzF4dUlDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQjBhV3hsVVhWbGRXVXVabTl5UldGamFDZ29hWFJsYlN3Z2FXNWtaWGdwSUQwK0lIdGNiaUFnSUNBZ0lDQWdiR1YwSUc1dlpHVWdQU0JrYjJOMWJXVnVkQzVqY21WaGRHVkZiR1Z0Wlc1MEtGd2lSRWxXWENJcE8xeHVJQ0FnSUNBZ0lDQnViMlJsTG5OMGVXeGxMbU56YzFSbGVIUWdQU0JnZEc5d09pQWtlMmwwWlcwdWVYMGxPeUJzWldaME9pQWtlMmwwWlcwdWVIMGxPeUIzYVdSMGFEb2dKSHRwZEdWdExuZHBaSFJvZlNVN0lHaGxhV2RvZERvZ0pIdHBkR1Z0TG1obGFXZG9kSDBsWUR0Y2JpQWdJQ0FnSUNBZ2JtOWtaUzVqYkdGemMwNWhiV1VnUFNBbmRHbHNaU2M3WEc0Z0lDQWdJQ0FnSUdOdmJuUmhhVzVsY2k1aGNIQmxibVJEYUdsc1pDaHViMlJsS1R0Y2JpQWdJQ0FnSUgwcE8xeHVJQ0FnSUgxY2JpQWdmVHRjYmx4dUlDQXZLbHh1SUNBcUlFSjFhV3hrSUhScGJHVnpYRzRnSUNvdlhHNGdJR3hsZENCaWRXbHNaRlJwYkdWeklEMGdLQ2tnUFQ0Z2UxeHVJQ0FnSUd4bGRDQnphWHBsSUQwZ2JuVnNiQ3hjYmlBZ0lDQWdJQ0FnZEdsc1pVTnZkVzUwSUQwZ01DeGNiaUFnSUNBZ0lDQWdiV0Y0Vkdsc1pTQTlJRzE1Vkdsc1pYTXVaMlYwVFdGNFZHbHNaVU52ZFc1MEtDazdYRzVjYmlBZ0lDQm1iM0lnS0d4bGRDQnBJRDBnTUN3Z2JHVnVJRDBnYldGNFZHbHNaWE03SUdrZ1BDQnNaVzQ3SUdrckt5a2dlMXh1SUNBZ0lDQWdkR2xzWlhNdWNIVnphQ2g3WEc0Z0lDQWdJQ0FnSUdsa09pQnBYRzRnSUNBZ0lDQjlLVHRjYmlBZ0lDQjlPMXh1WEc0Z0lDQWdkR2xzWlhNdVptOXlSV0ZqYUNnb2RHbHNaU3dnYVc1a1pYZ3BJRDArSUh0Y2JpQWdJQ0FnSUdsbUtHTnZiM0prY3k1bWNtVmxMbXhsYm1kMGFDQStJREFnSmlZZ2RHbHNaVU52ZFc1MElEd2diV0Y0Vkdsc1pTa2dlMXh1WEc0Z0lDQWdJQ0FnSUhScGJHVXVjMmw2WlNBOUlHMTVWR2xzWlhNdVoyVjBUbVY0ZEZScGJHVlRhWHBsS0hScGJHVkRiM1Z1ZENrN1hHNGdJQ0FnSUNBZ0lHeGxkQ0JoZG1GcGJHRmliR1ZCY21WaFEyOXZjbVJ6SUQwZ2JuVnNiRHRjYmx4dUlDQWdJQ0FnSUNBdkx5QkpaaUJ1YnlCemNHRmpaU0IzWlhKbElHWnZkVzVrSUhSb1lYUWdiV1ZoYmlCMGFHVWdkR2xzWlNCcGN5QjBieUJpYVdjdVhHNGdJQ0FnSUNBZ0lDOHZJRTVsWldRZ2RHOGdjMmw2WlNCcGRDQmtiM2R1SUdFZ1ltbDBYRzRnSUNBZ0lDQWdJR3hsZENCbWFXNWtUbVY0ZEVGMllXbHNZV0pzWlVGeVpXRkRiMjl5WkhNZ1BTQm1kVzVqZEdsdmJpZ3BJSHRjYmlBZ0lDQWdJQ0FnSUNCMGFXeGxMbk5wZW1VZ1BTQnRlVlJwYkdWekxuSmxaSFZqWlZScGJHVlRhWHBsS0hScGJHVXVjMmw2WlNrN1hHNWNiaUFnSUNBZ0lDQWdJQ0JwWmlBb0lYUnBiR1V1YzJsNlpTa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUhWdVpHVm1hVzVsWkR0Y2JpQWdJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJQ0FnYkdWMElHRjJZV2xzWVdKc1pVRnlaV0ZEYjI5eVpITWdQU0JuWlhST1pYZFVhV3hsUVhKbFlTaDBhV3hsTG5OcGVtVXBPMXh1SUNBZ0lDQWdJQ0FnSUdsbUlDZ2hZWFpoYVd4aFlteGxRWEpsWVVOdmIzSmtjeWtnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlHWnBibVJPWlhoMFFYWmhhV3hoWW14bFFYSmxZVU52YjNKa2N5Z3BPMXh1SUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z1lYWmhhV3hoWW14bFFYSmxZVU52YjNKa2N6dGNiaUFnSUNBZ0lDQWdmUzVpYVc1a0tIUm9hWE1wTzF4dVhHNGdJQ0FnSUNBZ0lDOHZJRU5vWldOcklHbG1JSGRsSUdadmRXNWtJR0VnY0d4aFkyVWdabTl5SUhSb1pTQjBhV3hsWEc0Z0lDQWdJQ0FnSUdGMllXbHNZV0pzWlVGeVpXRkRiMjl5WkhNZ1BTQm1hVzVrVG1WNGRFRjJZV2xzWVdKc1pVRnlaV0ZEYjI5eVpITW9LVHRjYmx4dUlDQWdJQ0FnSUNBdkx5QktkWE4wSUcxaGEybHVaeUJ6ZFhKbElIZGxJR2hoZG1VZ2MzQmhZMlVnWm05eUlIUm9hWE1nZEdsc1pTNWNiaUFnSUNBZ0lDQWdMeThnVjJVZ2QyOXVkQ0J1WldWa0lIUm9hWE1nWTI5dVpHbDBhVzl1SUdGbWRHVnlJRWtnYldGclpTQmhJSEpsWTNWeWMybHZiaUJtYjNJZ2RHaGxJR1J2ZDI1emFYcHBibWNnZEdsc1pTQm1kVzVqZEdsdmJseHVJQ0FnSUNBZ0lDQnBaaWhoZG1GcGJHRmliR1ZCY21WaFEyOXZjbVJ6S1h0Y2JpQWdJQ0FnSUNBZ0lDQjBhV3hsUTI5MWJuUXJLenRjYmlBZ0lDQWdJQ0FnSUNCMGFXeGxMbXRsZVNBOUlHbHVaR1Y0TzF4dUlDQWdJQ0FnSUNBZ0lIUnBiR1V1ZEdGeVoyVjBJRDBnWVhaaGFXeGhZbXhsUVhKbFlVTnZiM0prYzFzd1hUc2dMeTlVWVd0bElIUm9aU0JtYVhKemRDQnZibVVnYVc0Z2RHaGxJR0Z5Y21GNUxpQlVhR1Y1SUdGeVpTQmhiSEpsWVdSNUlITm9iM1psYkdWa1hHNGdJQ0FnSUNBZ0lDQWdkR2xzWlM1amIyd2dQU0JqYjI1emRHRnVkSE11VkVsTVJWOVRTVnBGVzNScGJHVXVjMmw2WlYwdVkyOXNPMXh1SUNBZ0lDQWdJQ0FnSUhScGJHVXVjbTkzSUQwZ1kyOXVjM1JoYm5SekxsUkpURVZmVTBsYVJWdDBhV3hsTG5OcGVtVmRMbkp2ZHp0Y2JpQWdJQ0FnSUNBZ0lDQnNaWFFnYlhsVWFXeGxJRDBnYm1WM0lGUnBiR1VvYzNSaGRHVXNJSFJwYkdVc0lHMTVSM0pwWkM1blpYUlFZWEpoYlhNb0tTazdYRzRnSUNBZ0lDQWdJQ0FnTHk4Z1ZYQmtZWFJsSUdaeVpXVWdKaUIwWVd0bGJpQmpiMjl5WkhOY2JpQWdJQ0FnSUNBZ0lDQnNaWFFnZEdsc1pVOWpZM1Z3WVhScGIyNURiMjl5WkhNZ1BTQm5aWFJQWTJOMWNHRjBhVzl1Um5KdmJVTnZiM0prS0h0MGIzUmhiRU52YkRvZ2RHbHNaUzVqYjJ3c0lIUnZkR0ZzVW05M09pQjBhV3hsTG5KdmR5d2dZMjl2Y21RNklIUnBiR1V1ZEdGeVoyVjBmU2s3WEc0Z0lDQWdJQ0FnSUNBZ2RHbHNaVTlqWTNWd1lYUnBiMjVEYjI5eVpITXVabTl5UldGamFDaGpiMjl5WkhNZ1BUNGdlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2NIVjBSbkpsWlVOdmIzSlViMVJoYTJWdVEyOXZjaWhqYjI5eVpITXBPMXh1SUNBZ0lDQWdJQ0FnSUgwcE8xeHVJQ0FnSUNBZ0lDQWdJSFJwYkdWUmRXVjFaUzV3ZFhOb0tHMTVWR2xzWlM1blpYUlVhV3hsU1c1bWIzTW9LU2s3WEc0Z0lDQWdJQ0FnSUgxbGJITmxlMXh1SUNBZ0lDQWdJQ0FnSUM4dklHNXZJSFJwYkdVZ1lXUmtaV1FnZEc4Z2RHaGxJSEYxWlhWbElHSmxZMkYxYzJVZ2QyVWdaR2xrSUc1dmRDQm1hVzVrSUhSb1pTQnpjR0ZqWlNCbWIzSWdhWFJjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnZlZ4dUlDQWdJSDBwTzF4dUlDQjlYRzVjYmlBZ2NtVjBkWEp1SUh0Y2JpQWdJQ0JpZFdsc1pEb2dLQ2tnUFQ0Z2UxeHVJQ0FnSUNBZ2JYbEhjbWxrTG1KMWFXeGtSM0pwWkNncE8xeHVJQ0FnSUNBZ1kyOXZjbVJ6TG1Gc2JDQTlJR052YjNKa2N5NW1jbVZsSUQwZ2JYbEhjbWxrTG1kbGRFTnZiM0prY3lncE8xeHVJQ0FnSUNBZ1luVnBiR1JVYVd4bGN5Z3BPMXh1SUNBZ0lDQWdjMmh2ZDFScGJHVW9LVHRjYmlBZ0lDQjlYRzRnSUgxY2JuMDdYRzVjYmsxdmVtRW9lMlZzT2lBbmJYbFRkR0ZuWlRFbkxDQjBiM1JoYkVOdmJEbzNMQ0IwYjNSaGJGSnZkem8zTENCMWNtdzZJQ2N1TGk4dUxpOWtZWFJoTDJSbFptRjFiSFF1YW5OdmJpZDlLUzVpZFdsc1pDZ3BPMXh1WEc1bmJHOWlZV3d1VFc5NllTQTlJRTF2ZW1FN1hHNGlYWDA9IiwiLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciBFbWl0dGVyID0gcmVxdWlyZSgnZW1pdHRlcicpO1xudmFyIHJlZHVjZSA9IHJlcXVpcmUoJ3JlZHVjZScpO1xuXG4vKipcbiAqIFJvb3QgcmVmZXJlbmNlIGZvciBpZnJhbWVzLlxuICovXG5cbnZhciByb290O1xuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7IC8vIEJyb3dzZXIgd2luZG93XG4gIHJvb3QgPSB3aW5kb3c7XG59IGVsc2UgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykgeyAvLyBXZWIgV29ya2VyXG4gIHJvb3QgPSBzZWxmO1xufSBlbHNlIHsgLy8gT3RoZXIgZW52aXJvbm1lbnRzXG4gIHJvb3QgPSB0aGlzO1xufVxuXG4vKipcbiAqIE5vb3AuXG4gKi9cblxuZnVuY3Rpb24gbm9vcCgpe307XG5cbi8qKlxuICogQ2hlY2sgaWYgYG9iamAgaXMgYSBob3N0IG9iamVjdCxcbiAqIHdlIGRvbid0IHdhbnQgdG8gc2VyaWFsaXplIHRoZXNlIDopXG4gKlxuICogVE9ETzogZnV0dXJlIHByb29mLCBtb3ZlIHRvIGNvbXBvZW50IGxhbmRcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gaXNIb3N0KG9iaikge1xuICB2YXIgc3RyID0ge30udG9TdHJpbmcuY2FsbChvYmopO1xuXG4gIHN3aXRjaCAoc3RyKSB7XG4gICAgY2FzZSAnW29iamVjdCBGaWxlXSc6XG4gICAgY2FzZSAnW29iamVjdCBCbG9iXSc6XG4gICAgY2FzZSAnW29iamVjdCBGb3JtRGF0YV0nOlxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vKipcbiAqIERldGVybWluZSBYSFIuXG4gKi9cblxucmVxdWVzdC5nZXRYSFIgPSBmdW5jdGlvbiAoKSB7XG4gIGlmIChyb290LlhNTEh0dHBSZXF1ZXN0XG4gICAgICAmJiAoIXJvb3QubG9jYXRpb24gfHwgJ2ZpbGU6JyAhPSByb290LmxvY2F0aW9uLnByb3RvY29sXG4gICAgICAgICAgfHwgIXJvb3QuQWN0aXZlWE9iamVjdCkpIHtcbiAgICByZXR1cm4gbmV3IFhNTEh0dHBSZXF1ZXN0O1xuICB9IGVsc2Uge1xuICAgIHRyeSB7IHJldHVybiBuZXcgQWN0aXZlWE9iamVjdCgnTWljcm9zb2Z0LlhNTEhUVFAnKTsgfSBjYXRjaChlKSB7fVxuICAgIHRyeSB7IHJldHVybiBuZXcgQWN0aXZlWE9iamVjdCgnTXN4bWwyLlhNTEhUVFAuNi4wJyk7IH0gY2F0Y2goZSkge31cbiAgICB0cnkgeyByZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoJ01zeG1sMi5YTUxIVFRQLjMuMCcpOyB9IGNhdGNoKGUpIHt9XG4gICAgdHJ5IHsgcmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KCdNc3htbDIuWE1MSFRUUCcpOyB9IGNhdGNoKGUpIHt9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuLyoqXG4gKiBSZW1vdmVzIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHdoaXRlc3BhY2UsIGFkZGVkIHRvIHN1cHBvcnQgSUUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbnZhciB0cmltID0gJycudHJpbVxuICA/IGZ1bmN0aW9uKHMpIHsgcmV0dXJuIHMudHJpbSgpOyB9XG4gIDogZnVuY3Rpb24ocykgeyByZXR1cm4gcy5yZXBsYWNlKC8oXlxccyp8XFxzKiQpL2csICcnKTsgfTtcblxuLyoqXG4gKiBDaGVjayBpZiBgb2JqYCBpcyBhbiBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGlzT2JqZWN0KG9iaikge1xuICByZXR1cm4gb2JqID09PSBPYmplY3Qob2JqKTtcbn1cblxuLyoqXG4gKiBTZXJpYWxpemUgdGhlIGdpdmVuIGBvYmpgLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHNlcmlhbGl6ZShvYmopIHtcbiAgaWYgKCFpc09iamVjdChvYmopKSByZXR1cm4gb2JqO1xuICB2YXIgcGFpcnMgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIGlmIChudWxsICE9IG9ialtrZXldKSB7XG4gICAgICBwdXNoRW5jb2RlZEtleVZhbHVlUGFpcihwYWlycywga2V5LCBvYmpba2V5XSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgcmV0dXJuIHBhaXJzLmpvaW4oJyYnKTtcbn1cblxuLyoqXG4gKiBIZWxwcyAnc2VyaWFsaXplJyB3aXRoIHNlcmlhbGl6aW5nIGFycmF5cy5cbiAqIE11dGF0ZXMgdGhlIHBhaXJzIGFycmF5LlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHBhaXJzXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKiBAcGFyYW0ge01peGVkfSB2YWxcbiAqL1xuXG5mdW5jdGlvbiBwdXNoRW5jb2RlZEtleVZhbHVlUGFpcihwYWlycywga2V5LCB2YWwpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsKSkge1xuICAgIHJldHVybiB2YWwuZm9yRWFjaChmdW5jdGlvbih2KSB7XG4gICAgICBwdXNoRW5jb2RlZEtleVZhbHVlUGFpcihwYWlycywga2V5LCB2KTtcbiAgICB9KTtcbiAgfVxuICBwYWlycy5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChrZXkpXG4gICAgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsKSk7XG59XG5cbi8qKlxuICogRXhwb3NlIHNlcmlhbGl6YXRpb24gbWV0aG9kLlxuICovXG5cbiByZXF1ZXN0LnNlcmlhbGl6ZU9iamVjdCA9IHNlcmlhbGl6ZTtcblxuIC8qKlxuICAqIFBhcnNlIHRoZSBnaXZlbiB4LXd3dy1mb3JtLXVybGVuY29kZWQgYHN0cmAuXG4gICpcbiAgKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gICogQHJldHVybiB7T2JqZWN0fVxuICAqIEBhcGkgcHJpdmF0ZVxuICAqL1xuXG5mdW5jdGlvbiBwYXJzZVN0cmluZyhzdHIpIHtcbiAgdmFyIG9iaiA9IHt9O1xuICB2YXIgcGFpcnMgPSBzdHIuc3BsaXQoJyYnKTtcbiAgdmFyIHBhcnRzO1xuICB2YXIgcGFpcjtcblxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gcGFpcnMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICBwYWlyID0gcGFpcnNbaV07XG4gICAgcGFydHMgPSBwYWlyLnNwbGl0KCc9Jyk7XG4gICAgb2JqW2RlY29kZVVSSUNvbXBvbmVudChwYXJ0c1swXSldID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhcnRzWzFdKTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cbi8qKlxuICogRXhwb3NlIHBhcnNlci5cbiAqL1xuXG5yZXF1ZXN0LnBhcnNlU3RyaW5nID0gcGFyc2VTdHJpbmc7XG5cbi8qKlxuICogRGVmYXVsdCBNSU1FIHR5cGUgbWFwLlxuICpcbiAqICAgICBzdXBlcmFnZW50LnR5cGVzLnhtbCA9ICdhcHBsaWNhdGlvbi94bWwnO1xuICpcbiAqL1xuXG5yZXF1ZXN0LnR5cGVzID0ge1xuICBodG1sOiAndGV4dC9odG1sJyxcbiAganNvbjogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICB4bWw6ICdhcHBsaWNhdGlvbi94bWwnLFxuICB1cmxlbmNvZGVkOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcbiAgJ2Zvcm0nOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcbiAgJ2Zvcm0tZGF0YSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG59O1xuXG4vKipcbiAqIERlZmF1bHQgc2VyaWFsaXphdGlvbiBtYXAuXG4gKlxuICogICAgIHN1cGVyYWdlbnQuc2VyaWFsaXplWydhcHBsaWNhdGlvbi94bWwnXSA9IGZ1bmN0aW9uKG9iail7XG4gKiAgICAgICByZXR1cm4gJ2dlbmVyYXRlZCB4bWwgaGVyZSc7XG4gKiAgICAgfTtcbiAqXG4gKi9cblxuIHJlcXVlc3Quc2VyaWFsaXplID0ge1xuICAgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCc6IHNlcmlhbGl6ZSxcbiAgICdhcHBsaWNhdGlvbi9qc29uJzogSlNPTi5zdHJpbmdpZnlcbiB9O1xuXG4gLyoqXG4gICogRGVmYXVsdCBwYXJzZXJzLlxuICAqXG4gICogICAgIHN1cGVyYWdlbnQucGFyc2VbJ2FwcGxpY2F0aW9uL3htbCddID0gZnVuY3Rpb24oc3RyKXtcbiAgKiAgICAgICByZXR1cm4geyBvYmplY3QgcGFyc2VkIGZyb20gc3RyIH07XG4gICogICAgIH07XG4gICpcbiAgKi9cblxucmVxdWVzdC5wYXJzZSA9IHtcbiAgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCc6IHBhcnNlU3RyaW5nLFxuICAnYXBwbGljYXRpb24vanNvbic6IEpTT04ucGFyc2Vcbn07XG5cbi8qKlxuICogUGFyc2UgdGhlIGdpdmVuIGhlYWRlciBgc3RyYCBpbnRvXG4gKiBhbiBvYmplY3QgY29udGFpbmluZyB0aGUgbWFwcGVkIGZpZWxkcy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBwYXJzZUhlYWRlcihzdHIpIHtcbiAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KC9cXHI/XFxuLyk7XG4gIHZhciBmaWVsZHMgPSB7fTtcbiAgdmFyIGluZGV4O1xuICB2YXIgbGluZTtcbiAgdmFyIGZpZWxkO1xuICB2YXIgdmFsO1xuXG4gIGxpbmVzLnBvcCgpOyAvLyB0cmFpbGluZyBDUkxGXG5cbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGxpbmVzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgbGluZSA9IGxpbmVzW2ldO1xuICAgIGluZGV4ID0gbGluZS5pbmRleE9mKCc6Jyk7XG4gICAgZmllbGQgPSBsaW5lLnNsaWNlKDAsIGluZGV4KS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhbCA9IHRyaW0obGluZS5zbGljZShpbmRleCArIDEpKTtcbiAgICBmaWVsZHNbZmllbGRdID0gdmFsO1xuICB9XG5cbiAgcmV0dXJuIGZpZWxkcztcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBgbWltZWAgaXMganNvbiBvciBoYXMgK2pzb24gc3RydWN0dXJlZCBzeW50YXggc3VmZml4LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBtaW1lXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gaXNKU09OKG1pbWUpIHtcbiAgcmV0dXJuIC9bXFwvK11qc29uXFxiLy50ZXN0KG1pbWUpO1xufVxuXG4vKipcbiAqIFJldHVybiB0aGUgbWltZSB0eXBlIGZvciB0aGUgZ2l2ZW4gYHN0cmAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gdHlwZShzdHIpe1xuICByZXR1cm4gc3RyLnNwbGl0KC8gKjsgKi8pLnNoaWZ0KCk7XG59O1xuXG4vKipcbiAqIFJldHVybiBoZWFkZXIgZmllbGQgcGFyYW1ldGVycy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBwYXJhbXMoc3RyKXtcbiAgcmV0dXJuIHJlZHVjZShzdHIuc3BsaXQoLyAqOyAqLyksIGZ1bmN0aW9uKG9iaiwgc3RyKXtcbiAgICB2YXIgcGFydHMgPSBzdHIuc3BsaXQoLyAqPSAqLylcbiAgICAgICwga2V5ID0gcGFydHMuc2hpZnQoKVxuICAgICAgLCB2YWwgPSBwYXJ0cy5zaGlmdCgpO1xuXG4gICAgaWYgKGtleSAmJiB2YWwpIG9ialtrZXldID0gdmFsO1xuICAgIHJldHVybiBvYmo7XG4gIH0sIHt9KTtcbn07XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBhIG5ldyBgUmVzcG9uc2VgIHdpdGggdGhlIGdpdmVuIGB4aHJgLlxuICpcbiAqICAtIHNldCBmbGFncyAoLm9rLCAuZXJyb3IsIGV0YylcbiAqICAtIHBhcnNlIGhlYWRlclxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICBBbGlhc2luZyBgc3VwZXJhZ2VudGAgYXMgYHJlcXVlc3RgIGlzIG5pY2U6XG4gKlxuICogICAgICByZXF1ZXN0ID0gc3VwZXJhZ2VudDtcbiAqXG4gKiAgV2UgY2FuIHVzZSB0aGUgcHJvbWlzZS1saWtlIEFQSSwgb3IgcGFzcyBjYWxsYmFja3M6XG4gKlxuICogICAgICByZXF1ZXN0LmdldCgnLycpLmVuZChmdW5jdGlvbihyZXMpe30pO1xuICogICAgICByZXF1ZXN0LmdldCgnLycsIGZ1bmN0aW9uKHJlcyl7fSk7XG4gKlxuICogIFNlbmRpbmcgZGF0YSBjYW4gYmUgY2hhaW5lZDpcbiAqXG4gKiAgICAgIHJlcXVlc3RcbiAqICAgICAgICAucG9zdCgnL3VzZXInKVxuICogICAgICAgIC5zZW5kKHsgbmFtZTogJ3RqJyB9KVxuICogICAgICAgIC5lbmQoZnVuY3Rpb24ocmVzKXt9KTtcbiAqXG4gKiAgT3IgcGFzc2VkIHRvIGAuc2VuZCgpYDpcbiAqXG4gKiAgICAgIHJlcXVlc3RcbiAqICAgICAgICAucG9zdCgnL3VzZXInKVxuICogICAgICAgIC5zZW5kKHsgbmFtZTogJ3RqJyB9LCBmdW5jdGlvbihyZXMpe30pO1xuICpcbiAqICBPciBwYXNzZWQgdG8gYC5wb3N0KClgOlxuICpcbiAqICAgICAgcmVxdWVzdFxuICogICAgICAgIC5wb3N0KCcvdXNlcicsIHsgbmFtZTogJ3RqJyB9KVxuICogICAgICAgIC5lbmQoZnVuY3Rpb24ocmVzKXt9KTtcbiAqXG4gKiBPciBmdXJ0aGVyIHJlZHVjZWQgdG8gYSBzaW5nbGUgY2FsbCBmb3Igc2ltcGxlIGNhc2VzOlxuICpcbiAqICAgICAgcmVxdWVzdFxuICogICAgICAgIC5wb3N0KCcvdXNlcicsIHsgbmFtZTogJ3RqJyB9LCBmdW5jdGlvbihyZXMpe30pO1xuICpcbiAqIEBwYXJhbSB7WE1MSFRUUFJlcXVlc3R9IHhoclxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIFJlc3BvbnNlKHJlcSwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdGhpcy5yZXEgPSByZXE7XG4gIHRoaXMueGhyID0gdGhpcy5yZXEueGhyO1xuICAvLyByZXNwb25zZVRleHQgaXMgYWNjZXNzaWJsZSBvbmx5IGlmIHJlc3BvbnNlVHlwZSBpcyAnJyBvciAndGV4dCcgYW5kIG9uIG9sZGVyIGJyb3dzZXJzXG4gIHRoaXMudGV4dCA9ICgodGhpcy5yZXEubWV0aG9kICE9J0hFQUQnICYmICh0aGlzLnhoci5yZXNwb25zZVR5cGUgPT09ICcnIHx8IHRoaXMueGhyLnJlc3BvbnNlVHlwZSA9PT0gJ3RleHQnKSkgfHwgdHlwZW9mIHRoaXMueGhyLnJlc3BvbnNlVHlwZSA9PT0gJ3VuZGVmaW5lZCcpXG4gICAgID8gdGhpcy54aHIucmVzcG9uc2VUZXh0XG4gICAgIDogbnVsbDtcbiAgdGhpcy5zdGF0dXNUZXh0ID0gdGhpcy5yZXEueGhyLnN0YXR1c1RleHQ7XG4gIHRoaXMuc2V0U3RhdHVzUHJvcGVydGllcyh0aGlzLnhoci5zdGF0dXMpO1xuICB0aGlzLmhlYWRlciA9IHRoaXMuaGVhZGVycyA9IHBhcnNlSGVhZGVyKHRoaXMueGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpKTtcbiAgLy8gZ2V0QWxsUmVzcG9uc2VIZWFkZXJzIHNvbWV0aW1lcyBmYWxzZWx5IHJldHVybnMgXCJcIiBmb3IgQ09SUyByZXF1ZXN0cywgYnV0XG4gIC8vIGdldFJlc3BvbnNlSGVhZGVyIHN0aWxsIHdvcmtzLiBzbyB3ZSBnZXQgY29udGVudC10eXBlIGV2ZW4gaWYgZ2V0dGluZ1xuICAvLyBvdGhlciBoZWFkZXJzIGZhaWxzLlxuICB0aGlzLmhlYWRlclsnY29udGVudC10eXBlJ10gPSB0aGlzLnhoci5nZXRSZXNwb25zZUhlYWRlcignY29udGVudC10eXBlJyk7XG4gIHRoaXMuc2V0SGVhZGVyUHJvcGVydGllcyh0aGlzLmhlYWRlcik7XG4gIHRoaXMuYm9keSA9IHRoaXMucmVxLm1ldGhvZCAhPSAnSEVBRCdcbiAgICA/IHRoaXMucGFyc2VCb2R5KHRoaXMudGV4dCA/IHRoaXMudGV4dCA6IHRoaXMueGhyLnJlc3BvbnNlKVxuICAgIDogbnVsbDtcbn1cblxuLyoqXG4gKiBHZXQgY2FzZS1pbnNlbnNpdGl2ZSBgZmllbGRgIHZhbHVlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWVsZFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXNwb25zZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24oZmllbGQpe1xuICByZXR1cm4gdGhpcy5oZWFkZXJbZmllbGQudG9Mb3dlckNhc2UoKV07XG59O1xuXG4vKipcbiAqIFNldCBoZWFkZXIgcmVsYXRlZCBwcm9wZXJ0aWVzOlxuICpcbiAqICAgLSBgLnR5cGVgIHRoZSBjb250ZW50IHR5cGUgd2l0aG91dCBwYXJhbXNcbiAqXG4gKiBBIHJlc3BvbnNlIG9mIFwiQ29udGVudC1UeXBlOiB0ZXh0L3BsYWluOyBjaGFyc2V0PXV0Zi04XCJcbiAqIHdpbGwgcHJvdmlkZSB5b3Ugd2l0aCBhIGAudHlwZWAgb2YgXCJ0ZXh0L3BsYWluXCIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGhlYWRlclxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVzcG9uc2UucHJvdG90eXBlLnNldEhlYWRlclByb3BlcnRpZXMgPSBmdW5jdGlvbihoZWFkZXIpe1xuICAvLyBjb250ZW50LXR5cGVcbiAgdmFyIGN0ID0gdGhpcy5oZWFkZXJbJ2NvbnRlbnQtdHlwZSddIHx8ICcnO1xuICB0aGlzLnR5cGUgPSB0eXBlKGN0KTtcblxuICAvLyBwYXJhbXNcbiAgdmFyIG9iaiA9IHBhcmFtcyhjdCk7XG4gIGZvciAodmFyIGtleSBpbiBvYmopIHRoaXNba2V5XSA9IG9ialtrZXldO1xufTtcblxuLyoqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gYm9keSBgc3RyYC5cbiAqXG4gKiBVc2VkIGZvciBhdXRvLXBhcnNpbmcgb2YgYm9kaWVzLiBQYXJzZXJzXG4gKiBhcmUgZGVmaW5lZCBvbiB0aGUgYHN1cGVyYWdlbnQucGFyc2VgIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtNaXhlZH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlc3BvbnNlLnByb3RvdHlwZS5wYXJzZUJvZHkgPSBmdW5jdGlvbihzdHIpe1xuICB2YXIgcGFyc2UgPSByZXF1ZXN0LnBhcnNlW3RoaXMudHlwZV07XG4gIHJldHVybiBwYXJzZSAmJiBzdHIgJiYgKHN0ci5sZW5ndGggfHwgc3RyIGluc3RhbmNlb2YgT2JqZWN0KVxuICAgID8gcGFyc2Uoc3RyKVxuICAgIDogbnVsbDtcbn07XG5cbi8qKlxuICogU2V0IGZsYWdzIHN1Y2ggYXMgYC5va2AgYmFzZWQgb24gYHN0YXR1c2AuXG4gKlxuICogRm9yIGV4YW1wbGUgYSAyeHggcmVzcG9uc2Ugd2lsbCBnaXZlIHlvdSBhIGAub2tgIG9mIF9fdHJ1ZV9fXG4gKiB3aGVyZWFzIDV4eCB3aWxsIGJlIF9fZmFsc2VfXyBhbmQgYC5lcnJvcmAgd2lsbCBiZSBfX3RydWVfXy4gVGhlXG4gKiBgLmNsaWVudEVycm9yYCBhbmQgYC5zZXJ2ZXJFcnJvcmAgYXJlIGFsc28gYXZhaWxhYmxlIHRvIGJlIG1vcmVcbiAqIHNwZWNpZmljLCBhbmQgYC5zdGF0dXNUeXBlYCBpcyB0aGUgY2xhc3Mgb2YgZXJyb3IgcmFuZ2luZyBmcm9tIDEuLjVcbiAqIHNvbWV0aW1lcyB1c2VmdWwgZm9yIG1hcHBpbmcgcmVzcG9uZCBjb2xvcnMgZXRjLlxuICpcbiAqIFwic3VnYXJcIiBwcm9wZXJ0aWVzIGFyZSBhbHNvIGRlZmluZWQgZm9yIGNvbW1vbiBjYXNlcy4gQ3VycmVudGx5IHByb3ZpZGluZzpcbiAqXG4gKiAgIC0gLm5vQ29udGVudFxuICogICAtIC5iYWRSZXF1ZXN0XG4gKiAgIC0gLnVuYXV0aG9yaXplZFxuICogICAtIC5ub3RBY2NlcHRhYmxlXG4gKiAgIC0gLm5vdEZvdW5kXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHN0YXR1c1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVzcG9uc2UucHJvdG90eXBlLnNldFN0YXR1c1Byb3BlcnRpZXMgPSBmdW5jdGlvbihzdGF0dXMpe1xuICAvLyBoYW5kbGUgSUU5IGJ1ZzogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMDA0Njk3Mi9tc2llLXJldHVybnMtc3RhdHVzLWNvZGUtb2YtMTIyMy1mb3ItYWpheC1yZXF1ZXN0XG4gIGlmIChzdGF0dXMgPT09IDEyMjMpIHtcbiAgICBzdGF0dXMgPSAyMDQ7XG4gIH1cblxuICB2YXIgdHlwZSA9IHN0YXR1cyAvIDEwMCB8IDA7XG5cbiAgLy8gc3RhdHVzIC8gY2xhc3NcbiAgdGhpcy5zdGF0dXMgPSB0aGlzLnN0YXR1c0NvZGUgPSBzdGF0dXM7XG4gIHRoaXMuc3RhdHVzVHlwZSA9IHR5cGU7XG5cbiAgLy8gYmFzaWNzXG4gIHRoaXMuaW5mbyA9IDEgPT0gdHlwZTtcbiAgdGhpcy5vayA9IDIgPT0gdHlwZTtcbiAgdGhpcy5jbGllbnRFcnJvciA9IDQgPT0gdHlwZTtcbiAgdGhpcy5zZXJ2ZXJFcnJvciA9IDUgPT0gdHlwZTtcbiAgdGhpcy5lcnJvciA9ICg0ID09IHR5cGUgfHwgNSA9PSB0eXBlKVxuICAgID8gdGhpcy50b0Vycm9yKClcbiAgICA6IGZhbHNlO1xuXG4gIC8vIHN1Z2FyXG4gIHRoaXMuYWNjZXB0ZWQgPSAyMDIgPT0gc3RhdHVzO1xuICB0aGlzLm5vQ29udGVudCA9IDIwNCA9PSBzdGF0dXM7XG4gIHRoaXMuYmFkUmVxdWVzdCA9IDQwMCA9PSBzdGF0dXM7XG4gIHRoaXMudW5hdXRob3JpemVkID0gNDAxID09IHN0YXR1cztcbiAgdGhpcy5ub3RBY2NlcHRhYmxlID0gNDA2ID09IHN0YXR1cztcbiAgdGhpcy5ub3RGb3VuZCA9IDQwNCA9PSBzdGF0dXM7XG4gIHRoaXMuZm9yYmlkZGVuID0gNDAzID09IHN0YXR1cztcbn07XG5cbi8qKlxuICogUmV0dXJuIGFuIGBFcnJvcmAgcmVwcmVzZW50YXRpdmUgb2YgdGhpcyByZXNwb25zZS5cbiAqXG4gKiBAcmV0dXJuIHtFcnJvcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVzcG9uc2UucHJvdG90eXBlLnRvRXJyb3IgPSBmdW5jdGlvbigpe1xuICB2YXIgcmVxID0gdGhpcy5yZXE7XG4gIHZhciBtZXRob2QgPSByZXEubWV0aG9kO1xuICB2YXIgdXJsID0gcmVxLnVybDtcblxuICB2YXIgbXNnID0gJ2Nhbm5vdCAnICsgbWV0aG9kICsgJyAnICsgdXJsICsgJyAoJyArIHRoaXMuc3RhdHVzICsgJyknO1xuICB2YXIgZXJyID0gbmV3IEVycm9yKG1zZyk7XG4gIGVyci5zdGF0dXMgPSB0aGlzLnN0YXR1cztcbiAgZXJyLm1ldGhvZCA9IG1ldGhvZDtcbiAgZXJyLnVybCA9IHVybDtcblxuICByZXR1cm4gZXJyO1xufTtcblxuLyoqXG4gKiBFeHBvc2UgYFJlc3BvbnNlYC5cbiAqL1xuXG5yZXF1ZXN0LlJlc3BvbnNlID0gUmVzcG9uc2U7XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBhIG5ldyBgUmVxdWVzdGAgd2l0aCB0aGUgZ2l2ZW4gYG1ldGhvZGAgYW5kIGB1cmxgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2RcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gUmVxdWVzdChtZXRob2QsIHVybCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIEVtaXR0ZXIuY2FsbCh0aGlzKTtcbiAgdGhpcy5fcXVlcnkgPSB0aGlzLl9xdWVyeSB8fCBbXTtcbiAgdGhpcy5tZXRob2QgPSBtZXRob2Q7XG4gIHRoaXMudXJsID0gdXJsO1xuICB0aGlzLmhlYWRlciA9IHt9O1xuICB0aGlzLl9oZWFkZXIgPSB7fTtcbiAgdGhpcy5vbignZW5kJywgZnVuY3Rpb24oKXtcbiAgICB2YXIgZXJyID0gbnVsbDtcbiAgICB2YXIgcmVzID0gbnVsbDtcblxuICAgIHRyeSB7XG4gICAgICByZXMgPSBuZXcgUmVzcG9uc2Uoc2VsZik7XG4gICAgfSBjYXRjaChlKSB7XG4gICAgICBlcnIgPSBuZXcgRXJyb3IoJ1BhcnNlciBpcyB1bmFibGUgdG8gcGFyc2UgdGhlIHJlc3BvbnNlJyk7XG4gICAgICBlcnIucGFyc2UgPSB0cnVlO1xuICAgICAgZXJyLm9yaWdpbmFsID0gZTtcbiAgICAgIC8vIGlzc3VlICM2NzU6IHJldHVybiB0aGUgcmF3IHJlc3BvbnNlIGlmIHRoZSByZXNwb25zZSBwYXJzaW5nIGZhaWxzXG4gICAgICBlcnIucmF3UmVzcG9uc2UgPSBzZWxmLnhociAmJiBzZWxmLnhoci5yZXNwb25zZVRleHQgPyBzZWxmLnhoci5yZXNwb25zZVRleHQgOiBudWxsO1xuICAgICAgcmV0dXJuIHNlbGYuY2FsbGJhY2soZXJyKTtcbiAgICB9XG5cbiAgICBzZWxmLmVtaXQoJ3Jlc3BvbnNlJywgcmVzKTtcblxuICAgIGlmIChlcnIpIHtcbiAgICAgIHJldHVybiBzZWxmLmNhbGxiYWNrKGVyciwgcmVzKTtcbiAgICB9XG5cbiAgICBpZiAocmVzLnN0YXR1cyA+PSAyMDAgJiYgcmVzLnN0YXR1cyA8IDMwMCkge1xuICAgICAgcmV0dXJuIHNlbGYuY2FsbGJhY2soZXJyLCByZXMpO1xuICAgIH1cblxuICAgIHZhciBuZXdfZXJyID0gbmV3IEVycm9yKHJlcy5zdGF0dXNUZXh0IHx8ICdVbnN1Y2Nlc3NmdWwgSFRUUCByZXNwb25zZScpO1xuICAgIG5ld19lcnIub3JpZ2luYWwgPSBlcnI7XG4gICAgbmV3X2Vyci5yZXNwb25zZSA9IHJlcztcbiAgICBuZXdfZXJyLnN0YXR1cyA9IHJlcy5zdGF0dXM7XG5cbiAgICBzZWxmLmNhbGxiYWNrKG5ld19lcnIsIHJlcyk7XG4gIH0pO1xufVxuXG4vKipcbiAqIE1peGluIGBFbWl0dGVyYC5cbiAqL1xuXG5FbWl0dGVyKFJlcXVlc3QucHJvdG90eXBlKTtcblxuLyoqXG4gKiBBbGxvdyBmb3IgZXh0ZW5zaW9uXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUudXNlID0gZnVuY3Rpb24oZm4pIHtcbiAgZm4odGhpcyk7XG4gIHJldHVybiB0aGlzO1xufVxuXG4vKipcbiAqIFNldCB0aW1lb3V0IHRvIGBtc2AuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG1zXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUudGltZW91dCA9IGZ1bmN0aW9uKG1zKXtcbiAgdGhpcy5fdGltZW91dCA9IG1zO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQ2xlYXIgcHJldmlvdXMgdGltZW91dC5cbiAqXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuY2xlYXJUaW1lb3V0ID0gZnVuY3Rpb24oKXtcbiAgdGhpcy5fdGltZW91dCA9IDA7XG4gIGNsZWFyVGltZW91dCh0aGlzLl90aW1lcik7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBBYm9ydCB0aGUgcmVxdWVzdCwgYW5kIGNsZWFyIHBvdGVudGlhbCB0aW1lb3V0LlxuICpcbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmFib3J0ID0gZnVuY3Rpb24oKXtcbiAgaWYgKHRoaXMuYWJvcnRlZCkgcmV0dXJuO1xuICB0aGlzLmFib3J0ZWQgPSB0cnVlO1xuICB0aGlzLnhoci5hYm9ydCgpO1xuICB0aGlzLmNsZWFyVGltZW91dCgpO1xuICB0aGlzLmVtaXQoJ2Fib3J0Jyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgaGVhZGVyIGBmaWVsZGAgdG8gYHZhbGAsIG9yIG11bHRpcGxlIGZpZWxkcyB3aXRoIG9uZSBvYmplY3QuXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgICByZXEuZ2V0KCcvJylcbiAqICAgICAgICAuc2V0KCdBY2NlcHQnLCAnYXBwbGljYXRpb24vanNvbicpXG4gKiAgICAgICAgLnNldCgnWC1BUEktS2V5JywgJ2Zvb2JhcicpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogICAgICByZXEuZ2V0KCcvJylcbiAqICAgICAgICAuc2V0KHsgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsICdYLUFQSS1LZXknOiAnZm9vYmFyJyB9KVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gZmllbGRcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWxcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbihmaWVsZCwgdmFsKXtcbiAgaWYgKGlzT2JqZWN0KGZpZWxkKSkge1xuICAgIGZvciAodmFyIGtleSBpbiBmaWVsZCkge1xuICAgICAgdGhpcy5zZXQoa2V5LCBmaWVsZFtrZXldKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgdGhpcy5faGVhZGVyW2ZpZWxkLnRvTG93ZXJDYXNlKCldID0gdmFsO1xuICB0aGlzLmhlYWRlcltmaWVsZF0gPSB2YWw7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgaGVhZGVyIGBmaWVsZGAuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiAgICAgIHJlcS5nZXQoJy8nKVxuICogICAgICAgIC51bnNldCgnVXNlci1BZ2VudCcpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUudW5zZXQgPSBmdW5jdGlvbihmaWVsZCl7XG4gIGRlbGV0ZSB0aGlzLl9oZWFkZXJbZmllbGQudG9Mb3dlckNhc2UoKV07XG4gIGRlbGV0ZSB0aGlzLmhlYWRlcltmaWVsZF07XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBHZXQgY2FzZS1pbnNlbnNpdGl2ZSBoZWFkZXIgYGZpZWxkYCB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZmllbGRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmdldEhlYWRlciA9IGZ1bmN0aW9uKGZpZWxkKXtcbiAgcmV0dXJuIHRoaXMuX2hlYWRlcltmaWVsZC50b0xvd2VyQ2FzZSgpXTtcbn07XG5cbi8qKlxuICogU2V0IENvbnRlbnQtVHlwZSB0byBgdHlwZWAsIG1hcHBpbmcgdmFsdWVzIGZyb20gYHJlcXVlc3QudHlwZXNgLlxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICAgICAgc3VwZXJhZ2VudC50eXBlcy54bWwgPSAnYXBwbGljYXRpb24veG1sJztcbiAqXG4gKiAgICAgIHJlcXVlc3QucG9zdCgnLycpXG4gKiAgICAgICAgLnR5cGUoJ3htbCcpXG4gKiAgICAgICAgLnNlbmQoeG1sc3RyaW5nKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqICAgICAgcmVxdWVzdC5wb3N0KCcvJylcbiAqICAgICAgICAudHlwZSgnYXBwbGljYXRpb24veG1sJylcbiAqICAgICAgICAuc2VuZCh4bWxzdHJpbmcpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS50eXBlID0gZnVuY3Rpb24odHlwZSl7XG4gIHRoaXMuc2V0KCdDb250ZW50LVR5cGUnLCByZXF1ZXN0LnR5cGVzW3R5cGVdIHx8IHR5cGUpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRm9yY2UgZ2l2ZW4gcGFyc2VyXG4gKlxuICogU2V0cyB0aGUgYm9keSBwYXJzZXIgbm8gbWF0dGVyIHR5cGUuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbihmbil7XG4gIHRoaXMuX3BhcnNlciA9IGZuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IEFjY2VwdCB0byBgdHlwZWAsIG1hcHBpbmcgdmFsdWVzIGZyb20gYHJlcXVlc3QudHlwZXNgLlxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICAgICAgc3VwZXJhZ2VudC50eXBlcy5qc29uID0gJ2FwcGxpY2F0aW9uL2pzb24nO1xuICpcbiAqICAgICAgcmVxdWVzdC5nZXQoJy9hZ2VudCcpXG4gKiAgICAgICAgLmFjY2VwdCgnanNvbicpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogICAgICByZXF1ZXN0LmdldCgnL2FnZW50JylcbiAqICAgICAgICAuYWNjZXB0KCdhcHBsaWNhdGlvbi9qc29uJylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gYWNjZXB0XG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuYWNjZXB0ID0gZnVuY3Rpb24odHlwZSl7XG4gIHRoaXMuc2V0KCdBY2NlcHQnLCByZXF1ZXN0LnR5cGVzW3R5cGVdIHx8IHR5cGUpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IEF1dGhvcml6YXRpb24gZmllbGQgdmFsdWUgd2l0aCBgdXNlcmAgYW5kIGBwYXNzYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXNlclxuICogQHBhcmFtIHtTdHJpbmd9IHBhc3NcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5hdXRoID0gZnVuY3Rpb24odXNlciwgcGFzcyl7XG4gIHZhciBzdHIgPSBidG9hKHVzZXIgKyAnOicgKyBwYXNzKTtcbiAgdGhpcy5zZXQoJ0F1dGhvcml6YXRpb24nLCAnQmFzaWMgJyArIHN0cik7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4qIEFkZCBxdWVyeS1zdHJpbmcgYHZhbGAuXG4qXG4qIEV4YW1wbGVzOlxuKlxuKiAgIHJlcXVlc3QuZ2V0KCcvc2hvZXMnKVxuKiAgICAgLnF1ZXJ5KCdzaXplPTEwJylcbiogICAgIC5xdWVyeSh7IGNvbG9yOiAnYmx1ZScgfSlcbipcbiogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSB2YWxcbiogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4qIEBhcGkgcHVibGljXG4qL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5xdWVyeSA9IGZ1bmN0aW9uKHZhbCl7XG4gIGlmICgnc3RyaW5nJyAhPSB0eXBlb2YgdmFsKSB2YWwgPSBzZXJpYWxpemUodmFsKTtcbiAgaWYgKHZhbCkgdGhpcy5fcXVlcnkucHVzaCh2YWwpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogV3JpdGUgdGhlIGZpZWxkIGBuYW1lYCBhbmQgYHZhbGAgZm9yIFwibXVsdGlwYXJ0L2Zvcm0tZGF0YVwiXG4gKiByZXF1ZXN0IGJvZGllcy5cbiAqXG4gKiBgYGAganNcbiAqIHJlcXVlc3QucG9zdCgnL3VwbG9hZCcpXG4gKiAgIC5maWVsZCgnZm9vJywgJ2JhcicpXG4gKiAgIC5lbmQoY2FsbGJhY2spO1xuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7U3RyaW5nfEJsb2J8RmlsZX0gdmFsXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuZmllbGQgPSBmdW5jdGlvbihuYW1lLCB2YWwpe1xuICBpZiAoIXRoaXMuX2Zvcm1EYXRhKSB0aGlzLl9mb3JtRGF0YSA9IG5ldyByb290LkZvcm1EYXRhKCk7XG4gIHRoaXMuX2Zvcm1EYXRhLmFwcGVuZChuYW1lLCB2YWwpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUXVldWUgdGhlIGdpdmVuIGBmaWxlYCBhcyBhbiBhdHRhY2htZW50IHRvIHRoZSBzcGVjaWZpZWQgYGZpZWxkYCxcbiAqIHdpdGggb3B0aW9uYWwgYGZpbGVuYW1lYC5cbiAqXG4gKiBgYGAganNcbiAqIHJlcXVlc3QucG9zdCgnL3VwbG9hZCcpXG4gKiAgIC5hdHRhY2gobmV3IEJsb2IoWyc8YSBpZD1cImFcIj48YiBpZD1cImJcIj5oZXkhPC9iPjwvYT4nXSwgeyB0eXBlOiBcInRleHQvaHRtbFwifSkpXG4gKiAgIC5lbmQoY2FsbGJhY2spO1xuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkXG4gKiBAcGFyYW0ge0Jsb2J8RmlsZX0gZmlsZVxuICogQHBhcmFtIHtTdHJpbmd9IGZpbGVuYW1lXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuYXR0YWNoID0gZnVuY3Rpb24oZmllbGQsIGZpbGUsIGZpbGVuYW1lKXtcbiAgaWYgKCF0aGlzLl9mb3JtRGF0YSkgdGhpcy5fZm9ybURhdGEgPSBuZXcgcm9vdC5Gb3JtRGF0YSgpO1xuICB0aGlzLl9mb3JtRGF0YS5hcHBlbmQoZmllbGQsIGZpbGUsIGZpbGVuYW1lKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNlbmQgYGRhdGFgLCBkZWZhdWx0aW5nIHRoZSBgLnR5cGUoKWAgdG8gXCJqc29uXCIgd2hlblxuICogYW4gb2JqZWN0IGlzIGdpdmVuLlxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICAgICAgIC8vIHF1ZXJ5c3RyaW5nXG4gKiAgICAgICByZXF1ZXN0LmdldCgnL3NlYXJjaCcpXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogICAgICAgLy8gbXVsdGlwbGUgZGF0YSBcIndyaXRlc1wiXG4gKiAgICAgICByZXF1ZXN0LmdldCgnL3NlYXJjaCcpXG4gKiAgICAgICAgIC5zZW5kKHsgc2VhcmNoOiAncXVlcnknIH0pXG4gKiAgICAgICAgIC5zZW5kKHsgcmFuZ2U6ICcxLi41JyB9KVxuICogICAgICAgICAuc2VuZCh7IG9yZGVyOiAnZGVzYycgfSlcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiAgICAgICAvLyBtYW51YWwganNvblxuICogICAgICAgcmVxdWVzdC5wb3N0KCcvdXNlcicpXG4gKiAgICAgICAgIC50eXBlKCdqc29uJylcbiAqICAgICAgICAgLnNlbmQoJ3tcIm5hbWVcIjpcInRqXCJ9JylcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiAgICAgICAvLyBhdXRvIGpzb25cbiAqICAgICAgIHJlcXVlc3QucG9zdCgnL3VzZXInKVxuICogICAgICAgICAuc2VuZCh7IG5hbWU6ICd0aicgfSlcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiAgICAgICAvLyBtYW51YWwgeC13d3ctZm9ybS11cmxlbmNvZGVkXG4gKiAgICAgICByZXF1ZXN0LnBvc3QoJy91c2VyJylcbiAqICAgICAgICAgLnR5cGUoJ2Zvcm0nKVxuICogICAgICAgICAuc2VuZCgnbmFtZT10aicpXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogICAgICAgLy8gYXV0byB4LXd3dy1mb3JtLXVybGVuY29kZWRcbiAqICAgICAgIHJlcXVlc3QucG9zdCgnL3VzZXInKVxuICogICAgICAgICAudHlwZSgnZm9ybScpXG4gKiAgICAgICAgIC5zZW5kKHsgbmFtZTogJ3RqJyB9KVxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqICAgICAgIC8vIGRlZmF1bHRzIHRvIHgtd3d3LWZvcm0tdXJsZW5jb2RlZFxuICAqICAgICAgcmVxdWVzdC5wb3N0KCcvdXNlcicpXG4gICogICAgICAgIC5zZW5kKCduYW1lPXRvYmknKVxuICAqICAgICAgICAuc2VuZCgnc3BlY2llcz1mZXJyZXQnKVxuICAqICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gZGF0YVxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbihkYXRhKXtcbiAgdmFyIG9iaiA9IGlzT2JqZWN0KGRhdGEpO1xuICB2YXIgdHlwZSA9IHRoaXMuZ2V0SGVhZGVyKCdDb250ZW50LVR5cGUnKTtcblxuICAvLyBtZXJnZVxuICBpZiAob2JqICYmIGlzT2JqZWN0KHRoaXMuX2RhdGEpKSB7XG4gICAgZm9yICh2YXIga2V5IGluIGRhdGEpIHtcbiAgICAgIHRoaXMuX2RhdGFba2V5XSA9IGRhdGFba2V5XTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoJ3N0cmluZycgPT0gdHlwZW9mIGRhdGEpIHtcbiAgICBpZiAoIXR5cGUpIHRoaXMudHlwZSgnZm9ybScpO1xuICAgIHR5cGUgPSB0aGlzLmdldEhlYWRlcignQ29udGVudC1UeXBlJyk7XG4gICAgaWYgKCdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnID09IHR5cGUpIHtcbiAgICAgIHRoaXMuX2RhdGEgPSB0aGlzLl9kYXRhXG4gICAgICAgID8gdGhpcy5fZGF0YSArICcmJyArIGRhdGFcbiAgICAgICAgOiBkYXRhO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9kYXRhID0gKHRoaXMuX2RhdGEgfHwgJycpICsgZGF0YTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5fZGF0YSA9IGRhdGE7XG4gIH1cblxuICBpZiAoIW9iaiB8fCBpc0hvc3QoZGF0YSkpIHJldHVybiB0aGlzO1xuICBpZiAoIXR5cGUpIHRoaXMudHlwZSgnanNvbicpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogSW52b2tlIHRoZSBjYWxsYmFjayB3aXRoIGBlcnJgIGFuZCBgcmVzYFxuICogYW5kIGhhbmRsZSBhcml0eSBjaGVjay5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJcbiAqIEBwYXJhbSB7UmVzcG9uc2V9IHJlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuY2FsbGJhY2sgPSBmdW5jdGlvbihlcnIsIHJlcyl7XG4gIHZhciBmbiA9IHRoaXMuX2NhbGxiYWNrO1xuICB0aGlzLmNsZWFyVGltZW91dCgpO1xuICBmbihlcnIsIHJlcyk7XG59O1xuXG4vKipcbiAqIEludm9rZSBjYWxsYmFjayB3aXRoIHgtZG9tYWluIGVycm9yLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmNyb3NzRG9tYWluRXJyb3IgPSBmdW5jdGlvbigpe1xuICB2YXIgZXJyID0gbmV3IEVycm9yKCdSZXF1ZXN0IGhhcyBiZWVuIHRlcm1pbmF0ZWRcXG5Qb3NzaWJsZSBjYXVzZXM6IHRoZSBuZXR3b3JrIGlzIG9mZmxpbmUsIE9yaWdpbiBpcyBub3QgYWxsb3dlZCBieSBBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4sIHRoZSBwYWdlIGlzIGJlaW5nIHVubG9hZGVkLCBldGMuJyk7XG4gIGVyci5jcm9zc0RvbWFpbiA9IHRydWU7XG5cbiAgZXJyLnN0YXR1cyA9IHRoaXMuc3RhdHVzO1xuICBlcnIubWV0aG9kID0gdGhpcy5tZXRob2Q7XG4gIGVyci51cmwgPSB0aGlzLnVybDtcblxuICB0aGlzLmNhbGxiYWNrKGVycik7XG59O1xuXG4vKipcbiAqIEludm9rZSBjYWxsYmFjayB3aXRoIHRpbWVvdXQgZXJyb3IuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUudGltZW91dEVycm9yID0gZnVuY3Rpb24oKXtcbiAgdmFyIHRpbWVvdXQgPSB0aGlzLl90aW1lb3V0O1xuICB2YXIgZXJyID0gbmV3IEVycm9yKCd0aW1lb3V0IG9mICcgKyB0aW1lb3V0ICsgJ21zIGV4Y2VlZGVkJyk7XG4gIGVyci50aW1lb3V0ID0gdGltZW91dDtcbiAgdGhpcy5jYWxsYmFjayhlcnIpO1xufTtcblxuLyoqXG4gKiBFbmFibGUgdHJhbnNtaXNzaW9uIG9mIGNvb2tpZXMgd2l0aCB4LWRvbWFpbiByZXF1ZXN0cy5cbiAqXG4gKiBOb3RlIHRoYXQgZm9yIHRoaXMgdG8gd29yayB0aGUgb3JpZ2luIG11c3Qgbm90IGJlXG4gKiB1c2luZyBcIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpblwiIHdpdGggYSB3aWxkY2FyZCxcbiAqIGFuZCBhbHNvIG11c3Qgc2V0IFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctQ3JlZGVudGlhbHNcIlxuICogdG8gXCJ0cnVlXCIuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS53aXRoQ3JlZGVudGlhbHMgPSBmdW5jdGlvbigpe1xuICB0aGlzLl93aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogSW5pdGlhdGUgcmVxdWVzdCwgaW52b2tpbmcgY2FsbGJhY2sgYGZuKHJlcylgXG4gKiB3aXRoIGFuIGluc3RhbmNlb2YgYFJlc3BvbnNlYC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uKGZuKXtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgeGhyID0gdGhpcy54aHIgPSByZXF1ZXN0LmdldFhIUigpO1xuICB2YXIgcXVlcnkgPSB0aGlzLl9xdWVyeS5qb2luKCcmJyk7XG4gIHZhciB0aW1lb3V0ID0gdGhpcy5fdGltZW91dDtcbiAgdmFyIGRhdGEgPSB0aGlzLl9mb3JtRGF0YSB8fCB0aGlzLl9kYXRhO1xuXG4gIC8vIHN0b3JlIGNhbGxiYWNrXG4gIHRoaXMuX2NhbGxiYWNrID0gZm4gfHwgbm9vcDtcblxuICAvLyBzdGF0ZSBjaGFuZ2VcbiAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCl7XG4gICAgaWYgKDQgIT0geGhyLnJlYWR5U3RhdGUpIHJldHVybjtcblxuICAgIC8vIEluIElFOSwgcmVhZHMgdG8gYW55IHByb3BlcnR5IChlLmcuIHN0YXR1cykgb2ZmIG9mIGFuIGFib3J0ZWQgWEhSIHdpbGxcbiAgICAvLyByZXN1bHQgaW4gdGhlIGVycm9yIFwiQ291bGQgbm90IGNvbXBsZXRlIHRoZSBvcGVyYXRpb24gZHVlIHRvIGVycm9yIGMwMGMwMjNmXCJcbiAgICB2YXIgc3RhdHVzO1xuICAgIHRyeSB7IHN0YXR1cyA9IHhoci5zdGF0dXMgfSBjYXRjaChlKSB7IHN0YXR1cyA9IDA7IH1cblxuICAgIGlmICgwID09IHN0YXR1cykge1xuICAgICAgaWYgKHNlbGYudGltZWRvdXQpIHJldHVybiBzZWxmLnRpbWVvdXRFcnJvcigpO1xuICAgICAgaWYgKHNlbGYuYWJvcnRlZCkgcmV0dXJuO1xuICAgICAgcmV0dXJuIHNlbGYuY3Jvc3NEb21haW5FcnJvcigpO1xuICAgIH1cbiAgICBzZWxmLmVtaXQoJ2VuZCcpO1xuICB9O1xuXG4gIC8vIHByb2dyZXNzXG4gIHZhciBoYW5kbGVQcm9ncmVzcyA9IGZ1bmN0aW9uKGUpe1xuICAgIGlmIChlLnRvdGFsID4gMCkge1xuICAgICAgZS5wZXJjZW50ID0gZS5sb2FkZWQgLyBlLnRvdGFsICogMTAwO1xuICAgIH1cbiAgICBzZWxmLmVtaXQoJ3Byb2dyZXNzJywgZSk7XG4gIH07XG4gIGlmICh0aGlzLmhhc0xpc3RlbmVycygncHJvZ3Jlc3MnKSkge1xuICAgIHhoci5vbnByb2dyZXNzID0gaGFuZGxlUHJvZ3Jlc3M7XG4gIH1cbiAgdHJ5IHtcbiAgICBpZiAoeGhyLnVwbG9hZCAmJiB0aGlzLmhhc0xpc3RlbmVycygncHJvZ3Jlc3MnKSkge1xuICAgICAgeGhyLnVwbG9hZC5vbnByb2dyZXNzID0gaGFuZGxlUHJvZ3Jlc3M7XG4gICAgfVxuICB9IGNhdGNoKGUpIHtcbiAgICAvLyBBY2Nlc3NpbmcgeGhyLnVwbG9hZCBmYWlscyBpbiBJRSBmcm9tIGEgd2ViIHdvcmtlciwgc28ganVzdCBwcmV0ZW5kIGl0IGRvZXNuJ3QgZXhpc3QuXG4gICAgLy8gUmVwb3J0ZWQgaGVyZTpcbiAgICAvLyBodHRwczovL2Nvbm5lY3QubWljcm9zb2Z0LmNvbS9JRS9mZWVkYmFjay9kZXRhaWxzLzgzNzI0NS94bWxodHRwcmVxdWVzdC11cGxvYWQtdGhyb3dzLWludmFsaWQtYXJndW1lbnQtd2hlbi11c2VkLWZyb20td2ViLXdvcmtlci1jb250ZXh0XG4gIH1cblxuICAvLyB0aW1lb3V0XG4gIGlmICh0aW1lb3V0ICYmICF0aGlzLl90aW1lcikge1xuICAgIHRoaXMuX3RpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgc2VsZi50aW1lZG91dCA9IHRydWU7XG4gICAgICBzZWxmLmFib3J0KCk7XG4gICAgfSwgdGltZW91dCk7XG4gIH1cblxuICAvLyBxdWVyeXN0cmluZ1xuICBpZiAocXVlcnkpIHtcbiAgICBxdWVyeSA9IHJlcXVlc3Quc2VyaWFsaXplT2JqZWN0KHF1ZXJ5KTtcbiAgICB0aGlzLnVybCArPSB+dGhpcy51cmwuaW5kZXhPZignPycpXG4gICAgICA/ICcmJyArIHF1ZXJ5XG4gICAgICA6ICc/JyArIHF1ZXJ5O1xuICB9XG5cbiAgLy8gaW5pdGlhdGUgcmVxdWVzdFxuICB4aHIub3Blbih0aGlzLm1ldGhvZCwgdGhpcy51cmwsIHRydWUpO1xuXG4gIC8vIENPUlNcbiAgaWYgKHRoaXMuX3dpdGhDcmVkZW50aWFscykgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cbiAgLy8gYm9keVxuICBpZiAoJ0dFVCcgIT0gdGhpcy5tZXRob2QgJiYgJ0hFQUQnICE9IHRoaXMubWV0aG9kICYmICdzdHJpbmcnICE9IHR5cGVvZiBkYXRhICYmICFpc0hvc3QoZGF0YSkpIHtcbiAgICAvLyBzZXJpYWxpemUgc3R1ZmZcbiAgICB2YXIgY29udGVudFR5cGUgPSB0aGlzLmdldEhlYWRlcignQ29udGVudC1UeXBlJyk7XG4gICAgdmFyIHNlcmlhbGl6ZSA9IHRoaXMuX3BhcnNlciB8fCByZXF1ZXN0LnNlcmlhbGl6ZVtjb250ZW50VHlwZSA/IGNvbnRlbnRUeXBlLnNwbGl0KCc7JylbMF0gOiAnJ107XG4gICAgaWYgKCFzZXJpYWxpemUgJiYgaXNKU09OKGNvbnRlbnRUeXBlKSkgc2VyaWFsaXplID0gcmVxdWVzdC5zZXJpYWxpemVbJ2FwcGxpY2F0aW9uL2pzb24nXTtcbiAgICBpZiAoc2VyaWFsaXplKSBkYXRhID0gc2VyaWFsaXplKGRhdGEpO1xuICB9XG5cbiAgLy8gc2V0IGhlYWRlciBmaWVsZHNcbiAgZm9yICh2YXIgZmllbGQgaW4gdGhpcy5oZWFkZXIpIHtcbiAgICBpZiAobnVsbCA9PSB0aGlzLmhlYWRlcltmaWVsZF0pIGNvbnRpbnVlO1xuICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGZpZWxkLCB0aGlzLmhlYWRlcltmaWVsZF0pO1xuICB9XG5cbiAgLy8gc2VuZCBzdHVmZlxuICB0aGlzLmVtaXQoJ3JlcXVlc3QnLCB0aGlzKTtcblxuICAvLyBJRTExIHhoci5zZW5kKHVuZGVmaW5lZCkgc2VuZHMgJ3VuZGVmaW5lZCcgc3RyaW5nIGFzIFBPU1QgcGF5bG9hZCAoaW5zdGVhZCBvZiBub3RoaW5nKVxuICAvLyBXZSBuZWVkIG51bGwgaGVyZSBpZiBkYXRhIGlzIHVuZGVmaW5lZFxuICB4aHIuc2VuZCh0eXBlb2YgZGF0YSAhPT0gJ3VuZGVmaW5lZCcgPyBkYXRhIDogbnVsbCk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBGYXV4IHByb21pc2Ugc3VwcG9ydFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bGZpbGxcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdFxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS50aGVuID0gZnVuY3Rpb24gKGZ1bGZpbGwsIHJlamVjdCkge1xuICByZXR1cm4gdGhpcy5lbmQoZnVuY3Rpb24oZXJyLCByZXMpIHtcbiAgICBlcnIgPyByZWplY3QoZXJyKSA6IGZ1bGZpbGwocmVzKTtcbiAgfSk7XG59XG5cbi8qKlxuICogRXhwb3NlIGBSZXF1ZXN0YC5cbiAqL1xuXG5yZXF1ZXN0LlJlcXVlc3QgPSBSZXF1ZXN0O1xuXG4vKipcbiAqIElzc3VlIGEgcmVxdWVzdDpcbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgICByZXF1ZXN0KCdHRVQnLCAnL3VzZXJzJykuZW5kKGNhbGxiYWNrKVxuICogICAgcmVxdWVzdCgnL3VzZXJzJykuZW5kKGNhbGxiYWNrKVxuICogICAgcmVxdWVzdCgnL3VzZXJzJywgY2FsbGJhY2spXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZFxuICogQHBhcmFtIHtTdHJpbmd8RnVuY3Rpb259IHVybCBvciBjYWxsYmFja1xuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gcmVxdWVzdChtZXRob2QsIHVybCkge1xuICAvLyBjYWxsYmFja1xuICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgdXJsKSB7XG4gICAgcmV0dXJuIG5ldyBSZXF1ZXN0KCdHRVQnLCBtZXRob2QpLmVuZCh1cmwpO1xuICB9XG5cbiAgLy8gdXJsIGZpcnN0XG4gIGlmICgxID09IGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICByZXR1cm4gbmV3IFJlcXVlc3QoJ0dFVCcsIG1ldGhvZCk7XG4gIH1cblxuICByZXR1cm4gbmV3IFJlcXVlc3QobWV0aG9kLCB1cmwpO1xufVxuXG4vKipcbiAqIEdFVCBgdXJsYCB3aXRoIG9wdGlvbmFsIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfEZ1bmN0aW9ufSBkYXRhIG9yIGZuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucmVxdWVzdC5nZXQgPSBmdW5jdGlvbih1cmwsIGRhdGEsIGZuKXtcbiAgdmFyIHJlcSA9IHJlcXVlc3QoJ0dFVCcsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSBmbiA9IGRhdGEsIGRhdGEgPSBudWxsO1xuICBpZiAoZGF0YSkgcmVxLnF1ZXJ5KGRhdGEpO1xuICBpZiAoZm4pIHJlcS5lbmQoZm4pO1xuICByZXR1cm4gcmVxO1xufTtcblxuLyoqXG4gKiBIRUFEIGB1cmxgIHdpdGggb3B0aW9uYWwgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7TWl4ZWR8RnVuY3Rpb259IGRhdGEgb3IgZm5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5yZXF1ZXN0LmhlYWQgPSBmdW5jdGlvbih1cmwsIGRhdGEsIGZuKXtcbiAgdmFyIHJlcSA9IHJlcXVlc3QoJ0hFQUQnLCB1cmwpO1xuICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgZGF0YSkgZm4gPSBkYXRhLCBkYXRhID0gbnVsbDtcbiAgaWYgKGRhdGEpIHJlcS5zZW5kKGRhdGEpO1xuICBpZiAoZm4pIHJlcS5lbmQoZm4pO1xuICByZXR1cm4gcmVxO1xufTtcblxuLyoqXG4gKiBERUxFVEUgYHVybGAgd2l0aCBvcHRpb25hbCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGRlbCh1cmwsIGZuKXtcbiAgdmFyIHJlcSA9IHJlcXVlc3QoJ0RFTEVURScsIHVybCk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuXG5yZXF1ZXN0LmRlbCA9IGRlbDtcbnJlcXVlc3QuZGVsZXRlID0gZGVsO1xuXG4vKipcbiAqIFBBVENIIGB1cmxgIHdpdGggb3B0aW9uYWwgYGRhdGFgIGFuZCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtNaXhlZH0gZGF0YVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3QucGF0Y2ggPSBmdW5jdGlvbih1cmwsIGRhdGEsIGZuKXtcbiAgdmFyIHJlcSA9IHJlcXVlc3QoJ1BBVENIJywgdXJsKTtcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGRhdGEpIGZuID0gZGF0YSwgZGF0YSA9IG51bGw7XG4gIGlmIChkYXRhKSByZXEuc2VuZChkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG5cbi8qKlxuICogUE9TVCBgdXJsYCB3aXRoIG9wdGlvbmFsIGBkYXRhYCBhbmQgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7TWl4ZWR9IGRhdGFcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5yZXF1ZXN0LnBvc3QgPSBmdW5jdGlvbih1cmwsIGRhdGEsIGZuKXtcbiAgdmFyIHJlcSA9IHJlcXVlc3QoJ1BPU1QnLCB1cmwpO1xuICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgZGF0YSkgZm4gPSBkYXRhLCBkYXRhID0gbnVsbDtcbiAgaWYgKGRhdGEpIHJlcS5zZW5kKGRhdGEpO1xuICBpZiAoZm4pIHJlcS5lbmQoZm4pO1xuICByZXR1cm4gcmVxO1xufTtcblxuLyoqXG4gKiBQVVQgYHVybGAgd2l0aCBvcHRpb25hbCBgZGF0YWAgYW5kIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfEZ1bmN0aW9ufSBkYXRhIG9yIGZuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucmVxdWVzdC5wdXQgPSBmdW5jdGlvbih1cmwsIGRhdGEsIGZuKXtcbiAgdmFyIHJlcSA9IHJlcXVlc3QoJ1BVVCcsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSBmbiA9IGRhdGEsIGRhdGEgPSBudWxsO1xuICBpZiAoZGF0YSkgcmVxLnNlbmQoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuXG4vKipcbiAqIEV4cG9zZSBgcmVxdWVzdGAuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSByZXF1ZXN0O1xuIiwiXG4vKipcbiAqIEV4cG9zZSBgRW1pdHRlcmAuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBFbWl0dGVyO1xuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgYEVtaXR0ZXJgLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gRW1pdHRlcihvYmopIHtcbiAgaWYgKG9iaikgcmV0dXJuIG1peGluKG9iaik7XG59O1xuXG4vKipcbiAqIE1peGluIHRoZSBlbWl0dGVyIHByb3BlcnRpZXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbWl4aW4ob2JqKSB7XG4gIGZvciAodmFyIGtleSBpbiBFbWl0dGVyLnByb3RvdHlwZSkge1xuICAgIG9ialtrZXldID0gRW1pdHRlci5wcm90b3R5cGVba2V5XTtcbiAgfVxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIExpc3RlbiBvbiB0aGUgZ2l2ZW4gYGV2ZW50YCB3aXRoIGBmbmAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7RW1pdHRlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUub24gPVxuRW1pdHRlci5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50LCBmbil7XG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcbiAgKHRoaXMuX2NhbGxiYWNrc1tldmVudF0gPSB0aGlzLl9jYWxsYmFja3NbZXZlbnRdIHx8IFtdKVxuICAgIC5wdXNoKGZuKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEFkZHMgYW4gYGV2ZW50YCBsaXN0ZW5lciB0aGF0IHdpbGwgYmUgaW52b2tlZCBhIHNpbmdsZVxuICogdGltZSB0aGVuIGF1dG9tYXRpY2FsbHkgcmVtb3ZlZC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XG5cbiAgZnVuY3Rpb24gb24oKSB7XG4gICAgc2VsZi5vZmYoZXZlbnQsIG9uKTtcbiAgICBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgb24uZm4gPSBmbjtcbiAgdGhpcy5vbihldmVudCwgb24pO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBnaXZlbiBjYWxsYmFjayBmb3IgYGV2ZW50YCBvciBhbGxcbiAqIHJlZ2lzdGVyZWQgY2FsbGJhY2tzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkVtaXR0ZXIucHJvdG90eXBlLm9mZiA9XG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9XG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPVxuRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50LCBmbil7XG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcblxuICAvLyBhbGxcbiAgaWYgKDAgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIHRoaXMuX2NhbGxiYWNrcyA9IHt9O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gc3BlY2lmaWMgZXZlbnRcbiAgdmFyIGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1tldmVudF07XG4gIGlmICghY2FsbGJhY2tzKSByZXR1cm4gdGhpcztcblxuICAvLyByZW1vdmUgYWxsIGhhbmRsZXJzXG4gIGlmICgxID09IGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICBkZWxldGUgdGhpcy5fY2FsbGJhY2tzW2V2ZW50XTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIHJlbW92ZSBzcGVjaWZpYyBoYW5kbGVyXG4gIHZhciBjYjtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiAgICBjYiA9IGNhbGxiYWNrc1tpXTtcbiAgICBpZiAoY2IgPT09IGZuIHx8IGNiLmZuID09PSBmbikge1xuICAgICAgY2FsbGJhY2tzLnNwbGljZShpLCAxKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRW1pdCBgZXZlbnRgIHdpdGggdGhlIGdpdmVuIGFyZ3MuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge01peGVkfSAuLi5cbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxuICAgICwgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzW2V2ZW50XTtcblxuICBpZiAoY2FsbGJhY2tzKSB7XG4gICAgY2FsbGJhY2tzID0gY2FsbGJhY2tzLnNsaWNlKDApO1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjYWxsYmFja3MubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgIGNhbGxiYWNrc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmV0dXJuIGFycmF5IG9mIGNhbGxiYWNrcyBmb3IgYGV2ZW50YC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEByZXR1cm4ge0FycmF5fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbihldmVudCl7XG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcbiAgcmV0dXJuIHRoaXMuX2NhbGxiYWNrc1tldmVudF0gfHwgW107XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIHRoaXMgZW1pdHRlciBoYXMgYGV2ZW50YCBoYW5kbGVycy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkVtaXR0ZXIucHJvdG90eXBlLmhhc0xpc3RlbmVycyA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgcmV0dXJuICEhIHRoaXMubGlzdGVuZXJzKGV2ZW50KS5sZW5ndGg7XG59O1xuIiwiXG4vKipcbiAqIFJlZHVjZSBgYXJyYCB3aXRoIGBmbmAuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gYXJyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtNaXhlZH0gaW5pdGlhbFxuICpcbiAqIFRPRE86IGNvbWJhdGlibGUgZXJyb3IgaGFuZGxpbmc/XG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhcnIsIGZuLCBpbml0aWFsKXsgIFxuICB2YXIgaWR4ID0gMDtcbiAgdmFyIGxlbiA9IGFyci5sZW5ndGg7XG4gIHZhciBjdXJyID0gYXJndW1lbnRzLmxlbmd0aCA9PSAzXG4gICAgPyBpbml0aWFsXG4gICAgOiBhcnJbaWR4KytdO1xuXG4gIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICBjdXJyID0gZm4uY2FsbChudWxsLCBjdXJyLCBhcnJbaWR4XSwgKytpZHgsIGFycik7XG4gIH1cbiAgXG4gIHJldHVybiBjdXJyO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBjb25zdCBjb25zdGFudHMgPSB7XG4gIGRhdGE6IHtcbiAgICB1cmw6ICcuLi9kYXRhL2RhdGEuanNvbidcbiAgfSxcbiAgLy8gVGhlIGZpcnN0IHRpbGUgc2l6ZSBoYXZlIHRoZSBwcmlvcml0eS5cbiAgLy8gVGhhdCBtZWFuIHdpbGwgcGFyc2UgdGhlIHRpbGUgc2l6ZSBmcm9tIHRvcCB0byBib3R0b20uXG4gIC8vIEl0cyBiZXR0ZXIgdG8gYWRkIHRoZSBiaWdnZXN0IHRpbGUgYXQgdGhlIHRvcC5cbiAgVElMRV9TSVpFOiB7XG4gICAgWFhMOiB7XG4gICAgICBtYXhBbW91bnQ6IDEsXG4gICAgICBjb2w6IDUsXG4gICAgICByb3c6IDVcbiAgICB9LFxuICAgIFhMOiB7XG4gICAgICBtYXhBbW91bnQ6IDIsXG4gICAgICBjb2w6IDQsXG4gICAgICByb3c6IDRcbiAgICB9LFxuICAgIEw6IHtcbiAgICAgIG1heEFtb3VudDogMTAsXG4gICAgICBjb2w6IDMsXG4gICAgICByb3c6IDJcbiAgICB9LFxuICAgIE06IHtcbiAgICAgIG1heEFtb3VudDogMTAsXG4gICAgICBjb2w6IDIsXG4gICAgICByb3c6IDJcbiAgICB9LFxuICAgIFM6IHtcbiAgICAgIG1heEFtb3VudDogMTAsXG4gICAgICBjb2w6IDIsXG4gICAgICByb3c6IDFcbiAgICB9LFxuICAgIFhTOiB7XG4gICAgICBtYXhBbW91bnQ6IDUwLFxuICAgICAgY29sOiAxLFxuICAgICAgcm93OiAxXG4gICAgfVxuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQge2NvbnN0YW50c30gZnJvbSAnLi9jb25maWcnO1xuXG5jb25zdCBHcmlkID0gKHN0YXRlKSA9PiB7XG4gIGNvbnN0IHsgZWwsIHRvdGFsQ29sLCB0b3RhbFJvdyB9ID0gc3RhdGU7XG4gIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbCksXG4gICAgICBncmlkV2lkdGggPSBjb250YWluZXIuY2xpZW50V2lkdGgsXG4gICAgICBncmlkSGVpZ2h0ID0gY29udGFpbmVyLmNsaWVudEhlaWdodCxcbiAgICAgIGdyaWRXaWR0aFNwYWNlciA9IDIgKiAxMDAgLyBncmlkV2lkdGgsXG4gICAgICBncmlkSGVpZ2h0U3BhY2VyID0gMiAqIDEwMCAvIGdyaWRIZWlnaHQsXG4gICAgICBzcGFjZVdpZHRoID0gZ3JpZFdpZHRoIC8gdG90YWxDb2wsXG4gICAgICBzcGFjZUhlaWdodCA9IGdyaWRIZWlnaHQgLyB0b3RhbFJvdyxcbiAgICAgIGNvb3JkcyA9IFtdO1xuXG4gIC8qXG4gICogU2V0IGNvb3Jkc1xuICAqL1xuICBsZXQgc2V0Q29vcmRzID0gKCkgPT4ge1xuICAgIGZvciAobGV0IHggPSAwOyB4IDwgdG90YWxDb2w7IHgrKykge1xuICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0b3RhbFJvdzsgeSsrKSB7XG4gICAgICAgIGNvb3Jkcy5wdXNoKHtjb2w6IHgsIHJvdzogeX0pO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvKlxuICAqIFNob3cgY29vcmRzXG4gICogVGhpcyB3aWxsIHNob3cgYmxhY2sgZG90cyBmb3IgZWFjaCBjb29yZG9uYXRlXG4gICovXG4gIGxldCBzaG93Q29vcmRzID0gKCkgPT4ge1xuICAgIGNvb3Jkcy5mb3JFYWNoKGNvb3JkID0+IHtcbiAgICAgIGxldCBsZWZ0ID0gZ3JpZFdpZHRoIC8gdG90YWxDb2wgKiBjb29yZC5jb2wsXG4gICAgICAgICAgdG9wID0gZ3JpZEhlaWdodCAvIHRvdGFsUm93ICogY29vcmQucm93O1xuICAgICAgbGVmdCA9IGxlZnQgKiAxMDAgLyBncmlkV2lkdGg7XG4gICAgICB0b3AgPSB0b3AgKiAxMDAgLyBncmlkSGVpZ2h0O1xuICAgICAgbGV0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiRElWXCIpO1xuICAgICAgbm9kZS5zdHlsZS5jc3NUZXh0ID0gYHRvcDogJHt0b3AtMC41fSU7IGxlZnQ6ICR7bGVmdC0wLjJ9JWA7XG4gICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobm9kZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBidWlsZEdyaWQ6ICgpID0+IHtcbiAgICAgIHNldENvb3JkcygpO1xuICAgICAgc2hvd0Nvb3JkcygpO1xuICAgIH0sXG4gICAgZ2V0Q29vcmRzOiAoKSA9PiB7XG4gICAgICByZXR1cm4gY29vcmRzO1xuICAgIH0sXG4gICAgZ2V0U3BhY2U6ICgpID0+IHtcbiAgICAgIHJldHVybiB7d2lkdGg6IHNwYWNlV2lkdGgsIGhlaWdodDogc3BhY2VIZWlnaHR9O1xuICAgIH0sXG4gICAgZ2V0UGFyYW1zOiAoKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBncmlkV2lkdGgsXG4gICAgICAgIGdyaWRIZWlnaHQsXG4gICAgICAgIGdyaWRXaWR0aFNwYWNlcixcbiAgICAgICAgZ3JpZEhlaWdodFNwYWNlcixcbiAgICAgICAgc3BhY2VXaWR0aCxcbiAgICAgICAgc3BhY2VIZWlnaHRcbiAgICAgIH07XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdyaWQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7Y29uc3RhbnRzfSBmcm9tICcuL2NvbmZpZyc7XG5cbmNvbnN0IFRpbGVzID0gKHN0YXRlKSA9PiB7XG4gIGxldCB0aWxlcyA9IFtdLFxuICAgIHRpbGVRdWV1ZSA9IFtdO1xuXG4gIHJldHVybiB7XG4gICAgLypcbiAgICAqIFJlZHVjZSB0aWxlIHNpemVcbiAgICAqIFRoaXMgaXMgY2hlY2tpbmcgYWxsIHRoZSB0aWxlIHNpemUgYW5kIGxvb2sgZm9yIHRoZSBuZXh0IGFyZWEgc21hbGxlciB0aGVuIHRoZSBjdXJyZW50IG9uZS5cbiAgICAqIFRvIGZpbmQgdGhlIGFyZWEgd2UganVzdCBuZWVkIHRvIG11bHRpcGx5IHRoZSBjb2wgYW5kIHJvdyAoY29uc3RhbnRzLlRJTEVfU0laRVtzaXplXS5jb2wgKiBjb25zdGFudHMuVElMRV9TSVpFW3NpemVdLnJvdylcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBjdXJyZW50VGlsZVNpemUgLSBiaWcsIG1lZGl1bSwgc21hbGwsIGVjdC5cbiAgICAqL1xuICAgIHJlZHVjZVRpbGVTaXplOiAoY3VycmVudFRpbGVTaXplKSA9PiB7XG4gICAgICBsZXQgY3VycmVudFRpbGUgPSBjb25zdGFudHMuVElMRV9TSVpFW2N1cnJlbnRUaWxlU2l6ZV0sXG4gICAgICAgICAgY3VycmVudFRpbGVBcmVhID0gY3VycmVudFRpbGUuY29sICogY3VycmVudFRpbGUucm93O1xuXG4gICAgICBmb3IgKGxldCBzaXplIGluIGNvbnN0YW50cy5USUxFX1NJWkUpIHtcbiAgICAgICAgbGV0IG5leHRUaWxlQXJlYSA9IGNvbnN0YW50cy5USUxFX1NJWkVbc2l6ZV0uY29sICogY29uc3RhbnRzLlRJTEVfU0laRVtzaXplXS5yb3c7XG4gICAgICAgIGlmIChuZXh0VGlsZUFyZWEgPCBjdXJyZW50VGlsZUFyZWEpIHtcbiAgICAgICAgICByZXR1cm4gc2l6ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbnVsbDsgLy8gUmV0dXJuIG51bGwgaWYgbm8gc21hbGxlciB0aWxlIGFyZSBmb3VuZC5cbiAgICB9LFxuXG4gICAgLypcbiAgICAqIEdldCBuZXh0IHRpbGUgc2l6ZVxuICAgICogVGhpcyB3aWxsIGdldCB0aGUgbmV4dCB0aWxlIHNpemUgdG8gdXNlLlxuICAgICogQHBhcmFtIHtzdHJpbmd9IHRpbGVJbmRleFxuICAgICovXG4gICAgZ2V0TmV4dFRpbGVTaXplOiAodGlsZUluZGV4KSA9PiB7XG4gICAgICBsZXQgY3VycmVudFRpbGVDb3VudCA9IDA7XG5cbiAgICAgIGZvciAobGV0IHNpemUgaW4gY29uc3RhbnRzLlRJTEVfU0laRSkge1xuICAgICAgICBjdXJyZW50VGlsZUNvdW50ID0gY3VycmVudFRpbGVDb3VudCArIGNvbnN0YW50cy5USUxFX1NJWkVbc2l6ZV0ubWF4QW1vdW50O1xuICAgICAgICBpZiAodGlsZUluZGV4IDwgY3VycmVudFRpbGVDb3VudCkge1xuICAgICAgICAgIHJldHVybiBzaXplO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBudWxsOyAvLyBSZXR1cm4gbnVsbCBpZiB0aGVyZSBpcyBubyBuZXh0IHRpbGUgc2l6ZSBhdmFpbGFibGVcbiAgICB9LFxuXG4gICAgLypcbiAgICAqIEdldCBtYXggdGlsZSBjb3VudFxuICAgICovXG4gICAgZ2V0TWF4VGlsZUNvdW50OiAoKSA9PiB7XG4gICAgICBsZXQgbWF4VGlsZUNvdW50ID0gMDtcbiAgICAgIGZvciAobGV0IHNpemUgaW4gY29uc3RhbnRzLlRJTEVfU0laRSkge1xuICAgICAgICBtYXhUaWxlQ291bnQgPSBtYXhUaWxlQ291bnQgKyBjb25zdGFudHMuVElMRV9TSVpFW3NpemVdLm1heEFtb3VudDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBtYXhUaWxlQ291bnQ7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuKiBUaWxlXG4qIEBwYXJhbSB7b2JqZWN0fSBncmlkXG4qIEBwYXJhbSB7b2JqZWN0fSBzdGF0ZVxuKi9cbmNvbnN0IFRpbGUgPSAoc3RhdGUsIHRpbGUsIGdyaWQpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBnZXRUaWxlSW5mb3M6ICgpID0+IHtcbiAgICAgIGxldCB7c2l6ZSwgdGFyZ2V0LCBjb2wsIHJvdywga2V5fSA9IHRpbGUsXG4gICAgICAgICAge3NwYWNlV2lkdGgsIHNwYWNlSGVpZ2h0LCBncmlkV2lkdGgsIGdyaWRIZWlnaHQsIGdyaWRXaWR0aFNwYWNlciwgZ3JpZEhlaWdodFNwYWNlcn0gPSBncmlkO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc2l6ZSxcbiAgICAgICAgeDogdGFyZ2V0LmNvbCAqIHNwYWNlV2lkdGggKiAxMDAgLyBncmlkV2lkdGgsXG4gICAgICAgIHk6IHRhcmdldC5yb3cgKiBzcGFjZUhlaWdodCAqIDEwMCAvIGdyaWRIZWlnaHQsXG4gICAgICAgIHdpZHRoOiAoY29sICogMTAwIC8gc3RhdGUudG90YWxDb2wpIC0gZ3JpZFdpZHRoU3BhY2VyLFxuICAgICAgICBoZWlnaHQ6IChyb3cgKiAxMDAgLyBzdGF0ZS50b3RhbFJvdykgLSBncmlkSGVpZ2h0U3BhY2VyLFxuICAgICAgICBpZDoga2V5XG4gICAgICB9O1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQge1RpbGVzLCBUaWxlfTtcbiJdfQ==
