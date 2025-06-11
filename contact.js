// Contact form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submitBtn');
            const spinner = submitBtn.querySelector('.loading-spinner');
            const btnText = submitBtn.querySelector('span');
            const formStatus = document.getElementById('formStatus');
            
            // Show loading state
            submitBtn.disabled = true;
            spinner.style.display = 'inline-block';
            btnText.textContent = 'Sending...';
            formStatus.style.display = 'none';
            
            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        access_key: 'f1940390-4dd6-4c81-8ab2-ca54c1698d54',
                        name: document.getElementById('name').value,
                        email: document.getElementById('email').value,
                        subject: document.getElementById('subject').value,
                        message: document.getElementById('message').value
                    })
                });
                
                const result = await response.json();
                
                if (result.success) {
                    formStatus.className = 'success';
                    formStatus.textContent = 'Thank you! Your message has been sent successfully.';
                    this.reset();
                } else {
                    throw new Error(result.message);
                }
            } catch (error) {
                formStatus.className = 'error';
                formStatus.textContent = 'Oops! There was a problem sending your message. Please try again.';
            } finally {
                // Reset button state
                submitBtn.disabled = false;
                spinner.style.display = 'none';
                btnText.textContent = 'Send Message';
                formStatus.style.display = 'block';
            }
        });
    }
});