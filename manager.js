document.addEventListener('DOMContentLoaded', function() {
    // Load blocked sites from storage and display them
    chrome.storage.sync.get({ blockedUrls: [] }, function(data) {
      const tableBody = document.querySelector('#blockedSitesTable tbody');
      data.blockedUrls.forEach(url => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${url}</td>
          <td>
            <button onclick="removeBlockedSite('${url}')">Remove</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    });
  
    // Add a new site to the blocked list
    document.getElementById('addBlockButton').addEventListener('click', function() {
      const url = document.getElementById('urlInput').value;
      if (url) {
        chrome.storage.sync.get({ blockedUrls: [] }, function(data) {
          const blockedUrls = data.blockedUrls;
          if (!blockedUrls.includes(url)) {
            blockedUrls.push(url);
            chrome.storage.sync.set({ blockedUrls: blockedUrls }, function() {
              // Reload the page to update the list
              location.reload();
            });
          }
        });
      }
    });
  });
  
  function removeBlockedSite(url) {
    chrome.storage.sync.get({ blockedUrls: [] }, function(data) {
      const blockedUrls = data.blockedUrls.filter(item => item !== url);
      chrome.storage.sync.set({ blockedUrls: blockedUrls }, function() {
        // Reload the page to update the list
        location.reload();
      });
    });
  }
  