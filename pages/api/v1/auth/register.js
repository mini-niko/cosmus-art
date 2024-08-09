import userModel from "models/user";
import bcrypt from "infra/encrypt";

async function register(req, res) {
  const user = JSON.parse(req.body);

  const validUser = await validateUser(user);

  if (validUser.code)
    return res.status(validUser.code).json({ error: validUser.message });

  const passwordHash = await bcrypt.encrypt(user.password);

  const userToSave = {
    name: user.name,
    email: user.email,
    password: passwordHash,
  };

  const toReturn = userModel.create(userToSave);

  return res.status(201).send();
}

// Otimizar este código mais tarde
async function validateUser({ name, email, password, confirmPassword }) {
  const response = {
    code: false,
    message: "",
  };

  const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;

  if (!name || name.length < 3) {
    response.code = 422;
    response.message = "Your name must contain at least 3 characters.";

    return response;
  }

  if (!email || !emailRegex.test(email)) {
    response.code = 422;
    response.message = "Your email must be valid.";

    return response;
  }

  if (!password || password.length < 8) {
    response.code = 422;
    response.message = "Your password must contain at least 8 characters.";

    return response;
  }

  if (confirmPassword != password) {
    response.code = 422;
    response.message = "Your confirm password doesn't match with password.";

    return response;
  }

  const existsName = await userModel.nameExists(name);
  const existsEmail = await userModel.emailExists(email);

  if (existsName) {
    response.code = 409;
    response.message = "This name has already been used.";

    return response;
  }

  if (existsEmail) {
    response.code = 409;
    response.message = "This email has already been used.";

    return response;
  }

  return response;
}

export default register;
