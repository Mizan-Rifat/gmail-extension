chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
  if (
    tab.url &&
    tab.url.includes("mail.google.com") &&
    tab.url.includes("#inbox/")
  ) {
    chrome.tabs.sendMessage(tabId, { tabId: tab.url.split("/").pop() });
  }
});

export {};
