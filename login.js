// login.js
document.getElementById('loginForm').addEventListener('submit', function(e){
  e.preventDefault();

  const email    = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  const msg      = document.getElementById('loginMessage');

  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    msg.textContent = 'Invalid email or password';
    msg.className = 'text-danger';
    return;
  }

  // login success → store currentUser
  localStorage.setItem('currentUser', JSON.stringify(user));

  msg.textContent = 'Login successful! Redirecting...';
  msg.className = 'text-success';

  setTimeout(() => {
    window.location.href = 'homepage.html';
  }, 1000);
});
