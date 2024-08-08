import user from "models/user";

async function index(req, res) {
  const modelUser = req.body ? JSON.parse(req.body) : {};

  const methods = {
    async GET() {
      let userFound = await user.getByName(req.query.name);

      if (userFound.length === 0)
        return res.status(404).json({ error: "This user doesn't exists." });

      return res.status(200).json(userFound);
    },
    async POST() {
      if (await user.nameExists(modelUser.name))
        return res
          .status(409)
          .json({ error: "Unable to create a user with an existing name." });

      if (await user.emailExists(modelUser.email))
        return res
          .status(409)
          .json({ error: "Unable to create a user with an existing email." });

      let newUser = await user.create(modelUser);

      return res.status(201).json(newUser);
    },
    async DELETE() {
      await user.drop(modelUser);
      return res.status(204).end();
    },
  };

  const execute = methods[req.method];

  return execute
    ? await execute()
    : res.status(405).json({ error: `Method "${req.method}" not allowed` });
}

export default index;
