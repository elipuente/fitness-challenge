import Head from "next/head";
import { useRouter } from "next/router";

import Header from "./Header";
import Footer from "./Footer";

const Container = (props) => {
  const { children, ...customMeta } = props;
  const router = useRouter();

  const meta = {
    title: "",
    description:
      "The Puente Wedding Fitness Challenge website tracks users workouts and shows current leaderboard standings.",
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
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta content={meta.description} name="description" />
        <link href="/favicons/favicon.ico" rel="shortcut icon" />
        <link href="/manifest.json" rel="manifest" />
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
