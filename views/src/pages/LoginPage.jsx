import { useContext,useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext, UserContextProvider } from "../UserContext"

export default function LoginPage(){
     
    const [password,setPassword] = useState('')
    const [email,setEmail] = useState('')
  
    const {userInfo,setUserInfo} = useContext(UserContext);
    const navigate = useNavigate();

    async function login(ev){
        ev.preventDefault();
        const response = await fetch('http://localhost:5000/signin',{
            method:'POST',
            body: JSON.stringify({email,password}),
            headers: {'Content-Type':'application/json'},
            credentials:'include'
        })
        if(response.ok){
            response.json().then(userInfo => {
                setUserInfo(userInfo.info),
                navigate('/')
            })
        }else{
            alert('wrong credentials!');
        }
    }
   
    return(
        <form className="login" onSubmit={login}>
            <h1>Login</h1>
            <input type="text" placeholder="email" value={email} onChange={ev => setEmail(ev.target.value)}></input>
            <input type="text" placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)}></input>
            <button>Login</button>
          
        </form>
    )
}