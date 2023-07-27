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
      <View
        style={{
          alignItems: 'center',
          marginLeft: Screen.calc(20),
        }}>
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
          <Text style={{color: '#fff', marginBottom: Screen.calc(10)}}>
            分享
          </Text>
        </TouchableWithoutFeedback>
      </View>
      {props.showButton ? (
        <Button
          onPress={props.onClickNext}
          style={styles.button}
          titleStyle={{fontSize: Screen.calc(13)}}
          title={'观看全集'}
        />
      ) : (
        <View style={{height: Screen.calc(36)}} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: Screen.calc(15),
    alignItems: 'flex-end',
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
    backgroundColor: '#FF5501',
    height: Screen.calc(36),
    borderRadius: Screen.calc(6),
  },
});
