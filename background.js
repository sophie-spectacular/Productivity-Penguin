chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      chrome.storage.sync.get({ blockedUrls: [] }, function(data) {
        const blockedUrls = data.blockedUrls;
        if (blockedUrls.some(url => details.url.includes(url))) {
          return { cancel: true };
        }
      });
    },
    { urls: ["<all_urls>"] },
    ["blocking"]
  );
  