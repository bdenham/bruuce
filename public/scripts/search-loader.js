// Lazy loading for search functionality - only loads when user interacts with search
(function() {
  let searchScriptsLoaded = false;

  function loadSearchScripts() {
    if (searchScriptsLoaded) return Promise.resolve();
    
    const basePath = import.meta.env.BASE_URL || '';
    
    return Promise.all([
      // Load search highlighter
      new Promise((resolve, reject) => {
        const script1 = document.createElement('script');
        script1.src = `${basePath}scripts/search-highlighter.js`;
        script1.onload = resolve;
        script1.onerror = reject;
        document.head.appendChild(script1);
      }),
      // Load search click handler
      new Promise((resolve, reject) => {
        const script2 = document.createElement('script');
        script2.src = `${basePath}scripts/search-click-handler.js`;
        script2.onload = resolve;
        script2.onerror = reject;
        document.head.appendChild(script2);
      })
    ]).then(() => {
      searchScriptsLoaded = true;
    }).catch(error => {
      console.warn('Failed to load search scripts:', error);
    });
  }

  // Load scripts when user interacts with search
  function initSearchLazyLoading() {
    const searchInputs = document.querySelectorAll('input[type="search"], [class*="search"], [id*="search"]');
    const searchButtons = document.querySelectorAll('button[aria-label*="search" i], [class*="search-button"]');
    
    const elements = [...searchInputs, ...searchButtons];
    
    elements.forEach(element => {
      // Load on first interaction
      const loadOnInteraction = () => {
        loadSearchScripts();
        element.removeEventListener('focus', loadOnInteraction);
        element.removeEventListener('click', loadOnInteraction);
      };
      
      element.addEventListener('focus', loadOnInteraction, { once: true });
      element.addEventListener('click', loadOnInteraction, { once: true });
    });

    // Also check for dynamically added search elements (like Pagefind)
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const searchElements = node.querySelectorAll?.('pagefind-ui, [class*="pagefind"], input[type="search"]');
            if (searchElements?.length) {
              loadSearchScripts();
              observer.disconnect();
            }
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSearchLazyLoading);
  } else {
    initSearchLazyLoading();
  }
})();
