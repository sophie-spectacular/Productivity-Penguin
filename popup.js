document.getElementById('block').addEventListener('click', () => {
    const website = document.getElementById('website').value;
    if (website) {
      chrome.storage.local.get(['blockedSites'], (result) => {
        let blockedSites = result.blockedSites || [];
        if (!blockedSites.includes(website)) {
          blockedSites.push(website);
          chrome.storage.local.set({ blockedSites: blockedSites });
        }
      });
    }
  });
  
  document.getElementById('unblock').addEventListener('click', () => {
    const website = document.getElementById('website').value;
    if (website) {
      chrome.storage.local.get(['blockedSites'], (result) => {
        let blockedSites = result.blockedSites || [];
        blockedSites = blockedSites.filter(site => site !== website);
        chrome.storage.local.set({ blockedSites: blockedSites });
      });
    }
  });
  