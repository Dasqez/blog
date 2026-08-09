# Rejestr zmian

Ten plik opisuje rozwój bloga i panelu CMS. Jest aktualizowany przy każdej zmianie funkcjonalnej, wizualnej, technicznej lub naprawie błędu.

## Niewydane — stan na 2026-08-09

### Panel CMS i zarządzanie treścią

- Rozbudowano dashboard CMS o liczniki wpisów, stron, obrazów, subskrybentów i wysłanych newsletterów.
- Dodano wielokrotne zaznaczanie obrazów w bibliotece mediów za pomocą `Ctrl`/`Cmd`, widoczne znaczniki wyboru oraz grupowe usuwanie z postępem i jednym potwierdzeniem.
- Dodano widoczny postęp grupowego usuwania w głównej części biblioteki oraz 30-sekundowy limit oczekiwania na każdy plik, aby operacja nie wyglądała na zawieszoną.
- Zastąpiono sekwencyjne usuwanie mediów jednym zbiorczym commitem GitHuba oraz dodano graficzne okno postępu z paskiem i możliwością anulowania żądania.
- Wyśrodkowano całą kartę pustej biblioteki mediów w dostępnej przestrzeni, wraz z ikoną, nagłówkiem, opisem i bezpiecznymi odstępami.
- Dodano zestawienie ostatnio edytowanych wpisów, ostatniej wysyłki oraz wizualne statystyki struktury treści, dostarczalności i aktywnych subskrypcji.
- Naprawiono niewidoczną wartość licznika newsletterów i ujednolicono jego kartę z pozostałymi elementami dashboardu na białym tle.
- Ujednolicono kolejność stron w CMS z publiczną nawigacją: Strona główna jest przypięta na pierwszej pozycji, a pozostałe strony zachowują kolejność zapisaną w panelu.
- Naprawiono publikację nowych stron: operacje tworzenia, duplikowania, usuwania i zmiany kolejności synchronizują teraz nawigację oraz sekcje publicznej strony głównej.
- Dodano ponawianie zapisu publicznego `index.html` po konflikcie wersji GitHuba oraz przerwano zgłaszanie sukcesu, gdy synchronizacja strony faktycznie się nie powiedzie.
- Naprawiono brakujący cudzysłów w generowanych klasach sekcji publicznych, który powodował uszkodzenie układu strony, oraz dodano walidację HTML przed zapisem.
- Poprawiono pole slugu strony, aby podczas wpisywania można było pozostawić myślnik na końcu i kontynuować nazwę.
- Naprawiono zablokowany przycisk „Utwórz stronę” i zastąpiono mylący kursor ładowania przy nieaktywnych akcjach stron czytelnym stanem niedostępności.

- Rozbudowano zarządzanie stronami o tworzenie, usuwanie, duplikowanie i trwałą zmianę kolejności.
- Dodano historię wersji stron z możliwością przywrócenia wybranej wersji jako nowego commita.
- Dodano czytelne okno historii oraz przyciski operacji na stronie w panelu CMS.

- Rozszerzono zarządzanie wpisami o edycję tagów, ich zapis w API oraz obsługę w lokalnych szkicach.
- Dostosowano zapis tagów do istniejącego API Workera przez niewidoczne metadane w treści wpisu oraz dodano ich natychmiastowy zapis w szkicu lokalnym.
- Dodano tagi i automatyczny czas czytania na liście oraz w podglądzie wpisów w CMS.
- Dodano tagi i automatyczny czas czytania na stronie głównej oraz przy pełnej treści wpisu.
- Dodano obsługę tworzenia nowych wpisów oraz edycji istniejących wpisów z poziomu panelu.
- Dodano osobny widok zarządzania stronami statycznymi.
- Dodano pobieranie, wyszukiwanie, wybieranie i edycję stron HTML/Liquid.
- Edytor automatycznie rozpoznaje typ treści i przełącza interfejs między trybem Markdown a HTML/Liquid.
- Pola niepotrzebne podczas edycji stron, takie jak slug, data i layout wpisu, są automatycznie ukrywane.
- Dodano zapis stron przez API wraz z aktualizacją identyfikatora wersji pliku.
- Zachowano ostrzeżenia o publikacji nowej wersji strony po zapisaniu zmian.

### Edytor treści

