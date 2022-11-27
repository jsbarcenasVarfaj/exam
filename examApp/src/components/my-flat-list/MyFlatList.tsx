import React from 'react';
import {ScrollViewProps, Animated} from 'react-native';

interface IMYFlatListInterface<P> extends ScrollViewProps {
  data: P[];
  renderItem: (item: P, index: number) => React.ReactNode;
  keyExtractor: (item: P) => string;
}

function MyFlatList<P extends any>(props: IMYFlatListInterface<P>) {
  const {data = [], renderItem, keyExtractor} = props;
  return (
    <Animated.ScrollView {...props}>
      {data.map((value, index) => {
        return (
          <React.Fragment key={keyExtractor(value)}>
            {renderItem(value, index)}
          </React.Fragment>
        );
      })}
    </Animated.ScrollView>
  );
}
export default MyFlatList;
