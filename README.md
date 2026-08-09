# Minimalistycznie Przez Życie

Blog oparty na Eleventy z własnym panelem CMS oraz Workerem Cloudflare obsługującym D1, repozytorium GitHub, media i newsletter.

## Uruchomienie lokalne

```powershell
npm install
npm run start
```

Blog będzie dostępny pod `http://localhost:8080`, a panel pod `http://localhost:8080/admin/`.

## Kontrola przed wydaniem

```powershell
npm run check
```

Polecenie sprawdza składnię kodu JavaScript panelu, strony, newslettera i modułu bezpieczeństwa Workera, a następnie wykonuje pełny build Eleventy.

## Najważniejsze katalogi

- `admin/` — interfejs panelu CMS,
- `js/panel.js` — logika panelu i komunikacji z API,
- `cloudflare/` — moduły wdrożeniowe kolejnych funkcji Workera,
- `_posts/` — wpisy bloga,
- `_includes/pages/` — strony statyczne,
- `_data/` — publiczne ustawienia oraz kolejność stron,
- `docs/` — architektura, bezpieczeństwo i procedura testów.

## Zasady wydania

1. Uruchomić `npm run check`.
2. Przejść scenariusze z `docs/TESTY-LOCALHOST.md`.
3. Sprawdzić `git diff` i `git status`.
4. Dopiero po akceptacji wykonać commit i push.
5. Zweryfikować zakończenie wdrożenia Cloudflare Pages oraz działanie produkcji.
