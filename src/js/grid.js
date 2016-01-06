'use strict';

import {constants} from './config';

const Grid = (state) => {
  const { el, totalCol, totalRow } = state;
  let container = document.getElementById(el),
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
  let setCoords = () => {
    for (let x = 0; x < totalCol; x++) {
      for (let y = 0; y < totalRow; y++) {
        coords.push({col: x, row: y});
      }
    }
  };

  /*
  * Show coords
  * This will show black dots for each coordonate
  */
  let showCoords = () => {
    coords.forEach(coord => {
      let left = gridWidth / totalCol * coord.col,
          top = gridHeight / totalRow * coord.row;
      left = left * 100 / gridWidth;
      top = top * 100 / gridHeight;
      let node = document.createElement("DIV");
      node.style.cssText = `top: ${top-0.5}%; left: ${left-0.2}%`;
      container.appendChild(node);
    });
  };

  return {
    buildGrid: () => {
      setCoords();
      showCoords();
    },
    getCoords: () => {
      return coords;
    },
    getSpace: () => {
      return {width: spaceWidth, height: spaceHeight};
    },
    getParams: () => {
      return {
        gridWidth,
        gridHeight,
        gridWidthSpacer,
        gridHeightSpacer,
        spaceWidth,
        spaceHeight
      };
    }
  }
}

export default Grid;
