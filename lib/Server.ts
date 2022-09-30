import { config } from "./config.ts";
import { logger } from "./logger.ts";
import { EventEmitter } from "https://deno.land/std@0.136.0/node/events.ts";
import { compare } from "https://deno.land/x/bcrypt@v0.3.0/mod.ts";

export class Server extends EventEmitter {
  protected enabled = false;

  constructor() {
    super();
    if (!config.listen_address) return;
    this.enabled = true;

    if (config.basic_auth_users) {
      logger.info(`Enabling basic-auth`);
    }

    const addParts = config.listen_address.split(":");
    const port = parseInt(addParts.pop() || "9015", 10);
    const hostname = addParts.join(":") || "0.0.0.0";

    let server;
    if (config.tls_server_config) {
      const { cert_file, key_file, client_auth_type, client_ca_file } =
        config.tls_server_config;
      // https://github.com/denoland/deno/issues/6170
      // TODO: implement mTLS when available
      if (client_auth_type || client_ca_file) {
        logger.error(
          `Sorry, mTLS is not (yet) supported by Deno. Pls unset tls_client_auth and client_ca_file and use basic-auth.`,
        );
        Deno.exit(1);
      }
      server = Deno.listenTls({
        port,
        hostname,
        certFile: cert_file,
        keyFile: key_file,
      });
      logger.info(`HTTPS Server listening on ${hostname}:${port}`);
    } else {
      server = Deno.listen({ port, hostname });
      logger.info(`HTTP Server listening on ${hostname}:${port}`);
    }

    (async () => {
      // Connections to the server will be yielded up as an async iterable.
      for await (const conn of server) {
        // In order to not be blocking, handle each connection individually without awaiting
        this.serveHttp(conn);
      }
    })();
  }

  async serveHttp(conn: Deno.Conn) {
    try {
      // This "upgrades" a network connection into an HTTP connection.
      const httpConn = Deno.serveHttp(conn);
      // Each request sent over the HTTP connection will be yielded as an async
      // iterator from the HTTP connection.
      for await (const { request, respondWith } of httpConn) {
        if (config.basic_auth_users) {
          const authFailed = await this.basicAuth(
            request,
            config.basic_auth_users,
          );
          if (authFailed) {
            setTimeout(() => respondWith(authFailed), 500);
            continue;
          }
        }

        this.emit("request", { request, respondWith });
      }
    } catch (err) {
      // Ignore http errors (ie client aborted or wrong tls connections)
      if (!(err instanceof Deno.errors.Http)) {
        logger.error(err);
      }
    }
  }

  protected async basicAuth(
    request: Request,
    userPasswordTable: Record<string, string>,
  ): Promise<Response | null> {
    // `htpasswd -nBC 10 "" | tr -d ':\n`
    const authHeader = request.headers.get("authorization");
    if (authHeader) {
      const match = authHeader.match(/^Basic\s+(.*)$/);
      if (match) {
        const [user, passwd] = atob(match[1]).split(":");
        if (await compare(passwd, userPasswordTable[user])) {
          return null;
        }
      }
    }

    return new Response("401 Unauthorized", {
      status: 401,
      statusText: "Unauthorized",
      headers: {
        "www-authenticate": `Basic realm=protected"`,
      },
    });
  }
}
