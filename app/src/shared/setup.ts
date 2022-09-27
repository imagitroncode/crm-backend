import { Config } from "src/config";
import { appDir, baseDir } from "src/root";

const appConfig = new Config(baseDir, appDir, "localhost");

export { appConfig };
