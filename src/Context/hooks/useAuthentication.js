import { useState, useEffect } from "react";
import history from "../../utils/history";

export default function useAuthentication() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));

    if (token) {
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);

  function handleLogout() {
    setAuthenticated(false);
    //localStorage.removeItem("token");
    localStorage.setItem("token", JSON.stringify(""));
    history.push("/");
    window.location.reload();
  }

  return { authenticated, loading, handleLogout };
}
