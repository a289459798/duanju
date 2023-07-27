import React, {useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {CreatePage, Screen} from '@/utils';
import {TabView} from 'react-native-tab-view';
import History from './history';
import Recommand, {RecommandRef} from './recommand';
import {
  Animated,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import historyAction from 'action/historyAction';

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
        if (index === 1) {
          commandResume();
        }
      });
      return () => {
        navgation.removeListener('focus', () => {});
      };
    }, []);

    const commandResume = () => {
      commandRef.current?.resume();
    };

    return (
      <TabView
        lazy
        swipeEnabled={false}
        navigationState={{index, routes}}
        renderScene={({route}) => {
          switch (route.key) {
            case 'history':
              return <History history={history.history} dispatch={dispatch} />;
            case 'recommand':
              return <Recommand ref={commandRef} dpstart={global.dpstart} />;
          }
        }}
        onIndexChange={(i: number) => {
          setIndex(i);
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
                      inputIndex === 0 ? Screen.calc(26) : Screen.calc(88),
                    ),
                  });

                  return (
                    <TouchableOpacity
                      key={i}
                      style={styles.tabItem}
                      onPress={() => {
                        setIndex(i);
                        if (i === 1) {
                          commandResume();
                        }
                      }}>
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
  },
  tabBarLine: {
    width: Screen.calc(30),
    height: Screen.calc(3),
    backgroundColor: '#fff',
    marginTop: Screen.calc(2),
    borderRadius: Screen.calc(1.5),
  },
});
