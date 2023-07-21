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
          <View style={styles.itemImageView}>
            <View style={styles.itemImage} />
            <View style={styles.statusView}>
              <Text style={styles.statusText}>已完结</Text>
            </View>
          </View>
          <Text style={styles.titleText}>{item.title}</Text>
          <Text style={styles.lookText}>观看到第{item.index}集</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(65, 65, 65)',
    paddingTop: Screen.calc(100),
    paddingHorizontal: Screen.calc(10),
  },
  itemView: {flex: 1, marginTop: Screen.calc(20)},
  itemImageView: {
    width: Screen.calc(110),
  },
  itemImage: {
    backgroundColor: '#fff',
    width: Screen.calc(110),
    height: Screen.calc(160),
    borderRadius: Screen.calc(10),
  },
  statusView: {
    position: 'absolute',
    bottom: Screen.calc(5),
    right: Screen.calc(5),
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: Screen.calc(4),
    paddingHorizontal: Screen.calc(5),
    paddingVertical: Screen.calc(2),
  },
  statusText: {
    color: '#fff',
    fontSize: Screen.calc(10),
  },
  titleText: {
    color: '#fff',
    fontSize: Screen.calc(14),
    fontWeight: '500',
    marginTop: Screen.calc(8),
  },
  lookText: {
    color: '#aaa',
    fontSize: Screen.calc(11),
  },
});
