import { useEffect } from "react";
import { get } from "lodash";
import { useSelector } from "react-redux";

const useLocalizedPageTitle = (title) => {
  const { whiteLabelling } = useSelector((state) => state.WhiteLabelingReducer);

  const name = get(whiteLabelling, "company.name", "");
  const subtitle = "Payroll Management System";

  useEffect(() => {
    if (title) {
      document.title = name ? name + " - " + title : title;
    } else {
      document.title = name ? name + " - " + subtitle : subtitle;
    }
  }, [title]);
  return;
};

export default useLocalizedPageTitle;
