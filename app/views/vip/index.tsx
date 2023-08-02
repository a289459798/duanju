import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import DeviceInfo from 'react-native-device-info';

import {Text} from '@/component';
import config from '@/config';
import {CreatePage, Screen} from '@/utils';
import screen from '@/utils/screen';

export default CreatePage({
  navigationProps: () => ({
    title: 'VIP',
  }),
  Component: () => {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('@/public/images/sy-logo.png')}
        />
        <Text
          style={{
            color: '#222',
            fontSize: screen.calc(20),
            marginTop: screen.calc(20),
          }}>
          {config.AppName}
        </Text>
        <Text
          style={{
            color: '#999',
            fontSize: screen.calc(17),
            marginTop: screen.calc(20),
          }}>
          精彩短剧尽在{config.AppName}
        </Text>
        <Text
          style={{
            color: '#999',
            fontSize: screen.calc(17),
            marginTop: screen.calc(5),
          }}>
          v{DeviceInfo.getVersion()}
        </Text>

        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingBottom: Screen.calc(24),
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
    paddingTop: Screen.calc(90),
  },
  logo: {},
  proto: {
    color: '#2989E3',
    marginTop: Screen.calc(10),
    fontSize: Screen.calc(15),
  },
});
