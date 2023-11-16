import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

const options = {
  schema: "public",
  // headers: { 'x-my-custom-header': 'my-app-name' },
  // autoRefreshToken: true,
  // persistSession: true,
  // detectSessionInUrl: true,
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
};
const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_TOKEN!,
  options
);

export { supabase };
