import React, { useState } from "react";
import { Link } from "react-router-dom";

const dataToggle = [
  { href: "#notes", name: "Notes" },
  { href: "#alerts", name: "Alerts" },
  { href: "#chat", name: "Chat" },
];

const ChatBox = ({ onClick, toggle }) => {
  const [toggleTab, settoggleTab] = useState(
    window.location.hash.slice(1) ? window.location.hash.slice(1) : "chat"
  );

  return (
    <div className={`chatbox ${toggle === "chatbox" ? "active" : ""}`}>
      <div className="chatbox-close" onClick={() => onClick()}></div>
      <div className="custom-tab-1">
        <ul className="nav nav-tabs">
          {dataToggle.map((data, i) => (
            <li className="nav-item" key={i}>
              <Link
                className={`nav-link ${
                  toggleTab === data.name.toLocaleLowerCase() ? "active" : ""
                }`}
                to="#"
                data-toggle="tab"
                href={data.href}
                onClick={() => settoggleTab(data.name.toLocaleLowerCase())}
              >
                {data.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="tab-content">
          {/* <Chat
            //PerfectScrollbar={PerfectScrollbar}
            toggle={toggle}
            toggleTab={toggleTab}
          />
          <Notes
            //PerfectScrollbar={PerfectScrollbar}
            toggle={toggle}
            toggleTab={toggleTab}
          />
          <Alerts
            //PerfectScrollbar={PerfectScrollbar}
            toggle={toggle}
            toggleTab={toggleTab}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
