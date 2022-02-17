import { ProvideUser } from "../utils/user";
import { useEffect, useState } from "react";

import "../styles/globals.css";
import Loading from "../components/Loading";
import {
  decodeAccessToken,
  getAccessToken,
  setAccessToken,
} from "../utils/token";

const getWithinOneMinuteExpiration = (exp) => exp * 1000 - 60000;

function FitnessCompetition({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  const accessToken = getAccessToken();

  useEffect(() => {
    fetch("/api/auth/refresh_token", { method: "POST" }).then(async (res) => {
      const data = await res.json();

      setAccessToken(data?.accessToken);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (accessToken) {
      const { exp } = decodeAccessToken(accessToken);

      if (new Date() >= getWithinOneMinuteExpiration(exp)) {
        fetch("/api/auth/refresh_token", { method: "POST" }).then(
          async (res) => {
            const data = await res.json();

            setAccessToken(data?.accessToken);
          }
        );
      }
      setLoading(false);
    }
  }, [accessToken]);

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
