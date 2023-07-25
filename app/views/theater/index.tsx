import React, {useEffect, useRef, useState} from 'react';
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
import {DPSdk} from 'briage/module';

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
    const scrollViewRef = useRef<ScrollView>(null);

    const fetchCategory = async () => {
      const category = await DPSdk.category();
      let r = [];
      let s: any = {};
      for (let i = 0; i < category.length; i++) {
        r.push({
          key: category[i],
          title: category[i],
        });
        s[category[i]] = () => <List category={category[i]} />;
      }
      setScene(s);
      setRoutes(r);
    };
    useEffect(() => {
      fetchCategory();
    }, []);
    return (
      <View style={styles.container}>
        <LinearGradient
          style={styles.bg}
          colors={['rgb(242, 209, 178)', '#fff']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 0.4}}
        />
        {routes?.length > 0 && (
          <TabView
            lazy
            navigationState={{index, routes}}
            renderScene={SceneMap(scene)}
            onIndexChange={(i: number) => {
              setIndex(i);
              scrollViewRef.current?.scrollTo({x: i * 40});
            }}
            renderTabBar={(props: any) => {
              const inputRange = props.navigationState.routes.map(
                (_x: any, i: number) => i,
              );

              return (
                <ScrollView
                  ref={scrollViewRef}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.tabBar}>
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
                </ScrollView>
              );
            }}
          />
        )}
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
    top: Screen.calc(20) + (StatusBar.currentHeight || 0),
    paddingHorizontal: Screen.calc(30),
    left: 0,
    right: 0,
  },

  tabItem: {
    marginRight: Screen.calc(20),
  },
  tabBarItemText: {
    color: '#000',
  },
});
