import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://wzptpxksnwoordxbwtwc.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6cHRweGtzbndvb3JkeGJ3dHdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyMTMwMDMsImV4cCI6MTk4Mzc4OTAwM30._BIAr59zrKrtoyv5MViE6RL3OjXRLlygByE-3L3NClk";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from("video")
                    .select("*");
                    
            }
    }
}