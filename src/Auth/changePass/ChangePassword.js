import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './ChangePassword.css';

const AlertMessage = ({ alert }) => {
    if (!alert.message) return null;
    return (
        <div className={`alert ${alert.type === 'success' ? 'alert-success' : 'alert-danger'}`}>
            {alert.message}
        </div>
    );
};

const ChangePassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [alert, setAlert] = useState({ message: '', type: '' });
    const location = useLocation();

    const getQueryParams = () => new URLSearchParams(location.search);
    const token = getQueryParams().get('token');

    const getIsFormValid = () => password && confirmPassword && password === confirmPassword;

    const handleResetPassword = async () => {
        if (!getIsFormValid()) {
            setAlert({ type: 'error', message: 'Le mot de passe et la confirmation doivent être identiques.' });
            return;
        }

        const resetPasswordData = {
            token: token,
            newPassword: password,
        };

        try {
            const response = await axios.post('http://localhost:8088/api/appUser/reset-password', resetPasswordData);
            console.log(response.data);
            setAlert({ type: 'success', message: 'Mot de passe mis à jour avec succès.' });
        } catch (error) {
            console.error('Échec de la réinitialisation du mot de passe:', error.response?.data || error.message);
            setAlert({ type: 'error', message: 'Échec de la réinitialisation du mot de passe.' });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleResetPassword();
    };

    return (
        <div className="toutet">
            <div className="ApppForget">
                <form onSubmit={handleSubmit}>
                    <h2>Changer le mot de passe</h2>
                    <AlertMessage alert={alert} />
                    <div className="Fieldo">
                        <input
                            className='inputo'
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Entrez le nouveau mot de passe"
                            required
                        />
                    </div>
                    <div className="Fieldo">
                        <input
                            className='inputo'
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirmez le nouveau mot de passe"
                            required
                        />
                    </div>
                    <button className="buttono" type="submit" disabled={!getIsFormValid()}>
                        Changer le mot de passe
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
