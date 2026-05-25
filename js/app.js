document.addEventListener("DOMContentLoaded", () => {
    
    // 1. MOBILE MENU BURGER (Fixed)
    const burgerBtn = document.getElementById("burgerBtn");
    const navMenu = document.getElementById("navMenu");

    if(burgerBtn && navMenu) {
        burgerBtn.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            burgerBtn.classList.toggle("toggle"); // Для CSS-анімації бургера в майбутньому
        });

        document.querySelectorAll(".nav-menu a").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
            });
        });
    }

    // 2. FAQ ACCORDION (Improved)
    const accordionHeaders = document.querySelectorAll(".accordion-header");

    accordionHeaders.forEach(header => {
        header.addEventListener("click", () => {
            const body = header.nextElementSibling;
            const isVisible = body.style.display === "block";
            
            // Close all other items
            document.querySelectorAll(".accordion-body").forEach(b => {
                if(b !== body) {
                    b.style.display = "none";
                    b.previousElementSibling.querySelector("span").textContent = "+";
                }
            });

            if (!isVisible) {
                body.style.display = "block";
                header.querySelector("span").textContent = "-";
            } else {
                body.style.display = "none";
                header.querySelector("span").textContent = "+";
            }
        });
    });

    // 3. SMART STUDIO ASSISTANT (Improved Adaptivity)
    const botToggle = document.getElementById("botToggle");
    const botWindow = document.getElementById("botWindow");
    const closeBot = document.getElementById("closeBot");
    const botMessages = document.getElementById("botMessages");
    const botOptions = document.getElementById("botOptions");

    if(botToggle && botWindow && closeBot) {
        botToggle.addEventListener("click", () => {
            botWindow.classList.toggle("active");
        });

        closeBot.addEventListener("click", () => botWindow.classList.remove("active"));

        botOptions.addEventListener("click", (e) => {
            if (!e.target.classList.contains("option-btn")) return;

            const userChoiceText = e.target.textContent;
            const nextStep = e.target.getAttribute("data-next");

            appendMessage(userChoiceText, "user-msg");
            botOptions.style.display = "none";

            setTimeout(() => {
                if (nextStep === "civile") {
                    appendMessage("Lo Studio ha una quindicennale esperienza in contrattualistica, risarcimento danni e diritto di famiglia. Può fissare un incontro strategico sul calendario del sito.", "bot-msg");
                } else if (nextStep === "tributario") {
                    appendMessage("In materia fiscale e di contenziosi tributari, offriamo una consulenza altamente specializzata. Consigliamo di riservare tempestivamente uno slot per analizzare gli atti.", "bot-msg");
                } else {
                    appendMessage("Seguiamo le aziende nelle procedure fallimentari e di ristrutturazione debito. Può fissare direttamente una prima sessione di analisi sul nostro calendario.", "bot-msg");
                }
                
                setTimeout(() => {
                    appendMessage("<a href='#prenota' style='color:#b45309; font-weight:bold;'>Scegli data e ora nel Calendario ↓</a>", "bot-msg");
                }, 600);
            }, 800);
        });
    }

    function appendMessage(text, className) {
        const msgDiv = document.createElement("div");
        msgDiv.className = `msg ${className}`;
        msgDiv.innerHTML = text;
        botMessages.appendChild(msgDiv);
        botMessages.scrollTop = botMessages.scrollHeight; // Auto-scroll to bottom
    }

    // 4. COOKIE BANNER
    const cookieBanner = document.getElementById("cookieBanner");
    const acceptCookies = document.getElementById("acceptCookies");

    if(cookieBanner && acceptCookies) {
        if (localStorage.getItem("studioCookiesAccepted") === "true") {
            cookieBanner.style.display = "none";
        }

        acceptCookies.addEventListener("click", () => {
            localStorage.setItem("studioCookiesAccepted", "true");
            cookieBanner.style.display = "none";
        });
    }

    // 🌟 5. SCROLL ANIMATION LOGIC (Adds "Живість") 🌟
    const animatedElements = document.querySelectorAll('.scroll-anim, .card-anim, .item-anim');

    if(animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Once animated, no need to watch again
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15, // Trigger when 15% of element is visible
            rootMargin: '0px 0px -50px 0px' // Offset to trigger a bit later
        });

        animatedElements.forEach((el) => {
            observer.observe(el);
        });
    }
});
