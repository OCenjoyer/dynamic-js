const modal1 = document.createElement("div");
modal1.classList.add("modal");
modal1.style.display = "none";

const modalBox1 = document.createElement("div");
modalBox1.classList.add("modal-box");

const modalHeader1 = document.createElement("div");
modalHeader1.classList.add("modal-header");

const cross1 = document.createElement("i");
cross1.classList.add("fa-solid", "fa-xmark", "fa-xl", "clickable");
modalHeader1.appendChild(cross1);

const modalTitre1 = document.createElement("h1");
modalTitre1.innerText = "Galerie photo";
modalTitre1.classList.add("modal-title");

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
    .then(afficherGallery)
    .catch(error => {
        console.error('Erreur lors de la récupération des travaux:', error);
    });

divGalleryMod.addEventListener("click", (event) => {
    if (event.target.classList.contains("fa-trash-can")) {
        const id = event.target.getAttribute("data-id");
        const token = localStorage.getItem("token");

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

const boutonModifier = document.querySelector(".edit-button");
boutonModifier.addEventListener("click", () => {
    modal1.style.display = "flex";
});

modal1.addEventListener("click", (event) => {
    if (event.target === modal1 || event.target === cross1) {
        modal1.style.display = "none";
    }
});

modalHeader1.appendChild(cross1);
modalBox1.appendChild(modalHeader1);
modalBox1.appendChild(modalTitre1);
modalBox1.appendChild(divGalleryMod);
modalBox1.appendChild(divLine);
modalBox1.appendChild(boutonAjouter);
modal1.appendChild(modalBox1);

document.body.appendChild(modal1);

// ------------------- SECONDE MODALE POUR AJOUTER UN PROJET -------------------

const modal2 = document.createElement('div');
modal2.className = 'modal2';
modal2.style.display = 'none';

const modalBox2 = document.createElement('div');
modalBox2.classList.add("modal-box2");

const modalHeader2 = document.createElement("div");
modalHeader2.classList.add("modal-header2");

const cross2 = document.createElement("i");
cross2.classList.add("fa-solid", "fa-xmark", "fa-xl", "clickable", "icon-black"); 

const backArrow = document.createElement("i");
backArrow.classList.add("fa-solid", "fa-arrow-left", "back-arrow", "clickable", "icon-black"); 
modalHeader2.appendChild(backArrow);

modalHeader2.appendChild(cross2);

const modalTitre2 = document.createElement("h1");
modalTitre2.innerText = "Ajout Photo";
modalTitre2.classList.add("modal-title2");

const rectangle = document.createElement('div');
rectangle.classList.add('rectangle');

const iconImage = document.createElement('i');
iconImage.className = 'fa-regular fa-image rectangle-icon';
rectangle.appendChild(iconImage);

const previewImage = document.createElement('img');
previewImage.classList.add('preview-image');
previewImage.style.display = 'none';
rectangle.appendChild(previewImage);

modalHeader2.appendChild(cross2);
modalHeader2.appendChild(modalTitre2);
modalBox2.appendChild(modalHeader2);
modalBox2.appendChild(rectangle);

const button = document.createElement('button');
button.classList.add('button-ajouter-photo');
const buttonText = document.createElement('span');
buttonText.innerText = '+ Ajouter photo';
buttonText.classList.add('button-ajouter-photo-text');
button.appendChild(buttonText);

button.addEventListener('click', () => {
    const inputFile = document.createElement('input');
    inputFile.type = 'file';
    inputFile.accept = 'image/*';

    inputFile.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                previewImage.style.display = 'block';
                iconImage.style.display = 'none';
            };
            reader.readAsDataURL(file);
        }
    });

    inputFile.click();
});

rectangle.appendChild(button);

const formAjout = document.createElement('form');
formAjout.classList.add("form-ajout");

const labelTitre = document.createElement('label');
labelTitre.innerText = 'Titre';
labelTitre.setAttribute('for', 'titre');
formAjout.appendChild(labelTitre);

const inputTitre = document.createElement('input');
inputTitre.type = 'text';
inputTitre.required = true;
formAjout.appendChild(inputTitre);

const labelImage = document.createElement('label');
labelImage.innerText = 'Catégorie';
labelImage.setAttribute('for', 'category');
formAjout.appendChild(labelImage);

const categorySelect = document.createElement('select');
categorySelect.id = 'categoryInput';
categorySelect.required = true;
formAjout.appendChild(categorySelect);

const emptyOption = document.createElement('option');
emptyOption.value = '';
emptyOption.textContent = 'Choisissez une option';
emptyOption.disabled = true;
emptyOption.selected = true;
emptyOption.hidden = true;

categorySelect.appendChild(emptyOption);

const boutonValider = document.createElement('button');
boutonValider.type = 'submit';
boutonValider.innerText = 'Valider';
boutonValider.classList.add("modal-button", "clickable");
boutonValider.style.backgroundColor = '#A7A7A7'; 
boutonValider.disabled = true;

formAjout.appendChild(boutonValider);

function checkInputs() {
    const titleFilled = inputTitre.value.trim() !== '';
    const categoryFilled = categorySelect.value !== '';

    if (titleFilled && categoryFilled) {
        boutonValider.style.backgroundColor = '#1D6154';
        boutonValider.disabled = false;
    } else {
        boutonValider.style.backgroundColor = '#A7A7A7';
        boutonValider.disabled = true;
    }
}

inputTitre.addEventListener('input', checkInputs);
categorySelect.addEventListener('change', checkInputs);

formAjout.addEventListener('submit', (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');

    const nouveauProjet = {
        title: inputTitre.value,
        category: categorySelect.value ,
        imageUrl: previewImage.src,
    };

    fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(nouveauProjet),
    })
    .then(res => res.json())
    .then(projetAjoute => {
        afficherGallery([...divGalleryMod.children, projetAjoute]);
        modal2.style.display = 'none';
    })
    .catch(error => {
        console.error('Erreur lors de l\'ajout du projet:', error);
    });
});

cross2.addEventListener('click', () => {
    modal2.style.display = 'none';
});

backArrow.addEventListener('click', () => {
    modal2.style.display = 'none';
    modal1.style.display = 'flex';
});

modalBox2.appendChild(formAjout);
modal2.appendChild(modalBox2);
document.body.appendChild(modal2);

boutonAjouter.addEventListener('click', () => {
    modal1.style.display = 'none';
    modal2.style.display = 'flex';
});

fetch('http://localhost:5678/api/categories')
    .then(res => res.json())
    .then(categories => {
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id; 
            option.innerText = category.name; 
            categorySelect.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Erreur lors du chargement des catégories:', error);
    });