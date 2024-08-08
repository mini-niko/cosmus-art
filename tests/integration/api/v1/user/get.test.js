import migrations from "models/migrations";
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

test("GET to /api/v1/user with valid name parameter should return 200", async () => {
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
  const user = body[0];

  expect(body.length).toBe(1);
  expect(typeof user.id).toBe("string");
  expect(user.id).toMatch(
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/,
  );
  expect(typeof user.name).toBe("string");
  expect(user.name).toBe("test_cosmus");
  expect(typeof user.email).toBe("string");
  expect(user.email).toBe("email@example.com");
  expect(typeof user.password).toBe("string");
  expect(user.password).toBe("@cosmusart");
  expect(typeof user.timestamp).toBe("string");
  expect(user.timestamp).toMatch(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/,
  );
});

test("GET to /api/v1/user with invalid name parameter should return 404", async () => {
  const requestUrl = new URL("http://localhost:3000/api/v1/user/");
  requestUrl.searchParams.set("name", "invalid_name_cosmus");

  const requestHeaders = new Headers().append(
    "Content-Type",
    "application/json",
  );

  const response = await fetch(requestUrl.href, {
    headers: requestHeaders,
    method: "GET",
  });

  const body = await response.json();

  expect(response.status).toBe(404);

  expect(body).not.toBeUndefined();
  expect(body.error).toBe("This user doesn't exists.");
});
