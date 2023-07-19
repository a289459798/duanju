import {createStackNavigator} from '@react-navigation/stack';
import {CardStyleInterpolators} from '@react-navigation/stack';
import {TransitionSpecs} from '@react-navigation/stack';
import React from 'react';
import {Platform} from 'react-native';

import {Screen} from '@/utils';
import Tab from '@/views';
import About from '@/views/about';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        gestureEnabled: true,
        gestureResponseDistance: Screen.width / 2,
        headerTitleAlign: 'center',
        headerMode: 'screen',
        headerLeftContainerStyle: {paddingLeft: 5},
        headerTitleStyle: {
          fontSize: Screen.calc(16),
          color: '#fff',
        },
        headerShadowVisible: false,
        transitionSpec: {
          open: TransitionSpecs.TransitionIOSSpec,
          close: TransitionSpecs.TransitionIOSSpec,
        },
        cardStyleInterpolator:
          Platform.OS === 'android'
            ? CardStyleInterpolators.forHorizontalIOS
            : undefined,
      }}>
      <Stack.Screen
        name="Home"
        component={Tab}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen name="About" component={About} />
    </Stack.Navigator>
  );
};
