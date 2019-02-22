const { clientConnect, clientClose } = require("./dbMongo");

//# get dbconnect string from env
// const res = require("dotenv").config({ path: "../.env" });
// if (res.error) throw res.error;

const dbUrl = process.env.DB_CONNECT;

module.exports = {
  //# sweep data from all snapshots */
  /* dbInfo passed in with db and coll but maybe these can come from somewhere else
   */
  sweeper: async dbInfo =>
    await (() =>
      new Promise((resolve, reject) =>
        clientConnect(dbUrl).then(client => {
          //go ahead and make the query...
          client
            .db(dbInfo.db)
            .collection(dbInfo.coll)
            .find()
            .toArray((err, data) => {
              if (err) {
                console.log("SWEEP ERROR");
                reject(err);
              } else {
                //validation would go here...
                console.log("SWEEP Success");
                clientClose(client);
                resolve(data);
              }
            });
        })
      ))()
}; //end exports
