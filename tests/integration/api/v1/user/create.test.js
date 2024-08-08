import user from "models/user";

const modelUser = {
  name: "test_cosmus",
  email: "email@example.com",
  password: "@cosmusart",
};

beforeAll(async () => {
  await user.drop(modelUser);
});

afterAll(async () => {
  await user.drop(modelUser);
});

test("POST to /api/v1/user should return 201", async () => {
  const requestHeaders = new Headers().append(
    "Content-Type",
    "application/json",
  );

  const requestBody = JSON.stringify(modelUser);

  const response = await fetch("http://localhost:3000/api/v1/user", {
    headers: requestHeaders,
    method: "POST",
    body: requestBody,
  });

  const responseBody = await response.json();

  expect(response.status).toBe(201);
  expect(responseBody.name).toBe(modelUser.name);
  expect(responseBody.email).toBe(modelUser.email);
  expect(responseBody.password).toBe(modelUser.password);
});

test("POST to /api/v1/user with existing name should return 409", async () => {
  const requestHeaders = new Headers().append(
    "Content-Type",
    "application/json",
  );

  const requestUser = {
    ...modelUser,
    email: "email2@example.com",
  };

  const requestBody = JSON.stringify(requestUser);

  const response = await fetch("http://localhost:3000/api/v1/user", {
    headers: requestHeaders,
    method: "POST",
    body: requestBody,
  });

  const responseBody = await response.json();

  expect(response.status).toBe(409);
  expect(responseBody).not.toBeUndefined();
  expect(responseBody.error).toBe(
    "Unable to create a user with an existing name.",
  );
});

test("POST to /api/v1/user with existing email should return 409", async () => {
  const requestHeaders = new Headers().append(
    "Content-Type",
    "application/json",
  );

  const requestUser = {
    ...modelUser,
    name: "test2_cosmus",
  };

  const requestBody = JSON.stringify(requestUser);

  const response = await fetch("http://localhost:3000/api/v1/user", {
    headers: requestHeaders,
    method: "POST",
    body: requestBody,
  });

  const responseBody = await response.json();

  expect(response.status).toBe(409);
  expect(responseBody).not.toBeUndefined();
  expect(responseBody.error).toBe(
    "Unable to create a user with an existing email.",
  );
});
