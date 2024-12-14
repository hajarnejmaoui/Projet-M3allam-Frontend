import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, validateLoginOTP, logout } from "../api";


const Login = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [isOtpRequested, setIsOtpRequested] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        try {
            const response = await login({ userName, password });
            console.log("Response from login API:", response);
            setMessage(response.message || "OTP envoyé. Veuillez le vérifier.");
            setIsOtpRequested(true);
        } catch (error) {
            console.error("Error from login API:", error);
            setMessage(`Erreur lors de la connexion: ${error.message || "Inconnue"}`);
        } finally {
            setLoading(false);
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        try {
            const response = await validateLoginOTP({ userName, otp });
            console.log("Response from validateLoginOTP API:", response);
            setMessage(response.message || "Connexion réussie !");
            setIsLoggedIn(true);

            // Redirection vers localhost:3001 après connexion réussie
            window.location.href = "http://localhost:3001";
        } catch (error) {
            console.error("Error from validateLoginOTP API:", error);
            setMessage(`Erreur lors de la validation OTP: ${error.message || "Inconnue"}`);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        setLoading(true);
        try {
            const response = await logout(userName);
            console.log("Response from logout API:", response);
            setMessage(response.message || "Déconnexion réussie.");
            setIsLoggedIn(false);
            setIsOtpRequested(false);
            setUserName("");
            setPassword("");
            setOtp("");
        } catch (error) {
            console.error("Error from logout API:", error);
            setMessage(`Erreur lors de la déconnexion: ${error.message || "Inconnue"}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="form-wrapper">
                <div className="form sign-in">
                    {!isOtpRequested && !isLoggedIn ? (
                        <>
                            <h3 style={{ fontFamily:'Montserrat - 400', fontSize: '30px', textAlign: 'left', marginBottom:'10px'}}>
                                Welcome Back !
                            </h3>
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="Nom d'utilisateur"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    required
                                    aria-label="Nom d'utilisateur"
                                />
                            </div>
                            <div className="input-group">
                                <input
                                    type="password"
                                    placeholder="Mot de passe"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    aria-label="Mot de passe"
                                />
                            </div>
                            <button type="submit" onClick={handleSubmit} disabled={loading}>
                                {loading ? "Chargement..." : "Se connecter"}
                            </button>
                            <p className="forgot-password-link">
                                <a onClick={() => navigate("/forgot-password")} className="link">
                                    Mot de passe oublié ?
                                </a>
                            </p>
                            <p className="register-link">
                                <a onClick={() => navigate("/signup")} className="link">
                                    Vous n'avez pas de compte ? Inscrivez-vous !
                                </a>
                            </p>
                        </>
                    ) : isLoggedIn ? (
                        <>
                            <i className="fas fa-sign-out-alt logout-icon" title="Déconnexion" onClick={handleLogout}></i>
                            <div className="profile-section">
                                <p>Bienvenue, {userName}!</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <h3>Entrez le code OTP envoyé pour finaliser la connexion</h3>
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="Entrez le code OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                    aria-label="Code OTP"
                                />
                            </div>
                            <button type="submit" onClick={handleOtpSubmit} disabled={loading}>
                                {loading ? "Vérification..." : "Valider OTP"}
                            </button>
                        </>
                    )}
                </div>
            </div>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;
