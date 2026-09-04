
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://mzcnfpqvytwslgonqjhr.supabase.co';

const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_kc6Fwpqk0vWIIMHYXw4sVQ_oAvkLhSn';

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
); 

