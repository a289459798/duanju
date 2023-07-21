import React from 'react';
import {connect} from 'react-redux';
import {CreatePage, Screen} from '@/utils';
import {SceneMap, TabView} from 'react-native-tab-view';
import History from './history';
import Recommand from './recommand';
import {
  Animated,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

const renderScene = SceneMap({
  history: History,
  recommand: Recommand,
});

const Page = CreatePage({
  navigationProps: () => ({
    hideSafe: true,
    hideHeader: true,
    statusBar: {translucent: true, backgroundColor: 'transparent'},
  }),
  Component: () => {
    const [index, setIndex] = React.useState(1);
    const [routes] = React.useState([
      {key: 'history', title: '历史观看'},
      {key: 'recommand', title: '推荐'},
    ]);
    return (
      <TabView
        lazy
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={(props: any) => {
          const inputRange = props.navigationState.routes.map(
            (_x: any, i: number) => i,
          );

          let lineLeft = 0;

          return (
            <View style={styles.tabBar}>
              <View style={styles.tabBarTop}>
                {props.navigationState.routes.map((route: any, i: number) => {
                  const opacity = props.position.interpolate({
                    inputRange,
                    outputRange: inputRange.map((inputIndex: number) =>
                      inputIndex === i ? 1 : 0.5,
                    ),
                  });

                  lineLeft = props.position.interpolate({
                    inputRange,
                    outputRange: inputRange.map((inputIndex: number) =>
                      inputIndex === 0 ? Screen.calc(30) : Screen.calc(88),
                    ),
                  });

                  return (
                    <TouchableOpacity
                      style={styles.tabItem}
                      onPress={() => setIndex(i)}>
                      <Animated.Text
                        style={[
                          styles.tabBarItemText,
                          {
                            opacity,
                            fontSize:
                              props.navigationState.index === i
                                ? Screen.calc(20)
                                : Screen.calc(15),
                            fontWeight:
                              props.navigationState.index === i
                                ? '500'
                                : 'normal',
                          },
                        ]}>
                        {route.title}
                      </Animated.Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <Animated.View
                style={[
                  styles.tabBarLine,
                  {transform: [{translateX: lineLeft}]},
                ]}
              />
            </View>
          );
        }}
      />
    );
  },
});

export default connect((state: any) => {
  const {user} = state;
  return {
    user,
  };
})(Page);

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    backgroundColor: 'transparent',
    zIndex: 99,
    flexDirection: 'column',
    top: Screen.calc(20) + (StatusBar.currentHeight || 0),
    paddingHorizontal: Screen.calc(30),
  },

  tabBarTop: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  tabItem: {
    marginRight: Screen.calc(20),
  },
  tabBarItemText: {
    color: '#fff',
  },
  tabBarLine: {
    width: Screen.calc(30),
    height: Screen.calc(3),
    backgroundColor: '#fff',
    marginTop: Screen.calc(10),
    borderRadius: Screen.calc(1.5),
  },
});
