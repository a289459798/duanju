package com.njrzm.app.module;

import android.util.Log;

import com.bytedance.sdk.dp.DPDrama;
import com.bytedance.sdk.dp.DPSdk;
import com.bytedance.sdk.dp.IDPWidgetFactory;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class RNDPSdkModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public RNDPSdkModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "RNDPSdk";
    }

    @ReactMethod
    public void start(Callback callback) {
        DPSdk.start(new DPSdk.StartListener() {
            @Override
            public void onStartComplete(boolean b, String s) {
                Log.d("RNDPSdk", "onStartComplete:" + s);
                callback.invoke();
            }
        });
    }

    @ReactMethod
    public void list(int page, int count, boolean order,
                     Promise promise) {
        if (DPSdk.isStartSuccess()) {
            DPSdk.factory().requestAllDrama(page, count, order, new IDPWidgetFactory.DramaCallback() {
                @Override
                public void onError(int i, String s) {
                    promise.reject(i + "", s);
                }

                @Override
                public void onSuccess(List<? extends DPDrama> list, Map<String, Object> map) {
                    promise.resolve(getData(list, map));
                }
            });
        }
    }

    @ReactMethod
    public void history(int page, int count,
                        Promise promise) {
        if (DPSdk.isStartSuccess()) {
            DPSdk.factory().getDramaHistory(page, count, new IDPWidgetFactory.DramaCallback() {
                @Override
                public void onError(int i, String s) {
                    promise.reject(i + "", s);
                }

                @Override
                public void onSuccess(List<? extends DPDrama> list, Map<String, Object> map) {
                    promise.resolve(getData(list, map));
                }
            });
        }
    }

    @ReactMethod
    public void listWithIds(ReadableArray ids,
                            Promise promise) {
        if (DPSdk.isStartSuccess()) {
            List<Long> newIds = new ArrayList<>();
            for (int i = 0; i < ids.size(); i++) {
                newIds.add((long) ids.getDouble(i));
            }
            DPSdk.factory().requestDrama(newIds, new IDPWidgetFactory.DramaCallback() {
                @Override
                public void onError(int i, String s) {
                    promise.reject(i + "", s);
                }

                @Override
                public void onSuccess(List<? extends DPDrama> list, Map<String, Object> map) {
                    promise.resolve(getData(list, map));
                }
            });
        }
    }

    @ReactMethod
    public void categoryList(Promise promise) {
        if (DPSdk.isStartSuccess()) {
            DPSdk.factory().requestDramaCategoryList(new IDPWidgetFactory.DramaCategoryCallback() {
                @Override
                public void onError(int i, String s) {
                    promise.reject(i + "", s);
                }

                @Override
                public void onSuccess(List<String> list) {
                    WritableArray params = Arguments.createArray();
                    for (String item :
                            list) {
                        params.pushString(item);
                    }
                    promise.resolve(params);
                }
            });
        }
    }

    @ReactMethod
    public void listWithCategory(String category, int page, int count,
                                 Promise promise) {
        if (DPSdk.isStartSuccess()) {
            DPSdk.factory().requestDramaByCategory(category, page, count, new IDPWidgetFactory.DramaCallback() {
                @Override
                public void onError(int i, String s) {
                    promise.reject(i + "", s);
                }

                @Override
                public void onSuccess(List<? extends DPDrama> list, Map<String, Object> map) {
                    promise.resolve(getData(list, map));
                }
            });
        }
    }

    private WritableArray getData(List<? extends DPDrama> list, Map<String, Object> map) {
        WritableArray params = Arguments.createArray();
        for (DPDrama item :
                list) {
            WritableMap obj = Arguments.createMap();
            obj.putDouble("id", item.id);
            obj.putInt("index", item.index);
            obj.putString("title", item.title);
            obj.putString("coverImage", item.coverImage);
            obj.putInt("status", item.status);
            obj.putInt("total", item.total);
            obj.putString("type", item.type);
            obj.putString("desc", item.desc);
            obj.putString("scriptName", item.scriptName);
            obj.putString("scriptAuthor", item.scriptAuthor);
            obj.putDouble("actionTime", item.actionTime);
            obj.putDouble("createTime", item.createTime);
            params.pushMap(obj);
        }
        return params;
    }

    @ReactMethod
    public void addListener(String eventName) {

    }

    @ReactMethod
    public void removeListeners(Integer count) {

    }
}