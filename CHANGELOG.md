# Rejestr zmian

Ten plik opisuje rozwój bloga i panelu CMS. Jest aktualizowany przy każdej zmianie funkcjonalnej, wizualnej, technicznej lub naprawie błędu.

## Niewydane — stan na 2026-08-09

### Panel CMS i zarządzanie treścią

- Dodano prywatnościowy licznik unikalnych wyświetleń wpisów widoczny obok daty publikacji i czasu czytania na stronie głównej oraz wewnątrz artykułu; licznik wykorzystuje D1 i anonimowy skrót lokalnego identyfikatora przeglądarki, bez zapisywania surowego adresu IP.
- Zastąpiono dużą dolną belkę akcji kompaktowym paskiem przyklejonym u góry edytora, który utrzymuje status zapisu oraz przyciski zapisu, anulowania, pełnego ekranu i zamknięcia zawsze pod ręką; układ dopasowuje się do ekranów mobilnych.
- Przyklejono pasek narzędzi Markdown bezpośrednio pod paskiem akcji, dzięki czemu formatowanie treści pozostaje dostępne podczas przewijania edytora.
- W komunikacie po zapisie do newslettera dodano wyraźną, pogrubioną informację o konieczności sprawdzenia skrzynki e-mail i kliknięcia linku potwierdzającego.
- Dodano własny system komentarzy bez logowania: publiczny formularz z nickiem, kolejkę moderacji i odpowiedzi autora w CMS, zapis w D1, bezpieczne renderowanie tekstu, limity częstotliwości, pułapkę na boty, ograniczenie domen oraz opcjonalną ochronę Cloudflare Turnstile; Giscus pozostaje wyłączonym domyślnie trybem awaryjnym.
- Naprawiono lokalny podgląd ochrony komentarzy: localhost korzysta z oficjalnego klucza testowego Turnstile, natomiast publiczny blog nadal używa widgetu ograniczonego do domeny produkcyjnej.
- Zastąpiono techniczny komunikat błędu połączenia komentarzy czytelną informacją o konieczności uruchomienia lokalnego Workera na porcie 8790.
- Naprawiono lokalną moderację komentarzy: panel CMS na localhost korzysta z lokalnego Workera i lokalnej bazy D1, bez zależności od jeszcze niewdrożonych tras produkcyjnych.
- W moderacji komentarzy zastąpiono techniczną ścieżkę wpisu jego pełnym tytułem, z czytelnym tekstem awaryjnym dla brakujących danych.
- Dodano pakiet funkcji dla czytelników: subtelne animacje z obsługą ograniczonego ruchu, pasek postępu czytania i przycisk powrotu na górę, powiązane wpisy oraz galerię zdjęć z podpisami, nawigacją i obsługą klawiatury.
- Przywrócono klasyczny układ strony głównej oraz poprawiono typografię i odstępy wpisu pomiędzy tytułem, datą publikacji i treścią.
- Usunięto sekret Apps Script z konfiguracji Wranglera; wartość jest teraz wymagana jako zaszyfrowany sekret Cloudflare Workera.
- Zintegrowano bezpieczne, krótkotrwałe sesje administratora z głównym Workerem i zastąpiono autoryzację tras administracyjnych stałym kluczem w każdym żądaniu.
- Naprawiono parser metadanych CMS i SEO: obsługuje pełny JSON, w tym zagnieżdżone obiekty, oraz metadane zapisane w dowolnej kolejności na początku wpisu.

- Przyspieszono publiczny zapis do newslettera: Worker odpowiada po zapisaniu adresu w D1, a wiadomość potwierdzającą wysyła w tle, dzięki czemu opóźniona odpowiedź Apps Script nie powoduje fałszywego komunikatu o błędzie; formularz otrzymał również limit czasu żądania.
- Przeniesiono przycisk „Uzupełnij SEO z AI” do nagłówka sekcji „Ocena i wskazówki”, obok przełącznika szczegółów, oraz dopracowano jego układ na mniejszych ekranach.
- Dodano automatyczną ponowną próbę generowania SEO bez wymuszonego schematu, gdy Workers AI nie potrafi spełnić JSON Mode dla konkretnej treści wpisu.

- Dodano bezpłatnego asystenta SEO opartego na Cloudflare Workers AI: przygotowuje propozycje tytułu, opisu, obrazu Open Graph, slugu i tagów, pozwala zastosować wszystkie lub wybrane pola i nigdy nie zapisuje ani nie publikuje wpisu automatycznie.
- Naprawiono generowanie propozycji SEO przez użycie modelu obsługującego wymuszony schemat JSON oraz obsługę zarówno tekstowej, jak i obiektowej odpowiedzi Workers AI.

