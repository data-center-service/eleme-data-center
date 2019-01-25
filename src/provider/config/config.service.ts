import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ConfigService {

    private readonly envConfig: { [prop: string]: string };

    constructor(filePath: string) {
        this.envConfig = dotenv.parse(fs.readFileSync(filePath));
    }

    get MONGO_PORT(): number {
        return Number(this.envConfig.MONGO_PORT);
    }

    get(key: string): string {
        const env = process.env[key];
        if (env) return env;
        return this.envConfig[key];
    }

}

export const ConfigStaticService = new ConfigService('config/default.env');