import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const getSessionId = () => {
  let id = sessionStorage.getItem("_sid");
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem("_sid", id);
  }
  return id;
};

const PageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Don't track admin page
    if (location.pathname.startsWith("/admin")) return;

    supabase.from("page_views").insert({
      page: location.pathname,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent,
      session_id: getSessionId(),
    } as any);
  }, [location.pathname]);

  return null;
};

export default PageTracker;
