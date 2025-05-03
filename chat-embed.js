document.addEventListener("DOMContentLoaded", function () {
  var config = window._aprimorabot || {};
  var botId = config.id;

  if (!botId) {
    console.warn("❌ Aprimora Bot Embed: Nenhum ID foi definido. Abortando carregamento.");
    return;
  }

  var currentPageURL = encodeURIComponent(window.location.href);

  // Cria botão flutuante
  var launcher = document.createElement('button');
  launcher.style.position = "fixed";
  launcher.style.bottom = "20px";
  launcher.style.right = "20px";
  launcher.style.width = "60px";
  launcher.style.height = "60px";
  launcher.style.borderRadius = "50%";
  launcher.style.backgroundColor = config.primaryColor || "#007bff";
  launcher.style.border = "none";
  launcher.style.cursor = "pointer";
  launcher.style.zIndex = "99999";
  launcher.style.opacity = "0";
  launcher.style.transition = "opacity 0.5s ease";
  launcher.style.padding = "0";
  launcher.style.overflow = "hidden";

  // Ícone do widget
  var img = document.createElement("img");
  img.src = config.iconUrl;
  img.style.width = "100%";
  img.style.height = "100%";
  img.style.borderRadius = "50%";
  img.style.display = "block";
  launcher.appendChild(img);

  // Saudação (se não for autoOpen e houver greeting)
  if (!config.autoOpen && config.greetingMessage) {
    var greeting = document.createElement("div");
    greeting.innerText = config.greetingMessage;
    greeting.style.position = "fixed";
    greeting.style.bottom = "90px";
    greeting.style.right = "20px";
    greeting.style.padding = "10px 15px";
    greeting.style.backgroundColor = config.secondaryColor || "#ffffff";
    greeting.style.color = "#000";
    greeting.style.borderRadius = "10px";
    greeting.style.boxShadow = "0 0 10px rgba(0,0,0,0.1)";
    greeting.style.zIndex = "99999";
    greeting.style.opacity = "0";
    greeting.style.transition = "opacity 0.5s ease";
    greeting.style.fontFamily = "Arial, sans-serif";
    greeting.style.fontSize = "14px";
    greeting.style.maxWidth = "260px";
    greeting.style.lineHeight = "1.4";
    document.body.appendChild(greeting);

    setTimeout(function () {
      greeting.style.opacity = "1";
    }, 1000);
  }

  launcher.onclick = function () {
    var iframe = document.getElementById("aprimorabotChatFrame");
    if (iframe) {
      iframe.style.display = (iframe.style.display === "none") ? "block" : "none";
    }
  };

  document.body.appendChild(launcher);
  setTimeout(function () {
    launcher.style.opacity = "1";
  }, 500);

  // Cria o container do chat
  var chatContainer = document.createElement("div");
  chatContainer.id = "aprimorabotChatFrame";
  chatContainer.style.position = "fixed";
  chatContainer.style.bottom = "80px";
  chatContainer.style.right = "20px";
  chatContainer.style.width = "360px";
  chatContainer.style.height = "600px";
  chatContainer.style.border = "none";
  chatContainer.style.zIndex = "99999";
  chatContainer.style.display = "none";
  chatContainer.style.boxShadow = "0 0 15px rgba(0,0,0,0.3)";
  chatContainer.style.borderRadius = "10px";
  chatContainer.style.overflow = "hidden";

  // Adiciona iframe ao container
  var iframe = document.createElement("iframe");
  iframe.src = `https://app.aprimorabot.com.br/version-test/bot/${botId}?page_url=${currentPageURL}`;
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "0";
  chatContainer.appendChild(iframe);

  document.body.appendChild(chatContainer);

  // ✅ Abre automaticamente após tempo de renderização
  setTimeout(function () {
    if (config.autoOpen === true) {
      chatContainer.style.display = "block";
    }
  }, 100);
});
