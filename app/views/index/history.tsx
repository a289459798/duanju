import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {Text, ListView} from '@/component';
import {Screen} from '@/utils';
import {Image} from '@rneui/themed';
import useNavigator from 'hooks/useNavigator';

type HistoryProps = {
  history: [];
  dispatch: Function;
};
export default (props: HistoryProps) => {
  const nav = useNavigator();

  return (
    <ListView
      style={styles.container}
      columnWrapperStyle={{
        justifyContent: 'flex-start',
      }}
      numColumns={3}
      data={props.history}
      renderItem={({item}) => (
        <TouchableWithoutFeedback
          onPress={() => {
            nav.push('Play', {id: item.id, index: item.index});
          }}>
          <View style={styles.itemView}>
            <View style={styles.itemImageView}>
              <Image style={styles.itemImage} source={{uri: item.coverImage}} />
              <View style={styles.statusView}>
                <Text style={styles.statusText}>
                  {item.status === 0 ? '已完结' : '未完结'}
                </Text>
              </View>
            </View>
            <Text style={styles.titleText} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.lookText}>观看到第{item.index}集</Text>
          </View>
        </TouchableWithoutFeedback>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Screen.calc(100),
    paddingHorizontal: Screen.calc(12),
  },
  itemView: {
    marginBottom: Screen.calc(16),
    width: Screen.calc(110),
    marginRight: Screen.calc(10),
  },
  itemImageView: {},
  itemImage: {
    width: Screen.calc(110),
    height: Screen.calc(147),
    borderRadius: Screen.calc(6),
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
    color: '#222',
    fontSize: Screen.calc(16),
    marginTop: Screen.calc(11),
    lineHeight: Screen.calc(19),
  },
  lookText: {
    color: '#999',
    fontSize: Screen.calc(12),
    lineHeight: Screen.calc(19),
    marginTop: Screen.calc(3),
  },
});
