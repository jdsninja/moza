'use strict';

import {constants} from './config';
import Tiles from './tiles';

/**
* Moza
*/
class Moza extends Tiles {
  constructor() {
    // todo: should be in grid class
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

    // todo: should be in tiles class
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
  /*
  * Build
  * @param {string} el
  * @param {number} col
  * @param {number} row
  */
  build(params) {
    this.buildGrid(params);
    // Build the tiles. At this point we will have the size and position of all the tiles.
    this.buildTiles();
    // This will parse the
    this.showTile(params);
  }
}

global.Moza = Moza;
