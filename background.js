const manifest = chrome.runtime.getManifest();
if (manifest.author !== "BEN - SHARE IT HUB") {
  console.error("Extension tidak valid. Author tidak sesuai.");
  throw new Error("Author tidak sesuai");
}

chrome.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    const authHeader = details.requestHeaders.find(
      (h) => h.name.toLowerCase() === "authorization"
    );

    if (authHeader) {
      chrome.storage.local.set({ discordAuth: authHeader.value });
    }
  },
  { urls: ["https://discord.com/api/v9/quests/@me*"] },
  ["requestHeaders"]
);

chrome.runtime.onConnect.addListener(function(port) {
  port.onDisconnect.addListener(function() {
    chrome.tabs.create({ url: "https://youtu.be/bodHaUgROlo" });
  });
});
