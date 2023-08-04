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
      r.push({
        key: '0',
        title: '全部',
      });
      s['0'] = () => <List category={'0'} />;
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
        {routes?.length > 0 && (
          <TabView
            lazy
            navigationState={{index, routes}}
            renderScene={SceneMap(scene)}
            onIndexChange={(i: number) => {
              setIndex(i);
              scrollViewRef.current?.scrollTo({x: i * 60});
            }}
            renderTabBar={(props: any) => {
              return (
                <View>
                  <ScrollView
                    ref={scrollViewRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                      alignItems: 'center',
                      paddingVertical: Screen.calc(10),
                    }}
                    style={styles.tabBar}>
                    {props.navigationState.routes.map(
                      (route: any, i: number) => {
                        return (
                          <TouchableOpacity
                            key={i}
                            style={styles.tabItem}
                            onPress={() => setIndex(i)}>
                            <Animated.Text
                              style={[
                                styles.tabBarItemText,
                                {
                                  fontSize:
                                    props.navigationState.index === i
                                      ? Screen.calc(22)
                                      : Screen.calc(15),
                                  fontWeight:
                                    props.navigationState.index === i
                                      ? '500'
                                      : 'normal',
                                  color:
                                    props.navigationState.index === i
                                      ? '#222'
                                      : '#666',
                                },
                              ]}>
                              {route.title}
                            </Animated.Text>
                            <View
                              style={[
                                styles.line,
                                {
                                  backgroundColor:
                                    props.navigationState.index === i
                                      ? '#FF5501'
                                      : 'transparent',
                                },
                              ]}
                            />
                          </TouchableOpacity>
                        );
                      },
                    )}
                  </ScrollView>
                </View>
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
  container: {flex: 1, paddingHorizontal: Screen.calc(12)},
  tabBar: {
    backgroundColor: 'transparent',
    marginTop: Screen.calc(10) + (StatusBar.currentHeight || 0),
  },

  tabItem: {
    marginRight: Screen.calc(35),
    alignItems: 'center',
  },
  tabBarItemText: {
    color: '#000',
  },
  line: {
    width: Screen.calc(24),
    height: Screen.calc(5),
    marginTop: Screen.calc(4),
  },
});
