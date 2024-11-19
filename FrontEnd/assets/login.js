// Attendre que le DOM soit complètement chargé avant d'exécuter le code
document.addEventListener('DOMContentLoaded', function() {
    // Récupérer le formulaire de connexion
    const loginForm = document.querySelector('form');
    
    // Ajouter un écouteur d'événement sur la soumission du formulaire
    loginForm.addEventListener('submit', async function(e) {
        // Empêcher le comportement par défaut du formulaire (rechargement de la page)
        e.preventDefault();
        
        // Récupérer les valeurs des champs email et mot de passe
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        try {
            // Appeler l'API pour la connexion
            const response = await fetch('http://localhost:5678/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }), // Envoyer les identifiants en JSON
            });

            // Vérifier si la réponse de l'API est OK (statut 200)
            if (!response.ok) {
                throw new Error('Identifiants invalides'); // Lancer une erreur si la connexion échoue
            }

            const data = await response.json(); // Récupérer les données de la réponse

            // Si la connexion est réussie, stocker le token et l'état de connexion
            localStorage.setItem('isLoggedIn', 'true'); // Indiquer que l'utilisateur est connecté
            localStorage.setItem('token', data.token); // Stocker le token reçu
            console.log('Token stocké:', data.token); // Afficher le token dans la console pour vérification

            // Afficher une notification de succès
            showNotification('Connecté en tant qu\'admin', './assets/icons/admin.png', 'success');
            
            // Rediriger vers la page d'accueil après 1.5 secondes
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } catch (error) {
            // Si une erreur se produit, afficher une notification d'erreur
            showNotification(error.message, './assets/icons/error.png', 'error');
        }
    });
    
    // Fonction pour créer et afficher une notification
    function showNotification(message, iconPath, type) {
        // Créer l'élément de notification
        const notification = document.createElement('div');
        // Ajouter les classes pour le style
        notification.className = `notification ${type}`;
        // Insérer le contenu HTML de la notification (icône + message)
        notification.innerHTML = `
            <img src="${iconPath}" alt="${type} icon">
            <p>${message}</p>
        `;
        
        // Ajouter la notification au body
        document.body.appendChild(notification);
        
        // Positionner la notification en haut à droite
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        
        // Supprimer automatiquement la notification après 3 secondes
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
});