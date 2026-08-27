/* ============================================
   ROADMAP – ATMOS-PRAEDICTOR
   Stand: 19.08.2026
   ============================================ */

/* --- ERLEDIGT ---
   ✓ Geolocation mit vollständiger Fehlerbehandlung (error.code 1/2/3)
   ✓ Reverse Geocoding über Nominatim, Ortsanzeige mit Fallback-Logik
   ✓ Open-Meteo API Anbindung für die 8 Basis-Cards
     (Temperatur, Niederschlag, Wind, Böen, Feuchtigkeit,
     Taupunkt, Sichtweite, Luftdruck) über "current"-Parameter,
     per for...of-Schleife über ein cards-Array (DRY statt 8x Copy-Paste)
   ✓ Fehler-Dialog (<dialog>) für alle Fehlerfälle (Geolocation, fetch)
     mit verständlichen, undtechnischen Nutzer-Nachrichten
*/

/* --- WICHTIGE ERKENNTNIS: current ignoriert die Modellwahl ---
   Getestet und bewiesen (16.08.2026): data.current liefert IMMER denselben
   Wert, unabhängig davon, welche Modelle zusätzlich in models= mitgeschickt
   werden - current verhält sich offenbar immer wie "best_match", ganz gleich
   welche Modelle sonst noch angefragt wurden.

   data.hourly und data.daily verhalten sich anders: dort werden bei mehreren
   angefragten Modellen SUFFIXE an die Variablennamen angehängt, z.B.
   temperature_2m_best_match, temperature_2m_dwd_icon_d2 usw. - dort ist ein
   echter Modellvergleich technisch möglich, bei current nicht.

   Konsequenz: Die Modellauswahl (Dropdown) macht für die 8 Basis-Cards
   (current) keinen Sinn und wurde deswegen deaktiviert (siehe unten).
   Sie wird erst für 5) TAGES-DETAILSEITE wieder relevant, weil dort
   hourly-Daten mit Modell-Suffixen zum Einsatz kommen.

   Nebenbefund: Modelle, die den aktuellen Standort geografisch nicht
   abdecken (z.B. metno_nordic in Deutschland getestet), liefern schlicht
   keinen gesuffixten Schlüssel in der Antwort - kein Fehler, der Schlüssel
   fehlt einfach. Beim Verarbeiten von hourly/daily mit mehreren Modellen
   also immer mit einplanen, dass nicht jedes angefragte Modell auch
   tatsächlich einen Datensatz liefert.
*/

/* --- AKTUELL DEAKTIVIERT (bewusst, mit Grund) ---
   - Wettermodell-Card im HTML auskommentiert (siehe HTML-Datei)
   - change-Listener auf wetterModel in skript.js auskommentiert
   - Grund: siehe Erkenntnis oben - current reagiert nicht auf Modellwahl,
     ein aktives Dropdown ohne sichtbare Wirkung wäre irreführend fürs UI
   - getWetter() nutzt aktuell eine FESTE Modell-Liste in der URL
     (ecmwf_ifs,best_match,dwd_icon_d2,dwd_icon_eu,dwd_icon_global,
     metno_nordic), damit hourly/daily trotzdem für später mit allen
     Modell-Datensätzen befüllt sind, auch wenn current sie nicht nutzt
   - Reaktivieren, sobald 5) TAGES-DETAILSEITE gebaut wird
*/

