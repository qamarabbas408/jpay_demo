import { useTranslation } from "react-i18next";

function useLocalizedToast() {
  const { t } = useTranslation();

  const localizedToastMsg = {
    loginSuccess: t("loginSuccess"),
    loginFailed: t("loginFailed"),
    signUpSuccess: t("signUpSuccess"),
    signUpFailed: t("signUpFailed"),
    agreeToTerms: t("agreeToTerms"),
    resetPassSuccess: t("resetPassSuccess"),
    resetPassFailed: t("resetPassFailed"),
    verifyOTPSuccess: t("verifyOTPSuccess"),
    verifyOTPFailed: t("verifyOTPFailed"),
    updateAddressSuccess: t("updateAddressSuccess"),
    updateAddressFailed: t("updateAddressFailed"),
    updateDetailsSuccess: t("updateDetailsSuccess"),
    updateDetailsFailed: t("updateDetailsFailed"),
    reselectDateRange: t("reselectDateRange"),
    pleaseEnterRoleName: t("pleaseEnterRoleName"),
    pleaseEnterTagName: t("pleaseEnterTagName"),
    pleaseEnterValtoSearch: t("pleaseEnterValtoSearch"),
    searchBoxAlreadyEmpty: t("searchBoxAlreadyEmpty"),
    pleaseLoginToContinue: t("pleaseLoginToContinue"),
    pleaseLogoutFromCurrentSessionToContinue: t(
      "pleaseLogoutFromCurrentSessionToContinue"
    ),
    otpLengthValidation: t("otpLengthValidation"),
  };

  return localizedToastMsg;
}

export default useLocalizedToast;
