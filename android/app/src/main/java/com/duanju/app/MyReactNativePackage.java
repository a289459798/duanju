package com.duanju.app;

import androidx.annotation.NonNull;

import com.duanju.app.module.RNCommonModule;
import com.duanju.app.module.RNDPSdkModule;
import com.duanju.app.module.RNTTAdSdkModule;
import com.duanju.app.view.video.ReactCSJTJVideoManager;
import com.duanju.app.view.video.ReactCSJVideoManager;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.duanju.app.module.RNSplashScreenModule;

import java.util.ArrayList;
import java.util.List;

public class MyReactNativePackage implements ReactPackage {
    @NonNull
    @Override
    public List<NativeModule> createNativeModules(@NonNull ReactApplicationContext reactApplicationContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new RNSplashScreenModule(reactApplicationContext));
        modules.add(new RNTTAdSdkModule(reactApplicationContext));
        modules.add(new RNDPSdkModule(reactApplicationContext));
        modules.add(new RNCommonModule(reactApplicationContext));
        return modules;
    }

    @NonNull
    @Override
    public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactApplicationContext) {
        List<ViewManager> viewManagers = new ArrayList<>();
        viewManagers.add(new ReactCSJTJVideoManager(reactApplicationContext));
        viewManagers.add(new ReactCSJVideoManager(reactApplicationContext));
        return viewManagers;
    }
}
