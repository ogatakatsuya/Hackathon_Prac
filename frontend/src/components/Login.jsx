import { useState } from "react";

const Login = ({ setAccessToken }) => {
    const [userName, setUserName] = useState("");
    const [pass, setPass] = useState("");
    const [message, setMessage] = useState("");

    const SignIn = async (e) => {
        e.preventDefault()
        const res = await fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: userName, password: pass }),
        });
        
        const data = await res.json();
        const access_token = data.access_token;

        // 画面上にメッセージを表示
        if (res.ok) {
            setMessage("success");
            setAccessToken(access_token);  // access_tokenを親コンポーネントに渡す
        } else {
            setMessage("miss");
        }
        setPass("");
        setUserName("");
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
                onChange={(e) => setUserName(e.target.value)} 
            />
            <p>{userName}</p>
            <label>パスワード:</label>
            <input 
                type="password" 
                name="password" 
                value={pass}
                onChange={(e) => setPass(e.target.value)} 
            />
            <p>{pass}</p>
            <button type="submit">ログイン</button>
        </form>
        <p>{message}</p>
        </>
    )
}

export default Login;
