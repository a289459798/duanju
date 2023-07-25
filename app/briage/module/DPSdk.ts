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

  history(page: number, count: number = 24) {
    return RNDPSdk.history(page, count);
  }

  category() {
    return RNDPSdk.categoryList();
  }

  listWithcCategory(title: string, page: number, count: number = 24) {
    return RNDPSdk.listWithCategory(title, page, count);
  }
}

export default new DPSdk();
