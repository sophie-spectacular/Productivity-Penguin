document.getElementById('add-site').addEventListener('click', function() {
  const site = document.getElementById('new-site').value;
  if (site) {
    chrome.storage.sync.get({blockedSites: []}, function(data) {
      const blockedSites = data.blockedSites;
      blockedSites.push(`*://${site}/*`);
      chrome.storage.sync.set({blockedSites: blockedSites}, function() {
        updateBlockedSites();
        updateBlockingRules();
      });
    });
  }
});

function updateBlockedSites() {
  chrome.storage.sync.get({blockedSites: []}, function(data) {
    const blockedSites = data.blockedSites;
    const ul = document.getElementById('blocked-sites');
    ul.innerHTML = '';
    blockedSites.forEach(function(site) {
      const li = document.createElement('li');
      li.textContent = site;
      ul.appendChild(li);
    });
  });
}

function updateBlockingRules() {
  chrome.storage.sync.get({blockedSites: []}, function(data) {
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [1],
      addRules: [
        {
          id: 1,
          priority: 1,
          action: { type: 'block' },
          condition: { urlFilter: data.blockedSites.join('|') }
        }
      ]
    });
  });
}

updateBlockedSites();
updateBlockingRules();
