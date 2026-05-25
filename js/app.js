document.addEventListener("DOMContentLoaded", () => {
    
    // 1. MOBILE MENU BURGER
    const burgerBtn = document.getElementById("burgerBtn");
    const navMenu = document.getElementById("navMenu");

    burgerBtn.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-menu a").forEach(link => {
        link.addEventListener("click", () => navMenu.classList.remove("active"));
    });

    // 2. FAQ ACCORDION
    const accordionHeaders = document.querySelectorAll(".accordion-header");

    accordionHeaders.forEach(header => {
        header.addEventListener("click", () => {
            const body = header.nextElementSibling;
            const isVisible = body.style.display === "block";
            
            document.querySelectorAll(".accordion-body").forEach(b => b.style.display = "none");
            document.querySelectorAll(".accordion-header span").forEach(s => s.textContent = "+");

            if (!isVisible) {
                body.style.display = "block";
                header.querySelector("span").textContent = "-";
            }
        });
    });

    // 3. SMART STUDIO ASSISTANT
    const botToggle = document.getElementById("botToggle");
    const botWindow = document.getElementById("botWindow");
    const closeBot = document.getElementById("closeBot");
    const botMessages = document.getElementById("botMessages");
    const botOptions = document.getElementById("botOptions");

    botToggle.addEventListener("click", () => {
        botWindow.style.display = botWindow.style.display === "flex" ? "none" : "flex";
    });

    closeBot.addEventListener("click", () => botWindow.style.display = "none");

    botOptions.addEventListener("click", (e) => {
        if (!e.target.classList.contains("option-btn")) return;

        const userChoiceText = e.target.textContent;
        const nextStep = e.target.getAttribute("data-next");

        appendMessage(userChoiceText, "user-msg");
        botOptions.style.display = "none";

        setTimeout(() => {
            if (nextStep === "civile") {
                appendMessage("Lo Studio vanta una quindicennale esperienza in contrattualistica, risarcimento danni e diritto di famiglia. Può richiedere un incontro conoscitivo selezionando un orario nel modulo sottostante.", "bot-msg");
            } else if (nextStep === "tributario") {
                appendMessage("In materia fiscale e di contenziosi tributari, offriamo una consulenza altamente specializzata. Consigliamo di riservare tempestivamente un appuntamento per analizzare gli atti.", "bot-msg");
            } else {
                appendMessage("Seguiamo le aziende nelle procedure fallimentari e di ristrutturazione debito. Può fissare direttamente una prima sessione di analisi strategica sul nostro calendario.", "bot-msg");
            }
            
            setTimeout(() => {
                appendMessage("<a href='#prenota' style='color:#b45309; font-weight:bold;'>Scegli data e ora nel Calendario ↓</a>", "bot-msg");
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

    // 4. COOKIE BANNER
    const cookieBanner = document.getElementById("cookieBanner");
    const acceptCookies = document.getElementById("acceptCookies");

    if (localStorage.getItem("studioCookiesAccepted") === "true") {
        cookieBanner.style.display = "none";
    }

    acceptCookies.addEventListener("click", () => {
        localStorage.setItem("studioCookiesAccepted", "true");
        cookieBanner.style.display = "none";
    });
});
