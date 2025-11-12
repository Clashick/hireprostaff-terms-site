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
            
            // Format the text for better readability while preserving ALL content
            const formattedHTML = formatTermsText(text);
            termsContent.innerHTML = formattedHTML;
            
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

function formatTermsText(text) {
    // Escape HTML to preserve all content exactly
    const escapeHtml = (str) => {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    };
    
    const lines = text.split('\n');
    let html = '';
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();
        
        // Main document header (first few lines)
        if (trimmed.startsWith('HIREPROSTAFF (PTY) LTD')) {
            html += `<div class="doc-header">${escapeHtml(line)}</div>\n`;
        }
        // PART headers (e.g., "PART A: GENERAL PROVISIONS")
        else if (trimmed.match(/^PART [A-Z]:/)) {
            html += `<div class="part-header">${escapeHtml(line)}</div>\n`;
        }
        // Main section numbers (e.g., "1. Definitions and Interpretation")
        else if (trimmed.match(/^(\d+)\.\s+[A-Z]/)) {
            html += `<div class="section-header">${escapeHtml(line)}</div>\n`;
        }
        // Subsection numbers (e.g., "1.1 Definitions", "5.2.1 Title")
        else if (trimmed.match(/^(\d+)\.(\d+)(\.\d+)?\s+[A-Z]/)) {
            html += `<div class="subsection-header">${escapeHtml(line)}</div>\n`;
        }
        // ALL CAPS lines (important notices)
        else if (trimmed.length > 10 && trimmed === trimmed.toUpperCase() && trimmed.match(/[A-Z]{5,}/)) {
            html += `<div class="all-caps-notice">${escapeHtml(line)}</div>\n`;
        }
        // Definition terms in quotes
        else if (trimmed.match(/^"[^"]+"/) || trimmed.match(/^"[^"]+"\s+means/)) {
            html += `<div class="definition-line">${escapeHtml(line)}</div>\n`;
        }
        // List items with letters (a), (b), (c) or (i), (ii), (iii)
        else if (trimmed.match(/^\([a-z]\)|^\([ivxlcdm]+\)/i)) {
            html += `<div class="list-item">${escapeHtml(line)}</div>\n`;
        }
        // Emphasized phrases starting with specific keywords
        else if (trimmed.match(/^(IMPORTANT|NOTE|WARNING|CRITICAL|FUNDAMENTAL|✓)/i)) {
            html += `<div class="emphasis-line">${escapeHtml(line)}</div>\n`;
        }
        // Empty lines
        else if (trimmed === '') {
            html += `<div class="empty-line">&nbsp;</div>\n`;
        }
        // Regular lines
        else {
            html += `<div class="regular-line">${escapeHtml(line)}</div>\n`;
        }
    }
    
    return html;
}
