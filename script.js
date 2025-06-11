document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const ctaButtons = document.querySelector('.cta-buttons');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            // Create mobile nav container if it doesn't exist
            let mobileNav = document.querySelector('.mobile-nav');
            
            if (!mobileNav) {
                mobileNav = document.createElement('div');
                mobileNav.className = 'mobile-nav';
                
                // Clone nav links and CTA buttons
                const navLinksClone = navLinks.cloneNode(true);
                const ctaButtonsClone = ctaButtons.cloneNode(true);
                
                mobileNav.appendChild(navLinksClone);
                mobileNav.appendChild(ctaButtonsClone);
                
                // Add close button
                const closeBtn = document.createElement('div');
                closeBtn.className = 'close-btn';
                closeBtn.innerHTML = '<i class="fas fa-times"></i>';
                mobileNav.prepend(closeBtn);
                
                // Add to DOM
                document.body.appendChild(mobileNav);
                
                // Add event listener to close button
                closeBtn.addEventListener('click', function() {
                    mobileNav.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                });
                
                // Add event listeners to mobile nav links
                const mobileNavLinks = mobileNav.querySelectorAll('a');
                mobileNavLinks.forEach(link => {
                    link.addEventListener('click', function() {
                        mobileNav.classList.remove('active');
                        document.body.classList.remove('no-scroll');
                    });
                });
            }
            
            // Toggle mobile nav
            mobileNav.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }
    
    // Templates Slider
    const templatesSlider = document.querySelector('.templates-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (templatesSlider && prevBtn && nextBtn) {
        const slideWidth = 330; // Width of template card + gap
        
        prevBtn.addEventListener('click', function() {
            templatesSlider.scrollBy({
                left: -slideWidth,
                behavior: 'smooth'
            });
        });
        
        nextBtn.addEventListener('click', function() {
            templatesSlider.scrollBy({
                left: slideWidth,
                behavior: 'smooth'
            });
        });
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    
    
    
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


    
    // Add styles for mobile nav
    const style = document.createElement('style');
    style.textContent = `
        .mobile-nav {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.75);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            z-index: 1000;
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
        }
        
        .mobile-nav.active {
            transform: translateX(0);
        }
        
        .mobile-nav .nav-links {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 30px;
        }
        
        .mobile-nav .nav-links li {
            margin: 10px 0;
        }
        
        .mobile-nav .cta-buttons {
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 80%;
            max-width: 300px;
        }
        
        .mobile-nav .btn {
            width: 100%;
            text-align: center;
        }
        
        .close-btn {
            position: absolute;
            top: 20px;
            right: 20px;
            font-size: 1.5rem;
            cursor: pointer;
        }
        
        body.no-scroll {
            overflow: hidden;
        }
    `;
    
    document.head.appendChild(style);
    
    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .template-card, .step, .testimonial');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight * 0.9) {
                element.classList.add('animate');
            }
        });
    };
    
    // Add animation styles
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .feature-card, .template-card, .step, .testimonial {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .feature-card.animate, .template-card.animate, .step.animate, .testimonial.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    
    document.head.appendChild(animationStyle);
    
    // Run animation on page load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});