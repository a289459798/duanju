import React, {useRef, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, ListView} from '@/component';
import {Screen} from '@/utils';

type listType = {
  title: string;
  index: number;
};
export default () => {
  const [list, setList] = useState<listType[]>([]);
  useEffect(() => {
    setList([
      {title: 'sdsdsd', index: 1},
      {title: 'sdsdsd', index: 1},
      {title: 'sdsdsd', index: 1},
      {title: 'sdsdsd', index: 1},
    ]);
  }, []);
  return (
    <ListView
      style={styles.container}
      columnWrapperStyle={{justifyContent: 'space-between'}}
      numColumns={3}
      data={list}
      renderItem={({item}) => (
        <View style={styles.itemView}>
          <View style={styles.itemImage} />
          <Text style={styles.titleText}>{item.title}</Text>
          <Text style={styles.lookText}>已完结 · 共{item.index}集</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Screen.calc(100),
    paddingHorizontal: Screen.calc(10),
  },
  itemView: {flex: 1, marginTop: Screen.calc(20)},
  itemImage: {
    backgroundColor: '#eee',
    width: Screen.calc(110),
    height: Screen.calc(160),
    borderRadius: Screen.calc(10),
  },
  titleText: {
    color: '#666',
    fontSize: Screen.calc(14),
    fontWeight: '500',
    marginTop: Screen.calc(8),
  },
  lookText: {
    color: '#999',
    fontSize: Screen.calc(11),
  },
});
