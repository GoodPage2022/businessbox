export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "toggle_burger":
      return {
        ...state,
        isOpenBurger: !state.isOpenBurger,
      };
    case "toggle_edit":
      return {
        ...state,
        isEdit: !state.isEdit,
      };
    case "toggle_authModal":
      return {
        ...state,
        isActiveModalAuth: !state.isActiveModalAuth,
      };
    case "toggle_registrationModal":
      return {
        ...state,
        isActiveModalRegistration: !state.isActiveModalRegistration,
      };
    case "toggle_forgotPasswordModal":
      return {
        ...state,
        isActiveModalForgotPassword: !state.isActiveModalForgotPassword,
      };
    case "toggle_mobFilter":
      return {
        ...state,
        isActiveMobFilter: !state.isActiveMobFilter,
      };
    default:
      return state;
  }
};

export const initialState = {
  isEdit: false,
  isActiveModalAuth: false,
  isActiveModalRegistration: false,
  isActiveModalForgotPassword: false,
  isOpenBurger: false,
  isActiveMobFilter: false,
};
