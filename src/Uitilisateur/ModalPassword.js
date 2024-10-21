import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axiosInstance from '../backEndService/axisConfig';

function ModalPassword({ show, onHide }) {
    const ancienPassword=useRef();
    const nouveauPassword=useRef();
    const confirmPassword=useRef();
    const [passwordChange ,setPasswordChange]=useState({ancienPassword:"",nouveauPassword:"",confirmPassword:""});

    const handleChange = (event) =>{
        const {name,value} =event.target;
        setPasswordChange(prevState =>(
            {
                ...prevState,
                [name]:value
            }
        ))
        console.log(passwordChange);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Vérifier si les mots de passe correspondent
        if (passwordChange.nouveauPassword !== passwordChange.confirmPassword) {
            alert("Le nouveau mot de passe et la confirmation ne correspondent pas.");
            return;
        }

        try {
            // Appel API pour changer le mot de passe
            const response = await axiosInstance.patch('http://localhost:8088/api/appUser/changePassword', {
                currentPassword: passwordChange.ancienPassword,
                newPassword: passwordChange.nouveauPassword,
                confirmationPassword: passwordChange.confirmPassword
            });

            if (response.status === 200) {
                alert('Mot de passe modifié avec succès!');
                onHide(); // Fermer le modal après la mise à jour
            }
        } catch (error) {
            alert('Erreur lors de la modification du mot de passe: ' + error.message);
        }
    };
    return (
        <>
        <Modal show={show} onHide={onHide} centered style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <Modal.Header closeButton style={{ backgroundColor: 'rgba(0,0,0,0.8)', color: 'white' }}>
                <Modal.Title>Changer le mot de passe</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: 'rgba(0,0,0,0.8)', color: 'white' }}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="ancienPassword">
                        <Form.Label>Ancien mot de passe</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Entrez l'ancien mot de passe"
                            name="ancienPassword"
                            value={passwordChange.ancienPassword}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="nouveauPassword">
                        <Form.Label>Nouveau mot de passe</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Entrez le nouveau mot de passe"
                            name="nouveauPassword"
                            value={passwordChange.nouveauPassword}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="confirmPassword">
                        <Form.Label>Confirmation du mot de passe</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirmer le nouveau mot de passe"
                            name="confirmPassword"
                            value={passwordChange.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Enregistrer les modifications
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: 'rgba(0,0,0,0.8)', color: 'white' }}>
                <Button variant="secondary" onClick={onHide}>
                    Annuler
                </Button>
            </Modal.Footer>
        </Modal>
    </>
    );
}

export default ModalPassword;