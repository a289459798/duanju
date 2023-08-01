import {NativeModules} from 'react-native';

const {RNCommon} = NativeModules;

class CommonModule {
  getMetaData(name: string) {
    return RNCommon.getMetaData(name);
  }
}

export default new CommonModule();
