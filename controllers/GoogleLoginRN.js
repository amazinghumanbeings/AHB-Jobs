const { OAuth2Client } = require("google-auth-library");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

const client = new OAuth2Client({
  clientId: process.env.CLIENT_ID,
});

async function verify(Token) {
  const ticket = await client.verifyIdToken({
    audience: process.env.CLIENT_ID,
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
