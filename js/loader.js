// Enhanced loader with content detection
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    const content = document.querySelector('.content');
    
    // Minimum load time for better UX (optional)
    const minLoadTime = 800;
    const startTime = Date.now();
    
    function hideLoader() {
        // Calculate elapsed time
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minLoadTime - elapsedTime);
        
        setTimeout(() => {
            // Start fade out animation
            loader.style.opacity = '0';
            loader.style.transition = 'opacity 0.5s ease-out';
            
            // Show content with fade in
            content.style.opacity = '0';
            content.style.display = 'block';
            content.style.transition = 'opacity 0.5s ease-in 0.2s';
            
            // Trigger content fade in after loader starts fading
            setTimeout(() => {
                content.style.opacity = '1';
            }, 200);
            
            // Completely remove loader after animation
            setTimeout(() => {
                loader.style.display = 'none';
                document.body.style.overflow = 'visible';
                
                // Optional: Dispatch custom event when loader is done
                document.dispatchEvent(new CustomEvent('loaderComplete'));
                
            }, 500);
            
        }, remainingTime);
    }
    
    // Check if content is already loaded and ready
    if (document.readyState === 'complete') {
        hideLoader();
    } else {
        window.addEventListener('load', hideLoader);
    }
    
    // Fallback: Hide loader after maximum time (5 seconds)
    setTimeout(hideLoader, 5000);
});

// Alternative version with Intersection Observer for precise content detection
function initLoaderWithIntersectionObserver() {
    const loader = document.querySelector('.loader');
    const content = document.querySelector('.content');
    
    if (!loader || !content) return;
    
    const minLoadTime = 800;
    const startTime = Date.now();
    
    // Create Intersection Observer to detect when content becomes visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Content is starting to appear in viewport
                const elapsedTime = Date.now() - startTime;
                const remainingTime = Math.max(0, minLoadTime - elapsedTime);
                
                setTimeout(() => {
                    hideLoaderSmoothly();
                }, remainingTime);
                
                // Stop observing once triggered
                observer.disconnect();
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of content is visible
        rootMargin: '50px' // Trigger 50px before content enters viewport
    });
    
    function hideLoaderSmoothly() {
        loader.style.opacity = '0';
        loader.style.transition = 'opacity 0.4s ease-out';
        
        content.style.transition = 'opacity 0.6s ease-in';
        content.style.opacity = '1';
        
        setTimeout(() => {
            loader.style.display = 'none';
            document.body.style.overflow = 'visible';
        }, 400);
    }
    
    // Start observing the content
    observer.observe(content);
    
    // Fallback safety timeout
    setTimeout(() => {
        observer.disconnect();
        hideLoaderSmoothly();
    }, 5000);
}

// Initialize the enhanced loader
document.addEventListener('DOMContentLoaded', initLoaderWithIntersectionObserver);