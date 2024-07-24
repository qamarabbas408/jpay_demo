// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router";
// import { unwrapResult } from "@reduxjs/toolkit";
// import { Button } from "react-bootstrap";
// import { get } from "lodash";
// import { Link } from "react-router-dom";
// import { clickThroughRateRequest } from "../../redux/reducers/ReportsReducer";
// import useLocalizedConstants from "../../hooks/useLocalizedConstants";
// import useLocalizedPageTitle from "../../hooks/useLocalizedPageTitle";
// import AppLogger from "../../helpers/AppLogger";
// import AppConstants from "../../helpers/AppConstants";
// import ListItem from "../common/ListItem";
// import CardSubHeading from "../common/CardSubHeading";
// import ParaType1 from "../common/ParaType1";
// import CardTitle from "../common/CardTitle";
// import AppUtilities from "../../helpers/AppUtilities";

// function Pensions() {
//   // Dispatchers
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // Localization and Constants
//   const appConstants = useLocalizedConstants();

//   // Reducer States
//   const { user, token } = useSelector((state) => state.AuthenticationReducer);

//   // Custom Hooks
//   useLocalizedPageTitle(appConstants.pageTitles.pensions);

//   // Local States

//   // TODO: add links. To be done after implementing AppRoutes
//   const links = [
//     {
//       text: appConstants.infoLink1,
//       to: AppConstants.externalUrls.pensions.whatIsWorkPlace,
//     },
//     {
//       text: appConstants.infoLink2,
//       to: AppConstants.externalUrls.pensions.retirementPlanning,
//     },
//     {
//       text: appConstants.infoLink3,
//       to: AppConstants.externalUrls.pensions.trustess,
//     },
//   ];

//   const handleClickThroughRateRequest = () => {
//     dispatch(
//       clickThroughRateRequest({
//         userId: get(user, "company_user_id", ""),
//         token,
//         key: AppConstants.servicesTypes.pay_and_pension,
//       })
//     )
//       .then(unwrapResult)
//       .then((res) => {
//         AppLogger("Response at clickThroughRateRequest", res);
//       })
//       .catch((err) => {
//         AppLogger("Error at clickThroughRateRequest", err);
//         AppUtilities.isSessionTimedOut(err, navigate, dispatch);
//       });
//   };

//   return (
//     <div className="card p-1  m-4 m-sm-5  p-sm-3">
//       <CardTitle text={appConstants.payPension} styles={"text-center mt-2"} />
//       <div className="row mx-3 mx-sm-5">
//         <div className="d-flex justify-content-center justify-content-sm-start p-0">
//           <a
//             href={AppConstants.externalUrls.pensions.pensionPortal}
//             target="_blank"
//           >
//             <Button
//               variant="secondary"
//               id="pension-portal-access"
//               onClick={() => handleClickThroughRateRequest()}
//             >
//               {appConstants.pensionPortalAccess}
//             </Button>
//           </a>
//         </div>
//       </div>

//       <ParaType1
//         text={appConstants.pensionIntro}
//         styles={"card-paragraph-font mt-2 px-sm-5"}
//       />
//       <ParaType1
//         text={appConstants.servicesPensionDesc}
//         styles={"card-paragraph-font px-sm-5"}
//       />
//       <CardSubHeading
//         text={appConstants.pensionInformation}
//         styles={"mx-3 mx-sm-5"}
//       />

//       {links.map((item) => {
//         return (
//           <div class="mx-3 mx-sm-5  px-sm-5">
//             <ListItem
//               text={
//                 <Link to={item.to} className="card-link-font" target="_blank">
//                   {item.text}
//                 </Link>
//               }
//               fillColor={"var(--secondary)"}
//             />
//           </div>
//         );
//       })}

//       <p className="card-paragraph-font px-sm-5 mt-2">
//         {appConstants.infoFooter}
//       </p>
//       <h3 className="mx-3  mx-sm-5">{appConstants.contactMyPensionComp}</h3>
//       <p className="card-paragraph-font px-sm-5 mt-2">
//         <i class="fa fa-mobile-screen px-1"></i>
//         <a href={"tel:03301241510"} className="px-2">
//           {appConstants.pensionPhNo}
//         </a>
//       </p>
//     </div>
//   );
// }

// Pensions.propTypes = {};

// export default Pensions;
