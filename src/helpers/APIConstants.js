const APIConstants = {
  baseUrl: "http://192.168.1.64:8000/api/",
  // baseUrl: "http://18.202.98.224/api/",
  // baseUrl: "https://api.nexx-tek.com/api/", // prod
  // baseUrl: "https://api-uat.nexx-tek.com/api/", // uat
  // baseUrl: "https://api-dev.nexx-tek.com/api/", // dev
  ssoStaggingUrl: "https://staging.vivup.co.uk/users/saml/auth",
  ssoProdUrl: "https://vivup.co.uk/users/saml/auth",
  login: "login",
  signUp: "register/",
  resetPassword: "forgot-password",
  changePassword: "reset-password/",
  logout: "logout",
  verifyOtp: "two-factor/",
  allEmployees: "users/",
  userAddress: "user-address/",
  contactDetails: "contact-details",
  userContact: "user/contact",
  roles: "roles/",
  tags: "tags/",
  role: "role/",
  tag: "tag/",
  employee: "user/",
  archiveEmp: "user/bulk/archive/",
  singleArchiveEmp: "user/archive/",
  unarchiveEmp: "user/bulk/unarchive/",
  documents: "documents/",
  downloadPayslip: "pay-slips/download/",
  reports: "stats/",
  paySlipsBulk: "pay-slips/bulk/",
  paySlipPdfUpload: "pay-slips/upload/",
  payslips: "pay-slips/",
  deletePayslip: "pay-slip/",
  clickThroughRate: "click-through-rate/",
  addDocument: "document/",
  documentsBulkDelete: "documents/bulk/delete/",
  payslipsBulkDelete: "pay-slips/bulk/delete/",
  addP60Document: "document/bulk/p60/",
  addP45Document: "document/bulk/p45/",
  notifications: "notifications/",
  whiteLabelling: "white-label/sub-domain/",
  vivupSAML: "benefits-saml/",
  exportEmployees: "users/export/",
  exportEmpSampCsv: "users/bulk/sample-file",
  resendEmail: "resend-email/",
  vivupACSURL: "https://vivup.co.uk/users/saml/auth", // PROD env
  // "https://pull-1963.qa.vivup.co.uk/users/saml/auth", // QA env
  lifeStyleSavings: "https://vivup.co.uk/link/lifestyle_savings",
  yourCareWellBeing:
    "https://vivup.co.uk/organisations/2607-nexxtek/employee/benefits/your-care-wellbeing-platform",
  // "https://vivup.co.uk/organisations/566-zz-nhs-demo/employee/benefits/your-care-wellbeing-platform",

  // "https://chevron.vivup.co.uk/organisations/2607-nexxtek/scheme_management", // for admin side chevron link
};

export default APIConstants;
