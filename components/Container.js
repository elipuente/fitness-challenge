import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Loading from "./Loading";
import Header from "./Header";
import Footer from "./Footer";
import { useUser } from "../utils/user";
import { setAccessToken } from "../utils/token";

const Container = (props) => {
  const { children, ...customMeta } = props;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { signedIn } = useUser();

  useEffect(() => {
    if (signedIn) {
      fetch("/api/auth/refresh_token", { method: "POST" }).then(async (res) => {
        const data = await res.json();

        setAccessToken(data?.accessToken);
      });
    }

    setLoading(false);
  }, [signedIn]);

  if (loading) {
    return <Loading text={"Loading Fitness Competition..."} />;
  }

  const meta = {
    title: "",
    description: "",
    type: "website",
    ...customMeta,
  };

  return (
    <div className="flex flex-col bg-orange-50 h-screen">
      <Head>
        <title>
          {meta.title ? meta.title + " |" : ""} Puente Wedding Fitness Challenge
        </title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <link href="/favicons/favicon.ico" rel="shortcut icon" />
        <link
          href="/favicons/apple-touch-icon.png"
          rel="apple-touch-icon"
          sizes="200x200"
        />
        <meta
          property="og:url"
          content={`https://fitness.puentewedding.com${router.asPath}`}
        />
        <link
          rel="canonical"
          href={`https://fitness.puentewedding.com${router.asPath}`}
        />
        <meta property="og:type" content={meta.type} />
        <meta
          property="og:site_name"
          content="Puente Wedding Fitness Challenge"
        />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
      </Head>

      <Header />
      <main className="flex flex-col flex-grow justify-center px-5 sm:px-10 mb-auto">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Container;
