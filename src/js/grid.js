'use strict';

import {constants} from './config';

/**
* Grid
*/
class Grid {
  constructor() {
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
  checkAvailabilityOfCoordsFromCoord(coords) {
    let y = 0;
    coords.forEach(coord => {
      let i = this.coords.free.length;
      while (i--) {
        if (this.coords.free[i].x === coord.x && this.coords.free[i].y === coord.y) {
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
  getOccupationFromCoord(params) {
    var {totalCol, totalRow, coord} = params;
    let coords = [];
    if (coord) {
      for (let i = 0; i < totalCol; i++) {
        for (let j = 0; j < totalRow; j++) {
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
  getNewTileArea(tileSize) {
    let targets = [],
       totalCol = constants.TILE_SIZE[tileSize].col,
       totalRow = constants.TILE_SIZE[tileSize].row;
    this.coords.free.forEach(freeCoord => {
      // make sure the tile ending end don't go futher then the grid edge
      let tileRightEdge = (freeCoord.x + totalCol) * this.tileWidth,
          tileBottomEdge = (freeCoord.y + totalRow) * this.tileHeight;
      if (tileRightEdge <= this.gridWidth && tileBottomEdge <= this.gridHeight) {
        // We jsut fond a good spot for this tile.
        // It's time to check if the area is clear.
        let coords = this.getOccupationFromCoord({totalCol, totalRow, coord: freeCoord});
        if (this.checkAvailabilityOfCoordsFromCoord(coords)) {
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
  putFreeCoorToTakenCoor(coord) {
    //todo: Remove the if statement and add a filter before forEach
    this.coords.free.forEach((myCoord, index) => {
      // todo: clean this up
      if (myCoord.x === coord.x && myCoord.y === coord.y) {
        this.coords.free.splice(index, 1);
      }
    });
    this.coords.taken.push(coord);
  };

  /*
  * Shuffle
  * @param {object} o
  */
  shuffle(o) {
    for(let j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  };

  /*
  * Get coord
  * @param {number} x
  * @param {number} y
  */
  getCoord(x, y) {
      return {x, y};
  };

  /*
  * Set coords
  */
  setCoords() {
    for (let i = 0; i < this.col; i++) {
      for (let j = 0; j < this.row; j++) {
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
  showCoords() {
    this.coords.all.forEach(coord => {
      let left = this.gridWidth / this.col * coord.x;
      let top = this.gridHeight / this.row * coord.y;
      left = left * 100 / this.gridWidth;
      top = top * 100 / this.gridHeight;
      let node = document.createElement("DIV");
      node.style.cssText = `top: ${top-0.5}%; left: ${left-0.2}%`;
      this.container.appendChild(node);
    });
  };

  /*
  * Build grid
  * @param {string} el
  * @param {number} gCol
  * @param {number} gRow
  */
  buildGrid(params) {
    var {el, col, row} = params;
    this.el = el;
    this.container = document.getElementById(el);
    this.gridWidth = this.container.clientWidth;
    this.gridHeight = this.container.clientHeight;
    this.col = col;//todo: this should be more specific. it will help understand the code when we call this from a sub function.
    this.row = row;
    this.gridWidthSpacer = 2 * 100 / this.gridWidth;
    this.gridHeightSpacer = 2 * 100 / this.gridHeight;
    this.tileWidth = this.gridWidth / col; //todo: find a more specific name for this. its more a zone or area then tile
    this.tileHeight = this.gridHeight / row;

    // Set coordonate
    this.setCoords();
    this.showCoords();
  };
}

export default Grid;
