import migrations from "models/migrations";

async function index(req, res) {
  const methods = {
    async GET() {
      const pendingMigrations = await migrations.getLast();

      if (!pendingMigrations || pendingMigrations.length === 0)
        return res.status(200).json(pendingMigrations);

      let jsonResponse = [];

      for (let i in pendingMigrations) {
        let migration = pendingMigrations[i];
        let dateToISO = new Date(migration.timestamp).toISOString();

        jsonResponse.push({
          ...migration,
          timestamp: dateToISO,
        });
      }

      return res.status(200).json(jsonResponse);
    },
    async POST() {
      const pendingMigrations = await migrations.up();

      if (pendingMigrations.length === 0)
        return res.status(200).json(pendingMigrations);

      let jsonResponse = [];

      for (let i in pendingMigrations) {
        let migration = pendingMigrations[i];
        let dateToISO = new Date(migration.timestamp).toISOString();

        jsonResponse.push({
          ...migration,
          timestamp: dateToISO,
        });
      }

      return res.status(201).json(jsonResponse);
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
