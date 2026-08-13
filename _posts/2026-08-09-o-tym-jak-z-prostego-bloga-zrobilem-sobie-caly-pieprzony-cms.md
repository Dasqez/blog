---
title: O tym, jak z prostego bloga zrobiłem sobie cały pieprzony CMS.
layout: post-layout.html
date: 2026-08-09T15:25:00.000+02:00
---
<!-- cms-status: draft -->
<!-- cms-tags: ["CMS","blog","programowanie","AI"] -->
<!-- cms-seo: {"title":"O tym, jak z prostego bloga zrobiłem sobie cały pieprzony CM","description":"O tym, jak z prostego bloga zrobiłem sobie cały pieprzony CMS","image":"/assets/images/20260809-134146-dashboard.png","canonical":"","robots":"index,follow","twitterCard":"summary_large_image"} -->

Dzień dobry. Pamiętacie jeszcze ten moment, kiedy pisałem, że chciałem sobie zrobić małego, prostego bloga? Takiego minimalistycznego. Bez WordPressa, bez gotowych szablonów, bez płatnego hostingu i bez miliona niepotrzebnych funkcji. Ot, kilka plików, parę wpisów i święty spokój.

No.

To teraz mam własny CMS z biblioteką mediów, newsletterem, analizą SEO, backupami, historią wersji, globalną wyszukiwarką, panelem ustawień, zabezpieczonymi sesjami i narzędziem, które przed publikacją wpisu potrafi mi jeszcze powiedzieć, że tytuł jest do dupy.

Czyli, krótko mówiąc, minimalizm poszedł się jebać.

Ale może po kolei.

<!-- more -->

## Na początku był plik HTML
Pierwsza wersja tej strony była tak prosta, że właściwie trudno ją było zepsuć. Był `index.html`, trochę CSS-a, kilka sekcji i dwa wpisy. Wszystko wrzucone na GitHuba, podpięte do Cloudflare Pages i — ku mojemu szczeremu zdziwieniu — działające.

I to już wtedy było dla mnie małe zwycięstwo. Jeszcze chwilę wcześniej GitHub kojarzył mi się głównie z miejscem, z którego pobiera się jakieś dziwne pliki do konsoli, a Cloudflare brzmiał jak technologia pozwalająca NASA sterować pogodą. Tymczasem nagle miałem własną stronę dostępną w internecie.

Problem polegał na tym, że dodanie wpisu nadal oznaczało grzebanie bezpośrednio w plikach. A ja chciałem pisać, nie za każdym razem odprawiać rytuał programistyczny z otwieraniem Markdowna, poprawianiem metadanych, pilnowaniem nazw plików i zastanawianiem się, czy przypadkiem jednym przecinkiem nie rozjebię całej strony.

No więc powiedziałem sobie: przydałby się prosty panel. I tutaj, jak zwykle, zaczęły się problemy.

## Prosty panel, mówiłem!
Założenie było niewinne. Loguję się, klikam „Nowy wpis”, piszę, zapisuję i koniec. Co może pójść nie tak?

Otóż wszystko.

Najpierw trzeba było jakoś zapisywać treść do repozytorium. Potem pobierać istniejące wpisy. Potem je edytować. Potem usuwać. Do tego przydałby się podgląd, bo pisanie w ciemno jest równie przyjemne jak składanie szafy z Ikei bez instrukcji i z trzema śrubkami, które zostały po wszystkim.

Skoro jest podgląd, to powinien wyglądać tak samo jak prawdziwa strona. Skoro wpis ma zdjęcia, potrzebna jest biblioteka mediów. Skoro jest biblioteka, to wypadałoby mieć miniatury, wyszukiwanie, sortowanie, przeciąganie plików, kopiowanie adresów i wstawianie obrazu do tekstu bez ręcznego klepania ścieżki.

I tak oto „prosty panel” zaczął puchnąć.

Nie żeby mi to przeszkadzało. Wręcz przeciwnie. W pewnym momencie zorientowałem się, że budowanie samego narzędzia zaczęło mnie bawić prawie tak samo jak prowadzenie bloga. Każda nowa funkcja rozwiązywała jakiś mój prawdziwy problem, po czym natychmiast tworzyła trzy kolejne pomysły. Klasyka.

## Trzynaście etapów szaleństwa
Żeby nie dorzucać wszystkiego losowo, powstała roadmapa. Trzynaście etapów. Brzmiało rozsądnie, profesjonalnie i niemal tak, jakbym wiedział, co robię. No, dokładnie, kurwa - niemal.

