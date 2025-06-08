import { GoTrueClient} from "@supabase/supabase-js";

export const environment = {
    production: false,
    supabaseUrl: 'https://dnfkmgvtpnayboephfas.supabase.co',
    supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRuZmttZ3Z0cG5heWJvZXBoZmFzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzM2MjM1NywiZXhwIjoyMDYyOTM4MzU3fQ.vnpjM7LhCa3FW7SQ0REcm1-CrhALITdYKbzQ4SGUMjI'
};

export const authClient = new GoTrueClient({
    url: `${environment.supabaseUrl}/auth/v1`,
    headers: {
        'apikey': environment.supabaseKey,
        'Authorization': `Bearer ${environment.supabaseKey}`
    }
});

