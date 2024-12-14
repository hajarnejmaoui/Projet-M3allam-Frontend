import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "./components/UserContext";

const Header = () => {
    const { user, setUser } = useUser();

    const handleLogout = () => {
        setUser(null); // Réinitialise l'utilisateur
        alert("Déconnexion réussie !");
    };

    return (
        <header className="app-header">
            <h1>M3allam</h1>
            <nav>
                <ul>
                    {/* Si l'utilisateur n'est pas connecté, on n'affiche pas les liens */}
                    {user ? (
                        <>
                            <li>
                                <span>Bonjour, {user.name}</span>
                            </li>
                            <li>
                                <button onClick={handleLogout} className="logout-button">
                                    <img src="logout-icon.png" alt="Déconnexion" style={{ width: "20px" }} />
                                </button>
                            </li>
                        </>
                    ) : null}
                    {/* Si vous ne voulez pas afficher "Mot de passe oublié", retirez ce lien */}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
