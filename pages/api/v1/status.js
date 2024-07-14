import database from "infra/database.js";

async function status(req, res) {
  const databaseName = process.env.POSTGRES_DB;
  const updatedAt = new Date().toISOString();

  const databaseVersionRes = await database.query("SHOW server_version");
  const maxConnectionRes = await database.query("SHOW max_connections");
  const openConnectionRes = await database.query({
    text: "SELECT count(*)::int AS open_connections FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });

  const databaseVersionValue = databaseVersionRes.rows[0].server_version;
  const maxConnectionsValue = parseInt(
    maxConnectionRes.rows[0].max_connections,
  );
  const openConnectionsValue = openConnectionRes.rows[0].open_connections;

  res.status(200).json({
    updated_at: updatedAt,
    dependecies: {
      database: {
        version: databaseVersionValue,
        max_connections: maxConnectionsValue,
        open_connections: openConnectionsValue,
      },
    },
  });
}

export default status;
