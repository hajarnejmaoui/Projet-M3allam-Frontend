import React, { useState } from "react";
import { signUp, validateSignUpOTP } from "../api";

const SignUp = () => {
    const [userName, setUserName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await signUp({ userName, phoneNumber, password });
            setMessage(response.message || response);
            setIsOtpSent(true);
        } catch (error) {
            setMessage(error.message);
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await validateSignUpOTP({ userName, phoneNumber, password, otp });
            setMessage(response.message || "Inscription réussie !");
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div className="signup-container">
            <h2>Inscription</h2>
            <p>Créez un compte pour accéder à nos services en toute sécurité. Rejoignez une communauté grandissante et profitez d'avantages exclusifs !</p>
            <form onSubmit={handleSignUpSubmit}>
                <input
                    type="text"
                    placeholder="Nom d'utilisateur"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Numéro de téléphone"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">S'inscrire</button>
            </form>

            {message && <p>{message}</p>}

            {isOtpSent && (
                <>
                    <h3>Vérification de votre inscription</h3>
                    <form onSubmit={handleOtpSubmit}>
                        <input
                            type="text"
                            placeholder="Code OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />
                        <button type="submit">Valider OTP</button>
                    </form>
                </>
            )}
        </div>
    );
};

export default SignUp;
