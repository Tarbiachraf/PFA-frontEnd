import React, { useState } from 'react';
import { validateEmail } from './ValidateEmail';
import axios from 'axios';
import './RegisterForm.css'
import AppUserService from '../backEndService/AppUserService'
import { useNavigate } from 'react-router-dom';
const PasswordErrorMessage = () => { 
    return ( 
      <p className="FieldError">Password should have at least 8 characters</p> 
    ); 
   }; 
function RegisterForm() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState(""); 
    const [lastName, setLastName] = useState(""); 
    const [email, setEmail] = useState(""); 
    const [phoneNumber, setPhoneNumber] = useState("")
    const [password, setPassword] = useState({ 
      value: "", 
      isTouched: false, 
    }); 
    const [address, setAddress] = useState("");
    const [birthday, setBirthday] = useState("");
    const [genre, setGenre] = useState(""); // Assurez-vous que les valeurs correspondent aux énumérations définies dans votre backend si nécessaire

    
    const getIsFormValid = () => { 
      return ( 
        firstName && lastName &&
        validateEmail(email) && 
        password.value.length >= 8 
    ); 
    }; 
    
    const clearForm = () => { 
      setFirstName(""); 
      setLastName(""); 
      setEmail(""); 
      setPassword({ 
        value: "", 
        isTouched: false, 
      }); 
      setAddress("");
      setBirthday("");
      setGenre("");

    }; 
    
    const handleSubmit = (e) => { 
      e.preventDefault(); 
      const registerData = {
        firstname: firstName,
        lastname: lastName,
        phoneNumber: phoneNumber,
        birthday: birthday,
        address: address, // Vous devez collecter cela quelque part dans votre formulaire
        email: email,
        password: password.value,
        genre: genre // Assurez-vous que les valeurs correspondent à votre énumération côté backend
      };
      AppUserService.register(registerData).then(response =>{
        const token = response.data.token;
        // Stockez le token dans localStorage ou les cookies
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        navigate('/');
        clearForm();
        alert("Account created!"); 
    } ).catch(error => {
        alert("An error occurred!");
        console.error("There was an error!", error);
      });
      
      
    }; 
    
    return ( 
        <div className="toute">
            <div className="AppRegister"> 
            <form onSubmit={handleSubmit}> 
                <h2>Sign Up</h2> 
                <div className="FieldRow">
                    <div className="Field"> 
                    <label> 
                        First name <sup>*</sup> 
                    </label> 
                    <input 
                        value={firstName} 
                        onChange={(e) => { 
                        setFirstName(e.target.value); 
                        }} 
                        placeholder="First name" 
                    /> 
                    </div> 
                <div className="Field"> 
                <label>
                    Last name  <sup>*</sup>
                </label> 
                <input 
                    value={lastName} 
                    onChange={(e) => { 
                    setLastName(e.target.value); 
                    }} 
                    placeholder="Last name" 
            
                /> 
                </div> 
                </div>
                <div className="Field"> 
                <label> 
                    Email address <sup>*</sup> 
                </label> 
                <input 
                    value={email} 
                    onChange={(e) => { 
                    setEmail(e.target.value); 
                    }} 
                    placeholder="Email address" 
                /> 
                </div> 
                <div className="Field"> 
                <label> 
                    Password <sup>*</sup> 
                </label> 
                <input 
                    value={password.value} 
                    type="password" 
                    onChange={(e) => { 
                    setPassword({ ...password, value: e.target.value }); 
                    }} 
                    onBlur={() => { 
                    setPassword({ ...password, isTouched: true }); 
                    }} 
                    placeholder="Password" 
                /> 
                {password.isTouched && password.value.length < 8 ? ( 
                    <PasswordErrorMessage /> 
                ) : null} 
                </div> 
                <div className="Field">
                        <label>
                            Phone Number
                        </label>
                        <input
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Phone Number"
                        />
                        </div>
                        <div className="Field">
                        <label>
                            address
                        </label>
                        <input 
                            value={address}
                            placeholder="Addresse"
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        </div>
                        <div className="FieldRow">
                        <div className="Field">
                        <label>
                            Birthday
                        </label>
                        <input
                            type="date"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                        />
                        </div>
                        <div className="Field">
                        <label>
                            Genre
                        </label>
                        <select
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                        >
                            <option value="">Select Genre</option>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                        </select>
                        </div>
                        </div>

                                    <button type="submit" disabled={!getIsFormValid()}> 
                                    Create account 
                                    </button> 
                                </form> 
                            </div> 
                        </div>
    ); 
}

export default RegisterForm;
