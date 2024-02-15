// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Knex } from "knex";

declare module "knex/types/tables" {
  export interface Tables {
    parking_spots: {
      id: string;
      license: string;
      brand: string;
      model: string;
      color: string;
      created_at: string;
      updated_at: string;
    };
  }
}
