import ImageSize from 'react-native-image-size';
import ImageEditor from '@react-native-community/image-editor';
import {LOCAL_IMAGE, MARGIN} from '../const';

export interface ICropImage {
  row: number;
  col: number;
  rows: number;
  cols: number;
  image: string;
}

export const cropImage = async (props: ICropImage): Promise<string> => {
  const {width, height} = await ImageSize.getSize(props.image);
  const dimension = Math.min(width, height);
  let offset = {x: 0, y: 0};
  if (height > width) {
    offset.y += (height - width) >> 1;
  } else {
    offset.x += (width - height) >> 1;
  }
  const size = {
    width: Math.floor((1 / props.cols) * dimension),
    height: Math.floor((1 / props.rows) * dimension),
  };
  offset.x += size.width * props.col;
  offset.y += size.height * props.row;
  const url = await ImageEditor.cropImage(props.image, {
    offset,
    size,
  });
  return url;
};
