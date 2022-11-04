import {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  ImageSourcePropType,
  PanResponder,
  PanResponderGestureState,
  StyleSheet,
  Text,
} from 'react-native';
import {
  cell2coords,
  diffCells,
  dumpCell,
  ICell,
  sameCell,
  seq2cell,
} from '../src/ds/cell';

export interface DraggableImageProps {
  order: number;
  source: ImageSourcePropType;
  cellSelf: ICell;
  cellTarget: ICell;
  onStep: Function;
  onMoving: Function;
  isMoving?: boolean;
}

export const DraggableImage = (props: DraggableImageProps) => {
  const {cellSelf, cellTarget} = props;
  const _coordsSelf = cell2coords(cellSelf);
  const _coordsTarget = cell2coords(cellTarget);
  const [coordsSelf, setCoordsSelf] = useState(_coordsSelf);
  let {x, y} = _coordsSelf;
  let x_ = _coordsTarget.x;
  let y_ = _coordsTarget.y;
  console.log(props);
  const preprocessG = (g: PanResponderGestureState): boolean => {
    // 必須相鄰
    if (diffCells(cellSelf, cellTarget) !== 1) {
      return true;
    }

    // x相同，則dx不變，只能豎直向目標方向移動
    if (x_ === x || g.dx * (x_ - x) <= 0) {
      g.dx = 0;
    } else if (Math.abs(g.dx) > Math.abs(x_ - x)) {
      g.dx = x_ - x;
    }

    // y相同，則dy不變,只能水平向目標方向移動
    if (y_ === y || g.dy * (y_ - y) <= 0) {
      g.dy = 0;
    } else if (Math.abs(g.dy) > Math.abs(y_ - y)) {
      g.dy = y_ - y;
    }
    return false;
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: (e, g) => {
        console.log(
          `[grant] self: ${JSON.stringify(
            props.cellSelf,
          )}, target: ${JSON.stringify(props.cellTarget)}`,
        );
        console.log(props);
        props.onMoving(true);
      },

      onPanResponderMove: (e, g) => {
        if (preprocessG(g)) {
          return;
        }

        setCoordsSelf({
          x: x + g.dx,
          y: y + g.dy,
        });
      },

      onPanResponderEnd: (e, g) => {
        props.onMoving(false);
        if (preprocessG(g)) {
          return;
        }

        if (
          Math.abs(g.dx / (x_ - x)) > 0.5 ||
          Math.abs(g.dy / (y_ - y)) > 0.5
        ) {
          setCoordsSelf({
            x: x_,
            y: y_,
          });
          props.onStep();
        } else {
          setCoordsSelf({
            x: x,
            y: y,
          });
        }
      },
    }),
  ).current;

  return (
    <Animated.View
      style={{
        ...style.single,
        transform: [{translateX: coordsSelf.x}, {translateY: coordsSelf.y}],
      }}
      {...panResponder.panHandlers}>
      <Text style={style.desc}>{dumpCell(seq2cell(props.order))}</Text>
      <Image
        source={props.source}
        style={{
          ...style.image,
          borderColor:
            props.onMoving && sameCell(props.cellSelf, props.cellTarget)
              ? 'red'
              : 'white',
          borderWidth: 2,
        }}
      />
    </Animated.View>
  );
};

const style = StyleSheet.create({
  desc: {
    position: 'absolute',
    zIndex: 1,
    right: 1,
    bottom: 1,
    fontSize: 20,
    color: 'yellow',
    backgroundColor: 'magenta',
  },
  single: {
    position: 'absolute',
    width: '30%',
    height: '30%',
    margin: '1%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
