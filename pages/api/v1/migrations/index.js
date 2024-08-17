import migrations from "models/migrations";

async function index(req, res) {
  const methods = {
    async GET() {
      const pendingMigrations = await migrations.getLast();

      let jsonResponse = [];

      pendingMigrations.forEach((pendingMigration) => {
        const dateInISO = new Date(pendingMigration.timestamp).toISOString();

        let jsonFormer = {
          ...pendingMigration,
          timestamp: dateInISO,
        };

        jsonResponse.push(jsonFormer);
      });

      res.status(200).json(jsonResponse);
    },
    async POST() {
      const pendingMigrations = await migrations.up();

      if (pendingMigrations.length === 0)
        return res.status(200).json(pendingMigrations);

      let jsonResponse = [];

      pendingMigrations.forEach((pendingMigration) => {
        const dateInISO = new Date(pendingMigration.timestamp).toISOString();

        let jsonFormer = {
          ...pendingMigration,
          timestamp: dateInISO,
        };

        jsonResponse.push(jsonFormer);
      });

      res.status(201).json(jsonResponse);
    },
  };

  const execute = methods[req.method];

  execute
    ? await execute()
    : res.status(405).json({
        error: `Method "${req.method}" not allowed`,
      });
}

export default index;