- Naprawiono wiadomość potwierdzającą zapis do newslettera: zaktualizowano wdrożenie Google Apps Script do szablonu z przyciskiem „Potwierdzam zapis” oraz oddzielono ją od szablonu zwykłego newslettera.
- Dodano klikalny i czytelniejszy licznik subskrybentów na Dashboardzie oraz modal z wyszukiwalną tabelą adresów, dat zapisu i wypisania oraz aktualnych statusów; każdy adres można po potwierdzeniu trwale usunąć z D1.
- Dodano trwałe wersje robocze wpisów: pełna treść Markdown, obrazy, tagi i SEO zapisują się w repozytorium, wpis jest oznaczony w CMS i pozostaje całkowicie wykluczony z publicznego builda do chwili publikacji.
- Naprawiono automatyzację newslettera: zapis wersji roboczej nie uruchamia wysyłki, publikacja draftu wysyła newsletter jeden raz, a późniejsza edycja opublikowanego wpisu nie powoduje ponownej wysyłki.
- Dodano Etap 13 Stabilizacja: scentralizowano chronione wywołania API, usunięto nieużywane moduły starego panelu, dodano kontrolę przed wydaniem oraz dokumentację architektury i testów regresji.
- Dodano Etap 12 Bezpieczeństwo: krótkotrwałe sesje administratora z odświeżaniem i rotacją tokenów, wygasanie po bezczynności, unieważnianie przy wylogowaniu, rate limiting, rozszerzoną walidację żądań i identyfikatory błędów Workera.
- Naprawiono wykrywanie starszej wersji Workera podczas logowania, aby tryb zgodności nie blokował pobierania wpisów przed wdrożeniem endpointów bezpiecznej sesji.
- Dodano graficzny pasek postępu wysyłania obrazów do biblioteki mediów z licznikiem plików, nazwą aktualnie przesyłanego obrazu oraz możliwością anulowania pozostałej kolejki.
- Dodano Etap 11 UX: ciemny motyw panelu, skróty klawiaturowe, menu kontekstowe wpisów i stron, skeleton loading, animacje oraz spójniejsze dialogi i responsywność.
- Dodano natychmiastowy podgląd ustawień na otwartej stronie głównej localhost: motyw, nazwa, slogan, logo, favicona i ikony social reagują na zmiany w panelu przed publikacją.
- Naprawiono brakującą ikonę X przez aktualizację Font Awesome, zabezpieczono puste adresy social media oraz dodano faviconę jako znak graficzny nagłówka, gdy osobne logo nie zostało ustawione.
- Poprawiono podgląd wyboru motywu w ustawieniach CMS: jasny, ciemny i systemowy wariant są widoczne natychmiast przed zatwierdzeniem zmian.
- Dodano niezależne przełączniki widoczności nazwy, sloganu, favicony, logo oraz każdej ikony mediów społecznościowych bez usuwania zapisanych wartości.
- Dodano panel ustawień CMS dla nazwy, sloganu, favicony, logo, social media, Google Analytics, Giscus, newslettera i motywu bloga.
- Dodano zapis publicznej konfiguracji do `_data/site.json` oraz automatyczne wykorzystanie ustawień podczas builda Eleventy.
- Dodano chronione endpointy Workera do pobierania i zapisywania ustawień w repozytorium bez eksportowania sekretów.
- Dodano ekran Backup z osobnym eksportem repozytorium, bazy D1, subskrybentów i publicznych ustawień CMS.
- Dodano pobieranie całego pakietu kopii bezpieczeństwa jednym przyciskiem wraz z paskiem postępu i raportem błędów.
- Dodano chroniony endpoint Workera eksportujący wszystkie tabele D1 do JSON oraz subskrybentów do CSV bez ujawniania sekretów.
- Zmieniono pełny backup tak, aby jednym pobraniem tworzył archiwum ZIP zawierające repozytorium, bazę D1, subskrybentów i ustawienia.
- Dodano globalną wyszukiwarkę administratora przeszukującą wpisy, strony, media, newslettery i subskrybentów.
- Dodano grupowanie wyników, obsługę klawiatury, skrót `Ctrl/Cmd + K` oraz przechodzenie bezpośrednio do znalezionej treści.
- Dodano chroniony endpoint Workera udostępniający panelowi listę subskrybentów do wyszukiwania.
- Zwiększono odstęp między globalną wyszukiwarką a statusem połączenia, aby pole nie nachodziło na ikonę statusu.
- Dodano Etap 7 SEO: edycję tytułu i opisu SEO, obrazu Open Graph, canonical, robots oraz rodzaju Twitter Card w edytorze wpisu.
- Dodano analizę SEO przed zapisem z oceną długości tytułu i opisu, obecności obrazu, ustawień indeksowania oraz poprawności canonical.
- Dodano generowanie metatagów description, canonical, Open Graph, Twitter Card i danych schema.org dla wpisów.
- Dodano automatyczne pliki `sitemap.xml` i `robots.txt`, wykluczenie panelu administratora oraz pomijanie wpisów `noindex` w mapie strony.
- Naprawiono błędne uruchamianie ostrzeżenia SEO przy logowaniu i nawigacji; analiza pojawia się teraz wyłącznie przed zapisem wpisu.
- Naprawiono przeskakiwanie edytora podczas wpisywania metadanych SEO przez oddzielenie podglądu SEO od pełnego renderowania Markdown.
- Rozdzielono wygląd edytorów wpisów i stron: wpisy korzystają z jasnego, typograficznego trybu Markdown z miękkim zawijaniem, a strony z ciemnego edytora kodu HTML/Liquid bez zawijania.
- Poprawiono walidację newslettera: wymagane są wpis, tytuł i własny opis, a przy wysyłce testowej także prawidłowy adres e-mail.
- Usunięto automatyczne kopiowanie treści wpisu do opisu newslettera, poprawiono bezwzględny adres wpisu oraz dodano wyraźny komunikat udanej wysyłki.
- Dodano testowe wysyłki do historii newsletterów i automatyczne odświeżanie historii bez przeładowania panelu.
- Naprawiono dane techniczne wysyłki testowej: Worker przekazuje pełny adres wypisania, identyfikator wpisu oraz bezpieczny obraz zastępczy, gdy kampania nie ma własnej grafiki.
- Rozbudowano sekcję newslettera o wybór wpisu, edycję danych kampanii, podgląd wizualny i kod HTML wiadomości.
- Dodano wysyłkę testową, właściwą wysyłkę do subskrybentów, kolejkę, historię oraz możliwość ponownego wysłania newslettera.
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
