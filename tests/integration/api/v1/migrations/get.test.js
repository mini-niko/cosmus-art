import database from "infra/database.js";
import migrations from "models/migrations";

beforeAll(async () => {
  await database.query(`DROP SCHEMA public CASCADE; CREATE SCHEMA public`);
});

afterAll(async () => {
  await migrations.up();
});

test("GET to api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");
  const body = await response.json();

  expect(response.status).toBe(200);
  expect(Array.isArray(body)).toBe(true);
  expect(body.length).toBeGreaterThan(0);
});