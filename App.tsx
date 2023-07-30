/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  NavigationContainer,
  useNavigationContainerRef,
  useRoute,
} from '@react-navigation/native';
import type {LinkingOptions} from '@react-navigation/native';
import React, {useLayoutEffect, useRef, useState} from 'react';
import {
  AppState,
  EmitterSubscription,
  Linking,
  NativeAppEventEmitter,
} from 'react-native';
import Spinner from 'react-native-spinkit';
import {Analytics, Share} from 'react-native-umshare';
import {Provider} from 'react-redux';
import {applyMiddleware, legacy_createStore as createStore} from 'redux';
import thunk from 'redux-thunk';

import userAction from '@/action/userAction';
import {SplashScreen, TTAdSdk} from '@/briage/module';
import UpdateModal, {UpdateModalRef} from '@/component/modal/updateModal';
import Config from '@/config';
import reducers from '@/reducer';
import {GlobalLoadingType} from '@/reducer/global';
import Route from '@/route';
import LinkConfig from '@/route/route';
import config from '@/config';
import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';
import DPSdk from 'briage/module/DPSdk';
import types from 'reducer/types';
import historyAction from 'action/historyAction';

const store = createStore(reducers, applyMiddleware(thunk));
function App(): JSX.Element {
  const linking: LinkingOptions<{}> = {
    prefixes: [Config.Scheme],

    async getInitialURL() {
      const url = await Linking.getInitialURL();
      setTimeout(() => {
        if (url) {
          Linking.openURL(url);
        }
      }, 500);
      return url;
    },

    subscribe(listener: Function) {
      const linkingSubscription = Linking.addEventListener('url', ({url}) => {
        listener(url);
      });

      return () => {
        linkingSubscription.remove();
      };
    },

    config: LinkConfig,
  };
  const init = () => {
    initSdk();
  };

  let loginEmit: EmitterSubscription;
  const initSdk = () => {
    TTAdSdk.init(
      config.CSJ.AppId,
      config.AppName,
      () => {
        console.log('穿山甲初始成功');
        DPSdk.start(() => {
          store.dispatch({
            type: types.global.dpstart,
          });
          store.dispatch(historyAction.fetchHistory());
        });
        TTAdSdk.loadSplashAd(config.CSJ.Code.Splash, () => {
          SplashScreen.hide();
        });
      },
      (status: number, error: string) => {
        console.log('穿山甲初始化失败：', status, error);
      },
    );
    initDb();
    initUser();
    Analytics.init(Config.UM.Appkey, Config.DEBUG);
    Share.init(Config.UM.Appkey, Config.UM.Share, Config.DEBUG);

    loginEmit = NativeAppEventEmitter.addListener('401', () => {
      console.log('login');
    });
  };

  const initUser = () => {
    store.dispatch(userAction.userInfo());
  };

  const initDb = () => {
    SQLite.DEBUG(config.DEBUG);
    global.db = SQLite.openDatabase(
      {name: 'duanjiu'},
      () => {},
      () => {},
    );
    global.db?.transaction((tx: SQLiteDatabase) => {
      // tx.executeSql('DROP TABLE IF EXISTS Follow', []);
      // tx.executeSql('DROP TABLE IF EXISTS Ad', []);
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Follow(id INTEGER PRIMARY KEY NOT NULL, current INTEGER, duration INTEGER, time DATETIME)',
      );
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Ad(id INTEGER , current INTEGER)',
      );
    });
    SQLite.enablePromise(true);
  };

  const updateModalRef = useRef<UpdateModalRef>(null);

  const navigationRef = useNavigationContainerRef();
  useLayoutEffect(() => {
    init();
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        if (navigationRef.isReady()) {
          NativeAppEventEmitter.emit(
            'AppStateActive',
            navigationRef.getCurrentRoute()?.name,
          );
        }
      }
    });
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
    return () => {
      loginEmit?.remove();
      subscription.remove();
    };
  }, []);

  const [loading, setLoading] = useState<GlobalLoadingType>();
  store.subscribe(() => {
    setLoading(store.getState().global.loading);
  });

  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef} linking={linking}>
        <Route />
        <UpdateModal ref={updateModalRef} />
        {loading?.visible && (
          <Spinner
            style={{
              position: 'absolute',
              zIndex: 999,
              alignSelf: 'center',
              top: '30%',
            }}
            isVisible={loading?.visible}
            size={loading?.size || 40}
            type={loading?.type || 'Wave'}
            color={loading?.color || '#fff'}
          />
        )}
      </NavigationContainer>
    </Provider>
  );
}

export default App;
