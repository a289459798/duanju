import {NativeAppEventEmitter} from 'react-native';

import config from '@/config';
import {Storage, md5} from '@/utils';

export type RequestOptions = {
  headers?: {};
  data?: any;
  onError?: (error: string) => void;
  onChunk?: (data: any) => void;
  onComplete?: () => void;
  textStreaming?: boolean;
  signal?: any;
};

const getPath = (path: string) => {
  if (path.indexOf('http') !== 0) {
    path = config.HOST + path;
  }
  return path;
};

const getParams = async (method: string, options?: RequestOptions) => {
  const timestamp = new Date().getTime();
  const user: any = await Storage.get('user');
  let params: any = {
    ...options,
    method: method.toLocaleUpperCase(),
    headers: {
      'Content-Type': 'application/json',
      Authorization: user?.token,
      timestamp: timestamp,
      sign: md5.hex_md5(`${user?.uid}-${timestamp}-${user?.token}`),
      ...options?.headers,
    },
    body: '',
  };
  if (options?.data) {
    params.body = JSON.stringify(options.data);
  }
  if (options?.textStreaming) {
    params.reactNative = {
      textStreaming: true,
    };
  }
  return params;
};

const request = (
  path: string,
  method: string,
  options?: RequestOptions,
): Promise<Response> => {
  return new Promise(async (okCallback, errorCallback) => {
    fetch(getPath(path), await getParams(method, options))
      .then(response => {
        if (response.status === 401) {
          errorCallback && errorCallback({code: 401, message: '请先登录'});
          NativeAppEventEmitter.emit('401');
          return;
        }

        if (response.status === 403) {
          errorCallback && errorCallback({code: 403, message: '请先登录'});
          NativeAppEventEmitter.emit('403');
          return;
        }
        response
          .json()
          .then(resData => {
            if (response.ok) {
              okCallback && okCallback(resData);
            } else {
              errorCallback &&
                errorCallback({
                  code: resData.status,
                  message: resData.message
                    ? resData.message
                    : '服务器开了个小差',
                });
            }
          })
          .catch(_err => {
            errorCallback &&
              errorCallback({code: 500, message: '服务器开了个小差'});
            return;
          });
      })
      .catch(error => {
        errorCallback &&
          errorCallback({code: 500, message: '网络异常,请检查网络' + error});
      });
  });
};

export default {
  get: (path: string, options?: RequestOptions): Promise<Response> => {
    return request(path, 'GET', options);
  },

  post: (path: string, options?: RequestOptions): Promise<Response> => {
    return request(path, 'POST', options);
  },

  put: (path: string, options?: RequestOptions): Promise<Response> => {
    return request(path, 'PUT', options);
  },

  delete: (path: string, options?: RequestOptions): Promise<Response> => {
    return request(path, 'DELETE', options);
  },
};
