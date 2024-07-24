const AppRoutes = {
  main: "/",
  login: "/login",
  signUp: "/register",
  forgotPassword: "/forgot-password",
  changePassword: "/change-password",
  accountSuccess: "/account-created-successfully",
  verifyOTP: "/verify-otp-code",
  dashboard: "/dashboard",
  // employees
  employees: "/employees", // opens submenu in sidebar
  employeesAll: "/employees/all",
  employeesBulkUpload: "/employees/bulk-upload",
  // services
  services: "/services", // opens submenu in sidebar
  servicesPensions: "/services/pensions",
  servicesEmployeeSupport: "/services/employee-support",
  services24_7GP: "/services/24-7-gp",
  servicesRetailDiscounts: "/services/retail-discounts",
  servicesRetailHealthAndWellBeing: "/services/health-&-wellbeing",
  vivup: "/services/benefits",
  uploadDocument: "/upload-document",
  reports: "/reports",
  archive: "/archive",
  profile: "/profile",
  notFound: "*",
};

export default AppRoutes;
