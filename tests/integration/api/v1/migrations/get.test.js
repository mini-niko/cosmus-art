import database from "infra/database.js";
import migrations from "models/migrations";

beforeAll(async () => {
  await database.query(`DROP SCHEMA public CASCADE; CREATE SCHEMA public`);
});

afterAll(async () => {
  await migrations.up();
});

test("GET to api/v1/migrations should return 200", async () => {
  const response = await fetch(`${process.env.COSMUS_URL}/api/v1/migrations`);
  const body = await response.json();
  const migration = body[0];

  expect(response.status).toBe(200);
  expect(Array.isArray(body)).toBe(true);
  expect(body.length).toBeGreaterThan(0);
  expect(typeof migration.path).toBe("string");
  expect(typeof migration.name).toBe("string");
  expect(typeof migration.timestamp).toBe("string");
});
