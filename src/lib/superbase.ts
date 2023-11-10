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
  "https://wlbajfmskpybsmaprewm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsYmFqZm1za3B5YnNtYXByZXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk1Mzc5NzAsImV4cCI6MjAxNTExMzk3MH0.bjL3t5H92VjnbpB1vd8K4xwWg-NBVHKBNELpFPagWv4",
  options
);

export { supabase };
