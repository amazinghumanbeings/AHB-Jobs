var express = require("express");
var router = express.Router();

const verify = require("../controllers/GoogleLoginRN");

const { OAuth2Client } = require("google-auth-library");
const { NotFound } = require("http-errors");
const { body, validationResult } = require("express-validator");

const { ensureAuth, ensureGuest } = require("../middleware/gAuth");
// const sendEmail = require("../controllers/mailController");
// const { Result } = require("postcss");

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

//Test route

router.post("/test", (req, res, next) => {
  console.log(req.body.idToken);
  res.json({ test: "works" });
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
