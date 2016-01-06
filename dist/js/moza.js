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

global.Moza = Moza;

// no tile added to the queue because we did not find the space for it

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9zdXBlcnMvU2l0ZXMvbW96YS9zcmMvanMvbW96YS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsWUFBWSxDQUFDOztBQUViLElBQUksZUFBZSxHQUFHLFNBQUEsZUFBQSxDQUFVLEdBQUcsRUFBRTtBQUFFLFNBQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztDQUFFLENBQUM7O0FBRTlGLElBRlMsU0FBUyxHQUFBLE9BQUEsQ0FBUSxVQUFVLENBQUEsQ0FBM0IsU0FBUyxDQUFBOztBQUlsQixJQUhPLE9BQU8sR0FBQSxlQUFBLENBQUEsT0FBQSxDQUFNLDZDQUE2QyxDQUFBLENBQUEsQ0FBQTs7QUFLakUsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUpRLFNBQVMsQ0FBQSxDQUFBOztBQU1yQyxJQU5TLElBQUksR0FBQSxNQUFBLENBQUosSUFBSSxDQUFBO0FBT2IsSUFQZSxLQUFLLEdBQUEsTUFBQSxDQUFMLEtBQUssQ0FBQTs7QUFTcEIsSUFSTyxJQUFJLEdBQUEsZUFBQSxDQUFBLE9BQUEsQ0FBTSxRQUFRLENBQUEsQ0FBQSxDQUFBOztBQUV6QixJQUFNLElBQUksR0FBRyxTQUFBLElBQUEsQ0FBQyxLQUFLLEVBQUs7QUFTdEIsTUFSUSxRQUFRLEdBQXdCLEtBQUssQ0FBckMsUUFBUSxDQUFBO0FBU2hCLE1BVGtCLFFBQVEsR0FBYyxLQUFLLENBQTNCLFFBQVEsQ0FBQTtBQVUxQixNQVY0QixFQUFFLEdBQVUsS0FBSyxDQUFqQixFQUFFLENBQUE7QUFBeEIsTUFBMEIsR0FBRyxHQUFLLEtBQUssQ0FBYixHQUFHLENBQVU7QUFDdkMsTUFBQSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBQ3BCLE1BQUEsT0FBTyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQVk1QixNQUFJLGlCQUFpQixHQVh3RSxNQUFNLENBQUMsU0FBUyxF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QUFFLElBQUksQ0FBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDO0FBQ2hILGdDQUFvQixDQUFDLE9BQU8sQ0FBQyxVQUFBLE1BQU0sRUFBSTtBQUNyQyxvQ0FBc0IsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNoQyxDQUFDLENBQUM7QUFDSCxxQkFBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztXQUN2QyxNQUFJLEVBRUo7U0FrQkEsQ0FBQSxFQUFHLENBQUM7T0FqQk47S0FDRixDQUFDLENBQUM7R0FDSixDQUFBOztBQUVELFNBQU87QUFDTCxTQUFLLEVBQUUsU0FBQSxLQUFBLEdBQU07QUFDWCxZQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7QUFDbkIsWUFBTSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztBQUM5QyxnQkFBVSxFQUFFLENBQUM7QUFDYixjQUFRLEVBQUUsQ0FBQztLQUNaO0dBQ0YsQ0FBQTtDQUNGLENBQUM7O0FBSUYsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgY29uc3RhbnRzIH0gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHJlcXVlc3QgZnJvbSAnLi4vLi4vbm9kZV9tb2R1bGVzL3N1cGVyYWdlbnQvbGliL2NsaWVudC5qcyc7XG5pbXBvcnQgeyBUaWxlLCBUaWxlcyB9IGZyb20gJy4vdGlsZXMnO1xuaW1wb3J0IEdyaWQgZnJvbSAnLi9ncmlkJztcblxuY29uc3QgTW96YSA9IChzdGF0ZSkgPT4ge1xuICBjb25zdCB7IHRvdGFsQ29sLCB0b3RhbFJvdywgZWwsIHVybCB9ID0gc3RhdGUsXG4gICAgICAgIG15R3JpZCA9IEdyaWQoc3RhdGUpLFxuICAgICAgICBteVRpbGVzID0gVGlsZXMoc3RhdGUpLFxuICAgICAgICB7IGdyaWRXaWR0aCwgZ3JpZEhlaWdodCwgZ3JpZFdpZHRoU3BhY2VyLCBncmlkSGVpZ2h0U3BhY2VyLCBzcGFjZVdpZHRoLCBzcGFjZUhlaWdodH0gPSBteUdyaWQuZ2V0UGFyYW1zKCk7XG5cbiAgbGV0IGNvb3JkcyA9IHtcbiAgICAgICBhbGw6IFtdLFxuICAgICAgIGZyZWU6IFtdLFxuICAgICAgIHRha2VuOiBbXVxuICAgICB9LFxuICAgICBtYXhUaWxlcyA9IDQwLFxuICAgICB0aWxlcyA9IFtdLFxuICAgICB0aWxlUXVldWUgPSBbXSxcbiAgICAgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWwpO1xuXG4gIC8qKlxuICAqIENoZWNrIGF2YWlsYWJpbGl0eSBvZiBjb29yZHMgZnJvbSBjb29yZFxuICAqIEBwYXJhbSB7b2JqZWN0fSBjb29yZHNcbiAgKi9cbiAgbGV0IGNoZWNrQXZhaWxhYmlsaXR5T2ZDb29yZHNGcm9tQ29vcmQgPSAobXlDb29yZHMpID0+IHtcbiAgICBsZXQgeSA9IDA7XG4gICAgbXlDb29yZHMuZm9yRWFjaChjb29yZCA9PiB7XG4gICAgICBsZXQgaSA9IGNvb3Jkcy5mcmVlLmxlbmd0aDtcbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgaWYgKGNvb3Jkcy5mcmVlW2ldLmNvbCA9PT0gY29vcmQuY29sICYmIGNvb3Jkcy5mcmVlW2ldLnJvdyA9PT0gY29vcmQucm93KSB7XG4gICAgICAgICAgeSsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG15Q29vcmRzLmxlbmd0aCA9PT0geTtcbiAgfTtcblxuICAvKlxuICAqIEdldCBvY2N1cGF0aW9uIGZyb20gY29vcmRcbiAgKiBUaGlzIHdpbGwgZ2V0IGFuIGFycmF5IHdpdGggYWxsIHRoZSBwb2ludCBvY2N1cGVkIGJ5IHRoZSB0aWxlXG4gICogQHBhcmFtIHtudW1iZXJ9IHRvdGFsQ29sXG4gICogQHBhcmFtIHtudW1iZXJ9IHRvdGFsUm93XG4gICogQHBhcmFtIHtvYmplY3R9IGNvb3JkXG4gICovXG4gIGxldCBnZXRPY2N1cGF0aW9uRnJvbUNvb3JkID0gKHBhcmFtcykgPT4ge1xuICAgIGxldCB7dG90YWxDb2wsIHRvdGFsUm93LCBjb29yZH0gPSBwYXJhbXMsXG4gICAgICAgIGNvb3JkcyA9IFtdO1xuICAgIGlmIChjb29yZCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b3RhbENvbDsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdG90YWxSb3c7IGorKykge1xuICAgICAgICAgIGNvb3Jkcy5wdXNoKHtjb2w6IGkgKyBjb29yZC5jb2wsIHJvdzogaiArIGNvb3JkLnJvd30pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gY29vcmRzO1xuICAgIH1cbiAgICAvLyB0b2RvOiBzaG91bGQgcmV0dXJuIHNvbWV0aGluZyBhbnl3YXlcbiAgfTtcblxuICAvKlxuICAqIEdldCBuZXcgdGlsZUFyZWFcbiAgKiBJdGVyYXRlIGFjcm9zcyBlYWNoIGZyZWUgY29vcmRpbmF0ZXMgdG8gdGVzdCBpZiB0aGUgdGlsZSBjYW4gYmUgcGxhY2VkXG4gICogQHBhcmFtIHtzdHJpbmd9IHRpbGVTaXplXG4gICogQHJldHVybnMge2FycmF5fHVuZGVmaW5lZH1cbiAgKi9cbiAgbGV0IGdldE5ld1RpbGVBcmVhID0gKHRpbGVTaXplKSA9PiB7XG4gICAgbGV0IHRhcmdldHMgPSBbXSxcbiAgICAgICB0b3RhbENvbCA9IGNvbnN0YW50cy5USUxFX1NJWkVbdGlsZVNpemVdLmNvbCxcbiAgICAgICB0b3RhbFJvdyA9IGNvbnN0YW50cy5USUxFX1NJWkVbdGlsZVNpemVdLnJvdztcbiAgICBjb29yZHMuZnJlZS5mb3JFYWNoKGZyZWVDb29yZCA9PiB7XG4gICAgICAvLyBtYWtlIHN1cmUgdGhlIHRpbGUgZW5kaW5nIGVuZCBkb24ndCBnbyBmdXRoZXIgdGhlbiB0aGUgZ3JpZCBlZGdlXG4gICAgICBsZXQgdGlsZVJpZ2h0RWRnZSA9IChmcmVlQ29vcmQuY29sICsgdG90YWxDb2wpICogc3BhY2VXaWR0aCxcbiAgICAgICAgICB0aWxlQm90dG9tRWRnZSA9IChmcmVlQ29vcmQucm93ICsgdG90YWxSb3cpICogc3BhY2VIZWlnaHQ7XG5cbiAgICAgIGlmICh0aWxlUmlnaHRFZGdlIDw9IGdyaWRXaWR0aCAmJiB0aWxlQm90dG9tRWRnZSA8PSBncmlkSGVpZ2h0KSB7XG4gICAgICAgIC8vIFdlIGpzdXQgZm9uZCBhIGdvb2Qgc3BvdCBmb3IgdGhpcyB0aWxlLlxuICAgICAgICAvLyBJdCdzIHRpbWUgdG8gY2hlY2sgaWYgdGhlIGFyZWEgaXMgY2xlYXIuXG4gICAgICAgIGxldCBjb29yZHMgPSBnZXRPY2N1cGF0aW9uRnJvbUNvb3JkKHt0b3RhbENvbCwgdG90YWxSb3csIGNvb3JkOiBmcmVlQ29vcmR9KTtcbiAgICAgICAgaWYgKGNoZWNrQXZhaWxhYmlsaXR5T2ZDb29yZHNGcm9tQ29vcmQoY29vcmRzKSkge1xuICAgICAgICAgIHRhcmdldHMucHVzaChmcmVlQ29vcmQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgLy8gSWYgdGhlIHRhcmdldHMgaXMgZW1wdHkgdGhhdCBtZWFuIDIgdGhpbmdzOlxuICAgIC8vIC0gdGhlIHRpbGUgd2FzIHRvIGJpZ1xuICAgIC8vIC0gdGhlIHRpbGUgaGFkIHRoZSByaWdodCBzaXplIGJ1dCBubyBhcmVhIHdhcyBhdmFpbGFibGVcbiAgICByZXR1cm4gdGFyZ2V0cy5sZW5ndGggPiAwID8gc2h1ZmZsZSh0YXJnZXRzKSA6IHVuZGVmaW5lZDtcbiAgfTtcblxuICAvKlxuICAqIFB1dCBmcmVlIGNvb3IgdG8gdGFrZW4gY29vclxuICAqIEBwYXJhbSB7b2JqZWN0fSBjb29yZFxuICAqL1xuICBsZXQgcHV0RnJlZUNvb3JUb1Rha2VuQ29vciA9IChjb29yZCkgPT4ge1xuICAgIC8vdG9kbzogUmVtb3ZlIHRoZSBpZiBzdGF0ZW1lbnQgYW5kIGFkZCBhIGZpbHRlciBiZWZvcmUgZm9yRWFjaFxuICAgIGNvb3Jkcy5mcmVlLmZvckVhY2goKG15Q29vcmQsIGluZGV4KSA9PiB7XG4gICAgICAvLyB0b2RvOiBjbGVhbiB0aGlzIHVwXG4gICAgICBpZiAobXlDb29yZC5jb2wgPT09IGNvb3JkLmNvbCAmJiBteUNvb3JkLnJvdyA9PT0gY29vcmQucm93KSB7XG4gICAgICAgIGNvb3Jkcy5mcmVlLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29vcmRzLnRha2VuLnB1c2goY29vcmQpO1xuICB9O1xuXG4gIC8qXG4gICogU2h1ZmZsZVxuICAqIEBwYXJhbSB7b2JqZWN0fSBvXG4gICovXG4gIGxldCBzaHVmZmxlID0gKG8pID0+IHtcbiAgICBmb3IobGV0IGosIHgsIGkgPSBvLmxlbmd0aDsgaTsgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGkpLCB4ID0gb1stLWldLCBvW2ldID0gb1tqXSwgb1tqXSA9IHgpO1xuICAgIHJldHVybiBvO1xuICB9XG5cbiAgbGV0IHNob3dUaWxlID0gKCkgPT4ge1xuICAgIGxldCB7dXJsfSA9IHN0YXRlO1xuXG4gICAgLy90b2RvOiBvcHRvbWl6ZSAgY29kZSBkdXBsaWNhdGlvbi5cbiAgICBpZiAodXJsKSB7XG4gICAgICByZXF1ZXN0XG4gICAgICAgIC5nZXQodXJsKVxuICAgICAgICAuZW5kKGZ1bmN0aW9uKGVyciwgcmVzKXtcbiAgICAgICAgICByZXMgPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICB0aWxlUXVldWUuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGxldCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIkRJVlwiKTtcbiAgICAgICAgICAgIG5vZGUuc3R5bGUuY3NzVGV4dCA9IGB0b3A6ICR7aXRlbS55fSU7IGxlZnQ6ICR7aXRlbS54fSU7IHdpZHRoOiAke2l0ZW0ud2lkdGh9JTsgaGVpZ2h0OiAke2l0ZW0uaGVpZ2h0fSU7IGJhY2tncm91bmQtaW1hZ2U6IHVybCgke3Jlc1tpbmRleF0uaW1nfSlgO1xuICAgICAgICAgICAgbm9kZS5jbGFzc05hbWUgPSAndGlsZSc7XG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobm9kZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aWxlUXVldWUuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgbGV0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiRElWXCIpO1xuICAgICAgICBub2RlLnN0eWxlLmNzc1RleHQgPSBgdG9wOiAke2l0ZW0ueX0lOyBsZWZ0OiAke2l0ZW0ueH0lOyB3aWR0aDogJHtpdGVtLndpZHRofSU7IGhlaWdodDogJHtpdGVtLmhlaWdodH0lYDtcbiAgICAgICAgbm9kZS5jbGFzc05hbWUgPSAndGlsZSc7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChub2RlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICAvKlxuICAqIEJ1aWxkIHRpbGVzXG4gICovXG4gIGxldCBidWlsZFRpbGVzID0gKCkgPT4ge1xuICAgIGxldCBzaXplID0gbnVsbCxcbiAgICAgICAgdGlsZUNvdW50ID0gMCxcbiAgICAgICAgbWF4VGlsZSA9IG15VGlsZXMuZ2V0TWF4VGlsZUNvdW50KCk7XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gbWF4VGlsZXM7IGkgPCBsZW47IGkrKykge1xuICAgICAgdGlsZXMucHVzaCh7XG4gICAgICAgIGlkOiBpXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGlsZXMuZm9yRWFjaCgodGlsZSwgaW5kZXgpID0+IHtcbiAgICAgIGlmKGNvb3Jkcy5mcmVlLmxlbmd0aCA+IDAgJiYgdGlsZUNvdW50IDwgbWF4VGlsZSkge1xuXG4gICAgICAgIHRpbGUuc2l6ZSA9IG15VGlsZXMuZ2V0TmV4dFRpbGVTaXplKHRpbGVDb3VudCk7XG4gICAgICAgIGxldCBhdmFpbGFibGVBcmVhQ29vcmRzID0gbnVsbDtcblxuICAgICAgICAvLyBJZiBubyBzcGFjZSB3ZXJlIGZvdW5kIHRoYXQgbWVhbiB0aGUgdGlsZSBpcyB0byBiaWcuXG4gICAgICAgIC8vIE5lZWQgdG8gc2l6ZSBpdCBkb3duIGEgYml0XG4gICAgICAgIGxldCBmaW5kTmV4dEF2YWlsYWJsZUFyZWFDb29yZHMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICB0aWxlLnNpemUgPSBteVRpbGVzLnJlZHVjZVRpbGVTaXplKHRpbGUuc2l6ZSk7XG5cbiAgICAgICAgICBpZiAoIXRpbGUuc2l6ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgICAgbGV0IGF2YWlsYWJsZUFyZWFDb29yZHMgPSBnZXROZXdUaWxlQXJlYSh0aWxlLnNpemUpO1xuICAgICAgICAgIGlmICghYXZhaWxhYmxlQXJlYUNvb3Jkcykge1xuICAgICAgICAgICAgcmV0dXJuIGZpbmROZXh0QXZhaWxhYmxlQXJlYUNvb3JkcygpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gYXZhaWxhYmxlQXJlYUNvb3JkcztcbiAgICAgICAgfS5iaW5kKHRoaXMpO1xuXG4gICAgICAgIC8vIENoZWNrIGlmIHdlIGZvdW5kIGEgcGxhY2UgZm9yIHRoZSB0aWxlXG4gICAgICAgIGF2YWlsYWJsZUFyZWFDb29yZHMgPSBmaW5kTmV4dEF2YWlsYWJsZUFyZWFDb29yZHMoKTtcblxuICAgICAgICAvLyBKdXN0IG1ha2luZyBzdXJlIHdlIGhhdmUgc3BhY2UgZm9yIHRoaXMgdGlsZS5cbiAgICAgICAgLy8gV2Ugd29udCBuZWVkIHRoaXMgY29uZGl0aW9uIGFmdGVyIEkgbWFrZSBhIHJlY3Vyc2lvbiBmb3IgdGhlIGRvd25zaXppbmcgdGlsZSBmdW5jdGlvblxuICAgICAgICBpZihhdmFpbGFibGVBcmVhQ29vcmRzKXtcbiAgICAgICAgICB0aWxlQ291bnQrKztcbiAgICAgICAgICB0aWxlLmtleSA9IGluZGV4O1xuICAgICAgICAgIHRpbGUudGFyZ2V0ID0gYXZhaWxhYmxlQXJlYUNvb3Jkc1swXTsgLy9UYWtlIHRoZSBmaXJzdCBvbmUgaW4gdGhlIGFycmF5LiBUaGV5IGFyZSBhbHJlYWR5IHNob3ZlbGVkXG4gICAgICAgICAgdGlsZS5jb2wgPSBjb25zdGFudHMuVElMRV9TSVpFW3RpbGUuc2l6ZV0uY29sO1xuICAgICAgICAgIHRpbGUucm93ID0gY29uc3RhbnRzLlRJTEVfU0laRVt0aWxlLnNpemVdLnJvdztcbiAgICAgICAgICBsZXQgbXlUaWxlID0gbmV3IFRpbGUoc3RhdGUsIHRpbGUsIG15R3JpZC5nZXRQYXJhbXMoKSk7XG4gICAgICAgICAgLy8gVXBkYXRlIGZyZWUgJiB0YWtlbiBjb29yZHNcbiAgICAgICAgICBsZXQgdGlsZU9jY3VwYXRpb25Db29yZHMgPSBnZXRPY2N1cGF0aW9uRnJvbUNvb3JkKHt0b3RhbENvbDogdGlsZS5jb2wsIHRvdGFsUm93OiB0aWxlLnJvdywgY29vcmQ6IHRpbGUudGFyZ2V0fSk7XG4gICAgICAgICAgdGlsZU9jY3VwYXRpb25Db29yZHMuZm9yRWFjaChjb29yZHMgPT4ge1xuICAgICAgICAgICAgcHV0RnJlZUNvb3JUb1Rha2VuQ29vcihjb29yZHMpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRpbGVRdWV1ZS5wdXNoKG15VGlsZS5nZXRUaWxlSW5mb3MoKSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIC8vIG5vIHRpbGUgYWRkZWQgdG8gdGhlIHF1ZXVlIGJlY2F1c2Ugd2UgZGlkIG5vdCBmaW5kIHRoZSBzcGFjZSBmb3IgaXRcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBidWlsZDogKCkgPT4ge1xuICAgICAgbXlHcmlkLmJ1aWxkR3JpZCgpO1xuICAgICAgY29vcmRzLmFsbCA9IGNvb3Jkcy5mcmVlID0gbXlHcmlkLmdldENvb3JkcygpO1xuICAgICAgYnVpbGRUaWxlcygpO1xuICAgICAgc2hvd1RpbGUoKTtcbiAgICB9XG4gIH1cbn07XG5cblxuXG5nbG9iYWwuTW96YSA9IE1vemE7XG4iXX0=
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbW96YS5qcyIsIm5vZGVfbW9kdWxlcy9zdXBlcmFnZW50L2xpYi9jbGllbnQuanMiLCJub2RlX21vZHVsZXMvc3VwZXJhZ2VudC9ub2RlX21vZHVsZXMvY29tcG9uZW50LWVtaXR0ZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvc3VwZXJhZ2VudC9ub2RlX21vZHVsZXMvcmVkdWNlLWNvbXBvbmVudC9pbmRleC5qcyIsIi9Vc2Vycy9zdXBlcnMvU2l0ZXMvbW96YS9zcmMvanMvY29uZmlnLmpzIiwiL1VzZXJzL3N1cGVycy9TaXRlcy9tb3phL3NyYy9qcy9ncmlkLmpzIiwiL1VzZXJzL3N1cGVycy9TaXRlcy9tb3phL3NyYy9qcy90aWxlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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LENBQUE7QUFhcEUsVUFic0UsZ0JBQWdCLEdBQUksSUFBSSxDQUF4QixnQkFBZ0IsQ0FBQTs7QUFDdEYsYUFBTztBQUNMLFlBQUksRUFBSixJQUFJO0FBQ0osU0FBQyxFQUFFLE1BQU0sQ0FBQyxHQUFHLEdBQUcsVUFBVSxHQUFHLEdBQUcsR0FBRyxTQUFTO0FBQzVDLFNBQUMsRUFBRSxNQUFNLENBQUMsR0FBRyxHQUFHLFdBQVcsR0FBRyxHQUFHLEdBQUcsVUFBVTtBQUM5QyxhQUFLLEVBQUUsR0FBSSxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUMsUUFBUSxHQUFJLGVBQWU7QUFDckQsY0FBTSxFQUFFLEdBQUksR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDLFFBQVEsR0FBSSxnQkFBZ0I7QUFDdkQsVUFBRSxFQUFFLEdBQUc7T0FDUixDQUFDO0tBQ0g7R0FDRixDQUFBO0NBQ0YsQ0FBQTs7QUFnQkQsT0FBTyxDQWRDLEtBQUssR0FBTCxLQUFLLENBQUE7QUFlYixPQUFPLENBZlEsSUFBSSxHQUFKLElBQUksQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG5cInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZSA9IGZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZShvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9ialtcImRlZmF1bHRcIl0gOiBvYmo7XG59O1xuXG52YXIgY29uc3RhbnRzID0gcmVxdWlyZShcIi4vY29uZmlnXCIpLmNvbnN0YW50cztcblxudmFyIHJlcXVlc3QgPSBfaW50ZXJvcFJlcXVpcmUocmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9zdXBlcmFnZW50L2xpYi9jbGllbnQuanNcIikpO1xuXG52YXIgX3RpbGVzID0gcmVxdWlyZShcIi4vdGlsZXNcIik7XG5cbnZhciBUaWxlID0gX3RpbGVzLlRpbGU7XG52YXIgVGlsZXMgPSBfdGlsZXMuVGlsZXM7XG5cbnZhciBHcmlkID0gX2ludGVyb3BSZXF1aXJlKHJlcXVpcmUoXCIuL2dyaWRcIikpO1xuXG52YXIgTW96YSA9IGZ1bmN0aW9uIE1vemEoc3RhdGUpIHtcbiAgdmFyIHRvdGFsQ29sID0gc3RhdGUudG90YWxDb2w7XG4gIHZhciB0b3RhbFJvdyA9IHN0YXRlLnRvdGFsUm93O1xuICB2YXIgZWwgPSBzdGF0ZS5lbDtcbiAgdmFyIHVybCA9IHN0YXRlLnVybDtcbiAgdmFyIG15R3JpZCA9IEdyaWQoc3RhdGUpO1xuICB2YXIgbXlUaWxlcyA9IFRpbGVzKHN0YXRlKTtcbiAgdmFyIF9teUdyaWQkZ2V0UGFyYW1zID0gbXlHcmlkLmdldFBhcmFtcygpO1xuXG4gIHZhciBncmlkV2lkdGggPSBfbXlHcmlkJGdldFBhcmFtcy5ncmlkV2lkdGg7XG4gIHZhciBncmlkSGVpZ2h0ID0gX215R3JpZCRnZXRQYXJhbXMuZ3JpZEhlaWdodDtcbiAgdmFyIGdyaWRXaWR0aFNwYWNlciA9IF9teUdyaWQkZ2V0UGFyYW1zLmdyaWRXaWR0aFNwYWNlcjtcbiAgdmFyIGdyaWRIZWlnaHRTcGFjZXIgPSBfbXlHcmlkJGdldFBhcmFtcy5ncmlkSGVpZ2h0U3BhY2VyO1xuICB2YXIgc3BhY2VXaWR0aCA9IF9teUdyaWQkZ2V0UGFyYW1zLnNwYWNlV2lkdGg7XG4gIHZhciBzcGFjZUhlaWdodCA9IF9teUdyaWQkZ2V0UGFyYW1zLnNwYWNlSGVpZ2h0O1xuXG4gIHZhciBjb29yZHMgPSB7XG4gICAgYWxsOiBbXSxcbiAgICBmcmVlOiBbXSxcbiAgICB0YWtlbjogW11cbiAgfSxcbiAgICAgIG1heFRpbGVzID0gNDAsXG4gICAgICB0aWxlcyA9IFtdLFxuICAgICAgdGlsZVF1ZXVlID0gW10sXG4gICAgICBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbCk7XG5cbiAgLyoqXG4gICogQ2hlY2sgYXZhaWxhYmlsaXR5IG9mIGNvb3JkcyBmcm9tIGNvb3JkXG4gICogQHBhcmFtIHtvYmplY3R9IGNvb3Jkc1xuICAqL1xuICB2YXIgY2hlY2tBdmFpbGFiaWxpdHlPZkNvb3Jkc0Zyb21Db29yZCA9IGZ1bmN0aW9uIGNoZWNrQXZhaWxhYmlsaXR5T2ZDb29yZHNGcm9tQ29vcmQobXlDb29yZHMpIHtcbiAgICB2YXIgeSA9IDA7XG4gICAgbXlDb29yZHMuZm9yRWFjaChmdW5jdGlvbiAoY29vcmQpIHtcbiAgICAgIHZhciBpID0gY29vcmRzLmZyZWUubGVuZ3RoO1xuICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICBpZiAoY29vcmRzLmZyZWVbaV0uY29sID09PSBjb29yZC5jb2wgJiYgY29vcmRzLmZyZWVbaV0ucm93ID09PSBjb29yZC5yb3cpIHtcbiAgICAgICAgICB5Kys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbXlDb29yZHMubGVuZ3RoID09PSB5O1xuICB9O1xuXG4gIC8qXG4gICogR2V0IG9jY3VwYXRpb24gZnJvbSBjb29yZFxuICAqIFRoaXMgd2lsbCBnZXQgYW4gYXJyYXkgd2l0aCBhbGwgdGhlIHBvaW50IG9jY3VwZWQgYnkgdGhlIHRpbGVcbiAgKiBAcGFyYW0ge251bWJlcn0gdG90YWxDb2xcbiAgKiBAcGFyYW0ge251bWJlcn0gdG90YWxSb3dcbiAgKiBAcGFyYW0ge29iamVjdH0gY29vcmRcbiAgKi9cbiAgdmFyIGdldE9jY3VwYXRpb25Gcm9tQ29vcmQgPSBmdW5jdGlvbiBnZXRPY2N1cGF0aW9uRnJvbUNvb3JkKHBhcmFtcykge1xuICAgIHZhciB0b3RhbENvbCA9IHBhcmFtcy50b3RhbENvbDtcbiAgICB2YXIgdG90YWxSb3cgPSBwYXJhbXMudG90YWxSb3c7XG4gICAgdmFyIGNvb3JkID0gcGFyYW1zLmNvb3JkO1xuICAgIHZhciBjb29yZHMgPSBbXTtcbiAgICBpZiAoY29vcmQpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG90YWxDb2w7IGkrKykge1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRvdGFsUm93OyBqKyspIHtcbiAgICAgICAgICBjb29yZHMucHVzaCh7IGNvbDogaSArIGNvb3JkLmNvbCwgcm93OiBqICsgY29vcmQucm93IH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gY29vcmRzO1xuICAgIH1cbiAgICAvLyB0b2RvOiBzaG91bGQgcmV0dXJuIHNvbWV0aGluZyBhbnl3YXlcbiAgfTtcblxuICAvKlxuICAqIEdldCBuZXcgdGlsZUFyZWFcbiAgKiBJdGVyYXRlIGFjcm9zcyBlYWNoIGZyZWUgY29vcmRpbmF0ZXMgdG8gdGVzdCBpZiB0aGUgdGlsZSBjYW4gYmUgcGxhY2VkXG4gICogQHBhcmFtIHtzdHJpbmd9IHRpbGVTaXplXG4gICogQHJldHVybnMge2FycmF5fHVuZGVmaW5lZH1cbiAgKi9cbiAgdmFyIGdldE5ld1RpbGVBcmVhID0gZnVuY3Rpb24gZ2V0TmV3VGlsZUFyZWEodGlsZVNpemUpIHtcbiAgICB2YXIgdGFyZ2V0cyA9IFtdLFxuICAgICAgICB0b3RhbENvbCA9IGNvbnN0YW50cy5USUxFX1NJWkVbdGlsZVNpemVdLmNvbCxcbiAgICAgICAgdG90YWxSb3cgPSBjb25zdGFudHMuVElMRV9TSVpFW3RpbGVTaXplXS5yb3c7XG4gICAgY29vcmRzLmZyZWUuZm9yRWFjaChmdW5jdGlvbiAoZnJlZUNvb3JkKSB7XG4gICAgICAvLyBtYWtlIHN1cmUgdGhlIHRpbGUgZW5kaW5nIGVuZCBkb24ndCBnbyBmdXRoZXIgdGhlbiB0aGUgZ3JpZCBlZGdlXG4gICAgICB2YXIgdGlsZVJpZ2h0RWRnZSA9IChmcmVlQ29vcmQuY29sICsgdG90YWxDb2wpICogc3BhY2VXaWR0aCxcbiAgICAgICAgICB0aWxlQm90dG9tRWRnZSA9IChmcmVlQ29vcmQucm93ICsgdG90YWxSb3cpICogc3BhY2VIZWlnaHQ7XG5cbiAgICAgIGlmICh0aWxlUmlnaHRFZGdlIDw9IGdyaWRXaWR0aCAmJiB0aWxlQm90dG9tRWRnZSA8PSBncmlkSGVpZ2h0KSB7XG4gICAgICAgIC8vIFdlIGpzdXQgZm9uZCBhIGdvb2Qgc3BvdCBmb3IgdGhpcyB0aWxlLlxuICAgICAgICAvLyBJdCdzIHRpbWUgdG8gY2hlY2sgaWYgdGhlIGFyZWEgaXMgY2xlYXIuXG4gICAgICAgIHZhciBfY29vcmRzID0gZ2V0T2NjdXBhdGlvbkZyb21Db29yZCh7IHRvdGFsQ29sOiB0b3RhbENvbCwgdG90YWxSb3c6IHRvdGFsUm93LCBjb29yZDogZnJlZUNvb3JkIH0pO1xuICAgICAgICBpZiAoY2hlY2tBdmFpbGFiaWxpdHlPZkNvb3Jkc0Zyb21Db29yZChfY29vcmRzKSkge1xuICAgICAgICAgIHRhcmdldHMucHVzaChmcmVlQ29vcmQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgLy8gSWYgdGhlIHRhcmdldHMgaXMgZW1wdHkgdGhhdCBtZWFuIDIgdGhpbmdzOlxuICAgIC8vIC0gdGhlIHRpbGUgd2FzIHRvIGJpZ1xuICAgIC8vIC0gdGhlIHRpbGUgaGFkIHRoZSByaWdodCBzaXplIGJ1dCBubyBhcmVhIHdhcyBhdmFpbGFibGVcbiAgICByZXR1cm4gdGFyZ2V0cy5sZW5ndGggPiAwID8gc2h1ZmZsZSh0YXJnZXRzKSA6IHVuZGVmaW5lZDtcbiAgfTtcblxuICAvKlxuICAqIFB1dCBmcmVlIGNvb3IgdG8gdGFrZW4gY29vclxuICAqIEBwYXJhbSB7b2JqZWN0fSBjb29yZFxuICAqL1xuICB2YXIgcHV0RnJlZUNvb3JUb1Rha2VuQ29vciA9IGZ1bmN0aW9uIHB1dEZyZWVDb29yVG9UYWtlbkNvb3IoY29vcmQpIHtcbiAgICAvL3RvZG86IFJlbW92ZSB0aGUgaWYgc3RhdGVtZW50IGFuZCBhZGQgYSBmaWx0ZXIgYmVmb3JlIGZvckVhY2hcbiAgICBjb29yZHMuZnJlZS5mb3JFYWNoKGZ1bmN0aW9uIChteUNvb3JkLCBpbmRleCkge1xuICAgICAgLy8gdG9kbzogY2xlYW4gdGhpcyB1cFxuICAgICAgaWYgKG15Q29vcmQuY29sID09PSBjb29yZC5jb2wgJiYgbXlDb29yZC5yb3cgPT09IGNvb3JkLnJvdykge1xuICAgICAgICBjb29yZHMuZnJlZS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGNvb3Jkcy50YWtlbi5wdXNoKGNvb3JkKTtcbiAgfTtcblxuICAvKlxuICAqIFNodWZmbGVcbiAgKiBAcGFyYW0ge29iamVjdH0gb1xuICAqL1xuICB2YXIgc2h1ZmZsZSA9IGZ1bmN0aW9uIHNodWZmbGUobykge1xuICAgIGZvciAodmFyIGogPSB1bmRlZmluZWQsIHggPSB1bmRlZmluZWQsIGkgPSBvLmxlbmd0aDsgaTsgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGkpLCB4ID0gb1stLWldLCBvW2ldID0gb1tqXSwgb1tqXSA9IHgpIHt9XG4gICAgcmV0dXJuIG87XG4gIH07XG5cbiAgdmFyIHNob3dUaWxlID0gZnVuY3Rpb24gc2hvd1RpbGUoKSB7XG4gICAgdmFyIHVybCA9IHN0YXRlLnVybDtcblxuICAgIC8vdG9kbzogb3B0b21pemUgIGNvZGUgZHVwbGljYXRpb24uXG4gICAgaWYgKHVybCkge1xuICAgICAgcmVxdWVzdC5nZXQodXJsKS5lbmQoZnVuY3Rpb24gKGVyciwgcmVzKSB7XG4gICAgICAgIHJlcyA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuICAgICAgICB0aWxlUXVldWUuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcbiAgICAgICAgICB2YXIgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJESVZcIik7XG4gICAgICAgICAgbm9kZS5zdHlsZS5jc3NUZXh0ID0gXCJ0b3A6IFwiICsgaXRlbS55ICsgXCIlOyBsZWZ0OiBcIiArIGl0ZW0ueCArIFwiJTsgd2lkdGg6IFwiICsgaXRlbS53aWR0aCArIFwiJTsgaGVpZ2h0OiBcIiArIGl0ZW0uaGVpZ2h0ICsgXCIlOyBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyByZXNbaW5kZXhdLmltZyArIFwiKVwiO1xuICAgICAgICAgIG5vZGUuY2xhc3NOYW1lID0gXCJ0aWxlXCI7XG4gICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG5vZGUpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aWxlUXVldWUuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcbiAgICAgICAgdmFyIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiRElWXCIpO1xuICAgICAgICBub2RlLnN0eWxlLmNzc1RleHQgPSBcInRvcDogXCIgKyBpdGVtLnkgKyBcIiU7IGxlZnQ6IFwiICsgaXRlbS54ICsgXCIlOyB3aWR0aDogXCIgKyBpdGVtLndpZHRoICsgXCIlOyBoZWlnaHQ6IFwiICsgaXRlbS5oZWlnaHQgKyBcIiVcIjtcbiAgICAgICAgbm9kZS5jbGFzc05hbWUgPSBcInRpbGVcIjtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG5vZGUpO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIC8qXG4gICogQnVpbGQgdGlsZXNcbiAgKi9cbiAgdmFyIGJ1aWxkVGlsZXMgPSBmdW5jdGlvbiBidWlsZFRpbGVzKCkge1xuICAgIHZhciBzaXplID0gbnVsbCxcbiAgICAgICAgdGlsZUNvdW50ID0gMCxcbiAgICAgICAgbWF4VGlsZSA9IG15VGlsZXMuZ2V0TWF4VGlsZUNvdW50KCk7XG5cbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gbWF4VGlsZXM7IGkgPCBsZW47IGkrKykge1xuICAgICAgdGlsZXMucHVzaCh7XG4gICAgICAgIGlkOiBpXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGlsZXMuZm9yRWFjaChmdW5jdGlvbiAodGlsZSwgaW5kZXgpIHtcbiAgICAgIGlmIChjb29yZHMuZnJlZS5sZW5ndGggPiAwICYmIHRpbGVDb3VudCA8IG1heFRpbGUpIHtcbiAgICAgICAgKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgIHRpbGUuc2l6ZSA9IG15VGlsZXMuZ2V0TmV4dFRpbGVTaXplKHRpbGVDb3VudCk7XG4gICAgICAgICAgdmFyIGF2YWlsYWJsZUFyZWFDb29yZHMgPSBudWxsO1xuXG4gICAgICAgICAgLy8gSWYgbm8gc3BhY2Ugd2VyZSBmb3VuZCB0aGF0IG1lYW4gdGhlIHRpbGUgaXMgdG8gYmlnLlxuICAgICAgICAgIC8vIE5lZWQgdG8gc2l6ZSBpdCBkb3duIGEgYml0XG4gICAgICAgICAgdmFyIGZpbmROZXh0QXZhaWxhYmxlQXJlYUNvb3JkcyA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aWxlLnNpemUgPSBteVRpbGVzLnJlZHVjZVRpbGVTaXplKHRpbGUuc2l6ZSk7XG5cbiAgICAgICAgICAgIGlmICghdGlsZS5zaXplKSB7XG4gICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgYXZhaWxhYmxlQXJlYUNvb3JkcyA9IGdldE5ld1RpbGVBcmVhKHRpbGUuc2l6ZSk7XG4gICAgICAgICAgICBpZiAoIWF2YWlsYWJsZUFyZWFDb29yZHMpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZpbmROZXh0QXZhaWxhYmxlQXJlYUNvb3JkcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGF2YWlsYWJsZUFyZWFDb29yZHM7XG4gICAgICAgICAgfSkuYmluZCh1bmRlZmluZWQpO1xuXG4gICAgICAgICAgLy8gQ2hlY2sgaWYgd2UgZm91bmQgYSBwbGFjZSBmb3IgdGhlIHRpbGVcbiAgICAgICAgICBhdmFpbGFibGVBcmVhQ29vcmRzID0gZmluZE5leHRBdmFpbGFibGVBcmVhQ29vcmRzKCk7XG5cbiAgICAgICAgICAvLyBKdXN0IG1ha2luZyBzdXJlIHdlIGhhdmUgc3BhY2UgZm9yIHRoaXMgdGlsZS5cbiAgICAgICAgICAvLyBXZSB3b250IG5lZWQgdGhpcyBjb25kaXRpb24gYWZ0ZXIgSSBtYWtlIGEgcmVjdXJzaW9uIGZvciB0aGUgZG93bnNpemluZyB0aWxlIGZ1bmN0aW9uXG4gICAgICAgICAgaWYgKGF2YWlsYWJsZUFyZWFDb29yZHMpIHtcbiAgICAgICAgICAgIHRpbGVDb3VudCsrO1xuICAgICAgICAgICAgdGlsZS5rZXkgPSBpbmRleDtcbiAgICAgICAgICAgIHRpbGUudGFyZ2V0ID0gYXZhaWxhYmxlQXJlYUNvb3Jkc1swXTsgLy9UYWtlIHRoZSBmaXJzdCBvbmUgaW4gdGhlIGFycmF5LiBUaGV5IGFyZSBhbHJlYWR5IHNob3ZlbGVkXG4gICAgICAgICAgICB0aWxlLmNvbCA9IGNvbnN0YW50cy5USUxFX1NJWkVbdGlsZS5zaXplXS5jb2w7XG4gICAgICAgICAgICB0aWxlLnJvdyA9IGNvbnN0YW50cy5USUxFX1NJWkVbdGlsZS5zaXplXS5yb3c7XG4gICAgICAgICAgICB2YXIgbXlUaWxlID0gbmV3IFRpbGUoc3RhdGUsIHRpbGUsIG15R3JpZC5nZXRQYXJhbXMoKSk7XG4gICAgICAgICAgICAvLyBVcGRhdGUgZnJlZSAmIHRha2VuIGNvb3Jkc1xuICAgICAgICAgICAgdmFyIHRpbGVPY2N1cGF0aW9uQ29vcmRzID0gZ2V0T2NjdXBhdGlvbkZyb21Db29yZCh7IHRvdGFsQ29sOiB0aWxlLmNvbCwgdG90YWxSb3c6IHRpbGUucm93LCBjb29yZDogdGlsZS50YXJnZXQgfSk7XG4gICAgICAgICAgICB0aWxlT2NjdXBhdGlvbkNvb3Jkcy5mb3JFYWNoKGZ1bmN0aW9uIChjb29yZHMpIHtcbiAgICAgICAgICAgICAgcHV0RnJlZUNvb3JUb1Rha2VuQ29vcihjb29yZHMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aWxlUXVldWUucHVzaChteVRpbGUuZ2V0VGlsZUluZm9zKCkpO1xuICAgICAgICAgIH0gZWxzZSB7fVxuICAgICAgICB9KSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgYnVpbGQ6IGZ1bmN0aW9uIGJ1aWxkKCkge1xuICAgICAgbXlHcmlkLmJ1aWxkR3JpZCgpO1xuICAgICAgY29vcmRzLmFsbCA9IGNvb3Jkcy5mcmVlID0gbXlHcmlkLmdldENvb3JkcygpO1xuICAgICAgYnVpbGRUaWxlcygpO1xuICAgICAgc2hvd1RpbGUoKTtcbiAgICB9XG4gIH07XG59O1xuXG5nbG9iYWwuTW96YSA9IE1vemE7XG5cbi8vIG5vIHRpbGUgYWRkZWQgdG8gdGhlIHF1ZXVlIGJlY2F1c2Ugd2UgZGlkIG5vdCBmaW5kIHRoZSBzcGFjZSBmb3IgaXRcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJaTlWYzJWeWN5OXpkWEJsY25NdlUybDBaWE12Ylc5NllTOXpjbU12YW5NdmJXOTZZUzVxY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pTzBGQlFVRXNXVUZCV1N4RFFVRkRPenRCUVVWaUxFbEJRVWtzWlVGQlpTeEhRVUZITEZOQlFVRXNaVUZCUVN4RFFVRlZMRWRCUVVjc1JVRkJSVHRCUVVGRkxGTkJRVThzUjBGQlJ5eEpRVUZKTEVkQlFVY3NRMEZCUXl4VlFVRlZMRWRCUVVjc1IwRkJSeXhEUVVGRExGTkJRVk1zUTBGQlF5eEhRVUZITEVkQlFVY3NRMEZCUXp0RFFVRkZMRU5CUVVNN08wRkJSVGxHTEVsQlJsTXNVMEZCVXl4SFFVRkJMRTlCUVVFc1EwRkJVU3hWUVVGVkxFTkJRVUVzUTBGQk0wSXNVMEZCVXl4RFFVRkJPenRCUVVsc1FpeEpRVWhQTEU5QlFVOHNSMEZCUVN4bFFVRkJMRU5CUVVFc1QwRkJRU3hEUVVGTkxEWkRRVUUyUXl4RFFVRkJMRU5CUVVFc1EwRkJRVHM3UVVGTGFrVXNTVUZCU1N4TlFVRk5MRWRCUVVjc1QwRkJUeXhEUVVwUkxGTkJRVk1zUTBGQlFTeERRVUZCT3p0QlFVMXlReXhKUVU1VExFbEJRVWtzUjBGQlFTeE5RVUZCTEVOQlFVb3NTVUZCU1N4RFFVRkJPMEZCVDJJc1NVRlFaU3hMUVVGTExFZEJRVUVzVFVGQlFTeERRVUZNTEV0QlFVc3NRMEZCUVRzN1FVRlRjRUlzU1VGU1R5eEpRVUZKTEVkQlFVRXNaVUZCUVN4RFFVRkJMRTlCUVVFc1EwRkJUU3hSUVVGUkxFTkJRVUVzUTBGQlFTeERRVUZCT3p0QlFVVjZRaXhKUVVGTkxFbEJRVWtzUjBGQlJ5eFRRVUZCTEVsQlFVRXNRMEZCUXl4TFFVRkxMRVZCUVVzN1FVRlRkRUlzVFVGU1VTeFJRVUZSTEVkQlFYZENMRXRCUVVzc1EwRkJja01zVVVGQlVTeERRVUZCTzBGQlUyaENMRTFCVkd0Q0xGRkJRVkVzUjBGQll5eExRVUZMTEVOQlFUTkNMRkZCUVZFc1EwRkJRVHRCUVZVeFFpeE5RVlkwUWl4RlFVRkZMRWRCUVZVc1MwRkJTeXhEUVVGcVFpeEZRVUZGTEVOQlFVRTdRVUZCZUVJc1RVRkJNRUlzUjBGQlJ5eEhRVUZMTEV0QlFVc3NRMEZCWWl4SFFVRkhMRU5CUVZVN1FVRkRka01zVFVGQlFTeE5RVUZOTEVkQlFVY3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGQk8wRkJRM0JDTEUxQlFVRXNUMEZCVHl4SFFVRkhMRXRCUVVzc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlFUdEJRVmsxUWl4TlFVRkpMR2xDUVVGcFFpeEhRVmgzUlN4TlFVRk5MRU5CUVVNc1UwRkJVeXhGUVVGRkxFTkJRVUU3TzBGQllTOUhMRTFCWWxFc1UwRkJVeXhIUVVGQkxHbENRVUZCTEVOQlFWUXNVMEZCVXl4RFFVRkJPMEZCWTJwQ0xFMUJaRzFDTEZWQlFWVXNSMEZCUVN4cFFrRkJRU3hEUVVGV0xGVkJRVlVzUTBGQlFUdEJRV1UzUWl4TlFXWXJRaXhsUVVGbExFZEJRVUVzYVVKQlFVRXNRMEZCWml4bFFVRmxMRU5CUVVFN1FVRm5RamxETEUxQmFFSm5SQ3huUWtGQlowSXNSMEZCUVN4cFFrRkJRU3hEUVVGb1FpeG5Ra0ZCWjBJc1EwRkJRVHRCUVdsQ2FFVXNUVUZxUW10RkxGVkJRVlVzUjBGQlFTeHBRa0ZCUVN4RFFVRldMRlZCUVZVc1EwRkJRVHRCUVd0Q05VVXNUVUZzUWpoRkxGZEJRVmNzUjBGQlFTeHBRa0ZCUVN4RFFVRllMRmRCUVZjc1EwRkJRVHM3UVVGRmVrWXNUVUZCU1N4TlFVRk5MRWRCUVVjN1FVRkRVaXhQUVVGSExFVkJRVVVzUlVGQlJUdEJRVU5RTEZGQlFVa3NSVUZCUlN4RlFVRkZPMEZCUTFJc1UwRkJTeXhGUVVGRkxFVkJRVVU3UjBGRFZqdE5RVU5FTEZGQlFWRXNSMEZCUnl4RlFVRkZPMDFCUTJJc1MwRkJTeXhIUVVGSExFVkJRVVU3VFVGRFZpeFRRVUZUTEVkQlFVY3NSVUZCUlR0TlFVTmtMRk5CUVZNc1IwRkJSeXhSUVVGUkxFTkJRVU1zWTBGQll5eERRVUZETEVWQlFVVXNRMEZCUXl4RFFVRkRPenM3T3pzN1FVRk5NME1zVFVGQlNTeHJRMEZCYTBNc1IwRkJSeXhUUVVGQkxHdERRVUZCTEVOQlFVTXNVVUZCVVN4RlFVRkxPMEZCUTNKRUxGRkJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0QlFVTldMRmxCUVZFc1EwRkJReXhQUVVGUExFTkJRVU1zVlVGQlFTeExRVUZMTEVWQlFVazdRVUZEZUVJc1ZVRkJTU3hEUVVGRExFZEJRVWNzVFVGQlRTeERRVUZETEVsQlFVa3NRMEZCUXl4TlFVRk5MRU5CUVVNN1FVRkRNMElzWVVGQlR5eERRVUZETEVWQlFVVXNSVUZCUlR0QlFVTldMRmxCUVVrc1RVRkJUU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4SFFVRkhMRXRCUVVzc1MwRkJTeXhEUVVGRExFZEJRVWNzU1VGQlNTeE5RVUZOTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFZEJRVWNzUzBGQlN5eExRVUZMTEVOQlFVTXNSMEZCUnl4RlFVRkZPMEZCUTNoRkxGZEJRVU1zUlVGQlJTeERRVUZETzFOQlEwdzdUMEZEUmp0TFFVTkdMRU5CUVVNc1EwRkJRenRCUVVOSUxGZEJRVThzVVVGQlVTeERRVUZETEUxQlFVMHNTMEZCU3l4RFFVRkRMRU5CUVVNN1IwRkRPVUlzUTBGQlF6czdPenM3T3pzN08wRkJVMFlzVFVGQlNTeHpRa0ZCYzBJc1IwRkJSeXhUUVVGQkxITkNRVUZCTEVOQlFVTXNUVUZCVFN4RlFVRkxPMEZCYlVKMlF5eFJRV3hDU3l4UlFVRlJMRWRCUVhGQ0xFMUJRVTBzUTBGQmJrTXNVVUZCVVN4RFFVRkJPMEZCYlVKaUxGRkJia0psTEZGQlFWRXNSMEZCVnl4TlFVRk5MRU5CUVhwQ0xGRkJRVkVzUTBGQlFUdEJRVUZ1UWl4UlFVRnhRaXhMUVVGTExFZEJRVWtzVFVGQlRTeERRVUZtTEV0QlFVc3NRMEZCVlR0QlFVTndReXhSUVVGQkxFMUJRVTBzUjBGQlJ5eEZRVUZGTEVOQlFVRTdRVUZEWml4UlFVRkpMRXRCUVVzc1JVRkJSVHRCUVVOVUxGZEJRVXNzU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4RlFVRkZMRU5CUVVNc1IwRkJSeXhSUVVGUkxFVkJRVVVzUTBGQlF5eEZRVUZGTEVWQlFVVTdRVUZEYWtNc1lVRkJTeXhKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZETEVWQlFVVXNRMEZCUXl4SFFVRkhMRkZCUVZFc1JVRkJSU3hEUVVGRExFVkJRVVVzUlVGQlJUdEJRVU5xUXl4blFrRkJUU3hEUVVGRExFbEJRVWtzUTBGQlF5eEZRVUZETEVkQlFVY3NSVUZCUlN4RFFVRkRMRWRCUVVjc1MwRkJTeXhEUVVGRExFZEJRVWNzUlVGQlJTeEhRVUZITEVWQlFVVXNRMEZCUXl4SFFVRkhMRXRCUVVzc1EwRkJReXhIUVVGSExFVkJRVU1zUTBGQlF5eERRVUZETzFOQlEzWkVPMDlCUTBZN1FVRkRSQ3hoUVVGUExFMUJRVTBzUTBGQlF6dExRVU5tT3p0QlFVRkJMRWRCUlVZc1EwRkJRenM3T3pzN096czdRVUZSUml4TlFVRkpMR05CUVdNc1IwRkJSeXhUUVVGQkxHTkJRVUVzUTBGQlF5eFJRVUZSTEVWQlFVczdRVUZEYWtNc1VVRkJTU3hQUVVGUExFZEJRVWNzUlVGQlJUdFJRVU5pTEZGQlFWRXNSMEZCUnl4VFFVRlRMRU5CUVVNc1UwRkJVeXhEUVVGRExGRkJRVkVzUTBGQlF5eERRVUZETEVkQlFVYzdVVUZETlVNc1VVRkJVU3hIUVVGSExGTkJRVk1zUTBGQlF5eFRRVUZUTEVOQlFVTXNVVUZCVVN4RFFVRkRMRU5CUVVNc1IwRkJSeXhEUVVGRE8wRkJRMmhFTEZWQlFVMHNRMEZCUXl4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRExGVkJRVUVzVTBGQlV5eEZRVUZKT3p0QlFVVXZRaXhWUVVGSkxHRkJRV0VzUjBGQlJ5eERRVUZETEZOQlFWTXNRMEZCUXl4SFFVRkhMRWRCUVVjc1VVRkJVU3hEUVVGQkxFZEJRVWtzVlVGQlZUdFZRVU4yUkN4alFVRmpMRWRCUVVjc1EwRkJReXhUUVVGVExFTkJRVU1zUjBGQlJ5eEhRVUZITEZGQlFWRXNRMEZCUVN4SFFVRkpMRmRCUVZjc1EwRkJRenM3UVVGRk9VUXNWVUZCU1N4aFFVRmhMRWxCUVVrc1UwRkJVeXhKUVVGSkxHTkJRV01zU1VGQlNTeFZRVUZWTEVWQlFVVTdPenRCUVVjNVJDeFpRVUZKTEU5QlFVMHNSMEZCUnl4elFrRkJjMElzUTBGQlF5eEZRVUZETEZGQlFWRXNSVUZCVWl4UlFVRlJMRVZCUVVVc1VVRkJVU3hGUVVGU0xGRkJRVkVzUlVGQlJTeExRVUZMTEVWQlFVVXNVMEZCVXl4RlFVRkRMRU5CUVVNc1EwRkJRenRCUVVNMVJTeFpRVUZKTEd0RFFVRnJReXhEUVVGRExFOUJRVTBzUTBGQlF5eEZRVUZGTzBGQlF6bERMR2xDUVVGUExFTkJRVU1zU1VGQlNTeERRVUZETEZOQlFWTXNRMEZCUXl4RFFVRkRPMU5CUTNwQ08wOUJRMFk3UzBGRFJpeERRVUZETEVOQlFVTTdPenM3UVVGSlNDeFhRVUZQTEU5QlFVOHNRMEZCUXl4TlFVRk5MRWRCUVVjc1EwRkJReXhIUVVGSExFOUJRVThzUTBGQlF5eFBRVUZQTEVOQlFVTXNSMEZCUnl4VFFVRlRMRU5CUVVNN1IwRkRNVVFzUTBGQlF6czdPenM3TzBGQlRVWXNUVUZCU1N4elFrRkJjMElzUjBGQlJ5eFRRVUZCTEhOQ1FVRkJMRU5CUVVNc1MwRkJTeXhGUVVGTE96dEJRVVYwUXl4VlFVRk5MRU5CUVVNc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eFZRVUZETEU5QlFVOHNSVUZCUlN4TFFVRkxMRVZCUVVzN08wRkJSWFJETEZWQlFVa3NUMEZCVHl4RFFVRkRMRWRCUVVjc1MwRkJTeXhMUVVGTExFTkJRVU1zUjBGQlJ5eEpRVUZKTEU5QlFVOHNRMEZCUXl4SFFVRkhMRXRCUVVzc1MwRkJTeXhEUVVGRExFZEJRVWNzUlVGQlJUdEJRVU14UkN4alFVRk5MRU5CUVVNc1NVRkJTU3hEUVVGRExFMUJRVTBzUTBGQlF5eExRVUZMTEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNN1QwRkRPVUk3UzBGRFJpeERRVUZETEVOQlFVTTdRVUZEU0N4VlFVRk5MRU5CUVVNc1MwRkJTeXhEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXp0SFFVTXhRaXhEUVVGRE96czdPenM3UVVGTlJpeE5RVUZKTEU5QlFVOHNSMEZCUnl4VFFVRkJMRTlCUVVFc1EwRkJReXhEUVVGRExFVkJRVXM3UVVGRGJrSXNVMEZCU1N4SlFVRkpMRU5CUVVNc1IwRkJRU3hUUVVGQkxFVkJRVVVzUTBGQlF5eEhRVUZCTEZOQlFVRXNSVUZCUlN4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFMUJRVTBzUlVGQlJTeERRVUZETEVWQlFVVXNRMEZCUXl4SFFVRkhMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zU1VGQlNTeERRVUZETEUxQlFVMHNSVUZCUlN4SFFVRkhMRU5CUVVNc1EwRkJReXhGUVVGRkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNSVUZCUlN4RFFVRkRMRU5CUVVNc1JVRkJSU3hEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNSMEZCUnl4RFFVRkRMRVZCUVVFc1JVRkJSVHRCUVVOeVJ5eFhRVUZQTEVOQlFVTXNRMEZCUXp0SFFVTldMRU5CUVVFN08wRkJSVVFzVFVGQlNTeFJRVUZSTEVkQlFVY3NVMEZCUVN4UlFVRkJMRWRCUVUwN1FVRnhRbTVDTEZGQmNFSkxMRWRCUVVjc1IwRkJTU3hMUVVGTExFTkJRVm9zUjBGQlJ5eERRVUZCT3pzN1FVRkhVaXhSUVVGSkxFZEJRVWNzUlVGQlJUdEJRVU5RTEdGQlFVOHNRMEZEU2l4SFFVRkhMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRMUlzUjBGQlJ5eERRVUZETEZWQlFWTXNSMEZCUnl4RlFVRkZMRWRCUVVjc1JVRkJRenRCUVVOeVFpeFhRVUZITEVkQlFVY3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdRVUZETTBJc2FVSkJRVk1zUTBGQlF5eFBRVUZQTEVOQlFVTXNWVUZCUXl4SlFVRkpMRVZCUVVVc1MwRkJTeXhGUVVGTE8wRkJRMnBETEdOQlFVa3NTVUZCU1N4SFFVRkhMRkZCUVZFc1EwRkJReXhoUVVGaExFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTTdRVUZEZWtNc1kwRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eFBRVUZQTEVkQlFVRXNUMEZCUVN4SFFVRlhMRWxCUVVrc1EwRkJReXhEUVVGRExFZEJRVUVzVjBGQlFTeEhRVUZaTEVsQlFVa3NRMEZCUXl4RFFVRkRMRWRCUVVFc1dVRkJRU3hIUVVGaExFbEJRVWtzUTBGQlF5eExRVUZMTEVkQlFVRXNZVUZCUVN4SFFVRmpMRWxCUVVrc1EwRkJReXhOUVVGTkxFZEJRVUVzTWtKQlFVRXNSMEZCTkVJc1IwRkJSeXhEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETEVkQlFVY3NSMEZCUVN4SFFVRkhMRU5CUVVNN1FVRkRia29zWTBGQlNTeERRVUZETEZOQlFWTXNSMEZCUnl4TlFVRk5MRU5CUVVNN1FVRkRlRUlzYlVKQlFWTXNRMEZCUXl4WFFVRlhMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03VTBGRE4wSXNRMEZCUXl4RFFVRkRPMDlCUTBvc1EwRkJReXhEUVVGRE8wdEJRMDRzVFVGQlRUdEJRVU5NTEdWQlFWTXNRMEZCUXl4UFFVRlBMRU5CUVVNc1ZVRkJReXhKUVVGSkxFVkJRVVVzUzBGQlN5eEZRVUZMTzBGQlEycERMRmxCUVVrc1NVRkJTU3hIUVVGSExGRkJRVkVzUTBGQlF5eGhRVUZoTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNN1FVRkRla01zV1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4UFFVRlBMRWRCUVVFc1QwRkJRU3hIUVVGWExFbEJRVWtzUTBGQlF5eERRVUZETEVkQlFVRXNWMEZCUVN4SFFVRlpMRWxCUVVrc1EwRkJReXhEUVVGRExFZEJRVUVzV1VGQlFTeEhRVUZoTEVsQlFVa3NRMEZCUXl4TFFVRkxMRWRCUVVFc1lVRkJRU3hIUVVGakxFbEJRVWtzUTBGQlF5eE5RVUZOTEVkQlFVRXNSMEZCUnl4RFFVRkRPMEZCUTNwSExGbEJRVWtzUTBGQlF5eFRRVUZUTEVkQlFVY3NUVUZCVFN4RFFVRkRPMEZCUTNoQ0xHbENRVUZUTEVOQlFVTXNWMEZCVnl4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8wOUJRemRDTEVOQlFVTXNRMEZCUXp0TFFVTktPMGRCUTBZc1EwRkJRenM3T3pzN1FVRkxSaXhOUVVGSkxGVkJRVlVzUjBGQlJ5eFRRVUZCTEZWQlFVRXNSMEZCVFR0QlFVTnlRaXhSUVVGSkxFbEJRVWtzUjBGQlJ5eEpRVUZKTzFGQlExZ3NVMEZCVXl4SFFVRkhMRU5CUVVNN1VVRkRZaXhQUVVGUExFZEJRVWNzVDBGQlR5eERRVUZETEdWQlFXVXNSVUZCUlN4RFFVRkRPenRCUVVWNFF5eFRRVUZMTEVsQlFVa3NRMEZCUXl4SFFVRkhMRU5CUVVNc1JVRkJSU3hIUVVGSExFZEJRVWNzVVVGQlVTeEZRVUZGTEVOQlFVTXNSMEZCUnl4SFFVRkhMRVZCUVVVc1EwRkJReXhGUVVGRkxFVkJRVVU3UVVGRE5VTXNWMEZCU3l4RFFVRkRMRWxCUVVrc1EwRkJRenRCUVVOVUxGVkJRVVVzUlVGQlJTeERRVUZETzA5QlEwNHNRMEZCUXl4RFFVRkRPMHRCUTBvc1EwRkJRenM3UVVGRlJpeFRRVUZMTEVOQlFVTXNUMEZCVHl4RFFVRkRMRlZCUVVNc1NVRkJTU3hGUVVGRkxFdEJRVXNzUlVGQlN6dEJRVU0zUWl4VlFVRkhMRTFCUVUwc1EwRkJReXhKUVVGSkxFTkJRVU1zVFVGQlRTeEhRVUZITEVOQlFVTXNTVUZCU1N4VFFVRlRMRWRCUVVjc1QwRkJUeXhGUVVGRk8wRkJiVUpvUkN4VFFVRkRMRmxCUVZrN08wRkJha0ppTEdOQlFVa3NRMEZCUXl4SlFVRkpMRWRCUVVjc1QwRkJUeXhEUVVGRExHVkJRV1VzUTBGQlF5eFRRVUZUTEVOQlFVTXNRMEZCUXp0QlFVTXZReXhqUVVGSkxHMUNRVUZ0UWl4SFFVRkhMRWxCUVVrc1EwRkJRenM3T3p0QlFVa3ZRaXhqUVVGSkxESkNRVUV5UWl4SFFVRkhMRU5CUVVFc1dVRkJWenRCUVVNelF5eG5Ra0ZCU1N4RFFVRkRMRWxCUVVrc1IwRkJSeXhQUVVGUExFTkJRVU1zWTBGQll5eERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenM3UVVGRk9VTXNaMEpCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeEZRVUZGTzBGQlEyUXNjVUpCUVU4c1UwRkJVeXhEUVVGRE8yRkJRMnhDTzBGQlEwUXNaMEpCUVVrc2JVSkJRVzFDTEVkQlFVY3NZMEZCWXl4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dEJRVU53UkN4blFrRkJTU3hEUVVGRExHMUNRVUZ0UWl4RlFVRkZPMEZCUTNoQ0xIRkNRVUZQTERKQ1FVRXlRaXhGUVVGRkxFTkJRVU03WVVGRGRFTTdRVUZEUkN4dFFrRkJUeXh0UWtGQmJVSXNRMEZCUXp0WFFVTTFRaXhEUVVGQkxFTkJRVU1zU1VGQlNTeERRVUZCTEZOQlFVRXNRMEZCVFN4RFFVRkRPenM3UVVGSFlpdzJRa0ZCYlVJc1IwRkJSeXd5UWtGQk1rSXNSVUZCUlN4RFFVRkRPenM3TzBGQlNYQkVMR05CUVVjc2JVSkJRVzFDTEVWQlFVTTdRVUZEY2tJc2NVSkJRVk1zUlVGQlJTeERRVUZETzBGQlExb3NaMEpCUVVrc1EwRkJReXhIUVVGSExFZEJRVWNzUzBGQlN5eERRVUZETzBGQlEycENMR2RDUVVGSkxFTkJRVU1zVFVGQlRTeEhRVUZITEcxQ1FVRnRRaXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETzBGQlEzSkRMR2RDUVVGSkxFTkJRVU1zUjBGQlJ5eEhRVUZITEZOQlFWTXNRMEZCUXl4VFFVRlRMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETEVkQlFVY3NRMEZCUXp0QlFVTTVReXhuUWtGQlNTeERRVUZETEVkQlFVY3NSMEZCUnl4VFFVRlRMRU5CUVVNc1UwRkJVeXhEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXl4SFFVRkhMRU5CUVVNN1FVRkRPVU1zWjBKQlFVa3NUVUZCVFN4SFFVRkhMRWxCUVVrc1NVRkJTU3hEUVVGRExFdEJRVXNzUlVGQlJTeEpRVUZKTEVWQlFVVXNUVUZCVFN4RFFVRkRMRk5CUVZNc1JVRkJSU3hEUVVGRExFTkJRVU03TzBGQlJYWkVMR2RDUVVGSkxHOUNRVUZ2UWl4SFFVRkhMSE5DUVVGelFpeERRVUZETEVWQlFVTXNVVUZCVVN4RlFVRkZMRWxCUVVrc1EwRkJReXhIUVVGSExFVkJRVVVzVVVGQlVTeEZRVUZGTEVsQlFVa3NRMEZCUXl4SFFVRkhMRVZCUVVVc1MwRkJTeXhGUVVGRkxFbEJRVWtzUTBGQlF5eE5RVUZOTEVWQlFVTXNRMEZCUXl4RFFVRkRPMEZCUTJoSUxHZERRVUZ2UWl4RFFVRkRMRTlCUVU4c1EwRkJReXhWUVVGQkxFMUJRVTBzUlVGQlNUdEJRVU55UXl4dlEwRkJjMElzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXp0aFFVTm9ReXhEUVVGRExFTkJRVU03UVVGRFNDeHhRa0ZCVXl4RFFVRkRMRWxCUVVrc1EwRkJReXhOUVVGTkxFTkJRVU1zV1VGQldTeEZRVUZGTEVOQlFVTXNRMEZCUXp0WFFVTjJReXhOUVVGSkxFVkJSVW83VTBGclFrRXNRMEZCUVN4RlFVRkhMRU5CUVVNN1QwRnFRazQ3UzBGRFJpeERRVUZETEVOQlFVTTdSMEZEU2l4RFFVRkJPenRCUVVWRUxGTkJRVTg3UVVGRFRDeFRRVUZMTEVWQlFVVXNVMEZCUVN4TFFVRkJMRWRCUVUwN1FVRkRXQ3haUVVGTkxFTkJRVU1zVTBGQlV5eEZRVUZGTEVOQlFVTTdRVUZEYmtJc1dVRkJUU3hEUVVGRExFZEJRVWNzUjBGQlJ5eE5RVUZOTEVOQlFVTXNTVUZCU1N4SFFVRkhMRTFCUVUwc1EwRkJReXhUUVVGVExFVkJRVVVzUTBGQlF6dEJRVU01UXl4blFrRkJWU3hGUVVGRkxFTkJRVU03UVVGRFlpeGpRVUZSTEVWQlFVVXNRMEZCUXp0TFFVTmFPMGRCUTBZc1EwRkJRVHREUVVOR0xFTkJRVU03TzBGQlNVWXNUVUZCVFN4RFFVRkRMRWxCUVVrc1IwRkJSeXhKUVVGSkxFTkJRVU1pTENKbWFXeGxJam9pWjJWdVpYSmhkR1ZrTG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYklpZDFjMlVnYzNSeWFXTjBKenRjYmx4dWFXMXdiM0owSUhzZ1kyOXVjM1JoYm5SeklIMGdabkp2YlNBbkxpOWpiMjVtYVdjbk8xeHVhVzF3YjNKMElISmxjWFZsYzNRZ1puSnZiU0FuTGk0dkxpNHZibTlrWlY5dGIyUjFiR1Z6TDNOMWNHVnlZV2RsYm5RdmJHbGlMMk5zYVdWdWRDNXFjeWM3WEc1cGJYQnZjblFnZXlCVWFXeGxMQ0JVYVd4bGN5QjlJR1p5YjIwZ0p5NHZkR2xzWlhNbk8xeHVhVzF3YjNKMElFZHlhV1FnWm5KdmJTQW5MaTluY21sa0p6dGNibHh1WTI5dWMzUWdUVzk2WVNBOUlDaHpkR0YwWlNrZ1BUNGdlMXh1SUNCamIyNXpkQ0I3SUhSdmRHRnNRMjlzTENCMGIzUmhiRkp2ZHl3Z1pXd3NJSFZ5YkNCOUlEMGdjM1JoZEdVc1hHNGdJQ0FnSUNBZ0lHMTVSM0pwWkNBOUlFZHlhV1FvYzNSaGRHVXBMRnh1SUNBZ0lDQWdJQ0J0ZVZScGJHVnpJRDBnVkdsc1pYTW9jM1JoZEdVcExGeHVJQ0FnSUNBZ0lDQjdJR2R5YVdSWGFXUjBhQ3dnWjNKcFpFaGxhV2RvZEN3Z1ozSnBaRmRwWkhSb1UzQmhZMlZ5TENCbmNtbGtTR1ZwWjJoMFUzQmhZMlZ5TENCemNHRmpaVmRwWkhSb0xDQnpjR0ZqWlVobGFXZG9kSDBnUFNCdGVVZHlhV1F1WjJWMFVHRnlZVzF6S0NrN1hHNWNiaUFnYkdWMElHTnZiM0prY3lBOUlIdGNiaUFnSUNBZ0lDQmhiR3c2SUZ0ZExGeHVJQ0FnSUNBZ0lHWnlaV1U2SUZ0ZExGeHVJQ0FnSUNBZ0lIUmhhMlZ1T2lCYlhWeHVJQ0FnSUNCOUxGeHVJQ0FnSUNCdFlYaFVhV3hsY3lBOUlEUXdMRnh1SUNBZ0lDQjBhV3hsY3lBOUlGdGRMRnh1SUNBZ0lDQjBhV3hsVVhWbGRXVWdQU0JiWFN4Y2JpQWdJQ0FnWTI5dWRHRnBibVZ5SUQwZ1pHOWpkVzFsYm5RdVoyVjBSV3hsYldWdWRFSjVTV1FvWld3cE8xeHVYRzRnSUM4cUtseHVJQ0FxSUVOb1pXTnJJR0YyWVdsc1lXSnBiR2wwZVNCdlppQmpiMjl5WkhNZ1puSnZiU0JqYjI5eVpGeHVJQ0FxSUVCd1lYSmhiU0I3YjJKcVpXTjBmU0JqYjI5eVpITmNiaUFnS2k5Y2JpQWdiR1YwSUdOb1pXTnJRWFpoYVd4aFltbHNhWFI1VDJaRGIyOXlaSE5HY205dFEyOXZjbVFnUFNBb2JYbERiMjl5WkhNcElEMCtJSHRjYmlBZ0lDQnNaWFFnZVNBOUlEQTdYRzRnSUNBZ2JYbERiMjl5WkhNdVptOXlSV0ZqYUNoamIyOXlaQ0E5UGlCN1hHNGdJQ0FnSUNCc1pYUWdhU0E5SUdOdmIzSmtjeTVtY21WbExteGxibWQwYUR0Y2JpQWdJQ0FnSUhkb2FXeGxJQ2hwTFMwcElIdGNiaUFnSUNBZ0lDQWdhV1lnS0dOdmIzSmtjeTVtY21WbFcybGRMbU52YkNBOVBUMGdZMjl2Y21RdVkyOXNJQ1ltSUdOdmIzSmtjeTVtY21WbFcybGRMbkp2ZHlBOVBUMGdZMjl2Y21RdWNtOTNLU0I3WEc0Z0lDQWdJQ0FnSUNBZ2VTc3JPMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdmU2s3WEc0Z0lDQWdjbVYwZFhKdUlHMTVRMjl2Y21SekxteGxibWQwYUNBOVBUMGdlVHRjYmlBZ2ZUdGNibHh1SUNBdktseHVJQ0FxSUVkbGRDQnZZMk4xY0dGMGFXOXVJR1p5YjIwZ1kyOXZjbVJjYmlBZ0tpQlVhR2x6SUhkcGJHd2daMlYwSUdGdUlHRnljbUY1SUhkcGRHZ2dZV3hzSUhSb1pTQndiMmx1ZENCdlkyTjFjR1ZrSUdKNUlIUm9aU0IwYVd4bFhHNGdJQ29nUUhCaGNtRnRJSHR1ZFcxaVpYSjlJSFJ2ZEdGc1EyOXNYRzRnSUNvZ1FIQmhjbUZ0SUh0dWRXMWlaWEo5SUhSdmRHRnNVbTkzWEc0Z0lDb2dRSEJoY21GdElIdHZZbXBsWTNSOUlHTnZiM0prWEc0Z0lDb3ZYRzRnSUd4bGRDQm5aWFJQWTJOMWNHRjBhVzl1Um5KdmJVTnZiM0prSUQwZ0tIQmhjbUZ0Y3lrZ1BUNGdlMXh1SUNBZ0lHeGxkQ0I3ZEc5MFlXeERiMndzSUhSdmRHRnNVbTkzTENCamIyOXlaSDBnUFNCd1lYSmhiWE1zWEc0Z0lDQWdJQ0FnSUdOdmIzSmtjeUE5SUZ0ZE8xeHVJQ0FnSUdsbUlDaGpiMjl5WkNrZ2UxeHVJQ0FnSUNBZ1ptOXlJQ2hzWlhRZ2FTQTlJREE3SUdrZ1BDQjBiM1JoYkVOdmJEc2dhU3NyS1NCN1hHNGdJQ0FnSUNBZ0lHWnZjaUFvYkdWMElHb2dQU0F3T3lCcUlEd2dkRzkwWVd4U2IzYzdJR29yS3lrZ2UxeHVJQ0FnSUNBZ0lDQWdJR052YjNKa2N5NXdkWE5vS0h0amIydzZJR2tnS3lCamIyOXlaQzVqYjJ3c0lISnZkem9nYWlBcklHTnZiM0prTG5KdmQzMHBPMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdJQ0J5WlhSMWNtNGdZMjl2Y21Sek8xeHVJQ0FnSUgxY2JpQWdJQ0F2THlCMGIyUnZPaUJ6YUc5MWJHUWdjbVYwZFhKdUlITnZiV1YwYUdsdVp5QmhibmwzWVhsY2JpQWdmVHRjYmx4dUlDQXZLbHh1SUNBcUlFZGxkQ0J1WlhjZ2RHbHNaVUZ5WldGY2JpQWdLaUJKZEdWeVlYUmxJR0ZqY205emN5QmxZV05vSUdaeVpXVWdZMjl2Y21ScGJtRjBaWE1nZEc4Z2RHVnpkQ0JwWmlCMGFHVWdkR2xzWlNCallXNGdZbVVnY0d4aFkyVmtYRzRnSUNvZ1FIQmhjbUZ0SUh0emRISnBibWQ5SUhScGJHVlRhWHBsWEc0Z0lDb2dRSEpsZEhWeWJuTWdlMkZ5Y21GNWZIVnVaR1ZtYVc1bFpIMWNiaUFnS2k5Y2JpQWdiR1YwSUdkbGRFNWxkMVJwYkdWQmNtVmhJRDBnS0hScGJHVlRhWHBsS1NBOVBpQjdYRzRnSUNBZ2JHVjBJSFJoY21kbGRITWdQU0JiWFN4Y2JpQWdJQ0FnSUNCMGIzUmhiRU52YkNBOUlHTnZibk4wWVc1MGN5NVVTVXhGWDFOSldrVmJkR2xzWlZOcGVtVmRMbU52YkN4Y2JpQWdJQ0FnSUNCMGIzUmhiRkp2ZHlBOUlHTnZibk4wWVc1MGN5NVVTVXhGWDFOSldrVmJkR2xzWlZOcGVtVmRMbkp2ZHp0Y2JpQWdJQ0JqYjI5eVpITXVabkpsWlM1bWIzSkZZV05vS0daeVpXVkRiMjl5WkNBOVBpQjdYRzRnSUNBZ0lDQXZMeUJ0WVd0bElITjFjbVVnZEdobElIUnBiR1VnWlc1a2FXNW5JR1Z1WkNCa2IyNG5kQ0JuYnlCbWRYUm9aWElnZEdobGJpQjBhR1VnWjNKcFpDQmxaR2RsWEc0Z0lDQWdJQ0JzWlhRZ2RHbHNaVkpwWjJoMFJXUm5aU0E5SUNobWNtVmxRMjl2Y21RdVkyOXNJQ3NnZEc5MFlXeERiMndwSUNvZ2MzQmhZMlZYYVdSMGFDeGNiaUFnSUNBZ0lDQWdJQ0IwYVd4bFFtOTBkRzl0UldSblpTQTlJQ2htY21WbFEyOXZjbVF1Y205M0lDc2dkRzkwWVd4U2IzY3BJQ29nYzNCaFkyVklaV2xuYUhRN1hHNWNiaUFnSUNBZ0lHbG1JQ2gwYVd4bFVtbG5hSFJGWkdkbElEdzlJR2R5YVdSWGFXUjBhQ0FtSmlCMGFXeGxRbTkwZEc5dFJXUm5aU0E4UFNCbmNtbGtTR1ZwWjJoMEtTQjdYRzRnSUNBZ0lDQWdJQzh2SUZkbElHcHpkWFFnWm05dVpDQmhJR2R2YjJRZ2MzQnZkQ0JtYjNJZ2RHaHBjeUIwYVd4bExseHVJQ0FnSUNBZ0lDQXZMeUJKZENkeklIUnBiV1VnZEc4Z1kyaGxZMnNnYVdZZ2RHaGxJR0Z5WldFZ2FYTWdZMnhsWVhJdVhHNGdJQ0FnSUNBZ0lHeGxkQ0JqYjI5eVpITWdQU0JuWlhSUFkyTjFjR0YwYVc5dVJuSnZiVU52YjNKa0tIdDBiM1JoYkVOdmJDd2dkRzkwWVd4U2IzY3NJR052YjNKa09pQm1jbVZsUTI5dmNtUjlLVHRjYmlBZ0lDQWdJQ0FnYVdZZ0tHTm9aV05yUVhaaGFXeGhZbWxzYVhSNVQyWkRiMjl5WkhOR2NtOXRRMjl2Y21Rb1kyOXZjbVJ6S1NrZ2UxeHVJQ0FnSUNBZ0lDQWdJSFJoY21kbGRITXVjSFZ6YUNobWNtVmxRMjl2Y21RcE8xeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQjlYRzRnSUNBZ2ZTazdYRzRnSUNBZ0x5OGdTV1lnZEdobElIUmhjbWRsZEhNZ2FYTWdaVzF3ZEhrZ2RHaGhkQ0J0WldGdUlESWdkR2hwYm1kek9seHVJQ0FnSUM4dklDMGdkR2hsSUhScGJHVWdkMkZ6SUhSdklHSnBaMXh1SUNBZ0lDOHZJQzBnZEdobElIUnBiR1VnYUdGa0lIUm9aU0J5YVdkb2RDQnphWHBsSUdKMWRDQnVieUJoY21WaElIZGhjeUJoZG1GcGJHRmliR1ZjYmlBZ0lDQnlaWFIxY200Z2RHRnlaMlYwY3k1c1pXNW5kR2dnUGlBd0lEOGdjMmgxWm1ac1pTaDBZWEpuWlhSektTQTZJSFZ1WkdWbWFXNWxaRHRjYmlBZ2ZUdGNibHh1SUNBdktseHVJQ0FxSUZCMWRDQm1jbVZsSUdOdmIzSWdkRzhnZEdGclpXNGdZMjl2Y2x4dUlDQXFJRUJ3WVhKaGJTQjdiMkpxWldOMGZTQmpiMjl5WkZ4dUlDQXFMMXh1SUNCc1pYUWdjSFYwUm5KbFpVTnZiM0pVYjFSaGEyVnVRMjl2Y2lBOUlDaGpiMjl5WkNrZ1BUNGdlMXh1SUNBZ0lDOHZkRzlrYnpvZ1VtVnRiM1psSUhSb1pTQnBaaUJ6ZEdGMFpXMWxiblFnWVc1a0lHRmtaQ0JoSUdacGJIUmxjaUJpWldadmNtVWdabTl5UldGamFGeHVJQ0FnSUdOdmIzSmtjeTVtY21WbExtWnZja1ZoWTJnb0tHMTVRMjl2Y21Rc0lHbHVaR1Y0S1NBOVBpQjdYRzRnSUNBZ0lDQXZMeUIwYjJSdk9pQmpiR1ZoYmlCMGFHbHpJSFZ3WEc0Z0lDQWdJQ0JwWmlBb2JYbERiMjl5WkM1amIyd2dQVDA5SUdOdmIzSmtMbU52YkNBbUppQnRlVU52YjNKa0xuSnZkeUE5UFQwZ1kyOXZjbVF1Y205M0tTQjdYRzRnSUNBZ0lDQWdJR052YjNKa2N5NW1jbVZsTG5Od2JHbGpaU2hwYm1SbGVDd2dNU2s3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdmU2s3WEc0Z0lDQWdZMjl2Y21SekxuUmhhMlZ1TG5CMWMyZ29ZMjl2Y21RcE8xeHVJQ0I5TzF4dVhHNGdJQzhxWEc0Z0lDb2dVMmgxWm1ac1pWeHVJQ0FxSUVCd1lYSmhiU0I3YjJKcVpXTjBmU0J2WEc0Z0lDb3ZYRzRnSUd4bGRDQnphSFZtWm14bElEMGdLRzhwSUQwK0lIdGNiaUFnSUNCbWIzSW9iR1YwSUdvc0lIZ3NJR2tnUFNCdkxteGxibWQwYURzZ2FUc2dhaUE5SUUxaGRHZ3VabXh2YjNJb1RXRjBhQzV5WVc1a2IyMG9LU0FxSUdrcExDQjRJRDBnYjFzdExXbGRMQ0J2VzJsZElEMGdiMXRxWFN3Z2IxdHFYU0E5SUhncE8xeHVJQ0FnSUhKbGRIVnliaUJ2TzF4dUlDQjlYRzVjYmlBZ2JHVjBJSE5vYjNkVWFXeGxJRDBnS0NrZ1BUNGdlMXh1SUNBZ0lHeGxkQ0I3ZFhKc2ZTQTlJSE4wWVhSbE8xeHVYRzRnSUNBZ0x5OTBiMlJ2T2lCdmNIUnZiV2w2WlNBZ1kyOWtaU0JrZFhCc2FXTmhkR2x2Ymk1Y2JpQWdJQ0JwWmlBb2RYSnNLU0I3WEc0Z0lDQWdJQ0J5WlhGMVpYTjBYRzRnSUNBZ0lDQWdJQzVuWlhRb2RYSnNLVnh1SUNBZ0lDQWdJQ0F1Wlc1a0tHWjFibU4wYVc5dUtHVnljaXdnY21WektYdGNiaUFnSUNBZ0lDQWdJQ0J5WlhNZ1BTQktVMDlPTG5CaGNuTmxLSEpsY3k1MFpYaDBLVHRjYmlBZ0lDQWdJQ0FnSUNCMGFXeGxVWFZsZFdVdVptOXlSV0ZqYUNnb2FYUmxiU3dnYVc1a1pYZ3BJRDArSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJR3hsZENCdWIyUmxJRDBnWkc5amRXMWxiblF1WTNKbFlYUmxSV3hsYldWdWRDaGNJa1JKVmx3aUtUdGNiaUFnSUNBZ0lDQWdJQ0FnSUc1dlpHVXVjM1I1YkdVdVkzTnpWR1Y0ZENBOUlHQjBiM0E2SUNSN2FYUmxiUzU1ZlNVN0lHeGxablE2SUNSN2FYUmxiUzU0ZlNVN0lIZHBaSFJvT2lBa2UybDBaVzB1ZDJsa2RHaDlKVHNnYUdWcFoyaDBPaUFrZTJsMFpXMHVhR1ZwWjJoMGZTVTdJR0poWTJ0bmNtOTFibVF0YVcxaFoyVTZJSFZ5YkNna2UzSmxjMXRwYm1SbGVGMHVhVzFuZlNsZ08xeHVJQ0FnSUNBZ0lDQWdJQ0FnYm05a1pTNWpiR0Z6YzA1aGJXVWdQU0FuZEdsc1pTYzdYRzRnSUNBZ0lDQWdJQ0FnSUNCamIyNTBZV2x1WlhJdVlYQndaVzVrUTJocGJHUW9ibTlrWlNrN1hHNGdJQ0FnSUNBZ0lDQWdmU2s3WEc0Z0lDQWdJQ0FnSUgwcE8xeHVJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0IwYVd4bFVYVmxkV1V1Wm05eVJXRmphQ2dvYVhSbGJTd2dhVzVrWlhncElEMCtJSHRjYmlBZ0lDQWdJQ0FnYkdWMElHNXZaR1VnUFNCa2IyTjFiV1Z1ZEM1amNtVmhkR1ZGYkdWdFpXNTBLRndpUkVsV1hDSXBPMXh1SUNBZ0lDQWdJQ0J1YjJSbExuTjBlV3hsTG1OemMxUmxlSFFnUFNCZ2RHOXdPaUFrZTJsMFpXMHVlWDBsT3lCc1pXWjBPaUFrZTJsMFpXMHVlSDBsT3lCM2FXUjBhRG9nSkh0cGRHVnRMbmRwWkhSb2ZTVTdJR2hsYVdkb2REb2dKSHRwZEdWdExtaGxhV2RvZEgwbFlEdGNiaUFnSUNBZ0lDQWdibTlrWlM1amJHRnpjMDVoYldVZ1BTQW5kR2xzWlNjN1hHNGdJQ0FnSUNBZ0lHTnZiblJoYVc1bGNpNWhjSEJsYm1SRGFHbHNaQ2h1YjJSbEtUdGNiaUFnSUNBZ0lIMHBPMXh1SUNBZ0lIMWNiaUFnZlR0Y2JseHVJQ0F2S2x4dUlDQXFJRUoxYVd4a0lIUnBiR1Z6WEc0Z0lDb3ZYRzRnSUd4bGRDQmlkV2xzWkZScGJHVnpJRDBnS0NrZ1BUNGdlMXh1SUNBZ0lHeGxkQ0J6YVhwbElEMGdiblZzYkN4Y2JpQWdJQ0FnSUNBZ2RHbHNaVU52ZFc1MElEMGdNQ3hjYmlBZ0lDQWdJQ0FnYldGNFZHbHNaU0E5SUcxNVZHbHNaWE11WjJWMFRXRjRWR2xzWlVOdmRXNTBLQ2s3WEc1Y2JpQWdJQ0JtYjNJZ0tHeGxkQ0JwSUQwZ01Dd2diR1Z1SUQwZ2JXRjRWR2xzWlhNN0lHa2dQQ0JzWlc0N0lHa3JLeWtnZTF4dUlDQWdJQ0FnZEdsc1pYTXVjSFZ6YUNoN1hHNGdJQ0FnSUNBZ0lHbGtPaUJwWEc0Z0lDQWdJQ0I5S1R0Y2JpQWdJQ0I5TzF4dVhHNGdJQ0FnZEdsc1pYTXVabTl5UldGamFDZ29kR2xzWlN3Z2FXNWtaWGdwSUQwK0lIdGNiaUFnSUNBZ0lHbG1LR052YjNKa2N5NW1jbVZsTG14bGJtZDBhQ0ErSURBZ0ppWWdkR2xzWlVOdmRXNTBJRHdnYldGNFZHbHNaU2tnZTF4dVhHNGdJQ0FnSUNBZ0lIUnBiR1V1YzJsNlpTQTlJRzE1Vkdsc1pYTXVaMlYwVG1WNGRGUnBiR1ZUYVhwbEtIUnBiR1ZEYjNWdWRDazdYRzRnSUNBZ0lDQWdJR3hsZENCaGRtRnBiR0ZpYkdWQmNtVmhRMjl2Y21SeklEMGdiblZzYkR0Y2JseHVJQ0FnSUNBZ0lDQXZMeUJKWmlCdWJ5QnpjR0ZqWlNCM1pYSmxJR1p2ZFc1a0lIUm9ZWFFnYldWaGJpQjBhR1VnZEdsc1pTQnBjeUIwYnlCaWFXY3VYRzRnSUNBZ0lDQWdJQzh2SUU1bFpXUWdkRzhnYzJsNlpTQnBkQ0JrYjNkdUlHRWdZbWwwWEc0Z0lDQWdJQ0FnSUd4bGRDQm1hVzVrVG1WNGRFRjJZV2xzWVdKc1pVRnlaV0ZEYjI5eVpITWdQU0JtZFc1amRHbHZiaWdwSUh0Y2JpQWdJQ0FnSUNBZ0lDQjBhV3hsTG5OcGVtVWdQU0J0ZVZScGJHVnpMbkpsWkhWalpWUnBiR1ZUYVhwbEtIUnBiR1V1YzJsNlpTazdYRzVjYmlBZ0lDQWdJQ0FnSUNCcFppQW9JWFJwYkdVdWMybDZaU2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlIVnVaR1ZtYVc1bFpEdGNiaUFnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUNBZ2JHVjBJR0YyWVdsc1lXSnNaVUZ5WldGRGIyOXlaSE1nUFNCblpYUk9aWGRVYVd4bFFYSmxZU2gwYVd4bExuTnBlbVVwTzF4dUlDQWdJQ0FnSUNBZ0lHbG1JQ2doWVhaaGFXeGhZbXhsUVhKbFlVTnZiM0prY3lrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJR1pwYm1ST1pYaDBRWFpoYVd4aFlteGxRWEpsWVVOdmIzSmtjeWdwTzF4dUlDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdZWFpoYVd4aFlteGxRWEpsWVVOdmIzSmtjenRjYmlBZ0lDQWdJQ0FnZlM1aWFXNWtLSFJvYVhNcE8xeHVYRzRnSUNBZ0lDQWdJQzh2SUVOb1pXTnJJR2xtSUhkbElHWnZkVzVrSUdFZ2NHeGhZMlVnWm05eUlIUm9aU0IwYVd4bFhHNGdJQ0FnSUNBZ0lHRjJZV2xzWVdKc1pVRnlaV0ZEYjI5eVpITWdQU0JtYVc1a1RtVjRkRUYyWVdsc1lXSnNaVUZ5WldGRGIyOXlaSE1vS1R0Y2JseHVJQ0FnSUNBZ0lDQXZMeUJLZFhOMElHMWhhMmx1WnlCemRYSmxJSGRsSUdoaGRtVWdjM0JoWTJVZ1ptOXlJSFJvYVhNZ2RHbHNaUzVjYmlBZ0lDQWdJQ0FnTHk4Z1YyVWdkMjl1ZENCdVpXVmtJSFJvYVhNZ1kyOXVaR2wwYVc5dUlHRm1kR1Z5SUVrZ2JXRnJaU0JoSUhKbFkzVnljMmx2YmlCbWIzSWdkR2hsSUdSdmQyNXphWHBwYm1jZ2RHbHNaU0JtZFc1amRHbHZibHh1SUNBZ0lDQWdJQ0JwWmloaGRtRnBiR0ZpYkdWQmNtVmhRMjl2Y21SektYdGNiaUFnSUNBZ0lDQWdJQ0IwYVd4bFEyOTFiblFyS3p0Y2JpQWdJQ0FnSUNBZ0lDQjBhV3hsTG10bGVTQTlJR2x1WkdWNE8xeHVJQ0FnSUNBZ0lDQWdJSFJwYkdVdWRHRnlaMlYwSUQwZ1lYWmhhV3hoWW14bFFYSmxZVU52YjNKa2Mxc3dYVHNnTHk5VVlXdGxJSFJvWlNCbWFYSnpkQ0J2Ym1VZ2FXNGdkR2hsSUdGeWNtRjVMaUJVYUdWNUlHRnlaU0JoYkhKbFlXUjVJSE5vYjNabGJHVmtYRzRnSUNBZ0lDQWdJQ0FnZEdsc1pTNWpiMndnUFNCamIyNXpkR0Z1ZEhNdVZFbE1SVjlUU1ZwRlczUnBiR1V1YzJsNlpWMHVZMjlzTzF4dUlDQWdJQ0FnSUNBZ0lIUnBiR1V1Y205M0lEMGdZMjl1YzNSaGJuUnpMbFJKVEVWZlUwbGFSVnQwYVd4bExuTnBlbVZkTG5KdmR6dGNiaUFnSUNBZ0lDQWdJQ0JzWlhRZ2JYbFVhV3hsSUQwZ2JtVjNJRlJwYkdVb2MzUmhkR1VzSUhScGJHVXNJRzE1UjNKcFpDNW5aWFJRWVhKaGJYTW9LU2s3WEc0Z0lDQWdJQ0FnSUNBZ0x5OGdWWEJrWVhSbElHWnlaV1VnSmlCMFlXdGxiaUJqYjI5eVpITmNiaUFnSUNBZ0lDQWdJQ0JzWlhRZ2RHbHNaVTlqWTNWd1lYUnBiMjVEYjI5eVpITWdQU0JuWlhSUFkyTjFjR0YwYVc5dVJuSnZiVU52YjNKa0tIdDBiM1JoYkVOdmJEb2dkR2xzWlM1amIyd3NJSFJ2ZEdGc1VtOTNPaUIwYVd4bExuSnZkeXdnWTI5dmNtUTZJSFJwYkdVdWRHRnlaMlYwZlNrN1hHNGdJQ0FnSUNBZ0lDQWdkR2xzWlU5alkzVndZWFJwYjI1RGIyOXlaSE11Wm05eVJXRmphQ2hqYjI5eVpITWdQVDRnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdjSFYwUm5KbFpVTnZiM0pVYjFSaGEyVnVRMjl2Y2loamIyOXlaSE1wTzF4dUlDQWdJQ0FnSUNBZ0lIMHBPMXh1SUNBZ0lDQWdJQ0FnSUhScGJHVlJkV1YxWlM1d2RYTm9LRzE1Vkdsc1pTNW5aWFJVYVd4bFNXNW1iM01vS1NrN1hHNGdJQ0FnSUNBZ0lIMWxiSE5sZTF4dUlDQWdJQ0FnSUNBZ0lDOHZJRzV2SUhScGJHVWdZV1JrWldRZ2RHOGdkR2hsSUhGMVpYVmxJR0psWTJGMWMyVWdkMlVnWkdsa0lHNXZkQ0JtYVc1a0lIUm9aU0J6Y0dGalpTQm1iM0lnYVhSY2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgwcE8xeHVJQ0I5WEc1Y2JpQWdjbVYwZFhKdUlIdGNiaUFnSUNCaWRXbHNaRG9nS0NrZ1BUNGdlMXh1SUNBZ0lDQWdiWGxIY21sa0xtSjFhV3hrUjNKcFpDZ3BPMXh1SUNBZ0lDQWdZMjl2Y21SekxtRnNiQ0E5SUdOdmIzSmtjeTVtY21WbElEMGdiWGxIY21sa0xtZGxkRU52YjNKa2N5Z3BPMXh1SUNBZ0lDQWdZblZwYkdSVWFXeGxjeWdwTzF4dUlDQWdJQ0FnYzJodmQxUnBiR1VvS1R0Y2JpQWdJQ0I5WEc0Z0lIMWNibjA3WEc1Y2JseHVYRzVuYkc5aVlXd3VUVzk2WVNBOUlFMXZlbUU3WEc0aVhYMD0iLCIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIEVtaXR0ZXIgPSByZXF1aXJlKCdlbWl0dGVyJyk7XG52YXIgcmVkdWNlID0gcmVxdWlyZSgncmVkdWNlJyk7XG5cbi8qKlxuICogUm9vdCByZWZlcmVuY2UgZm9yIGlmcmFtZXMuXG4gKi9cblxudmFyIHJvb3Q7XG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHsgLy8gQnJvd3NlciB3aW5kb3dcbiAgcm9vdCA9IHdpbmRvdztcbn0gZWxzZSBpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnKSB7IC8vIFdlYiBXb3JrZXJcbiAgcm9vdCA9IHNlbGY7XG59IGVsc2UgeyAvLyBPdGhlciBlbnZpcm9ubWVudHNcbiAgcm9vdCA9IHRoaXM7XG59XG5cbi8qKlxuICogTm9vcC5cbiAqL1xuXG5mdW5jdGlvbiBub29wKCl7fTtcblxuLyoqXG4gKiBDaGVjayBpZiBgb2JqYCBpcyBhIGhvc3Qgb2JqZWN0LFxuICogd2UgZG9uJ3Qgd2FudCB0byBzZXJpYWxpemUgdGhlc2UgOilcbiAqXG4gKiBUT0RPOiBmdXR1cmUgcHJvb2YsIG1vdmUgdG8gY29tcG9lbnQgbGFuZFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBpc0hvc3Qob2JqKSB7XG4gIHZhciBzdHIgPSB7fS50b1N0cmluZy5jYWxsKG9iaik7XG5cbiAgc3dpdGNoIChzdHIpIHtcbiAgICBjYXNlICdbb2JqZWN0IEZpbGVdJzpcbiAgICBjYXNlICdbb2JqZWN0IEJsb2JdJzpcbiAgICBjYXNlICdbb2JqZWN0IEZvcm1EYXRhXSc6XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIFhIUi5cbiAqL1xuXG5yZXF1ZXN0LmdldFhIUiA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHJvb3QuWE1MSHR0cFJlcXVlc3RcbiAgICAgICYmICghcm9vdC5sb2NhdGlvbiB8fCAnZmlsZTonICE9IHJvb3QubG9jYXRpb24ucHJvdG9jb2xcbiAgICAgICAgICB8fCAhcm9vdC5BY3RpdmVYT2JqZWN0KSkge1xuICAgIHJldHVybiBuZXcgWE1MSHR0cFJlcXVlc3Q7XG4gIH0gZWxzZSB7XG4gICAgdHJ5IHsgcmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KCdNaWNyb3NvZnQuWE1MSFRUUCcpOyB9IGNhdGNoKGUpIHt9XG4gICAgdHJ5IHsgcmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KCdNc3htbDIuWE1MSFRUUC42LjAnKTsgfSBjYXRjaChlKSB7fVxuICAgIHRyeSB7IHJldHVybiBuZXcgQWN0aXZlWE9iamVjdCgnTXN4bWwyLlhNTEhUVFAuMy4wJyk7IH0gY2F0Y2goZSkge31cbiAgICB0cnkgeyByZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoJ01zeG1sMi5YTUxIVFRQJyk7IH0gY2F0Y2goZSkge31cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG4vKipcbiAqIFJlbW92ZXMgbGVhZGluZyBhbmQgdHJhaWxpbmcgd2hpdGVzcGFjZSwgYWRkZWQgdG8gc3VwcG9ydCBJRS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc1xuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxudmFyIHRyaW0gPSAnJy50cmltXG4gID8gZnVuY3Rpb24ocykgeyByZXR1cm4gcy50cmltKCk7IH1cbiAgOiBmdW5jdGlvbihzKSB7IHJldHVybiBzLnJlcGxhY2UoLyheXFxzKnxcXHMqJCkvZywgJycpOyB9O1xuXG4vKipcbiAqIENoZWNrIGlmIGBvYmpgIGlzIGFuIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gaXNPYmplY3Qob2JqKSB7XG4gIHJldHVybiBvYmogPT09IE9iamVjdChvYmopO1xufVxuXG4vKipcbiAqIFNlcmlhbGl6ZSB0aGUgZ2l2ZW4gYG9iamAuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gc2VyaWFsaXplKG9iaikge1xuICBpZiAoIWlzT2JqZWN0KG9iaikpIHJldHVybiBvYmo7XG4gIHZhciBwYWlycyA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKG51bGwgIT0gb2JqW2tleV0pIHtcbiAgICAgIHB1c2hFbmNvZGVkS2V5VmFsdWVQYWlyKHBhaXJzLCBrZXksIG9ialtrZXldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICByZXR1cm4gcGFpcnMuam9pbignJicpO1xufVxuXG4vKipcbiAqIEhlbHBzICdzZXJpYWxpemUnIHdpdGggc2VyaWFsaXppbmcgYXJyYXlzLlxuICogTXV0YXRlcyB0aGUgcGFpcnMgYXJyYXkuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gcGFpcnNcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbFxuICovXG5cbmZ1bmN0aW9uIHB1c2hFbmNvZGVkS2V5VmFsdWVQYWlyKHBhaXJzLCBrZXksIHZhbCkge1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgcmV0dXJuIHZhbC5mb3JFYWNoKGZ1bmN0aW9uKHYpIHtcbiAgICAgIHB1c2hFbmNvZGVkS2V5VmFsdWVQYWlyKHBhaXJzLCBrZXksIHYpO1xuICAgIH0pO1xuICB9XG4gIHBhaXJzLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KGtleSlcbiAgICArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWwpKTtcbn1cblxuLyoqXG4gKiBFeHBvc2Ugc2VyaWFsaXphdGlvbiBtZXRob2QuXG4gKi9cblxuIHJlcXVlc3Quc2VyaWFsaXplT2JqZWN0ID0gc2VyaWFsaXplO1xuXG4gLyoqXG4gICogUGFyc2UgdGhlIGdpdmVuIHgtd3d3LWZvcm0tdXJsZW5jb2RlZCBgc3RyYC5cbiAgKlxuICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICogQGFwaSBwcml2YXRlXG4gICovXG5cbmZ1bmN0aW9uIHBhcnNlU3RyaW5nKHN0cikge1xuICB2YXIgb2JqID0ge307XG4gIHZhciBwYWlycyA9IHN0ci5zcGxpdCgnJicpO1xuICB2YXIgcGFydHM7XG4gIHZhciBwYWlyO1xuXG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBwYWlycy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgIHBhaXIgPSBwYWlyc1tpXTtcbiAgICBwYXJ0cyA9IHBhaXIuc3BsaXQoJz0nKTtcbiAgICBvYmpbZGVjb2RlVVJJQ29tcG9uZW50KHBhcnRzWzBdKV0gPSBkZWNvZGVVUklDb21wb25lbnQocGFydHNbMV0pO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxuLyoqXG4gKiBFeHBvc2UgcGFyc2VyLlxuICovXG5cbnJlcXVlc3QucGFyc2VTdHJpbmcgPSBwYXJzZVN0cmluZztcblxuLyoqXG4gKiBEZWZhdWx0IE1JTUUgdHlwZSBtYXAuXG4gKlxuICogICAgIHN1cGVyYWdlbnQudHlwZXMueG1sID0gJ2FwcGxpY2F0aW9uL3htbCc7XG4gKlxuICovXG5cbnJlcXVlc3QudHlwZXMgPSB7XG4gIGh0bWw6ICd0ZXh0L2h0bWwnLFxuICBqc29uOiAnYXBwbGljYXRpb24vanNvbicsXG4gIHhtbDogJ2FwcGxpY2F0aW9uL3htbCcsXG4gIHVybGVuY29kZWQ6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxuICAnZm9ybSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxuICAnZm9ybS1kYXRhJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbn07XG5cbi8qKlxuICogRGVmYXVsdCBzZXJpYWxpemF0aW9uIG1hcC5cbiAqXG4gKiAgICAgc3VwZXJhZ2VudC5zZXJpYWxpemVbJ2FwcGxpY2F0aW9uL3htbCddID0gZnVuY3Rpb24ob2JqKXtcbiAqICAgICAgIHJldHVybiAnZ2VuZXJhdGVkIHhtbCBoZXJlJztcbiAqICAgICB9O1xuICpcbiAqL1xuXG4gcmVxdWVzdC5zZXJpYWxpemUgPSB7XG4gICAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJzogc2VyaWFsaXplLFxuICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBKU09OLnN0cmluZ2lmeVxuIH07XG5cbiAvKipcbiAgKiBEZWZhdWx0IHBhcnNlcnMuXG4gICpcbiAgKiAgICAgc3VwZXJhZ2VudC5wYXJzZVsnYXBwbGljYXRpb24veG1sJ10gPSBmdW5jdGlvbihzdHIpe1xuICAqICAgICAgIHJldHVybiB7IG9iamVjdCBwYXJzZWQgZnJvbSBzdHIgfTtcbiAgKiAgICAgfTtcbiAgKlxuICAqL1xuXG5yZXF1ZXN0LnBhcnNlID0ge1xuICAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJzogcGFyc2VTdHJpbmcsXG4gICdhcHBsaWNhdGlvbi9qc29uJzogSlNPTi5wYXJzZVxufTtcblxuLyoqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gaGVhZGVyIGBzdHJgIGludG9cbiAqIGFuIG9iamVjdCBjb250YWluaW5nIHRoZSBtYXBwZWQgZmllbGRzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHBhcnNlSGVhZGVyKHN0cikge1xuICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoL1xccj9cXG4vKTtcbiAgdmFyIGZpZWxkcyA9IHt9O1xuICB2YXIgaW5kZXg7XG4gIHZhciBsaW5lO1xuICB2YXIgZmllbGQ7XG4gIHZhciB2YWw7XG5cbiAgbGluZXMucG9wKCk7IC8vIHRyYWlsaW5nIENSTEZcblxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gbGluZXMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICBsaW5lID0gbGluZXNbaV07XG4gICAgaW5kZXggPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICBmaWVsZCA9IGxpbmUuc2xpY2UoMCwgaW5kZXgpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFsID0gdHJpbShsaW5lLnNsaWNlKGluZGV4ICsgMSkpO1xuICAgIGZpZWxkc1tmaWVsZF0gPSB2YWw7XG4gIH1cblxuICByZXR1cm4gZmllbGRzO1xufVxuXG4vKipcbiAqIENoZWNrIGlmIGBtaW1lYCBpcyBqc29uIG9yIGhhcyAranNvbiBzdHJ1Y3R1cmVkIHN5bnRheCBzdWZmaXguXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1pbWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBpc0pTT04obWltZSkge1xuICByZXR1cm4gL1tcXC8rXWpzb25cXGIvLnRlc3QobWltZSk7XG59XG5cbi8qKlxuICogUmV0dXJuIHRoZSBtaW1lIHR5cGUgZm9yIHRoZSBnaXZlbiBgc3RyYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiB0eXBlKHN0cil7XG4gIHJldHVybiBzdHIuc3BsaXQoLyAqOyAqLykuc2hpZnQoKTtcbn07XG5cbi8qKlxuICogUmV0dXJuIGhlYWRlciBmaWVsZCBwYXJhbWV0ZXJzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHBhcmFtcyhzdHIpe1xuICByZXR1cm4gcmVkdWNlKHN0ci5zcGxpdCgvICo7ICovKSwgZnVuY3Rpb24ob2JqLCBzdHIpe1xuICAgIHZhciBwYXJ0cyA9IHN0ci5zcGxpdCgvICo9ICovKVxuICAgICAgLCBrZXkgPSBwYXJ0cy5zaGlmdCgpXG4gICAgICAsIHZhbCA9IHBhcnRzLnNoaWZ0KCk7XG5cbiAgICBpZiAoa2V5ICYmIHZhbCkgb2JqW2tleV0gPSB2YWw7XG4gICAgcmV0dXJuIG9iajtcbiAgfSwge30pO1xufTtcblxuLyoqXG4gKiBJbml0aWFsaXplIGEgbmV3IGBSZXNwb25zZWAgd2l0aCB0aGUgZ2l2ZW4gYHhocmAuXG4gKlxuICogIC0gc2V0IGZsYWdzICgub2ssIC5lcnJvciwgZXRjKVxuICogIC0gcGFyc2UgaGVhZGVyXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogIEFsaWFzaW5nIGBzdXBlcmFnZW50YCBhcyBgcmVxdWVzdGAgaXMgbmljZTpcbiAqXG4gKiAgICAgIHJlcXVlc3QgPSBzdXBlcmFnZW50O1xuICpcbiAqICBXZSBjYW4gdXNlIHRoZSBwcm9taXNlLWxpa2UgQVBJLCBvciBwYXNzIGNhbGxiYWNrczpcbiAqXG4gKiAgICAgIHJlcXVlc3QuZ2V0KCcvJykuZW5kKGZ1bmN0aW9uKHJlcyl7fSk7XG4gKiAgICAgIHJlcXVlc3QuZ2V0KCcvJywgZnVuY3Rpb24ocmVzKXt9KTtcbiAqXG4gKiAgU2VuZGluZyBkYXRhIGNhbiBiZSBjaGFpbmVkOlxuICpcbiAqICAgICAgcmVxdWVzdFxuICogICAgICAgIC5wb3N0KCcvdXNlcicpXG4gKiAgICAgICAgLnNlbmQoeyBuYW1lOiAndGonIH0pXG4gKiAgICAgICAgLmVuZChmdW5jdGlvbihyZXMpe30pO1xuICpcbiAqICBPciBwYXNzZWQgdG8gYC5zZW5kKClgOlxuICpcbiAqICAgICAgcmVxdWVzdFxuICogICAgICAgIC5wb3N0KCcvdXNlcicpXG4gKiAgICAgICAgLnNlbmQoeyBuYW1lOiAndGonIH0sIGZ1bmN0aW9uKHJlcyl7fSk7XG4gKlxuICogIE9yIHBhc3NlZCB0byBgLnBvc3QoKWA6XG4gKlxuICogICAgICByZXF1ZXN0XG4gKiAgICAgICAgLnBvc3QoJy91c2VyJywgeyBuYW1lOiAndGonIH0pXG4gKiAgICAgICAgLmVuZChmdW5jdGlvbihyZXMpe30pO1xuICpcbiAqIE9yIGZ1cnRoZXIgcmVkdWNlZCB0byBhIHNpbmdsZSBjYWxsIGZvciBzaW1wbGUgY2FzZXM6XG4gKlxuICogICAgICByZXF1ZXN0XG4gKiAgICAgICAgLnBvc3QoJy91c2VyJywgeyBuYW1lOiAndGonIH0sIGZ1bmN0aW9uKHJlcyl7fSk7XG4gKlxuICogQHBhcmFtIHtYTUxIVFRQUmVxdWVzdH0geGhyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gUmVzcG9uc2UocmVxLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB0aGlzLnJlcSA9IHJlcTtcbiAgdGhpcy54aHIgPSB0aGlzLnJlcS54aHI7XG4gIC8vIHJlc3BvbnNlVGV4dCBpcyBhY2Nlc3NpYmxlIG9ubHkgaWYgcmVzcG9uc2VUeXBlIGlzICcnIG9yICd0ZXh0JyBhbmQgb24gb2xkZXIgYnJvd3NlcnNcbiAgdGhpcy50ZXh0ID0gKCh0aGlzLnJlcS5tZXRob2QgIT0nSEVBRCcgJiYgKHRoaXMueGhyLnJlc3BvbnNlVHlwZSA9PT0gJycgfHwgdGhpcy54aHIucmVzcG9uc2VUeXBlID09PSAndGV4dCcpKSB8fCB0eXBlb2YgdGhpcy54aHIucmVzcG9uc2VUeXBlID09PSAndW5kZWZpbmVkJylcbiAgICAgPyB0aGlzLnhoci5yZXNwb25zZVRleHRcbiAgICAgOiBudWxsO1xuICB0aGlzLnN0YXR1c1RleHQgPSB0aGlzLnJlcS54aHIuc3RhdHVzVGV4dDtcbiAgdGhpcy5zZXRTdGF0dXNQcm9wZXJ0aWVzKHRoaXMueGhyLnN0YXR1cyk7XG4gIHRoaXMuaGVhZGVyID0gdGhpcy5oZWFkZXJzID0gcGFyc2VIZWFkZXIodGhpcy54aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpO1xuICAvLyBnZXRBbGxSZXNwb25zZUhlYWRlcnMgc29tZXRpbWVzIGZhbHNlbHkgcmV0dXJucyBcIlwiIGZvciBDT1JTIHJlcXVlc3RzLCBidXRcbiAgLy8gZ2V0UmVzcG9uc2VIZWFkZXIgc3RpbGwgd29ya3MuIHNvIHdlIGdldCBjb250ZW50LXR5cGUgZXZlbiBpZiBnZXR0aW5nXG4gIC8vIG90aGVyIGhlYWRlcnMgZmFpbHMuXG4gIHRoaXMuaGVhZGVyWydjb250ZW50LXR5cGUnXSA9IHRoaXMueGhyLmdldFJlc3BvbnNlSGVhZGVyKCdjb250ZW50LXR5cGUnKTtcbiAgdGhpcy5zZXRIZWFkZXJQcm9wZXJ0aWVzKHRoaXMuaGVhZGVyKTtcbiAgdGhpcy5ib2R5ID0gdGhpcy5yZXEubWV0aG9kICE9ICdIRUFEJ1xuICAgID8gdGhpcy5wYXJzZUJvZHkodGhpcy50ZXh0ID8gdGhpcy50ZXh0IDogdGhpcy54aHIucmVzcG9uc2UpXG4gICAgOiBudWxsO1xufVxuXG4vKipcbiAqIEdldCBjYXNlLWluc2Vuc2l0aXZlIGBmaWVsZGAgdmFsdWUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlc3BvbnNlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbihmaWVsZCl7XG4gIHJldHVybiB0aGlzLmhlYWRlcltmaWVsZC50b0xvd2VyQ2FzZSgpXTtcbn07XG5cbi8qKlxuICogU2V0IGhlYWRlciByZWxhdGVkIHByb3BlcnRpZXM6XG4gKlxuICogICAtIGAudHlwZWAgdGhlIGNvbnRlbnQgdHlwZSB3aXRob3V0IHBhcmFtc1xuICpcbiAqIEEgcmVzcG9uc2Ugb2YgXCJDb250ZW50LVR5cGU6IHRleHQvcGxhaW47IGNoYXJzZXQ9dXRmLThcIlxuICogd2lsbCBwcm92aWRlIHlvdSB3aXRoIGEgYC50eXBlYCBvZiBcInRleHQvcGxhaW5cIi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaGVhZGVyXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXNwb25zZS5wcm90b3R5cGUuc2V0SGVhZGVyUHJvcGVydGllcyA9IGZ1bmN0aW9uKGhlYWRlcil7XG4gIC8vIGNvbnRlbnQtdHlwZVxuICB2YXIgY3QgPSB0aGlzLmhlYWRlclsnY29udGVudC10eXBlJ10gfHwgJyc7XG4gIHRoaXMudHlwZSA9IHR5cGUoY3QpO1xuXG4gIC8vIHBhcmFtc1xuICB2YXIgb2JqID0gcGFyYW1zKGN0KTtcbiAgZm9yICh2YXIga2V5IGluIG9iaikgdGhpc1trZXldID0gb2JqW2tleV07XG59O1xuXG4vKipcbiAqIFBhcnNlIHRoZSBnaXZlbiBib2R5IGBzdHJgLlxuICpcbiAqIFVzZWQgZm9yIGF1dG8tcGFyc2luZyBvZiBib2RpZXMuIFBhcnNlcnNcbiAqIGFyZSBkZWZpbmVkIG9uIHRoZSBgc3VwZXJhZ2VudC5wYXJzZWAgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge01peGVkfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVzcG9uc2UucHJvdG90eXBlLnBhcnNlQm9keSA9IGZ1bmN0aW9uKHN0cil7XG4gIHZhciBwYXJzZSA9IHJlcXVlc3QucGFyc2VbdGhpcy50eXBlXTtcbiAgcmV0dXJuIHBhcnNlICYmIHN0ciAmJiAoc3RyLmxlbmd0aCB8fCBzdHIgaW5zdGFuY2VvZiBPYmplY3QpXG4gICAgPyBwYXJzZShzdHIpXG4gICAgOiBudWxsO1xufTtcblxuLyoqXG4gKiBTZXQgZmxhZ3Mgc3VjaCBhcyBgLm9rYCBiYXNlZCBvbiBgc3RhdHVzYC5cbiAqXG4gKiBGb3IgZXhhbXBsZSBhIDJ4eCByZXNwb25zZSB3aWxsIGdpdmUgeW91IGEgYC5va2Agb2YgX190cnVlX19cbiAqIHdoZXJlYXMgNXh4IHdpbGwgYmUgX19mYWxzZV9fIGFuZCBgLmVycm9yYCB3aWxsIGJlIF9fdHJ1ZV9fLiBUaGVcbiAqIGAuY2xpZW50RXJyb3JgIGFuZCBgLnNlcnZlckVycm9yYCBhcmUgYWxzbyBhdmFpbGFibGUgdG8gYmUgbW9yZVxuICogc3BlY2lmaWMsIGFuZCBgLnN0YXR1c1R5cGVgIGlzIHRoZSBjbGFzcyBvZiBlcnJvciByYW5naW5nIGZyb20gMS4uNVxuICogc29tZXRpbWVzIHVzZWZ1bCBmb3IgbWFwcGluZyByZXNwb25kIGNvbG9ycyBldGMuXG4gKlxuICogXCJzdWdhclwiIHByb3BlcnRpZXMgYXJlIGFsc28gZGVmaW5lZCBmb3IgY29tbW9uIGNhc2VzLiBDdXJyZW50bHkgcHJvdmlkaW5nOlxuICpcbiAqICAgLSAubm9Db250ZW50XG4gKiAgIC0gLmJhZFJlcXVlc3RcbiAqICAgLSAudW5hdXRob3JpemVkXG4gKiAgIC0gLm5vdEFjY2VwdGFibGVcbiAqICAgLSAubm90Rm91bmRcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gc3RhdHVzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXNwb25zZS5wcm90b3R5cGUuc2V0U3RhdHVzUHJvcGVydGllcyA9IGZ1bmN0aW9uKHN0YXR1cyl7XG4gIC8vIGhhbmRsZSBJRTkgYnVnOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEwMDQ2OTcyL21zaWUtcmV0dXJucy1zdGF0dXMtY29kZS1vZi0xMjIzLWZvci1hamF4LXJlcXVlc3RcbiAgaWYgKHN0YXR1cyA9PT0gMTIyMykge1xuICAgIHN0YXR1cyA9IDIwNDtcbiAgfVxuXG4gIHZhciB0eXBlID0gc3RhdHVzIC8gMTAwIHwgMDtcblxuICAvLyBzdGF0dXMgLyBjbGFzc1xuICB0aGlzLnN0YXR1cyA9IHRoaXMuc3RhdHVzQ29kZSA9IHN0YXR1cztcbiAgdGhpcy5zdGF0dXNUeXBlID0gdHlwZTtcblxuICAvLyBiYXNpY3NcbiAgdGhpcy5pbmZvID0gMSA9PSB0eXBlO1xuICB0aGlzLm9rID0gMiA9PSB0eXBlO1xuICB0aGlzLmNsaWVudEVycm9yID0gNCA9PSB0eXBlO1xuICB0aGlzLnNlcnZlckVycm9yID0gNSA9PSB0eXBlO1xuICB0aGlzLmVycm9yID0gKDQgPT0gdHlwZSB8fCA1ID09IHR5cGUpXG4gICAgPyB0aGlzLnRvRXJyb3IoKVxuICAgIDogZmFsc2U7XG5cbiAgLy8gc3VnYXJcbiAgdGhpcy5hY2NlcHRlZCA9IDIwMiA9PSBzdGF0dXM7XG4gIHRoaXMubm9Db250ZW50ID0gMjA0ID09IHN0YXR1cztcbiAgdGhpcy5iYWRSZXF1ZXN0ID0gNDAwID09IHN0YXR1cztcbiAgdGhpcy51bmF1dGhvcml6ZWQgPSA0MDEgPT0gc3RhdHVzO1xuICB0aGlzLm5vdEFjY2VwdGFibGUgPSA0MDYgPT0gc3RhdHVzO1xuICB0aGlzLm5vdEZvdW5kID0gNDA0ID09IHN0YXR1cztcbiAgdGhpcy5mb3JiaWRkZW4gPSA0MDMgPT0gc3RhdHVzO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYW4gYEVycm9yYCByZXByZXNlbnRhdGl2ZSBvZiB0aGlzIHJlc3BvbnNlLlxuICpcbiAqIEByZXR1cm4ge0Vycm9yfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXNwb25zZS5wcm90b3R5cGUudG9FcnJvciA9IGZ1bmN0aW9uKCl7XG4gIHZhciByZXEgPSB0aGlzLnJlcTtcbiAgdmFyIG1ldGhvZCA9IHJlcS5tZXRob2Q7XG4gIHZhciB1cmwgPSByZXEudXJsO1xuXG4gIHZhciBtc2cgPSAnY2Fubm90ICcgKyBtZXRob2QgKyAnICcgKyB1cmwgKyAnICgnICsgdGhpcy5zdGF0dXMgKyAnKSc7XG4gIHZhciBlcnIgPSBuZXcgRXJyb3IobXNnKTtcbiAgZXJyLnN0YXR1cyA9IHRoaXMuc3RhdHVzO1xuICBlcnIubWV0aG9kID0gbWV0aG9kO1xuICBlcnIudXJsID0gdXJsO1xuXG4gIHJldHVybiBlcnI7XG59O1xuXG4vKipcbiAqIEV4cG9zZSBgUmVzcG9uc2VgLlxuICovXG5cbnJlcXVlc3QuUmVzcG9uc2UgPSBSZXNwb25zZTtcblxuLyoqXG4gKiBJbml0aWFsaXplIGEgbmV3IGBSZXF1ZXN0YCB3aXRoIHRoZSBnaXZlbiBgbWV0aG9kYCBhbmQgYHVybGAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZFxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBSZXF1ZXN0KG1ldGhvZCwgdXJsKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgRW1pdHRlci5jYWxsKHRoaXMpO1xuICB0aGlzLl9xdWVyeSA9IHRoaXMuX3F1ZXJ5IHx8IFtdO1xuICB0aGlzLm1ldGhvZCA9IG1ldGhvZDtcbiAgdGhpcy51cmwgPSB1cmw7XG4gIHRoaXMuaGVhZGVyID0ge307XG4gIHRoaXMuX2hlYWRlciA9IHt9O1xuICB0aGlzLm9uKCdlbmQnLCBmdW5jdGlvbigpe1xuICAgIHZhciBlcnIgPSBudWxsO1xuICAgIHZhciByZXMgPSBudWxsO1xuXG4gICAgdHJ5IHtcbiAgICAgIHJlcyA9IG5ldyBSZXNwb25zZShzZWxmKTtcbiAgICB9IGNhdGNoKGUpIHtcbiAgICAgIGVyciA9IG5ldyBFcnJvcignUGFyc2VyIGlzIHVuYWJsZSB0byBwYXJzZSB0aGUgcmVzcG9uc2UnKTtcbiAgICAgIGVyci5wYXJzZSA9IHRydWU7XG4gICAgICBlcnIub3JpZ2luYWwgPSBlO1xuICAgICAgLy8gaXNzdWUgIzY3NTogcmV0dXJuIHRoZSByYXcgcmVzcG9uc2UgaWYgdGhlIHJlc3BvbnNlIHBhcnNpbmcgZmFpbHNcbiAgICAgIGVyci5yYXdSZXNwb25zZSA9IHNlbGYueGhyICYmIHNlbGYueGhyLnJlc3BvbnNlVGV4dCA/IHNlbGYueGhyLnJlc3BvbnNlVGV4dCA6IG51bGw7XG4gICAgICByZXR1cm4gc2VsZi5jYWxsYmFjayhlcnIpO1xuICAgIH1cblxuICAgIHNlbGYuZW1pdCgncmVzcG9uc2UnLCByZXMpO1xuXG4gICAgaWYgKGVycikge1xuICAgICAgcmV0dXJuIHNlbGYuY2FsbGJhY2soZXJyLCByZXMpO1xuICAgIH1cblxuICAgIGlmIChyZXMuc3RhdHVzID49IDIwMCAmJiByZXMuc3RhdHVzIDwgMzAwKSB7XG4gICAgICByZXR1cm4gc2VsZi5jYWxsYmFjayhlcnIsIHJlcyk7XG4gICAgfVxuXG4gICAgdmFyIG5ld19lcnIgPSBuZXcgRXJyb3IocmVzLnN0YXR1c1RleHQgfHwgJ1Vuc3VjY2Vzc2Z1bCBIVFRQIHJlc3BvbnNlJyk7XG4gICAgbmV3X2Vyci5vcmlnaW5hbCA9IGVycjtcbiAgICBuZXdfZXJyLnJlc3BvbnNlID0gcmVzO1xuICAgIG5ld19lcnIuc3RhdHVzID0gcmVzLnN0YXR1cztcblxuICAgIHNlbGYuY2FsbGJhY2sobmV3X2VyciwgcmVzKTtcbiAgfSk7XG59XG5cbi8qKlxuICogTWl4aW4gYEVtaXR0ZXJgLlxuICovXG5cbkVtaXR0ZXIoUmVxdWVzdC5wcm90b3R5cGUpO1xuXG4vKipcbiAqIEFsbG93IGZvciBleHRlbnNpb25cbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbihmbikge1xuICBmbih0aGlzKTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8qKlxuICogU2V0IHRpbWVvdXQgdG8gYG1zYC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbXNcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS50aW1lb3V0ID0gZnVuY3Rpb24obXMpe1xuICB0aGlzLl90aW1lb3V0ID0gbXM7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBDbGVhciBwcmV2aW91cyB0aW1lb3V0LlxuICpcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5jbGVhclRpbWVvdXQgPSBmdW5jdGlvbigpe1xuICB0aGlzLl90aW1lb3V0ID0gMDtcbiAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVyKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEFib3J0IHRoZSByZXF1ZXN0LCBhbmQgY2xlYXIgcG90ZW50aWFsIHRpbWVvdXQuXG4gKlxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuYWJvcnQgPSBmdW5jdGlvbigpe1xuICBpZiAodGhpcy5hYm9ydGVkKSByZXR1cm47XG4gIHRoaXMuYWJvcnRlZCA9IHRydWU7XG4gIHRoaXMueGhyLmFib3J0KCk7XG4gIHRoaXMuY2xlYXJUaW1lb3V0KCk7XG4gIHRoaXMuZW1pdCgnYWJvcnQnKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCBoZWFkZXIgYGZpZWxkYCB0byBgdmFsYCwgb3IgbXVsdGlwbGUgZmllbGRzIHdpdGggb25lIG9iamVjdC5cbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgICAgIHJlcS5nZXQoJy8nKVxuICogICAgICAgIC5zZXQoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uJylcbiAqICAgICAgICAuc2V0KCdYLUFQSS1LZXknLCAnZm9vYmFyJylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiAgICAgIHJlcS5nZXQoJy8nKVxuICogICAgICAgIC5zZXQoeyBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJywgJ1gtQVBJLUtleSc6ICdmb29iYXInIH0pXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBmaWVsZFxuICogQHBhcmFtIHtTdHJpbmd9IHZhbFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uKGZpZWxkLCB2YWwpe1xuICBpZiAoaXNPYmplY3QoZmllbGQpKSB7XG4gICAgZm9yICh2YXIga2V5IGluIGZpZWxkKSB7XG4gICAgICB0aGlzLnNldChrZXksIGZpZWxkW2tleV0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICB0aGlzLl9oZWFkZXJbZmllbGQudG9Mb3dlckNhc2UoKV0gPSB2YWw7XG4gIHRoaXMuaGVhZGVyW2ZpZWxkXSA9IHZhbDtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBoZWFkZXIgYGZpZWxkYC5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqICAgICAgcmVxLmdldCgnLycpXG4gKiAgICAgICAgLnVuc2V0KCdVc2VyLUFnZW50JylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZmllbGRcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS51bnNldCA9IGZ1bmN0aW9uKGZpZWxkKXtcbiAgZGVsZXRlIHRoaXMuX2hlYWRlcltmaWVsZC50b0xvd2VyQ2FzZSgpXTtcbiAgZGVsZXRlIHRoaXMuaGVhZGVyW2ZpZWxkXTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEdldCBjYXNlLWluc2Vuc2l0aXZlIGhlYWRlciBgZmllbGRgIHZhbHVlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWVsZFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuZ2V0SGVhZGVyID0gZnVuY3Rpb24oZmllbGQpe1xuICByZXR1cm4gdGhpcy5faGVhZGVyW2ZpZWxkLnRvTG93ZXJDYXNlKCldO1xufTtcblxuLyoqXG4gKiBTZXQgQ29udGVudC1UeXBlIHRvIGB0eXBlYCwgbWFwcGluZyB2YWx1ZXMgZnJvbSBgcmVxdWVzdC50eXBlc2AuXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgICBzdXBlcmFnZW50LnR5cGVzLnhtbCA9ICdhcHBsaWNhdGlvbi94bWwnO1xuICpcbiAqICAgICAgcmVxdWVzdC5wb3N0KCcvJylcbiAqICAgICAgICAudHlwZSgneG1sJylcbiAqICAgICAgICAuc2VuZCh4bWxzdHJpbmcpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogICAgICByZXF1ZXN0LnBvc3QoJy8nKVxuICogICAgICAgIC50eXBlKCdhcHBsaWNhdGlvbi94bWwnKVxuICogICAgICAgIC5zZW5kKHhtbHN0cmluZylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLnR5cGUgPSBmdW5jdGlvbih0eXBlKXtcbiAgdGhpcy5zZXQoJ0NvbnRlbnQtVHlwZScsIHJlcXVlc3QudHlwZXNbdHlwZV0gfHwgdHlwZSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBGb3JjZSBnaXZlbiBwYXJzZXJcbiAqXG4gKiBTZXRzIHRoZSBib2R5IHBhcnNlciBubyBtYXR0ZXIgdHlwZS5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uKGZuKXtcbiAgdGhpcy5fcGFyc2VyID0gZm47XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgQWNjZXB0IHRvIGB0eXBlYCwgbWFwcGluZyB2YWx1ZXMgZnJvbSBgcmVxdWVzdC50eXBlc2AuXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgICBzdXBlcmFnZW50LnR5cGVzLmpzb24gPSAnYXBwbGljYXRpb24vanNvbic7XG4gKlxuICogICAgICByZXF1ZXN0LmdldCgnL2FnZW50JylcbiAqICAgICAgICAuYWNjZXB0KCdqc29uJylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiAgICAgIHJlcXVlc3QuZ2V0KCcvYWdlbnQnKVxuICogICAgICAgIC5hY2NlcHQoJ2FwcGxpY2F0aW9uL2pzb24nKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBhY2NlcHRcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5hY2NlcHQgPSBmdW5jdGlvbih0eXBlKXtcbiAgdGhpcy5zZXQoJ0FjY2VwdCcsIHJlcXVlc3QudHlwZXNbdHlwZV0gfHwgdHlwZSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgQXV0aG9yaXphdGlvbiBmaWVsZCB2YWx1ZSB3aXRoIGB1c2VyYCBhbmQgYHBhc3NgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1c2VyXG4gKiBAcGFyYW0ge1N0cmluZ30gcGFzc1xuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmF1dGggPSBmdW5jdGlvbih1c2VyLCBwYXNzKXtcbiAgdmFyIHN0ciA9IGJ0b2EodXNlciArICc6JyArIHBhc3MpO1xuICB0aGlzLnNldCgnQXV0aG9yaXphdGlvbicsICdCYXNpYyAnICsgc3RyKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiogQWRkIHF1ZXJ5LXN0cmluZyBgdmFsYC5cbipcbiogRXhhbXBsZXM6XG4qXG4qICAgcmVxdWVzdC5nZXQoJy9zaG9lcycpXG4qICAgICAucXVlcnkoJ3NpemU9MTAnKVxuKiAgICAgLnF1ZXJ5KHsgY29sb3I6ICdibHVlJyB9KVxuKlxuKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IHZhbFxuKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiogQGFwaSBwdWJsaWNcbiovXG5cblJlcXVlc3QucHJvdG90eXBlLnF1ZXJ5ID0gZnVuY3Rpb24odmFsKXtcbiAgaWYgKCdzdHJpbmcnICE9IHR5cGVvZiB2YWwpIHZhbCA9IHNlcmlhbGl6ZSh2YWwpO1xuICBpZiAodmFsKSB0aGlzLl9xdWVyeS5wdXNoKHZhbCk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBXcml0ZSB0aGUgZmllbGQgYG5hbWVgIGFuZCBgdmFsYCBmb3IgXCJtdWx0aXBhcnQvZm9ybS1kYXRhXCJcbiAqIHJlcXVlc3QgYm9kaWVzLlxuICpcbiAqIGBgYCBqc1xuICogcmVxdWVzdC5wb3N0KCcvdXBsb2FkJylcbiAqICAgLmZpZWxkKCdmb28nLCAnYmFyJylcbiAqICAgLmVuZChjYWxsYmFjayk7XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtTdHJpbmd8QmxvYnxGaWxlfSB2YWxcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5maWVsZCA9IGZ1bmN0aW9uKG5hbWUsIHZhbCl7XG4gIGlmICghdGhpcy5fZm9ybURhdGEpIHRoaXMuX2Zvcm1EYXRhID0gbmV3IHJvb3QuRm9ybURhdGEoKTtcbiAgdGhpcy5fZm9ybURhdGEuYXBwZW5kKG5hbWUsIHZhbCk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBRdWV1ZSB0aGUgZ2l2ZW4gYGZpbGVgIGFzIGFuIGF0dGFjaG1lbnQgdG8gdGhlIHNwZWNpZmllZCBgZmllbGRgLFxuICogd2l0aCBvcHRpb25hbCBgZmlsZW5hbWVgLlxuICpcbiAqIGBgYCBqc1xuICogcmVxdWVzdC5wb3N0KCcvdXBsb2FkJylcbiAqICAgLmF0dGFjaChuZXcgQmxvYihbJzxhIGlkPVwiYVwiPjxiIGlkPVwiYlwiPmhleSE8L2I+PC9hPiddLCB7IHR5cGU6IFwidGV4dC9odG1sXCJ9KSlcbiAqICAgLmVuZChjYWxsYmFjayk7XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZmllbGRcbiAqIEBwYXJhbSB7QmxvYnxGaWxlfSBmaWxlXG4gKiBAcGFyYW0ge1N0cmluZ30gZmlsZW5hbWVcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5hdHRhY2ggPSBmdW5jdGlvbihmaWVsZCwgZmlsZSwgZmlsZW5hbWUpe1xuICBpZiAoIXRoaXMuX2Zvcm1EYXRhKSB0aGlzLl9mb3JtRGF0YSA9IG5ldyByb290LkZvcm1EYXRhKCk7XG4gIHRoaXMuX2Zvcm1EYXRhLmFwcGVuZChmaWVsZCwgZmlsZSwgZmlsZW5hbWUpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2VuZCBgZGF0YWAsIGRlZmF1bHRpbmcgdGhlIGAudHlwZSgpYCB0byBcImpzb25cIiB3aGVuXG4gKiBhbiBvYmplY3QgaXMgZ2l2ZW4uXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgICAgLy8gcXVlcnlzdHJpbmdcbiAqICAgICAgIHJlcXVlc3QuZ2V0KCcvc2VhcmNoJylcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiAgICAgICAvLyBtdWx0aXBsZSBkYXRhIFwid3JpdGVzXCJcbiAqICAgICAgIHJlcXVlc3QuZ2V0KCcvc2VhcmNoJylcbiAqICAgICAgICAgLnNlbmQoeyBzZWFyY2g6ICdxdWVyeScgfSlcbiAqICAgICAgICAgLnNlbmQoeyByYW5nZTogJzEuLjUnIH0pXG4gKiAgICAgICAgIC5zZW5kKHsgb3JkZXI6ICdkZXNjJyB9KVxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqICAgICAgIC8vIG1hbnVhbCBqc29uXG4gKiAgICAgICByZXF1ZXN0LnBvc3QoJy91c2VyJylcbiAqICAgICAgICAgLnR5cGUoJ2pzb24nKVxuICogICAgICAgICAuc2VuZCgne1wibmFtZVwiOlwidGpcIn0nKVxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqICAgICAgIC8vIGF1dG8ganNvblxuICogICAgICAgcmVxdWVzdC5wb3N0KCcvdXNlcicpXG4gKiAgICAgICAgIC5zZW5kKHsgbmFtZTogJ3RqJyB9KVxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqICAgICAgIC8vIG1hbnVhbCB4LXd3dy1mb3JtLXVybGVuY29kZWRcbiAqICAgICAgIHJlcXVlc3QucG9zdCgnL3VzZXInKVxuICogICAgICAgICAudHlwZSgnZm9ybScpXG4gKiAgICAgICAgIC5zZW5kKCduYW1lPXRqJylcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiAgICAgICAvLyBhdXRvIHgtd3d3LWZvcm0tdXJsZW5jb2RlZFxuICogICAgICAgcmVxdWVzdC5wb3N0KCcvdXNlcicpXG4gKiAgICAgICAgIC50eXBlKCdmb3JtJylcbiAqICAgICAgICAgLnNlbmQoeyBuYW1lOiAndGonIH0pXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogICAgICAgLy8gZGVmYXVsdHMgdG8geC13d3ctZm9ybS11cmxlbmNvZGVkXG4gICogICAgICByZXF1ZXN0LnBvc3QoJy91c2VyJylcbiAgKiAgICAgICAgLnNlbmQoJ25hbWU9dG9iaScpXG4gICogICAgICAgIC5zZW5kKCdzcGVjaWVzPWZlcnJldCcpXG4gICogICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBkYXRhXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uKGRhdGEpe1xuICB2YXIgb2JqID0gaXNPYmplY3QoZGF0YSk7XG4gIHZhciB0eXBlID0gdGhpcy5nZXRIZWFkZXIoJ0NvbnRlbnQtVHlwZScpO1xuXG4gIC8vIG1lcmdlXG4gIGlmIChvYmogJiYgaXNPYmplY3QodGhpcy5fZGF0YSkpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gZGF0YSkge1xuICAgICAgdGhpcy5fZGF0YVtrZXldID0gZGF0YVtrZXldO1xuICAgIH1cbiAgfSBlbHNlIGlmICgnc3RyaW5nJyA9PSB0eXBlb2YgZGF0YSkge1xuICAgIGlmICghdHlwZSkgdGhpcy50eXBlKCdmb3JtJyk7XG4gICAgdHlwZSA9IHRoaXMuZ2V0SGVhZGVyKCdDb250ZW50LVR5cGUnKTtcbiAgICBpZiAoJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcgPT0gdHlwZSkge1xuICAgICAgdGhpcy5fZGF0YSA9IHRoaXMuX2RhdGFcbiAgICAgICAgPyB0aGlzLl9kYXRhICsgJyYnICsgZGF0YVxuICAgICAgICA6IGRhdGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2RhdGEgPSAodGhpcy5fZGF0YSB8fCAnJykgKyBkYXRhO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aGlzLl9kYXRhID0gZGF0YTtcbiAgfVxuXG4gIGlmICghb2JqIHx8IGlzSG9zdChkYXRhKSkgcmV0dXJuIHRoaXM7XG4gIGlmICghdHlwZSkgdGhpcy50eXBlKCdqc29uJyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBJbnZva2UgdGhlIGNhbGxiYWNrIHdpdGggYGVycmAgYW5kIGByZXNgXG4gKiBhbmQgaGFuZGxlIGFyaXR5IGNoZWNrLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVyclxuICogQHBhcmFtIHtSZXNwb25zZX0gcmVzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5jYWxsYmFjayA9IGZ1bmN0aW9uKGVyciwgcmVzKXtcbiAgdmFyIGZuID0gdGhpcy5fY2FsbGJhY2s7XG4gIHRoaXMuY2xlYXJUaW1lb3V0KCk7XG4gIGZuKGVyciwgcmVzKTtcbn07XG5cbi8qKlxuICogSW52b2tlIGNhbGxiYWNrIHdpdGggeC1kb21haW4gZXJyb3IuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuY3Jvc3NEb21haW5FcnJvciA9IGZ1bmN0aW9uKCl7XG4gIHZhciBlcnIgPSBuZXcgRXJyb3IoJ1JlcXVlc3QgaGFzIGJlZW4gdGVybWluYXRlZFxcblBvc3NpYmxlIGNhdXNlczogdGhlIG5ldHdvcmsgaXMgb2ZmbGluZSwgT3JpZ2luIGlzIG5vdCBhbGxvd2VkIGJ5IEFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbiwgdGhlIHBhZ2UgaXMgYmVpbmcgdW5sb2FkZWQsIGV0Yy4nKTtcbiAgZXJyLmNyb3NzRG9tYWluID0gdHJ1ZTtcblxuICBlcnIuc3RhdHVzID0gdGhpcy5zdGF0dXM7XG4gIGVyci5tZXRob2QgPSB0aGlzLm1ldGhvZDtcbiAgZXJyLnVybCA9IHRoaXMudXJsO1xuXG4gIHRoaXMuY2FsbGJhY2soZXJyKTtcbn07XG5cbi8qKlxuICogSW52b2tlIGNhbGxiYWNrIHdpdGggdGltZW91dCBlcnJvci5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS50aW1lb3V0RXJyb3IgPSBmdW5jdGlvbigpe1xuICB2YXIgdGltZW91dCA9IHRoaXMuX3RpbWVvdXQ7XG4gIHZhciBlcnIgPSBuZXcgRXJyb3IoJ3RpbWVvdXQgb2YgJyArIHRpbWVvdXQgKyAnbXMgZXhjZWVkZWQnKTtcbiAgZXJyLnRpbWVvdXQgPSB0aW1lb3V0O1xuICB0aGlzLmNhbGxiYWNrKGVycik7XG59O1xuXG4vKipcbiAqIEVuYWJsZSB0cmFuc21pc3Npb24gb2YgY29va2llcyB3aXRoIHgtZG9tYWluIHJlcXVlc3RzLlxuICpcbiAqIE5vdGUgdGhhdCBmb3IgdGhpcyB0byB3b3JrIHRoZSBvcmlnaW4gbXVzdCBub3QgYmVcbiAqIHVzaW5nIFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luXCIgd2l0aCBhIHdpbGRjYXJkLFxuICogYW5kIGFsc28gbXVzdCBzZXQgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1DcmVkZW50aWFsc1wiXG4gKiB0byBcInRydWVcIi5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLndpdGhDcmVkZW50aWFscyA9IGZ1bmN0aW9uKCl7XG4gIHRoaXMuX3dpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBJbml0aWF0ZSByZXF1ZXN0LCBpbnZva2luZyBjYWxsYmFjayBgZm4ocmVzKWBcbiAqIHdpdGggYW4gaW5zdGFuY2VvZiBgUmVzcG9uc2VgLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24oZm4pe1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciB4aHIgPSB0aGlzLnhociA9IHJlcXVlc3QuZ2V0WEhSKCk7XG4gIHZhciBxdWVyeSA9IHRoaXMuX3F1ZXJ5LmpvaW4oJyYnKTtcbiAgdmFyIHRpbWVvdXQgPSB0aGlzLl90aW1lb3V0O1xuICB2YXIgZGF0YSA9IHRoaXMuX2Zvcm1EYXRhIHx8IHRoaXMuX2RhdGE7XG5cbiAgLy8gc3RvcmUgY2FsbGJhY2tcbiAgdGhpcy5fY2FsbGJhY2sgPSBmbiB8fCBub29wO1xuXG4gIC8vIHN0YXRlIGNoYW5nZVxuICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKXtcbiAgICBpZiAoNCAhPSB4aHIucmVhZHlTdGF0ZSkgcmV0dXJuO1xuXG4gICAgLy8gSW4gSUU5LCByZWFkcyB0byBhbnkgcHJvcGVydHkgKGUuZy4gc3RhdHVzKSBvZmYgb2YgYW4gYWJvcnRlZCBYSFIgd2lsbFxuICAgIC8vIHJlc3VsdCBpbiB0aGUgZXJyb3IgXCJDb3VsZCBub3QgY29tcGxldGUgdGhlIG9wZXJhdGlvbiBkdWUgdG8gZXJyb3IgYzAwYzAyM2ZcIlxuICAgIHZhciBzdGF0dXM7XG4gICAgdHJ5IHsgc3RhdHVzID0geGhyLnN0YXR1cyB9IGNhdGNoKGUpIHsgc3RhdHVzID0gMDsgfVxuXG4gICAgaWYgKDAgPT0gc3RhdHVzKSB7XG4gICAgICBpZiAoc2VsZi50aW1lZG91dCkgcmV0dXJuIHNlbGYudGltZW91dEVycm9yKCk7XG4gICAgICBpZiAoc2VsZi5hYm9ydGVkKSByZXR1cm47XG4gICAgICByZXR1cm4gc2VsZi5jcm9zc0RvbWFpbkVycm9yKCk7XG4gICAgfVxuICAgIHNlbGYuZW1pdCgnZW5kJyk7XG4gIH07XG5cbiAgLy8gcHJvZ3Jlc3NcbiAgdmFyIGhhbmRsZVByb2dyZXNzID0gZnVuY3Rpb24oZSl7XG4gICAgaWYgKGUudG90YWwgPiAwKSB7XG4gICAgICBlLnBlcmNlbnQgPSBlLmxvYWRlZCAvIGUudG90YWwgKiAxMDA7XG4gICAgfVxuICAgIHNlbGYuZW1pdCgncHJvZ3Jlc3MnLCBlKTtcbiAgfTtcbiAgaWYgKHRoaXMuaGFzTGlzdGVuZXJzKCdwcm9ncmVzcycpKSB7XG4gICAgeGhyLm9ucHJvZ3Jlc3MgPSBoYW5kbGVQcm9ncmVzcztcbiAgfVxuICB0cnkge1xuICAgIGlmICh4aHIudXBsb2FkICYmIHRoaXMuaGFzTGlzdGVuZXJzKCdwcm9ncmVzcycpKSB7XG4gICAgICB4aHIudXBsb2FkLm9ucHJvZ3Jlc3MgPSBoYW5kbGVQcm9ncmVzcztcbiAgICB9XG4gIH0gY2F0Y2goZSkge1xuICAgIC8vIEFjY2Vzc2luZyB4aHIudXBsb2FkIGZhaWxzIGluIElFIGZyb20gYSB3ZWIgd29ya2VyLCBzbyBqdXN0IHByZXRlbmQgaXQgZG9lc24ndCBleGlzdC5cbiAgICAvLyBSZXBvcnRlZCBoZXJlOlxuICAgIC8vIGh0dHBzOi8vY29ubmVjdC5taWNyb3NvZnQuY29tL0lFL2ZlZWRiYWNrL2RldGFpbHMvODM3MjQ1L3htbGh0dHByZXF1ZXN0LXVwbG9hZC10aHJvd3MtaW52YWxpZC1hcmd1bWVudC13aGVuLXVzZWQtZnJvbS13ZWItd29ya2VyLWNvbnRleHRcbiAgfVxuXG4gIC8vIHRpbWVvdXRcbiAgaWYgKHRpbWVvdXQgJiYgIXRoaXMuX3RpbWVyKSB7XG4gICAgdGhpcy5fdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICBzZWxmLnRpbWVkb3V0ID0gdHJ1ZTtcbiAgICAgIHNlbGYuYWJvcnQoKTtcbiAgICB9LCB0aW1lb3V0KTtcbiAgfVxuXG4gIC8vIHF1ZXJ5c3RyaW5nXG4gIGlmIChxdWVyeSkge1xuICAgIHF1ZXJ5ID0gcmVxdWVzdC5zZXJpYWxpemVPYmplY3QocXVlcnkpO1xuICAgIHRoaXMudXJsICs9IH50aGlzLnVybC5pbmRleE9mKCc/JylcbiAgICAgID8gJyYnICsgcXVlcnlcbiAgICAgIDogJz8nICsgcXVlcnk7XG4gIH1cblxuICAvLyBpbml0aWF0ZSByZXF1ZXN0XG4gIHhoci5vcGVuKHRoaXMubWV0aG9kLCB0aGlzLnVybCwgdHJ1ZSk7XG5cbiAgLy8gQ09SU1xuICBpZiAodGhpcy5fd2l0aENyZWRlbnRpYWxzKSB4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcblxuICAvLyBib2R5XG4gIGlmICgnR0VUJyAhPSB0aGlzLm1ldGhvZCAmJiAnSEVBRCcgIT0gdGhpcy5tZXRob2QgJiYgJ3N0cmluZycgIT0gdHlwZW9mIGRhdGEgJiYgIWlzSG9zdChkYXRhKSkge1xuICAgIC8vIHNlcmlhbGl6ZSBzdHVmZlxuICAgIHZhciBjb250ZW50VHlwZSA9IHRoaXMuZ2V0SGVhZGVyKCdDb250ZW50LVR5cGUnKTtcbiAgICB2YXIgc2VyaWFsaXplID0gdGhpcy5fcGFyc2VyIHx8IHJlcXVlc3Quc2VyaWFsaXplW2NvbnRlbnRUeXBlID8gY29udGVudFR5cGUuc3BsaXQoJzsnKVswXSA6ICcnXTtcbiAgICBpZiAoIXNlcmlhbGl6ZSAmJiBpc0pTT04oY29udGVudFR5cGUpKSBzZXJpYWxpemUgPSByZXF1ZXN0LnNlcmlhbGl6ZVsnYXBwbGljYXRpb24vanNvbiddO1xuICAgIGlmIChzZXJpYWxpemUpIGRhdGEgPSBzZXJpYWxpemUoZGF0YSk7XG4gIH1cblxuICAvLyBzZXQgaGVhZGVyIGZpZWxkc1xuICBmb3IgKHZhciBmaWVsZCBpbiB0aGlzLmhlYWRlcikge1xuICAgIGlmIChudWxsID09IHRoaXMuaGVhZGVyW2ZpZWxkXSkgY29udGludWU7XG4gICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoZmllbGQsIHRoaXMuaGVhZGVyW2ZpZWxkXSk7XG4gIH1cblxuICAvLyBzZW5kIHN0dWZmXG4gIHRoaXMuZW1pdCgncmVxdWVzdCcsIHRoaXMpO1xuXG4gIC8vIElFMTEgeGhyLnNlbmQodW5kZWZpbmVkKSBzZW5kcyAndW5kZWZpbmVkJyBzdHJpbmcgYXMgUE9TVCBwYXlsb2FkIChpbnN0ZWFkIG9mIG5vdGhpbmcpXG4gIC8vIFdlIG5lZWQgbnVsbCBoZXJlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gIHhoci5zZW5kKHR5cGVvZiBkYXRhICE9PSAndW5kZWZpbmVkJyA/IGRhdGEgOiBudWxsKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEZhdXggcHJvbWlzZSBzdXBwb3J0XG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVsZmlsbFxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0XG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICovXG5cblJlcXVlc3QucHJvdG90eXBlLnRoZW4gPSBmdW5jdGlvbiAoZnVsZmlsbCwgcmVqZWN0KSB7XG4gIHJldHVybiB0aGlzLmVuZChmdW5jdGlvbihlcnIsIHJlcykge1xuICAgIGVyciA/IHJlamVjdChlcnIpIDogZnVsZmlsbChyZXMpO1xuICB9KTtcbn1cblxuLyoqXG4gKiBFeHBvc2UgYFJlcXVlc3RgLlxuICovXG5cbnJlcXVlc3QuUmVxdWVzdCA9IFJlcXVlc3Q7XG5cbi8qKlxuICogSXNzdWUgYSByZXF1ZXN0OlxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICAgIHJlcXVlc3QoJ0dFVCcsICcvdXNlcnMnKS5lbmQoY2FsbGJhY2spXG4gKiAgICByZXF1ZXN0KCcvdXNlcnMnKS5lbmQoY2FsbGJhY2spXG4gKiAgICByZXF1ZXN0KCcvdXNlcnMnLCBjYWxsYmFjaylcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbWV0aG9kXG4gKiBAcGFyYW0ge1N0cmluZ3xGdW5jdGlvbn0gdXJsIG9yIGNhbGxiYWNrXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiByZXF1ZXN0KG1ldGhvZCwgdXJsKSB7XG4gIC8vIGNhbGxiYWNrXG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiB1cmwpIHtcbiAgICByZXR1cm4gbmV3IFJlcXVlc3QoJ0dFVCcsIG1ldGhvZCkuZW5kKHVybCk7XG4gIH1cblxuICAvLyB1cmwgZmlyc3RcbiAgaWYgKDEgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIHJldHVybiBuZXcgUmVxdWVzdCgnR0VUJywgbWV0aG9kKTtcbiAgfVxuXG4gIHJldHVybiBuZXcgUmVxdWVzdChtZXRob2QsIHVybCk7XG59XG5cbi8qKlxuICogR0VUIGB1cmxgIHdpdGggb3B0aW9uYWwgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7TWl4ZWR8RnVuY3Rpb259IGRhdGEgb3IgZm5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5yZXF1ZXN0LmdldCA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgZm4pe1xuICB2YXIgcmVxID0gcmVxdWVzdCgnR0VUJywgdXJsKTtcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGRhdGEpIGZuID0gZGF0YSwgZGF0YSA9IG51bGw7XG4gIGlmIChkYXRhKSByZXEucXVlcnkoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuXG4vKipcbiAqIEhFQUQgYHVybGAgd2l0aCBvcHRpb25hbCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtNaXhlZHxGdW5jdGlvbn0gZGF0YSBvciBmblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3QuaGVhZCA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgZm4pe1xuICB2YXIgcmVxID0gcmVxdWVzdCgnSEVBRCcsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSBmbiA9IGRhdGEsIGRhdGEgPSBudWxsO1xuICBpZiAoZGF0YSkgcmVxLnNlbmQoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuXG4vKipcbiAqIERFTEVURSBgdXJsYCB3aXRoIG9wdGlvbmFsIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZGVsKHVybCwgZm4pe1xuICB2YXIgcmVxID0gcmVxdWVzdCgnREVMRVRFJywgdXJsKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG5cbnJlcXVlc3QuZGVsID0gZGVsO1xucmVxdWVzdC5kZWxldGUgPSBkZWw7XG5cbi8qKlxuICogUEFUQ0ggYHVybGAgd2l0aCBvcHRpb25hbCBgZGF0YWAgYW5kIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfSBkYXRhXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucmVxdWVzdC5wYXRjaCA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgZm4pe1xuICB2YXIgcmVxID0gcmVxdWVzdCgnUEFUQ0gnLCB1cmwpO1xuICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgZGF0YSkgZm4gPSBkYXRhLCBkYXRhID0gbnVsbDtcbiAgaWYgKGRhdGEpIHJlcS5zZW5kKGRhdGEpO1xuICBpZiAoZm4pIHJlcS5lbmQoZm4pO1xuICByZXR1cm4gcmVxO1xufTtcblxuLyoqXG4gKiBQT1NUIGB1cmxgIHdpdGggb3B0aW9uYWwgYGRhdGFgIGFuZCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtNaXhlZH0gZGF0YVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3QucG9zdCA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgZm4pe1xuICB2YXIgcmVxID0gcmVxdWVzdCgnUE9TVCcsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSBmbiA9IGRhdGEsIGRhdGEgPSBudWxsO1xuICBpZiAoZGF0YSkgcmVxLnNlbmQoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuXG4vKipcbiAqIFBVVCBgdXJsYCB3aXRoIG9wdGlvbmFsIGBkYXRhYCBhbmQgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7TWl4ZWR8RnVuY3Rpb259IGRhdGEgb3IgZm5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5yZXF1ZXN0LnB1dCA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgZm4pe1xuICB2YXIgcmVxID0gcmVxdWVzdCgnUFVUJywgdXJsKTtcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGRhdGEpIGZuID0gZGF0YSwgZGF0YSA9IG51bGw7XG4gIGlmIChkYXRhKSByZXEuc2VuZChkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG5cbi8qKlxuICogRXhwb3NlIGByZXF1ZXN0YC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVlc3Q7XG4iLCJcbi8qKlxuICogRXhwb3NlIGBFbWl0dGVyYC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVtaXR0ZXI7XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBhIG5ldyBgRW1pdHRlcmAuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBFbWl0dGVyKG9iaikge1xuICBpZiAob2JqKSByZXR1cm4gbWl4aW4ob2JqKTtcbn07XG5cbi8qKlxuICogTWl4aW4gdGhlIGVtaXR0ZXIgcHJvcGVydGllcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBtaXhpbihvYmopIHtcbiAgZm9yICh2YXIga2V5IGluIEVtaXR0ZXIucHJvdG90eXBlKSB7XG4gICAgb2JqW2tleV0gPSBFbWl0dGVyLnByb3RvdHlwZVtrZXldO1xuICB9XG4gIHJldHVybiBvYmo7XG59XG5cbi8qKlxuICogTGlzdGVuIG9uIHRoZSBnaXZlbiBgZXZlbnRgIHdpdGggYGZuYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5vbiA9XG5FbWl0dGVyLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuICAodGhpcy5fY2FsbGJhY2tzW2V2ZW50XSA9IHRoaXMuX2NhbGxiYWNrc1tldmVudF0gfHwgW10pXG4gICAgLnB1c2goZm4pO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQWRkcyBhbiBgZXZlbnRgIGxpc3RlbmVyIHRoYXQgd2lsbCBiZSBpbnZva2VkIGEgc2luZ2xlXG4gKiB0aW1lIHRoZW4gYXV0b21hdGljYWxseSByZW1vdmVkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbihldmVudCwgZm4pe1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcblxuICBmdW5jdGlvbiBvbigpIHtcbiAgICBzZWxmLm9mZihldmVudCwgb24pO1xuICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBvbi5mbiA9IGZuO1xuICB0aGlzLm9uKGV2ZW50LCBvbik7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgdGhlIGdpdmVuIGNhbGxiYWNrIGZvciBgZXZlbnRgIG9yIGFsbFxuICogcmVnaXN0ZXJlZCBjYWxsYmFja3MuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7RW1pdHRlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUub2ZmID1cbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9XG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuXG4gIC8vIGFsbFxuICBpZiAoMCA9PSBhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgdGhpcy5fY2FsbGJhY2tzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBzcGVjaWZpYyBldmVudFxuICB2YXIgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzW2V2ZW50XTtcbiAgaWYgKCFjYWxsYmFja3MpIHJldHVybiB0aGlzO1xuXG4gIC8vIHJlbW92ZSBhbGwgaGFuZGxlcnNcbiAgaWYgKDEgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIGRlbGV0ZSB0aGlzLl9jYWxsYmFja3NbZXZlbnRdO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gcmVtb3ZlIHNwZWNpZmljIGhhbmRsZXJcbiAgdmFyIGNiO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuICAgIGNiID0gY2FsbGJhY2tzW2ldO1xuICAgIGlmIChjYiA9PT0gZm4gfHwgY2IuZm4gPT09IGZuKSB7XG4gICAgICBjYWxsYmFja3Muc3BsaWNlKGksIDEpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBFbWl0IGBldmVudGAgd2l0aCB0aGUgZ2l2ZW4gYXJncy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEBwYXJhbSB7TWl4ZWR9IC4uLlxuICogQHJldHVybiB7RW1pdHRlcn1cbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24oZXZlbnQpe1xuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XG4gIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXG4gICAgLCBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3NbZXZlbnRdO1xuXG4gIGlmIChjYWxsYmFja3MpIHtcbiAgICBjYWxsYmFja3MgPSBjYWxsYmFja3Muc2xpY2UoMCk7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNhbGxiYWNrcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgICAgY2FsbGJhY2tzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYXJyYXkgb2YgY2FsbGJhY2tzIGZvciBgZXZlbnRgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHJldHVybiB7QXJyYXl9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuICByZXR1cm4gdGhpcy5fY2FsbGJhY2tzW2V2ZW50XSB8fCBbXTtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgdGhpcyBlbWl0dGVyIGhhcyBgZXZlbnRgIGhhbmRsZXJzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUuaGFzTGlzdGVuZXJzID0gZnVuY3Rpb24oZXZlbnQpe1xuICByZXR1cm4gISEgdGhpcy5saXN0ZW5lcnMoZXZlbnQpLmxlbmd0aDtcbn07XG4iLCJcbi8qKlxuICogUmVkdWNlIGBhcnJgIHdpdGggYGZuYC5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge01peGVkfSBpbml0aWFsXG4gKlxuICogVE9ETzogY29tYmF0aWJsZSBlcnJvciBoYW5kbGluZz9cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGFyciwgZm4sIGluaXRpYWwpeyAgXG4gIHZhciBpZHggPSAwO1xuICB2YXIgbGVuID0gYXJyLmxlbmd0aDtcbiAgdmFyIGN1cnIgPSBhcmd1bWVudHMubGVuZ3RoID09IDNcbiAgICA/IGluaXRpYWxcbiAgICA6IGFycltpZHgrK107XG5cbiAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgIGN1cnIgPSBmbi5jYWxsKG51bGwsIGN1cnIsIGFycltpZHhdLCArK2lkeCwgYXJyKTtcbiAgfVxuICBcbiAgcmV0dXJuIGN1cnI7XG59OyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGNvbnN0IGNvbnN0YW50cyA9IHtcbiAgZGF0YToge1xuICAgIHVybDogJy4uL2RhdGEvZGF0YS5qc29uJ1xuICB9LFxuICAvLyBUaGUgZmlyc3QgdGlsZSBzaXplIGhhdmUgdGhlIHByaW9yaXR5LlxuICAvLyBUaGF0IG1lYW4gd2lsbCBwYXJzZSB0aGUgdGlsZSBzaXplIGZyb20gdG9wIHRvIGJvdHRvbS5cbiAgLy8gSXRzIGJldHRlciB0byBhZGQgdGhlIGJpZ2dlc3QgdGlsZSBhdCB0aGUgdG9wLlxuICBUSUxFX1NJWkU6IHtcbiAgICBYWEw6IHtcbiAgICAgIG1heEFtb3VudDogMSxcbiAgICAgIGNvbDogNSxcbiAgICAgIHJvdzogNVxuICAgIH0sXG4gICAgWEw6IHtcbiAgICAgIG1heEFtb3VudDogMixcbiAgICAgIGNvbDogNCxcbiAgICAgIHJvdzogNFxuICAgIH0sXG4gICAgTDoge1xuICAgICAgbWF4QW1vdW50OiAxMCxcbiAgICAgIGNvbDogMyxcbiAgICAgIHJvdzogMlxuICAgIH0sXG4gICAgTToge1xuICAgICAgbWF4QW1vdW50OiAxMCxcbiAgICAgIGNvbDogMixcbiAgICAgIHJvdzogMlxuICAgIH0sXG4gICAgUzoge1xuICAgICAgbWF4QW1vdW50OiAxMCxcbiAgICAgIGNvbDogMixcbiAgICAgIHJvdzogMVxuICAgIH0sXG4gICAgWFM6IHtcbiAgICAgIG1heEFtb3VudDogNTAsXG4gICAgICBjb2w6IDEsXG4gICAgICByb3c6IDFcbiAgICB9XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7Y29uc3RhbnRzfSBmcm9tICcuL2NvbmZpZyc7XG5cbmNvbnN0IEdyaWQgPSAoc3RhdGUpID0+IHtcbiAgY29uc3QgeyBlbCwgdG90YWxDb2wsIHRvdGFsUm93IH0gPSBzdGF0ZTtcbiAgbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsKSxcbiAgICAgIGdyaWRXaWR0aCA9IGNvbnRhaW5lci5jbGllbnRXaWR0aCxcbiAgICAgIGdyaWRIZWlnaHQgPSBjb250YWluZXIuY2xpZW50SGVpZ2h0LFxuICAgICAgZ3JpZFdpZHRoU3BhY2VyID0gMiAqIDEwMCAvIGdyaWRXaWR0aCxcbiAgICAgIGdyaWRIZWlnaHRTcGFjZXIgPSAyICogMTAwIC8gZ3JpZEhlaWdodCxcbiAgICAgIHNwYWNlV2lkdGggPSBncmlkV2lkdGggLyB0b3RhbENvbCxcbiAgICAgIHNwYWNlSGVpZ2h0ID0gZ3JpZEhlaWdodCAvIHRvdGFsUm93LFxuICAgICAgY29vcmRzID0gW107XG5cbiAgLypcbiAgKiBTZXQgY29vcmRzXG4gICovXG4gIGxldCBzZXRDb29yZHMgPSAoKSA9PiB7XG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCB0b3RhbENvbDsgeCsrKSB7XG4gICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRvdGFsUm93OyB5KyspIHtcbiAgICAgICAgY29vcmRzLnB1c2goe2NvbDogeCwgcm93OiB5fSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8qXG4gICogU2hvdyBjb29yZHNcbiAgKiBUaGlzIHdpbGwgc2hvdyBibGFjayBkb3RzIGZvciBlYWNoIGNvb3Jkb25hdGVcbiAgKi9cbiAgbGV0IHNob3dDb29yZHMgPSAoKSA9PiB7XG4gICAgY29vcmRzLmZvckVhY2goY29vcmQgPT4ge1xuICAgICAgbGV0IGxlZnQgPSBncmlkV2lkdGggLyB0b3RhbENvbCAqIGNvb3JkLmNvbCxcbiAgICAgICAgICB0b3AgPSBncmlkSGVpZ2h0IC8gdG90YWxSb3cgKiBjb29yZC5yb3c7XG4gICAgICBsZWZ0ID0gbGVmdCAqIDEwMCAvIGdyaWRXaWR0aDtcbiAgICAgIHRvcCA9IHRvcCAqIDEwMCAvIGdyaWRIZWlnaHQ7XG4gICAgICBsZXQgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJESVZcIik7XG4gICAgICBub2RlLnN0eWxlLmNzc1RleHQgPSBgdG9wOiAke3RvcC0wLjV9JTsgbGVmdDogJHtsZWZ0LTAuMn0lYDtcbiAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChub2RlKTtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGJ1aWxkR3JpZDogKCkgPT4ge1xuICAgICAgc2V0Q29vcmRzKCk7XG4gICAgICBzaG93Q29vcmRzKCk7XG4gICAgfSxcbiAgICBnZXRDb29yZHM6ICgpID0+IHtcbiAgICAgIHJldHVybiBjb29yZHM7XG4gICAgfSxcbiAgICBnZXRTcGFjZTogKCkgPT4ge1xuICAgICAgcmV0dXJuIHt3aWR0aDogc3BhY2VXaWR0aCwgaGVpZ2h0OiBzcGFjZUhlaWdodH07XG4gICAgfSxcbiAgICBnZXRQYXJhbXM6ICgpID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGdyaWRXaWR0aCxcbiAgICAgICAgZ3JpZEhlaWdodCxcbiAgICAgICAgZ3JpZFdpZHRoU3BhY2VyLFxuICAgICAgICBncmlkSGVpZ2h0U3BhY2VyLFxuICAgICAgICBzcGFjZVdpZHRoLFxuICAgICAgICBzcGFjZUhlaWdodFxuICAgICAgfTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR3JpZDtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHtjb25zdGFudHN9IGZyb20gJy4vY29uZmlnJztcblxuY29uc3QgVGlsZXMgPSAoc3RhdGUpID0+IHtcbiAgbGV0IHRpbGVzID0gW10sXG4gICAgdGlsZVF1ZXVlID0gW107XG5cbiAgcmV0dXJuIHtcbiAgICAvKlxuICAgICogUmVkdWNlIHRpbGUgc2l6ZVxuICAgICogVGhpcyBpcyBjaGVja2luZyBhbGwgdGhlIHRpbGUgc2l6ZSBhbmQgbG9vayBmb3IgdGhlIG5leHQgYXJlYSBzbWFsbGVyIHRoZW4gdGhlIGN1cnJlbnQgb25lLlxuICAgICogVG8gZmluZCB0aGUgYXJlYSB3ZSBqdXN0IG5lZWQgdG8gbXVsdGlwbHkgdGhlIGNvbCBhbmQgcm93IChjb25zdGFudHMuVElMRV9TSVpFW3NpemVdLmNvbCAqIGNvbnN0YW50cy5USUxFX1NJWkVbc2l6ZV0ucm93KVxuICAgICogQHBhcmFtIHtzdHJpbmd9IGN1cnJlbnRUaWxlU2l6ZSAtIGJpZywgbWVkaXVtLCBzbWFsbCwgZWN0LlxuICAgICovXG4gICAgcmVkdWNlVGlsZVNpemU6IChjdXJyZW50VGlsZVNpemUpID0+IHtcbiAgICAgIGxldCBjdXJyZW50VGlsZSA9IGNvbnN0YW50cy5USUxFX1NJWkVbY3VycmVudFRpbGVTaXplXSxcbiAgICAgICAgICBjdXJyZW50VGlsZUFyZWEgPSBjdXJyZW50VGlsZS5jb2wgKiBjdXJyZW50VGlsZS5yb3c7XG5cbiAgICAgIGZvciAobGV0IHNpemUgaW4gY29uc3RhbnRzLlRJTEVfU0laRSkge1xuICAgICAgICBsZXQgbmV4dFRpbGVBcmVhID0gY29uc3RhbnRzLlRJTEVfU0laRVtzaXplXS5jb2wgKiBjb25zdGFudHMuVElMRV9TSVpFW3NpemVdLnJvdztcbiAgICAgICAgaWYgKG5leHRUaWxlQXJlYSA8IGN1cnJlbnRUaWxlQXJlYSkge1xuICAgICAgICAgIHJldHVybiBzaXplO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBudWxsOyAvLyBSZXR1cm4gbnVsbCBpZiBubyBzbWFsbGVyIHRpbGUgYXJlIGZvdW5kLlxuICAgIH0sXG5cbiAgICAvKlxuICAgICogR2V0IG5leHQgdGlsZSBzaXplXG4gICAgKiBUaGlzIHdpbGwgZ2V0IHRoZSBuZXh0IHRpbGUgc2l6ZSB0byB1c2UuXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gdGlsZUluZGV4XG4gICAgKi9cbiAgICBnZXROZXh0VGlsZVNpemU6ICh0aWxlSW5kZXgpID0+IHtcbiAgICAgIGxldCBjdXJyZW50VGlsZUNvdW50ID0gMDtcblxuICAgICAgZm9yIChsZXQgc2l6ZSBpbiBjb25zdGFudHMuVElMRV9TSVpFKSB7XG4gICAgICAgIGN1cnJlbnRUaWxlQ291bnQgPSBjdXJyZW50VGlsZUNvdW50ICsgY29uc3RhbnRzLlRJTEVfU0laRVtzaXplXS5tYXhBbW91bnQ7XG4gICAgICAgIGlmICh0aWxlSW5kZXggPCBjdXJyZW50VGlsZUNvdW50KSB7XG4gICAgICAgICAgcmV0dXJuIHNpemU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG51bGw7IC8vIFJldHVybiBudWxsIGlmIHRoZXJlIGlzIG5vIG5leHQgdGlsZSBzaXplIGF2YWlsYWJsZVxuICAgIH0sXG5cbiAgICAvKlxuICAgICogR2V0IG1heCB0aWxlIGNvdW50XG4gICAgKi9cbiAgICBnZXRNYXhUaWxlQ291bnQ6ICgpID0+IHtcbiAgICAgIGxldCBtYXhUaWxlQ291bnQgPSAwO1xuICAgICAgZm9yIChsZXQgc2l6ZSBpbiBjb25zdGFudHMuVElMRV9TSVpFKSB7XG4gICAgICAgIG1heFRpbGVDb3VudCA9IG1heFRpbGVDb3VudCArIGNvbnN0YW50cy5USUxFX1NJWkVbc2l6ZV0ubWF4QW1vdW50O1xuICAgICAgfVxuICAgICAgcmV0dXJuIG1heFRpbGVDb3VudDtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4qIFRpbGVcbiogQHBhcmFtIHtvYmplY3R9IGdyaWRcbiogQHBhcmFtIHtvYmplY3R9IHN0YXRlXG4qL1xuY29uc3QgVGlsZSA9IChzdGF0ZSwgdGlsZSwgZ3JpZCkgPT4ge1xuICByZXR1cm4ge1xuICAgIGdldFRpbGVJbmZvczogKCkgPT4ge1xuICAgICAgbGV0IHtzaXplLCB0YXJnZXQsIGNvbCwgcm93LCBrZXl9ID0gdGlsZSxcbiAgICAgICAgICB7c3BhY2VXaWR0aCwgc3BhY2VIZWlnaHQsIGdyaWRXaWR0aCwgZ3JpZEhlaWdodCwgZ3JpZFdpZHRoU3BhY2VyLCBncmlkSGVpZ2h0U3BhY2VyfSA9IGdyaWQ7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzaXplLFxuICAgICAgICB4OiB0YXJnZXQuY29sICogc3BhY2VXaWR0aCAqIDEwMCAvIGdyaWRXaWR0aCxcbiAgICAgICAgeTogdGFyZ2V0LnJvdyAqIHNwYWNlSGVpZ2h0ICogMTAwIC8gZ3JpZEhlaWdodCxcbiAgICAgICAgd2lkdGg6IChjb2wgKiAxMDAgLyBzdGF0ZS50b3RhbENvbCkgLSBncmlkV2lkdGhTcGFjZXIsXG4gICAgICAgIGhlaWdodDogKHJvdyAqIDEwMCAvIHN0YXRlLnRvdGFsUm93KSAtIGdyaWRIZWlnaHRTcGFjZXIsXG4gICAgICAgIGlkOiBrZXlcbiAgICAgIH07XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCB7VGlsZXMsIFRpbGV9O1xuIl19
