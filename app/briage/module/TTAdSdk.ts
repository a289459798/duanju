import {NativeModules, NativeEventEmitter} from 'react-native';

const {RNTTAdSdk} = NativeModules;

class TTAdSdk extends NativeEventEmitter {
  constructor() {
    super(RNTTAdSdk);
  }

  init(
    appId: string,
    appName: string,
    successCallback: () => void,
    errorCallback: (status: number, error: string) => void,
  ) {
    RNTTAdSdk.init(appId, appName, successCallback, errorCallback);
  }

  loadAd(
    codeId: string,
    width: number,
    height: number,
    onRewardVideoCached?: () => void,
    onError?: (code: number, error: string) => void,
  ) {
    RNTTAdSdk.loadAd(codeId, width, height, onRewardVideoCached, onError);
  }

  showAd() {
    RNTTAdSdk.showAd();
  }

  loadSplashAd(codeId: string, width: number, height: number) {
    RNTTAdSdk.loadSplashAd(codeId, width, height);
  }
}

export default new TTAdSdk();
