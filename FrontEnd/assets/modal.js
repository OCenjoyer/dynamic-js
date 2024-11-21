// Création de la structure principale de la modale
const modal1 = document.createElement("div");
modal1.classList.add("modal");
modal1.style.display = "none"; // La modale est masquée par défaut

// Conteneur pour le contenu de la modale
const modalBox1 = document.createElement("div");
modalBox1.classList.add("modal-box");

// Header de la modale avec un bouton de fermeture
const modalHeader1 = document.createElement("div");
modalHeader1.classList.add("modal-header");

// Icone de fermeture (croix)
const cross1 = document.createElement("i");
cross1.classList.add("fa-solid", "fa-xmark", "fa-xl", "clickable");
modalHeader1.appendChild(cross1); // Ajout de la croix au header

// Titre de la modale
const modalTitre1 = document.createElement("h1");
modalTitre1.innerText = "Galerie photo";
modalTitre1.classList.add("modal-title");

// Ligne de séparation esthétique
const divLine = document.createElement("div");
divLine.classList.add("line");

// Conteneur pour la galerie à modifier
const divGalleryMod = document.createElement("div");
divGalleryMod.classList.add("gallery-mod");

// Bouton "Ajouter un projet"
const boutonAjouter = document.createElement("a");
boutonAjouter.innerText = "Ajouter un projet";
boutonAjouter.classList.add("modal-button", "clickable");

// Fonction pour afficher dynamiquement la galerie des projets
function afficherGallery(list) {
    divGalleryMod.innerHTML = ''; // Réinitialise le contenu pour éviter les doublons
    for (let projet of list) {
        const divImage = document.createElement("div");
        divImage.classList.add("div-image");
        divImage.setAttribute("data-id", projet.id); // Associe l'ID du projet pour faciliter les interactions

        // Ajout de l'image du projet
        const img = document.createElement("img");
        img.src = projet.imageUrl;

        // Icone poubelle pour la suppression
        const iconPoubelle = document.createElement("i");
        iconPoubelle.classList.add("fa-solid", "fa-trash-can", "clickable");
        iconPoubelle.setAttribute("data-id", projet.id); // ID pour identifier quel projet supprimer

        divImage.appendChild(img);
        divImage.appendChild(iconPoubelle);
        divGalleryMod.appendChild(divImage); // Ajout de l'image à la galerie
    }
}

// Récupération des données des projets via une API
fetch("http://localhost:5678/api/works")
    .then(res => res.json())
    .then(afficherGallery) // Affiche les projets reçus
    .catch(error => {
        console.error('Erreur lors de la récupération des travaux:', error); // Gestion des erreurs d'API
    });

// Gestion de la suppression d'un projet
divGalleryMod.addEventListener("click", (event) => {
    if (event.target.classList.contains("fa-trash-can")) {
        const id = event.target.getAttribute("data-id"); // Récupère l'ID du projet
        const token = localStorage.getItem("token"); // Récupère le token pour l'authentification

        fetch(`http://localhost:5678/api/works/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` },
        })
        .then(res => {
            if (res.status === 204) { // Si la suppression est réussie
                // Supprime l'image de la galerie modale
                const imgSupprime = document.querySelector(`div[data-id="${id}"]`);
                if (imgSupprime) {
                    imgSupprime.remove();
                }

                // Supprime également l'image de la galerie principale (si présente)
                const mainGallery = document.querySelector('.gallery');
                const mainImgToRemove = mainGallery.querySelector(`img[src="${imgSupprime.querySelector('img').src}"]`);
                if (mainImgToRemove) {
                    mainImgToRemove.closest('figure').remove();
                }
            }
        })
        .catch(error => {
            console.error('Erreur lors de la suppression:', error); // Gestion des erreurs
        });
    }
});

// Bouton pour ouvrir la modale
const boutonModifier = document.querySelector(".edit-button");
boutonModifier.addEventListener("click", () => {
    modal1.style.display = "flex"; // Affiche la modale
});

// Fermeture de la modale au clic sur le fond ou sur la croix
modal1.addEventListener("click", (event) => {
    if (event.target === modal1 || event.target === cross1) {
        modal1.style.display = "none"; // Cache la modale
    }
});

