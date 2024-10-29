document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('form');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        if (email === 'sophie.bluel@test.tld' && password === 's0phie') {
            showNotification('Connecté en tant qu\'admin', './assets/icons/admin.png', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
        } else {
            showNotification('Identifiants invalides', './assets/icons/error.png', 'error');
        }
    });
    
    function showNotification(message, iconPath, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <img src="${iconPath}" alt="${type} icon">
            <p>${message}</p>
        `;
        
        document.body.appendChild(notification);
        
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
});