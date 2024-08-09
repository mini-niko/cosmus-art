import user from "models/user";

const userModel = {
  name: "test_cosmus",
  email: "email@example.com",
  password: "cosmus@123",
  confirmPassword: "cosmus@123",
};

beforeAll(async () => {
  await user.drop(userModel);
});

afterAll(async () => {
  await user.drop(userModel);
});

test("POST to /api/v1/auth/register should return 201", async () => {
  const requestBody = JSON.stringify(userModel);
  const requestUrl = `${process.env.COSMUS_URL}/api/v1/auth/register`;

  const response = await fetch(requestUrl, {
    method: "POST",
    body: requestBody,
  });

  expect(response.status).toBe(201);
});

test("POST to /api/v1/auth/register with invalid name should return 201", async () => {
  const invalidUser1 = userModel;
  delete invalidUser1.name;

  const requestBody1 = JSON.stringify(invalidUser1);
  const requestUrl1 = `${process.env.COSMUS_URL}/api/v1/auth/register`;

  const response1 = await fetch(requestUrl1, {
    method: "POST",
    body: requestBody1,
  });

  const responseBody1 = await response1.json();

  expect(response1.status).toBe(422);
  expect(responseBody1).not.toBeUndefined();
  expect(typeof responseBody1.error).toBe("string");
  expect(responseBody1.error).toBe(
    "Your name must contain at least 3 characters.",
  );

  const invalidUser2 = {
    ...userModel,
    name: "a",
  };

  const requestBody2 = JSON.stringify(invalidUser2);
  const requestUrl2 = `${process.env.COSMUS_URL}/api/v1/auth/register`;

  const response2 = await fetch(requestUrl2, {
    method: "POST",
    body: requestBody2,
  });

  const responseBody2 = await response2.json();

  expect(response2.status).toBe(422);
  expect(responseBody2).not.toBeUndefined();
  expect(typeof responseBody2.error).toBe("string");
  expect(responseBody2.error).toBe(
    "Your name must contain at least 3 characters.",
  );
});
