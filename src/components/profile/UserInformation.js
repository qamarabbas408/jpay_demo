import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { get } from "lodash";
import { IMAGES } from "../../theme/index";
import UserAvatar from "./subComponents/UserAvatar";
import ContactInfo from "./subComponents/ContactInfo";
import useLocalizedConstants from "../../hooks/useLocalizedConstants";
function UserInformation() {
  // Reducer States

  const { profileUser } = useSelector((state) => state.ProfileReducer);
  return (
    <div>
      <UserAvatar
        userAvatar={IMAGES.SampleAvatar}
        userName={get(profileUser, "full_name", "")}
        userDesignation={get(profileUser, "role", "")}
        userEmail={get(profileUser, "email", "")}
        userId={get(profileUser, "company_user_id", "")}
        isAdmin={get(profileUser, "is_admin", 0)}
      />

      <ContactInfo />
    </div>
  );
}

UserInformation.propTypes = {};

export default UserInformation;
