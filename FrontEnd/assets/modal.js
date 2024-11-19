const modal = document.createElement("div");
modal.classList.add("modal");
modal.style.display = "none";

const modalBox = document.createElement("div");
modalBox.classList.add("modal-box");

const modalHeader = document.createElement("div");
modalHeader.classList.add("modal-header");

const cross = document.createElement("i");
cross.classList.add("fa-solid", "fa-xmark", "fa-xl", "clickable");
modalHeader.appendChild(cross);

const modalTitre = document.createElement("h1");
modalTitre.innerText = "Galerie photo";
modalTitre.classList.add("modal-title");

const divLine = document.createElement("div");
divLine.classList.add("line");

const divGalleryMod = document.createElement("div");
divGalleryMod.classList.add("gallery-mod");

const boutonAjouter = document.createElement("a");
boutonAjouter.innerText = "Ajouter un projet";
boutonAjouter.classList.add("modal-button", "clickable");

// Fonction pour afficher la galerie de projets
function afficherGallery(list) {
    divGalleryMod.innerHTML = '';
    for (let projet of list) {
        const divImage = document.createElement("div");
        divImage.classList.add("div-image");
        divImage.setAttribute("data-id", projet.id);

        const img = document.createElement("img");
        img.src = projet.imageUrl;

        const iconPoubelle = document.createElement("i");
        iconPoubelle.classList.add("fa-solid", "fa-trash-can", "clickable");
        iconPoubelle.setAttribute("data-id", projet.id);

        divImage.appendChild(img);
        divImage.appendChild(iconPoubelle);
        divGalleryMod.appendChild(divImage);
    }
}

// Récupérer les projets depuis l'API
fetch("http://localhost:5678/api/works")
    .then(res => res.json())
    .then(afficherGallery)
    .catch(error => {
        console.error('Erreur lors de la récupération des travaux:', error);
    });

// Écouter les clics sur les icônes de suppression
divGalleryMod.addEventListener("click", (event) => {
    if (event.target.classList.contains("fa-trash-can")) {
        const id = event.target.getAttribute("data-id");
        const token = localStorage.getItem("token");

        console.log('Token récupéré pour suppression:', token); // Vérifiez le token
        if (!token) {
            console.error('Token is missing. Please log in again.');
            return;
        }

        fetch(`http://localhost:5678/api/works/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` },
        })
        .then(res => {
            if (res.status === 204) {
                const imgSupprime = document.querySelector(`div[data-id="${id}"]`);
                if (imgSupprime) {
                    imgSupprime.remove();
                }
            }
        })
        .catch(error => {
            console.error('Erreur lors de la suppression:', error);
        });
    }
});

// Afficher le modal lorsque le bouton "Modifier" est cliqué
const boutonModifier = document.querySelector(".edit-button");
boutonModifier.addEventListener("click", () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
        modal.style.display = "block";
    }
});

// Fermer le modal lorsque l'utilisateur clique sur le fond ou sur la croix
modal.addEventListener("click", (event) => {
    if (event.target === modal || event.target === cross) {
        modal.style.display = "none";
    }
});

// Construire la structure du modal
modalBox.appendChild(modalHeader);
modalBox.appendChild(modalTitre);
modalBox.appendChild(divGalleryMod);
modalBox.appendChild(divLine);
modalBox.appendChild(boutonAjouter);
modal.appendChild(modalBox);

// Ajouter le modal au body
document.body.appendChild(modal);