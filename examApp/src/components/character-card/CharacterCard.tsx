import {StyleSheet, Text, View, Animated} from 'react-native';
import FastImage from 'react-native-fast-image';
import React from 'react';
import {Result as ICharacter} from '../../dto/api.dto';
import {CARD_SIZE, ITEM_SIZE, SPACING} from '../../utils/contants';

interface ICharacterInterface {
  character: ICharacter;
  translateY: Animated.AnimatedInterpolation<string | number>;
}

function CharacterCard(props: ICharacterInterface) {
  const {character, translateY} = props;
  return (
    <View style={styles.container}>
      <Animated.View style={{...styles.body, transform: [{translateY}]}}>
        <FastImage
          source={{uri: character.image}}
          style={styles.characterImage}
        />
        <Text>{character.name}</Text>
      </Animated.View>
    </View>
  );
}

export default CharacterCard;

const styles = StyleSheet.create({
  container: {
    width: CARD_SIZE,
  },
  body: {
    padding: SPACING,
    marginHorizontal: SPACING,
    alignItems: 'center',
    borderRadius: 34,
    backgroundColor: 'white',
  },
  characterImage: {
    width: '100%',
    height: ITEM_SIZE * 1.2,
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
});
