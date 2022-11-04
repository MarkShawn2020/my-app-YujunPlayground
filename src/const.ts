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

export const images = [
  require('../assets/images/syj/1.jpg'),
  require('../assets/images/syj/2.jpg'),
  require('../assets/images/syj/3.jpg'),
  require('../assets/images/syj/4.jpg'),
  require('../assets/images/syj/5.jpg'),
  require('../assets/images/syj/6.jpg'),
  require('../assets/images/syj/7.jpg'),
  require('../assets/images/syj/8.jpg'),
  require('../assets/images/syj/9.jpg'),
];
console.log({images});

export const APP_NAME = '羽君遊樂園';
