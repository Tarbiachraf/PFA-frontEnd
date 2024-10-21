import React from "react";
import './LoginForm.css'
import axios from "axios";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import AppUserService from "../backEndService/AppUserService";
import { useState} from "react";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState(""); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prevCredentials => ({
            ...prevCredentials,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(""); 
        AppUserService.authenticate(credentials)
            .then(response => {
                localStorage.setItem("accessToken", response.data.accessToken);
                localStorage.setItem("refreshToken", response.data.refreshToken)

                console.log("le token est ", response.data.accessToken)
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;

                navigate("/");
            })
            .catch(error => {
                console.error("Login error", error);
                if(error.response){
                    setError(error.response.data.detailedMessage)
                }else {
                    setError("Une erreur de réseau est survenue. Veuillez réessayer.");
                }
            });
    };
    const handleSubmite = (e) => {
        e.preventDefault();
        setError("");
        AppUserService.authenticate(credentials)
            .then(response => {
                const { accessToken, refreshToken } = response.data;
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                navigate("/");
            })
            .catch(error => {
                setError(error.response?.data?.message || "Une erreur de réseau est survenue. Veuillez réessayer.");
            });
    };
    return (
        <div className="tout">  
            <div className="Mywrapper">
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    {error && <div className="error-message">{error}</div>} {/* Afficher le message d'erreur ici */}

                    <div className="Myinput-box">
                        <input 
                            type="text" 
                            placeholder="Email" 
                            name="email" 
                            value={credentials.email} 
                            onChange={handleChange} 
                            required 
                        />
                        <FaUser className="icon"/>
                    </div>
                    <div className="Myinput-box">
                        <input 
                            type="password" 
                            placeholder="Password"
                            name="password" 
                            value={credentials.password} 
                            onChange={handleChange}
                        />
                        <FaLock className="icon"/>
                    </div>
                    <div className="remember-forgot">
                        <a href="/LoginHelp">Forgot Password</a>
                    </div>
                    <button type="submit">Login</button>
                    <div className="register-link">
                        <p>Don't have an account? <a href="/register">Register</a></p>
                    </div>
                </form>
            </div>
        </div>  
    );
}
export default LoginForm;