/* --- GEPLANTE FEATURES (nach Priorität) ---

   1) MODELLVERGLEICH
      - AN 5) GEKOPPELT (siehe Erkenntnis oben) - ergibt nur für
        hourly/daily Sinn, nicht für current/die 8 Basis-Cards
      - Werte nebeneinander anzeigen zum direkten Vergleich
      - Ziel: selbst herausfinden, welches Modell für die eigenen
        Aufenthaltsländer (DE, AT, ES, HU, RO, BG, GR) am
        zuverlässigsten ist, statt sich nur auf generelle Meinungen
        zu verlassen
      - "best_match" deckt das für current schon automatisch ab
        (wählt selbst das beste verfügbare Modell je nach Standort)

   2) TRENDS / VERLAUF DER VORHERSAGE
      - Nutzt die Open-Meteo "Previous Runs API"
        (zeigt, wie sich eine Vorhersage für denselben Zeitpunkt
        über mehrere Tage/Läufe hinweg verändert hat)
      - Eigener Endpunkt, nicht Teil der normalen Forecast-API

   3) VORHERSAGE VS. TATSÄCHLICHES WETTER (Genauigkeits-Tracking)
      - Zwei Datenquellen nötig:
        a) "Historical Forecast API" (was wurde damals vorhergesagt)
        b) "Historical Weather API" (was tatsächlich gemessen wurde)
      - Differenz berechnen & visualisieren
        (z.B. "ICON-EU lag 3°C daneben")
      - Voraussetzung für 1) und 2), technisch anspruchsvoller

   4) WOCHENÜBERSICHT (Startseite, "Ebene 1")
      - Mo–So als kompakte Kachel-/Listenansicht
      - Pro Tag: Höchst-/Tiefsttemperatur, Windgeschwindigkeit,
        Niederschlagswahrscheinlichkeit/-menge, Schnee/Hagel-Symbol,
        Bewölkungsgrad
      - Datenquelle: Open-Meteo "daily"-Parameter (statt current/hourly)

   5) TAGES-DETAILSEITE ("Ebene 2")
      - Klick auf einen Tag in der Wochenübersicht → eigene
        Ansicht/Seite nur für diesen Tag
      - Stündliche Auflösung aller Werte (auch Feuchtigkeit,
        Taupunkt, Sichtweite etc.)
      - HIER Modellauswahl-Dropdown reaktivieren: hourly-Daten haben
        Modell-Suffixe (z.B. temperature_2m_dwd_icon_eu), current nicht
      - Trend-Diagramme über den Tagesverlauf: Niederschlag,
        Wind/Böen, Bewölkung
      - Braucht vermutlich eine Chart-Bibliothek für die Diagramme

   6) INTERAKTIVE WETTERKARTE ("Ebene 3", langfristig)
      - Animierte Windrichtungsanzeige
      - Regenkarte / Sturmverfolgung mit prognostiziertem Zugweg
      - Farbskala nach Stärke: schwach (blau) → stärker (grün)
        → sehr stark (violett, ab 90 km/h)
      - Technisch größtes Teilprojekt: Kartenbibliothek (z.B. Leaflet),
        geografische Rasterdaten statt Einzelpunkt-Daten, Animation
      - Realistisches Ziel erst, wenn Grundgerüst der App
        vollständig steht

*/

/* --- OFFENE STYLING-TODOS ---
   - Fehler-Dialog: Design überarbeiten (Button-Position,
     Hintergrundfarbe an App-Umgebung anpassen)
     -> siehe .fehlerDialogStyle (leeres Ruleset im CSS bereits angelegt)
*/

/* --- DEBUGGING-LERNPUNKT: Apple-Hotspot-Netzwerkproblem ---
   Bei Verbindung eines Mac über iPhone Personal Hotspot (beide Apple-
   Geräte) können einzelne fetch-Anfragen scheitern (generisches
   "Failed to fetch"), obwohl die Internetverbindung grundsätzlich
   funktioniert. Ursache: Apples "Limit IP Address Tracking" /
   iCloud Private Relay kann bei dieser Geräte-Kombination zu
   selektiven Verbindungsproblemen führen (bekanntes, dokumentiertes
   Apple-Verhalten, keine Bug in der App).
   Fix: Limit IP Address Tracking für das jeweilige Netzwerk in den
   Mac-Netzwerkeinstellungen deaktivieren.
   -> Für die Fehler-Nachricht im catch-Block überlegen, ob ein Hinweis
      auf diesen Sonderfall sinnvoll ergänzt wird (siehe Styling-TODOs /
      spätere UX-Verbesserung).
*/
/* Globale Variablen */
/* Wird aktuell nur für die deaktivierte Modellauswahl-Funktion gebraucht, 
   bleibt für spätere Reaktivierung (Tagesdetailseite) bestehen. */
