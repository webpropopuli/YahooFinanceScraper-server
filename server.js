const Express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const cors = require("cors");
//const express = express();

const USR = require("./auth/authUser");
//console.log(USR);
console.log(USR.email);

const port = process.env.PORT || 5001;
require("./utils/loadEnv"); // Get DB and Yahoo creds
//const dbUrl = process.env.DB_CONNECT;
const { sweeper } = require("./db/sweeper");

//const yahooUsr = process.env.YAHOO_USR;
//const yahooPwd = process.env.YAHOO_PWD;
console.log("dbURL", process.env.DB_CONNECT);

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === "production";

Express()
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(session({ secret: "wpp-scrape-server", cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }))

  .get("/api", (req, res) => {
    res.send({ express: "nothing here: try GET api/hello | POST api/world" });
  })

  .get("/api/hello", (req, res) => {
    res.send({ express: "Hello From Express" });
  })

  .get("/api/sweeper", (req, res) => {
    const dbInfo = { db: "scraper1", coll: "snapshots" };
    sweeper({ db: "scraper1", coll: "snapshots" })
      .then(data => {
        console.log(data); //# THE PAYLOAD!
        res.json(data);
      })
      .catch(e => {
        console.log(e);
        next(e);
      });
  })

  .post("/api/world", (req, res) => {
    console.log(req.body);
    res.send(`I received your POST request. This is what you sent me: ${req.body.post}`);
  })

  .listen(port, () => console.log(`Scraper server started on ${port}`));
