'use strict';

import { constants } from './config';
import request from '../../node_modules/superagent/lib/client.js';
import { Tile, Tiles } from './tiles';
import Grid from './grid';

const Moza = (state) => {
  const { totalCol, totalRow, el, url } = state,
        myGrid = Grid(state),
        myTiles = Tiles(state),
        { gridWidth, gridHeight, gridWidthSpacer, gridHeightSpacer, spaceWidth, spaceHeight} = myGrid.getParams();

  let coords = {
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
  let checkAvailabilityOfCoordsFromCoord = (myCoords) => {
    let y = 0;
    myCoords.forEach(coord => {
      let i = coords.free.length;
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
  let getOccupationFromCoord = (params) => {
    let {totalCol, totalRow, coord} = params,
        coords = [];
    if (coord) {
      for (let i = 0; i < totalCol; i++) {
        for (let j = 0; j < totalRow; j++) {
          coords.push({col: i + coord.col, row: j + coord.row});
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
  let getNewTileArea = (tileSize) => {
    let targets = [],
       totalCol = constants.TILE_SIZE[tileSize].col,
       totalRow = constants.TILE_SIZE[tileSize].row;
    coords.free.forEach(freeCoord => {
      // make sure the tile ending end don't go futher then the grid edge
      let tileRightEdge = (freeCoord.col + totalCol) * spaceWidth,
          tileBottomEdge = (freeCoord.row + totalRow) * spaceHeight;

      if (tileRightEdge <= gridWidth && tileBottomEdge <= gridHeight) {
        // We jsut fond a good spot for this tile.
        // It's time to check if the area is clear.
        let coords = getOccupationFromCoord({totalCol, totalRow, coord: freeCoord});
        if (checkAvailabilityOfCoordsFromCoord(coords)) {
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
  let putFreeCoorToTakenCoor = (coord) => {
    //todo: Remove the if statement and add a filter before forEach
    coords.free.forEach((myCoord, index) => {
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
  let shuffle = (o) => {
    for(let j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  }

  let showTile = () => {
    let {url} = state;

    //todo: optomize  code duplication.
    if (url) {
      request
        .get(url)
        .end(function(err, res){
          res = JSON.parse(res.text);
          tileQueue.forEach((item, index) => {
            let node = document.createElement("DIV");
            node.style.cssText = `top: ${item.y}%; left: ${item.x}%; width: ${item.width}%; height: ${item.height}%; background-image: url(${res[index].img})`;
            node.className = 'tile';
            container.appendChild(node);
          });
        });
    } else {
      tileQueue.forEach((item, index) => {
        let node = document.createElement("DIV");
        node.style.cssText = `top: ${item.y}%; left: ${item.x}%; width: ${item.width}%; height: ${item.height}%`;
        node.className = 'tile';
        container.appendChild(node);
      });
    }
  };

  /*
  * Build tiles
  */
  let buildTiles = () => {
    let size = null,
        tileCount = 0,
        maxTile = myTiles.getMaxTileCount();

    for (let i = 0, len = maxTiles; i < len; i++) {
      tiles.push({
        id: i
      });
    };

    tiles.forEach((tile, index) => {
      if(coords.free.length > 0 && tileCount < maxTile) {

        tile.size = myTiles.getNextTileSize(tileCount);
        let availableAreaCoords = null;

        // If no space were found that mean the tile is to big.
        // Need to size it down a bit
        let findNextAvailableAreaCoords = function() {
          tile.size = myTiles.reduceTileSize(tile.size);

          if (!tile.size) {
            return undefined;
          }
          let availableAreaCoords = getNewTileArea(tile.size);
          if (!availableAreaCoords) {
            return findNextAvailableAreaCoords();
          }
          return availableAreaCoords;
        }.bind(this);

        // Check if we found a place for the tile
        availableAreaCoords = findNextAvailableAreaCoords();

        // Just making sure we have space for this tile.
        // We wont need this condition after I make a recursion for the downsizing tile function
        if(availableAreaCoords){
          tileCount++;
          tile.key = index;
          tile.target = availableAreaCoords[0]; //Take the first one in the array. They are already shoveled
          tile.col = constants.TILE_SIZE[tile.size].col;
          tile.row = constants.TILE_SIZE[tile.size].row;
          let myTile = new Tile(state, tile, myGrid.getParams());
          // Update free & taken coords
          let tileOccupationCoords = getOccupationFromCoord({totalCol: tile.col, totalRow: tile.row, coord: tile.target});
          tileOccupationCoords.forEach(coords => {
            putFreeCoorToTakenCoor(coords);
          });
          tileQueue.push(myTile.getTileInfos());
        }else{
          // no tile added to the queue because we did not find the space for it
        }
      }
    });
  }

  return {
    build: () => {
      myGrid.buildGrid();
      coords.all = coords.free = myGrid.getCoords();
      buildTiles();
      showTile();
    }
  }
};



global.Moza = Moza;
