import {StyleSheet, View} from 'react-native';
import _ from 'lodash';
import {useState} from 'react';
import {DraggableImage} from './DraggableImage';
import {HEIGHT, TOTAL, WIDTH} from '../src/const';
import {ICell, seq2cell} from '../src/ds/cell';

export interface IGalleryState {
  order: number[];
  empty: number;
  cellTarget: ICell;
}

export default () => {
  const empty = Math.floor(Math.random() * TOTAL);
  const [state, setState] = useState<IGalleryState>({
    order: _.shuffle([...Array(TOTAL).keys()]),
    empty: empty,
    cellTarget: seq2cell(empty),
  });
  const [moving, setMoving] = useState(false)

  console.log(state);

  const reorderGalleryState = (another: number) => {
    console.log(`swapping ${state.empty} <--> ${another}`);
    const emptyVal = state.order[state.empty];
    const order2 = [...state.order];
    order2[state.empty] = order2[another];
    order2[another] = emptyVal;
    setState({
      order: order2,
      empty: another,
      cellTarget: seq2cell(another),
    });
  };

  return (
    <View style={style.grid}>
      {state.order.map((o, i) => {
        const cellSelf = {row: Math.floor(i / 3), col: i % 3};

        return (
          <DraggableImage
            key={o}
            order={o}
            isMoving={moving}
            cellSelf={cellSelf}
            cellTarget={state.cellTarget}
            onStep={() => {
              reorderGalleryState(i);
            }}
            onMoving={e => setMoving(e)}
            source={
              i === state.empty ? '' : require('../assets/images/syj/1.jpg')
            }
          />
        );
      })}
    </View>
  );
};

const style = StyleSheet.create({
  grid: {
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: 'cyan',
    position: 'relative',
  },
});
