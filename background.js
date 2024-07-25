chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    return {cancel: true};
  },
  {urls: ["*://www.instagram.com/*", "*://www.youtube.com/*"]},
  ["blocking"]
);
