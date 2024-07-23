import { query } from "infra/database";
import user from "models/user";

async function getAll(req, res) {
  const allUsers = await user.getAll();

  res.status(200).json({
    users: allUsers,
  });
}

export default getAll;
