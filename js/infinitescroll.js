// Get the necessary elements
const contentContainer = document.querySelector('.collumns');
const nextPageLink = document.querySelector('.pagination__next');
const statusElement = document.querySelector('.scroller-status');

// Keep track of the current page URL
let currentPageURL = nextPageLink ? nextPageLink.href : null;

// Create a new IntersectionObserver instance
const observer = new IntersectionObserver(handleIntersection, { rootMargin: '0px 0px 200px 0px' });

// Observe the status element
observer.observe(statusElement);

// Function to handle intersection events
function handleIntersection(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Fetch and append new content
      fetchAndAppendContent();
    }
  });
}

// Function to fetch and append new content
function fetchAndAppendContent() {
  // Check if there's a next page URL and we're not already loading content
  if (currentPageURL && !statusElement.querySelector('.infinite-scroll-request').style.display) {
    // Show the loading status
    statusElement.querySelector('.infinite-scroll-request').style.display = 'block';

    // Fetch the next page content
    fetch(currentPageURL)
      .then(response => response.text())
      .then(html => {
        // Create a temporary container to hold the new content
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = html;

        // Find the new column elements in the fetched content
        const newColumns = tempContainer.querySelectorAll('.collumn');

        // Append the new columns to the content container
        newColumns.forEach(column => contentContainer.appendChild(column));

        // Update the next page URL
        const newNextPageLink = tempContainer.querySelector('.pagination__next');
        currentPageURL = newNextPageLink ? newNextPageLink.href : null;

        // Update the pagination element
        const paginationElement = document.querySelector('.pagination');
        paginationElement.innerHTML = tempContainer.querySelector('.pagination').innerHTML;

        // If there's no next page link, hide the pagination and show the "End of content" message
        if (!currentPageURL) {
          paginationElement.style.display = 'none';
          statusElement.querySelector('.infinite-scroll-last').style.display = 'block';
        }
      })
      .catch(error => {
        console.error('Error fetching content:', error);
        statusElement.querySelector('.infinite-scroll-error').style.display = 'block';
      })
      .finally(() => {
        // Hide the loading status
        statusElement.querySelector('.infinite-scroll-request').style.display = 'none';
      });
  }
}