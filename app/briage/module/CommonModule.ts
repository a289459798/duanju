import {NativeModules} from 'react-native';

const {RNCommon} = NativeModules;

class CommonModule {
  getMetaData(name: string) {
    return RNCommon.getMetaData(name);
  }

  getAssetsData(fileName: string) {
    return RNCommon.getAssetsData(fileName);
  }
}

export default new CommonModule();
