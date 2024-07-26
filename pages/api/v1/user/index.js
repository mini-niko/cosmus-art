import user from "models/user";

function index(req, res) {
  const modelUser = JSON.parse(req.body);

  const methods = {
    POST() {
      user.create(modelUser).then((newUser) => res.status(201).json(newUser));
    },
    DELETE() {
      user.drop(modelUser).then(() => res.status(204).send());
    },
  };

  const execute = methods[req.method];
  execute ? execute() : res.status(405).end();
}

export default index;
