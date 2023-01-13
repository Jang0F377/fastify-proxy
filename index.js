import fastify from "fastify";
// import fetch from "node-fetch";
import cors from "@fastify/cors";
import proxy from "@fastify/http-proxy";

const server = fastify();
await server.register(cors, {
  // put your options here
  methods: ["GET"],
  origin: "http://127.0.0.1:3030",
});

server.register(proxy, {
  upstream: "https://gcmtaxpros.fullslate.com/api/v2/openings",
  prefix: "/first-openings",
  rewritePrefix: "",
  httpMethods: ["GET"],
  replyOptions: {
    queryString: () => {
      return "services=1&employees=4351&user_type=BUSINESS_USER&from=2023-01-01&to=2023-03-01";
    },
  },
});

server.register(proxy, {
  upstream: "https://gcmtaxpros.fullslate.com/api/v2/openings",
  prefix: "/more-openings",
  rewritePrefix: "",
  httpMethods: ["GET"],
  replyOptions: {
    queryString: () => {
      return "services=1&employees=4351&user_type=BUSINESS_USER&from=2023-03-02&to=2023-04-18";
    },
  },
});

server.register(proxy, {
  upstream: "https://gcmtaxpros.fullslate.com/api/v2/appointments",
  prefix: "/book-appointments",
  rewritePrefix: "",
  httpMethods: ["POST"],
  replyOptions: {
    queryString: (search, reqUrl) => {
      return "user_type=CLIENT";
    },
  },
});

server.get("/ping", async () => {
  return "pong\n";
});

server.listen({ port: 3030 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
