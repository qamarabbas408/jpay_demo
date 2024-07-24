import { useTranslation } from "react-i18next";
import { SVGICON } from "../theme";
import { useSelector } from "react-redux";
import { get } from "lodash";
import AppRoutes from "../helpers/AppRoutes";
import useLocalizedConstants from "./useLocalizedConstants";
import AppUtilities from "../helpers/AppUtilities";
import AppConstants from "../helpers/AppConstants";
import AppImages from "../helpers/AppImages";
import { use } from "i18next";

function useLocalizedMenuList() {
  const { t } = useTranslation();

  const appConstants = useLocalizedConstants();

  // Reducer States
  const { user } = useSelector((state) => state.AuthenticationReducer);
  const { whiteLabelling } = useSelector((state) => state.WhiteLabelingReducer);



  const menuList = [
    {
      title: appConstants.pageTitles.dashboard,
      iconStyle: SVGICON.Home,
      to: AppRoutes.dashboard,
      isAuthorized: true,
    },
    {
      title: appConstants.uploadDocuments,
      iconStyle: SVGICON.UploadDocument,
      to: AppRoutes.uploadDocument,
      isAuthorized: true,
    },
    {
      title: appConstants.pageTitles.employees,
      iconStyle: SVGICON.Employees,
      to: AppRoutes.employees,
      isAuthorized: AppUtilities.isAdmin(user),
      content: [
        {
          title: appConstants.allEmployees,
          to: AppRoutes.employeesAll,
        },
        {
          title: appConstants.bulkUpload,
          to: AppRoutes.employeesBulkUpload,
        },
      ],
    },
    {
      title: appConstants.pageTitles.services,
      iconStyle: SVGICON.Services,
      to: AppRoutes.services,
      isAuthorized: !AppUtilities.isArchive(user),
      content: [
        {
          title: appConstants.pageTitles.pensions,
          to: AppUtilities.isAdmin(user) ? get(whiteLabelling, "company.employer_pension_url", "") : get(whiteLabelling, "company.employee_pension_url", "")
        },
        // {
        //   title: appConstants.pageTitles.employeeSupport,
        //   to: AppRoutes.servicesEmployeeSupport,
        // },
        // {
        //   title: appConstants.pageTitles.twentyFourSevenGP,
        //   to: AppRoutes.services24_7GP,
        // },
        // {
        //   title: appConstants.pageTitles.retailDiscounts,
        //   to: AppRoutes.servicesRetailDiscounts,
        // },
        // {
        //   title: appConstants.pageTitles.healthAndWellbeing,
        //   to: AppRoutes.servicesRetailHealthAndWellBeing,
        // },
        {
          title: appConstants.vivup,
          to: AppRoutes.vivup,
        },
      ],
    },
    {
      title: appConstants.pageTitles.reports,
      iconStyle: SVGICON.Reports,
      to: AppRoutes.reports,
      isAuthorized: AppUtilities.isAdmin(user),
    },
    {
      title: appConstants.archive,
      iconStyle: SVGICON.Archive,
      to: AppRoutes.archive,
      isAuthorized: AppUtilities.isAdmin(user),
    },
    {
      title: appConstants.profile,
      iconStyle: SVGICON.Profile,
      to: AppRoutes.profile + `?user_id=${get(user, "company_user_id", "")}`,
      isAuthorized: !AppUtilities.isAdmin(user),
    },
  ];

  return menuList;
}

export default useLocalizedMenuList;
