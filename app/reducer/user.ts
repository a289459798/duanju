import types from './types';

const initialState = {
  info: null,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case types.user.info:
      return {
        ...state,
        info: action.user,
      };
    default:
      return state;
  }
};
