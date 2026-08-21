# ATMOS-PRAEDICTOR

Eine Wetter-App, die den eigenen Standort per Geolocation erkennt und darauf basierend Live-Wetterdaten anzeigt.

**Status:** 🚧 In aktiver Entwicklung – Lernprojekt im Aufbau

> ⚠️ **Hinweis:** Sowohl der Projektname als auch das Layout/UI sind noch nicht final und befinden sich in Überarbeitung. Was du in der Live-Demo siehst, ist der aktuelle Zwischenstand, nicht das angestrebte Endergebnis.

🔗 **Live-Demo:** [silviopelli.github.io/Wetterapp](https://silviopelli.github.io/Wetterapp/)

## Über dieses Projekt

ATMOS-PRAEDICTOR ist ein persönliches Lernprojekt, mit dem ich mir Vanilla JavaScript (ohne Framework) praxisnah aneigne – anhand einer echten, funktionierenden Anwendung statt isolierter Übungen. Der Fokus liegt auf sauberem, nachvollziehbarem Code und dem bewussten Umgang mit externen APIs.

## Bereits umgesetzt

- 📍 Standorterkennung über die Geolocation API, mit vollständiger Fehlerbehandlung (Berechtigung verweigert, Standort nicht verfügbar, Zeitüberschreitung)
- 🗺️ Reverse Geocoding über [Nominatim](https://nominatim.openstreetmap.org/) – zeigt den Ortsnamen statt nur Koordinaten
- 🌡️ Live-Wetterdaten über die [Open-Meteo API](https://open-meteo.com/) für Temperatur, Niederschlag, Wind, Böen, Luftfeuchtigkeit, Taupunkt, Sichtweite und Luftdruck
- ⚠️ Durchgängige, nutzerfreundliche Fehlerbehandlung über ein natives `<dialog>`-Element

## Geplant

- 📅 7-Tage-Wochenübersicht
- 📊 Detailansicht pro Tag mit stündlicher Auflösung und Trend-Diagrammen
- 🔄 Modellvergleich verschiedener Wetterdienste (ICON, ECMWF, u.a.)
- 🗺️ Interaktive Wetterkarte mit Windrichtung und Niederschlagsradar

## Tech-Stack

- HTML, CSS, Vanilla JavaScript (ES6+, `async`/`await`, `fetch`)
- [Open-Meteo API](https://open-meteo.com/) – Wetterdaten
- [Nominatim API](https://nominatim.openstreetmap.org/) – Reverse Geocoding
- Kein Framework, kein Build-Tool – bewusst puristisch, um die Grundlagen zu vertiefen

## Lokal ausführen

```bash
git clone https://github.com/SilvioPelli/Wetterapp.git
```

Danach `index.html` im Browser öffnen, oder mit einem lokalen Server (z. B. VS Code "Live Server") starten – wird empfohlen, da die Geolocation API einen sicheren Kontext (HTTPS oder `localhost`) benötigt.

## Lizenz

MIT – siehe [LICENSE](LICENSE)
