import { logger } from "./logger.ts";
import {
  colibriMultisizeStatsMap,
  colibriStatsMap,
} from "../colibriStatsMap.ts";

export interface JvbStatsOpts {
  // URL to fetch the colibri stats
  colibriStatsUrl: string;
  // cache for prom-metrics before re-fetch colibri stats
  cacheTimeout?: number;
  // max request time to fetch colibri stats
  jvbRequestTimeout?: number;
  // additional labels to add to every metric
  labels?: Record<string, string>[];
  // expose total values reported by the JVB
  exposeTotal: boolean;
  //
  totalToGauge: boolean;
}

export class JvbStats {
  protected colibriStatsUrl: string;
  protected cacheTimeout = 2500;
  protected jvbRequestTimeout = 1000;
  protected totalLastValues: Map<string, number> = new Map();

  protected metrics: string | null = null;
  protected labels: string | null = null;

  constructor(opts: JvbStatsOpts) {
    const { colibriStatsUrl, cacheTimeout, jvbRequestTimeout, labels } = opts;
    this.colibriStatsUrl = colibriStatsUrl;
    if (cacheTimeout) {
      this.cacheTimeout = cacheTimeout;
    }
    if (jvbRequestTimeout) {
      this.jvbRequestTimeout = jvbRequestTimeout;
    }

    if (labels) {
      this.labels = Object.entries(labels).map(([lbl, val]) =>
        `${lbl}="${val}"`
      ).join(",");
    }
  }

  public async getStats() {
    if (this.metrics !== null) {
      return this.metrics;
    }
    setTimeout(() => this.metrics = null, this.cacheTimeout);
    const colibriStats = await this.fetchStats();
    this.toPromMetrics(colibriStats);
    return this.metrics;
  }

  protected async fetchStats() {
    const abort = new AbortController();
    const timeout = setTimeout(() => abort.abort(), this.jvbRequestTimeout);
    logger.debug(`Fetching metrics from ${this.colibriStatsUrl}`);
    const res = await fetch(this.colibriStatsUrl, { signal: abort.signal });
    clearTimeout(timeout);
    return await res.json();
  }

  protected toPromMetrics(
    objStats: Record<string, number | boolean | string | number[]>,
  ): string {
    this.metrics = "";
    const prefix = "jvb_";
    const labels = this.labels ? `{${this.labels}}` : "";

    Object.keys(colibriStatsMap).forEach((stat) => {
      let val = objStats[stat];

      if(typeof val === 'undefined' || val === null) {
        return;
      }

      const { name, type, help } = colibriStatsMap[stat];
      if (typeof val === "boolean") {
        val = val ? 1 : 0;
      }
      this.metrics += `# HELP ${prefix + name} ${help}\n`;
      this.metrics += `# TYPE ${prefix + name} ${type}\n`;
      this.metrics += `${prefix + name}${labels} ${val}\n`;
    });

    Object.keys(colibriMultisizeStatsMap).forEach((stat) => {
      const { name, type, help, size } = colibriMultisizeStatsMap[stat];
      const val = objStats[stat] as number[];
      this.metrics += `# HELP ${prefix + name} ${help}\n`;
      this.metrics += `# TYPE ${prefix + name} ${type}\n`;
      for (let i = 1; i < size; i++) {
        this.metrics += `${prefix + name}{size="${i}"${
          this.labels && "," + this.labels
        }} ${val[i]}\n`;
      }
    });
    return this.metrics;
  }
}
