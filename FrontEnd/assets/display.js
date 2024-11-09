// Fonction asynchrone pour récupérer les travaux depuis l'API
async function getWorks() {
    console.log('Récupération des works...');
    try {
        // Envoi d'une requête GET à l'API
        const response = await fetch('http://localhost:5678/api/works');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Conversion de la réponse en JSON
        const works = await response.json();
        console.log(`${works.length} works récupérés avec succès`);
        return works;
    } catch (error) {
        console.error('Erreur lors de la récupération des works:', error);
        return [];
    }
}

// Fonction asynchrone pour afficher les travaux dans la galerie
async function displayWorks() {
    console.log('Affichage des works...');
    const works = await getWorks();
    const galleryElement = document.querySelector('.gallery');
    
    if (!galleryElement) {
        console.error("L'élément gallery n'existe pas");
        return;
    }

    // Vide la galerie avant d'ajouter les nouveaux éléments
    galleryElement.innerHTML = '';

    // Création et ajout des éléments HTML pour chaque travail
    works.forEach(work => {
        const figureElement = document.createElement('figure');
        const imgElement = document.createElement('img');
        const figcaptionElement = document.createElement('figcaption');

        imgElement.src = work.imageUrl;
        imgElement.alt = work.title;
        figcaptionElement.textContent = work.title;
        
        figureElement.dataset.categoryId = work.categoryId.toString();

        figureElement.appendChild(imgElement);
        figureElement.appendChild(figcaptionElement);
        galleryElement.appendChild(figureElement);
    });
    console.log(`${works.length} works affichés dans la galerie`);
}

// Fonction asynchrone pour récupérer les catégories depuis l'API
async function getCategories() {
    console.log('Récupération des catégories...');
    try {
        const response = await fetch('http://localhost:5678/api/categories');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const categories = await response.json();
        console.log(`${categories.length} catégories récupérées avec succès`);
        return categories;
    } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
        return [];
    }
}

// Fonction asynchrone pour créer les boutons de filtre
async function createFilters() {
    console.log('Création des filtres...');
    const categories = await getCategories();
    const filterContainer = document.querySelector('.filter-container');
    
    if (!filterContainer) {
        console.error("Le conteneur de filtres n'existe pas");
        return;
    }

    // Création du bouton "Tous"
    const allButton = document.createElement('button');
    allButton.textContent = 'Tous';
    allButton.classList.add('filter-btn', 'active');
    filterContainer.appendChild(allButton);

    // Création des boutons pour chaque catégorie
    categories.forEach(category => {
        const button = document.createElement('button');
        button.textContent = category.name;
        button.classList.add('filter-btn');
        button.dataset.categoryId = category.id;
        filterContainer.appendChild(button);
    });

    console.log(`${categories.length + 1} boutons de filtre créés`);
    setupFilterListeners();
}

// Fonction pour configurer les écouteurs d'événements sur les boutons de filtre
function setupFilterListeners() {
    console.log('Configuration des écouteurs de filtres...');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Retire la classe 'active' de tous les boutons et l'ajoute au bouton cliqué
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const categoryId = this.dataset.categoryId;
            filterWorks(categoryId);
        });
    });
    console.log('Écouteurs de filtres configurés avec succès');
}

// Fonction pour filtrer les travaux affichés selon la catégorie sélectionnée
function filterWorks(categoryId) {
    console.log(`Filtrage des works pour la catégorie ${categoryId || 'Tous'}...`);
    const works = document.querySelectorAll('.gallery figure');
    
    works.forEach(work => {
        if (!categoryId || work.dataset.categoryId === categoryId) {
            work.style.display = 'block';
        } else {
            work.style.display = 'none';
        }
    });
    console.log('Filtrage terminé');
}

// Écouteur d'événement pour initialiser l'application une fois le DOM chargé
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM chargé, initialisation de l\'application...');
    displayWorks();
    createFilters();
    console.log('Initialisation de l\'application terminée');
});