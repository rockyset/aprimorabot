document.addEventListener("DOMContentLoaded", function () {
  var config = window._rockyset || {};
  var botId = config.id;

  if (!botId) {
    console.warn("❌ Rockyset Chat Embed: Nenhum ID foi definido. Abortando carregamento.");
    return;
  }

  // Cria botão flutuante
  var launcher = document.createElement('button');
  launcher.innerHTML = "💬";
  launcher.style.position = "fixed";
  launcher.style.bottom = "20px";
  launcher.style.right = "20px";
  launcher.style.width = "60px";
  launcher.style.height = "60px";
  launcher.style.borderRadius = "50%";
  launcher.style.backgroundColor = "#007bff";
  launcher.style.color = "#fff";
  launcher.style.border = "none";
  launcher.style.cursor = "pointer";
  launcher.style.zIndex = "99999";

  launcher.onclick = function () {
    var iframe = document.getElementById("rockysetChatFrame");
    if (iframe) {
      iframe.style.display = iframe.style.display === "none" ? "block" : "none";
    }
  };

  document.body.appendChild(launcher);

  // Cria iframe wrapper
  var iframeWrapper = document.createElement("div");
  iframeWrapper.id = "rockysetChatFrame";
  iframeWrapper.style.position = "fixed";
  iframeWrapper.style.bottom = "80px";
  iframeWrapper.style.right = "20px";
  iframeWrapper.style.width = "360px";
  iframeWrapper.style.height = "600px";
  iframeWrapper.style.border = "none";
  iframeWrapper.style.zIndex = "99999";
  iframeWrapper.style.display = "none";
  iframeWrapper.style.boxShadow = "0 0 20px rgba(0,0,0,0.2)";

  // Cria iframe
  var iframe = document.createElement("iframe");
  iframe.src = "https://app.rockyset.com/bot/" + botId;
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "0";
  iframe.style.borderRadius = "10px";

  iframeWrapper.appendChild(iframe);
  document.body.appendChild(iframeWrapper);
});
