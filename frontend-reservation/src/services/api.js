const API_BASE_URL = "http://localhost:9008";

// Créer un nouveau panier
export const createPanier = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/panier`, { method: "POST" });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur lors de la création du panier:", error);
        throw error;
    }
};

// Récupérer les catégories
export const fetchCategories = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/articles/categories`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
        throw error;
    }
};

// Récupérer les articles d'une catégorie
export const fetchArticlesByCategory = async (category) => {
    try {
        const response = await fetch(`${API_BASE_URL}/articles/${category}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Erreur lors de la récupération des articles de la catégorie ${category}:`, error);
        throw error;
    }
};

// Ajouter un article au panier
export const addToPanier = async (panierId, article, quantity) => {
    try {
        const response = await fetch(`${API_BASE_URL}/panier/${panierId}/add?quantity=${quantity}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(article),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur lors de l'ajout au panier:", error);
        throw error;
    }
};

// Récupérer le contenu du panier
export const fetchPanier = async (panierId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/panier/${panierId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur lors de la récupération du panier:", error);
        throw error;
    }
};

// Initialiser une réservation
export const createReservation = async (panierId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/reservation`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ panierId }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur lors de l'initialisation de la réservation:", error);
        throw error;
    }
};

// Mettre à jour les informations de la réservation
export const updateReservationInfo = async (reservationInfo) => {
    try {
        const response = await fetch(`${API_BASE_URL}/reservation/info`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(reservationInfo),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur lors de la mise à jour des informations de réservation:", error);
        throw error;
    }
};
