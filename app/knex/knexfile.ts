import { config } from "dotenv";

config({
  path: `../../env/${process.env.ENV_NAME || "localhost"}.secrets.env`,
});

config({
  path: `../../env/${process.env.ENV_NAME || "localhost"}.env`,
});

module.exports = {
  client: process.env.DB_CLIENT || "mysql",
  connection: {
    host: process.env.DB_HOSTNAME || "127.0.0.1",
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DEFAULT_DATABASE,
    charset: "utf8mb4",
  },
};
