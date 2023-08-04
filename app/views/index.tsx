import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Image} from 'react-native';

import Index from '../views/index/index';
import My from '../views/my';
import Theater from '../views/theater';
import {Screen} from 'utils';

const BottomTab = createBottomTabNavigator();

export default function Tab() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        header: () => null,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          paddingTop: 3,
        },
        lazy: true,
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#000',
        tabBarLabelStyle: {
          fontSize: Screen.calc(14),
        },
      }}>
      <BottomTab.Screen
        options={{
          tabBarLabel: '首页',
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('../public/images/tab/home_select.png')
                  : require('../public/images/tab/home.png')
              }
            />
          ),
        }}
        name="Index"
        component={Index}
      />
      <BottomTab.Screen
        options={{
          tabBarLabel: '剧场',
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('../public/images/tab/jc_select.png')
                  : require('../public/images/tab/jc.png')
              }
            />
          ),
        }}
        name="Theater"
        component={Theater}
      />
      <BottomTab.Screen
        options={{
          tabBarLabel: '我的',
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('../public/images/tab/my_select.png')
                  : require('../public/images/tab/my.png')
              }
            />
          ),
        }}
        name="My"
        component={My}
      />
    </BottomTab.Navigator>
  );
}
