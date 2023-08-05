package com.njrzm.app;

import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.text.SpannableStringBuilder;
import android.text.Spanned;
import android.text.TextPaint;
import android.text.method.LinkMovementMethod;
import android.text.style.ClickableSpan;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

/**
 * Created by zzy on 2023/6/19.
 * Date : 2023/6/19 15:17
 */
public class LaunchActivity extends Activity {

    private String privacyStr = "agree_privacy";

    private TextView mCancel;
    private TextView mConfirm;
    private TextView mTextview;

    private PrivacyDialog mDialog;

    @Override
    protected void onCreate(@Nullable @org.jetbrains.annotations.Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.launch);
        checkPrivacy();
    }

    private void checkPrivacy() {
        final SharedPreferences sharedPreferences = PreferenceManager.getDefaultSharedPreferences(this);
        boolean status = sharedPreferences.getBoolean(privacyStr, false);
        if (status) {
            launchActivity();
        } else {
            View view = LayoutInflater.from(this).inflate(R.layout.privacy_dialog, null, false);
            mCancel = view.findViewById(R.id.cancel);
            mConfirm = view.findViewById(R.id.confirm);
            mTextview = view.findViewById(R.id.text);

            String text = "请你务必审慎阅读、充分理解“服务协议”和“隐私政策”各条款，包括但不限于：为了向你提供商品信息、智能推荐等服务，我们需要收集你的设备信息、操作日志、MAC地址、软件安装列表等个人信息。你可以在“设置“中查看、变更、删除个人信息并管理你的授权。你可阅读《服务协议》和《隐私政策》了解详细信息。如你同意，请点击”同意“开始接受我们的服务。";
            SpannableStringBuilder builder = new SpannableStringBuilder(text);

            //单独设置字体颜色
            //单独设置点击事件
            ClickableSpan clickableSpan = new ClickableSpan() {
                @Override
                public void onClick(@NonNull View widget) {
                    Intent intent = new Intent(Intent.ACTION_VIEW);
                    intent.setData(Uri.parse("http://tgjc.njrzm.com/yhys.pdf"));
                    startActivity(intent);
                }

                @Override
                public void updateDrawState(@NonNull TextPaint paint) {
                    paint.setColor(Color.parseColor("#3399FF"));
                    paint.setUnderlineText(false);
                }
            };
            builder.setSpan(clickableSpan, 125, 131, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);

            //单独设置点击事件
            ClickableSpan clickableSpan2 = new ClickableSpan() {
                @Override
                public void onClick(@NonNull View widget) {
                    Intent intent = new Intent(Intent.ACTION_VIEW);
                    intent.setData(Uri.parse("http://tgjc.njrzm.com/yszc.pdf"));
                    startActivity(intent);
                }

                @Override
                public void updateDrawState(@NonNull TextPaint paint) {
                    paint.setColor(Color.parseColor("#3399FF"));
                    paint.setUnderlineText(false);
                }
            };
            builder.setSpan(clickableSpan2, 132, 138, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);

            mTextview.setMovementMethod(LinkMovementMethod.getInstance());
            mTextview.setHighlightColor(Color.TRANSPARENT);
            mTextview.setText(builder);

            mCancel.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    System.exit(0);
                }
            });
            mConfirm.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    SharedPreferences.Editor editor = sharedPreferences.edit();
                    editor.putBoolean(privacyStr, true);
                    editor.apply();
                    if (mDialog != null && mDialog.isShowing()) {
                        mDialog.dismiss();
                    }
                    launchActivity();
                }
            });
            mDialog = new PrivacyDialog(
                this,
                R.style.Launch_Fullscreen);

            mDialog.setContentView(view);
            if (mDialog != null) {
                mDialog.show();
            }
        }
    }

    private void launchActivity() {
        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
        overridePendingTransition(0, 0);
        this.finish();
    }

    @Override
    protected void onDestroy() {
        if (mDialog != null) {
            mDialog.dismiss();
        }
        super.onDestroy();
    }

}
