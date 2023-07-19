import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Image} from 'react-native';

import Index from '../views/index/index';
import My from '../views/my';
import Tools from '../views/my';

const BottomTab = createBottomTabNavigator();

export default function Tab() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        header: () => null,
        tabBarStyle: {
          backgroundColor: '#180033',
          borderTopWidth: 0,
          paddingTop: 3,
        },
        lazy: true,
        tabBarActiveTintColor: '#fff',
        // tabBarInactiveTintColor: '#fff',
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
          tabBarLabel: '工具',
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('../public/images/tab/tools_select.png')
                  : require('../public/images/tab/tools.png')
              }
            />
          ),
        }}
        name="Tools"
        component={Tools}
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
