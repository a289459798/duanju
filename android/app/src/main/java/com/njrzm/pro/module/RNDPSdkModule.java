package com.njrzm.pro.module;

import com.bytedance.sdk.dp.DPDrama;
import com.bytedance.sdk.dp.DPSdk;
import com.bytedance.sdk.dp.IDPWidgetFactory;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

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
    public void list(int page, int count, boolean order,
                     Callback successCallback, Callback errorCallback) {
        DPSdk.factory().requestAllDrama(page, count, order, new IDPWidgetFactory.DramaCallback() {
            @Override
            public void onError(int i, String s) {
                errorCallback.invoke(i, s);
            }

            @Override
            public void onSuccess(List<? extends DPDrama> list, Map<String, Object> map) {
                successCallback.invoke(getData(list, map));
            }
        });
    }

    @ReactMethod
    public void listWithIds(List<Long> ids,
                            Callback successCallback, Callback errorCallback) {
        DPSdk.factory().requestDrama(ids, new IDPWidgetFactory.DramaCallback() {
            @Override
            public void onError(int i, String s) {
                errorCallback.invoke(i, s);
            }

            @Override
            public void onSuccess(List<? extends DPDrama> list, Map<String, Object> map) {
                successCallback.invoke(getData(list, map));
            }
        });
    }

    @ReactMethod
    public void categoryList(Callback successCallback, Callback errorCallback) {
        DPSdk.factory().requestDramaCategoryList(new IDPWidgetFactory.DramaCategoryCallback() {
            @Override
            public void onError(int i, String s) {
                errorCallback.invoke(i, s);
            }

            @Override
            public void onSuccess(List<String> list) {
                WritableArray params = Arguments.createArray();
                for (String item :
                        list) {
                    params.pushString(item);
                }
                successCallback.invoke(params);
            }
        });
    }

    @ReactMethod
    public void listWithCategory(String category, int page, int count,
                                 Callback successCallback, Callback errorCallback) {
        DPSdk.factory().requestDramaByCategory(category, page, count, new IDPWidgetFactory.DramaCallback() {
            @Override
            public void onError(int i, String s) {
                errorCallback.invoke(i, s);
            }

            @Override
            public void onSuccess(List<? extends DPDrama> list, Map<String, Object> map) {
                successCallback.invoke(getData(list, map));
            }
        });
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
}