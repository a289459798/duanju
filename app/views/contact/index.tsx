import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

import {Text} from '@/component';
import {CreatePage, Screen} from '@/utils';
import screen from '@/utils/screen';

export default CreatePage({
  navigationProps: () => ({
    title: '联系客服',
  }),
  Component: () => {
    return (
      <View style={styles.container}>
        <View
          style={{
            borderRadius: Screen.calc(8),
            padding: Screen.calc(2),
            borderWidth: Screen.calc(1.5),
            borderColor: '#ccc',
          }}>
          <Image
            style={styles.image}
            source={require('@/public/images/kf.jpg')}
          />
        </View>
        <Text
          style={{
            color: '#222',
            fontSize: screen.calc(16),
            textAlign: 'center',
            marginTop: Screen.calc(36),
            lineHeight: Screen.calc(23),
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
    width: Screen.calc(180),
    height: Screen.calc(180),
  },
});