- Dodano Quality Writing Toolkit z punktową oceną jakości, analizą SEO i czytelności oraz zaleceniami aktualizowanymi podczas pisania.
- Dodano kontrolę długości tytułu i opisu, liczby słów, struktury nagłówków, długości zdań, tekstów alternatywnych, linków i obrazów powyżej 1 MB.
- Dodano podgląd Open Graph wykorzystujący aktualny tytuł, opis i slug wpisu.
- Przeprojektowano Toolkit jako zwijany, kompaktowy panel i naprawiono nakładanie go na kolumny kodu oraz podglądu.
- Zastąpiono zawodny natywny mechanizm zwijania własnym, zawsze widocznym nagłówkiem i przyciskiem pokazywania szczegółów.
- Zablokowano kurczenie panelu jakości do zerowej wysokości wewnątrz elastycznego układu edytora.
- Dodano numerację linii zsynchronizowaną z przewijaniem edytora kodu.
- Dodano automatyczne domykanie wpisywanych tagów HTML z pominięciem elementów pustych, takich jak `img`, `br` i `input`.
- Wyłączono zawijanie długich linii w trybie kodu, aby numeracja, zaznaczenie i warstwa kolorowania pozostawały zsynchronizowane.
- Dodano pełnoekranowy tryb edytora z możliwością szybkiego powrotu do widoku panelowego.
- Dodano trzy tryby przestrzeni roboczej: tylko kod, kod z podglądem oraz tylko podgląd.
- Dodano dynamiczną etykietę formatu: „Markdown” dla wpisów oraz „HTML / Liquid” i „Kod strony” dla stron.
- Rozbudowano pasek narzędzi Markdown o:
  - pogrubienie,
  - kursywę,
  - nagłówki,
  - cytaty,
  - listy punktowane i numerowane,
  - linki,
  - obrazy,
  - kod liniowy i blokowy,
  - separatory.
- Dodano narzędzia właściwe dla HTML/Liquid:
  - akapit `<p>`,
  - sekcję `<section>`,
  - zmienną `{{ }}`,
  - blok warunkowy `{% if %}`.
- Dodano podświetlanie składni Markdown, HTML i Liquid w edytorze źródłowym.
- Zsynchronizowano przewijanie warstwy podświetlenia z polem edycji.
- Dodano statystyki treści: liczbę słów, znaków i szacowany czas czytania.
- Dodano automatyczny spis nagłówków Markdown i HTML.
- Wybranie nagłówka ze spisu przenosi kursor i przewija edytor do odpowiedniej sekcji.
- Dodano wyszukiwanie i zamianę w treści:
  - licznik wyników,
  - przechodzenie do następnego i poprzedniego trafienia,
  - zamianę pojedynczego wystąpienia,
  - zamianę wszystkich wystąpień,
  - skrót `Ctrl+H`.
- Dodano obsługę klawisza Tab wewnątrz edytora kodu.
- Rozbudowano skróty klawiaturowe do formatowania, zapisywania i nawigacji.

### Cofanie, ponawianie i bezpieczeństwo zmian

- Dodano własną historię edytora przechowującą do 100 stanów treści.
- Dodano przyciski cofania i ponawiania.
- Dodano skróty `Ctrl+Z`, `Ctrl+Shift+Z` oraz `Ctrl+Y`.
- Dodano wykrywanie niezapisanych zmian na podstawie stanu początkowego edytora.
- Dodano ostrzeżenie przed zamknięciem karty przeglądarki z niezapisanymi zmianami.
- Dodano potwierdzenie przed zamknięciem edytora, gdy treść została zmodyfikowana.
- Dodano automatyczny zapis lokalnej wersji roboczej po okresie bezczynności.
- Dodano możliwość przywrócenia zgodnego szkicu po ponownym otwarciu edytora.
- Szkice są przypisywane do konkretnego typu treści, trybu oraz ścieżki pliku.
- Po poprawnym zapisie właściwy szkic lokalny jest usuwany.
- Dodano czytelny status edytora:
  - zapisano,
  - niezapisane zmiany,
  - zapisywanie,
  - szkic zapisany lokalnie,
  - przywrócony szkic,
  - błąd zapisu.

### Podgląd treści

- Dodano podgląd na żywo aktualizowany podczas pisania.
- Dodano przełączniki szerokości podglądu: desktop, tablet i telefon.
- Dla stron HTML/Liquid dodano podgląd w ramce wykorzystującej rzeczywiste style bloga.
- Podgląd stron zawiera nagłówek, nawigację i układ witryny, dzięki czemu lepiej odpowiada finalnej publikacji.
- Dodano uproszczoną interpretację zmiennych, filtrów, instrukcji warunkowych i bloków Liquid na potrzeby lokalnego podglądu.
- Dodano bezpieczne oczyszczanie generowanego podglądu.
- Poprawiono wysokość i przewijanie kolumn kodu oraz podglądu.
- Poprawiono responsywność edytora na mniejszych ekranach.

### Obrazy i elementy WYSIWYG

