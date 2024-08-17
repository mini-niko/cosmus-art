import jwt from "jsonwebtoken";

function encode(string) {
  const token = jwt.sign(string, process.env.JWT_SECRET);

  return token;
}

function decode(token) {
  try {
    if (!token) {
      throw Error;
    }

    const obj = jwt.decode(`${token}`);

    return obj;
  } catch (err) {
    return undefined;
  }
}

const token = {
  encode,
  decode,
};

export default token;
