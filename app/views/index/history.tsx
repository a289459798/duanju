import React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback, Image} from 'react-native';
import {Text, ListView} from '@/component';
import {Screen} from '@/utils';
import useNavigator from 'hooks/useNavigator';
import FastImage from 'react-native-fast-image';

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
              <FastImage
                style={styles.itemImage}
                source={{uri: item.coverImage}}
              />
              <Image
                style={styles.statusView}
                source={
                  item.status === 0
                    ? require('@/public/images/ls-ywj.png')
                    : require('@/public/images/ls-lzz.png')
                }
              />
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
    top: Screen.calc(6),
    left: 0,
    zIndex: 9,
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
