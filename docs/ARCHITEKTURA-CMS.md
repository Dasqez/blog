# Architektura CMS

## Komentarze

- Publiczne trasy `GET /comments` i `POST /comments` obsługuje główny Worker newslettera, a dane trafiają do tabel `comments` i `comment_rate_limits` w D1.
- Nowe komentarze zawsze otrzymują status `pending`; publiczne API zwraca wyłącznie rekordy `approved`.
- Panel CMS korzysta z chronionych sesją tras `/admin/comments` oraz `/admin/comment/*` do moderacji, odpowiedzi autora i usuwania.
- `TURNSTILE_SECRET_KEY` należy ustawić jako sekret Workera, a publiczny klucz widgetu w `site.comments.turnstileSiteKey`. Bez sekretu Worker nadal stosuje honeypot, walidację, ograniczenie domen i limit trzech komentarzy na dziesięć minut.
- Opcjonalny sekret `COMMENT_HASH_SECRET` służy do tworzenia nieodwracalnego skrótu źródła na potrzeby limitów. Pełne adresy IP nie są zapisywane.

## Przepływ danych

Panel pod `/admin/` komunikuje się z Workerem `newsletter.dave-pytel.workers.dev`. Worker odpowiada za autoryzację administratora, dane D1, operacje na repozytorium GitHub, media, newslettery, backup i ustawienia.

Publiczny blog jest budowany przez Eleventy. Wpisy pochodzą z `_posts`, strony z `_includes/pages`, a ustawienia publiczne z `_data/site.json`.

## Sesja administratora

- panel rozpoczyna sesję przez `/admin/session`,
- token dostępu jest krótko ważny i automatycznie odświeżany,
- wszystkie chronione wywołania przechodzą przez `adminApiFetch`,
- odpowiedź 401 powoduje jedną próbę odświeżenia, a następnie bezpieczne wylogowanie,
- bezczynność przez 30 minut lub przekroczenie 8 godzin kończy sesję,
- do czasu wdrożenia endpointów Etapu 12 panel obsługuje tryb zgodności ze starszym Workerem.

## Moduły Workera

Pliki `cloudflare/worker-stage*.js` dokumentują i dostarczają funkcje dodawane do głównego Workera w panelu Cloudflare. Nie są samodzielnymi wdrożeniami. `worker-stage12-security.js` wymaga podłączenia tras sesji na początku `fetch()` oraz zastosowania asynchronicznej autoryzacji przy chronionych trasach.

## Dane wrażliwe

Sekrety Workera nie mogą trafiać do repozytorium, eksportu ustawień ani kodu przeglądarki. Tabele sesji D1 przechowują wyłącznie skróty tokenów. Backup D1 może zawierać dane osobowe subskrybentów i powinien być przechowywany w bezpiecznym miejscu.
