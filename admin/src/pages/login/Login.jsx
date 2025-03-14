import { useContext, useState } from "react";
import "./login.scss";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Login = () => {
    const [ credentials, setCredentials] = useState({
        username: undefined,
        password: undefined
    })

    const { loading, error, dispatch } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }

    const handleClick = async e => {
        e.preventDefault()
        dispatch({type:"LOGIN_START"})

        try {
            const res = await axios.post("/auth/login", credentials)
            
            if (res.data.isAdmin) {
              dispatch({type: "LOGIN_SUCCESS", payload: res.data.details })
              
            }
            else{
              dispatch({type: "LOGIN_FAILURE", payload: {message: 'You are not allowed!'}})
            }
            
        } catch (error) {
          dispatch({type: "LOGIN_FAILURE", payload:error.response.data })
        }
    }

    return <div className="login">
        <div className="lContainer">
            <input type="text" placeholder="username" className="lInput" onChange={handleChange}/>
            <input type="password" placeholder="password" className="lInput" onChange={handleChange}/>
            <button disabled={loading} className="lButton" onClick={handleClick}>Login</button>
            { error && <span>{error.message}</span> }
        </div>
    </div>
    
}


export default Login
