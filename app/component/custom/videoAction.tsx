import {Button} from 'component';
import React from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Screen} from 'utils';

export type VideoActionProps = {
  videoInfo: any;
  onClickShare?: () => void;
  onClickAdd?: () => void;
  onClickNext?: () => void;
  showButton: boolean;
  follow: boolean;
};

export default (props: VideoActionProps) => {
  return (
    <View style={styles.container}>
      <FastImage
        style={styles.image}
        source={{uri: props.videoInfo.cover_image}}
      />
      <TouchableWithoutFeedback onPress={props.onClickAdd}>
        <View style={styles.addView}>
          <Text style={{color: '#fff'}}>
            {props.follow ? '取消追剧' : '追剧'}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={props.onClickShare}>
        <Text style={{color: '#fff'}}>分享</Text>
      </TouchableWithoutFeedback>
      {props.showButton && (
        <Button
          onPress={props.onClickNext}
          style={styles.button}
          title={'观看全集'}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: Screen.calc(10),
    alignItems: 'center',
    marginLeft: Screen.calc(20),
  },

  image: {
    width: Screen.calc(50),
    height: Screen.calc(50),
    borderRadius: Screen.calc(25),
  },
  addView: {
    marginVertical: Screen.calc(10),
  },
  button: {
    marginTop: Screen.calc(10),
  },
});
