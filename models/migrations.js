import database from "infra/database";
import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

async function up() {
  let dbClient;

  try {
    dbClient = await database.getNewClient();

    const options = getMigrationOptions(dbClient, false);

    return await migrationRunner(options);
  } catch (err) {
    throw err;
  } finally {
    await dbClient.end();
  }
}

async function getLast() {
  let dbClient;

  try {
    dbClient = await database.getNewClient();

    const options = getMigrationOptions(dbClient, true);
    
    const pendingMigrations = await migrationRunner(options);

    return pendingMigrations
  } catch (err) {
    console.log(err)
  } finally {
    await dbClient.end();
  }
}

function getMigrationOptions(dbClient, isTest) {
  return {
    dbClient: dbClient,
    dryRun: isTest,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };
}

export default {
  up,
  getLast,
};
