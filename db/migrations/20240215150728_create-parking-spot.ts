import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("parking_spots", (table) => {
    table.uuid("id").primary();
    table.string("license").notNullable();
    table.string("brand").notNullable();
    table.string("model").notNullable();
    table.string("color").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("parking_spots");
}
