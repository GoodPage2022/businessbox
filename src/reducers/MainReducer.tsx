export const reducer = (state: any, action: any) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export const initialState = {
  isEdit: false,
  isActiveModalAuth: false,
  isActiveModalRegistration: false,
};
