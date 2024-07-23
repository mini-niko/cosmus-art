test("GET to /api/v1/user/get-all should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/user/get-all");
  const body = await response.json();
  const users = body.users;

  expect(users).not.toBeUndefined();
  expect(users).not.toBeNull();
  expect(Array.isArray(users)).toBeTruthy();
});
