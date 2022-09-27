import { dirname } from "path";

const rootDir = __dirname;
const appDir = dirname(rootDir);
const baseDir = dirname(appDir);

export { rootDir, baseDir, appDir };
