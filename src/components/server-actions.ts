"use server";
import { sql } from "@vercel/postgres";

export async function createTable(data: any) {
  try {
    const result =
      await sql`CREATE TABLE lga_collation ( name varchar(255), data varchar(255), date varchar(255), lga varchar(255), state varchar(255), lat varchar(255), lon varchar(255) );`;
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
  lat: string;
  lon: string;
};
export async function createReport(d: CollationResult) {
  const { name, data, level, state, lga, date, lat, lon } = d;
  try {
    const result =
      await sql`INSERT INTO collations (Name, Data, Level, State, Lga, Date, Lat, Lon) VALUES (${name}, ${data}, ${level}, ${state}, ${lga}, ${date}, ${lat}, ${lon});`;
    console.log({ result });
    return { data: result.rows, error: false };
  } catch (error) {
    console.log({ error });
    return { data: false, error: error };
  }
}

export async function fetchReports() {
  // const { name, data, level, state, lga, date } = d;
  try {
    const result = await sql`SELECT * FROM collations`;
    console.log(result.rows);
    return { data: result.rows, error: false };
  } catch (error) {
    console.log({ error });
    return { data: false, error: error };
  }
}
