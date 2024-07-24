import Reports from "../pages/reports/Reports";
import Profile from "../pages/profile/Profile";
import Services from "../pages/services/Services";
import Dashboard from "../pages/dashboard/Dashboard";
import UploadDocument from "../pages/uploadDocument/UploadDocument";
import AppRoutes from "../helpers/AppRoutes";
import Pensions from "../components/services/Pensions";
import EmployeeSupport from "../components/services/EmployeeSupport";
import TwentyFourSevenGP from "../components/services/TwentyFourSevenGP";
import HealthAndWellbeing from "../components/services/HealthAndWellbeing";
import RetailDiscounts from "../components/services/RetailDiscounts";
import AllEmployees from "../pages/employees/AllEmployees";
import EmployeesBulkUpload from "../pages/employees/EmployeesBulkUpload";
import Vivup from "../components/services/Vivup";
import AppConstants from "../helpers/AppConstants";

const RoutesList = [
  {
    path: AppRoutes.dashboard,
    component: <Dashboard />,
  },
  {
    path: AppRoutes.employeesAll,
    component: <AllEmployees />,
  },
  {
    path: AppRoutes.employeesBulkUpload,
    component: <EmployeesBulkUpload />,
  },
  // {
  //   path: AppRoutes.services,
  //   component: <Services />, // now opens submenu
  // },
  // {
  //   path: AppRoutes.servicesPensions,
  //   component: <Pensions />,
  // },
  // {
  //   path: AppRoutes.servicesEmployeeSupport,
  //   component: <EmployeeSupport />,
  // },
  // {
  //   path: AppRoutes.services24_7GP,
  //   component: <TwentyFourSevenGP />,
  // },
  // {
  //   path: AppRoutes.servicesRetailDiscounts,
  //   component: <RetailDiscounts />,
  // },
  // {
  //   path: AppRoutes.servicesRetailHealthAndWellBeing,
  //   component: <HealthAndWellbeing />,
  // },
  // {
  //   path: AppRoutes.vivup,
  //   component: <Vivup />,
  // },
  {
    path: AppRoutes.uploadDocument,
    component: <UploadDocument />,
  },
  {
    path: AppRoutes.reports,
    component: <Reports />,
  },
  {
    path: AppRoutes.profile,
    component: <Profile />,
  },
  {
    path: AppRoutes.archive,
    component: (
      <AllEmployees employeeType={AppConstants.employeeTypes.archive} />
    ),
  },
];

export default RoutesList;
