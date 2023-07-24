import React from 'react';
import {StyleSheet, View} from 'react-native';
import DeviceInfo from 'react-native-device-info';

import {Text} from '@/component';
import config from '@/config';
import {CreatePage, Screen} from '@/utils';
import screen from '@/utils/screen';
import {Image} from '@rneui/themed';

export default CreatePage({
  navigationProps: () => ({
    title: '关于我们',
  }),
  Component: () => {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={{uri: ''}} />
        <Text
          style={{
            color: '#fff',
            fontSize: screen.calc(16),
            marginTop: screen.calc(20),
          }}>
          {config.AppName}
        </Text>
        <Text
          style={{
            color: '#666',
            fontSize: screen.calc(14),
            marginBottom: screen.calc(20),
          }}>
          精彩短剧尽在{config.AppName}
        </Text>
        <Text
          style={{
            color: '#fff',
            fontSize: screen.calc(14),
            marginBottom: screen.calc(20),
          }}>
          v{DeviceInfo.getVersion()}
        </Text>

        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingBottom: Screen.calc(100),
          }}>
          <Text style={styles.proto}>《用户协议》</Text>
          <Text style={styles.proto}>《隐私政策》</Text>
          <Text style={styles.proto}>《收集个人信息明示清单》</Text>
          <Text style={styles.proto}>《个人信息第三方共享清单》</Text>
        </View>
      </View>
    );
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Screen.calc(30),
  },
  logo: {
    width: Screen.calc(100),
    height: Screen.calc(100),
    backgroundColor: 'red',
  },
  proto: {
    color: 'blue',
    marginTop: Screen.calc(10),
  },
});
