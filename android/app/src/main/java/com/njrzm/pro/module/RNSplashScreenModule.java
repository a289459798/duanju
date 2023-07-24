package com.njrzm.pro.module;

import android.app.Activity;
import android.app.Dialog;
import android.content.Context;
import android.os.Build;
import android.view.LayoutInflater;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.duanju.R;

import java.lang.ref.WeakReference;

public class RNSplashScreenModule  extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    private static WeakReference<Activity> mActivity;
    private static MyDialog mSplashDialog;

    public RNSplashScreenModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "RNSplashScreen";
    }

    @ReactMethod
    public void show() {
        RNSplashScreenModule.show(this.reactContext.getCurrentActivity());
    }

    @ReactMethod
    public void hide() {
        RNSplashScreenModule.hide(this.reactContext.getCurrentActivity());
    }

    public static void show(final Activity activity) {
        if (activity == null) return;
        mActivity = new WeakReference<Activity>(activity);
        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (!activity.isFinishing()) {

                    View view = LayoutInflater.from(activity).inflate(R.layout.launch, null, false);
                    mSplashDialog = new MyDialog(
                            activity,
                            R.style.SplashScreen_Fullscreen);


                    mSplashDialog.setContentView(view);
                    mSplashDialog.setCancelable(false);

                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
                        Window window = mSplashDialog.getWindow();
                        WindowManager.LayoutParams lp = window.getAttributes();
                        lp.layoutInDisplayCutoutMode = WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES;
                        window.setAttributes(lp);
                        window.getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN | View.SYSTEM_UI_FLAG_LAYOUT_STABLE);
                    }

                    if (!mSplashDialog.isShowing()) {
                        mSplashDialog.show();
                    }
                }
            }
        });
    }

    public static void hide(Activity activity) {
        if (activity == null) {
            if (mActivity == null) {
                return;
            }
            activity = mActivity.get();
        }
        if (activity == null) return;

        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (mSplashDialog != null && mSplashDialog.isShowing()) {
                    mSplashDialog.dismiss();
                    mSplashDialog = null;
                }
            }
        });
    }
}

class MyDialog extends Dialog {

    public MyDialog(@NonNull Context context, int themeResId) {
        super(context, themeResId);
    }
}