Pierwszy etap dotyczył edytora. Dostałem podgląd na żywo, kolorowanie składni, numerację linii, wyszukiwanie i zamianę, cofanie zmian, skróty klawiaturowe, pełny ekran oraz automatyczny zapis wersji roboczej. Czyli wszystko to, czego potrzebowałem, żeby przypadkowe zamknięcie karty nie zakończyło się serią słów, których nawet ja staram się tutaj nie używać zbyt często. Albo chuj - parafrazując klasyka: "*Ty stara kurwo zmarnowałaś mi dwa dni programowania*".

Potem przyszła biblioteka mediów. Wrzucanie wielu zdjęć naraz, drag and drop, sortowanie, filtrowanie, pełnoekranowy podgląd, zmiana rozmiaru i wstawianie obrazów prosto do wpisu. Nagle zarządzanie zdjęciami przestało przypominać archeologię prowadzoną w katalogu 'zdj' albo inne 'foto'.

Następnie wpisy dostały tagi i automatyczny czas czytania — widoczne nie tylko w panelu, ale też dla czytelnika. Może zwróciliście uwagę. Mała rzecz, a strona od razu zaczęła wyglądać jak coś bardziej kompletnego i yntelygentnego niż zbiór moich internetowych wysrywów.

![20260809-134146-dashboard](/assets/images/20260809-134146-dashboard.png)

