import { DynamicModule } from "@nestjs/common";
import { KnexModule } from "nestjs-knex";
import { ConfigDbDetails } from "./interfaces/config.db-details.interface";
import { appConfig } from "./setup";

const dbDetails: ConfigDbDetails = appConfig.dbDetails;

let databaseModules: DynamicModule[] = [];

databaseModules = databaseModules.concat([
  KnexModule.forRoot({
    config: {
      client: dbDetails.client,
      // version: dbDetails.version,
      connection: {
        host: dbDetails.host,
        user: dbDetails.user,
        password: dbDetails.password,
        database: dbDetails.defaultDatabase,
      },
    },
  }),
]);

export { databaseModules };
