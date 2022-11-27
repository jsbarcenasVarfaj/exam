import React, {useContext} from 'react';
import {
  ActivityIndicator,
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {MyAppContext} from '../../context/AppContext';
import {Result} from '../../dto/api.dto';
import {ITEM_SIZE, SPACER_ITEM_SIZE} from '../../utils/contants';
import {isCloseToBottom, isCloseToRight} from '../../utils/helpers';

import CharacterCard from '../../components/character-card/CharacterCard';
import MyFlatList from '../../components/my-flat-list/MyFlatList';
import BackDrop from '../../components/back-drop/BackDrop';

const isHorizontal = true;

function CustomFlatList() {
  const {state, makeNewQueryCharacters, isLoadingData} =
    useContext(MyAppContext);

  const charactersRenderData = state.rickAndMortyCharacters.results;

  const handleReachEdges = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isHorizontal) {
    }
    if (isCloseToRight(event) && isHorizontal) {
      makeNewQueryCharacters(state.rickAndMortyCharacters.info.next);
    }
    if (isCloseToBottom(event) && !isHorizontal) {
      makeNewQueryCharacters(state.rickAndMortyCharacters.info.next);
    }
  };

  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <BackDrop scrollX={scrollX} />
        <MyFlatList
          showsHorizontalScrollIndicator={false}
          snapToAlignment="start"
          decelerationRate={0}
          snapToInterval={ITEM_SIZE}
          horizontal={isHorizontal}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {
              useNativeDriver: true,
              listener: handleReachEdges,
            },
          )}
          scrollEventThrottle={16}
          keyExtractor={item => `${item.id + item.name}`}
          data={[{} as Result].concat(charactersRenderData)}
          renderItem={(item, index) => {
            const inputRange = [
              (index - 2) * ITEM_SIZE,
              (index - 1) * ITEM_SIZE,
              index * ITEM_SIZE,
            ];
            const translateY = scrollX.interpolate({
              inputRange,
              outputRange: [100, 50, 100],
              extrapolate: 'clamp',
            });
            if (!item.image) {
              return <View style={{width: SPACER_ITEM_SIZE}}></View>;
            }
            return (
              <React.Fragment>
                <CharacterCard character={item} translateY={translateY} />
              </React.Fragment>
            );
          }}
        />
      </View>

      {isLoadingData ? (
        <View style={styles.bottom}>
          <Text style={styles.title}>Loading...</Text>
          <ActivityIndicator size={'small'} />
        </View>
      ) : null}
    </View>
  );
}
export default CustomFlatList;

const styles = StyleSheet.create({
  container: {flex: 1},
  body: {flex: 1},
  bottom: {flexDirection: 'row'},
  title: {fontSize: 20, fontWeight: 'bold'},
  characterImage: {width: 70, height: 70},
});
