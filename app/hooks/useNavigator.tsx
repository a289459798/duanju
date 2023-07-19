import {CommonActions, useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';

import HeaderButton from '@/component/navigation/header/button';

export default () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const push = (page: string, params?: object) => {
    navigation.navigate(page, params);
  };

  const navigate = (page: string, params: object) => {
    navigation.navigate(page, params);
  };

  const pop = (number = 1) => {
    navigation.pop(number);
  };

  const popToTop = () => {
    navigation.popToTop();
  };

  const replace = (page: string, params: object) => {
    navigation.replace(page, params);
  };

  const reset = (page: string, params: object) => {
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [
        {
          name: page,
          params: params,
        },
      ],
    });
    navigation.dispatch(resetAction);
  };

  const setTitle = (title: string) => {
    navigation.setOptions({title});
  };

  const setOptions = (params: {}) => {
    navigation.setOptions(params);
  };

  const setRightButtons = (rightButtons: []) => {
    navigation.setOptions({
      headerRight: () => <HeaderButton items={rightButtons} />,
    });
  };

  return {
    push,
    pop,
    setTitle,
    setOptions,
    navigate,
    popToTop,
    replace,
    reset,
    setRightButtons,
  };
};
