import * as AUTH from "../types/auth";

const initialState = {
  user: null
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case AUTH.SIGN_IN:
      return {
        ...state,
        user: action.payload.user
      };
    default:
      return state;
  }
};

export default authReducer;
