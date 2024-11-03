// Fonction pour récupérer les catégories
async function getCategories() {
    try {
        const response = await fetch('http://localhost:5678/api/categories');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
        return [];
    }
}

async function createFilters() {
    const categories = await getCategories();
    const filterContainer = document.querySelector('.filter-container');
    
    if (!filterContainer) {
        console.error("Le conteneur de filtres n'existe pas");
        return;
    }

    const allButton = document.createElement('button');
    allButton.textContent = 'Tous';
    allButton.classList.add('filter-btn', 'active');
    filterContainer.appendChild(allButton);

    categories.forEach(category => {
        const button = document.createElement('button');
        button.textContent = category.name;
        button.classList.add('filter-btn');
        button.dataset.categoryId = category.id;
        filterContainer.appendChild(button);
    });

    setupFilterListeners();
}

function setupFilterListeners() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const categoryId = this.dataset.categoryId;
            filterWorks(categoryId);
        });
    });
}

function filterWorks(categoryId) {
    const works = document.querySelectorAll('.gallery figure');
    
    works.forEach(work => {
        if (!categoryId || work.dataset.categoryId === categoryId) {
            work.style.display = 'block';
        } else {
            work.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', createFilters);