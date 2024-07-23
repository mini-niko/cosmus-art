/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = async (pgm) => {
  await pgm.createTable("account", {
    id: {
      type: "uuid",
      default: pgm.func("gen_random_uuid()"),
      notNull: true,
      primaryKey: true,
    },
    name: {
      type: "varchar(50)",
      unique: true,
      notNull: true,
    },
    email: {
      type: "varchar(254)",
      unique: true,
      notNull: true,
    },
    password: {
      type: "varchar(50)",
      notNull: true,
    },
    timestamp: {
      type: "timestamptz",
      default: pgm.func("current_timestamp"),
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = async (pgm) => {
  await pgm.dropTable("account");
};
