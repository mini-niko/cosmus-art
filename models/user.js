import database from "infra/database.js";

async function getAll() {
  const responseQuery = await database.query("SELECT * FROM account");

  return responseQuery.rows;
}

async function create(user) {
  const responseQuery = await database.query({
    text: "INSERT INTO account(name, email, password) VALUES($1, $2, $3) RETURNING *",
    values: [user.name, user.email, user.password],
  });

  console.log(responseQuery.rows);

  return responseQuery.rows[0];
}

async function drop(user) {
  const result = await database.query({
    text: "WITH deleted AS (DELETE FROM account RETURNING *) SELECT COUNT(*) FROM deleted",
    query: [user.name, user.email, user.password],
  });
}

export default {
  getAll,
  create,
  drop,
};
