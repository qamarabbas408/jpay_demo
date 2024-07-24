const AppConstants = {
  validPaySlipCSVFields: [
    "deds_before_tax",
    "ee_ni",
    "employee",
    "gross_pay",
    "net_pay",
    "nontax_payments",
    "paye_tax",
    "stat_pay",
    "student_loan_aeos",
    "vol_deds",
  ],

  documentTypes: {
    p45: "p45",
    p60: "p60",
    p11d: "p11d",
    payslip: "payslip",
    others: "other",
  },

  // Date Format
  dateFormat3: "MM/YY",
  dateFormat: "DD/MM/YY",
  dateFormat2: "DD-MM-YYYY",
  apiDateFormat: "YYYY-MM-DD",
  timeFormat: "hh:mm",
  dateTimeFormat: "D MMM, YYYY hh:mm",
  servicesTypes: {
    retail_dicounts: "retail_dicounts",
    pay_and_pension: "pay_and_pension",
    employee_support: "employee_support",
    twentyfour_7_gp: "24_7_gp",
    health_and_wellbeing: "health_and_wellbeing",
  },
  OTPTypes: {
    email: "email",
    sms: "sms",
  },
  validateEmail: /^[^\s]+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  employeeTypes: {
    all: "all",
    archive: "archive",
  },

  maxBulkFileSize: 100000000, // previous value 11000000
  maxInputLength: 70,
  externalUrls: {
    pensions: {
      pensionPortal: "https://app.collegia.co.uk/",
      whatIsWorkPlace:
        "https://www.optionspensions.co.uk/sites/default/files/Workplace%20Pensions%20Explained%20-%20Workplace%20Pension%20-%20Options%20Trustees.pdf",
      retirementPlanning:
        "https://www.optionspensions.co.uk/sites/default/files/Retirement%20Planning%20and%20Options%20-%20Workplace%20Pension%20-%20Options%20Trustees.pdf",
      trustess:
        "https://www.optionspensions.co.uk/sites/default/files/Options%20Workplace%20Pension%20Newsletter%20-%20December%202020.pdf",
    },
    employeSupport: {
      accessOnlineSupport: "https://bhsf.tercltd.co.uk/UK/",
    },
    twentyfour_7_gp: {},
    retail_dicounts: {
      accessYourDiscounts:
        "https://mypayrewards.myvoucherstore.com/store2/store/home.html",
    },
    health_and_wellbeing: {
      freeWellBeing: "https://v2.mywellbeingcheck.co.uk/",
      gymDiscounts: "https://www.mygymdiscounts.co.uk/members/",
    },
  },
  ssoXml: ``,
  dummyHtmlString: ``,
};

export default AppConstants;
