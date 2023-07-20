/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import type {LinkingOptions} from '@react-navigation/native';
import React, {useLayoutEffect, useRef, useState} from 'react';
import {
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
import {ModalRef} from '@/component/modal';
import AgreementModal from '@/component/modal/agreementModal';
import UpdateModal, {UpdateModalRef} from '@/component/modal/updateModal';
import Config from '@/config';
import reducers from '@/reducer';
import {GlobalLoadingType} from '@/reducer/global';
import Route from '@/route';
import LinkConfig from '@/route/route';
import {Storage} from '@/utils';
import config from '@/config';

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
  const agreementModalRef = useRef<ModalRef>(null);
  const init = () => {
    Storage.get(Config.AgreementAlert).then(agreement => {
      if (!agreement) {
        agreementModalRef.current?.show();
      } else {
        initSdk();
      }
    });
  };

  let loginEmit: EmitterSubscription;
  const initSdk = () => {
    initUser();
    Analytics.init(Config.UM.Appkey, Config.DEBUG);
    Share.init(Config.UM.Appkey, Config.UM.Share, Config.DEBUG);
    TTAdSdk.init(
      config.CSJ.AppId,
      config.AppName,
      () => {
        console.log('穿山甲初始成功');
      },
      (status: number, error: string) => {
        console.log('穿山甲初始化失败：', status, error);
      },
    );
    loginEmit = NativeAppEventEmitter.addListener('401', () => {
      console.log('login');
    });
  };

  const initUser = () => {
    store.dispatch(userAction.userInfo());
  };

  const updateModalRef = useRef<UpdateModalRef>(null);

  useLayoutEffect(() => {
    setTimeout(() => {
      init();
      SplashScreen.hide();
    }, 2000);
    return () => {
      loginEmit?.remove();
    };
  }, []);

  const [loading, setLoading] = useState<GlobalLoadingType>();
  store.subscribe(() => {
    setLoading(store.getState().global.loading);
  });

  return (
    <Provider store={store}>
      <NavigationContainer linking={linking}>
        <Route />
        <AgreementModal
          ref={agreementModalRef}
          onPress={() => {
            Storage.set(Config.AgreementAlert, '1');
            initSdk();
            agreementModalRef.current?.hide();
          }}
        />
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