- Dodano wybieranie obrazu bezpośrednio z biblioteki mediów.
- Dodano wstawianie wybranego obrazu do aktualnie otwartego wpisu lub strony.
- Dodano przeciąganie obrazów z biblioteki do edytora.
- Dodano zaznaczanie obrazów w podglądzie.
- Dodano wizualny uchwyt do zmiany szerokości obrazu.
- Zmiana szerokości w podglądzie aktualizuje odpowiadający zapis Markdown lub HTML.
- Obraz Markdown może zostać automatycznie zamieniony na znacznik HTML z atrybutem `width`.
- Dodano obsługę obrazów już zapisanych jako znaczniki HTML.

### Biblioteka mediów

- Naprawiono puste miniatury świeżo dodanych obrazów przez natychmiastowy lokalny podgląd wybranego pliku, bez zmieniania adresów istniejących mediów.
- Poprawiono pobieranie obrazów z zewnętrznej domeny, aby przycisk „Pobierz” zapisywał plik zamiast otwierać go w karcie przeglądarki.
- Naprawiono działanie statycznych kontrolek filtrowania, sortowania i pełnoekranowego podglądu obrazu.
- Obrazy wstawiane do stron HTML/Liquid korzystają teraz ze znacznika `<img>` zamiast składni Markdown.
- Dodano komunikaty postępu wielokrotnego uploadu oraz klawiaturowe otwieranie wyboru plików w strefie dodawania.
- Usunięto awaryjne generowanie kontrolek i stylów biblioteki przez JavaScript, pozostawiając interfejs w docelowych plikach HTML i CSS.
- Rozbudowano bibliotekę o filtrowanie według typu pliku.
- Dodano sortowanie według daty, nazwy i rozmiaru.
- Dodano wielokrotny upload plików graficznych.
- Dodano szczegóły pliku: nazwę, adres URL, rozmiar, format i wymiary.
- Dodano pełnoekranowy podgląd obrazu.
- Dodano kopiowanie nazwy i adresu obrazu.
- Dodano pobieranie oraz usuwanie wybranego pliku.
- Dodano obsługę klawiatury w siatce mediów:
  - poruszanie się strzałkami,
  - wstawianie klawiszem Enter,
  - usuwanie klawiszem Delete,
  - kopiowanie adresu skrótem klawiaturowym.
- Dodano wyraźne stany zaznaczenia, fokusu i celu przeciągania.

### Dashboard

- Dodano sekcję szybkich działań prowadzącą do:
  - utworzenia nowego wpisu,
  - listy wpisów,
  - listy stron,
  - biblioteki mediów.
- Dodano listę pięciu ostatnio aktualizowanych wpisów i stron.
- Elementy z listy można otworzyć bezpośrednio w odpowiednim edytorze.
- Dodano liczniki wszystkich wpisów i stron.
- Zachowano podsumowanie subskrybentów, newsletterów i dostarczeń.
- Poprawiono responsywny układ kart i szybkich działań.

### Interfejs i dostępność

- Dodano opisy `aria-label`, stany `aria-pressed` oraz komunikaty `aria-live` dla nowych kontrolek.
- Poprawiono etykiety narzędzi zależnie od edytowanego formatu.
- Poprawiono odstępy, szerokości przycisków HTML/Liquid i położenie statusu zapisu.
- Dodano czytelne stany aktywne dla trybów edytora i urządzeń podglądu.
- Ujednolicono komunikaty sukcesu, błędów i informacji za pomocą toastów.

### Weryfikacja

- Wyłączono pliki `CHANGELOG.md` i `AGENTS.md` z przetwarzania przez Eleventy, aby przykłady składni Liquid w dokumentacji nie były interpretowane jako szablony witryny.
- Wszystkie dotychczasowe zmiany przechodzą kontrolę składni JavaScript.
- Projekt buduje się poprawnie za pomocą Eleventy 3.1.6.
- Panel był regularnie sprawdzany lokalnie pod adresem `http://127.0.0.1:8081/admin/`.
- Po ostatniej weryfikacji przeglądarka nie zgłaszała błędów konsoli związanych z nowymi elementami.
- Zgodnie z ustaleniem zmiany pozostają niecommitowane i nie zostały wypchnięte do zdalnego repozytorium.

## Zasady prowadzenia rejestru

- Każda kolejna zmiana w projekcie musi zostać opisana w sekcji „Niewydane”.
- Wpis powinien być zrozumiały dla osoby nietechnicznej i wskazywać efekt dla użytkownika.
- Naprawy błędów, zmiany interfejsu, funkcje, zmiany API i istotne prace techniczne należy opisywać osobno.
- Przy przygotowaniu wydania zawartość sekcji „Niewydane” należy przenieść do sekcji oznaczonej numerem wersji i datą.
