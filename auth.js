// Authentication functionality for login and signup

// For demonstration purposes, we'll use localStorage to simulate user authentication
// In a real application, you would use a backend server with proper authentication

document.addEventListener('DOMContentLoaded', function() {
    // Initialize users array in localStorage if it doesn't exist
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }
    
    // Login form handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const messageDiv = document.getElementById('loginMessage');
            
            // Get users from localStorage
            const users = JSON.parse(localStorage.getItem('users'));
            
            // Find user with matching email and password
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                // Set current user in localStorage
                localStorage.setItem('currentUser', JSON.stringify({
                    id: user.id,
                    name: user.fullName,
                    email: user.email,
                    isLoggedIn: true
                }));
                
                // Show success message
                messageDiv.textContent = 'Login successful! Redirecting...';
                messageDiv.className = 'auth-message success';
                
                // Redirect to home page after a short delay
                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 1500);
            } else {
                // Show error message
                messageDiv.textContent = 'Invalid email or password. Please try again.';
                messageDiv.className = 'auth-message error';
            }
        });
    }
    
    // Signup form handling
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const messageDiv = document.getElementById('signupMessage');
            
            // Validate password
            if (password.length < 8) {
                messageDiv.textContent = 'Password must be at least 8 characters long.';
                messageDiv.className = 'auth-message error';
                return;
            }
            
            // Check if passwords match
            if (password !== confirmPassword) {
                messageDiv.textContent = 'Passwords do not match.';
                messageDiv.className = 'auth-message error';
                return;
            }
            
            // Get existing users
            const users = JSON.parse(localStorage.getItem('users'));
            
            // Check if email already exists
            if (users.some(user => user.email === email)) {
                messageDiv.textContent = 'Email already in use. Please use a different email or login.';
                messageDiv.className = 'auth-message error';
                return;
            }
            
            // Create new user
            const newUser = {
                id: Date.now().toString(),
                fullName,
                email,
                password,
                favorites: []
            };
            
            // Add user to users array
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            
            // Show success message
            messageDiv.textContent = 'Account created successfully! Redirecting to login...';
            messageDiv.className = 'auth-message success';
            
            // Redirect to login page after a short delay
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        });
    }
    
    // Forgot password link
    const forgotPasswordLink = document.getElementById('forgotPassword');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const loginFormContainer = document.getElementById('loginForm');
    const resetPasswordBtn = document.getElementById('resetPasswordBtn');
    const cancelResetBtn = document.getElementById('cancelResetBtn');
    const resetMessage = document.getElementById('resetMessage');
    
    if (forgotPasswordLink && forgotPasswordForm) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            loginFormContainer.style.display = 'none';
            forgotPasswordForm.style.display = 'block';
        });
        
        // Cancel reset password
        if (cancelResetBtn) {
            cancelResetBtn.addEventListener('click', function() {
                forgotPasswordForm.style.display = 'none';
                loginFormContainer.style.display = 'block';
                resetMessage.textContent = '';
                resetMessage.className = 'auth-message';
            });
        }
        
        // Reset password functionality
        if (resetPasswordBtn) {
            resetPasswordBtn.addEventListener('click', function() {
                const email = document.getElementById('resetEmail').value;
                
                if (!email) {
                    resetMessage.textContent = 'Please enter your email address.';
                    resetMessage.className = 'auth-message error';
                    return;
                }
                
                // Get users from localStorage
                const users = JSON.parse(localStorage.getItem('users'));
                
                // Find user with matching email
                const userIndex = users.findIndex(u => u.email === email);
                
                if (userIndex === -1) {
                    resetMessage.textContent = 'No account found with this email address.';
                    resetMessage.className = 'auth-message error';
                    return;
                }
                
                // Generate a temporary password
                const tempPassword = generateTemporaryPassword();
                
                // Update user's password
                users[userIndex].password = tempPassword;
                localStorage.setItem('users', JSON.stringify(users));
                
                // In a real application, you would send an email with the reset link
                // For this demo, we'll just display the temporary password
                resetMessage.innerHTML = `A temporary password has been generated: <strong>${tempPassword}</strong><br>Please use this to login and then change your password.`;
                resetMessage.className = 'auth-message success';
                
                // Add a button to go back to login
                const backToLoginBtn = document.createElement('button');
                backToLoginBtn.textContent = 'Back to Login';
                backToLoginBtn.className = 'btn-secondary';
                backToLoginBtn.style.marginTop = '15px';
                resetMessage.appendChild(document.createElement('br'));
                resetMessage.appendChild(backToLoginBtn);
                
                backToLoginBtn.addEventListener('click', function() {
                    forgotPasswordForm.style.display = 'none';
                    loginFormContainer.style.display = 'block';
                    resetMessage.textContent = '';
                    resetMessage.className = 'auth-message';
                });
            });
        }
    }
});

// Function to generate a temporary password
function generateTemporaryPassword() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

// Google Sign-In handler
function handleGoogleSignIn(response) {
    // Decode the JWT token to get user information
    const payload = parseJwt(response.credential);
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users'));
    
    // Check if user exists
    let user = users.find(u => u.email === payload.email);
    
    // If user doesn't exist, create a new account
    if (!user) {
        user = {
            id: Date.now().toString(),
            fullName: payload.name,
            email: payload.email,
            // For Google sign-in users, we don't store a password
            // Instead, we mark them as Google users
            googleUser: true,
            favorites: []
        };
        
        // Add user to users array
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }
    
    // Set current user in localStorage
    localStorage.setItem('currentUser', JSON.stringify({
        id: user.id,
        name: user.fullName,
        email: user.email,
        isLoggedIn: true,
        googleUser: true
    }));
    
    // Show success message
    const messageDiv = document.getElementById('loginMessage');
    messageDiv.textContent = 'Google Sign-In successful! Redirecting...';
    messageDiv.className = 'auth-message success';
    
    // Redirect to home page after a short delay
    setTimeout(() => {
        window.location.href = 'home.html';
    }, 1500);
}

// Helper function to parse JWT token
function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

// Function to check if user is logged in
function isLoggedIn() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser && currentUser.isLoggedIn;
}

// Function to logout user
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'home.html';
}

// Export functions for use in other scripts
window.authUtils = {
    isLoggedIn,
    logout
};