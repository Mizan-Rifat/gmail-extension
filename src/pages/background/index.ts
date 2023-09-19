chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
  console.log({ tab, info });

  if (tab.url && tab.url.includes("mail.google.com")) {
    chrome.tabs.sendMessage(tabId, {});
  }
});

export {};
