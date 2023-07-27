package com.njrzm.pro.view.video;

import android.view.Choreographer;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.FragmentActivity;

import com.bytedance.sdk.dp.DPDramaDetailConfig;
import com.bytedance.sdk.dp.DPSdk;
import com.bytedance.sdk.dp.DPWidgetDramaDetailParams;
import com.bytedance.sdk.dp.DPWidgetDrawParams;
import com.bytedance.sdk.dp.IDPDramaListener;
import com.bytedance.sdk.dp.IDPDrawListener;
import com.bytedance.sdk.dp.IDPWidget;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.annotations.ReactPropGroup;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import java.util.List;
import java.util.Map;

public class ReactCSJTJVideoManager extends ViewGroupManager<FrameLayout> {

    public static final String REACT_CLASS = "CSJTJVideoManager";
    public final int COMMAND_CREATE = 1;
    public final int COMMAND_RESUME = 2;
    ReactApplicationContext mCallerContext;

    private int propWidth;
    private int propHeight;

    IDPWidget widget;

    public ReactCSJTJVideoManager(ReactApplicationContext reactContext) {
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

    @Override
    public void onDropViewInstance(@NonNull FrameLayout view) {
        super.onDropViewInstance(view);
        if (widget != null) {
            widget.destroy();
        }
    }

    //    @ReactProp(name = "config")
//    public void setDetailConfig(FrameLayout view, @Nullable ReadableMap config) {
//        if (config.hasKey("mode")) {
//            detailConfig = DPDramaDetailConfig.obtain(config.getString("mode"));
//        } else {
//            detailConfig = DPDramaDetailConfig.obtain("common");
//        }
//
//        if (config.hasKey("freeSet")) {
//            detailConfig.freeSet = config.getInt("freeSet");
//        }
//
//        if (config.hasKey("lockSet")) {
//            detailConfig.freeSet = config.getInt("lockSet");
//        }
//
//        if (config.hasKey("isHideLeftTopTips")) {
//            detailConfig.mIsHideLeftTopTips = config.getBoolean("isHideLeftTopTips");
//        }
//
//        if (config.hasKey("isHideMore")) {
//            detailConfig.mIsHideMore = config.getBoolean("isHideMore");
//        }
//
//        if (config.hasKey("infiniteScrollEnabled")) {
//            detailConfig.mInfiniteScrollEnabled = config.getBoolean("infiniteScrollEnabled");
//        }
//        detailConfig.mIsHideLeftTopTips = true;
//
//    }

    @ReactPropGroup(names = {"width", "height"}, customType = "Style")
    public void setStyle(FrameLayout view, int index, Integer value) {
        if (index == 0) {
            propWidth = value;
        }

        if (index == 1) {
            propHeight = value;
        }
    }

    /**
     * Map the "create" command to an integer
     */
    @Nullable
    @Override
    public Map<String, Integer> getCommandsMap() {
        Map map = MapBuilder.of("create", COMMAND_CREATE);
        map.put("resume", COMMAND_RESUME);
        return map;
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
            case COMMAND_RESUME:
                if (widget != null) {
                    widget.resumeForWatchTogether();
                }
                break;
            default: {
            }
        }
    }

    @Override
    public Map getExportedCustomBubblingEventTypeConstants() {
        return MapBuilder.builder()
                .put(
                        "topDPVideoPlay",
                        MapBuilder.of(
                                "phasedRegistrationNames",
                                MapBuilder.of("bubbled", "onDPVideoPlay")))
                .build();
    }

    /**
     * Replace your React Native view with a custom fragment
     */
    public void createFragment(FrameLayout root, int reactNativeViewId) {
        ViewGroup parentView = (ViewGroup) root.findViewById(reactNativeViewId);
        setupLayout(parentView);

        DPWidgetDrawParams params1 = DPWidgetDrawParams.obtain();
        params1.mDrawChannelType = DPWidgetDrawParams.DRAW_CHANNEL_TYPE_RECOMMEND_THEATER;
        params1.mDrawContentType = DPWidgetDrawParams.DRAW_CONTENT_TYPE_ONLY_DRAMA;
        params1.mDisableLuckView = true;
        params1.mIsHideFollow = true;
        params1.mIsHideChannelName = true;
        params1.mIsHideClose = true;
        params1.mIsHideDramaInfo = true;
        params1.mIsHideDramaEnter = true;
        DPDramaDetailConfig mDramaDetailConfig = DPDramaDetailConfig.obtain("specific");

        params1.listener(new IDPDrawListener() {
            @Override
            public void onDPPageChange(int i, Map<String, Object> map) {
                super.onDPPageChange(i, map);
            }

            @Override
            public void onDPVideoPlay(Map<String, Object> map) {
                super.onDPVideoPlay(map);

                WritableMap event = Arguments.createMap();
                event.putString("title", (String) map.get("title"));
                event.putString("cover_image", (String) map.get("cover_image"));
                event.putString("desc", (String) map.get("desc"));
                event.putInt("index", (int) map.get("index"));
                event.putInt("total", (int) map.get("total"));
                event.putInt("status", (int) map.get("status"));
                event.putString("drama_id", String.valueOf((long) map.get("drama_id")));
                mCallerContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                        reactNativeViewId,
                        "topDPVideoPlay",
                        event);
            }
        });
        params1.mDramaDetailConfig = mDramaDetailConfig;
        widget = DPSdk.factory().createDraw(params1);

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
                manuallyLayoutChildren(view);
                view.getViewTreeObserver().dispatchOnGlobalLayout();
                Choreographer.getInstance().postFrameCallback(this);
            }
        });
    }

    /**
     * Layout all children properly
     */
    public void manuallyLayoutChildren(View view) {
        // propWidth and propHeight coming from react-native props
        int width = propWidth;
        int height = propHeight;
        view.measure(
                View.MeasureSpec.makeMeasureSpec(width, View.MeasureSpec.EXACTLY),
                View.MeasureSpec.makeMeasureSpec(height, View.MeasureSpec.EXACTLY));
        view.layout(0, 0, width, height);
    }
}