Potem doszedł Quality Writing Toolkit. Co, kurwa, doszło? To jest taki moduł, który patrzy na tekst i z kamienną twarzą informuje mnie, że opis [SEO](https://pl.wikipedia.org/wiki/Optymalizacja_dla_wyszukiwarek_internetowych) jest za krótki, brakuje tekstu alternatywnego, nagłówki są źle ułożone, obraz jest wielki jak billboard przy autostradzie informujący o wazektomii, a ogólna jakość wpisu mogłaby być lepsza.

Czyli stworzyłem sobie cyfrowego redaktora, który nie pije kawy, nie bierze urlopu i bez żadnych skrupułów krytykuje moje dzieło. Świetny pomysł, kretynie.

## A skoro już to robimy, to zróbmy wszystko
Na tym etapie mogłem się zatrzymać. Miałem działający blog, panel, wpisy i zdjęcia. Normalny człowiek uznałby projekt za skończony.

Na szczęście normalnym człowiekiem nie jestem.

Strony statyczne dostały tworzenie, duplikowanie, zmianę kolejności, historię wersji i możliwość cofnięcia zmian. Dashboard zaczął pokazywać najważniejsze statystyki. Newsletter dostał podgląd wizualny i HTML, testowe wysyłki, kolejkę, historię oraz ponowne wysyłanie.

SEO przestało oznaczać „może Google jakoś to znajdzie”. Każdy wpis może mieć własny tytuł i opis, obraz Open Graph, canonical, ustawienia robots i Twitter Card. Strona generuje sitemapę, robots.txt i dane schema.org. Przed zapisem panel ostrzega mnie, jeśli czegoś brakuje, ale nadal pozwala mi zignorować dobre praktyki i popełnić błąd na własną odpowiedzialność. Wolność przede wszystkim. Korwin byłby ze mnie dumny, kurwa jego mać.

![20260809-134148-edycja-wpisu](/assets/images/20260809-134148-edycja-wpisu.png)


Później pojawiła się globalna wyszukiwarka przeszukująca wpisy, strony, media, newslettery i subskrybentów. Doszedł kompletny backup repozytorium, bazy danych, ustawień i listy subskrybentów. Powstał panel ustawień, z którego mogę zmienić nazwę bloga, slogan, logo, favicon, social media, komentarze, newsletter i motyw strony bez ręcznego grzebania w kodzie.

Na koniec poprawiłem UX, tryb ciemny, skróty, powiadomienia, responsywność i menu kontekstowe. Potem zabezpieczenia: krótkotrwałe sesje, odświeżanie tokenów, wylogowanie po bezczynności, rate limiting i sensowniejsza obsługa błędów.

A etap trzynasty polegał głównie na sprzątaniu tego wszystkiego, żeby projekt nie wyglądał od środka jak szuflada z kablami, do której przez dziesięć lat wrzucało się wszystko „bo kiedyś się przyda”. Tak, mam taką. Nawet nie szufladę a jebane pudło na przeprowadzkę.

## Czy było warto?
Jeżeli spojrzeć wyłącznie na liczbę godzin, problemów, commitów, błędów, poprawek i momentów, w których jedna niewinna zmiana powodowała trzy zupełnie nowe awarie — absolutnie nie. Jeżeli spojrzeć na efekt — kurwa, jeszcze jak.

Zaczynałem od prostego HTML-a i pomysłu, żeby znowu pisać. Dzisiaj mam narzędzie zbudowane dokładnie pod siebie. Nie WordPressa, w którym połowy rzeczy nie potrzebuję. Nie gotowy CMS, do którego muszę dopasować swój sposób pracy. Tylko własny panel, w którym każda funkcja pojawiła się dlatego, że faktycznie była mi do czegoś potrzebna. A nawet jeśli nie była potrzebna - chuj, fajnie wygląda przynajmniej.

Mogę usiąść, otworzyć panel, napisać tekst, wrzucić zdjęcia, sprawdzić jakość, uzupełnić SEO, zobaczyć podgląd, opublikować wpis i przygotować newsletter. Bez dotykania kodu. Bez ręcznego wysyłania plików. Bez modlenia się do bogów GitHuba, żeby deployment przeszedł.

No dobra, czasem nadal trzeba się pomodlić. To jednak informatyka, nie przesadzajmy z optymizmem.

![20260809-134150-roadmapa-bloga-cms](/assets/images/20260809-134150-roadmapa-bloga-cms.png)


## Koniec roadmapy, początek bloga
Najzabawniejsze jest to, że przez cały ten czas rozwijałem narzędzie służące do pisania, zamiast po prostu pisać. To trochę tak, jakbym przed zrobieniem kanapki postanowił najpierw zbudować własną piekarnię, wyhodować zboże i zaprojektować nóż.

Ale narzędzie jest już gotowe. Roadmapa zamknięta. Trzynaście etapów zrobione. Blog działa, CMS działa, newsletter działa, backupy są, zabezpieczenia są, SEO jest. Nie mam już wymówki, że czegoś mi brakuje.

No, prawie.

## Bo mi Dżoana narzekała!

A że Dżoana narzekała, że komentarze z Giscusa są jakieś takie obce, toporne i w ogóle „weź to zrób normalnie”, to oczywiście grzecznie przyjąłem konstruktywną krytykę, ponarzekałem pod nosem i zrobiłem po swojemu. Giscus wyleciał, a w jego miejsce powstał własny system komentarzy, zapisujący wszystko bezpośrednio w bazie danych. Przy okazji poprawiłem wygląd bloga, doszlifowałem kolory, odstępy, typografię i kilka elementów, które drażniły mnie za każdym razem, gdy na nie patrzyłem. Czyli klasycznie: miała być jedna drobna poprawka, a skończyło się na przebudowie połowy wizualnej warstwy strony i napisaniu kolejnego kawałka własnego systemu. Ale mam nadzieję, że Dżoana zadowolona, więc można uznać, że wdrożenie udane. Chociaż pewnie znowu coś wynajdzie..

Bo oczywiście mam już kolejne pomysły. Lepsze zarządzanie szkicami, planowanie publikacji, automatyczne linkowanie wpisów, jeszcze lepsza obróbka zdjęć, a może kiedyś jakiś asystent AI, który pomoże mi poprawić tekst, ale nie odbierze mu mojego stylu i nie zamieni każdego zdania w korporacyjny bełkot o synergii oraz dowożeniu wartości. Tyle, że to może poczekać.

Na dzisiaj wystarczy. Z małej strony powstał pełnoprawny, autorski CMS. Z projektu, który miał być prosty jak budowa cepa, wyszło coś, czego jeszcze kilka miesięcy temu nie potrafiłbym nawet sensownie zaplanować. I możecie się śmiać, odjebałeś sobie stronę, którą będą czytały 3 osoby. I wiecie co? CHUJ MNIE TO OBCHODZI. Zrobiłem to, bo chciałem. I mogłem. I była to fantastyczna przygoda, dzięki której lepiej poznałem AI, bo debilem nie jestem (albo jednak jestem), AI odwaliło tutaj 80% roboty. 

Ale najlepsze jest to, że nadal jest to mój projekt. Od pierwszego pliku HTML, przez wszystkie błędy, nieudane wdrożenia i kolejne „a może jeszcze tylko jedna funkcja”, aż po ostatni punkt roadmapy. Ze wszystkimi pomysłami, OCD bo się coś rozjechało albo nie wygląda tak, jakby to moja zryta bańka sobie wymarzyła.

Teraz wypadałoby w końcu zacząć regularnie pisać.

Do następnego.