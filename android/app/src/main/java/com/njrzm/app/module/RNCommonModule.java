package com.njrzm.app.module;

import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.util.DisplayMetrics;
import android.view.View;
import android.view.ViewGroup;

import com.bytedance.sdk.openadsdk.AdSlot;
import com.bytedance.sdk.openadsdk.CSJAdError;
import com.bytedance.sdk.openadsdk.CSJSplashAd;
import com.bytedance.sdk.openadsdk.TTAdConfig;
import com.bytedance.sdk.openadsdk.TTAdConstant;
import com.bytedance.sdk.openadsdk.TTAdLoadType;
import com.bytedance.sdk.openadsdk.TTAdManager;
import com.bytedance.sdk.openadsdk.TTAdNative;
import com.bytedance.sdk.openadsdk.TTAdSdk;
import com.bytedance.sdk.openadsdk.TTRewardVideoAd;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.njrzm.app.BuildConfig;

import java.io.BufferedReader;
import java.io.InputStreamReader;

public class RNCommonModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public RNCommonModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "RNCommon";
    }

    @ReactMethod
    public void getMetaData(String name, Promise promise) {
        try {
            ApplicationInfo info = reactContext.getPackageManager().getApplicationInfo(
                    reactContext.getPackageName(), PackageManager.GET_META_DATA);
            int data = info.metaData.getInt(name);
            promise.resolve(data);
        } catch (PackageManager.NameNotFoundException e) {
            promise.reject("", "");
            throw new RuntimeException(e);
        }

    }

    @ReactMethod
    public void getAssetsData(String fileName, Promise promise) {
        try {
            InputStreamReader inputReader = new InputStreamReader(reactContext.getResources().getAssets().open(fileName));
            BufferedReader bufReader = new BufferedReader(inputReader);
            String line = "";
            String Result = "";
            while ((line = bufReader.readLine()) != null)
                Result += line;
            promise.resolve(Result);
        } catch (Exception e) {
            promise.reject("", "");
            e.printStackTrace();
        }
    }
}