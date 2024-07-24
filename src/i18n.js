import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // we init with resources
    resources: {
      en: {
        translations: {
          // Toast Messages
          loginSuccess: "OTP sent successfully",
          InValidEmailFormat: "Enter valid email address",
          loginFailed: "Unable to login, Please check your credentials",
          signUpSuccess: "Registration Successfull",
          signUpFailed: "Failed to sign up with provided details",
          agreeToTerms: "Please agree to terms and condition",
          resetPassSuccess: "The OTP has been sent to your phone number",
          resetPassFailed: "Failed to send OTP to your phone number",
          verifyOTPSuccess: "The OTP has been verified successfully",
          verifyOTPFailed: "Failed to verify provided OTP",
          updateAddressSuccess: "User address updated successfully",
          updateAddressFailed: "Failed to update user address",
          updateDetailsSuccess: "Contact details updated successfully",
          updateDetailsFailed: "Failed to update contact details",
          reselectDateRange: "Please reselect date range",
          pleaseEnterRoleName: "Please enter Role name",
          pleaseEnterTagName: "Please enter Tag name",
          pleaseEnterValtoSearch: "Please enter a value to search.",
          searchBoxAlreadyEmpty: "Search box already empty.",
          pleaseLoginToContinue: "Please login to continue",
          pleaseLogoutFromCurrentSessionToContinue:
            "Please logout from current session to continue",
          pleaseSelectServiceType: "Please select service type",
          otpLengthValidation:
            "OTP Length should not be less than or greater than 6",
          // Button Titles
          save: "Save",
          cancel: "Cancel",
          ok: "OK",
          edit: "Edit",
          update: "Update",
          welcome: "Welcome",
          goToDashboard: "Back To Dashboard",
          reset: "Reset",
          login: "Login",
          signin: "Sign in",
          delete: "Delete",
          export: "Export",
          download: "Download",
          logout: "Logout",
          accountCreated: "Account Created Successfully",
          signUp: "Sign Up",
          resetPassword: "Reset Password",
          forgotPassword: "Forgot Password",
          downloadSampleCsv: "Download Sample CSV",
          backToHome: "Back to home",
          verify: "Verify",
          confirm: "Confirm",
          verifyOTP: "Verify OTP",
          verifyOTPMsg: "A OTP must have been sent to your Phone number",
          saveContactDetails: "Save Contact Details",
          saveContactDetailsDesc:
            "Would you like to update contact number for all employees?",
          singleEmployee: "Single Employee",
          allContacts: "All Contacts",
          selectDate: "Select Date",
          selectTags: "Select Tags",
          selectRole: "Select Role",
          selectUser: "Select User",
          upload_max_10_mb_file: "Upload Max 100 MB File",
          tax_year_frequency_and_period_are_required:
            "Tax Year, Frequency and Period are required",
          please_resolve_the_duplciated_user_conflicts:
            "Please resolve the duplicated user conflicts then proceed",
          the_following_fields_are_missing_in_the_csv:
            "The following fields are missing in the CSV:",
          we_could_not_find_any_registered_user_in_the_csv:
            "We could not find any registered user in the csv",
          vivup_site_leaving_warning: "On Proceeding you will leave the site.",
          proceed_to_vivup: "Proceed to Benefits",
          vivup: "Benefits",
          vivup_admin: "Benefits Admin",
          health_resources: "Health Resources",
          online_gp: "Online GP",
          your_care: "Your Care",
          life_style_savings: "Life Style Savings",
          rememberMe: "Remember me?",
          export_employees: "Export Employees",
          updateEmployee: "Update Employee",
          enterRoleName: "Enter Role Name",
          enterTagName: "Enter Tag Name",
          addRole: "Add Role",
          addTag: "Add Tag",
          updateRole: "Update Role",
          updateTag: "Update Tag",

          // Titles
          archive: "Archive",
          adminAcc: "Admin Account",
          staffAcc: "Staff Account",
          NINumber: "National Insurance Number",
          NI: "NI",
          phoneNumber: "Phone Number",
          Password: "Password",
          confirmPassword: "Confirm Password",
          twoFactorAuthentication: "Two Factor Authentication",
          deleteEmployee: "Delete Employee",
          deleteSelected: "Delete Selected",
          emailOrPhoneIsRequired:
            "*Note: You must provide either an email address or a phone number",
          restoreEmployees: "Restore Employees",
          downloadCSV: "Download CSV",
          totalAvgsesTime: "Total AVG Session Time",
          uniqueLogin: "Unique Logins",
          totalPortalLogin: "Total Portal Logins",
          dateGenerated: "Date Generated:",
          Period: "Period:",
          docType: "Document Type",
          forgotPass: " Forgot Password",
          success: " Success",
          or: " OR",
          asterisk: " *",
          adminErrNo: " 401",
          pageErrNo: " 404",
          total_payslips: "Total Payslips",
          total_employees: "Total Employees",
          new_employees: "New Employees",
          benifit_type: "Benifit Type",
          unique_ctr: "Unique CTR",
          staff_usage_overall: "Staff Usage (Overall)",
          total_ctr_click_through_rate: "Total CTR (Click Through Rate)",
          // Descriptions
          downloadCSVDesc:
            "Are you sure you want to continue with these pay dates?",
          pageNotFoundDesc: "The page you were looking for is not found",
          recordsNotFoundDesc: "Records not found",
          noUserFound: "No User Found",
          adminNotFoundDesc:
            "You do not have the privilege to use this feature",
          accountCreatedMsg:
            "A OTP has been sent to your Phone number. Please check for the OTP and verify your credentails",
          deleteEmpMsg: "Are you sure you want to do this?",
          deleteEmpSubMsg: "This action cannot be undone.",
          i_agree_with_the_terms_of_use: "I agree with the terms of use",
          already_have_an_account: "Already have an Account",
          to_reset_your_password: " to reset your password.",
          enter_phone_and_email_and_send_you_instructions:
            "Enter your phone number or email and we’ll send you instructions",
          please_create_a_new_password_to_secure_your_account:
            "Please create a new password to secure your account",
          sign_in_to_stay_connected: "Sign in to stay connected",
          create_your_hope_ui_account: "Create your Hope UI account",
          //Placeholders
          enterPassword: "Enter Password",
          enterNI: "Enter NI Number",

          // Side Menu Items
          dashboard: "Dashboard",
          employees: "Employees",
          employee: "Employee",
          profile: "Profile",
          reports: "Report",
          uploadDocument: "Upload Document",
          pageNotFound: "Page Not Found",
          services: "Services",
          report: "Report",

          // Page Titles
          pensions: "Pensions",
          employeeSupport: "Employee Support",
          twentyFourSevenGP: "24/7 GP",
          healthAndWellbeing: "Health & Wellbeing",
          retailDiscounts: "Retail Discounts",

          // Toast Messages
          loginSuccess: "Logged in successfully",
          loginFailed: "Found error while logging in",

          // Dashboard - greeting box
          goodToSeeYou: "Good to see you, ",
          handIcon: "! 👋",

          // Dashboard - document uploads
          documentUploads: "Document Uploads",
          upload: "Upload",
          documentUploadsDesc: "Payslips, Requests & more",
          // Dashboard - document export
          documentExport: "Document Export",
          exportData: "Export Data",
          documentExportDesc: "Payslips, Requests & more",
          // Dashboard - manage profile
          manageProfile: "Manage Profile",
          updateStaff: "Update your profile",
          manageProfileDesc: "Official documents, proof of address & more",
          // Dashboard - notifications
          notification: "Notifications",
          title: "Title",
          startDate: "Start Date",
          endDate: "End Date",
          tags: "Tags",
          description: "Description",
          noNotifications: "No Notifications",
          allNotifications: "See all notifications ",

          // Profile
          yourProfile: "Your Profile",
          // Profile - Contact Info
          contact: "Contact",
          Contact: "Contact",
          Contacts: "Contacts",
          Email: "Email",
          email: "Email",
          phone: "Phone",
          // Profile - Details - Payslip
          paySlip: "Pay Slip",
          download: "Download",
          totalPayslips: "Total Payslips",
          nextPayslip: "Next Payslip",
          payslip: "Payslip",
          payslips: "Payslip",
          payslipSent: "Payslip Sent",
          period: "Period",
          view: "View",
          showing: "Showing",
          to: "to",
          of: "of",
          entries: "entries",
          file: "File",
          filterPayslips: "Filter Payslips",
          uploadDate: "Upload Date",
          // Profile - Details - Address
          address: "Address",
          houseNo: "House no.",
          placeholderHouseNo: "e.g. 221B",
          street: "Street",
          placeholderStreet: "e.g. Baker Street",
          country: "Country",
          placeholderCountry: "e.g. England",
          postCode: "Post Code",
          placeholderPostCode: "e.g. NW16XE",
          county: "County",
          placeholderCounty: "e.g. London",

          // Profile - Details - HR Mail
          hrMail: "HR Mail",
          // Profile - Details - Contact Details
          contactDetails: "Contact Details",
          companyDetails: "Company Details",
          manager: "Manager",
          supportLine: "Support Line",
          userDetails: "User Details",
          // Profile - Details - Others
          others: "Others",
          // Services - Pensions
          payPension: "Pay & Pension",
          pensionPortalAccess: "Pension Portal Access",
          pensionIntro:
            "All your pension matters are available to view 24 hours a day.",
          servicesPensionDesc:
            "Review your pension contributions and performance.",
          pensionInformation: "Pension Information",
          infoLink1: "What is a workplace pension?",
          infoLink2: "Retirement planning & options.",
          infoLink3: "Trustees annual newsletter",
          infoFooter:
            "Before opting out it is important to get financial advice about your options.",
          contactMyPensionComp: "Contact my pension company",
          pensionPhNo: "0330 124 1510",
          // Services - Employee Support
          callUs: "Call Us",
          accessOnlineSupport: "Access Online Support",
          onlineSupportCode: "Your code for online support is",
          callToActionText:
            "Your personal doctor can authorise your private prescription. Once signed, the online pharmacy will contact you for any related card payment, and arrange delivery to your home or workplace.",
          emotionalCounselling: "Emotional Counselling",
          supportListItem2:
            "Financial Support – Don’t worry about debt alone, we will support you in dealing with creditors and help you get back to a sound financial footing.",
          supportListItem3:
            "Legal support - Giving you impartial legal advice for domestic or family matters.",
          // Services - 24/7 GP
          calllDoctor: "Call Doctor",
          services24_7GPIntro:
            "Are you sick of waiting days, maybe weeks, to see your GP?",
          telephoneConsultationAvailable:
            "Telephone Consultation Available 24/7",
          telephonePara1:
            "To book the GP appointment, use the link above or call 0800 206 2576",
          telephonePara2:
            "This is a freephone number, from  a landline. Calls from a mobile may vary depending on your service provider.",
          videoConsultation: "Video Consultation",
          videoPara1:
            "Face-to-face appointments can be booked and attended via webcam or phone camera.",
          videoListItem1: "Works around your schedule",
          videoListItem2: "100% Confidential",
          videoListItem3:
            "Visually interact with your doctor and show relevant symptoms",
          videoPara2: "To Book Your Remote appointment, call 0800 206 2576",
          videoPara3:
            "Video consultations are available Monday to Friday between 8:30am and 6:30pm.",
          privatePrescription: "Private Prescription",
          prescriptionPara1:
            "Your personal can authorize your private prescription. Once signed, the online pharmacy will call you for ay related card payment, and arrange delivery to your home or workplace.",
          // Services - Health & Well Being
          freeWellbeingCheck: "Free Wellbeing Check",
          gymDiscounts: "Gym Discounts",
          callMedicalSpecialist: "Call Medical Specialist",
          WellbeingIntro:
            "Your hub for all things related to your health and well-being.",
          WellbeingPara1:
            "Finding out your health score has never been easier.",
          WellbeingCallToAction:
            "Click 'Wellbeing Check' above to access  your FREE online health assessment. If it's your first time enter code",
          toRegister: "to register.",
          wellbeingPara2:
            "Speak to one of our medical specialist on 0800 074 4319 who can:",
          featureListItem1: "Takes Just 10 minutes to complete.",
          featureListItem2:
            "Accurately map out your current health and fitness levels.",
          featureListItem3:
            "Prepares healthy eating and exercise plans specific for you.",
          featureListItem4:
            "Monitors your progress with follow up questionnaires.",
          featureListItem5:
            "Access over 3,500 gym discounts across the country and gain access to great offers on top fitness brands and equipment.",
          wellbeingItem1: "Reduce waiting times for NHS treatments.",
          wellbeingItem2: "Reduce costs for private treatments.",
          wellbeingItem3: "Arrangements for treatments or second opinions.",
          // Services - Retail Discounts
          retailDiscounts: "Retail Discounts",
          accessYourDiscounts: "Access Your Discounts",
          accessYourSalary: "Access Your Salary Sacrifice",
          servicesIntro:
            "Make your money go further and save thousands of pounds.",
          retailDiscountspara1:
            "Why pay the full price for your weekly shopping, nights out or holidays when your can access thousands of  discounts.",
          // Upload Documents
          uploadDocuments: "Add Document",
          addDocumentsBody: "Add your documents here.",
          close: "Close",
          addDocument: "Add Document",
          document: "Document",
          csv: "CSV",
          pdf: "PDF",
          p45: "P45",
          p60: "P60",
          uploadDocFormats: "png, jpeg, pdf, etc",
          maxSize: "Max Size",
          megaByte: "MB",
          enterDocumentName: "Enter Document Name",
          // Employees
          bulkUpload: "Bulk Upload",
          // Employees - all employees table
          allEmployees: "All Employees",
          archiveEmployees: "Archived Employees",
          duplicatedUsers: "Duplicated Users",
          invalidUsers: "Invalid Users",
          na: "N/A",
          foundEmployees: "Found 0 Employees",
          taxYear: "Tax Year",
          frequency: "Frequency",
          grossPay: "Gross Pay",
          statPay: "(Stat. Pay)",
          dedsBeforeTax: "-Deds Before Tax",
          eeNI: "-EE NI",
          studentLoanAeos: "-Student Loan / AEOs",
          volDeds: "-Vol. Deds",
          nonTaxPayments: "+Non Tax Payments",
          netPay: "Net Pay",
          payeeTax: "Paye Tax",
          tasks: "Tasks",
          addEmployee: "Add Employee",
          addDocument: "Add Document",
          invite: "Invite",
          search: "Search",
          clear: "Clear",
          id: "ID",
          status: "Status",
          department: "Department",
          shift: "Shift",
          joiningDate: "Joining Date",
          role: "Role",
          page: "Page",
          goToPage: "Go to page",
          next: "Next",
          previous: "Previous",
          firstName: "First Name",
          name: "Name",
          lastName: "Last Name",
          actions: "Actions",
          allemployees: "allemployees",
          select: "Select",
          archiveSelectedUsers: "Archive Selected User",
          unarchiveSelectedUsers: "UnArchive Selected User",
          deleteEmployees: "Delete Employees",
          deleteFile: "Delete File",
          delete: "Delete",
          resendLoginEmail: "Resend Login Email",
          payslipGenerationWarning: "The document will be generated soon",
        },
      },

      ar: {
        translations: {},
      },
    },
    fallbackLng: "en",
    debug: process.env.NODE_ENV == "development",

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we use content as keys

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
