package com.duanju.app.module;

import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

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
            String data = info.metaData.getString(name);
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