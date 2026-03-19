import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://stfuqqtjlwpztnsqhsrq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0ZnVxcXRqbHdwenRuc3Foc3JxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5MDM3NjAsImV4cCI6MjA4OTQ3OTc2MH0.aeOteHpKhkzyA3VM1GkRSBa_JCDrKyWaTqKLR-wkgNg';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
