'use strict';

import {constants} from './config';

const Tiles = (state) => {
  let tiles = [],
    tileQueue = [];

  return {
    /*
    * Reduce tile size
    * This is checking all the tile size and look for the next area smaller then the current one.
    * To find the area we just need to multiply the col and row (constants.TILE_SIZE[size].col * constants.TILE_SIZE[size].row)
    * @param {string} currentTileSize - big, medium, small, ect.
    */
    reduceTileSize: (currentTileSize) => {
      let currentTile = constants.TILE_SIZE[currentTileSize],
          currentTileArea = currentTile.col * currentTile.row;

      for (let size in constants.TILE_SIZE) {
        let nextTileArea = constants.TILE_SIZE[size].col * constants.TILE_SIZE[size].row;
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
    getNextTileSize: (tileIndex) => {
      let currentTileCount = 0;

      for (let size in constants.TILE_SIZE) {
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
    getMaxTileCount: () => {
      let maxTileCount = 0;
      for (let size in constants.TILE_SIZE) {
        maxTileCount = maxTileCount + constants.TILE_SIZE[size].maxAmount;
      }
      return maxTileCount;
    }
  }
}

/**
* Tile
* @param {object} grid
* @param {object} state
*/
const Tile = (state, tile, grid) => {
  return {
    getTileInfos: () => {
      let {size, target, col, row, key} = tile,
          {spaceWidth, spaceHeight, gridWidth, gridHeight, gridWidthSpacer, gridHeightSpacer} = grid;
      return {
        size,
        x: target.col * spaceWidth * 100 / gridWidth,
        y: target.row * spaceHeight * 100 / gridHeight,
        width: (col * 100 / state.totalCol) - gridWidthSpacer,
        height: (row * 100 / state.totalRow) - gridHeightSpacer,
        id: key
      };
    }
  }
}

export {Tiles, Tile};
