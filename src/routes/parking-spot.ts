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

  app.get("/:id", async (req, res) => {
    const getParkingSpotId = z.object({
      id: z.string().uuid(),
    });

    const { id } = getParkingSpotId.parse(req.params);

    const parkingSpot = await knex("parking_spots").where({ id }).first();
    return res.status(200).send({ parkingSpot });
  });

  app.put<{ Params: { id: string } }>("/:id", async (req, res) => {
    const updateParkingSpotParamsSchema = z.object({
      license: z.string(),
      brand: z.string(),
      model: z.string(),
      color: z.string(),
    });

    const { id } = req.params;

    const { license, brand, model, color } =
      updateParkingSpotParamsSchema.parse(req.body);

    await knex("parking_spots").where({ id }).update({
      license,
      brand,
      model,
      color,
    });

    return res
      .status(200)
      .send("Vaga de estacionamento atualizada com sucesso!");
  });

  app.patch<{ Params: { id: string } }>("/:id", async (req, res) => {
    const updateParkingSpotParamsSchema = z.object({
      license: z.string().optional(),
      brand: z.string().optional(),
      model: z.string().optional(),
      color: z.string().optional(),
    });

    const { id } = req.params;

    const { license, brand, model, color } =
      updateParkingSpotParamsSchema.parse(req.body);

    await knex("parking_spots").where({ id }).update({
      license,
      brand,
      model,
      color,
    });

    return res
      .status(200)
      .send("Vaga de estacionamento atualizada com sucesso!");
  });

  app.delete("/:id", async (req, res) => {
    const getParkingSpotId = z.object({
      id: z.string().uuid(),
    });

    const { id } = getParkingSpotId.parse(req.params);

    await knex("parking_spots").where({ id }).delete();
    return res.status(200).send("Vaga de estacionamento deletada com sucesso!");
  });

  app.get("/summary", async (req, res) => {
    const summary = await knex("parking_spots")
      .count("id", { as: "total" })
      .first();
    return res.status(200).send({ summary });
  });
}
