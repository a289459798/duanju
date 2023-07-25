import {NativeModules, NativeEventEmitter} from 'react-native';

const {RNDPSdk} = NativeModules;

class DPSdk extends NativeEventEmitter {
  constructor() {
    super(RNDPSdk);
  }

  start() {
    RNDPSdk.start();
  }

  list(page: number, count: number = 20, order: boolean = true) {
    return RNDPSdk.list(page, count, order);
  }
}

export default new DPSdk();
