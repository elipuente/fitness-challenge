import { ProvideUser } from "../utils/user";

import "../styles/globals.css";

function FitnessCompetition({ Component, pageProps }) {
  return (
    <ProvideUser>
      <Component {...pageProps} />
    </ProvideUser>
  );
}

export default FitnessCompetition;
