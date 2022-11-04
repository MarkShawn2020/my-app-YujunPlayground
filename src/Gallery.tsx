import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import {TOTAL, WIDTH} from './const';
import React, {useState} from 'react';
import {seq2cell} from './ds/cell';
import _ from 'lodash';
import {ImageItem} from './ImageItem';
import {Settings} from './ds/settings';

const initGameState = () => {
  return {
    steps: 0,
    empty: Math.floor(Math.random() * TOTAL),
    items: _.shuffle([...Array(9).keys()]).map((o, i) => {
      return {
        id: o,
      };
    }),
    showId: false,
    // 目前九張圖
    imageName: `${Math.ceil(Math.random() * 9)}.jpg`,
  };
};

export const Gallery = () => {
  const [gameState, setGameState] = useState(initGameState());

  const reorderItems = (from: number, to: number) => {
    const itemsNew = [...gameState.items];
    const tmp = {...itemsNew[to]};
    itemsNew[to] = {...itemsNew[from]};
    itemsNew[from] = {...tmp};
    setGameState({
      ...gameState,
      steps: gameState.steps + 1,
      empty: from,
      items: itemsNew,
    });

    if (itemsNew.every((item, index) => item.id === index)) {
      Alert.alert('🤩哇，你也太厲害了，成功了誒！');
    }
  };

  const targetCell = seq2cell(gameState.empty);
  console.log(JSON.stringify(gameState));

  return (
    <View style={style.section}>
      <View>
        <Text style={style.title}>蘇羽君的小屋（一）/ 拼圖遊戲</Text>

        <Text style={style.desc}>將圖片滑動到合適的地方就可以了哦~</Text>
      </View>

      <View style={style.grid}>
        {gameState.items.map((item, index) => {
          return (
            index !== gameState.empty && (
              <ImageItem
                showId={gameState.showId}
                imageName={gameState.imageName}
                key={index}
                id={item.id}
                cell={seq2cell(index)}
                targetCell={targetCell}
                doSwap={() => reorderItems(index, gameState.empty)}
              />
            )
          );
        })}
      </View>

      <View>
        <Text style={style.gameState}>步數：{gameState.steps}</Text>
      </View>

      {/* use TouchableOpacity with Text for changing button font size*/}
      {/* ref: https://stackoverflow.com/a/51269635/9422455*/}
      <View style={style.controls}>
        <Button
          title={'重玩'}
          onPress={() => {
            setGameState(initGameState());
          }}
        />
        <Button
          title={'悔步'}
          onPress={() => {
            Alert.alert('哎呀，落子無悔哦~');
          }}
        />
        <Button
          title={'放棄'}
          color="#f194ff"
          onPress={() => {
            Alert.alert('加油鴨，你一定可以的！');
          }}
        />

        <Button
          title={'提示'}
          onPress={() => {
            setGameState({...gameState, showId: !gameState.showId});
          }}
        />
      </View>
    </View>
  );
};

export default Gallery;

const style = StyleSheet.create({
  section: {},
  title: {
    margin: 10,
    fontSize: 20,
    color: 'magenta',
    fontWeight: '600',
  },
  desc: {
    margin: 10,
    fontSize: 16,
    color: '#888888',
  },
  grid: {
    width: WIDTH,
    height: WIDTH,
    position: 'relative',
    backgroundColor: 'pink',
  },
  gameState: {
    margin: 10,
    fontSize: 16,
  },
  controls: {
    marginTop: 10,
    display: 'flex',
    fontSize: 20,
    // width: ,
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
