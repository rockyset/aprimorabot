document.addEventListener("DOMContentLoaded", function () {
  const config = window._aprimorabot || {};
  const botId = config.id;
  const pageURL = encodeURIComponent(window.location.href);

  if (!botId) return;

  // 🔐 Gera session_id no JS e injeta no objeto global
  const sessionId = generateRandomSessionId();
  window._aprimorabot.session_id = sessionId;

  let accessRegistered = false;

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
    const wasClosed = chat && chat.style.display === "none";

    if (chat) {
      chat.style.display = wasClosed ? "block" : "none";

      if (wasClosed && !accessRegistered) {
        fetch("https://aprimorabot.bubbleapps.io/version-test/api/1.1/wf/registrar_acesso_jsapi/initialize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bot_id: botId,
            session_id: sessionId,
            page_url: window.location.href,
            tipo: "ABERTURA"
          })
        })
        .then(res => {
          if (!res.ok) throw new Error("API retornou erro");
          return res.json();
        })
        .then(data => console.log("Acesso registrado com sucesso:", data))
        .catch(err => console.error("Erro ao registrar acesso:", err));

        accessRegistered = true;
      }
    }
  };

  document.body.appendChild(launcher);

  // Saudação (opcional)
  if (config.greetingMessage) {
    const greeting = document.createElement("div");
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

    setTimeout(() => {
      greeting.style.opacity = "1";
    }, 1000);
  }

  // Chat container
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

  // Função auxiliar para gerar session_id
  function generateRandomSessionId() {
    return Math.random().toString(36).substring(2, 12) + Date.now().toString(36);
  }
});
