const loginButton = document.getElementById('loginPageButton');

if(localStorage.userId){
    loginButton.innerHTML = 'Logout';
    loginButton.addEventListener('click', async () => {
        localStorage.clear();
        window.location.href = 'http://localhost:5500/login.html';
    });
}