// Search Click Handler - Intercepts search result clicks to add highlight parameters
window.addEventListener('DOMContentLoaded', function () {
    console.log('🔍 Search highlighting starting...');
    let lastSearchTerm = '';

    // Function to capture search term from any search input
    function captureSearchTerm() {
        // Try to find any search inputs and capture their values
        const inputs = document.querySelectorAll('input[type="search"], input[placeholder*="Search"], input[placeholder*="search"]');

        inputs.forEach(input => {
            if (input.value && input.value.trim()) {
                lastSearchTerm = input.value.trim();
                console.log('📝 Captured search term:', lastSearchTerm);
            }

            input.addEventListener('input', function () {
                if (this.value && this.value.trim()) {
                    lastSearchTerm = this.value.trim();
                    console.log('📝 Search term updated:', lastSearchTerm);
                }
            });
        });
    }

    // Function to find search inputs in shadow DOM
    function captureSearchTermFromShadow() {
        const pagefindElements = document.querySelectorAll('pagefind-ui');
        pagefindElements.forEach(pagefind => {
            if (pagefind.shadowRoot) {
                const shadowInputs = pagefind.shadowRoot.querySelectorAll('input');
                shadowInputs.forEach(input => {
                    input.addEventListener('input', function () {
                        if (this.value && this.value.trim()) {
                            lastSearchTerm = this.value.trim();
                            console.log('📝 Shadow search term:', lastSearchTerm);
                        }
                    });
                });
            }
        });
    }

    // Global click handler to intercept all link clicks
    document.addEventListener('click', function (event) {
        const link = event.target.closest('a');
        if (!link || !link.href) return;

        // Check if this looks like an internal link (not external)
        try {
            const linkUrl = new URL(link.href);
            const currentUrl = new URL(window.location.href);

            // Only process internal links
            if (linkUrl.origin === currentUrl.origin) {
                // Check if we're in a search context and have a search term
                if (lastSearchTerm && lastSearchTerm.length > 2) {
                    // Check if this link is inside a search results area
                    const isInSearchResults = link.closest('pagefind-ui') ||
                        link.closest('[class*="search"]') ||
                        link.closest('[id*="search"]') ||
                        document.querySelector('dialog[open]')?.contains(link);

                    if (isInSearchResults) {
                        console.log('🎯 Intercepting search result click:', link.href);
                        console.log('🔍 Adding highlight term:', lastSearchTerm);

                        // Prevent default navigation
                        event.preventDefault();

                        // Add highlight parameter and navigate
                        linkUrl.searchParams.set('highlight', lastSearchTerm);
                        console.log('➡️ Navigating to:', linkUrl.toString());

                        window.location.href = linkUrl.toString();
                        return false;
                    }
                }
            }
        } catch (e) {
            // Ignore URL parsing errors
            console.log('⚠️ Could not process link:', e);
        }
    }, true); // Use capture phase to catch links in shadow DOM

    // Set up search term capture
    captureSearchTerm();

    // Keep trying to find search inputs (including in shadow DOM)
    const checkForSearchInputs = () => {
        captureSearchTerm();
        captureSearchTermFromShadow();
        setTimeout(checkForSearchInputs, 1000);
    };

    setTimeout(checkForSearchInputs, 500);

    console.log('✅ Search click interception ready!');
});
