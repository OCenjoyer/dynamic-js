// URL de l'API
const API_URL = "http://localhost:5678/api/works";
const GALLERY_SELECTOR = "#portfolio .gallery";

// Fonction pour afficher les travaux dans la galerie
function displayWorks(works) {
    const gallery = document.querySelector(GALLERY_SELECTOR);
    if (!gallery) {
        console.error("Élément galerie non trouvé");
        return;
    }
    
    // Vide la galerie avant d'ajouter les nouveaux éléments
    gallery.innerHTML = '';

    works.forEach(work => {
        // Création de l'élément figure
        const figure = document.createElement('figure');
        
        // Création de l'image
        const img = document.createElement('img');
        img.src = work.imageUrl;
        img.alt = work.title;
        img.loading = "lazy"; // Amélioration des performances
        
        // Création de la légende
        const figcaption = document.createElement('figcaption');
        figcaption.textContent = work.title;

        // Assemblage des éléments
        figure.appendChild(img);
        figure.appendChild(figcaption);
        
        // Ajout à la galerie
        gallery.appendChild(figure);
    });
}

// Récupération des travaux avec fetch
fetch(API_URL)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erreur HTTP! statut: ${response.status}`);
        }
        return response.json();
    })
    .then(works => {
        displayWorks(works);
        console.log("Travaux chargés:", works);
    })
    .catch(error => {
        console.error("Erreur lors de la récupération des travaux:", error);
    });

// Récupération des catégories depuis l'API
fetch("http://localhost:5678/api/categories")
    .then(function(response) {
        if(response.ok) {
            return response.json();
        }
        throw new Error('Erreur lors de la récupération des catégories');
    })
    .then(function(categories) {
        console.log(categories);
    })

    .catch(function(err) {
        console.error("Erreur:", err);
    });