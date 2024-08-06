import { Client } from "pg";
import { performance } from "perf_hooks";

async function getNewClient() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: process.env.NODE_ENV == "production" ? true : false,
  });
    
  await client.connect();

  return client;
}

async function query(query) {
  let client;

  try {
    client = await getNewClient();
    const res = await client.query(query);
    return res;
  } catch (err) {
    console.log(err);
  } finally {
    await client.end();
  }
}

async function status() {
  const databaseName = process.env.POSTGRES_DB;

  const firstQueryStart = performance.now();
  const databaseVersionRes = await query("SHOW server_version");
  const databaseVersionValue = databaseVersionRes.rows[0].server_version;
  const firstQueryTime = performance.now() - firstQueryStart;

  const secondQueryStart = performance.now();
  const maxConnectionRes = await query("SHOW max_connections");
  const maxConnectionsValue = parseInt(
    maxConnectionRes.rows[0].max_connections,
  );
  const secondQueryTime = performance.now() - secondQueryStart;

  const thirdQueryStart = performance.now();
  const openConnectionRes = await query({
    text: "SELECT count(*)::int AS open_connections FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const openConnectionsValue = openConnectionRes.rows[0].open_connections;
  const thirdQueryTime = performance.now() - thirdQueryStart;

  return {
    status: "healthy",
    max_connections: maxConnectionsValue,
    open_connections: openConnectionsValue,
    latency: {
      first_query: firstQueryTime,
      second_query: secondQueryTime,
      third_query: thirdQueryTime,
    },
    version: databaseVersionValue,
  };
}

export default {
  getNewClient,
  query,
  status,
};
