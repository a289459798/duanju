// import {useDispatch} from 'react-redux';
import {GlobalLoadingType} from '@/reducer/global';
import types from '@/reducer/types';

export default (dispatch: any) => {
  const show = (params?: GlobalLoadingType) => {
    dispatch({
      type: types.global.showLoading,
      data: params,
    });
  };
  const hide = () => {
    dispatch({
      type: types.global.hideLoading,
    });
  };
  return {
    show,
    hide,
  };
};
