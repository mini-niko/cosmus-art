import user from "models/user";

async function getAll(req, res) {
  const allUsers = await user.getAll();

  res.status(200).json(allUsers);
}

export default getAll;
