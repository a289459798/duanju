package com.njrzm.pro.video;

import android.view.Choreographer;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.FragmentActivity;

import com.bytedance.sdk.dp.DPDrama;
import com.bytedance.sdk.dp.DPDramaDetailConfig;
import com.bytedance.sdk.dp.DPSdk;
import com.bytedance.sdk.dp.DPWidgetDramaDetailParams;
import com.bytedance.sdk.dp.IDPAdListener;
import com.bytedance.sdk.dp.IDPDramaListener;
import com.bytedance.sdk.dp.IDPWidget;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.List;
import java.util.Map;

public class ReactCSJVideoManager extends ViewGroupManager<FrameLayout> {

    public static final String REACT_CLASS = "CSJVideoManager";
    public final int COMMAND_CREATE = 1;
    ReactApplicationContext mCallerContext;

    private double id;
    private int index;
    private boolean isFromCard;
    private String fromGid;
    private int currentDuration;
    private DPDramaDetailConfig detailConfig;

    public ReactCSJVideoManager(ReactApplicationContext reactContext) {
        mCallerContext = reactContext;
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @NonNull
    @Override
    protected FrameLayout createViewInstance(@NonNull ThemedReactContext themedReactContext) {
        return new FrameLayout(mCallerContext);
    }

    @ReactProp(name = "id")
    public void setId(FrameLayout view, @Nullable double id) {
        this.id = id;
    }

    @ReactProp(name = "index")
    public void setIndex(FrameLayout view, @Nullable int index) {
        this.index = index;
    }

    @ReactProp(name = "isFromCard")
    public void setIsFromCard(FrameLayout view, @Nullable boolean isFromCard) {
        this.isFromCard = isFromCard;
    }

    @ReactProp(name = "fromGid")
    public void setFromGid(FrameLayout view, @Nullable String fromGid) {
        this.fromGid = fromGid;
    }

    @ReactProp(name = "currentDuration")
    public void setCurrentDuration(FrameLayout view, @Nullable int currentDuration) {
        this.currentDuration = currentDuration;
    }

    @ReactProp(name = "config")
    public void setDetailConfig(FrameLayout view, @Nullable ReadableMap config) {
        if (config.hasKey("mode")) {
            detailConfig = DPDramaDetailConfig.obtain(config.getString("mode"));
        } else {
            detailConfig = DPDramaDetailConfig.obtain("common");
        }

        if (config.hasKey("freeSet")) {
            detailConfig.freeSet = config.getInt("freeSet");
        }

        if (config.hasKey("lockSet")) {
            detailConfig.freeSet = config.getInt("lockSet");
        }

        if (config.hasKey("isHideLeftTopTips")) {
            detailConfig.mIsHideLeftTopTips = config.getBoolean("isHideLeftTopTips");
        }

        if (config.hasKey("isHideMore")) {
            detailConfig.mIsHideMore = config.getBoolean("isHideMore");
        }

        if (config.hasKey("infiniteScrollEnabled")) {
            detailConfig.mInfiniteScrollEnabled = config.getBoolean("infiniteScrollEnabled");
        }

    }

    /**
     * Map the "create" command to an integer
     */
    @Nullable
    @Override
    public Map<String, Integer> getCommandsMap() {
        return MapBuilder.of("create", COMMAND_CREATE);
    }

    /**
     * Handle "create" command (called from JS) and call createFragment method
     */
    @Override
    public void receiveCommand(@NonNull FrameLayout root, String commandId, @Nullable ReadableArray args) {
        super.receiveCommand(root, commandId, args);
        int reactNativeViewId = args.getInt(0);
        int commandIdInt = Integer.parseInt(commandId);
        switch (commandIdInt) {
            case COMMAND_CREATE:
                createFragment(root, reactNativeViewId);
                break;
            default: {
            }
        }
    }

    /**
     * Replace your React Native view with a custom fragment
     */
    public void createFragment(FrameLayout root, int reactNativeViewId) {
        ViewGroup parentView = (ViewGroup) root.findViewById(reactNativeViewId).getParent();
        setupLayout(parentView);

        DPWidgetDramaDetailParams params = DPWidgetDramaDetailParams.obtain();
        params.id = (long)this.id;
        params.index = this.index;
        params.mIsFromCard = this.isFromCard;
        params.mFromGid = this.fromGid;
        params.mCurrentDuration = this.currentDuration;

        if (this.detailConfig == null) {
            this.detailConfig = DPDramaDetailConfig.obtain("common");
        }

        this.detailConfig.listener(new IDPDramaListener() {
            @Override
            public void onDPSeekTo(int i, long l) {
                super.onDPSeekTo(i, l);
            }

            @Override
            public void onDPPageChange(int i, Map<String, Object> map) {
                super.onDPPageChange(i, map);
            }

            @Override
            public void onDPVideoPlay(Map<String, Object> map) {
                super.onDPVideoPlay(map);
            }

            @Override
            public void onDPVideoPause(Map<String, Object> map) {
                super.onDPVideoPause(map);
            }

            @Override
            public void onDPVideoContinue(Map<String, Object> map) {
                super.onDPVideoContinue(map);
            }

            @Override
            public void onDPVideoCompletion(Map<String, Object> map) {
                super.onDPVideoCompletion(map);
            }

            @Override
            public void onDPVideoOver(Map<String, Object> map) {
                super.onDPVideoOver(map);
            }

            @Override
            public void onDPClose() {
                super.onDPClose();
            }

            @Override
            public void onDPRequestStart(@Nullable Map<String, Object> map) {
                super.onDPRequestStart(map);
            }

            @Override
            public void onDPRequestFail(int i, String s, @Nullable Map<String, Object> map) {
                super.onDPRequestFail(i, s, map);
            }

            @Override
            public void onDPRequestSuccess(List<Map<String, Object>> list) {
                super.onDPRequestSuccess(list);
            }

            @Override
            public boolean isNeedBlock(DPDrama dpDrama, int i, @Nullable Map<String, Object> map) {
                return super.isNeedBlock(dpDrama, i, map);
            }

            @Override
            public void showAdIfNeeded(DPDrama dpDrama, Callback callback, @Nullable Map<String, Object> map) {
                super.showAdIfNeeded(dpDrama, callback, map);
            }

            @Override
            public void onDramaSwitch(@Nullable Map<String, Object> map) {
                super.onDramaSwitch(map);
            }

            @Override
            public void onDramaGalleryShow(@Nullable Map<String, Object> map) {
                super.onDramaGalleryShow(map);
            }

            @Override
            public void onDramaGalleryClick(@Nullable Map<String, Object> map) {
                super.onDramaGalleryClick(map);
            }

            @Override
            public void onRewardDialogShow(@Nullable Map<String, Object> map) {
                super.onRewardDialogShow(map);
            }

            @Override
            public void onUnlockDialogAction(String s, @Nullable Map<String, Object> map) {
                super.onUnlockDialogAction(s, map);
            }
        });
        this.detailConfig.adListener(new IDPAdListener() {
            @Override
            public void onDPAdRequest(Map<String, Object> map) {
                super.onDPAdRequest(map);
            }

            @Override
            public void onDPAdRequestSuccess(Map<String, Object> map) {
                super.onDPAdRequestSuccess(map);
            }

            @Override
            public void onDPAdRequestFail(int i, String s, Map<String, Object> map) {
                super.onDPAdRequestFail(i, s, map);
            }

            @Override
            public void onDPAdFillFail(Map<String, Object> map) {
                super.onDPAdFillFail(map);
            }

            @Override
            public void onDPAdShow(Map<String, Object> map) {
                super.onDPAdShow(map);
            }

            @Override
            public void onDPAdPlayStart(Map<String, Object> map) {
                super.onDPAdPlayStart(map);
            }

            @Override
            public void onDPAdPlayPause(Map<String, Object> map) {
                super.onDPAdPlayPause(map);
            }

            @Override
            public void onDPAdPlayContinue(Map<String, Object> map) {
                super.onDPAdPlayContinue(map);
            }

            @Override
            public void onDPAdPlayComplete(Map<String, Object> map) {
                super.onDPAdPlayComplete(map);
            }

            @Override
            public void onDPAdClicked(Map<String, Object> map) {
                super.onDPAdClicked(map);
            }

            @Override
            public void onRewardVerify(Map<String, Object> map) {
                super.onRewardVerify(map);
            }

            @Override
            public void onSkippedVideo(Map<String, Object> map) {
                super.onSkippedVideo(map);
            }
        });

        params.mDetailConfig = this.detailConfig;
        IDPWidget widget = DPSdk.factory().createDramaDetail(params);

        FragmentActivity activity = (FragmentActivity) mCallerContext.getCurrentActivity();
        activity.getSupportFragmentManager()
                .beginTransaction()
                .replace(reactNativeViewId, widget.getFragment(), String.valueOf(reactNativeViewId))
                .commit();
    }

    public void setupLayout(View view) {
        Choreographer.getInstance().postFrameCallback(new Choreographer.FrameCallback() {
            @Override
            public void doFrame(long frameTimeNanos) {
//                manuallyLayoutChildren(view);
                view.getViewTreeObserver().dispatchOnGlobalLayout();
                Choreographer.getInstance().postFrameCallback(this);
            }
        });
    }
//    /**
//     * Layout all children properly
//     */
//    public void manuallyLayoutChildren(View view) {
//        // propWidth and propHeight coming from react-native props
//        int width = propWidth;
//        int height = propHeight;
//        view.measure(
//                View.MeasureSpec.makeMeasureSpec(width, View.MeasureSpec.EXACTLY),
//                View.MeasureSpec.makeMeasureSpec(height, View.MeasureSpec.EXACTLY));
//        view.layout(0, 0, width, height);
//    }
}
