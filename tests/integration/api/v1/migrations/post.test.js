import database from "infra/database";

beforeAll(async () => {
  await database.query(`DROP SCHEMA public CASCADE; CREATE SCHEMA public`);
});

test("POST to /api/v1/migrations should return 201", async () => {
  const response = await fetch(`${process.env.COSMUS_URL}/api/v1/migrations`, {
    method: "POST",
  });

  const body = await response.json();
  const migration = body[0];

  expect(response.status).toBe(201);
  expect(Array.isArray(body)).toBe(true);
  expect(body.length).toBeGreaterThan(0);
  expect(typeof migration.path).toBe("string");
  expect(typeof migration.name).toBe("string");
  expect(typeof migration.timestamp).toBe("string");
});

test("POST to /api/v1/migrations again should return 200", async () => {
  const response = await fetch(`${process.env.COSMUS_URL}/api/v1/migrations`, {
    method: "POST",
  });

  const body = await response.json();

  expect(response.status).toBe(200);
  expect(Array.isArray(body)).toBe(true);
  expect(body.length).toBe(0);
});
