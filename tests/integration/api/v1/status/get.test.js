test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const body = await response.json();

  const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

  expect(response.status).toBe(200);
  expect(body.updated_at).toMatch(regex);
  expect(body.dependecies.database.version).toBe("16.3");
  expect(body.dependecies.database.max_connections).toBe(100);
  expect(body.dependecies.database.open_connections).toBeGreaterThanOrEqual(1);
});
