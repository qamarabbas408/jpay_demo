import { useTranslation } from "react-i18next";

function useLocalizedConstants() {
  const { t } = useTranslation();

  const appConstants = {
    // Page Titles

    taxFrequency: [
      {
        title: "Weekly",
        value: "Weekly",
      },
      {
        title: "Monthly",
        value: "Monthly",
      },
    ],
    pageTitles: {
      login: t("login"),
      signUp: t("signUp"),
      dashboard: t("dashboard"),
      forgotPassword: t("forgotPassword"),
      changePassword: t("resetPassword"),
      accountCreated: t("accountCreated"),
      profile: t("profile"),
      services: t("services"),
      dashboard: t("dashboard"),
      employees: t("employees"),
      pageNotFound: t("pageNotFound"),
      pensions: t("pensions"),
      payslips: t("payslips"),
      employeeSupport: t("employeeSupport"),
      twentyFourSevenGP: t("twentyFourSevenGP"),
      healthAndWellbeing: t("healthAndWellbeing"),
      retailDiscounts: t("retailDiscounts"),
      bulkUpload: t("bulkUpload"),
      reports: t("reports"),
      uploadDocument: t("uploadDocument"),
    },
    buttons: {
      save: t("save"),
      cancel: t("cancel"),
      ok: t("ok"),
      upload: t("upload"),
      close: t("close"),
      update: t("update"),
      welcome: t("welcome"),
      export: t("export"),
      delete: t("delete"),
      signin: t("signin"),
      logout: t("logout"),
      login: t("login"),
      reset: t("reset"),
      backToHome: t("backToHome"),
      goToDashboard: t("goToDashboard"),
      verify: t("verify"),
      addEmployee: t("addEmployee"),
      addDocument: t("addDocument"),
      updateEmployee: t("updateEmployee"),
      rememberMe: t("rememberMe"),
      invite: t("invite"),
      previous: t("previous"),
      next: t("next"),
      confirm: t("confirm"),
      edit: t("edit"),
      allContacts: t("allContacts"),
      singleEmployee: t("singleEmployee"),
      download: t("download"),
      clear: t("clear"),
      addRole: t("addRole"),
      addTag: t("addTag"),
      updateRole: t("updateRole"),
      updateTag: t("updateTag"),
    },
    placeholders: {
      enterPassword: t("enterPassword"),
      enterNI: t("enterNI"),
    },
    titles: {
      adminAcc: t("adminAcc"),
      staffAcc: t("staffAcc"),
      signin: t("signin"),
      phoneNumber: t("phoneNumber"),
      resetPassword: t("resetPassword"),
      password: t("Password"),
      confirmPassword: t("confirmPassword"),
      NINumber: t("NINumber"),
      NI: t("NI"),
      Password: t("Password"),
      verifyOTP: t("verifyOTP"),
      twoFactorAuthentication: t("twoFactorAuthentication"),
      saveContactDetails: t("saveContactDetails"),
      deleteEmployee: t("deleteEmployee"),
      restoreEmployees: t("restoreEmployees"),
      deleteFile: t("deleteFile"),
      downloadCSV: t("downloadCSV"),
      totalAvgsesTime: t("totalAvgsesTime"),
      uniqueLogin: t("uniqueLogin"),
      totalPortalLogin: t("totalPortalLogin"),
      dateGenerated: t("dateGenerated"),
      Period: t("Period"),
      docType: t("docType"),
      forgotPass: t("forgotPass"),
      success: t("success"),
      or: t("or"),
      asterisk: t("asterisk"),
      adminErrNo: t("adminErrNo"),
      pageErrNo: t("pageErrNo"),
      total_payslips: t("total_payslips"),
      total_employees: t("total_employees"),
      new_employees: t("new_employees"),
      benifit_type: t("benifit_type"),
      unique_ctr: t("unique_ctr"),
      staff_usage_overall: t("staff_usage_overall"),
      total_ctr_click_through_rate: t("total_ctr_click_through_rate"),
    },
    descriptions: {
      downloadCSVDesc: t("downloadCSVDesc"),
      recordsNotFoundDesc: t("recordsNotFoundDesc"),
      pageNotFoundDesc: t("pageNotFoundDesc"),
      adminNotFoundDesc: t("adminNotFoundDesc"),
      i_agree_with_the_terms_of_use: t("i_agree_with_the_terms_of_use"),
      already_have_an_account: t("already_have_an_account"),
      to_reset_your_password: t("to_reset_your_password"),
      enter_phone_and_email_and_send_you_instructions: t(
        "enter_phone_and_email_and_send_you_instructions"
      ),
      please_create_a_new_password_to_secure_your_account: t(
        "please_create_a_new_password_to_secure_your_account"
      ),
      sign_in_to_stay_connected: t("sign_in_to_stay_connected"),
      create_your_hope_ui_account: t("create_your_hope_ui_account"),
    },
    enterRoleName: t("enterRoleName"),
    enterTagName: t("enterTagName"),
    selectTags: t("selectTags"),
    selectRole: t("selectRole"),
    selectDate: t("selectDate"),
    saveContactDetailsDesc: t("saveContactDetailsDesc"),
    downloadSampleCsv: t("downloadSampleCsv"),
    verifyOTPMsg: t("verifyOTPMsg"),
    accountCreatedMsg: t("accountCreatedMsg"),
    pleaseSelectServiceType: t("pleaseSelectServiceType"),
    goodToSeeYou: t("goodToSeeYou"),
    handIcon: t("handIcon"),
    documentUploads: t("documentUploads"),
    upload: t("upload"),
    documentUploadsDesc: t("documentUploadsDesc"),
    manageProfile: t("manageProfile"),
    updateStaff: t("updateStaff"),
    manageProfileDesc: t("manageProfileDesc"),
    documentExport: t("documentExport"),
    exportData: t("exportData"),
    documentExportDesc: t("documentExportDesc"),
    notification: t("notification"),
    title: t("title"),
    startDate: t("startDate"),
    endDate: t("endDate"),
    tags: t("tags"),
    description: t("description"),
    yourProfile: t("yourProfile"),
    contact: t("Contacts"),
    phone: t("phone"),
    email: t("email"),
    updateEmail: t("Email"),
    emailTitle: t("email"),
    paySlip: t("paySlip"),
    download: t("download"),
    totalPayslips: t("totalPayslips"),
    nextPayslip: t("nextPayslip"),
    payslipSent: t("payslipSent"),
    payslip: t("payslip"),
    filterPayslips: t("filterPayslips"),
    period: t("period"),
    view: t("view"),
    showing: t("showing"),
    uploadDate: t("uploadDate"),
    file: t("file"),
    to: t("to"),
    of: t("of"),
    uploadDocFormats: t("uploadDocFormats"),
    entries: t("entries"),
    tasks: t("tasks"),
    address: t("address"),
    houseNo: t("houseNo"),
    placeholderHouseNo: t("placeholderHouseNo"),
    street: t("street"),
    placeholderStreet: t("placeholderStreet"),
    country: t("country"),
    placeholderCountry: t("placeholderCountry"),
    county: t("county"),
    placeholderCounty: t("placeholderCounty"),
    postCode: t("postCode"),
    placeholderPostCode: t("placeholderPostCode"),
    contactDetails: t("contactDetails"),
    userDetails: t("userDetails"),
    manager: t("manager"),
    supportLine: t("supportLine"),
    phoneNumber: t("phoneNumber"),
    address: t("address"),
    payPension: t("payPension"),
    pensionPortalAccess: t("pensionPortalAccess"),
    pensionIntro: t("pensionIntro"),
    servicesPensionDesc: t("servicesPensionDesc"),
    pensionInformation: t("pensionInformation"),
    infoLink1: t("infoLink1"),
    infoLink2: t("infoLink2"),
    infoLink3: t("infoLink3"),
    infoFooter: t("infoFooter"),
    contactMyPensionComp: t("contactMyPensionComp"),
    employeeSupport: t("employeeSupport"),
    callUs: t("callUs"),
    accessOnlineSupport: t("accessOnlineSupport"),
    onlineSupportCode: t("onlineSupportCode"),
    callToActionText: t("callToActionText"),
    emotionalCounselling: t("emotionalCounselling"),
    supportListItem2: t("supportListItem2"),
    supportListItem3: t("supportListItem3"),
    twentyFourSevenGP: t("twentyFourSevenGP"),
    calllDoctor: t("calllDoctor"),
    services24_7GPIntro: t("services24_7GPIntro"),
    telephoneConsultationAvailable: t("telephoneConsultationAvailable"),
    telephonePara1: t("telephonePara1"),
    telephonePara2: t("telephonePara2"),
    videoConsultation: t("videoConsultation"),
    videoPara1: t("videoPara1"),
    videoPara2: t("videoPara2"),
    videoPara3: t("videoPara3"),
    videoListItem1: t("videoListItem1"),
    videoListItem2: t("videoListItem2"),
    videoListItem3: t("videoListItem3"),
    privatePrescription: t("privatePrescription"),
    prescriptionPara1: t("prescriptionPara1"),
    healthAndWellbeing: t("healthAndWellbeing"),
    WellbeingIntro: t("WellbeingIntro"),
    WellbeingPara1: t("WellbeingPara1"),
    wellbeingPara2: t("wellbeingPara2"),
    WellbeingCallToAction: t("WellbeingCallToAction"),
    toRegister: t("toRegister"),
    callMedicalSpecialist: t("callMedicalSpecialist"),
    freeWellbeingCheck: t("freeWellbeingCheck"),
    gymDiscounts: t("gymDiscounts"),
    featureListItem1: t("featureListItem1"),
    featureListItem2: t("featureListItem2"),
    featureListItem3: t("featureListItem3"),
    featureListItem4: t("featureListItem4"),
    featureListItem5: t("featureListItem5"),
    wellbeingItem1: t("wellbeingItem1"),
    wellbeingItem2: t("wellbeingItem2"),
    wellbeingItem3: t("wellbeingItem3"),
    retailDiscounts: t("retailDiscounts"),
    accessYourDiscounts: t("accessYourDiscounts"),
    accessYourSalary: t("accessYourSalary"),
    servicesIntro: t("servicesIntro"),
    retailDiscountspara1: t("retailDiscountspara1"),
    uploadDocuments: t("uploadDocuments"),
    addDocumentsBody: t("addDocumentsBody"),
    name: t("name"),
    placeholder: t("enterDocumentName"),
    document: t("document"),
    p45: t("p45"),
    p60: t("p60"),
    csv: t("csv"),
    pdf: t("pdf"),
    maxSize: t("maxSize"),
    megaByte: t("megaByte"),
    bulkUpload: t("bulkUpload"),
    firstName: t("firstName"),
    lastName: t("lastName"),
    allEmployees: t("allEmployees"),
    archiveEmployees: t("archiveEmployees"),
    na: t("na"),
    foundEmployees: t("foundEmployees"),
    noUserFound: t("noUserFound"),
    duplicatedUsers: t("duplicatedUsers"),
    invalidUsers: t("invalidUsers"),
    noNotifications: t("noNotifications"),
    allNotifications: t("allNotifications"),
    taxYear: t("taxYear"),
    frequency: t("frequency"),
    grossPay: t("grossPay"),
    statPay: t("statPay"),
    dedsBeforeTax: t("dedsBeforeTax"),
    eeNI: t("eeNI"),
    studentLoanAeos: t("studentLoanAeos"),
    volDeds: t("volDeds"),
    nonTaxPayments: t("nonTaxPayments"),
    netPay: t("netPay"),
    payeeTax: t("payeeTax"),
    selectUser: t("selectUser"),
    deleteEmpMsg: t("deleteEmpMsg"),
    delete: t("delete"),
    deleteEmpSubMsg: t("deleteEmpSubMsg"),
    upload_max_10_mb_file: t("upload_max_10_mb_file"),
    tax_year_frequency_and_period_are_required: t(
      "tax_year_frequency_and_period_are_required"
    ),
    please_resolve_the_duplciated_user_conflicts: t(
      "please_resolve_the_duplciated_user_conflicts"
    ),
    the_following_fields_are_missing_in_the_csv: t(
      "the_following_fields_are_missing_in_the_csv"
    ),
    we_could_not_find_any_registered_user_in_the_csv: t(
      "we_could_not_find_any_registered_user_in_the_csv"
    ),

    vivup_site_leaving_warning: t("vivup_site_leaving_warning"),
    vivup_admin: t("vivup_admin"),
    InValidEmailFormat: t("InValidEmailFormat"),
    proceed_to_vivup: t("proceed_to_vivup"),
    vivup: t("vivup"),
    export_employees: t("export_employees"),
    health_resources: t("health_resources"),
    online_gp: t("online_gp"),
    your_care: t("your_care"),
    life_style_savings: t("life_style_savings"),
    pensionPhNo: t("pensionPhNo"),
    archive: t("archive"),

    addEmployee: t("addEmployee"),
    employees: t("employees"),
    employee: t("employee"),
    allemployees: t("allemployees"),
    invite: t("invite"),
    search: t("search"),
    actions: t("actions"),
    select: t("select"),
    archiveSelectedUsers: t("archiveSelectedUsers"),
    unarchiveSelectedUsers: t("unarchiveSelectedUsers"),
    payslipGenerationWarning: t("payslipGenerationWarning"),
    deleteEmployees: t("deleteEmployees"),
    report: t("report"),
    profile: t("profile"),
    status: t("status"),
    department: t("department"),
    shift: t("shift"),
    joiningDate: t("joiningDate"),
    role: t("role"),
    resendLoginEmail: t("resendLoginEmail"),
    // User Fileds
    company_id: "company_id",
    created_at: "created_at",
    deleted_at: "deleted_at",
    updated_at: "updated_at",
    id: "id",
    is_admin: "is_admin",
    last_name: "last_name",
    first_name: "first_name",
    email: "email",
    phone_number: "phone_number",
    national_ni_number: "national insurance no",
    ni_number: "ni_number",
    page: t("page"),
    goToPage: t("goToPage"),
    deleteSelected: t("deleteSelected"),
    emailOrPhoneIsRequired: t("emailOrPhoneIsRequired"),
  };

  return appConstants;
}

export default useLocalizedConstants;
