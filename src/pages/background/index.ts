chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
  // console.log({ tab, info });

  if (
    tab.url &&
    tab.url.includes("mail.google.com") &&
    tab.url.includes("#inbox/")
  ) {
    console.log({ tab });

    chrome.tabs.sendMessage(tabId, { tabId: tab.url.split("/").pop() });
  }
});

export {};
