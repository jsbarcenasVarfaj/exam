import {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';

export const isCloseToBottom = ({
  nativeEvent,
}: NativeSyntheticEvent<NativeScrollEvent>) => {
  const {layoutMeasurement, contentOffset, contentSize} = nativeEvent;
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

export const isCloseToRight = ({
  nativeEvent,
}: NativeSyntheticEvent<NativeScrollEvent>) => {
  const {layoutMeasurement, contentOffset, contentSize} = nativeEvent;
  const paddingRight = 20;
  return (
    layoutMeasurement.width + contentOffset.x >=
    contentSize.width - paddingRight
  );
};
