import { config } from "./lib/config.ts";
import { JvbStats } from "./lib/JvbStats.ts";
import { Server } from "./lib/Server.ts";
import { logger } from "./lib/logger.ts";

logger.info(`Starting Jitsi Videobridge exporter`);
logger.info(`JVB colibri-stats endpoint: ${config.jvb_stats_endpoint}`);

const srv = new Server();
const jvbStats = new JvbStats({
  colibriStatsUrl: config.jvb_stats_endpoint,
  labels: config.labels,
});

srv.on("request", async ({ request, respondWith }) => {
  const uri = new URL(request.url);
  if (request.method === "GET" && uri.pathname === "/metrics") {
    try {
      const stats = await jvbStats.getStats();
      respondWith(new Response(stats, { status: 200 }));
    } catch (e) {
      logger.error(e);
      respondWith(new Response("Service Unavailable", { status: 503 }));
    }
  } else {
    respondWith(new Response("Jitsi JVB exporter", { status: 404 }));
  }
});
