const dbConnection =
  process.env.DATABASE_URL || "postgresql://luis@localhost/monografico";

module.exports = {
  development: {
    client: "pg",
    connection: dbConnection,
    pool: {
      min: 2,
      max: 10,
    },
  },

  production: {
    client: "postgresql",
    connection: dbConnection,
    pool: {
      min: 2,
      max: 10,
    },
  },
};
