// ref: https://reactnative.dev/docs/dimensions
import {Dimensions} from 'react-native';

export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = WIDTH;
// todo: suppress warning
export const MARGIN = 4;
export const ROWS = 3;
export const COLS = 3;
export const TOTAL = ROWS * COLS;
export const IMAGE_WIDTH = Math.floor((WIDTH - (COLS + 1) * MARGIN) / COLS);
export const IMAGE_HEIGHT = IMAGE_WIDTH;