// Assemblage de tous les éléments dans la modale
modalHeader1.appendChild(cross1); // Bouton de fermeture
modalBox1.appendChild(modalHeader1); // Header
modalBox1.appendChild(modalTitre1); // Titre
modalBox1.appendChild(divGalleryMod); // Galerie des projets
modalBox1.appendChild(divLine); // Ligne de séparation
modalBox1.appendChild(boutonAjouter); // Bouton Ajouter
modal1.appendChild(modalBox1); // Conteneur principal

// Ajout de la modale au DOM
document.body.appendChild(modal1);

// Ouverture de la modale via le mode édition
const modeEditionSpan = document.getElementById("mode-edition");

modeEditionSpan.addEventListener("click", () => {
    modal1.style.display = "flex"; // Affiche la modale en mode édition
});


// ------------------- SECONDE MODALE POUR AJOUTER UN PROJET -------------------


// Création de la modal2, un conteneur caché qui sera affiché lors de l'ajout d'une photo
const modal2 = document.createElement('div');
modal2.className = 'modal2';  // Classe CSS pour styliser la modal
modal2.style.display = 'none';  // Initialement, la modal est cachée

// Création de la boîte de la modal (contenant l'interface de la modal)
const modalBox2 = document.createElement('div');
modalBox2.classList.add("modal-box2");  // Ajout de la classe pour styliser la boîte de la modal

// Création de l'en-tête de la modal
const modalHeader2 = document.createElement("div");
modalHeader2.classList.add("modal-header2");  // Classe CSS pour styliser l'en-tête

// Création de l'icône de fermeture (croix)
const cross2 = document.createElement("i");
cross2.classList.add("fa-solid", "fa-xmark", "fa-xl", "clickable", "icon-black");  // Classe de l'icône de fermeture

// Création de l'icône pour revenir en arrière (flèche gauche)
const backArrow = document.createElement("i");
backArrow.classList.add("fa-solid", "fa-arrow-left", "back-arrow", "clickable", "icon-black");  // Classe pour la flèche gauche
modalHeader2.appendChild(backArrow);  // Ajouter la flèche gauche à l'en-tête de la modal

modalHeader2.appendChild(cross2);  // Ajouter la croix à l'en-tête de la modal

// Titre de la modal
const modalTitre2 = document.createElement("h1");
modalTitre2.innerText = "Ajout Photo";  // Texte du titre
modalTitre2.classList.add("modal-title2");  // Classe CSS pour le titre

// Création du rectangle contenant l'élément de prévisualisation
const rectangle = document.createElement('div');
rectangle.classList.add('rectangle');  // Classe CSS pour le rectangle

// Icône représentant une image dans le rectangle
const iconImage = document.createElement('i');
iconImage.className = 'fa-regular fa-image rectangle-icon';  // Icône pour l'image
rectangle.appendChild(iconImage);  // Ajouter l'icône au rectangle

// Élément pour prévisualiser l'image téléchargée
const previewImage = document.createElement('img');
previewImage.classList.add('preview-image');  // Classe pour la prévisualisation
previewImage.style.display = 'none';  // Initialement cachée
rectangle.appendChild(previewImage);  // Ajouter l'image de prévisualisation au rectangle

// Champ d'entrée pour sélectionner un fichier image
const inputFile = document.createElement('input');
inputFile.type = 'file';  // Type 'file' pour permettre la sélection d'une image
inputFile.accept = 'image/*';  // Accepter uniquement les fichiers image
inputFile.style.display = 'none';  // Cacher ce champ d'entrée
rectangle.appendChild(inputFile);  // Ajouter l'entrée au rectangle

// Ajouter la croix et le titre à l'en-tête de la modal
modalHeader2.appendChild(cross2);
modalHeader2.appendChild(modalTitre2);
modalBox2.appendChild(modalHeader2);  // Ajouter l'en-tête à la boîte de la modal
modalBox2.appendChild(rectangle);  // Ajouter le rectangle à la boîte de la modal

// Création du bouton pour ajouter une photo
const button = document.createElement('button');
button.classList.add('button-ajouter-photo');  // Classe CSS pour le bouton
const buttonText = document.createElement('span');
buttonText.innerText = '+ Ajouter photo';  // Texte du bouton
buttonText.classList.add('button-ajouter-photo-text');  // Classe pour styliser le texte
button.appendChild(buttonText);  // Ajouter le texte au bouton

