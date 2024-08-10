import { serialize } from "cookie";
import encrypt from "infra/encrypt";
import token from "infra/token";
import user from "models/user";

async function login(req, res) {
  const userLogin = JSON.parse(req.body);

  const userFound = await user.getByLogin(userLogin.login);

  if (!userFound.name) return res.status(404).end();

  const matchPasswords = await encrypt.compare(
    userLogin.password,
    userFound.password,
  );

  if (!matchPasswords)
    return res.status(404).json({ error: "Password doesn't match" });

  const tokenLogin = await token.encode(userFound.id);

  const cookie = serialize("loginToken", tokenLogin, {
    httpOnly: true,
    maxAge: 604800000,
  });

  res.status(202).setHeader("Set-Cookie", cookie).end();
}

export default login;
