import { get } from "lodash";
import { showFaliureToast } from "./AppToasts";
import { clearStore } from "../redux/reducers/AuthenticationReducer";
import { AsYouType } from "libphonenumber-js";
import moment from "moment";
import AppConstants from "./AppConstants";
import AppRoutes from "./AppRoutes";

const AppUtilities = {
  hex2rgb: (hex) => {
    const rgbChar = ["r", "g", "b"];
    if (hex) {
      const normal = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
      if (normal) {
        return normal.slice(1).reduce((a, e, i) => {
          a[rgbChar[i]] = parseInt(e, 16);
          return a;
        }, {});
      }

      const shorthand = hex.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i);
      if (shorthand) {
        return shorthand.slice(1).reduce((a, e, i) => {
          a[rgbChar[i]] = 0x11 * parseInt(e, 16);
          return a;
        }, {});
      }
    }

    return null;
  },
  getRgbaWithAlpha: (hexValue, alpha = 1) => {
    return `rgba(${hexValue?.r},${hexValue?.g},${hexValue?.b},${alpha.toFixed(
      1
    )})`;
  },
  isSessionTimedOut: (error, navigate, dispatch) => {
    if (
      get(error, "message", "") ==
      "Your Session has timed out, Please login again."
    ) {
      dispatch(clearStore());
      showFaliureToast(error.message);
      navigate(AppRoutes.login);
      return;
    }
  },

  isAdmin: (user) => {
    return get(user, "is_admin", 0) == 1;
  },
  isArchive: (user) => {
    return get(user, "is_archive", 0) == 1;
  },

  isCurrentUser: (currentUserId, selectedUserId) => {
    return currentUserId == selectedUserId;
  },

  minutesText: (minutes) => {
    return minutes > 1 ? " mins" : " min";
  },

  getUsername: (obj) => {
    if (obj) {
      return obj.first_name + " " + obj.last_name;
    } else {
      return "";
    }
  },

  formattedDate: (timestamp = "", format = AppConstants.dateFormat) => {
    if (timestamp) {
      return moment(timestamp).format(format);
    } else {
      return "N/A";
    }
  },

  concatedAddress: (addreeObject) => {
    let address = "";

    if (get(addreeObject, "house_no", "")) {
      address = `${address} ${get(addreeObject, "house_no", "")}`;
    }

    if (get(addreeObject, "street", "")) {
      address = `${address} ${get(addreeObject, "street", "")}`;
    }

    if (get(addreeObject, "county", "")) {
      address = `${address} ${get(addreeObject, "county", "")}`;
    }

    if (get(addreeObject, "post_code", "")) {
      address = `${address} ${get(addreeObject, "post_code", "")}`;
    }

    return address;
  },

  validatePassword: (password) => {
    const regex =
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-\?.,./{}|\":<>\[\]\\\' ~_]).{8,}/;
    return regex.test(password);
  },

  validateEmail: (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  },

  getHeaders: (token, other) => {
    return {
      headers: { Authorization: `Bearer ${token}`, ...other },
    };
  },

  stringHasAlphabets: (string) => {
    const regex = /[a-zA-Z]/g;
    return regex.test(string);
  },

  hasSpecialCharacters: (string) => {
    const regex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return regex.test(string);
  },

  getAlphaNumericString: (string) => {
    return string.toLowerCase().replace(/[" ",_-]/g, "");
  },

  format_phone_number: (e) => {
    let phone_no = String(e.target.value);
    if (phone_no.length === 0 || phone_no[0] !== "+") {
      phone_no = "+" + phone_no;
    }
    return new AsYouType().input(phone_no);
  },

  validateFieldsGlobal: (object) => {
    for (const [key, value] of Object.entries(object)) {
      if (!value) {
        return false;
      }
    }
    return true;
  },
};

export default AppUtilities;
