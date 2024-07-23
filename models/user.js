import database from "infra/database.js";

async function getAll() {
  const allUsers = await database.query("SELECT * FROM account");

  return allUsers.rows;
}

export default {
  getAll,
};
