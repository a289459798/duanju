import Toast from '@attacks/react-native-toast';

import types from '@/reducer/types';
import {Storage, notify, request} from '@/utils';

export default {
  login: (data: {
    openId: String;
    unionId: String;
    channel?: String;
    onSuccess?: Function;
  }) => {
    return (dispatch: Function) => {
      request
        .post('users/login-app', {
          data: {
            openId: data.openId,
            unionId: data.unionId,
            channel: data.channel,
          },
        })
        .then(
          async res => {
            await Storage.set('user', res);
            dispatch({
              type: types.user.info,
              user: res,
            });
            request.get('users').then(
              resData => {
                Storage.set('user', resData);
                dispatch({
                  type: types.user.info,
                  user: resData,
                });
              },
              err => Toast.show(err.message),
            );
            data.onSuccess && data.onSuccess();
          },
          err => Toast.show(err.message),
        );
    };
  },
  logout: () => {
    return async (dispatch: Function) => {
      await Storage.delete('user');
      dispatch({
        type: types.user.info,
        user: null,
      });
    };
  },
  userInfo: (data?: {onComplete?: Function}) => {
    return (dispatch: Function) => {
      Storage.get('user').then(res => {
        if (res) {
          dispatch({
            type: types.user.info,
            user: res,
          });
          request
            .get('users')
            .then(
              resData => {
                Storage.set('user', resData);
                dispatch({
                  type: types.user.info,
                  user: resData,
                });
              },
              err => notify.error(err.message),
            )
            .finally(() => data?.onComplete?.());
        }
      });
    };
  },
};
