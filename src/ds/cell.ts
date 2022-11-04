import {IMAGE_HEIGHT, IMAGE_WIDTH, MARGIN, ROWS} from '../const';
import {Pos} from './general';

export interface ICell {
  row: number;
  col: number;
}

export const diffCells = (cellA: ICell, cellB: ICell): number => {
  return Math.abs(cellA.row - cellB.row) + Math.abs(cellA.col - cellB.col);
};

export const sameCell = (a: ICell, b: ICell): boolean =>
  a.row === b.row && a.col === b.col;

export const dumpCell = (cell: ICell): string => `(${cell.row}, ${cell.col})`;

export const cell2seq = (cell: ICell, cols: number = ROWS): number =>
  cell.row * cols + cell.col;

export const seq2cell = (seq: number, cols: number = ROWS): ICell => ({
  row: Math.floor(seq / cols),
  col: seq % cols,
});

export const cell2coords_unit = (x: number): number =>
  (MARGIN + IMAGE_WIDTH) * x;

export const cell2coords = (cell: ICell): Pos => {
  return {
    left: MARGIN + (MARGIN + IMAGE_WIDTH) * cell.col,
    top: MARGIN + (MARGIN + IMAGE_HEIGHT) * cell.row,
  };
};
