import { NextPage } from "next";
import Head from "next/head";
import Login from "@/components/Login";
import { useState, useEffect } from "react";
import Mypage from "@/components/Mypage";
import Header from "@/components/Header";
import Box from "@mui/material/Box";

const Home: NextPage = () => {
  const [isLogin, setIsLogin] = useState(false); // ログイン状態を管理
  const [accessToken, setAccessToken] = useState("");

  const handleAccessToken = (token: string) => {
    setAccessToken(token); // accessTokenを設定
  };

  useEffect(() => {
    if (accessToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [accessToken]);

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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Header token={accessToken} onLogout={handleAccessToken} />
        {!isLogin && <Login onLogin={handleAccessToken} />}
        {isLogin && <Mypage token={accessToken} />}
      </Box>
    </>
  );
};

export default Home;
