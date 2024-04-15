import  { useState } from "react";

const Resister = () => {
    const [newName, setNewName] = useState("");
    const [newPass, setNewPass] = useState("");

    const [message, setMessage] = useState('');

    const SignUp = async (e) => {
        e.preventDefault()
        const res = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: newName, password: newPass }),
        });
        const data = await res.json();
        setMessage(data.message)
        setNewName("")
        setNewPass("")
    };

    return (
        <>
            <h1>サインアップ</h1>
            <form onSubmit={SignUp}>
                <label>ユーザーID:</label>
                <input 
                type="text" 
                name="id" 
                value={newName}
                onChange={(e) => {setNewName(e.target.value)}} />
                <p>{newName}</p>
                <br />
                <label>パスワード:</label>
                <input 
                type="password" 
                name="password" 
                value={newPass}
                onChange={(e) => {setNewPass(e.target.value)}} />
                <p>{newPass}</p>
                <br />
                <button type="submit">登録</button>
            </form>
            <p>{message}</p>
        </>
    )
}

export default Resister;