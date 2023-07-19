import {NativeModules} from 'react-native';

const {RNSplashScreen} = NativeModules;

class SplashScreen {
  show() {
    RNSplashScreen.show();
  }

  hide() {
    RNSplashScreen.hide();
  }
}

export default new SplashScreen();
