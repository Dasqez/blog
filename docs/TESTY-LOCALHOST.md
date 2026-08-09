# Testy localhost przed wydaniem

## Przygotowanie

1. Uruchom `npm run check`.
2. Uruchom `npm run start`.
3. Otwórz `http://localhost:8080` oraz `http://localhost:8080/admin/`.
4. W DevTools sprawdź, czy konsola nie zawiera nieobsłużonych błędów.

## Blog publiczny

- strona główna, wpisy i strony statyczne otwierają się poprawnie,
- menu zachowuje kolejność ustawioną w CMS,
- wyszukiwarka wpisów działa,
- obrazy, logo, favicon, slogan i ikony social respektują ustawienia widoczności,
- jasny, ciemny i systemowy motyw działają zgodnie z ustawieniami,
- `robots.txt` i `sitemap.xml` odpowiadają kodem 200.

## Panel CMS

- logowanie, odświeżenie karty i wylogowanie działają,
- Dashboard pokazuje aktualne liczniki,
- można utworzyć, edytować, zapisać i usunąć wpis testowy,
- tagi, wersja robocza, podgląd, SEO i historia zachowują dane,
- można utworzyć, duplikować, przesunąć, przywrócić i usunąć stronę testową,
- biblioteka obsługuje wysyłanie wielu zdjęć, anulowanie, zaznaczanie i zbiorcze usuwanie,
- pasek postępu wysyłania i usuwania kończy operację oraz nie blokuje panelu,
- test newslettera trafia do historii bez odświeżania,
- wyszukiwarka globalna znajduje wpisy, strony, media, newslettery i subskrybentów,
- backup pełny pobiera jedno archiwum ZIP z czterema plikami,
- ustawienia zapisują się i aktualizują podgląd strony.

## Responsywność i dostępność

- sprawdź panel przy szerokościach około 375, 768 i 1440 px,
- przejdź po głównych elementach klawiszem Tab,
- sprawdź skróty `Ctrl+K`, `Ctrl+S`, `?` i `Shift+D`,
- sprawdź jasny i ciemny motyw panelu,
- włącz ograniczenie animacji w systemie i potwierdź brak zbędnych przejść.

## Produkcja po wdrożeniu

- sprawdź Cloudflare Pages i Worker bez używania danych z cache,
- wykonaj test logowania błędnym kluczem oraz poprawnym kluczem,
- potwierdź odświeżenie tokenu i zakończenie sesji po wylogowaniu,
- sprawdź, czy błędy Workera mają `requestId`, ale nie ujawniają sekretów,
- zweryfikuj stronę publiczną na telefonie i komputerze.
