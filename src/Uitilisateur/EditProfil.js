import React, { useState, useRef, useEffect } from 'react';
import axiosInstance from '../backEndService/axisConfig';
import ModalPassword from './ModalPassword';

const UserProfile = () => {
    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        birthday: '',
        address: '',
        phoneNumber: '',
        email: '',
        genre: ''
    });
    const [profilePicture, setProfilePicture] = useState(null);
    const [showModalPassword, setShowModalPassword] = useState(false);
    const profilePictureRef = useRef(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const result = await axiosInstance.get('http://localhost:8088/api/appUser/me');
            if (result.data) {
                const formattedData = {
                    ...result.data,
                    birthday: result.data.birthday ? new Date(result.data.birthday).toISOString().split('T')[0] : '',
                    profilePicture: result.data.profilePicture ? `data:image/png;base64,${result.data.profilePicture}` : '',
                    genre: result.data.genre // Include genre from fetched data
                    };
                setUser(formattedData);
            }
        };
        fetchUserData();
    }, []);

    

    const handleProfilePictureClick = () => {
        profilePictureRef.current.click();
    };

    const handleProfilePictureChange = event => {
        if (event.target.files[0]) {
            setProfilePicture(event.target.files[0]);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('firstname', user.firstname);
        formData.append('lastname', user.lastname);
        formData.append('birthday', user.birthday);
        formData.append('address', user.address);
        formData.append('phoneNumber', user.phoneNumber);
        formData.append('email', user.email);
        formData.append('genre', user.genre); // Include genre in form data
        if (profilePicture) {
            formData.append('profilePicture', profilePicture);
        }

        try {
            const response = await axiosInstance.put('http://localhost:8088/api/appUser/me', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Profile updated successfully!');
        } catch (error) {
            alert('Failed to update profile: ' + error.message);
        }
    };

    const handleChangePassword = () => {
        setShowModalPassword(true);
    };

    return (
        <div className="container Myprofil Myfont">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header text-white cardHeader" style={{ textAlign: "center" }}>
                            <h3>Profil</h3>
                        </div>
                        <div className="card-body cardBody" style={{ backgroundColor: "#f0f0f0", padding: "0px", border: "solid 1px #BA68C8" }}>
                            <div className="row" style={{ width: "100%" }}>
                                <div className="col-md-4 border-right left-side">
                                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                    <img
                                        className="rounded-circle mt-5"
                                        width="150px"
                                        src={user.profilePicture}
                                        onClick={handleProfilePictureClick}
                                        alt="Profile"
                                        style={{ cursor: 'pointer' }}
                                    />
                                        <input
                                            type="file"
                                            id="profilPicture"
                                            ref={profilePictureRef}
                                            onChange={handleProfilePictureChange}
                                            style={{ display: 'none' }}
                                        />
                                        <span className="font-weight-bold">{user.firstname} {user.lastname}</span>
                                        <span>{user.email}</span>
                                        <span>Crée en : {new Date(user.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <div className="col-md-8 bg-white right-side">
                                    <div className="p-3">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h4 className="text-right">Editer le profil</h4>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col-md-6">
                                                <label className="labels">Nom :</label>
                                                <input type="text" name="firstname" value={user.firstname} onChange={handleChange} className="form-control" placeholder="saisir votre nom" />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="labels">Prénom :</label>
                                                <input type="text" name="lastname" value={user.lastname} onChange={handleChange} className="form-control" placeholder="saisir votre prénom" />
                                            </div>
                                            <div className="col-md-12">
                                                <label className="labels">Date de naissancee :</label>
                                                <input type="date" name="birthday" value={user.birthday} onChange={handleChange} className="form-control" />
                                            </div>
                                            <div className="col-md-12">
                                                <label className="labels">Adresse :</label>
                                                <input type="text" name="address" value={user.address} onChange={handleChange} className="form-control" placeholder="saisir votre adresse" />
                                            </div>
                                            <div className="col-md-12">
                                                <label className="labels">Numéro téléphone :</label>
                                                <input type="text" name="phoneNumber" value={user.phoneNumber} onChange={handleChange} className="form-control" placeholder="saisir votre numéro de téléphone" />
                                            </div>
                                            <div className="col-md-12">
                                                <label className="labels">Email :</label>
                                                <input type="text" name="email" value={user.email} onChange={handleChange} className="form-control" placeholder="saisir votre email" />
                                            </div>
                                            <div className="col-md-12">
                                                <label className="labels">Genre :</label>
                                                <select name="genre" value={user.genre} onChange={handleChange} className="form-control">
                                                    <option value="">Sélectionnez le genre</option>
                                                    <option value="MALE">MALE</option>
                                                    <option value="FEMALE">FEMALE</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <button className="btn btn-primary profile-button" type="button" onClick={handleSubmit}>Enregistrer</button>
                                            <button className="btn btn-primary profile-button" type="button" onClick={handleChangePassword}>Changer le mot de passe</button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ModalPassword show={showModalPassword} onHide={() => setShowModalPassword(false)} />
            </div>
        </div>
    );
};

export default UserProfile;
