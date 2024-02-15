import { FastifyInstance } from "fastify";
import { z } from "zod";
import { knex } from "../database";
import { randomUUID } from "node:crypto";

export async function parkingSpotRoutes(app: FastifyInstance) {
  app.post("/", async (req, res) => {
    const createParkingSpotBodySchema = z.object({
      license: z.string(),
      brand: z.string(),
      model: z.string(),
      color: z.string(),
    });

    const { license, brand, model, color } = createParkingSpotBodySchema.parse(
      req.body,
    );

    await knex("parking_spots").insert({
      id: randomUUID(),
      license,
      brand,
      model,
      color,
    });

    return res
      .status(201)
      .send("Vaga de estacionamento cadastrada com sucesso!");
  });

  app.get("/", async (req, res) => {
    const parkingSpots = await knex("parking_spots").select();
    return res.status(200).send({ parkingSpots });
  });
}
