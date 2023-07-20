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

  initAd(codeId: string) {
    RNTTAdSdk.initAd(codeId);
  }

  loadAd(
    onRewardVideoCached?: () => void,
    onError?: (code: number, error: string) => void,
  ) {
    RNTTAdSdk.loadAd(onRewardVideoCached, onError);
  }

  showAd() {
    RNTTAdSdk.showAd();
  }
}

export default new TTAdSdk();
