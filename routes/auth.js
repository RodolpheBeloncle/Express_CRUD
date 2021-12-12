const authRouter = require("express").Router();
require("dotenv").config();
const User = require("../models/user");

const {
  generateAccessToken
} = require("../helpers/users");


authRouter.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findByEmail(email).then((user) => {
    if (!user) res.status(401).send("Invalid credentials");
    else {
      User.verifyPassword(password, user.hashedPassword).then(
        (passwordIsCorrect) => {
          if (passwordIsCorrect) {
            const accessToken = generateAccessToken(user);
            console.log("user object",user);
            res.send({
              accessToken: accessToken
             
            });
           
          } else res.status(401).send("Invalid credentials");
        }
      );
    }
  });
});


module.exports = authRouter;
