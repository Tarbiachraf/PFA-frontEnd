import React from "react"
import './ChangePassword.css'
const ResetPass = ()=>{
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [token, setToken] = useState('');

    const getIsFormValid = () => {
        return password.length >= 8 && password === confirmPassword;
      };

      useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const tokenParam = urlParams.get('token');
        if (tokenParam) {
          setToken(tokenParam);
        }
      }, []);

      const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
          alert("Les mots de passe ne correspondent pas.");
          return;
        }
      
        axios.post('http://localhost:8080/api/appUser/reset-password', {
          token: token,
          newPassword: password,
        })
        .then((response) => {
          alert(response.data);
        })
        .catch((error) => {
          console.error("Il y a eu une erreur !", error);
          alert(error.response.data);
        });
      };
    return (
        <div className="toutet">
            <div className="ApppForget">
                <form onSubmit={handleSubmit}>
                    <h2>Changer le mot de passe</h2>
                    <div className="Fieldo">
                        <label>Nouveau mot de passe</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Entrez le nouveau mot de passe"
                        />
                    </div>
                    <div className="Field">
                        <label>Réécrire le mot de passe</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirmez le nouveau mot de passe"
                        />
                    </div>
                    <button
                        onClick={handleSubmit}
                        disabled={!getIsFormValid()}
                        >
                        Changer le mot de passe
                    </button>
                </form>
            </div>
        </div>
    );
    
}
export default ResetPass;