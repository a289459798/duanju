import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Text} from '@/component';
import {CreatePage, Screen} from '@/utils';
import screen from '@/utils/screen';
import {Image} from '@rneui/themed';

export default CreatePage({
  navigationProps: () => ({
    title: '联系客服',
  }),
  Component: () => {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: ''}} />
        <Text
          style={{
            color: '#fff',
            fontSize: screen.calc(14),
            textAlign: 'center',
            marginTop: Screen.calc(20),
            lineHeight: Screen.calc(30),
          }}>
          截图 - 微信扫一扫 - 相册{'\n'}联系客服
        </Text>
      </View>
    );
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Screen.calc(50),
  },
  image: {
    width: Screen.calc(300),
    height: Screen.calc(400),
    backgroundColor: 'red',
  },
});
