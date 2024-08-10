import jwt from "jsonwebtoken";

async function encode(string) {
  const token = jwt.sign(string, process.env.JWT_SECRET);

  return token;
}

async function decode(token) {
  const string = jwt.decode(token, process.env.JWT_SECRET);

  return string;
}

export default {
  encode,
  decode,
};
