import fs from "node:fs/promises";
import path from "node:path";

const SITE_URL =
  process.env.SITE_URL || "https://minimalistycznie.pages.dev";

const WORKER_URL = process.env.NEWSLETTER_WORKER_URL || "";
const TRIGGER_SECRET = process.env.NEWSLETTER_TRIGGER_SECRET || "";
const DRY_RUN = process.env.DRY_RUN === "true";

const postFiles = String(process.env.POST_FILES || "")
  .split(/\r?\n/)
  .map((file) => file.trim())
  .filter(Boolean);

if (postFiles.length === 0) {
  console.log("Nie wykryto nowych wpisów. Newsletter nie zostanie wysłany.");
  process.exit(0);
}

if (!DRY_RUN && (!WORKER_URL || !TRIGGER_SECRET)) {
  throw new Error(
    "Brakuje NEWSLETTER_WORKER_URL lub NEWSLETTER_TRIGGER_SECRET."
  );
}

for (const postFile of postFiles) {
  await processPost(postFile);
}

async function processPost(postFile) {
  console.log(`\nPrzetwarzanie wpisu: ${postFile}`);

  const source = await fs.readFile(postFile, "utf8");
  const parsed = parsePost(source);

  if (!parsed.data.title) {
    throw new Error(`Wpis ${postFile} nie ma pola title.`);
  }

  const slug = path.basename(postFile, path.extname(postFile));
  const postUrl = new URL(`/_posts/${slug}/`, SITE_URL).href;
  const postImage = findPostImage(parsed.data.image, parsed.body);

  const payload = {
    postId: slug,
    postTitle: parsed.data.title,
    postUrl,
    postExcerpt: createExcerpt(parsed.body),
    postImage,
  };

  console.log(`Tytuł: ${payload.postTitle}`);
  console.log(`Adres: ${payload.postUrl}`);
  console.log(
    `Zdjęcie: ${payload.postImage || "brak zdjęcia"}`
  );
  console.log(`Opis: ${payload.postExcerpt}`);

  if (DRY_RUN) {
    console.log("Tryb testowy: wiadomość nie została wysłana.");
    return;
  }

  await waitForPublication(postUrl);

  const result = await triggerNewsletter(payload);

  if (result.alreadySent) {
    console.log("Newsletter dla tego wpisu był już wcześniej wysłany.");
    return;
  }

  console.log(
    `Newsletter wysłany. Liczba odbiorców: ${
      result.recipientsCount ?? 0
    }`
  );
}

function parsePost(source) {
  const normalized = source.replace(/\r\n/g, "\n");

  if (!normalized.startsWith("---\n")) {
    return {
      data: {},
      body: normalized,
    };
  }

  const closingMarker = normalized.indexOf("\n---\n", 4);

  if (closingMarker === -1) {
    throw new Error("Nie znaleziono końca front matter.");
  }

  const frontMatterText = normalized.slice(4, closingMarker);
  const body = normalized.slice(closingMarker + 5);
  const data = {};

  for (const line of frontMatterText.split("\n")) {
    const separatorIndex = line.indexOf(":");

    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    let value = line.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    data[key] = value;
  }

  return { data, body };
}

function createExcerpt(body) {
  const excerptSource = body.includes("<!-- more -->")
    ? body.split("<!-- more -->", 1)[0]
    : body;

  return excerptSource
    .replace(/!\[[^\]]*]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/[*_~`>#-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 600);
}

function findPostImage(frontMatterImage, body) {
  const image =
    String(frontMatterImage || "").trim() ||
    findFirstMarkdownImage(body);

  if (!image) {
    return "";
  }

  try {
    return new URL(image, SITE_URL).href;
  } catch {
    console.warn(`Pominięto nieprawidłowy adres zdjęcia: ${image}`);
    return "";
  }
}

function findFirstMarkdownImage(body) {
  const match = body.match(/!\[[^\]]*]\((\S+?)(?:\s+["'][^"']*["'])?\)/);

  return match ? match[1] : "";
}

async function waitForPublication(postUrl) {
  const maximumAttempts = 40;
  const delayMilliseconds = 15_000;

  console.log("Czekam, aż Cloudflare opublikuje wpis...");

  for (let attempt = 1; attempt <= maximumAttempts; attempt++) {
    try {
      const response = await fetch(postUrl, {
        method: "GET",
        redirect: "follow",
        headers: {
          "User-Agent": "MPZ-Newsletter-GitHub-Action",
        },
      });

      if (response.ok) {
        console.log(`Wpis jest dostępny: ${postUrl}`);
        return;
      }

      console.log(
        `Próba ${attempt}/${maximumAttempts}: HTTP ${response.status}`
      );
    } catch (error) {
      console.log(
        `Próba ${attempt}/${maximumAttempts}: ${error.message}`
      );
    }

    if (attempt < maximumAttempts) {
      await sleep(delayMilliseconds);
    }
  }

  throw new Error(
    "Cloudflare nie opublikował wpisu w ciągu 10 minut. Newsletter nie został wysłany."
  );
}

async function triggerNewsletter(payload) {
  const endpoint = new URL("/send-newsletter", WORKER_URL).href;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TRIGGER_SECRET}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const responseText = await response.text();

  let result;

  try {
    result = JSON.parse(responseText);
  } catch {
    throw new Error(
      `Worker nie zwrócił prawidłowego JSON. HTTP ${response.status}: ` +
        responseText.slice(0, 500)
    );
  }

  if (!response.ok || result.success !== true) {
    throw new Error(
      `Worker odrzucił wysyłkę. HTTP ${response.status}: ` +
        (result.message || "Nieznany błąd.")
    );
  }

  return result;
}

function sleep(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}