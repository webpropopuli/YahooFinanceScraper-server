//# Load DB and YAHOO info from './.env'
(() => {
  const res = require("dotenv").config({ path: "../client/.env" });
  if (res.error) {
    console.warn("Rats.... no env");
    throw res.error;
  }

  //TBD for now, Yahoo info is my personal info. Eventually this should come from a user profile
  let yahooUsr = process.env.YAHOO_USR;
  let yahooPwd = process.env.YAHOO_PWD;
  const dbUrl = process.env.DB_CONNECT;

  if (yahooUsr === undefined || yahooPwd === undefined || dbUrl === undefined) {
    let err = "Problem reading envvars. Please check the README";
    console.warn(err);
    throw err;
  }
  console.warn("EXPRESS Environment loaded OK");
})();

//DJM made this an IIFE
