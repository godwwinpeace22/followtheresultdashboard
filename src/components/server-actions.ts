"use server";
import { sql } from "@vercel/postgres";

export async function createTable(data: any) {
  try {
    const result =
      await sql`CREATE TABLE lga_collation ( name varchar(255), data varchar(255), date varchar(255), lga varchar(255), state varchar(255) );`;
    return { data: result, error: null };
  } catch (error) {
    console.log({ error });
    return { data: null, error: error };
  }
}

type CollationResult = {
  name: string;
  data: string;
  level: string;
  state: string;
  lga: string;
  date: string;
};
export async function createReport(d: CollationResult) {
  const { name, data, level, state, lga, date } = d;
  try {
    const result =
      await sql`INSERT INTO collations (Name, Data, Level, State, Lga, Date) VALUES (${name}, ${data}, ${level}, ${state}, ${lga}, ${date});`;
    console.log({ result });
    return { data: result, error: false };
  } catch (error) {
    console.log({ error });
    return { data: false, error: error };
  }
}
