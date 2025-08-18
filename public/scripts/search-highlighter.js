// Search Highlighter - Highlights terms from URL parameters
function highlightSearchTerms() {
    // Get highlight parameter from URL
    const params = new URLSearchParams(window.location.search);
    const highlight = params.get('highlight');

    if (!highlight) return;

    // Clean up URL
    if (window.history && window.history.replaceState) {
        const url = new URL(window.location);
        url.searchParams.delete('highlight');
        window.history.replaceState({}, document.title, url.toString());
    }

    // Prepare search terms - prioritize phrase matching
    const originalPhrase = highlight.trim();
    if (originalPhrase.length < 2) return;

    // Add styles if not already present
    if (!document.querySelector('#search-highlight-styles')) {
        const style = document.createElement('style');
        style.id = 'search-highlight-styles';
        style.textContent = `
            .search-highlight {
                background-color: #fff9c4 !important;
                color: #333 !important;
                padding: 0.1rem 0.2rem;
                border-radius: 6px;
                font-weight: 600;
            }
            .search-highlight-clear {
                position: fixed;
                top: calc(var(--sl-nav-height, 4rem) + 1rem);
                right: 1rem;
                z-index: 1000;
                background: var(--sl-color-accent);
                color: white;
                border: none;
                border-radius: 4px;
                padding: 0.5rem 1rem;
                cursor: pointer;
                font-size: 0.875rem;
                box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            }
            @keyframes highlightPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); box-shadow: 0 0 8px rgba(255, 249, 196, 0.8); }
            }
        `;
        document.head.appendChild(style);
    }

    // Find content area
    const content = document.querySelector('.sl-markdown-content') || document.querySelector('main') || document.body;

    // First try to highlight the complete phrase
    let highlightCount = highlightTerm(content, originalPhrase.toLowerCase());

    // If no complete phrase matches found, fall back to individual words
    if (highlightCount === 0) {
        const words = originalPhrase.toLowerCase().split(/\s+/).filter(word => word.length > 2);
        words.forEach(word => {
            highlightTerm(content, word);
        });
    }

    // Add clear button
    if (!document.querySelector('.search-highlight-clear')) {
        const clearBtn = document.createElement('button');
        clearBtn.className = 'search-highlight-clear';
        clearBtn.textContent = '✕ Clear Highlights';
        clearBtn.onclick = function () {
            // Remove all highlights
            document.querySelectorAll('.search-highlight').forEach(el => {
                el.outerHTML = el.textContent;
            });
            // Remove clear button
            this.remove();
            // Remove styles
            const styles = document.querySelector('#search-highlight-styles');
            if (styles) styles.remove();
        };
        document.body.appendChild(clearBtn);
    }

    // Auto-scroll to first highlighted term
    setTimeout(function () {
        const firstHighlight = document.querySelector('.search-highlight');
        if (firstHighlight) {
            console.log('🎯 Auto-scrolling to first highlight');
            firstHighlight.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'nearest'
            });

            // Add a subtle pulse animation to draw attention
            firstHighlight.style.animation = 'highlightPulse 2s ease-in-out';

            // Remove animation after it completes
            setTimeout(() => {
                firstHighlight.style.animation = '';
            }, 2000);
        }
    }, 100);
}

function highlightTerm(element, term) {
    const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: function (node) {
                // Skip script, style tags and already highlighted content
                const parent = node.parentElement;
                if (!parent) return NodeFilter.FILTER_REJECT;
                const tagName = parent.tagName.toLowerCase();
                return ['script', 'style', 'noscript'].includes(tagName) ||
                    parent.classList.contains('search-highlight') ?
                    NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
            }
        }
    );

    const textNodes = [];
    let node;
    while (node = walker.nextNode()) {
        if (node.textContent.toLowerCase().includes(term)) {
            textNodes.push(node);
        }
    }

    let highlightCount = 0;
    textNodes.forEach(textNode => {
        const text = textNode.textContent;
        const lowerText = text.toLowerCase();
        const lowerTerm = term.toLowerCase();

        if (lowerText.includes(lowerTerm)) {
            // Build highlighted text by processing character by character
            let result = '';
            let i = 0;
            let matchCount = 0;

            while (i < text.length) {
                const remainingLower = lowerText.substring(i);
                if (remainingLower.startsWith(lowerTerm)) {
                    // Found a match - wrap it
                    const originalMatch = text.substring(i, i + lowerTerm.length);
                    result += '<span class="search-highlight">' + originalMatch + '</span>';
                    i += lowerTerm.length;
                    matchCount++;
                } else {
                    // No match - add the character as-is
                    result += text[i];
                    i++;
                }
            }

            if (matchCount > 0) {
                highlightCount += matchCount;
                const wrapper = document.createElement('span');
                wrapper.innerHTML = result;
                textNode.parentNode.replaceChild(wrapper, textNode);
            }
        }
    });

    return highlightCount;
}

// Run when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', highlightSearchTerms);
} else {
    highlightSearchTerms();
}
