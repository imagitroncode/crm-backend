import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import { config, parse } from "dotenv";
import { ConfigDbDetails } from "./shared/interfaces/config.db-details.interface";

@Injectable()
export class Config {
  private _appName: string;
  private _packageVersion: string;
  private _appPath: string;

  constructor(basePath: string, appPath: string, fallbackEnvironment?: string) {
    this.setup(
      basePath,
      appPath,
      process.env.ENV_NAME || fallbackEnvironment || "",
    );
    this._appPath = appPath;
  }

  protected setup(basePath: string, appPath: string, environment: string) {
    const envBasePath = `${basePath}/env`;
    const configPath = `${envBasePath}/${environment}.env`;
    if (fs.existsSync(configPath)) {
      config({ path: configPath });
    }

    const secretsPath = `${envBasePath}/${environment}${
      environment ? "." : ""
    }secrets.env`;

    if (fs.existsSync(secretsPath)) {
      const envConfig = parse(fs.readFileSync(secretsPath));
      for (const k in envConfig) {
        process.env[k] = envConfig[k];
      }
    }

    const configOverridePath = `${envBasePath}/${environment}.override.env`;
    if (fs.existsSync(configOverridePath)) {
      const envConfig = parse(fs.readFileSync(configOverridePath));

      for (const k in envConfig) {
        process.env[k] = envConfig[k];
      }
    }

    // const packageJson = require(`${appPath}/package.json`);
    // this._appName = packageJson.name;
    // this._packageVersion = packageJson.version;
  }

  get appPort(): number {
    return 3000;
  }

  get dbDetails(): ConfigDbDetails {
    return {
      client: process.env.DB_CLIENT || "mysql",
      version: process.env.DB_VERSION || "8.0",
      host: process.env.DB_HOST || "127.0.0.1",
      user: process.env.DB_USER || "root",
      defaultDatabase: process.env.DB_DEFAULT_DATABASE || "crm-service",
      password: process.env.DB_PASSWORD,
    };
  }
}
