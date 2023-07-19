import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Notifier} from 'react-native-notifier';
import {ShowNotificationParams} from 'react-native-notifier/lib/typescript/types';

import {Text} from '@/component';
import IconFont from '@/public/iconfont';

import screen from './screen';

interface CustomComponentProps extends ShowNotificationParams {
  type: string;
}
const CustomComponent: React.FunctionComponent<CustomComponentProps> = ({
  type,
  description,
}: CustomComponentProps) => {
  return (
    <View style={styles.container}>
      <IconFont size={15} name={getIcon(type)} color={getIconColor(type)} />
      <Text style={styles.text}>{description}</Text>
    </View>
  );
};

const getIcon = (type: string) => {
  return type === 'success' ? 'success' : 'tips';
};

const getIconColor = (type: string) => {
  switch (type) {
    case 'success':
      return '#0ABB56';
    case 'info':
      return '#fff';
    case 'warning':
      return '#e6a23c';
    default:
      return '#f56c6c';
  }
};

export default {
  error: (str: string) => {
    Notifier.showNotification({
      description: str,
      Component: CustomComponent,
      componentProps: {
        type: 'error',
      },
    });
  },
  info: (str: string) => {
    Notifier.showNotification({
      description: str,
      Component: CustomComponent,
      componentProps: {
        type: 'info',
      },
    });
  },
  warning: (str: string) => {
    Notifier.showNotification({
      description: str,
      Component: CustomComponent,
      componentProps: {
        type: 'warning',
      },
    });
  },
  success: (str: string) => {
    Notifier.showNotification({
      description: str,
      Component: CustomComponent,
      componentProps: {
        type: 'success',
      },
    });
  },
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#463881',
    paddingVertical: screen.calc(10),
    marginHorizontal: '20%',
    transform: [{translateY: screen.calc(44)}],
    borderRadius: screen.calc(8),
    paddingHorizontal: screen.calc(15),
  },
  text: {
    color: '#fff',
    marginLeft: screen.calc(5),
  },
});
