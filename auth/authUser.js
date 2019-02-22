const crypto = require("crypto");
const jwt = require("jsonwebtoken");

module.exports = {
  email: "blank",
  hash: "",
  salt: "",

  getEmail: () => {
    return module.exports.email;
  },
  setPassword: password => {
    USR.salt = crypto.randomBytes(16).toString("hex");
    USR.hash = crypto.pbkdf2Sync(password, USR.salt, 10000, 512, "sha512").toString("hex");
  },

  validatePassword: password => {
    return USR.hash === crypto.pbkdf2Sync(password, USR.salt, 10000, 512, "sha512").toString("hex");
  },
  generateJWT: () => {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign(
      {
        email: this.email,
        id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10)
      },
      "secret"
    );
  },
  toAuthJSON: () => {
    return {
      _id: this._id,
      email: this.email,
      token: this.generateJWT()
    };
  }
};
