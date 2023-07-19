'use strict';

/**
 * Created by zhangzy on 2022/7/19.
 */
import Toast from '@attacks/react-native-toast';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useLayoutEffect} from 'react';
import {
  BackHandler,
  Platform,
  StatusBar,
  StatusBarProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import Config from '@/config';
import {IconArrow} from '@/public/iconfont';

import HeaderButton from './header/button';

export type NavigationProps = {
  hideSafe?: boolean;
  children?: any;
  statusBar?: StatusBarProps;
  headerLeft?: any;
  backOnPress?: () => void;
  rightButtons?: any;
  hideHeader?: boolean;
  title?: string;
  safeAreaViewStyle?: StyleProp<ViewStyle>;
  headerStyle?: any;
};

export default (props: NavigationProps) => {
  const navigation = useNavigation();
  const safeAreaInsets = useSafeAreaInsets();

  const {
    hideSafe,
    children,
    statusBar,
    headerLeft,
    backOnPress,
    rightButtons,
    hideHeader,
    title,
    safeAreaViewStyle,
    headerStyle,
  } = props;

  useLayoutEffect(() => {
    !hideHeader &&
      navigation?.setOptions({
        headerLeft: () =>
          headerLeft || (
            <TouchableWithoutFeedback
              onPress={() => {
                if (backOnPress) {
                  backOnPress();
                } else {
                  navigation.goBack();
                }
              }}>
              <IconArrow
                style={{
                  transform: [{rotate: '180deg'}],
                }}
                color={'#fff'}
              />
            </TouchableWithoutFeedback>
          ),
        headerStyle: {
          backgroundColor: '#1B1B27',
          height: 44 + safeAreaInsets.top,
          ...headerStyle,
        },
      });

    rightButtons &&
      navigation?.setOptions({
        headerRight: () => <HeaderButton items={rightButtons} />,
      });

    title && navigation?.setOptions({title: title});
  });

  Platform.OS === 'android' &&
    useEffect(() => {
      let lastBackPressed: number;
      const backAction = () => {
        if (backOnPress) {
          backOnPress();
          return true;
        }
        if (navigation.canGoBack()) {
          return false;
        }
        if (lastBackPressed && lastBackPressed + 2000 >= Date.now()) {
          BackHandler.exitApp();
          return true;
        }
        lastBackPressed = Date.now();
        Toast.show('再按一次退出' + Config.AppName);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, []);

  const view = (
    <>
      <StatusBar
        barStyle={statusBar?.barStyle || 'light-content'}
        backgroundColor={statusBar?.backgroundColor || '#1B1B27'}
        translucent={statusBar?.translucent}
      />
      {children}
    </>
  );

  if (hideSafe) {
    return view;
  }
  return (
    <SafeAreaProvider
      style={[
        {
          flex: 1,
          backgroundColor: '#1B1B27',
          paddingBottom: safeAreaInsets.bottom,
        },
        safeAreaViewStyle,
      ]}>
      {view}
    </SafeAreaProvider>
  );
};
