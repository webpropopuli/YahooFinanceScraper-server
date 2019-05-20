const Express = require("express");
const bodyParser = require("body-parser"); // to work with req.body
const path = require("path");
const fs = require("fs");
//const session = require("express-session");
const cors = require("cors"); // cross domain
//const morgan = require("morgan"); // logging

const USR = require("./auth/authUser");
//console.log(USR);
//console.log(USR.email);

const port = process.env.PORT || 5001;
require("./utils/loadEnv"); // Get DB and Yahoo creds
//const dbUrl = process.env.DB_CONNECT;
const { sweeper } = require("./db/sweeper");

//const yahooUsr = process.env.YAHOO_USR;
//const yahooPwd = process.env.YAHOO_PWD;
console.log("dbURL", process.env.DB_CONNECT);

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === "production";

// create a write stream (in append mode)
const logfile = fs.createWriteStream(path.join(__dirname, "morgan.log"), {
  flags: "a"
});

Express()
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(morgan("combined", { stream: logfile }))
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

  .post("/api/login", (req, res) => {
    const { useremail, password } = req.body;
    console.log("SRV GOT", useremail, password);
    res.data = req.body;
    res.data2 = { thing1: "1", thing2: "2" };
    res.json(req.params);
  })

  .post("/api/world", (req, res) => {
    console.log(req.body);
    res.send(
      `I received your POST request. This is what you sent me: ${req.body.post}`
    );
  })

  .listen(port, () => console.log(`Scraper server started on ${port}`));
