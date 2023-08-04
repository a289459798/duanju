'use strict';

/**
 * Created by zhangzy on 2022/7/19.
 */
import Toast from '@attacks/react-native-toast';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useLayoutEffect} from 'react';
import {
  BackHandler,
  Image,
  Platform,
  StatusBar,
  StatusBarProps,
  StyleProp,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import Config from '@/config';

import HeaderButton from './header/button';
import {Screen} from 'utils';
import {IconArrow} from 'public/iconfont';

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
            <TouchableOpacity
              activeOpacity={1}
              style={{paddingHorizontal: Screen.calc(10)}}
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
                size={20}
              />
            </TouchableOpacity>
          ),
        headerStyle: {
          backgroundColor: '#fff',
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
        barStyle={statusBar?.barStyle || 'dark-content'}
        backgroundColor={statusBar?.backgroundColor || '#fff'}
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
          backgroundColor: '#fff',
          paddingBottom: safeAreaInsets.bottom,
        },
        safeAreaViewStyle,
      ]}>
      {view}
    </SafeAreaProvider>
  );
};
