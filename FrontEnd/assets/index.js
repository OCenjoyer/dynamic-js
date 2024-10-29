// Définition des constantes pour l'URL de l'API et le sélecteur de la galerie
const API_URL = "http://localhost:5678/api/works";
const GALLERY_SELECTOR = "#portfolio .gallery";

// Fonction principale pour afficher les travaux dans la galerie
function displayWorks(works) {
    // Sélectionne l'élément galerie dans le DOM
    const gallery = document.querySelector(GALLERY_SELECTOR);
    
    // Vérifie si l'élément galerie existe
    if (!gallery) {
        console.error("Élément galerie non trouvé");
        return;
    }
    
    // Vide la galerie existante avant d'ajouter les nouveaux éléments
    gallery.innerHTML = '';

    // Parcourt chaque travail dans le tableau works
    works.forEach(work => {
        // Création d'un élément figure pour chaque travail
        const figure = document.createElement('figure');
        
        // Création et configuration de l'élément image
        const img = document.createElement('img');
        img.src = work.imageUrl;
        img.alt = work.title;
        img.loading = "lazy"; // Optimisation du chargement des images
        
        // Création et configuration de la légende
        const figcaption = document.createElement('figcaption');
        figcaption.textContent = work.title;

        // Assemblage de la structure figure (image + légende)
        figure.appendChild(img);
        figure.appendChild(figcaption);
        
        // Ajout de la figure complète à la galerie
        gallery.appendChild(figure);
    });
}

// Requête fetch pour récupérer les travaux depuis l'API
fetch(API_URL)
    .then(response => {
        // Vérifie si la réponse est OK
        if (!response.ok) {
            throw new Error(`Erreur HTTP! statut: ${response.status}`);
        }
        return response.json(); // Convertit la réponse en JSON
    })
    .then(works => {
        // Affiche les travaux et log pour debugging
        displayWorks(works);
        console.log("Travaux chargés:", works);
    })
    .catch(error => {
        // Gestion des erreurs
        console.error("Erreur lors de la récupération des travaux:", error);
    });

// Requête fetch pour récupérer les catégories depuis l'API
fetch("http://localhost:5678/api/categories")
    .then(function(response) {
        // Vérifie si la réponse est OK
        if(response.ok) {
            return response.json();
        }
        throw new Error('Erreur lors de la récupération des catégories');
    })
    .then(function(categories) {
        // Log des catégories pour debugging
        console.log(categories);
    })
    .catch(function(err) {
        // Gestion des erreurs
        console.error("Erreur:", err);
    });