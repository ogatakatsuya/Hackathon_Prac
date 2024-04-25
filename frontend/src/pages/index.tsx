import { NextPage } from "next";
import Head from "next/head";
import Login from "@/components/Login";
import { useState } from "react";
import Mypage from "./mypage";
import Header from "@/components/Header";

const Home: NextPage = () => {
  const [accessToken, setAccessToken] = useState("");

  const handleAccessToken = (token: string) => {
    setAccessToken(token); // accessTokenを設定
  };

  return (
    <>
      <Head>
        <title>To Do App</title>
        <meta
          name="description"
          content="The easiest way to track your daily work"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header accessToken={accessToken} onLogout={handleAccessToken} />
      {!accessToken && <Login onLogin={handleAccessToken} />}
      {accessToken && (
        <Mypage accessToken={accessToken} onLogout={handleAccessToken} />
      )}
    </>
  );
};

export default Home;
