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
    case "toggle_headerSearch":
      return {
        ...state,
        isActiveHeaderSearch: !state.isActiveHeaderSearch,
      };
    case "toggle_deleteBusiness":
      return {
        ...state,
        isOpenDeleteBusiness: !state.isOpenDeleteBusiness,
      };
    case "toggle_registrationFinishModal":
      return {
        ...state,
        isOpenModalRegisterFinish: !state.isOpenModalRegisterFinish,
      };
    case "toggle_loader":
      return {
        ...state,
        isShowLoader: !state.isShowLoader,
      };
    case "toggle_analysisModal":
      return {
        ...state,
        isActiveAnalysisModal: !state.isActiveAnalysisModal,
      };
    case "toggle_currency":
      return {
        ...state,
        isUah: !state.isUah,
      };
    case "toggle_large-image":
      return {
        ...state,
        isOpenLargeImage: !state.isOpenLargeImage,
        imageUrl: state.imageUrl,
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
  isActiveHeaderSearch: false,
  isOpenDeleteBusiness: false,
  isOpenModalRegisterFinish: false,
  isShowLoader: false,
  isActiveAnalysisModal: false,
  isUah: false,
  isOpenLargeImage: false,
  imageUrl: "",
};
