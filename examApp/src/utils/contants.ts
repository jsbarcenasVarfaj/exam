import {Dimensions, Platform} from 'react-native';

export const {width, height} = Dimensions.get('window');
export const CARD_SIZE = width * 0.72;
export const SPACING = 10;
export const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
export const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2;
export const BACK_DROP_HEIGHT = height * 0.6;
