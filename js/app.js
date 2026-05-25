document.addEventListener("DOMContentLoaded", () => {
    
    // 1. MOBILE MENU BURGER
    const burgerBtn = document.getElementById("burgerBtn");
    const navMenu = document.getElementById("navMenu");

    burgerBtn.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    // Close menu when link is clicked
    document.querySelectorAll(".nav-menu a").forEach(link => {
        link.addEventListener("click", () => navMenu.classList.remove("active"));
    });

    // 2. FAQ ACCORDION
    const accordionHeaders = document.querySelectorAll(".accordion-header");

    accordionHeaders.forEach(header => {
        header.addEventListener("click", () => {
            const body = header.nextElementSibling;
            const isVisible = body.style.display === "block";
            
            // Close all
            document.querySelectorAll(".accordion-body").forEach(b => b.style.display = "none");
            document.querySelectorAll(".accordion-header span").forEach(s => s.textContent = "+");

            if (!isVisible) {
                body.style.display = "block";
                header.querySelector("span").textContent = "-";
            }
        });
    });

    // 3. VIRTUAL ASSISTANT (CHATBOT)
    const botToggle = document.getElementById("botToggle");
    const botWindow = document.getElementById("botWindow");
    const closeBot = document.getElementById("closeBot");
    const botMessages = document.getElementById("botMessages");
    const botOptions = document.getElementById("botOptions");

    botToggle.addEventListener("click", () => {
        botWindow.style.display = botWindow.style.display === "flex" ? "none" : "flex";
    });

    closeBot.addEventListener("click", () => botWindow.style.display = "none");

    // Bot interactions logic
    botOptions.addEventListener("click", (e) => {
        if (!e.target.classList.contains("option-btn")) return;

        const userChoiceText = e.target.textContent;
        const nextStep = e.target.getAttribute("data-next");

        // Add user response message
        appendMessage(userChoiceText, "user-msg");
        botOptions.style.display = "none";

        // Bot thinking delay simulation
        setTimeout(() => {
            if (nextStep === "famiglia") {
                appendMessage("L'Avv. Mazzini si occupa attivamente di separazioni e tutela minori. Ti consiglio di prenotare una consulenza strategica iniziale tramite il nostro calendario qui sul sito.", "bot-msg");
            } else if (nextStep === "immobili") {
                appendMessage("Per questioni immobiliari, contratti o sfratti, analizziamo subito i documenti. Puoi riservare uno slot orario nel modulo prenotazioni.", "bot-msg");
            } else {
                appendMessage("Perfetto. Per qualsiasi causa civile, valutiamo insieme i dettagli. Clicca sul link sotto il calendario per scegliere l'orario.", "bot-msg");
            }
            
            // Final action link to calendar
            setTimeout(() => {
                appendMessage("<a href='#prenota' style='color:#b45309; font-weight:bold;'>Clicca qui per aprire il Calendario</a>", "bot-msg");
            }, 600);
        }, 800);
    });

    function appendMessage(text, className) {
        const msgDiv = document.createElement("div");
        msgDiv.className = `msg ${className}`;
        msgDiv.innerHTML = text;
        botMessages.appendChild(msgDiv);
        botMessages.scrollTop = botMessages.scrollHeight;
    }

    // 4. GDPR COOKIE BANNER
    const cookieBanner = document.getElementById("cookieBanner");
    const acceptCookies = document.getElementById("acceptCookies");

    if (localStorage.getItem("cookiesAccepted") === "true") {
        cookieBanner.style.display = "none";
    }

    acceptCookies.addEventListener("click", () => {
        localStorage.setItem("cookiesAccepted", "true");
        cookieBanner.style.display = "none";
    });
});
