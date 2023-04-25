const loginForm = document.querySelector('#login-form');
const loginInput = document.querySelector('#login-input');
const passwordInput = document.querySelector('#password-input');

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const login = loginInput.value;
    const password = passwordInput.value;

    const data = { login, password };

    fetch('http://127.0.0.1:5000/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (!response.ok) {
                alert('Incorrect login or password. Please try again.');
            }
            return response.json();
        })
        .then((res) => {
            // Check if the login and password are correct
            if (res.access_token) {
                // If the login and password are correct, redirect to main.html
                window.location.href = 'main.html';
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});
