import { useState } from "react"

export default function RegisterPage(){
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [email,setEmail] = useState('')

    async function register(ev){
        ev.preventDefault();
        const response = await fetch('http://localhost:5000/signup',{
            method:'POST',
            body:JSON.stringify({username,email,password}),
            headers:{'Content-Type':'Application/json'},
        })
        if(response.status == 200){
            alert('register success!')
        }else{
            alert('registration failed')
        }

    }
    return(
        <form className="register" onSubmit={register}>
            <h1>Register</h1>
            <input type="text" placeholder="usernanme" value={username} onChange={ev => setUsername(ev.target.value)}></input>
            <input type="text" placeholder="email" value={email} onChange={ev => setEmail(ev.target.value)}></input>
            <input type="password" placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)}></input>
            <button>Register</button>
        </form>
    )


}