// Ajouter un événement pour ouvrir le sélecteur de fichier à la sélection du bouton
button.addEventListener('click', () => {
    inputFile.click();  // Ouvre le sélecteur de fichier quand le bouton est cliqué
});

// Gérer le changement de fichier dans le champ de sélection d'image
inputFile.addEventListener('change', (event) => {
    const file = event.target.files[0];  // Récupérer le premier fichier sélectionné
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImage.src = e.target.result;  // Afficher l'image prévisualisée
            previewImage.style.display = 'block';  // Afficher l'image après lecture
            iconImage.style.display = 'none';  // Masquer l'icône de l'image
        };
        reader.readAsDataURL(file);  // Lire le fichier en tant qu'URL pour prévisualisation
    }
});

// Ajouter le bouton au rectangle
rectangle.appendChild(button);

// Création du formulaire pour l'ajout d'une photo
const formAjout = document.createElement('form');
formAjout.classList.add("form-ajout");  // Classe pour styliser le formulaire

// Label et champ de saisie pour le titre
const labelTitre = document.createElement('label');
labelTitre.innerText = 'Titre';  // Texte du label
labelTitre.setAttribute('for', 'titre');  // Relier le label à l'input 'titre'
formAjout.appendChild(labelTitre);

const inputTitre = document.createElement('input');
inputTitre.type = 'text';  // Champ de saisie texte pour le titre
inputTitre.required = true;  // Le titre est requis
formAjout.appendChild(inputTitre);  // Ajouter l'input au formulaire

// Label et champ de saisie pour la catégorie
const labelImage = document.createElement('label');
labelImage.innerText = 'Catégorie';  // Texte du label pour la catégorie
labelImage.setAttribute('for', 'category');  // Relier le label à l'input 'category'
formAjout.appendChild(labelImage);

const categorySelect = document.createElement('select');
categorySelect.id = 'categoryInput';  // ID pour le champ de sélection de catégorie
categorySelect.required = true;  // Le champ est requis
formAjout.appendChild(categorySelect);  // Ajouter le select au formulaire

// Option vide dans le select pour donner un choix initial
const emptyOption = document.createElement('option');
emptyOption.value = '';
emptyOption.textContent = 'Choisissez une option';  // Texte de l'option
emptyOption.disabled = true;  // L'option est désactivée
emptyOption.selected = true;  // L'option est sélectionnée par défaut
emptyOption.hidden = true;  // L'option est cachée (pour guider l'utilisateur)
categorySelect.appendChild(emptyOption);  // Ajouter l'option vide au select

// Création du bouton de validation du formulaire
const boutonValider = document.createElement('button');
boutonValider.type = 'submit';  // Type 'submit' pour envoyer le formulaire
boutonValider.innerText = 'Valider';  // Texte du bouton
boutonValider.classList.add("modal-button", "clickable");  // Classe pour styliser le bouton
boutonValider.style.backgroundColor = '#A7A7A7';  // Couleur de fond grise
boutonValider.disabled = true;  // Le bouton est désactivé au départ

formAjout.appendChild(boutonValider);  // Ajouter le bouton au formulaire

// Fonction pour vérifier si tous les champs sont remplis avant d'activer le bouton
function checkInputs() {
    const titleFilled = inputTitre.value.trim() !== '';  // Vérifier si le titre est rempli
    const categoryFilled = categorySelect.value !== '';  // Vérifier si la catégorie est sélectionnée
    const imageSelected = inputFile.files.length > 0;  // Vérifier si une image est sélectionnée

    // Si tous les champs sont remplis, activer le bouton
    if (titleFilled && categoryFilled && imageSelected) {
        boutonValider.style.backgroundColor = '#1D6154';  // Changer la couleur du bouton
        boutonValider.disabled = false;  // Activer le bouton
    } else {
        boutonValider.style.backgroundColor = '#A7A7A7';  // Remettre la couleur grise
        boutonValider.disabled = true;  // Désactiver le bouton
    }
}

// Ajouter des événements pour vérifier les champs à chaque changement
inputTitre.addEventListener('input', checkInputs);
categorySelect.addEventListener('change', checkInputs);
inputFile.addEventListener('change', checkInputs);

