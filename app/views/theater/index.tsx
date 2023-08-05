import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {CreatePage, Screen} from '@/utils';
import {SceneMap, TabView} from 'react-native-tab-view';
import List from './list';
import {
  Animated,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {DPSdk} from 'briage/module';
import dramaAction from 'action/dramaAction';
import useNavigator from 'hooks/useNavigator';
import FastImage from 'react-native-fast-image';

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
    const [hotList, setHotList] = useState<any>([]);
    const nav = useNavigator();

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
    const fetchHot = async () => {
      try {
        const hot: any = await dramaAction.hotList({offset: 1, limit: 8});
        if (hot?.total > 0) {
          setHotList(hot.list);
        }
      } catch (e) {}
    };
    useEffect(() => {
      fetchHot();
      fetchCategory();
    }, []);
    return (
      <View style={styles.container}>
        {hotList?.length > 0 && (
          <>
            <View style={styles.hotView}>
              <TouchableWithoutFeedback onPress={() => nav.push('Hot')}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: Screen.calc(12),
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image source={require('@/public/images/jc-rb.png')} />
                    <Text
                      style={{
                        fontSize: Screen.calc(18),
                        color: '#222',
                        fontWeight: '500',
                      }}>
                      热播短剧
                    </Text>
                  </View>
                  <Text style={{fontSize: Screen.calc(15), color: '#999'}}>
                    更多
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.hotListView}>
                  {hotList?.map((v: any, k: any) => (
                    <TouchableWithoutFeedback
                      key={k}
                      onPress={() =>
                        nav.push('Play', {id: v.id, index: v.index})
                      }>
                      <View style={styles.hotViewItem}>
                        <FastImage
                          style={styles.hotViewImage}
                          source={{uri: v.coverImage}}
                        />
                        <Text numberOfLines={1} style={styles.hotViewTitle}>
                          {v.title}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  ))}
                </View>
              </ScrollView>
            </View>
            <View style={{height: Screen.calc(8), backgroundColor: '#eee'}} />
          </>
        )}
        {routes?.length > 0 && (
          <TabView
            lazy
            navigationState={{index, routes}}
            renderScene={SceneMap(scene)}
            onIndexChange={(i: number) => {
              setIndex(i);
              scrollViewRef.current?.scrollTo({x: i * 60});
            }}
            sceneContainerStyle={{paddingHorizontal: Screen.calc(12)}}
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
  container: {
    flex: 1,
    paddingTop: Screen.calc(10) + (StatusBar.currentHeight || 0),
  },
  tabBar: {
    backgroundColor: 'transparent',
    marginTop: Screen.calc(10),
    paddingHorizontal: Screen.calc(12),
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
  hotView: {
    marginTop: Screen.calc(10),
  },
  hotListView: {
    flexDirection: 'row',
    paddingBottom: Screen.calc(14),
    paddingLeft: Screen.calc(12),
  },
  hotViewItem: {
    marginTop: Screen.calc(15),
    width: Screen.calc(80),
    marginRight: Screen.calc(20),
  },
  hotViewImage: {
    width: Screen.calc(90),
    height: Screen.calc(120),
    borderRadius: Screen.calc(6),
  },
  hotViewTitle: {
    alignSelf: 'center',
    fontSize: Screen.calc(15),
    marginTop: Screen.calc(4),
    color: '#222',
  },
});
