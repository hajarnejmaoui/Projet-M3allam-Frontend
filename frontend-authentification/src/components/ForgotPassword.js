import React, { useState } from "react";
import { forgotPassword, resetPasswordWithOTP } from "../api.js";

const ForgotPassword = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [messageStyle, setMessageStyle] = useState("");
    const [otpSent, setOtpSent] = useState(false);

    const handleSubmitPhoneNumber = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const response = await forgotPassword({ phoneNumber });
            if (response?.message?.includes("OTP")) {
                setMessage(response.message);
                setMessageStyle("green");
                setOtpSent(true);
            } else {
                setMessage("Unexpected server response.");
                setMessageStyle("orange");
            }
        } catch (error) {
            setMessage(error.message || "Failed to request OTP.");
            setMessageStyle("red");
        }
    };

    const handleSubmitResetPassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage("Les mots de passe ne correspondent pas.");
            setMessageStyle("red");
            return;
        }

        try {
            const response = await resetPasswordWithOTP({ phoneNumber, otp, newPassword });
            setMessage(response?.message || "Réinitialisation du mot de passe réussie !");
            setMessageStyle("green");
        } catch (error) {
            setMessage(error.message || "Failed to reset password.");
            setMessageStyle("red");
        }
    };

    return (
        <div>
            <h2>Mot de passe oublié</h2>
            <p>Entrez votre numéro de téléphone pour recevoir un code OTP.</p>
            {!otpSent ? (
                <form onSubmit={handleSubmitPhoneNumber}>
                    <input
                        type="text"
                        placeholder="Entrez votre numéro de téléphone"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                    <button type="submit">Demander OTP</button>
                </form>
            ) : (
                <form onSubmit={handleSubmitResetPassword}>
                    <input
                        type="text"
                        placeholder="Entrez OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Entrez le nouveau mot de passe"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirmer le nouveau mot de passe"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Réinitialiser le mot de passe</button>
                </form>
            )}
            {message && <p style={{ color: messageStyle }}>{message}</p>}
        </div>
    );
};

export default ForgotPassword;