let aktuellBreitengrad = "";
let aktuellLaengengrad = "";

/* DOM Manipulation */
const locButton = document.getElementById("btn-loc");
const ini = document.getElementById("initialisierung");
const fehler = document.getElementById("fehlerDialog");
const fehlerButton = document.getElementById("fehlerOk");
const fehlerText = document.getElementById("fehlerMessage");
const tagCard = document.getElementById("wochenTrend");

/*
Werden bis zum implementieren des DropDown Menü und der Detailansicht nicht benötigt.
const wetterModel = document.getElementById("wettermodell");
const bestWetterModel = "best_match";
*/

/* Array für Schleife for...of */
const cards = [
       { "htmlId": "temp", "apiParam": "temperature_2m" },
       { "htmlId": "precip", "apiParam": "precipitation" },
       { "htmlId": "wind", "apiParam": "wind_speed_10m" },
       { "htmlId": "gusts", "apiParam": "wind_gusts_10m" },
       { "htmlId": "humidity", "apiParam": "relative_humidity_2m" },
       { "htmlId": "dew", "apiParam": "dew_point_2m" },
       { "htmlId": "visibility", "apiParam": "visibility" },
       { "htmlId": "pressure", "apiParam": "surface_pressure" }
]

/* Array für 7 Tage Vorherssage */
const days = [];

/* Wettercodes Objekt */
const wetterCodes = {
       0: "Klar",
       1: "Leicht Bewölkt",
       2: "Teilweise Bewölkt",
       3: "Bewölkt",
       45: "Nebel",
       48: "Eisnebel",
       51: "Leichter Nieselregen",
       53: "Moderater Nieselregen",
       55: "Starker Nieselregen",
       56: "Leichter gefrierender Nieselregen",
       57: "Starker gefrierender Nieselregen",
       61: "Leichter Regen",
       63: "Moderater Regen",
       65: "Starker Regen",
       66: "Leichter gefrierender Regen",
       67: "Starker gefrierender Regen",
       71: "Leichter Schneefall",
       73: "Moderater Schneefall",
       75: "Starker Schneefall",
       77: "Schneekörner",
       80: "Leichter Regenschauer",
       81: "Moderater Regenschauer",
       82: "heftiger Regenschauer",
       85: "leichter Schneeschauer",
       86: "Starker Schneeschauer",
       95: "Gewitter",
       96: "Gewitter & leichter Hagel",
       99: "Gewitter & schwerer Hagel"
}

/* Wetter-Icons */
const wetterIcons = {
       0: "☀️",
       1: "🌤️",
       2: "⛅️",
       3: "☁️",
       45: "🌫️",
       48: "🧊🌫️",
       51: "🌧️",
       53: "🌧️🌧️",
       55: "🌧️🌧️🌧️",
       56: "❄️🌧️",
       57: "❄️🌧️🌧️🌧️",
       61: "🌧️",
       63: "🌧️🌧️",
       65: "🌧️🌧️🌧️",
       66: "❄️🌧️",
       67: "❄️🌧️🌧️🌧️",
       71: "🌨️",
       73: "🌨️🌨️",
       75: "🌨️🌨️🌨️",
       77: "☃️",
       80: "🌧️",
       81: "🌧️🌧️🌧️",
       82: "🌧️🌧️🌧️🌧️",
       85: "❄️🌧️🌨️",
       86: "❄️🌧️🌨️🌨️",
       95: "⛈️",
       96: "⛈️🧊",
       99: "⛈️🧊🧊"
}

