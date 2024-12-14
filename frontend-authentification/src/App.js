import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import { UserProvider } from "./components/UserContext";
import "./App.css";
import logo from '../src/assets/logo3.png'; // Importation du logo

function App() {
    return (
        <UserProvider>
            <Router>
                <div className="container">
                    {/* Colonne gauche avec un design graphique */}
                    <div className="left-column">
                        <div className="logo-container">
                            <img src={logo} alt="Logo" className="app-logo" />
                        </div>
                        <div className="left-column-content">
                            <h1>Bienvenue dans l’univers de M3allam !✨</h1>
                            <p className="slogan">
                                Transformez votre maison en un espace de sérénité avec nos experts à domicile.<br />
                                Besoin d’une réparation, d’un entretien ou d’un coup de main ?<br />
                                <strong>M3allam</strong>, c’est la magie d’un service rapide, fiable et fait sur mesure rien que pour vous.<br />
                                Faites le premier pas, et laissez-nous faire le reste ! 🚀
                            </p>
                        </div>
                        <div className="left-column-footer">
                            © 2024 M3allam. Tous droits réservés.
                        </div>
                    </div>
                    {/* Colonne droite contenant les formulaires */}
                    <div className="right-column">
                        <div className="form-container">
                            <Routes>
                                <Route path="/" element={<Login />} />
                                <Route path="/signup" element={<SignUp />} />
                                <Route path="/forgot-password" element={<ForgotPassword />} />
                            </Routes>
                        </div>
                    </div>
                </div>
            </Router>
        </UserProvider>
    );
}

export default App;
