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

fetch("http://localhost:5678/api/works")
    .then(res => res.json())
    .then(afficherGallery);

divGalleryMod.addEventListener("click", (event) => {
    if (event.target.classList.contains("fa-trash-can")) {
        const id = event.target.getAttribute("data-id");
        const token = localStorage.getItem("token");

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

modalBox.appendChild(modalHeader);
modalBox.appendChild(modalTitre);
modalBox.appendChild(divGalleryMod);
modalBox.appendChild(divLine);
modalBox.appendChild(boutonAjouter);
modal.appendChild(modalBox);

document.body.appendChild(modal);

const boutonModifier = document.querySelector(".edit-button");
boutonModifier.addEventListener("click", () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
        modal.style.display = "block";
    }
});

modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

cross.addEventListener("click", () => {
    modal.style.display = "none";
});