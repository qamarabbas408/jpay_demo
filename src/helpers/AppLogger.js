function AppLogger(message, data) {
  if (process.env.NODE_ENV == "development") {
    // console.log(
    //   "%c========= Message =========",
    //   "color:red; font-weight:bold; font-size:15px"
    // );
    console.log(` ====== ${message} ====== `, data);
    // console.log(
    //   "%c========= With Below Param =========",
    //   "color:orange; font-weight:bold; font-size:15px"
    // );
    // console.log(data);
    // console.log(
    //   "%c================================",
    //   "color:orange; font-weight:bold; font-size:15px"
    // );
  }
}

export default AppLogger;
