import { useState } from "react";

const Login = () => {
    const [userName, setUserName] = useState("");
    const [pass, setPass] = useState("");
    const [message, setMessage] = useState("");

    const SignIn = async (e) => {
        e.preventDefault()
        const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: userName, password: pass }),
        });
        const access_token = await res.json()["access_token"]; // JSONデータを取得

        // 画面上にメッセージを表示
        if(res.ok){
            setMessage("success")
        }else{
            setMessage("miss")
        }
        setPass("")
        setUserName("")
    };
    
    return (
        <>
        <h1>ログイン</h1>
        <form onSubmit={SignIn}>
            <label>ユーザーID:</label>
            <input 
            type="text" 
            name="id" 
            value={userName}
            onChange={(e) => setUserName(e.target.value)} />
            <p>{userName}</p>
            <br />
            <label>パスワード:</label>
            <input 
            type="password" 
            name="password" 
            value={pass}
            onChange={(e) => {setPass(e.target.value)}} />
            <p>{pass}</p>
            <br />
            <button type="submit">ログイン</button>
        </form>
        <p>{message}</p>
        </>
    )
}

export default Login;