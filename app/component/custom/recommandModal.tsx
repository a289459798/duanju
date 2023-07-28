import React, {Ref, useImperativeHandle, useState} from 'react';
import {StyleSheet, TouchableWithoutFeedback, View, Image} from 'react-native';

import {Text} from '@/component';
import screen from '@/utils/screen';
import {Screen} from 'utils';
import CustomButton from './customButton';
import FastImage from 'react-native-fast-image';

export type RecommandModalRef = {
  show: ({}) => void;
  hide: () => void;
};
type RecommandModalProps = {
  onPress: ({}) => void;
};
export default React.forwardRef(
  (props: RecommandModalProps, ref: Ref<RecommandModalRef>) => {
    const [visiable, setVisiable] = useState(false);
    const [video, setVideo] = useState<any>({});
    useImperativeHandle(ref, () => ({
      show: data => {
        setVisiable(true);
        setVideo(data);
      },
      hide: () => setVisiable(false),
    }));

    if (!visiable) {
      return null;
    }
    return (
      <View style={styles.container}>
        <FastImage style={styles.image} source={{uri: video?.cover_image}} />
        <View style={styles.rightView}>
          <Text style={styles.titleText}>{video?.title}</Text>
          <Text style={styles.statusText}>
            {video?.status === 0 ? '已完结' : '连载中'} | 共{video?.total}集
          </Text>
          <View style={styles.bottomView}>
            <Text style={styles.lookText}>上次观看到第{video.index}集</Text>
            <CustomButton
              textStyle={{fontSize: Screen.calc(15)}}
              style={styles.button}
              title={'继续播放'}
              onPress={() => props.onPress(video)}
              image={require('@/public/images/ecqd-jx.png')}
            />
          </View>
        </View>
        <TouchableWithoutFeedback onPress={() => setVisiable(false)}>
          <Image
            style={styles.colse}
            source={require('@/public/images/ecqd-gb.png')}
          />
        </TouchableWithoutFeedback>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: screen.calc(6),
    top: Screen.calc(100),
    zIndex: 99,
    left: Screen.calc(12),
    right: Screen.calc(12),
    paddingHorizontal: Screen.calc(10),
    paddingVertical: Screen.calc(10),
    flexDirection: 'row',
  },
  image: {
    width: Screen.calc(74),
    height: Screen.calc(98),
    borderRadius: Screen.calc(5),
  },
  rightView: {
    flex: 1,
    marginLeft: Screen.calc(12),
    paddingTop: Screen.calc(12),
  },
  titleText: {
    color: '#fff',
    fontSize: Screen.calc(17),
  },
  statusText: {
    color: '#999',
    fontSize: Screen.calc(13),
    lineHeight: Screen.calc(18),
    marginTop: Screen.calc(3),
  },
  bottomView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Screen.calc(8),
  },
  lookText: {
    color: '#fff',
    fontSize: Screen.calc(13),
  },
  button: {
    backgroundColor: '#FF5501',
    borderRadius: Screen.calc(6),
    height: Screen.calc(36),
  },
  colse: {
    position: 'absolute',
    right: Screen.calc(10),
    top: Screen.calc(10),
    zIndex: 999,
  },
});
