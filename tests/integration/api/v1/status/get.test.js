test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch(`${process.env.COSMUS_URL}/api/v1/status`);
  const body = await response.json();

  const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

  const databaseInfo = body.dependecies.database;

  expect(response.status).toBe(200);
  expect(body.updated_at).toMatch(regex);
  expect(databaseInfo.version).toBe("16.3");
  expect(databaseInfo.max_connections).toBeGreaterThanOrEqual(100);
  expect(databaseInfo.open_connections).toBeGreaterThanOrEqual(1);
  expect(typeof databaseInfo.latency.first_query).toBe("number");
  expect(typeof databaseInfo.latency.second_query).toBe("number");
  expect(typeof databaseInfo.latency.third_query).toBe("number");
});
