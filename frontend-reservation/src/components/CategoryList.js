import React, { useState, useEffect } from 'react';
import { getCategories } from '../services/api';
import './CategoryList.css'; // Assurez-vous d'ajouter le fichier CSS

const CategoryList = ({ onSelectCategory }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await getCategories();
            setCategories(data);
        };

        fetchCategories();
    }, []);

    return (
        <div className="category-list-container">
            {/* Section Intro */}
            <div className="intro-section">
                <h2>Bienvenue sur M3a M3allam - L'App N°1 pour les Services à Domicile</h2>
                <p>
                    Notre application vous permet d'accéder à des services de qualité avec 97% de clients satisfaits !
                    <br />
                    Dites-nous comment nous pouvons vous aider <span className="emoji">👀</span>
                </p>
            </div>

            {/* Liste des catégories */}
            <h2 className="categories-heading">Explorez Nos Catégories</h2>
            <div className="category-list">
                {categories.map((category, index) => (
                    <div
                        key={category}
                        className="category-card"
                        onClick={() => onSelectCategory(category)}
                    >
                        <div className="category-image">
                            <img src={`icons/${category}.svg`} alt={`${category} icon`} />
                        </div>
                        <div className="category-content">
                            <h3>{category}</h3>
                            <p>Découvrez les services disponibles dans cette catégorie.</p>
                        </div>
                        <button className="category-button">Voir plus</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryList;
