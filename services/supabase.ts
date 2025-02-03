import { createClient } from "@supabase/supabase-js";
import {type Database } from '@/types/supabase'
// Create a single supabase client for interacting with your database
const config = useRuntimeConfig();
const url = config.public.SUPABASE_URL as string;
const anonKey= config.public.SUPABASE_ANON_KEY as string;
const supabase = createClient<Database>(
  url,
  anonKey
);

export default supabase
