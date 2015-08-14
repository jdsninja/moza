'use strict';

import Tiles from './tiles';

/**
* Moza
*/
class Moza extends Tiles {
  constructor() {
    super(); // This will call the parent constructor=
  }

  /*
  * Build
  * @param {object} params - el, col & row
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
