import {SpinnerType} from 'react-native-spinkit';

import types from './types';

export type GlobalLoadingType = {
  visible: boolean;
  size?: number;
  type?: SpinnerType;
  color?: string;
};
const initialState: {
  loading: GlobalLoadingType;
} = {
  loading: {
    visible: false,
    size: 30,
    type: 'Wave',
    color: '#fff',
  },
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case types.global.showLoading:
      return {
        ...state,
        loading: {...state.loading, ...action.loading, visible: true},
      };
    case types.global.hideLoading:
      return {
        ...state,
        loading: {...state.loading, ...action.loading, visible: false},
      };
    default:
      return state;
  }
};
