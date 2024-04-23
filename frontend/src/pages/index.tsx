import { NextPage } from "next";
import Head from "next/head";
import Login from "@/components/Login";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>ログイン</title>
        <meta
          name="description"
          content="The easiest way to track your daily work"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Login />
    </>
  );
};

export default Home;
