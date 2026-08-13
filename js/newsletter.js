"use strict";

// Wklej tutaj pełny adres Workera i zostaw /newsletter na końcu.
const NEWSLETTER_WORKER_URL = "https://newsletter.dave-pytel.workers.dev/newsletter";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("newsletterForm");
    if (!form) return;

    const emailInput = document.getElementById("newsletterEmail");
    const websiteInput = document.getElementById("newsletterWebsite");
    const button = document.getElementById("newsletterButton");
    const message = document.getElementById("newsletterMessage");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        message.textContent = "";
        message.className = "newsletter-message";

        // Niewidoczne pole-pułapka na proste boty.
        if (websiteInput.value.trim() !== "") return;

        if (!emailInput.checkValidity()) {
            showMessage("Wpisz poprawny adres e-mail.", "error");
            emailInput.focus();
            return;
        }

        button.disabled = true;
        button.textContent = "Zapisywanie...";

        const requestController = new AbortController();
        const requestTimeout = window.setTimeout(() => requestController.abort(), 15000);

        try {
            const response = await fetch(NEWSLETTER_WORKER_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: emailInput.value.trim() }),
                signal: requestController.signal,
            });

            const result = await response.json();

            if (!response.ok || result.success !== true) {
                throw new Error(result.message || "Nie udało się zapisać do newslettera.");
            }

            showMessage(
                result.message || "Dziękuję! Twój adres został zapisany.",
                "success",
                "Sprawdź swoją skrzynkę e-mail i kliknij link, aby potwierdzić zapis."
            );
            form.reset();
        } catch (error) {
            showMessage(
                error.name === "AbortError"
                    ? "Serwer odpowiada zbyt długo. Zapis mógł zostać przyjęty — sprawdź skrzynkę przed ponowną próbą."
                    : (error.message || "Wystąpił błąd. Spróbuj ponownie za chwilę."),
                "error"
            );
        } finally {
            window.clearTimeout(requestTimeout);
            button.disabled = false;
            button.textContent = "Zapisz mnie";
        }
    });

    function showMessage(text, type, confirmationText = "") {
        message.textContent = text;
        message.className = `newsletter-message ${type}`;

        if (confirmationText) {
            const confirmation = document.createElement("strong");
            confirmation.className = "newsletter-confirmation-reminder";
            confirmation.textContent = confirmationText;
            message.append(confirmation);
        }
    }
});
