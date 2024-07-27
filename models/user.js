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
  const responseQuery = await database.query({
    text: "SELECT * FROM account WHERE name = $1;",
    values: [name],
  });

  return responseQuery.rows[0] || {};
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
  const result = await database.query({
    text: "WITH deleted AS (DELETE FROM account RETURNING *) SELECT COUNT(*) FROM deleted;",
    query: [user.name, user.email, user.password],
  });
}

export default {
  getAll,
  getByName,
  getByEmail,
  nameExists,
  emailExists,
  create,
  drop,
};
