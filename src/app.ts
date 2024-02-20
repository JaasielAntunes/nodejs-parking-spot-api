import fastify from "fastify";
import { parkingSpotRoutes } from "./routes/parking-spot";

export const app = fastify();

app.register(parkingSpotRoutes, { prefix: "parking-spots" });
