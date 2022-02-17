const { OAuth2Client } = require("google-auth-library");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

const client = new OAuth2Client({
  clientId:
    "1008614041217-6ua0grb2cmdl8h3vnij3gvhc0lukka6j.apps.googleusercontent.com",
});

async function verify(Token) {
  const ticket = await client.verifyIdToken({
    audience:
      "1008614041217-6ua0grb2cmdl8h3vnij3gvhc0lukka6j.apps.googleusercontent.com",
    idToken: Token,
  });

  const payload = ticket.getPayload();
  if (payload) {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
      time: Date(),
      userId: payload.email,
    };

    const jwtToken = jwt.sign(data, jwtSecretKey);

    payload["jwtToken"] = jwtToken;
    return payload;
  }
  return null;
}

module.exports = verify;
