import database from "infra/database.js";

async function status(req, res) {
  const updatedAt = new Date().toISOString();
  const databaseStatus = await database.status();

  res.status(200).json({
    updated_at: updatedAt,
    dependecies: {
      database: databaseStatus,
    },
  });
}

export default status;
