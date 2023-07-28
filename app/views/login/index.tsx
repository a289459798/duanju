import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

import {Button, Text} from '@/component';
import {CreatePage, Screen} from '@/utils';
import screen from '@/utils/screen';

export default CreatePage({
  navigationProps: () => ({
    title: '微信授权登录',
  }),
  Component: () => {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('@/public/images/sq-logo.png')}
        />
        <Button
          title={'微信授权登录'}
          titleStyle={{fontSize: Screen.calc(16)}}
          style={styles.button}
          containerStyle={{marginTop: Screen.calc(112)}}
        />
        <Text
          style={{
            color: '#999',
            fontSize: screen.calc(14),
            textAlign: 'center',
            marginTop: Screen.calc(28),
            lineHeight: Screen.calc(24),
          }}>
          为了您的账户安全，且管理方便{'\n'}我们选择微信登录
        </Text>
      </View>
    );
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Screen.calc(112),
  },
  image: {},
  button: {
    width: Screen.calc(188),
    height: Screen.calc(50),
    backgroundColor: '#57BE6B',
    borderRadius: Screen.calc(6),
  },
});
