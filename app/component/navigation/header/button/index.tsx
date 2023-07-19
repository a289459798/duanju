'use strict';

/**
 * Created by zhangzy on 2022/7/22.
 */
import React from 'react';
import {TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';

import {Text} from '@/component';
import {Screen} from '@/utils';

type HeaderButtonProps = {
  items: HeaderButtonType[];
};
export type HeaderButtonType = {
  onPress?: () => void;
  textStyle?: {};
  text?: string;
  icon?: React.ReactElement;
};
export default (props: HeaderButtonProps) => {
  if (props.items) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {props.items.map((v: HeaderButtonType, k: number) => {
          if (v.icon) {
            return (
              <TouchableOpacity
                style={{
                  marginLeft: Screen.calc(5),
                  width: Screen.calc(20),
                }}
                onPress={v.onPress}
                key={k}>
                {v.icon}
              </TouchableOpacity>
            );
          } else if (v.text) {
            return (
              <TouchableWithoutFeedback onPress={v.onPress} key={k}>
                <Text
                  style={[
                    {
                      fontSize: Screen.calc(14),
                      marginLeft: Screen.calc(5),
                    },
                    v.textStyle,
                  ]}>
                  {v.text}
                </Text>
              </TouchableWithoutFeedback>
            );
          }
        })}
      </View>
    );
  }
  return null;
};
