import types from './types';

const initialState = {
  history: [],
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case types.history.list:
      return {
        ...state,
        history: action.data,
      };
    default:
      return state;
  }
};
