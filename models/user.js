import database from "infra/database.js";

async function getAll() {
  const responseQuery = await database.query(
    "SELECT id, name, timestamp FROM account;",
  );

  return responseQuery.rows;
}

async function nameExists(name) {
  const responseQuery = await database.query({
    text: "SELECT * FROM account WHERE name = $1;",
    values: [name],
  });

  const exists = responseQuery.rows.length > 0 ? true : false;

  return exists;
}

async function emailExists(email) {
  const responseQuery = await database.query({
    text: "SELECT * FROM account WHERE email = $1;",
    values: [email],
  });

  const exists = responseQuery.rows.length > 0 ? true : false;

  return exists;
}

async function getByName(name) {
  const responseQuery = await database.query(
    `SELECT * FROM account WHERE name = '${name}';`,
  );

  return responseQuery.rows || {};
}

async function getByEmail(email) {
  const responseQuery = await database.query({
    text: "SELECT * FROM account WHERE email = $1;",
    values: [email],
  });

  return responseQuery.rows[0] || {};
}

async function create(user) {
  const responseQuery = await database.query({
    text: "INSERT INTO account(name, email, password) VALUES($1, $2, $3) RETURNING *;",
    values: [user.name, user.email, user.password],
  });

  return responseQuery.rows[0];
}

async function drop(user) {
  const responseQuery = await database.query({
    text: "WITH deleted AS (DELETE FROM account WHERE name = $1 AND email = $2 AND password = $3 RETURNING *) SELECT COUNT(*) FROM deleted;",
    values: [user.name, user.email, user.password],
  });

  return responseQuery.rows;
}

const userModel = {
  getAll,
  getByName,
  getByEmail,
  nameExists,
  emailExists,
  create,
  drop,
};

export default userModel;
