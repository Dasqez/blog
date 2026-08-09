# Roadmapa rozwoju bloga i CMS

Roadmapa jest realizowana etapami. Po każdym etapie aktualizujemy dokumentację i `CHANGELOG.md`, wykonujemy testy na localhost, a commit oraz push następują dopiero po akceptacji testów przez użytkownika.

## Etap 1 — profesjonalny edytor stron

Status: gotowy do testów na localhost.

- podgląd strony wykorzystujący rzeczywiste style i układ publicznego bloga,
- poprawne rozwiązywanie obrazów w podglądzie,
- kolorowanie składni HTML, Liquid i Markdown,
- numeracja linii, wyszukiwanie i zamiana oraz historia cofania,
- automatyczne domykanie tagów HTML i skróty klawiaturowe,
- widok kodu, widok dzielony i sam podgląd,
- pełnoekranowy edytor,
- wykrywanie niezapisanych zmian,
- lokalny autosave i przywracanie wersji roboczej,
- zachowanie istniejącej obsługi wpisów, stron i biblioteki mediów.

## Etap 2 — Media Library

Status: gotowy do testów na localhost.

- wyszukiwanie, filtrowanie według typu oraz sortowanie biblioteki,
- wielokrotny upload przez wybór plików i przeciąganie,
- szczegóły pliku, kopiowanie danych, pobieranie, usuwanie i pełnoekranowy podgląd,
- wstawianie obrazów do wpisów Markdown oraz stron HTML/Liquid,
- przeciąganie obrazów do edytora i zmiana ich szerokości w podglądzie,
- obsługa klawiatury oraz czytelne stany postępu, zaznaczenia i fokusu,
- audyt regresji funkcji biblioteki istniejących przed rozpoczęciem etapu.

## Etap 3 — wpisy, tagi i czas czytania

Status: gotowy do testów na localhost.

- rozwinięte zarządzanie wpisami,
- tagi widoczne w CMS, na stronie głównej i przy wpisie,
- automatyczny czas czytania widoczny w CMS, na stronie głównej i przy wpisie.

## Etap 3.5 — Quality Writing Toolkit

Status: gotowy do testów na localhost.

- analiza SEO i czytelności,
- analiza nagłówków i brakujących tekstów alternatywnych,
- sprawdzanie linków i ostrzeżenia o dużych obrazach,
- podgląd Open Graph,
- zbiorcza ocena jakości treści.

## Etap 4 — Strony

Status: gotowy do testów na localhost.

- tworzenie, usuwanie i duplikowanie stron,
- trwała zmiana kolejności stron,
- podgląd zmian w edytorze,
- historia wersji z możliwością rollbacku.

## Etap 5 — Dashboard CMS

Status: gotowy do testów na localhost.

- liczniki wpisów, stron, obrazów i subskrybentów,
- ostatnio edytowane wpisy i ostatnia wysyłka newslettera,
- statystyki struktury treści, dostarczalności i aktywności subskrybentów,
- szybkie akcje prowadzące do najważniejszych sekcji CMS.

## Etap 6 — Newsletter

Status: gotowy do testów na localhost.

- wizualny podgląd wiadomości i podgląd HTML,
- testowa wysyłka na wskazany adres,
- kolejka i historia newsletterów,
- ponowna wysyłka oraz statystyki dostarczeń.

## Etap 7 — SEO

Status: gotowy do testów na localhost.

- edycja tytułu, opisu, obrazu Open Graph, canonical, robots i Twitter Card,
- automatyczne metatagi Open Graph i Twitter oraz dane schema.org dla wpisów,
- generowanie `sitemap.xml` i `robots.txt`,
- analiza SEO z ostrzeżeniem przed zapisem wpisu.

## Etap 8 — Wyszukiwarka administratora

Status: gotowy do testów na localhost.

- jedno pole wyszukujące wpisy, strony, media, newslettery i subskrybentów,
- grupowanie wyników według rodzaju danych,
- nawigacja klawiaturą oraz skrót `Ctrl/Cmd + K`,
- bezpośrednie przejście z wyniku do właściwej sekcji CMS.

## Etap 9 — Backup

Status: gotowy do testów na localhost.

- eksport repozytorium jako archiwum ZIP,
- pełny eksport tabel bazy D1 do JSON,
- eksport subskrybentów do CSV,
- eksport publicznych ustawień bez sekretów,
- pobieranie całego pakietu z widocznym postępem.

## Etap 10 — Ustawienia CMS

Status: gotowy do testów na localhost.

- nazwa bloga, slogan, favicon i logo,
- linki social media oraz Google Analytics,
- konfiguracja Giscus i newslettera,
- wybór jasnego, ciemnego lub automatycznego motywu,
- zapis publicznej konfiguracji do repozytorium bez sekretów.

## Etap 11 — UX

Status: gotowy do testów na localhost.

- powiadomienia toast, animacje i skeleton loading,
- spójniejsze okna dialogowe,
- jasny i ciemny motyw panelu zapamiętywany lokalnie,
- skróty klawiaturowe oraz ich podręczna lista,
- menu kontekstowe wpisów i stron,
- poprawiona responsywność panelu i obsługa ograniczonych animacji.
