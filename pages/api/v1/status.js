import database from "infra/database.js";
import { performance } from "perf_hooks";

async function status(req, res) {
  const databaseName = process.env.POSTGRES_DB;
  const updatedAt = new Date().toISOString();

  const firstQueryStart = performance.now();
  const databaseVersionRes = await database.query("SHOW server_version");
  const databaseVersionValue = databaseVersionRes.rows[0].server_version;
  const firstQueryTime = performance.now() - firstQueryStart;

  const secondQueryStart = performance.now();
  const maxConnectionRes = await database.query("SHOW max_connections");
  const maxConnectionsValue = parseInt(
    maxConnectionRes.rows[0].max_connections,
  );
  const secondQueryTime = performance.now() - secondQueryStart;

  const thirdQueryStart = performance.now();
  const openConnectionRes = await database.query({
    text: "SELECT count(*)::int AS open_connections FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const openConnectionsValue = openConnectionRes.rows[0].open_connections;
  const thirdQueryTime = performance.now() - thirdQueryStart;

  res.status(200).json({
    updated_at: updatedAt,
    dependecies: {
      database: {
        status: "healthy",
        max_connections: maxConnectionsValue,
        open_connections: openConnectionsValue,
        latency: {
          first_query: firstQueryTime,
          second_query: secondQueryTime,
          third_query: thirdQueryTime,
        },
        version: databaseVersionValue,
      },
    },
  });
}

export default status;
