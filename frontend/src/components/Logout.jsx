import React, { useState } from "react";

const Logout = ({setAccessToken}) => {
    const [msg, setMsg] = useState("");

    const handleLogout = () => {
        fetch('http://localhost:5000/logout', {
            method: 'GET',
            credentials: 'include', // セッション情報を送信するための設定
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })
        .then((res) => res.json())
        .then((data) => {
            setMsg(data.msg);
            setAccessToken("")
        })
        .catch((error) => {
            setMsg("エラーが発生しました");
        });
    }

    return (
        <>
            <button onClick={handleLogout}>ログアウト</button>
            <p>{msg}</p>
        </>
    )
}

export default Logout;

