// Simple click tracking - no backend required
(function() {
  'use strict';
  
  function trackClick(url, linkText, page) {
    // Send tracking request to Nginx
    const trackUrl = '/track?' + 
      'page=' + encodeURIComponent(page) +
      '&link=' + encodeURIComponent(linkText) +
      '&dest=' + encodeURIComponent(url);
    
    // Use image pixel for tracking (works without CORS)
    new Image().src = trackUrl;
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    // Track all clicks to mythicvr.com
    const mainSiteLinks = document.querySelectorAll('a[href*="mythicvr.com"]');
    
    mainSiteLinks.forEach(link => {
      link.addEventListener('click', function() {
        trackClick(
          this.href, 
          this.textContent.trim(), 
          window.location.pathname
        );
      });
    });
  });
})();
