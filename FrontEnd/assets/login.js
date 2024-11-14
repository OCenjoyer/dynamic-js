// Attendre que le DOM soit complètement chargé avant d'exécuter le code
document.addEventListener('DOMContentLoaded', function() {
    // Récupérer le formulaire de connexion
    const loginForm = document.querySelector('form');
    
    // Ajouter un écouteur d'événement sur la soumission du formulaire
    loginForm.addEventListener('submit', function(e) {
        // Empêcher le comportement par défaut du formulaire (rechargement de la page)
        e.preventDefault();
        
        // Récupérer les valeurs des champs email et mot de passe
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Vérifier si les identifiants correspondent à ceux de l'admin
        if (email === 'sophie.bluel@test.tld' && password === 's0phie') {
            localStorage.setItem('isLoggedIn', 'true');
            // Si les identifiants sont corrects, afficher une notification de succès
            showNotification('Connecté en tant qu\'admin', './assets/icons/admin.png', 'success');
            
            // Rediriger vers la page d'accueil après 3 secondes
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            // Si les identifiants sont incorrects, afficher une notification d'erreur
            showNotification('Identifiants invalides', './assets/icons/error.png', 'error');
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