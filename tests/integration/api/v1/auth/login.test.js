import encrypt from "infra/encrypt";
import user from "models/user";

const userModel = {
  name: "test_login",
  email: "login@example.com",
  password: "cosmus@123",
};

beforeAll(async () => {
  const passwordHash = await encrypt.encrypt(userModel.password);

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

  const setCookies = response.headers.getSetCookie();

  expect(response.status).toBe(202);
  expect(setCookies.length).toBe(1);
  expect(setCookies[0].startsWith("loginToken")).toBe(true);
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

  const setCookies = response.headers.getSetCookie();

  expect(response.status).toBe(404);
  expect(setCookies.length).toBe(0);
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

  const setCookies = response.headers.getSetCookie();

  expect(response.status).toBe(404);
  expect(setCookies.length).toBe(0);
});
