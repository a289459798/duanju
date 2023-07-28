package com.njrzm.pro.view.video;

import android.content.Context;
import android.graphics.Color;
import android.widget.FrameLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;

public class CustomView extends FrameLayout {
    public CustomView(@NonNull Context context) {
        super(context);
        // set padding and background color
        this.setPadding(16,16,16,16);
        this.setBackgroundColor(Color.parseColor("#5FD3F3"));

        // add default text view
        TextView text = new TextView(context);
        text.setText("Welcome to Android Fragments with React Native.");
        this.addView(text);
    }
}
