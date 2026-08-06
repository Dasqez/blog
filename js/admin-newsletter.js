const ADMIN_API_URL =
  "https://newsletter.dave-pytel.workers.dev/admin/summary";

const loginPanel = document.getElementById("loginPanel");
const dashboard = document.getElementById("dashboard");
const loginForm = document.getElementById("adminLoginForm");
const secretInput = document.getElementById("adminSecret");
const loginMessage = document.getElementById("loginMessage");
const dashboardMessage = document.getElementById("dashboardMessage");
const refreshButton = document.getElementById("refreshButton");
const logoutButton = document.getElementById("logoutButton");
const lastUpdated = document.getElementById("lastUpdated");

let adminSecret = sessionStorage.getItem("mpzAdminSecret") || "";

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const secret = secretInput.value.trim();

  if (!secret) {
    showMessage(loginMessage, "Wpisz klucz administratora.", "error");
    return;
  }

  adminSecret = secret;
  await openDashboard();
});

refreshButton.addEventListener("click", async () => {
  await loadSummary();
});

logoutButton.addEventListener("click", () => {
  adminSecret = "";
  sessionStorage.removeItem("mpzAdminSecret");
  dashboard.hidden = true;
  loginPanel.hidden = false;
  secretInput.value = "";
  secretInput.focus();
  showMessage(loginMessage, "Wylogowano z panelu.", "success");
});

if (adminSecret) {
  openDashboard();
}

async function openDashboard() {
  showMessage(loginMessage, "Sprawdzam dostęp...");

  const success = await loadSummary();

  if (!success) {
    return;
  }

  sessionStorage.setItem("mpzAdminSecret", adminSecret);
  loginPanel.hidden = true;
  dashboard.hidden = false;
  secretInput.value = "";
}

async function loadSummary() {
  setLoading(true);
  showMessage(dashboardMessage, "Pobieram dane...");

  try {
    const response = await fetch(ADMIN_API_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${adminSecret}`,
      },
    });

    const result = await response.json();

    if (!response.ok || result.success !== true) {
      throw new Error(result.message || "Nie udało się pobrać danych.");
    }

    renderSummary(result);

    lastUpdated.textContent =
      `Ostatnia aktualizacja: ${formatDate(new Date().toISOString())}`;

    showMessage(dashboardMessage, "Dane zostały odświeżone.", "success");
    showMessage(loginMessage, "");

    return true;
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Wystąpił nieznany błąd.";

    showMessage(loginMessage, message, "error");
    showMessage(dashboardMessage, message, "error");

    return false;
  } finally {
    setLoading(false);
  }
}

function renderSummary(data) {
  setText("totalSubscribers", data.subscribers.total);
  setText("activeSubscribers", data.subscribers.active);
  setText("pendingSubscribers", data.subscribers.pending);

  setText("totalNewsletters", data.newsletters.total);
  setText("sentDeliveries", data.deliveries.sent);
  setText("failedDeliveries", data.deliveries.failed);
  setText("pendingDeliveries", data.deliveries.pending);

  setText(
    "latestSubscription",
    formatDate(data.subscribers.latestSubscription)
  );

  setText(
    "latestNewsletter",
    formatDate(data.newsletters.latestNewsletter)
  );
}

function setText(elementId, value) {
  const element = document.getElementById(elementId);

  if (element) {
    element.textContent = String(value ?? "—");
  }
}

function formatDate(value) {
  if (!value) {
    return "Brak danych";
  }

  const normalizedValue =
    String(value).includes("T")
      ? String(value)
      : `${String(value).replace(" ", "T")}Z`;

  const date = new Date(normalizedValue);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return new Intl.DateTimeFormat("pl-PL", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Warsaw",
  }).format(date);
}

function showMessage(element, text, type = "") {
  if (!element) {
    return;
  }

  element.textContent = text;
  element.className = "status-message";

  if (type) {
    element.classList.add(type);
  }
}

function setLoading(isLoading) {
  refreshButton.disabled = isLoading;
  refreshButton.textContent = isLoading
    ? "Pobieranie..."
    : "Odśwież";
}