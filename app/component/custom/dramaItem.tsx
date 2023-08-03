import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Screen} from 'utils';

export type DramaItemProps = {
  onPress?: (video: any) => void;
  video: any;
  showTotal?: boolean;
};

export default (props: DramaItemProps) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        props.onPress?.(props.video);
      }}>
      <View style={styles.itemView}>
        <View style={styles.itemImageView}>
          <FastImage
            style={styles.itemImage}
            source={{uri: props.video?.coverImage}}
          />
          <Image
            style={styles.statusView}
            source={
              props.video?.status === 0
                ? require('@/public/images/ls-ywj.png')
                : require('@/public/images/ls-lzz.png')
            }
          />
        </View>
        <Text style={styles.titleText} numberOfLines={1}>
          {props.video?.title}
        </Text>
        {!props.showTotal ? (
          <Text style={styles.lookText}>观看到第{props.video?.index}集</Text>
        ) : (
          <Text style={styles.lookText}>共{props.video?.total}集</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
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
