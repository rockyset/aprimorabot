(function() {
  function initAprimoraBot() {
    const config = window._aprimorabot || {};
    const botId = config.id;
    const pageURL = encodeURIComponent(window.location.href);

    if (!botId) return;

    // Botão flutuante
    const launcher = document.createElement("button");
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
    launcher.style.padding = "0";
    launcher.style.overflow = "hidden";

    const img = document.createElement("img");
    img.src = config.iconUrl;
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.borderRadius = "50%";
    launcher.appendChild(img);

    launcher.onclick = () => {
      const chat = document.getElementById("aprimorabotChatFrame");
      if (chat) {
        chat.style.display = (chat.style.display === "none") ? "block" : "none";
      }
    };

    document.body.appendChild(launcher);

    // Saudação com X externo, pulse e clique para abrir o chat
    if (config.greetingMessage) {
      const style = document.createElement("style");
      style.innerHTML = `
        @keyframes aprimoraPulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .aprimora-pulse {
          animation: aprimoraPulse 0.6s ease;
        }
      `;
      document.head.appendChild(style);

      const greetingWrapper = document.createElement("div");
      greetingWrapper.style.position = "fixed";
      greetingWrapper.style.bottom = "90px";
      greetingWrapper.style.right = "20px";
      greetingWrapper.style.zIndex = "99999";

      const greeting = document.createElement("div");
      greeting.innerText = config.greetingMessage;
      greeting.style.padding = "10px 15px";
      greeting.style.backgroundColor = config.secondaryColor || "#ffffff";
      greeting.style.color = "#000";
      greeting.style.borderRadius = "10px";
      greeting.style.boxShadow = "0 0 10px rgba(0,0,0,0.1)";
      greeting.style.fontFamily = "Arial, sans-serif";
      greeting.style.fontSize = "14px";
      greeting.style.maxWidth = "260px";
      greeting.style.lineHeight = "1.4";
      greeting.style.opacity = "0";
      greeting.style.transition = "opacity 0.5s ease";
      greeting.style.cursor = "pointer";

      greeting.onclick = () => {
        const chat = document.getElementById("aprimorabotChatFrame");
        if (chat) {
          chat.style.display = "block";
        }
      };

      const closeButton = document.createElement("button");
      closeButton.innerText = "×";
      closeButton.style.position = "absolute";
      closeButton.style.top = "-10px";
      closeButton.style.right = "-10px";
      closeButton.style.width = "24px";
      closeButton.style.height = "24px";
      closeButton.style.borderRadius = "50%";
      closeButton.style.backgroundColor = "#fff";
      closeButton.style.color = "#000";
      closeButton.style.border = "none";
      closeButton.style.cursor = "pointer";
      closeButton.style.fontSize = "16px";
      closeButton.style.lineHeight = "1";
      closeButton.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";

      closeButton.onclick = () => {
        clearInterval(pulseInterval);
        greetingWrapper.style.display = "none";
      };

      greetingWrapper.appendChild(greeting);
      greetingWrapper.appendChild(closeButton);
      document.body.appendChild(greetingWrapper);

      setTimeout(() => {
        greeting.style.opacity = "1";
      }, 1000);

      const pulseInterval = setInterval(() => {
        greeting.classList.add("aprimora-pulse");
        setTimeout(() => {
          greeting.classList.remove("aprimora-pulse");
        }, 600);
      }, 10000);
    }

    const chatContainer = document.createElement("div");
    chatContainer.id = "aprimorabotChatFrame";
    chatContainer.style.position = "fixed";
    chatContainer.style.bottom = "80px";
    chatContainer.style.right = "20px";
    chatContainer.style.width = "360px";
    chatContainer.style.height = "600px";
    chatContainer.style.border = "none";
    chatContainer.style.zIndex = "99999";
    chatContainer.style.display = "none";
    chatContainer.style.borderRadius = "10px";
    chatContainer.style.boxShadow = "0 0 10px rgba(0,0,0,0.15)";
    chatContainer.style.overflow = "hidden";

    const iframe = document.createElement("iframe");
    iframe.src = `https://app.aprimorabot.com.br/bot/${botId}?page_url=${pageURL}`;
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "0";

    chatContainer.appendChild(iframe);
    document.body.appendChild(chatContainer);
  }

  // Suporte a carregamento tardio ou normal
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAprimoraBot);
  } else {
    initAprimoraBot(); // Já está carregado? Roda direto.
  }
})();
