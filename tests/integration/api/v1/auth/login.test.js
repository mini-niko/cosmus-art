import user from "models/user";

const userModel = {
  name: "test_login",
  email: "login@example.com",
  password: "cosmus@123",
};

beforeAll(async () => {
  const passwordHash =
    "$2b$15$WLYGZN0tWhD6OgzKai65EO0ylijknz3hL80OjrthZtcxkX3RffCwi";

  await user.create({
    ...userModel,
    password: passwordHash,
  });
});

afterAll(async () => {
  await user.drop(userModel);
});

test("POST to /auth/login with name and password should return 202", async () => {
  const userLogin = {
    login: userModel.name,
    password: userModel.password,
  };

  const requestBody = JSON.stringify(userLogin);

  const response = await fetch(`${process.env.COSMUS_URL}/api/v1/auth/login`, {
    method: "POST",
    body: requestBody,
  });

  const responseBody = await response.json();

  expect(response.status).toBe(202);
  expect(typeof responseBody.token).toBe("string");
  expect(responseBody.token.split(".").length).toBe(3);
});

test("POST to /auth/login with invalid name should return 404", async () => {
  const userLogin = {
    login: "invalid name",
    password: userModel.password,
  };

  const requestBody = JSON.stringify(userLogin);

  const response = await fetch(`${process.env.COSMUS_URL}/api/v1/auth/login`, {
    method: "POST",
    body: requestBody,
  });

  expect(response.status).toBe(404);
});

test("POST to /auth/login with invalid password should return 404", async () => {
  const userLogin = {
    login: userModel.name,
    password: "invalid password",
  };

  const requestBody = JSON.stringify(userLogin);

  const response = await fetch(`${process.env.COSMUS_URL}/api/v1/auth/login`, {
    method: "POST",
    body: requestBody,
  });

  const responseBody = await response.json();

  expect(response.status).toBe(404);
  expect(responseBody.token).toBeUndefined();
});

test("Invalid method to /auth/login with invalid password should return 405", async () => {
  const response = await fetch(`${process.env.COSMUS_URL}/api/v1/auth/login`, {
    method: "GET",
  });

  const responseBody = await response.json();

  expect(response.status).toBe(405);
  expect(responseBody.token).toBeUndefined();
  expect(responseBody.error).toBe("Method GET not allowed.");
});
