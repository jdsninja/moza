'use strict';

import {constants} from './config';
import Grid from './grid';

/**
* Tile
*/
class Tiles extends Grid {
  constructor() {
    super(); // This will call the parent constructor
    this.tiles = [];
    this.tileQueue = [];
    for (let i = 0, len = 40; i < len; i++) {
      this.tiles.push({
        id: i,
        title: 'title',
        img: ''
      });
    }
  }

  showTile(){
    this.tileQueue.forEach((item, index) => {
      let node = document.createElement("DIV");
      node.style.cssText = `top: ${item.y}%; left: ${item.x}%; width: ${item.width}%; height: ${item.height}%`;
      node.className = 'tile';
      this.container.appendChild(node);
    });
  };

  /*
  * Get next tile size
  * This will get the next tile size to use.
  * @param {string} tileIndex
  */
  getNextTileSize(tileIndex) {
    let currentTileCount = 0;
    let tileSize = null;
    for(let size in constants.TILE_SIZE){
      currentTileCount = currentTileCount + constants.TILE_SIZE[size].maxAmount;
      if(tileIndex < currentTileCount){
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
  reduceTileSize(currentTileSize) {
    let currentTile = constants.TILE_SIZE[currentTileSize];
    let currentTileArea = currentTile.col * currentTile.row;
    let nextSize = null; // This will return null if no smaller tile are found.
    for (let size in constants.TILE_SIZE) {
      let nextTileArea = constants.TILE_SIZE[size].col * constants.TILE_SIZE[size].row;
      if (nextTileArea < currentTileArea) {
        return size;
      }
    }
    return nextSize;
  };

  /*
  * Get max tile count
  */
  getMaxTileCount() {
    let maxTileCount = 0;
    for (let size in constants.TILE_SIZE) {
      maxTileCount = maxTileCount + constants.TILE_SIZE[size].maxAmount;
    }
    return maxTileCount;
  };

  /*
  * Build tiles
  */
  buildTiles() {
    let size = null;
    let tileCount = 0;
    let maxTile = this.getMaxTileCount();

    this.tiles.forEach((tile, index) => {
      if(this.coords.free.length > 0 && tileCount < maxTile) {

        tile.size = this.getNextTileSize(tileCount);
        let availableAreaCoords = null;

        // If no space were found that mean the tile is to big.
        // Need to size it down a bit
        let findNextAvailableAreaCoords = function() {
          tile.size = this.reduceTileSize(tile.size);
          if(!tile.size) {
            return undefined;
          }
          let availableAreaCoords = this.getNewTileArea(tile.size);
          if(!availableAreaCoords){
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
          let myTile = new Tile(this, tile);

          // Update free & taken coords
          let tileOccupationCoords = this.getOccupationFromCoord({totalCol: tile.col, totalRow: tile.row, coord: tile.target});
          tileOccupationCoords.forEach(coords => {
            this.putFreeCoorToTakenCoor(coords);
          });
          this.tileQueue.push(myTile.getTileInfos());
        }else{
          // no tile added to the queue because we did not find the space for it
        }
      }
    });
  };
}


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
Tile.prototype.getTileInfos = function() {
  return {
    size: this.params.size,
    x: this.params.target.x * this.grid.tileWidth * 100 / this.grid.gridWidth,
    y: this.params.target.y * this.grid.tileHeight * 100 / this.grid.gridHeight,
    width: (this.params.col * 100 / this.grid.col) - this.grid.gridWidthSpacer,
    height: (this.params.row * 100 / this.grid.row) - this.grid.gridHeightSpacer,
    id: this.params.key
  };
};

export default Tiles;
