import { parse } from "https://deno.land/std@0.138.0/encoding/yaml.ts";
import { deepAssign } from "https://deno.land/std@0.138.0/_util/deep_assign.ts";
import { assert } from "https://deno.land/std@0.137.0/_util/assert.ts";
import {
  LevelName,
  LogLevelNames,
} from "https://deno.land/std@0.139.0/log/levels.ts";

export interface ConfigOptions {
  listen_address: string | boolean;
  tls_server_config?: {
    cert_file: string;
    key_file: string;
    client_auth_type: string;
    client_ca_file: string;
  };
  basic_auth_users?: Record<string, string>[];
  jvb_stats_endpoint: string;
  labels?: Record<string, string>[];
  log: {
    console: {
      enabled: boolean;
      level: LevelName;
      timestamps: boolean;
      colors: boolean;
    };
  };
}

class Config implements ConfigOptions {
  listen_address = ":9150";
  tls_server_config = undefined;
  basic_auth_users = undefined;
  jvb_stats_endpoint = "http://localhost:8080/colibri/stats";
  labels = undefined;
  log = {
    console: {
      enabled: true,
      level: "INFO" as LevelName,
      timestamps: false,
      colors: true,
    },
  };

  constructor() {
    const configArgIndex = Deno.args.findIndex((arg) => arg === "--config");
    if (configArgIndex >= 0) {
      const configFile = Deno.args[configArgIndex + 1];
      try {
        this.parse(configFile);
      } catch (e) {
        console.error(`ERROR parsing ${configFile}:`, e.message);
        Deno.exit(1);
      }
    } else {
      try {
        this.parse("config.yaml");
      } catch (e) {
        // fail silent cause no config-argument was given
      }
    }
    try {
      this.validate();
    } catch (e) {
      console.error(e.message);
      Deno.exit(1);
    }
  }

  protected parse(file: string) {
    const config = parse(Deno.readTextFileSync(file));
    deepAssign(this, config);
  }

  protected validate() {
    // TODO more validation. json schema?
    assert(
      LogLevelNames.includes(this.log.console.level),
      `Unknown loglevel "${this.log.console.level}". Supported values: ${
        LogLevelNames.join(", ")
      }.`,
    );
  }
}

export const config = new Config();
