import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import {
    createPanier,
    fetchCategories,
    fetchArticlesByCategory,
    addToPanier,
    fetchPanier,
    createReservation,
    updateReservationInfo,
} from "./services/api";
import logo from '../src/assets/logo3.png'; // Importation du logo


const App = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [articles, setArticles] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [panierId, setPanierId] = useState(null);
    const [panier, setPanier] = useState({ items: [], total: 0 });
    const [reservation, setReservation] = useState(null);
    const [showReservationForm, setShowReservationForm] = useState(false);
    const [reservationInfo, setReservationInfo] = useState({
        address: "",
        date: "",
        time: "",
    });
    const [step, setStep] = useState(1);
    const [showPanier, setShowPanier] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const init = async () => {
            try {
                const panierData = await createPanier();
                setPanierId(panierData.id);

                const categoriesData = await fetchCategories();
                setCategories(categoriesData || []);

                const initialPanier = await fetchPanier(panierData.id);
                setPanier(initialPanier || { items: [], total: 0 });
            } catch (error) {
                console.error("Erreur lors de l'initialisation :", error);
            }
        };
        init();
    }, []);

    const handleCategorySelect = async (category) => {
        setSelectedCategory(category);
        setStep(2);
        try {
            const articlesData = await fetchArticlesByCategory(category);
            setArticles(articlesData || []);
            setQuantities({});
        } catch (error) {
            console.error("Erreur lors de la récupération des articles :", error);
        }
    };

    const handleQuantityChange = (articleId, quantity) => {
        setQuantities((prev) => ({ ...prev, [articleId]: quantity }));
    };

    const handleAddToPanier = async (article) => {
        const quantity = parseInt(quantities[article.id], 10) || 1;
        try {
            const payload = {
                id: article.id,
                name: article.name,
                category: article.category,
                price: article.price,
            };
            // Ajoute l'article avec la quantité au panier
            await addToPanier(panierId, payload, quantity);

            // Met à jour le panier après ajout de l'article
            const updatedPanier = await fetchPanier(panierId);
            setPanier(updatedPanier || { items: [], total: 0 });
        } catch (error) {
            console.error("Erreur lors de l'ajout au panier :", error);
        }
    };

    const handleFinalizeOrder = async () => {
        try {
            const reservationData = await createReservation(panierId);
            setReservation(reservationData);
            setStep(3);
        } catch (error) {
            console.error("Erreur lors de l'initialisation de la réservation :", error);
        }
    };

    const handleReservationChange = (e) => {
        const { name, value } = e.target;
        setReservationInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleReservationSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateReservationInfo({
                reservationId: reservation.id,
                panierId: panierId,
                ...reservationInfo,
            });
            setShowReservationForm(false);
            navigate("/confirmation", {
                state: { panier, reservationInfo },
            });

            // Redirige immédiatement vers http://localhost:3002 après la confirmation
            setTimeout(() => {
                window.location.href = "http://localhost:3002";
            }, 1000); // Délai d'une seconde pour simuler une transition
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la réservation :", error);
        }
    };

    return (
        <div className="app-container">
            <img src={logo} alt="Logo" className="app-logo"/>
            <div className="container">

                {/* Section des catégories */}
                {step === 1 && (

                    <div className="categories">
                        <div className="intro-section">
                            <h2>M3a M3allam Blama Thez Lham 💡  !</h2>
                            <p>
                                C'est votre application marocaine numéro 1 des services à domicile
                                avec 97% de clients satisfaits ! Dites-nous comment nous pouvons vous aider
                                <span className="emoji">👀</span>
                            </p>
                        </div>

                        {categories.length > 0 ? (
                            categories.map((category) => (
                                <div
                                    key={category}
                                    className="category-card"
                                    onClick={() => handleCategorySelect(category)}
                                >
                                    <h3>{category}</h3>
                                </div>
                            ))
                        ) : (
                            <p>Chargement des catégories...</p>
                        )}
                    </div>
                )}

                {/* Section des articles */}


                {step === 2 && selectedCategory && (
                    <div className="articles-container">
                        {/* Section pour les titres "Articles" et "Catégorie" */}
                        <div className="section-header">
                            <h2>Articles</h2>
                            <h3>Catégorie : {selectedCategory}</h3>
                        </div>

                        {/* Cartes des articles */}
                        <div className="articles">
                            {articles.length > 0 ? (
                                articles.map((article) => (
                                    <div key={article.id} className="article-card">
                                        <p>{article.name}</p>
                                        <p>Prix : {article.price} €</p>
                                        <div>
                                            <input
                                                type="number"
                                                min="1"
                                                placeholder="Quantité"
                                                value={quantities[article.id] || ""}
                                                onChange={(e) =>
                                                    handleQuantityChange(article.id, e.target.value)
                                                }
                                            />
                                            <button onClick={() => handleAddToPanier(article)}>
                                                Ajouter
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>Aucun article trouvé pour cette catégorie.</p>
                            )}
                        </div>
                    </div>
                )}


                {/* Section du panier */}
                {/* Bouton pour afficher/masquer le panier */}


                {showPanier && (
                    <div className="paniers-container">
                        <h3>Panier</h3>

                        {panier.items.length > 0 ? (
                            <div>
                                <ul>
                                    {panier.items.map((product) => (
                                        <li key={product.id}>
                                            <p>Article : {product.article.name}</p>
                                            <p>Quantité : {product.quantity}</p>
                                            <p>Prix total pour cet article : {product.totalPrice} €</p>
                                        </li>
                                    ))}
                                </ul>
                                <div>
                                    <strong>Total : {panier.total} €</strong>
                                </div>
                                <button onClick={handleFinalizeOrder}>Finaliser la commande</button>
                                <button className="toggle-panier" onClick={() => setShowPanier(!showPanier)}>
                                    🛒 {showPanier ? "Masquer le panier" : "Afficher le panier"}
                                </button>
                            </div>
                        ) : (
                            <p>Le panier est vide.</p>
                        )}
                    </div>
                )}


                {/* Section de finalisation de commande */}
                {step === 3 && (
                    <div>
                        <h2 style={{ fontFamily: 'Sans-serif - 700', fontSize: '40px', textAlign: 'center', color: '#0C5844', marginTop: '50px' }}>Finaliser la commande</h2>
                        <form onSubmit={handleReservationSubmit}>
                            <div>
                                <label htmlFor="address">Adresse</label>
                                <input
                                    type="text"
                                    name="address"
                                    id="address"
                                    value={reservationInfo.address}
                                    onChange={handleReservationChange}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="date">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    id="date"
                                    value={reservationInfo.date}
                                    onChange={handleReservationChange}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="time">Heure</label>
                                <input
                                    type="time"
                                    name="time"
                                    id="time"
                                    value={reservationInfo.time}
                                    onChange={handleReservationChange}
                                    required
                                />
                            </div>

                            <button type="submit">Soumettre la réservation</button>
                        </form>
                    </div>
                )}

                {/* Icone du panier fixée en haut à droite */}
                <div
                    className="icon-panier"
                    onClick={() => setShowPanier(!showPanier)}
                >
                    🛒
                </div>
            </div>
            );
        </div>
    );
            };

            export default App;
