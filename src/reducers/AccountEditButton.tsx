export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "toggle_edit":
      return {
        ...state,
        active: !state.active,
      };

    default:
      return state;
  }
};

export const initialState = {
  active: false,
};
