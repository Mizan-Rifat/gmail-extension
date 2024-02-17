console.log("asdasd");

// To trigger the event Listener
document.addEventListener("leadGrabber:reload", () => {
  console.log("The start event was triggered");
  chrome.runtime.sendMessage({ action: "refreshGmailTab" });
});
