import { getClientSession } from "@/lib/auth/client";
import { useEffect, useState } from "react";

export const useUser = () => {
  const { user } = getClientSession();
  const [loggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const hanldeLoggedInStatus = () => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };
    hanldeLoggedInStatus();
  }, [user]);

  return { loggedIn, setIsLoggedIn, user };
};
