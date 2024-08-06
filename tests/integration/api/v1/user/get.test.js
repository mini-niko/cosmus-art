import user from "models/user";

const modelUser = {
  name: "test_cosmus",
  email: "email@example.com",
  password: "@cosmusart",
};

beforeAll(async () => {
  await user.create(modelUser);
});

afterAll(async () => {
  await user.drop(modelUser);
});

test("GET to /api/v1/user/get-all should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/user/get-all");
  const body = await response.json();
  const users = body.users;

  expect(users).not.toBeUndefined();
  expect(users).not.toBeNull();
  expect(Array.isArray(users)).toBeTruthy();
});

test("GET to /api/v1/user with name parameter should return 200", async () => {
  const requestUrl = new URL("http://localhost:3000/api/v1/user/");
  requestUrl.searchParams.set("name", "test_cosmus");

  const requestHeaders = new Headers().append(
    "Content-Type",
    "application/json",
  );

  const response = await fetch(requestUrl.href, {
    headers: requestHeaders,
    method: "GET",
  });

  const body = await response.json();
});
//
