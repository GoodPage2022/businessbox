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
        tariff: state.tariff,
      };
    case "toggle_analysisTariffsModal":
      return {
        ...state,
        isActiveAnalysisTariffsModal: !state.isActiveAnalysisTariffsModal,
      };
    case "toggle_analysisThankSuccessModal":
      return {
        ...state,
        isActiveAnalysisThankSuccessModal:
          !state.isActiveAnalysisThankSuccessModal,
      };
    case "toggle_analysisThankErrorModal":
      return {
        ...state,
        isActiveAnalysisThankErrorModal: !state.isActiveAnalysisThankErrorModal,
      };
    case "toggle_analysisThankPendingModal":
      return {
        ...state,
        isActiveAnalysisThankPendingModal:
          !state.isActiveAnalysisThankPendingModal,
      };
    case "toggle_phoneModal":
      return {
        ...state,
        isActivePhoneModal: !state.isActivePhoneModal,
      };
    case "toggle_raiseRatingModal":
      return {
        ...state,
        isActiveRaiseRatingModal: !state.isActiveRaiseRatingModal,
      };
    case "toggle_currency":
      return {
        ...state,
        isUah: !state.isUah,
      };
    case "toggle_large-image":
      return {
        ...state,
        imageIdx: state.imageIdx,
        images: state.images,
        isOpenLargeImage: !state.isOpenLargeImage,
      };
    case "toggle_moreAboutBusinessModal":
      return {
        ...state,
        isOpenMoreAboutBusiness: !state.isOpenMoreAboutBusiness,
      };
    case "toggle_investor":
      return {
        ...state,
        isInvestor: state.isInvestor,
      };

    case "toggle_businessOnStageCreation":
      return {
        ...state,
        businessOnStageCreation: !state.businessOnStageCreation,
      };

    case "toggle_thankComment":
      return {
        ...state,
        thankComment: !state.thankComment,
      };
    case "toggle_thankActive":
      return {
        ...state,
        thankActive: !state.thankActive,
      };
    case "toggle_thankSold":
      return {
        ...state,
        thankSold: !state.thankSold,
      };
    case "toggle_paymentModal":
      return {
        ...state,
        isActiveModalPayment: !state.isActiveModalPayment,
        method: state.method,
      };
    case "toggle_otherBusinesses":
      return {
        ...state,
        isShowOtherBusinesses: !state.isShowOtherBusinesses,
      };
    case "toggle_modalActive":
      return {
        ...state,
        isOpenModalActive: !state.isOpenModalActive,
      };
    default:
      return state;
  }
};

export const initialState = {
  isEdit: false,
  thankSold: false,
  isActiveModalAuth: false,
  isActiveModalRegistration: false,
  isActiveModalForgotPassword: false,
  isOpenBurger: false,
  isActiveMobFilter: false,
  isActiveHeaderSearch: false,
  isOpenDeleteBusiness: false,
  isOpenModalActive: false,
  isOpenModalRegisterFinish: false,
  isShowLoader: false,
  isActiveAnalysisModal: false,
  isActiveAnalysisTariffsModal: false,
  isActiveAnalysisThankSuccessModal: false,
  isActiveAnalysisThankErrorModal: false,
  isActiveAnalysisThankPendingModal: false,
  isActiveRaiseRatingModal: false,
  thankActive: false,
  tariff: "",
  isUah: false,
  isOpenLargeImage: false,
  imageUrl: "",
  images: [],
  isActivePhoneModal: false,
  isOpenMoreAboutBusiness: false,
  isInvestor: 0,
  businessOnStageCreation: false,
  thankComment: false,
  isActiveModalPayment: false,
  method: "",
  isShowOtherBusinesses: false,
};