/* reverse geolocation mit nominatim API. Zeigt den Ortsname des User- Aufenthaltsort  */
async function getStandort(laengengrad, breitengrad) {
       /* try und catch Wrapper als erstes Sicherheitsnetz für mögliche Fehler. */
       try {
              const anfrage = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${breitengrad}&lon=${laengengrad}&format=json`);
              const data = await anfrage.json();
              const citySub = `${data.address.city}, ${data.address.suburb}`;
              const city = data.address.city;
              const sub = data.address.suburb;

              /* Logik zur Umsetztung der Ortsanzeige in der App und Fehlerbewältigung. */
              if (data.address.city && data.address.suburb) {
                     ini.textContent = citySub;
              } else if (data.address.city && !data.address.suburb) {
                     ini.textContent = city;
              } else if (!data.address.city && data.address.suburb) {
                     ini.textContent = sub;
              } else {
                     ini.textContent = `Latitude = ${breitengrad.toFixed(4)}, Longitude = ${laengengrad.toFixed(4)}`;
              }
       } catch (error) {
              fehlerText.textContent = "Upps, da ist was schief gelaufen! Schau mal nach deinem Internet, vielleicht liegts daran?";
              fehler.showModal();
       }
}

/* Die Wetterdaten von der Open-Meteo API. */
async function getWetter(laengengrad, breitengrad) {
       try {
              /* Wetterdaten abfrage und sicherung als json objekt in data */
              const anfrage = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${breitengrad}&longitude=${laengengrad}&daily=weather_code,precipitation_sum,wind_speed_10m_max,wind_direction_10m_dominant,wind_gusts_10m_max,uv_index_max,temperature_2m_max,temperature_2m_min,sunrise,sunset,sunshine_duration,temperature_2m_mean,apparent_temperature_mean&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,rain,visibility,wind_speed_10m,snowfall,showers,precipitation_probability,precipitation,apparent_temperature,wind_gusts_10m,wind_direction_10m,temperature_80m,uv_index,sunshine_duration,snow_depth,surface_pressure,cloud_cover&models=ecmwf_ifs,best_match,dwd_icon_d2,dwd_icon_eu,dwd_icon_global,metno_nordic&current=precipitation,wind_speed_10m,wind_direction_10m,wind_gusts_10m,surface_pressure,cloud_cover,relative_humidity_2m,temperature_2m,apparent_temperature,dew_point_2m,visibility&minutely_15=wind_speed_10m,wind_direction_10m,temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation,visibility,wind_gusts_10m,sunshine_duration,freezing_level_height,snowfall_height,snowfall,rain&timezone=Europe%2FBerlin`);
              const data = await anfrage.json();
              
              /* Leert das days Array. Ansonsten wäre ein Daten Anhäufungsproblem im Array beim mehrmaligen auslösen von getWetter! */
              days.length = 0;

              /* for...of Schleife, für die Wetterdaten die in die 8 Cards geschrieben werden sollen */
              for (const wetterDatenCards of cards) {
                     const card = document.getElementById(wetterDatenCards.htmlId);
                     card.textContent = `${data.current[wetterDatenCards.apiParam]}${data.current_units[wetterDatenCards.apiParam]}`;
              };

              /* for Schleife, baut ein Objekt aus jedem Wochentag mit zugehörigen Wetterdaten und pusht in das days Array */
              for (let i = 0; i < data.daily.time.length; i++) {
                     const day = {
                            datum: data.daily.time[i],
                            tempMax: data.daily.temperature_2m_max_best_match[i],
                            tempMin: data.daily.temperature_2m_min_best_match[i],
                            code: data.daily.weather_code_best_match[i],
                            preci: data.daily.precipitation_sum_best_match[i],
                            wind: data.daily.wind_speed_10m_max_best_match[i],
                            gusts: data.daily.wind_gusts_10m_max_best_match[i],
                            windDirec: data.daily.wind_direction_10m_dominant_best_match[i],
                            uv: data.daily.uv_index_max_best_match[i]
                     }
                     days.push(day);
                     console.log(day);
              };
              /* Erstellt 7 neue Cards mit 8 API Werten im HTML für die 7 Tage Vorhersage */
              let html = "";
              for (const eintrag of days) {
                     const datumsObjekt = new Date(eintrag.datum);
                     const wochentag = datumsObjekt.toLocaleDateString("de-DE", {weekday: "long"});
                     const datum = datumsObjekt.toLocaleDateString("de-De", {day: "2-digit", month: "2-digit", year: "2-digit"});
                     html += `<div class="tagCard">
                                   <p><span class="wochentagFett">${wochentag}</span> - ${datum}</p>
                                   <p><span class="max-tag">Max.</span> ${Math.round(eintrag.tempMax)} °C <span class="min-tag">Min. </span>${Math.round(eintrag.tempMin)} °C</p>
                                   <p>${wetterCodes[eintrag.code]} ${wetterIcons[eintrag.code]}</p>
                                   <p>Niederschlag ${Math.round(eintrag.preci)} mm</p>
                                   <p>Wind ${Math.round(eintrag.wind)} km/h</p>
                                   <p>Böen ${Math.round(eintrag.gusts)} km/h</p>
                                   <p>Windrichtung ${eintrag.windDirec} °</p>
                                   <p>UV-Index ${Math.round(eintrag.uv)}</p>
                            </div>`;
              }
              tagCard.innerHTML = html;

              
       } catch (error) {
              fehlerText.textContent = "Hmm, es scheint ein Fehler zu geben. Check dein Internet und probiert es nochmal!"
              fehler.showModal();
       }
}


