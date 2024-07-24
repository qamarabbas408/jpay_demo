// import React, { useState } from "react";
// import { get } from "lodash";
// import { useNavigate } from "react-router";
// import { useDispatch, useSelector } from "react-redux";
// import { unwrapResult } from "@reduxjs/toolkit";
// import { downloadPayslipsRequest } from "../../redux/reducers/ProfileReducer";
// import { showSuccessToast, showFaliureToast } from "../../helpers/AppToasts";
// import DateRangePicker from "react-bootstrap-daterangepicker";
// import Notifications from "./Notifications";
// import AppRoutes from "../../helpers/AppRoutes";
// import useLocalizedConstants from "../../hooks/useLocalizedConstants";
// import BottomButtons from "../../components/dashboard/BottomButtons";
// import InteractiveSection from "./subComponents/InteractiveSection";
// import AppUtilities from "../../helpers/AppUtilities";
// import AppConstants from "../../helpers/AppConstants";
// import AppLogger from "../../helpers/AppLogger";
// import moment from "moment";
// import "react-datepicker/dist/react-datepicker.css";
// import "bootstrap-daterangepicker/daterangepicker.css";

// function Tasks() {
//   // Dispatchers
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Reducer States
//   const { user, token } = useSelector((state) => state.AuthenticationReducer);

//   // Localization and Constants
//   const appConstants = useLocalizedConstants();

//   // Constants
//   const isAdmin = AppUtilities.isAdmin(user);

//   // Local States
//   const [dateRange, setDateRange] = useState({
//     start_date: moment().format(AppConstants.dateFormat),
//     end_date: moment().format(AppConstants.dateFormat),
//   });

//   const data = [
//     {
//       id: 1,
//       title: appConstants.pageTitles.payslips,
//       color: "var(--primary-btn-color)",
//       href: `${AppRoutes.profile}?user_id=${get(user, "id", "")}#payslip`,
//     },
//     {
//       id: 2,
//       title: appConstants.pageTitles.pensions,
//       color: "#E486DB",
//       href: AppRoutes.servicesPensions,
//     },
//     {
//       id: 3,
//       title: appConstants.pageTitles.twentyFourSevenGP,
//       color: "#61C176",
//       href: AppRoutes.services24_7GP,
//     },
//     {
//       id: 4,
//       title: appConstants.pageTitles.employeeSupport,
//       color: "#C1B861",
//       href: AppRoutes.servicesEmployeeSupport,
//     },
//     {
//       id: 5,
//       title: appConstants.pageTitles.retailDiscounts,
//       color: "#61B0C1",
//       href: AppRoutes.servicesRetailDiscounts,
//     },
//     {
//       id: 6,
//       title: appConstants.pageTitles.healthAndWellbeing,
//       color: "#7A61C1",
//       href: AppRoutes.servicesRetailHealthAndWellBeing,
//     },
//   ];

//   const handleProfileClick = () => {
//     if (AppUtilities.isAdmin(user)) {
//     } else {
//       navigate(AppRoutes.profile + `?user_id=${get(user, "id", "")}`);
//     }
//   };

//   const handleDateEvent = (_, picker) => {
//     const { startDate, endDate } = picker;
//     // setDateRange({
//     //   start_date: moment(startDate).format(AppConstants.dateFormat),
//     //   end_date: moment(endDate).format(AppConstants.dateFormat),
//     // });
//     const start_date = moment(startDate).format(AppConstants.dateFormat2);
//     const end_date = moment(endDate).format(AppConstants.dateFormat2);
//     const user_id = get(user, "id", "");

//     dispatch(downloadPayslipsRequest({ token, user_id, start_date, end_date }))
//       .then(unwrapResult)
//       .then((res) => {
//         showSuccessToast(res.message);
//         AppLogger("Response at downloadPayslipsRequest", res);
//         window.open(res.data, "_blank");
//       })
//       .catch((err) => {
//         AppLogger("Error at downloadPayslipsRequest", err);
//         showFaliureToast(err.message);
//       });
//   };

//   const handleDownload = () => {
//     const start_date = moment(dateRange.start_date)
//       .utc()
//       .format(AppConstants.dateFormat2);
//     const end_date = moment(dateRange.end_date)
//       .utc()
//       .format(AppConstants.dateFormat2);
//     const user_id = get(user, "id", "");

//     dispatch(downloadPayslipsRequest({ token, user_id, start_date, end_date }))
//       .then(unwrapResult)
//       .then((res) => {
//         showSuccessToast(res.message);
//         AppLogger("Response at downloadPayslipsRequest", res);
//         window.open(res.data, "_blank");
//       })
//       .catch((err) => {
//         AppLogger("Error at downloadPayslipsRequest", err);
//         showFaliureToast(err.message);
//       });
//   };

//   return (
//     <div>
//       {!isAdmin && (
//         <div className="container my-4">
//           <div className="d-flex flex-wrap justify-content-around gap-3">
//             {data.map((item, index) => {
//               const { title, color, href } = item;
//               return (
//                 <BottomButtons
//                   key={index}
//                   color={color}
//                   title={title}
//                   href={href}
//                 />
//               );
//             })}
//           </div>
//         </div>
//       )}
//       <div className="card px-4-5 py-3">
//         <div className="">
//           <h4 className="task-notification-title">Tasks</h4>
//           <div className="mt-2-5">
//             <InteractiveSection
//               onClick={() => navigate(AppRoutes.uploadDocument)}
//               title={appConstants.documentUploads}
//               subtitle={appConstants.upload}
//               description={appConstants.documentUploadsDesc}
//             />
//           </div>
//           {isAdmin ? (
//             <DateRangePicker
//               initialSettings={{
//                 start: moment(),
//                 end: moment(),
//                 locale: { format: AppConstants.dateFormat },
//               }}
//               className="interactive-section-box mt-3 cursor-pointer bg-transparent"
//               onApply={handleDateEvent}
//             >
//               <div className="interactive-section mt-2-5">
//                 <InteractiveSection
//                   title={appConstants.documentExport}
//                   subtitle={appConstants.exportData}
//                   description={appConstants.documentExportDesc}
//                 />
//               </div>
//             </DateRangePicker>
//           ) : (
//             <div className="interactive-section mt-2-5">
//               <InteractiveSection
//                 onClick={() => handleProfileClick()}
//                 title={appConstants.manageProfile}
//                 subtitle={appConstants.updateStaff}
//                 description={appConstants.manageProfileDesc}
//               />
//             </div>
//           )}
//         </div>
//       </div>
//       <div className="card px-4-5  py-3" id="notifications">
//         <Notifications />
//       </div>
//     </div>
//   );
// }

// export default Tasks;
