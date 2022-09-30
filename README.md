# Jitsi Videobridge prometheus exporter

Fetches the colibri stats from the JVB and provides an scrape endpoint for
Prometheus.

Written in TypeScript for Deno.

## Installation

Have a recent version of [Deno](https://deno.land/) installed.

jvb_exporter needs `--allow-net` to open fetch the jvb-stats and
`--allow-read=config.yaml` to read the configuration (if the defaults don't
fit).

```bash
deno run --no-promt --allow-net jvb_exporter.js
```

### TODO / TBDC

- CLI config options? (https://github.com/cacjs/cac)
