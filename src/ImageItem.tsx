import {
  cell2coords,
  cell2coords_unit,
  diffCells,
  ICell,
  seq2cell,
} from './ds/cell';
import {
  Animated,
  Image,
  PanResponder,
  PanResponderInstance,
  StyleSheet,
  Text,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {COLS, IMAGE_WIDTH, ROWS} from './const';
import {cropImage} from './utils/cropImage';

export interface ImageItemProps {
  id: number;
  cell: ICell;
  showId: boolean;
  imageName: string;
  targetCell: ICell;
  doSwap: Function;
}

export const ImageItem = (props: ImageItemProps) => {
  const {cell, targetCell} = props;
  const pan = new Animated.ValueXY({x: 0, y: 0});
  const panPrev = new Animated.ValueXY({x: 0, y: 0});
  console.log('[init] ' + JSON.stringify({cell, targetCell}));

  const [img, setImg] = useState('');

  useEffect(() => {
    cropImage({
      ...seq2cell(props.id),
      rows: ROWS,
      cols: COLS,
      image: `/Users/mark/my-coding/huarongdao/assets/images/syj/${props.imageName}`,
    })
      .then(url => {
        setImg(url);
      })
      .catch(e => {
        console.error(e);
      });
  }, [props.imageName, props.id, props.cell]);

  const panResponder = useRef<PanResponderInstance>();
  panResponder.current = PanResponder.create({
    onMoveShouldSetPanResponder: () => diffCells(cell, targetCell) === 1,

    onPanResponderGrant: (e, g) => {
      console.log('[grant] ' + JSON.stringify({cell, targetCell}));
    },

    onPanResponderMove: (e, g) => {
      if (cell.row === targetCell.row) {
        g.dy = 0;
      } else {
        let ratio = g.dy / cell2coords_unit(targetCell.row - cell.row);
        if (ratio < 0) {
          g.dy = 0;
        } else if (ratio > 1) {
          g.dy = cell2coords_unit(targetCell.row - cell.row);
        }
      }

      if (cell.col === targetCell.col) {
        g.dx = 0;
      } else {
        let ratio = g.dx / cell2coords_unit(targetCell.col - cell.col);
        if (ratio < 0) {
          g.dx = 0;
        } else if (ratio > 1) {
          g.dx = cell2coords_unit(targetCell.col - cell.col);
        }
      }

      pan.setValue({x: panPrev.x._value + g.dx, y: panPrev.y._value + g.dy});
    },

    onPanResponderRelease: (e, g) => {
      let ratioX = g.dx / cell2coords_unit(targetCell.col - cell.col);
      let ratioY = g.dy / cell2coords_unit(targetCell.row - cell.row);
      if (ratioX > 0.5 || ratioY > 0.5) {
        props.doSwap();
      }

      pan.setValue({x: 0, y: 0});
    },
  });

  return (
    <Animated.View
      style={{
        ...style.container,
        ...cell2coords(props.cell),
        transform: [{translateX: pan.x}, {translateY: pan.y}],
      }}
      {...panResponder.current.panHandlers}>
      {props.showId && <Text style={style.text}>{props.id}</Text>}
      <Image source={{uri: img}} style={{...style.image}} />
    </Animated.View>
  );
};

const style = StyleSheet.create({
  text: {
    position: 'absolute',
    zIndex: 1,
    fontSize: 20,
    color: 'yellow',
    right: 2,
    top: 2,
  },
  container: {
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH,
    margin: 0,
    position: 'absolute',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
