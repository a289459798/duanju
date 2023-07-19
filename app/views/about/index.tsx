import React from 'react';
import {StyleSheet, View} from 'react-native';
import DeviceInfo from 'react-native-device-info';

import {Text} from '@/component';
import config from '@/config';
import {CreatePage} from '@/utils';
import screen from '@/utils/screen';

export default CreatePage({
  navigationProps: () => ({
    title: '关于我们',
  }),
  Component: () => {
    return (
      <View style={styles.container}>
        <Text
          style={{
            color: '#fff',
            fontSize: screen.calc(16),
            marginTop: screen.calc(20),
            flex: 1,
          }}>
          {config.AppName}
        </Text>
        <Text
          style={{
            color: '#fff',
            fontSize: screen.calc(14),
            marginBottom: screen.calc(20),
          }}>
          v{DeviceInfo.getVersion()}
        </Text>
      </View>
    );
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
