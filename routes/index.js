var express = require("express");
var router = express.Router();

const verify = require("../controllers/GoogleLoginRN");

const { OAuth2Client } = require("google-auth-library");
const { NotFound } = require("http-errors");
const { body, validationResult } = require("express-validator");

const { ensureAuth, ensureGuest } = require("../middleware/gAuth");

const db = require("../models/index");
const User = db.user;

// const sendEmail = require("../controllers/mailController");
// const { Result } = require("postcss");

//Test route

router.get("/test", async (req, res, next) => {
  const user = await User.create({
    name: "test",
    username: "testusername",
  });

  res.json({ test: "works" });
});

//To verify google logins by TokenID

router.post("/google/verify", (req, res) => {
  const Token = req.body.idToken;
  verify(Token)
    .then((result) => {
      console.log(result.jwtToken);
      res.json({ JWTToken: result.jwtToken });
    })
    .catch((err) => {
      console.log(err);
      res.send("failed");
    });
});

/* GET home page. */
router.get("/", ensureGuest, function (req, res, next) {
  res.render("index", { title: "AHB JOBS", user: "" });
});

router.get("/welcome", ensureAuth, async (req, res) => {
  // mail('testUser',req.user.email);
  // console.log('user email',req.user.email);
  sendEmail(req.user.email);

  res.json({ user: req.user });
});

router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});

module.exports = router;
