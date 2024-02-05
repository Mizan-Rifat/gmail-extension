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

      console.log({ cookie });
      // return cookie.value;

      const token = decodeURIComponent(cookie?.value);

      chrome.tabs.sendMessage(tabId, {
        tabId: tab.url.split("/").pop(),
        token,
      });
    };

    getCookie();
  }
});

export {};
