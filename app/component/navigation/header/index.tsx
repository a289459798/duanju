import React, {useImperativeHandle} from 'react';
import {StatusBar, StatusBarProps, StyleProp, View} from 'react-native';
import LinearGradient, {
  LinearGradientProps,
} from 'react-native-linear-gradient';

import {Divider, Header, Text} from '@/component';
import {Screen} from '@/utils';

//@ts-ignore
import Button, {HeaderButtonType} from './button';

type HeaderProps = {
  style?: StyleProp<{}>;
  safeAreaHide?: boolean;
  leftButtons?: HeaderButtonType[];
  leftComponent?: React.ReactElement;
  leftStyle?: StyleProp<{}>;
  centerComponent?: React.ReactElement | any;
  title?: string;
  titleStyle?: StyleProp<{}>;
  rightButtons?: HeaderButtonType[];
  rightComponent?: React.ReactElement | any;
  rightStyle?: StyleProp<{}>;
  linearGradientProps?: LinearGradientProps;
  ViewComponent?: React.ReactElement | any;
  showLine?: boolean;
  statusBarProps?: StatusBarProps;
};
export default React.forwardRef((props: HeaderProps, ref) => {
  let headerRef: any;
  const setNativeProps = (nativeProps: any) => {
    headerRef.setNativeProps(nativeProps);
  };

  useImperativeHandle(ref, () => ({
    setNativeProps,
  }));

  let statusBarHeight =
    Screen.iphonex || Screen.iphone12
      ? 44
      : Screen.iphone
      ? 20
      : StatusBar.currentHeight;
  return (
    <View
      ref={r => (headerRef = r)}
      style={[
        {
          backgroundColor: '#fff',
          zIndex: 9,
        },
        props.style,
      ]}>
      <Header
        containerStyle={[
          {
            backgroundColor: 'transparent',
            height: props.safeAreaHide ? 44 + (statusBarHeight ?? 0) : 44,
            borderBottomWidth: 0,
          },
        ]}
        statusBarProps={{barStyle: 'light-content', ...props.statusBarProps}}
        leftComponent={
          props.leftButtons ? (
            <Button items={props.leftButtons} />
          ) : props.leftComponent ? (
            props.leftComponent
          ) : (
            <View />
          )
        }
        leftContainerStyle={props.leftStyle}
        centerComponent={
          props.centerComponent || props.title ? (
            props.centerComponent || (
              <Text
                style={[
                  {fontSize: Screen.calc(16), color: '#fff'},
                  props.titleStyle,
                ]}>
                {props.title}
              </Text>
            )
          ) : (
            <View />
          )
        }
        rightComponent={
          props.rightButtons ? (
            <Button items={props.rightButtons} />
          ) : props.rightComponent ? (
            props.rightComponent
          ) : null
        }
        rightContainerStyle={props.rightStyle}
        ViewComponent={
          props.linearGradientProps
            ? LinearGradient
            : props.ViewComponent
            ? props.ViewComponent
            : View
        }
        linearGradientProps={props.linearGradientProps}
      />
      {props.showLine ? <Divider /> : null}
    </View>
  );
});
