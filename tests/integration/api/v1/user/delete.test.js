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

test("DELETE to /api/v1/user should return 204", async () => {
  const requestHeaders = new Headers().append(
    "Content-Type",
    "application/json",
  );

  const requestUser = {
    name: "test_cosmus",
    email: "email@example.com",
    password: "@cosmusart",
  };

  const requestBody = JSON.stringify(requestUser);

  const response = await fetch(`${process.env.COSMUS_URL}/api/v1/user`, {
    headers: requestHeaders,
    method: "DELETE",
    body: requestBody,
  });

  expect(response.status).toBe(204);
});
