package com.njrzm.app.wxapi;

import android.os.Bundle;
import android.os.PersistableBundle;

import androidx.annotation.Nullable;

import com.tencent.mm.opensdk.modelbase.BaseReq;
import com.tencent.mm.opensdk.modelbase.BaseResp;
import com.tencent.mm.opensdk.openapi.IWXAPI;
import com.tencent.mm.opensdk.openapi.IWXAPIEventHandler;
import com.tencent.mm.opensdk.openapi.WXAPIFactory;
import com.umeng.socialize.weixin.view.WXCallbackActivity;

/**
 * Created by zzy on 2018/4/26.
 * Date : 2018/4/26 14:17
 */
public class WXEntryActivity extends WXCallbackActivity implements IWXAPIEventHandler {

    private IWXAPI api;

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState, @Nullable PersistableBundle persistentState) {
        super.onCreate(savedInstanceState, persistentState);
        api = WXAPIFactory.createWXAPI(this, null);
        api.handleIntent(getIntent(), this);
    }

    @Override
    public void onReq(BaseReq baseReq) {
        super.onReq(baseReq);
    }

    @Override
    public void onResp(BaseResp baseResp) {
        super.onResp(baseResp);
    }

}
