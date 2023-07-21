import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {CreatePage, Screen} from '@/utils';
import {SceneMap, TabView} from 'react-native-tab-view';
import List from './list';
import {
  Animated,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Page = CreatePage({
  navigationProps: () => ({
    hideSafe: true,
    hideHeader: true,
    statusBar: {translucent: true, backgroundColor: 'transparent'},
  }),
  Component: () => {
    const [index, setIndex] = useState(0);
    const [routes, setRoutes] = useState<any>([]);
    const [scene, setScene] = useState<any>({});

    useEffect(() => {
      setRoutes([
        {key: 'dushi', title: '都市'},
        {key: 'guzhuang', title: '古装'},
      ]);
      setScene({
        dushi: List,
        guzhuang: List,
      });
    }, []);
    return (
      <View style={styles.container}>
        <LinearGradient
          style={styles.bg}
          colors={['rgb(242, 209, 178)', '#fff']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 0.4}}
        />
        <TabView
          lazy
          navigationState={{index, routes}}
          renderScene={SceneMap(scene)}
          onIndexChange={setIndex}
          renderTabBar={(props: any) => {
            const inputRange = props.navigationState.routes.map(
              (_x: any, i: number) => i,
            );

            return (
              <ScrollView style={styles.tabBar}>
                <View style={styles.tabBarTop}>
                  {props.navigationState.routes.map((route: any, i: number) => {
                    const opacity = props.position.interpolate({
                      inputRange,
                      outputRange: inputRange.map((inputIndex: number) =>
                        inputIndex === i ? 1 : 0.5,
                      ),
                    });

                    return (
                      <TouchableOpacity
                        key={i}
                        style={styles.tabItem}
                        onPress={() => setIndex(i)}>
                        <Animated.Text
                          style={[
                            styles.tabBarItemText,
                            {
                              opacity,
                              fontSize:
                                props.navigationState.index === i
                                  ? Screen.calc(16)
                                  : Screen.calc(14),
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
              </ScrollView>
            );
          }}
        />
      </View>
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
  container: {flex: 1},
  bg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
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
    color: '#000',
  },
});
