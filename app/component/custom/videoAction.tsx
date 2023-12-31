import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableWithoutFeedback, View, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Screen} from 'utils';
import CustomButton from './customButton';
import Text from 'component/text';

export type VideoActionProps = {
  videoInfo: any;
  onClickShare?: () => void;
  onClickAdd?: () => void;
  onClickNext?: () => void;
  showButton: boolean;
  hideImageAndFollow?: boolean;
  follow: boolean;
};

let followMap: any = {};
export default (props: VideoActionProps) => {
  const [followNumber, setFollowNumber] = useState(
    Math.round(Math.random() * 1200 + 800),
  );

  useEffect(() => {
    if (!followMap[props.videoInfo?.drama_id]) {
      followMap[props.videoInfo?.drama_id] = Math.round(
        Math.random() * 1200 + 800,
      );
    }
    setFollowNumber(followMap[props.videoInfo?.drama_id]);
  }, [props.videoInfo?.drama_id]);

  useEffect(() => {
    if (props.follow) {
      setFollowNumber(followNumber + 1);
    } else {
      setFollowNumber(followNumber - 1);
    }
  }, [props.follow]);
  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: 'center',
          marginLeft: Screen.calc(40),
        }}>
        {!props.hideImageAndFollow && (
          <FastImage
            style={styles.image}
            source={{uri: props.videoInfo.cover_image}}
          />
        )}
        {!props.hideImageAndFollow && (
          <TouchableWithoutFeedback onPress={props.onClickAdd}>
            <View style={styles.addView} pointerEvents={'box-only'}>
              <Image
                source={
                  props.follow
                    ? require('@/public/images/sy-zjdl.png')
                    : require('@/public/images/sy-zj.png')
                }
              />
              <Text style={{color: '#fff'}}>{followNumber}</Text>
            </View>
          </TouchableWithoutFeedback>
        )}
        <TouchableWithoutFeedback onPress={props.onClickShare}>
          <View style={{paddingHorizontal: Screen.calc(5)}}>
            <Image
              style={styles.shareView}
              source={require('@/public/images/sy-fx.png')}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      {props.showButton ? (
        <CustomButton
          onPress={props.onClickNext}
          style={styles.button}
          textStyle={{fontSize: Screen.calc(13)}}
          title={'观看全集'}
          image={require('@/public/images/sy-kxj.png')}
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
    borderWidth: Screen.calc(2),
    borderColor: '#fff',
  },
  addView: {
    marginVertical: Screen.calc(24),
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#FF5501',
    height: Screen.calc(36),
    borderRadius: Screen.calc(6),
  },
  shareView: {
    marginBottom: Screen.calc(25),
  },
});
