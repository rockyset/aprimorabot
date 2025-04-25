document.addEventListener("DOMContentLoaded", function () {
  var config = window._rockyset || {};
  var botId = config.id || "DEMO-ID";

  // Cria botão flutuante
  var launcher = document.createElement("button");
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

  // Container do iframe
  var chatContainer = document.createElement("div");
  chatContainer.id = "rockysetChatFrame";
  chatContainer.style.position = "fixed";
  chatContainer.style.bottom = "80px";
  chatContainer.style.right = "20px";
  chatContainer.style.width = "360px";
  chatContainer.style.height = "600px";
  chatContainer.style.border = "none";
  chatContainer.style.zIndex = "99999";
  chatContainer.style.display = "none";
  chatContainer.style.boxShadow = "0 0 15px rgba(0,0,0,0.3)";

  // Cria o iframe
  var iframe = document.createElement("iframe");
  iframe.src = `https://app.rockyset.com/version-test/bot/${botId}`;
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "0";
  iframe.style.borderRadius = "10px";

  chatContainer.appendChild(iframe);

  launcher.onclick = function () {
    chatContainer.style.display = (chatContainer.style.display === "none") ? "block" : "none";
  };

  document.body.appendChild(launcher);
  document.body.appendChild(chatContainer);
});
