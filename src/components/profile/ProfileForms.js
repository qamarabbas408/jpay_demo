import React, { useEffect, useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import PaySlipForm from "./subComponents/PaySlipForm";
import AddressForm from "./subComponents/AddressForm";
import ContactDetails from "./subComponents/ContactDetails";
import P45Documents from "./subComponents/P45Documents";
import P60Documents from "./subComponents/P60Documents";
import P11DDocuments from "./subComponents/P11DDocuments";
import OthersDocuments from "./subComponents/OtherDocuments";
import "../style.css";
import { useSelector } from "react-redux";
import { get } from "lodash";

function ProfileForms() {
  const { user } = useSelector((state) => state.AuthenticationReducer);

  const location = useLocation();
  // TODO: replace these constants with real values. To be done via API
  const hashValue = location.hash ? location.hash : "#payslip";
  const tabData = [
    {
      name: "Payslip",
      icon: "home",
      content: <PaySlipForm />,
      href: "#payslip",
    },

    {
      name: "P45",
      icon: "book",
      content: <P45Documents />,
      href: "#p45",
    },

    {
      name: "P60",
      icon: "book",
      content: <P60Documents />,
      href: "#p60",
    },
    {
      name: "P11D",
      icon: "book",
      content: <P11DDocuments />,
      href: "#p11D",
    },
    // {
    //   name: "Address",
    //   icon: "address-book",
    //   content: <AddressForm />,
    //   href: "#address",
    // },
    // {
    //   name: "Contact Details",
    //   icon: "id-card",
    //   content: <ContactDetails />,
    //   href: "#contact-details",
    // },
    {
      name: "Other",
      icon: "bars",
      content: <OthersDocuments />,
      href: "#other",
    },
  ];

  // useEffect(() => {
  if (get(user, "is_admin", 0) == 0 && get(user, "is_archive", 0) == 0) {
    tabData.splice(1, 1);
  }
  // }, [tabData])

  return (
    <div className="custom-tab-1">
      <Tab.Container defaultActiveKey={tabData[0].name.toLowerCase()}>
        <Nav as="ul" className="nav-tabs">
          {tabData.map((data, i) => (
            <Nav.Item as="li" key={i}>
              <Nav.Link
                active={data.href == hashValue}
                eventKey={data.name.toLowerCase()}
                href={data.href}
              >
                {data.name}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
        <Tab.Content className="pt-4">
          {tabData.map((data, i) => (
            <Tab.Pane
              eventKey={data.name.toLowerCase()}
              key={i}
              active={data.href == hashValue}
            >
              <p>{data.content}</p>
            </Tab.Pane>
          ))}
        </Tab.Content>
      </Tab.Container>
    </div>
  );
}

ProfileForms.propTypes = {};

export default ProfileForms;
