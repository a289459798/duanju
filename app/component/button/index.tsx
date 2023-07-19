import {Button} from '@rneui/themed';
import type {ButtonProps as ThemedButtonProps} from '@rneui/themed';
import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import screen from '@/utils/screen';

export interface ButtonProps extends ThemedButtonProps {
  isRadius?: boolean;
  gradient?: {
    colors?: string[];
    disabledColors?: string[];
    start?: {x: number; y: number};
    end?: {x: number; y: number};
  };
}
export default (props: ButtonProps) => {
  let containerStyle: ViewStyle = {};
  let linearGradientProps: any = {};
  let viewComponent;
  if (props.gradient) {
    linearGradientProps = props.gradient;
    viewComponent = LinearGradient;

    if (!props.gradient.start) {
      props.gradient.start = {x: 0, y: 0};
    }
    if (!props.gradient.end) {
      props.gradient.end = {x: 1, y: 0};
    }
    if (props.disabled && props.gradient.disabledColors) {
      linearGradientProps.colors = props.gradient.disabledColors;
    }
  }

  if (props.isRadius) {
    containerStyle.borderRadius =
      ((props.style as any)?.height || styles.style?.height) / 2;
  }
  return (
    <Button
      {...props}
      linearGradientProps={linearGradientProps}
      ViewComponent={viewComponent}
      containerStyle={[
        styles.containerStyle,
        props.containerStyle,
        containerStyle,
      ]}
      buttonStyle={[styles.style, props.style]}
      titleStyle={[styles.titleStyle, props.titleStyle]}
    />
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    paddingVertical: 0,
  },
  style: {
    height: screen.calc(38),
    padding: 0,
  },
  titleStyle: {
    fontSize: screen.calc(14),
  },
});
