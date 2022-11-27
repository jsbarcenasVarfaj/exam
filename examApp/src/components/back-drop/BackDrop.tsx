import React, {useContext} from 'react';
import {Animated, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import {MyAppContext} from '../../context/AppContext';
import {Result} from '../../dto/api.dto';

import {BACK_DROP_HEIGHT, ITEM_SIZE, width} from '../../utils/contants';
import MyFlatList from '../my-flat-list/MyFlatList';

interface IBackDropInterface {
  scrollX: Animated.Value;
}

function BackDrop(props: IBackDropInterface) {
  const {scrollX} = props;
  const {state} = useContext(MyAppContext);

  const charactersRenderData = state.rickAndMortyCharacters.results;

  return (
    <View
      style={{
        width: width,
        position: 'absolute',
        height: BACK_DROP_HEIGHT,
      }}>
      <MyFlatList
        data={[{} as Result].concat(charactersRenderData)}
        renderItem={(item, index) => {
          const inputRange = [(index - 1) * ITEM_SIZE, index * ITEM_SIZE];
          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [0, -width],
          });
          if (!item.image) {
            return null;
          }
          return (
            <Animated.View
              style={{position: 'absolute', transform: [{translateX}]}}>
              <FastImage
                style={{
                  width: width,
                  height: BACK_DROP_HEIGHT,
                }}
                source={{uri: item.image}}
                resizeMode={FastImage.resizeMode.cover}
              />
            </Animated.View>
          );
        }}
        keyExtractor={item => `${item.id + item.name}`}
      />
    </View>
  );
}

export default BackDrop;
