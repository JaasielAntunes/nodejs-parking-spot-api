import fastify from "fastify";
import { env } from "./env";

const app = fastify();

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log("HTTP Server running on http://localhost:3333");
  });
