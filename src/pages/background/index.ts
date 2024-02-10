chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
  if (
    tab.url &&
    tab.url.includes("mail.google.com") &&
    tab.url.includes("#inbox/")
  ) {
    const getCookie = async () => {
      const cookie = await chrome.cookies.get({
        url: "https://staging.onesuite.io/",
        name: "os_u_id",
      });

      const token = cookie?.value
        ? decodeURIComponent(cookie?.value)
        : undefined;

      chrome.tabs.sendMessage(tabId, {
        tabId: tab.url.split("/").pop(),
        token,
      });
    };

    getCookie();
  }
});

export {};
