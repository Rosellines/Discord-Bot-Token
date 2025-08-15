const port = chrome.runtime.connect();
const manifest = chrome.runtime.getManifest();

if (manifest.author !== "BEN - SHARE IT HUB") {
  document.body.innerHTML = "<h1 style='color:red;padding:20px'>Extension tidak valid.<br>Author hilang.</h1>";
  throw new Error("Author field missing or invalid.");
}

chrome.storage.local.get("discordAuth", (result) => {
  const token = result.discordAuth || "Belum ditemukan.";
  document.getElementById("auth").textContent = token;

  document.getElementById("copyBtn").onclick = () => {
    navigator.clipboard.writeText(token).then(() => {
      document.getElementById("status").textContent = "Token berhasil disalin!";
    }).catch(() => {
      document.getElementById("status").textContent = "Gagal menyalin token.";
    });
  };
});
