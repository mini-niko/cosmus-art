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
    console.log(err);
  } finally {
    await dbClient.end();
  }
}

async function getLast() {
  let dbClient;

  try {
    dbClient = await database.getNewClient();

    const options = getMigrationOptions(dbClient, true);

    return await migrationRunner(options);
  } catch (err) {
    console.log(err);
  } finally {
    await dbClient.end();
  }
}

function getMigrationOptions(dbClient, isTest) {
  return {
    dbClient: dbClient,
    dryRun: isTest,
    dir: join(process.cwd(), "infra", "migrations"),
    direction: "up",
    migrationsTable: "pgmigrations",
    log: () => {},
  };
}

const migrationModel = {
  up,
  getLast,
  getMigrationOptions,
};

export default migrationModel;
