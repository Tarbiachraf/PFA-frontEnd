import React, { useState } from 'react';
import axios from 'axios';
import './ForgetPassword.css';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');

    const [alert, setAlert] = useState({ message: '', type: '' });  

    const getIsFormValid = () => email; // S'assure que l'email n'est pas vide


    const AlertMessage = ({ alert }) => {
        if (!alert.message) return null;  // Do not render the component if there is no message
        return (
            <div className={`alert ${alert.type === 'success' ? 'alert-success' : 'alert-danger'}`}>
                {alert.message}
            </div>
        );
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!getIsFormValid()) {
            console.log('Email is required');
            setAlert({ type: 'error', message: 'Email is required' });
            return;
        }
    
        try {
            const params = new URLSearchParams({ email: email }).toString();
            const response = await axios.post(`http://localhost:8088/api/appUser/forgot-password?${params}`);
            console.log('Response:', response.data);
            setAlert({ type: 'success', message: 'Un lien de réinitialisation de mot de passe a été envoyé à votre adresse e-mail.' });
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            setAlert({ type: 'error', message: 'Failed to send reset email' });
        }
    };
    

    return (
        <div className="Forgetoute">
            <div className="AppForget">
                <form onSubmit={handleSubmit}>
                    <h2>mot de passe oublié</h2>
                    <div className="NoField">
                    <AlertMessage alert={alert} />
                        <label className='labelIkhan'>
                            Nous vous enverrons les instructions de réinitialisation de votre mot de passe par e-mail.
                        </label>
                        <input
                            className='hoola'
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="nom@example.com"
                            required
                        />
                    </div>
                    <button className="Monbutton" type="submit" disabled={!getIsFormValid()}>
                        Envoyez moi un email
                    </button>
                    <div className="loggin">
                        <p><a href="/login">Se connecter</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ForgetPassword;
