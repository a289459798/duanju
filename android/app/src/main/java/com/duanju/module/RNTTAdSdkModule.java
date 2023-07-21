package com.duanju.module;

import android.app.Activity;
import android.app.Dialog;
import android.content.Context;
import android.os.Build;
import android.os.Bundle;
import android.util.DisplayMetrics;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.view.WindowManager;
import android.widget.LinearLayout;

import androidx.annotation.NonNull;

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
import com.bytedance.sdk.openadsdk.TTSplashAd;
import com.duanju.BuildConfig;
import com.duanju.R;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.lang.ref.WeakReference;

public class RNTTAdSdkModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    TTAdNative ttAdNative;
    TTRewardVideoAd ad;

    public RNTTAdSdkModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "RNTTAdSdk";
    }

    @ReactMethod
    public void init(String appId, String appName,
                     Callback successCallback, Callback errorCallback) {
        final ReactApplicationContext reactContext = this.reactContext;
        TTAdSdk.getAdManager().requestPermissionIfNecessary(reactContext);
        this.reactContext.runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                TTAdSdk.init(reactContext,
                        new TTAdConfig.Builder()
                                .appId(appId)//xxxxxxx为穿山甲媒体平台注册的应用ID
//                        .useTextureView(true) //默认使用SurfaceView播放视频广告,当有SurfaceView冲突的场景，可以使用TextureView
                                .appName(appName)
                                .titleBarTheme(TTAdConstant.TITLE_BAR_THEME_DARK)//落地页主题
                                .allowShowNotify(true) //是否允许sdk展示通知栏提示,若设置为false则会导致通知栏不显示下载进度，存在违规风险，请勿随意更改
                                .debug(BuildConfig.DEBUG) //测试阶段打开，可以通过日志排查问题，上线时去除该调用
                                .directDownloadNetworkType(TTAdConstant.NETWORK_STATE_WIFI) //允许直接下载的网络状态集合,没有设置的网络下点击下载apk会有二次确认弹窗，弹窗中会披露应用信息
                                .supportMultiProcess(false) //是否支持多进程，true支持
                                .asyncInit(true) //是否异步初始化sdk,设置为true可以减少SDK初始化耗时。3450版本开始废弃~~
                                //.httpStack(new MyOkStack3())//自定义网络库，demo中给出了okhttp3版本的样例，其余请自行开发或者咨询工作人员。
                                .build(), new TTAdSdk.InitCallback() {
                            @Override
                            public void success() {
                                successCallback.invoke();
                            }

                            @Override
                            public void fail(int i, String s) {
                                errorCallback.invoke(i, s);
                            }
                        });
            }
        });

    }

    private TTAdNative getAdNative() {
        if (ttAdNative == null) {
            TTAdManager ttAdManager = TTAdSdk.getAdManager();
            ttAdNative = ttAdManager.createAdNative(reactContext);
        }
        return ttAdNative;
    }

    @ReactMethod
    public void loadAd(String codeId, float expressViewWidth, float expressViewHeight, Callback onRewardVideoCached, Callback onError) {
        AdSlot adSlot = new AdSlot.Builder()
                .setCodeId(codeId) // 广告代码位Id
                .setAdLoadType(TTAdLoadType.LOAD) // 本次广告用途：TTAdLoadType.LOAD实时；TTAdLoadType.PRELOAD预请求
                .setExpressViewAcceptedSize(expressViewWidth, expressViewHeight)
                .build();

        getAdNative().loadRewardVideoAd(adSlot, new TTAdNative.RewardVideoAdListener() {

            @Override
            public void onError(int i, String s) {
                if (onError != null) {
                    onError.invoke(i, s);
                }
            }

            @Override
            public void onRewardVideoAdLoad(TTRewardVideoAd ttRewardVideoAd) {

            }

            @Override
            public void onRewardVideoCached() {

            }

            @Override
            public void onRewardVideoCached(TTRewardVideoAd ad1) {
                if (onRewardVideoCached != null) {
                    onRewardVideoCached.invoke();
                }
                ad = ad1;
            }

        });
    }

    @ReactMethod
    public void showAd() {
        if (ad != null) {
            ad.setRewardAdInteractionListener(new TTRewardVideoAd.RewardAdInteractionListener() {
                @Override
                public void onAdShow() {
                    reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                            .emit("onAdShow", null);
                }

                @Override
                public void onAdVideoBarClick() {
                    reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                            .emit("onAdVideoBarClick", null);
                }

                @Override
                public void onAdClose() {
                    reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                            .emit("onAdClose", null);
                }

                @Override
                public void onVideoComplete() {
                    reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                            .emit("onVideoComplete", null);
                }

                @Override
                public void onVideoError() {
                    reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                            .emit("onVideoError", null);
                }

                @Override
                public void onRewardVerify(boolean b, int i, String s, int i1, String s1) {
                }

                @Override
                public void onRewardArrived(boolean b, int i, Bundle bundle) {
                    reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                            .emit("onRewardArrived", null);
                }

                @Override
                public void onSkippedVideo() {
                    reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                            .emit("onSkippedVideo", null);
                }
            });
            ad.showRewardVideoAd(reactContext.getCurrentActivity());
        }
    }

    @ReactMethod
    public void loadSplashAd(String codeId) {
        DisplayMetrics dm = new DisplayMetrics();
        dm = new DisplayMetrics();
        getCurrentActivity().getWindowManager().getDefaultDisplay().getMetrics(dm);
        float density = dm.density; // 屏幕密度（像素比例：0.75/1.0/1.5/2.0）
        int screenWidthDip = dm.widthPixels; // 屏幕宽（dip，如：320dip）
        int screenHeightDip = dm.heightPixels; // 屏幕宽（dip，如：533dip）
        int screenWidth = (int)(dm.widthPixels * density + 0.5f); // 屏幕宽（px，如：720px）
        int screenHeight = (int)(dm.heightPixels * density + 0.5f); // 屏幕高（px，如：1280px）
        AdSlot adSlot = new AdSlot.Builder()
                .setCodeId(codeId) // 广告代码位Id
                .setAdLoadType(TTAdLoadType.LOAD) // 本次广告用途：TTAdLoadType.LOAD实时；TTAdLoadType.PRELOAD预请求
                .setImageAcceptedSize(screenWidth, screenHeight)
                .setExpressViewAcceptedSize(screenWidthDip, screenHeightDip)
                .build();

        getAdNative().loadSplashAd(adSlot, new TTAdNative.CSJSplashAdListener() {

            @Override
            public void onSplashLoadSuccess() {

            }

            @Override
            public void onSplashLoadFail(CSJAdError csjAdError) {

            }

            @Override
            public void onSplashRenderSuccess(CSJSplashAd csjSplashAd) {
                if (csjSplashAd == null) {
                    return;
                }
                View v = csjSplashAd.getSplashView();
                csjSplashAd.setSplashAdListener(new CSJSplashAd.SplashAdListener() {
                    @Override
                    public void onSplashAdShow(CSJSplashAd csjSplashAd) {

                    }

                    @Override
                    public void onSplashAdClick(CSJSplashAd csjSplashAd) {
                        ((ViewGroup) getCurrentActivity().getWindow().getDecorView()).removeView(v);
                    }

                    @Override
                    public void onSplashAdClose(CSJSplashAd csjSplashAd, int i) {
                        ((ViewGroup) getCurrentActivity().getWindow().getDecorView()).removeView(v);
                    }
                });
                ((ViewGroup) getCurrentActivity().getWindow().getDecorView()).addView(v);
            }

            @Override
            public void onSplashRenderFail(CSJSplashAd csjSplashAd, CSJAdError csjAdError) {

            }
        }, 4000);
    }

    @ReactMethod
    public void addListener(String eventName) {

    }

    @ReactMethod
    public void removeListeners(Integer count) {

    }
}