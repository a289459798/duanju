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
              const inputRange = props.navigationState.routes.map(
                (_x: any, i: number) => i,
              );

              return (
                <ScrollView
                  ref={scrollViewRef}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    alignItems: 'center',
                    height: Screen.calc(60),
                  }}
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
                                  ? Screen.calc(22)
                                  : Screen.calc(15),
                              fontWeight:
                                props.navigationState.index === i
                                  ? '500'
                                  : 'normal',
                              color:
                                props.navigationState.index === i
                                  ? '#222'
                                  : '#999',
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
  container: {flex: 1, paddingHorizontal: Screen.calc(12)},
  tabBar: {
    backgroundColor: 'red',
    marginTop: Screen.calc(20) + (StatusBar.currentHeight || 0),
    height: Screen.calc(60),
  },

  tabItem: {
    marginRight: Screen.calc(35),
  },
  tabBarItemText: {
    color: '#000',
  },
});
