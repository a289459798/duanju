package com.njrzm.pro.wxapi;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import com.tencent.mm.opensdk.constants.ConstantsAPI;
import com.tencent.mm.opensdk.modelbase.BaseReq;
import com.tencent.mm.opensdk.modelbase.BaseResp;
import com.tencent.mm.opensdk.openapi.IWXAPI;
import com.tencent.mm.opensdk.openapi.IWXAPIEventHandler;
import com.tencent.mm.opensdk.openapi.WXAPIFactory;
import com.zzy.pay.RNPayModule;


public class WXPayEntryActivity extends Activity implements IWXAPIEventHandler {

    private IWXAPI api;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        api = WXAPIFactory.createWXAPI(this, null);
        api.handleIntent(getIntent(), this);
    }

    @Override
    public void onReq(BaseReq req) {
    }

    @Override
    public void onResp(BaseResp resp) {

        Log.d("zzy", "resp:" + resp.errCode + "");
        if (resp.getType() == ConstantsAPI.COMMAND_PAY_BY_WX) {
            switch (resp.errCode) {
                case BaseResp.ErrCode.ERR_OK:
                    RNPayModule.sendPayStatus("pay_ok", "支付成功");
                    break;
                case BaseResp.ErrCode.ERR_COMM:
                    RNPayModule.sendPayStatus("pay_error", "支付失败");
                    break;
                case BaseResp.ErrCode.ERR_SENT_FAILED:
                    RNPayModule.sendPayStatus("pay_error", "发送失败");
                    break;
                case BaseResp.ErrCode.ERR_USER_CANCEL:
                    RNPayModule.sendPayStatus("pay_error", "取消支付");
                    break;
                case BaseResp.ErrCode.ERR_AUTH_DENIED:
                    RNPayModule.sendPayStatus("pay_error", "认证失败");
                    break;
                case BaseResp.ErrCode.ERR_UNSUPPORT:
                    RNPayModule.sendPayStatus("pay_error", "不支持");
                    break;
                default:
                    RNPayModule.sendPayStatus("pay_error", "支付失败");
                    break;
            }
            finish();
        }
    }
}