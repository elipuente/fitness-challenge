import { ProvideUser } from "../utils/user";
import { useEffect, useState } from "react";

import "../styles/globals.css";
import Loading from "../components/Loading";
import { setAccessToken } from "../utils/token";

function FitnessCompetition({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/refresh_token", { method: "POST" }).then(async (res) => {
      const data = await res.json();

      setAccessToken(data?.accessToken);
      setLoading(false);
    });
  });

  if (loading) {
    return <Loading text={"Loading Fitness Competition..."} />;
  }

  return (
    <ProvideUser>
      <Component {...pageProps} />
    </ProvideUser>
  );
}

export default FitnessCompetition;
