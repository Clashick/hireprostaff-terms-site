// Load and display terms and conditions
document.addEventListener('DOMContentLoaded', function() {
    const termsContent = document.getElementById('terms-content');
    const loadingElement = document.getElementById('loading');
    const backToTopButton = document.getElementById('back-to-top');

    // Load the terms text file
    fetch('hireprostaff_terms_plain.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load terms and conditions');
            }
            return response.text();
        })
        .then(text => {
            // Hide loading message
            loadingElement.style.display = 'none';
            
            // Display the text exactly as is
            termsContent.textContent = text;
            
            // Show the content
            termsContent.style.display = 'block';
        })
        .catch(error => {
            console.error('Error loading terms:', error);
            loadingElement.textContent = 'Error loading terms and conditions. Please refresh the page.';
            loadingElement.style.color = '#d9534f';
        });

    // Back to top button functionality
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.pointerEvents = 'auto';
        } else {
            backToTopButton.style.opacity = '0.5';
            backToTopButton.style.pointerEvents = 'auto';
        }
    });
});
