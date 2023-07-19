package com.duanju.view.video;

import android.view.Choreographer;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentActivity;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.Map;

public class ReactCSJVideoManager extends ViewGroupManager<FrameLayout> {

    public static final String REACT_CLASS = "CSJVideoManager";
    public final int COMMAND_CREATE = 1;
    ReactApplicationContext mCallerContext;

    private String id;

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
    public void setId(FrameLayout view, @Nullable String id) {
        this.id = id;
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
            default: {}
        }
    }
    /**
     * Replace your React Native view with a custom fragment
     */
    public void createFragment(FrameLayout root, int reactNativeViewId) {
        ViewGroup parentView = (ViewGroup) root.findViewById(reactNativeViewId).getParent();
        setupLayout(parentView);
        final Fragment myFragment = new Fragment();

        FragmentActivity activity = (FragmentActivity) mCallerContext.getCurrentActivity();
        activity.getSupportFragmentManager()
                .beginTransaction()
                .replace(reactNativeViewId, myFragment, String.valueOf(reactNativeViewId))
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
