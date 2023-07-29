import React, {useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {CreatePage, Screen} from '@/utils';
import {TabView} from 'react-native-tab-view';
import History from './history';
import Recommand, {RecommandRef} from './recommand';
import {
  Animated,
  NativeAppEventEmitter,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import historyAction from 'action/historyAction';

let currentIdex = 1;
const Page = CreatePage({
  navigationProps: () => ({
    hideSafe: true,
    hideHeader: true,
    statusBar: {translucent: true, backgroundColor: 'transparent'},
  }),
  Component: (props: any) => {
    const [index, setIndex] = React.useState(1);
    const commandRef = useRef<RecommandRef>(null);
    const navgation = useNavigation();
    const [routes] = React.useState([
      {key: 'history', title: '历史观看'},
      {key: 'recommand', title: '推荐'},
    ]);
    const {global, history, dispatch} = props;

    useEffect(() => {
      navgation.addListener('focus', () => {
        props.dispatch(historyAction.fetchHistory());
        onTabChange(currentIdex);
      });
      navgation.addListener('blur', () => {
        commandPause();
      });
      const subscription = NativeAppEventEmitter.addListener(
        'AppStateActive',
        routeName => {
          if (routeName !== 'Index' || currentIdex !== 1) {
            commandRef.current?.pause();
          }
        },
      );

      return () => {
        navgation.removeListener('focus', () => {});
        navgation.removeListener('blur', () => {});
        subscription.remove();
      };
    }, []);

    const commandResume = () => {
      commandRef.current?.resume();
    };
    const commandPause = () => {
      setTimeout(() => {
        commandRef.current?.pause();
      }, 300);
    };

    const onTabChange = (i: number) => {
      currentIdex = i;
      setIndex(i);
      changeStatusBar(i);
      if (i === 1) {
        commandResume();
      } else {
        commandPause();
      }
    };

    const changeStatusBar = (i: number) => {
      if (i === 0) {
        StatusBar.setBarStyle('dark-content');
      } else {
        StatusBar.setBarStyle('light-content');
      }
    };

    return (
      <TabView
        lazy
        animationEnabled={false}
        swipeEnabled={true}
        navigationState={{index, routes}}
        renderScene={({route}) => {
          switch (route.key) {
            case 'history':
              return <History history={history.history} dispatch={dispatch} />;
            case 'recommand':
              return (
                <Recommand
                  ref={commandRef}
                  history={history.history}
                  dpstart={global.dpstart}
                />
              );
          }
        }}
        onIndexChange={(i: number) => {
          onTabChange(i);
        }}
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
                      inputIndex === 0 ? Screen.calc(32) : Screen.calc(94),
                    ),
                  });

                  return (
                    <TouchableOpacity
                      key={i}
                      style={styles.tabItem}
                      onPress={() => {
                        onTabChange(i);
                      }}>
                      <Animated.Text
                        style={[
                          styles.tabBarItemText,
                          {
                            opacity,
                            fontSize:
                              props.navigationState.index === i
                                ? Screen.calc(20)
                                : Screen.calc(16),
                            fontWeight:
                              props.navigationState.index === i
                                ? '500'
                                : 'normal',
                            color:
                              props.navigationState.index === 1
                                ? '#fff'
                                : '#222',
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
                  {
                    transform: [{translateX: lineLeft}],
                    backgroundColor:
                      props.navigationState.index === 1 ? '#fff' : '#FF5501',
                  },
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
  const {user, global, history} = state;
  return {
    user,
    global,
    history,
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
    fontWeight: 'bold',
  },
  tabBarLine: {
    width: Screen.calc(23),
    height: Screen.calc(4),
    backgroundColor: '#fff',
    marginTop: Screen.calc(6),
    borderRadius: Screen.calc(1.5),
  },
});