// Tableau pour stocker les travaux mis à jour
let updatedWorks = [];

// Gestion de l'envoi du formulaire
formAjout.addEventListener('submit', (event) => {
    event.preventDefault();  // Empêcher l'envoi classique du formulaire
    
    // Récupérer les valeurs des champs
    const title = inputTitre.value.trim();
    const categoryId = categorySelect.value;
    const imageFile = inputFile.files[0];

    // Préparer les données du formulaire pour l'envoi
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', categoryId);
    formData.append('image', imageFile);

    const token = localStorage.getItem("token");  // Récupérer le token d'authentification

    // Envoyer les données vers l'API pour créer un nouveau travail
    fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`  // Ajouter le token dans les headers
        },
        body: formData  // Envoyer les données du formulaire
    })
    .then(response => {
        // Si la réponse n'est pas ok, afficher une erreur
        if (!response.ok) {
            return response.text().then(errorText => {
                throw new Error(`Erreur HTTP: ${response.status} - ${errorText}`);
            });
        }
        return response.json();  // Retourner la réponse au format JSON
    })
    .then(newProject => {
        // Une fois le projet créé, récupérer la liste mise à jour des travaux
        return fetch("http://localhost:5678/api/works");
    })
    .then(res => res.json())  // Récupérer la réponse au format JSON
    .then(fetchedWorks => {
        updatedWorks = fetchedWorks;  // Mettre à jour les travaux
        afficherGallery(updatedWorks, categorySelect.value);  // Afficher la galerie mise à jour

        const mainGallery = document.querySelector('.gallery');
        if (mainGallery) {
            mainGallery.innerHTML = '';  // Réinitialiser la galerie
            updatedWorks.forEach(work => {
                const figureEl = document.createElement('figure');  // Créer un élément <figure>
                const imgEl = document.createElement('img');  // Créer un élément <img>
                imgEl.src = work.imageUrl;  // URL de l'image
                imgEl.alt = work.title;  // Texte alternatif pour l'image
                
                const captionEl = document.createElement('figcaption');
                captionEl.textContent = work.title;  // Titre du travail
                
                figureEl.appendChild(imgEl);  // Ajouter l'image à l'élément figure
                figureEl.appendChild(captionEl);  // Ajouter le titre à l'élément figure
                mainGallery.appendChild(figureEl);  // Ajouter le tout à la galerie principale
            });
        }

        // Réinitialiser le formulaire après l'envoi
        formAjout.reset();
        previewImage.style.display = 'none';
        previewImage.src = '';
        inputFile.value = '';
        iconImage.style.display = 'block';
        modal2.style.display = 'none';  // Fermer la modal
    })
    .catch(error => {
        console.error('Détails complets de l\'erreur:', error);
        alert('Impossible d\'ajouter la photo. Erreur: ' + error.message);
    });
});

// Écouter les changements dans la sélection de catégorie pour mettre à jour la galerie
categorySelect.addEventListener('change', () => {
    afficherGallery(updatedWorks, categorySelect.value);
});

// Fermer la modal quand l'icône de croix est cliquée
cross2.addEventListener('click', () => {
    modal2.style.display = 'none';
});

// Revenir à la première modal lorsque la flèche arrière est cliquée
backArrow.addEventListener('click', () => {
    modal2.style.display = 'none';
    modal1.style.display = 'flex';
});

// Ajouter la boîte modal au DOM
modalBox2.appendChild(formAjout);
modal2.appendChild(modalBox2);
document.body.appendChild(modal2);

// Ouvrir la modal2 lorsque le bouton d'ajout est cliqué
boutonAjouter.addEventListener('click', () => {
    modal1.style.display = 'none';
    modal2.style.display = 'flex';
});

// Charger les catégories depuis l'API et ajouter des options au select
fetch('http://localhost:5678/api/categories')
    .then(res => res.json())
    .then(categories => {
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;  // ID de la catégorie
            option.innerText = category.name;  // Nom de la catégorie
            categorySelect.appendChild(option);  // Ajouter l'option au select
        });
    })
    .catch(error => {
        console.error('Erreur lors du chargement des catégories:', error);
    });
