const email = document.getElementById('email-address');
const password = document.getElementById('password');

document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!email.value) {
        email.style.border = '1px solid red';
        return;
    }
    if(!password.value){
        password.style.border = '1px solid red';
        return;
    }

    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email.value,
            password: password.value,
        }),
    });

    if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (typeof data.id !== 'string') {
            data.id = JSON.stringify(data.id);
        }
        
        await localStorage.setItem('userId', data.id);
        // localStorage.setItem('message', data.message);
        window.location.href = 'http://localhost:5500/frontend/page1.html';

    }
        alert('Login failed');
});