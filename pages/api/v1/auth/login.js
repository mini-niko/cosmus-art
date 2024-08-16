import encrypt from "infra/encryption";
import token from "infra/token";
import user from "models/user";

async function login(req, res) {
  if (req.method != "POST")
    return res.status(405).json({ error: `Method ${req.method} not allowed.` });

  if (!req.body) return res.status(400).json({ error: "Invalid body" });

  const userLogin = JSON.parse(req.body);

  const userFound = await user.getByLogin(userLogin.login);

  if (!userFound.name) return res.status(404).end();

  const matchPasswords = await encrypt.compare(
    userLogin.password,
    userFound.password,
  );

  if (!matchPasswords)
    return res.status(404).json({ error: "Password doesn't match" });

  const toSerialize = {
    id: userFound.id,
    name: userFound.name,
  };

  const tokenLogin = token.encode(toSerialize);

  res.status(202).json({ token: tokenLogin });
}

export default login;
