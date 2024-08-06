import migrations from "models/migrations";

async function index(req, res) {
  const methods = {
    async GET() {
      const pendingMigrations = await migrations.getLast();
      return res.status(200).json(pendingMigrations);
    },
    async POST() {
      const pendingMigrations = await migrations.up();

      return pendingMigrations.length > 0
        ? res.status(201).json(pendingMigrations)
        : res.status(200).json(pendingMigrations);
    },
  };

  const execute = methods[req.method];

  execute
    ? await execute()
    : res.status(405).json({
        error: `Method "${request.method}" not allowed`,
      });
}

export default index;
