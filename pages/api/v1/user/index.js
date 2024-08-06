import user from "models/user";

function index(req, res) {
  const modelUser = req.body ? JSON.parse(req.body) : {};

  const methods = {
    GET() {
      user.getByName(req.query.name).then((userFound) => {
        return res.status(200).json(userFound);
      });
    },
    POST() {
      user.create(modelUser).then((newUser) => {
        return res.status(201).json(newUser);
      });
    },
    DELETE() {
      user.drop(modelUser).then(() => {
        return res.status(204).send()
      });
    },
  };

  const execute = methods[req.method];
  return execute
    ? execute()
    : (res
        .status(405)
        .json({ error: `Method "${request.method}" not allowed` }),
      );
}

export default index;
