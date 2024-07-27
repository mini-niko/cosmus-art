import user from "models/user";

function index(req, res) {
  return new Promise((resolve, reject) => {
    const modelUser = req.body ? JSON.parse(req.body) : {};

    const methods = {
      GET() {
        user.getByName(req.query.name).then((userFound) => {
          res.status(200).json(userFound);
          resolve();
        });
      },
      POST() {
        user.create(modelUser).then((newUser) => {
          res.status(201).json(newUser);
        });

        resolve();
      },
      DELETE() {
        user.drop(modelUser).then(() => {
          res.status(204).send();
          resolve();
        });
      },
    };

    const execute = methods[req.method];
    execute
      ? execute()
      : (res
          .status(405)
          .json({ code: 405, message: "This method is not allowed" }),
        resolve());
  });
}

export default index;
