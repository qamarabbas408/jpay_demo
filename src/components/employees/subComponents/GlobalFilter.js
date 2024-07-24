import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { showWarningToast } from "../../../helpers/AppToasts";
import search from "../../../icons/search.png";
import useLocalizedConstants from "../../../hooks/useLocalizedConstants";
import useLocalizedToast from "../../../hooks/useLocalizedToast";

export const GlobalFilter = ({ Search, set, searchh, setCurrentPage }) => {
  // Localization and Constants
  const appConstants = useLocalizedConstants();
  const localizedToastMsg = useLocalizedToast();

  // Handle search query
  function handleSearch() {
    if (searchh) {
      setCurrentPage(1);
      Search(null, searchh);
    } else {
      showWarningToast(localizedToastMsg.pleaseEnterValtoSearch);
    }
  }

  // handle clear search box
  function handleClear() {
    if (searchh) {
      setCurrentPage(1);
      set("");
      Search(1, "");
    } else {
      showWarningToast(localizedToastMsg.searchBoxAlreadyEmpty);
    }
  }

  return (
    <div className=" d-flex flex-column flex-lg-row  h4  text-dark gap-2  col-sm col-lg-8  search-max-width">
      <form
        className="search-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <input
          style={{ paddingLeft: 32 }}
          className="input-search form-control "
          value={searchh}
          onChange={(e) => {
            const value = e.target.value;
            if (value) {
              set(value);
            } else {
              handleClear();
            }
          }}
          placeholder="Search"
          name="search"
        />
      </form>
      <img
        style={{
          position: "absolute",
          marginLeft: 13,
          marginTop: 13,
        }}
        src={search}
        width={16}
        height={16}
        alt="search"
      />

      <div className="d-flex" style={{ alignSelf: "center" }}>
        <Button
          style={{ backgroundColor: "var(--primary-btn-color)", color: "#fff" }}
          className="ml-1 fs-5 border-0 "
          onClick={handleSearch}
        >
          {appConstants.search}
        </Button>
        <Button
          style={{ backgroundColor: "var(--primary-btn-color)", color: "#fff" }}
          className="ml-1 fs-5 border-0 "
          onClick={handleClear}
        >
          {appConstants.buttons.clear}
        </Button>
      </div>
    </div>
  );
};