/* lat und lon bestimmen für das revers geolocation bzw für fetch der Ortsnamen. */
function whoami() {
       /* Über den Browser wird die Position anhand Längen und Breitengrad angefragt. */
       navigator.geolocation.getCurrentPosition(function (position) {
              const lon = position.coords.longitude;
              const lat = position.coords.latitude;

              /* Speichern in den globalen Variablen für den Dropdown Switch des addeventlistener */
              aktuellLaengengrad = lon;
              aktuellBreitengrad = lat;


              /* Die vorher deklarierte Funktion für das Reverse Geolocation. */
              getStandort(lon, lat);
              getWetter(lon, lat);
       },

              /* Fehlerlogik falls getCurrendPosition nicht wie gewünscht funktioniert. */
              function (error) {
                     if (error.code === 1) {
                            fehlerText.textContent = "Zugriff auf Geolokation wurde verweigert. Hat der Browser deine Erlaubnis die Daten zu erfassen?";
                            fehler.showModal();
                     } else if (error.code === 2) {
                            fehlerText.textContent = "Fehler beim lokalisieren durch Standortdienste. Hast du deine Standortdienste an?";
                            fehler.showModal();
                     } else if (error.code === 3) {
                            fehlerText.textContent = "Der Vorgang hat zu lange gedauert! Versuchs nochmal.";
                            fehler.showModal();
                     }
              });
}



/* Latitude und longitude bestimmen durch klicken des loc Button. */
locButton.addEventListener("click", whoami);
/* Fehlerfenster schließen durch Ok klicken. */
fehlerButton.addEventListener("click", function () {
       fehler.close();
});
/* Ladet das Wettermodell neu wen User das Wetter im Dropdown ändert.*
                     
       !!!!Deaktiviert!!!! current liefert unabhängig von der Modellwahl immer denselben 
       (best_match-artigen) Wert. Modellauswahl wird erst relevant für die stündliche 
       Detailansicht (Roadmap Punkt 5) - dort reaktivieren.

wetterModel.addEventListener("change", function() {
       if(aktuellLaengengrad && aktuellBreitengrad) {
              getWetter(aktuellLaengengrad, aktuellBreitengrad);
       } else {
              fehlerText.textContent = `Bestimme zuerst dein Standort! Klicke auf "Lokalisierung einleiten"!`;
              fehler.showModal();
       }
});
*/









