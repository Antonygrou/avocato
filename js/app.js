document.addEventListener("DOMContentLoaded", () => {
    
    // 1. MOBILE MENU BURGER
    const burgerBtn = document.getElementById("burgerBtn");
    const navMenu = document.getElementById("navMenu");

    if(burgerBtn && navMenu) {
        burgerBtn.addEventListener("click", () => navMenu.classList.toggle("active"));
        document.querySelectorAll(".nav-menu a").forEach(link => {
            link.addEventListener("click", () => navMenu.classList.remove("active"));
        });
    }

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

    // 3. REVIEWS SLIDER (NEW LOGIC)
    const slides = document.querySelectorAll(".review-slide");
    const indicators = document.querySelectorAll(".indicator");
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(s => s.classList.remove("active"));
        indicators.forEach(i => i.classList.remove("active"));
        slides[index].classList.add("active");
        indicators[index].classList.add("active");
        currentSlide = index;
    }

    indicators.forEach(indicator => {
        indicator.addEventListener("click", (e) => {
            const slideIndex = parseInt(e.target.getAttribute("data-slide"));
            showSlide(slideIndex);
        });
    });

    // Auto rotate reviews every 6 seconds
    setInterval(() => {
        let next = currentSlide + 1;
        if (next >= slides.length) next = 0;
        showSlide(next);
    }, 6000);

    // 4. SMART ASSISTANT CHATBOT
    const botToggle = document.getElementById("botToggle");
    const botWindow = document.getElementById("botWindow");
    const closeBot = document.getElementById("closeBot");
    const botMessages = document.getElementById("botMessages");
    const botOptions = document.getElementById("botOptions");

    if(botToggle && botWindow && closeBot) {
        botToggle.addEventListener("click", () => botWindow.classList.toggle("active"));
        closeBot.addEventListener("click", () => botWindow.classList.remove("active"));

        botOptions.addEventListener("click", (e) => {
            if (!e.target.classList.contains("option-btn")) return;
            const choiceText = e.target.textContent;
            const nextStep = e.target.getAttribute("data-next");

            const userMsg = document.createElement("div");
            userMsg.className = "msg user-msg";
            userMsg.textContent = choiceText;
            botMessages.appendChild(userMsg);
            botOptions.style.display = "none";

            setTimeout(() => {
                const reply = document.createElement("div");
                reply.className = "msg bot-msg";
                if(nextStep === "civile") {
                    reply.innerHTML = "Lo Studio ha una profonda esperienza in contratti, risarcimento danni e diritto familiare. Vi consigliamo di richiedere un incontro compilando il modulo qui sotto.";
                } else if(nextStep === "tributario") {
                    reply.innerHTML = "Per questioni fiscali analizziamo avvisi di accertamento e cartelle. Compila il nostro modulo per inviare i dettagli alla segreteria.";
                } else {
                    reply.innerHTML = "Seguiamo le ristrutturazioni societarie e i piani di rientro. Richiedi subito un appuntamento scorrendo il sito.";
                }
                botMessages.appendChild(reply);
                botMessages.scrollTop = botMessages.scrollHeight;
            }, 800);
        });
    }

    // 5. SCROLL ANIMATIONS
    const animatedElements = document.querySelectorAll('.scroll-anim, .card-anim, .item-anim');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach((el) => observer.observe(el));
});
