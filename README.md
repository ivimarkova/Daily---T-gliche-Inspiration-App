# Daily - Tägliche Inspiration App

**Service Engineering Project**  
_Informatik, Otto-von-Guericke-Universität Magdeburg_

Eine mobile Progressive Web App (PWA), die täglich Inspiration durch personalisierte Ratschläge, aktuelle Feiertage und Musikempfehlungen bietet.

## Features

- **Interaktive Kristallkugel** mit mystischer Animation
- **Täglicher Ratschlag** von der Advice Slip API
- **Deutsche Feiertage** über Nager.Date API
- **Spotify Song-Empfehlungen** aus 2024
- **Animierter Sternenhimmel** im Hintergrund
- **Progressive Web App** - installierbar auf allen Geräten

##  Technologie-Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Design**: Responsive Design, CSS Grid/Flexbox
- **PWA**: Web App Manifest, Service Worker Ready
- **APIs**: REST APIs mit async/await
- **Styling**: Custom CSS mit Animationen und Glassmorphism

## Verwendete Web APIs

### 1. Advice Slip API

```javascript
GET https://api.adviceslip.com/advice
```

- **Zweck**: Liefert zufällige Lebensratschläge
- **Datenformat**: JSON mit advice-Objekt
- **Nutzung**: Tägliche Inspiration und Motivation

### 2. Nager.Date API

```javascript
GET https://date.nager.at/api/v3/PublicHolidays/2025/DE
```

- **Zweck**: Deutsche Feiertage des aktuellen Jahres
- **Datenformat**: JSON Array mit Feiertag-Objekten
- **Nutzung**: Informiert über aktuelle Feiertage

### 3. Spotify Web API

```javascript
GET https://api.spotify.com/v1/search?q=year:2024&type=track&market=DE&limit=50
```

- **Zweck**: Musik-Empfehlungen aus 2024
- **Authentifizierung**: Client Credentials OAuth Flow
- **Nutzung**: Tägliche Song-Empfehlungen mit Spotify-Integration

## Installation & Setup

### Lokale Entwicklung

```bash
# Repository klonen
git clone https://github.com/IvaylaMarkova/Daily-Taegliche-Inspiration-App.git

# In Projektverzeichnis wechseln
cd Daily-Taegliche-Inspiration-App

# Live Server starten (empfohlen: VS Code Live Server Extension)
# Oder Python Server:
python -m http.server 8000

# App unter http://localhost:8000 öffnen
```

### PWA Installation

1. App in Chrome/Edge/Firefox öffnen
2. "Zur Startseite hinzufügen" auswählen
3. App wird wie native App installiert

### Spotify API Setup

```javascript
// In script.js eigene Credentials eintragen:
const CLIENT_ID = "your_spotify_client_id";
const CLIENT_SECRET = "your_spotify_client_secret";
```

## Projektstruktur

```
Daily-App/
├── index.html          # Haupt-HTML Struktur
├── style.css           # Styling und Animationen
├── script.js           # JavaScript Logik und API Calls
└── README.md           # Diese Dokumentation
```

## Entwicklungsumgebung und App-Typ

### Gewählte Lösung: Progressive Web App (PWA)

#### Vorteile:

- **Plattformübergreifend**: Ein Code für alle Geräte (iOS, Android, Desktop)
- **Niedrige Entwicklungskosten**: Standard Web-Technologien (HTML, CSS, JavaScript)
- **Einfache Wartung**: Zentrale Code-Basis, automatische Updates
- **Schnelle Entwicklung**: Bekannte Web-Technologien
- **App-ähnliche Features**: Offline-Fähigkeit, Home-Screen Installation
- **Keine App-Store Abhängigkeit**: Direkte Verteilung über URL

#### Nachteile:

- **Eingeschränkte native Features**: Begrenzte Hardware-Integration
- **Performance**: Langsamer als native Apps bei komplexen Operationen
- **iOS-Einschränkungen**: Limitierte PWA-Features auf Safari
- **App-Store Discoverability**: Weniger Sichtbarkeit ohne Store-Präsenz

### Alternative Ansätze:

#### Native Entwicklung (Swift/Kotlin)

**Vorteile**: Beste Performance, vollständiger Zugriff auf Hardware  
**Nachteile**: Separate Entwicklung für iOS/Android, hohe Kosten

#### Hybrid Frameworks (React Native, Flutter)

**Vorteile**: Native Performance mit geteiltem Code  
**Nachteile**: Framework-spezifisches Know-how erforderlich, größere Bundle-Größe

### Begründung der Wahl:

Für diese inspirations-basierte App mit primär API-basiertem Content ist eine PWA optimal:

1. ✅ Keine hardwarespezifischen Features benötigt
2. ✅ Schnelle Markteinführung möglich
3. ✅ Wartungsaufwand minimiert
4. ✅ Breite Gerätekompatibilität erreicht

## Cloud-basierte Entwicklung mobiler Applikationen

### Beispiel: Firebase (Google Cloud Platform)

#### Was ist Firebase?

Firebase ist Googles Backend-as-a-Service (BaaS) Plattform, die umfassende cloud-basierte Entwicklungstools für mobile Apps bietet.

#### 🛠️ Kernfeatures:

| Feature               | Beschreibung                                        |
| --------------------- | --------------------------------------------------- |
| **Realtime Database** | NoSQL-Datenbank mit Echtzeit-Synchronisation        |
| **Authentication**    | Benutzerauthentifizierung (Email, Google, Facebook) |
| **Cloud Functions**   | Serverless Backend-Logik                            |
| **Hosting**           | Statisches Web-Hosting für PWAs                     |
| **Analytics**         | Detaillierte App-Nutzungsstatistiken                |
| **Cloud Messaging**   | Push-Benachrichtigungen                             |
| **Remote Config**     | Dynamische App-Konfiguration ohne Updates           |

#### ✅ Vorteile cloud-basierter Entwicklung:

1. **Skalierbarkeit**: Automatische Ressourcen-Anpassung
2. **Infrastruktur-Management**: Keine Server-Verwaltung nötig
3. **Schnelle Entwicklung**: Vorgefertigte Backend-Services
4. **Globale Verfügbarkeit**: CDN und weltweite Verteilung
5. **Kosteneffizienz**: Pay-per-Use Modell

#### ❌ Nachteile:

1. **Vendor Lock-in**: Abhängigkeit vom Anbieter
2. **Datenschutz**: Externe Datenhosting-Bedenken
3. **Kosten bei Skalierung**: Hohe Kosten bei großem Traffic
4. **Eingeschränkte Kontrolle**: Begrenzte Anpassungsmöglichkeiten

####  Beispiel-Integration in "Daily" App:

```javascript
// Firebase Integration für User Preferences
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// User preferences in Firestore speichern
const saveUserPreferences = async (userId, preferences) => {
  const db = getFirestore();
  await setDoc(doc(db, "userPreferences", userId), preferences);
};

// Push-Benachrichtigungen für tägliche Inspiration
import { getMessaging, getToken } from "firebase/messaging";
const messaging = getMessaging();
const token = await getToken(messaging);
```

### Weitere Cloud-Entwicklungsplattformen:

- **AWS Amplify**: Amazon's Full-Stack Entwicklungsplattform
- **Microsoft Azure Mobile Apps**: Enterprise-fokussierte Lösung
- **Supabase**: Open-Source Firebase Alternative
- **Netlify**: JAMstack-fokussierte Hosting-Plattform

## App-Features im Detail

### Interaktive Kristallkugel

- **3D CSS-Animationen** mit Glassmorphism-Effekt
- **Pulsierender Glow-Effekt** für magische Atmosphäre
- **Dynamische Textanzeige** mit Ein-/Ausblend-Animationen
- **Hover-Effekte** für bessere Interaktivität

### Responsive Design

- **Mobile-First Ansatz** für optimale Smartphone-Nutzung
- **CSS Grid & Flexbox** für flexible Layouts
- **Viewport-optimierte Schriftgrößen** und Touch-Targets
- **Smooth Scrolling** und Performance-Optimierung

### Progressive Web App Features

```json
{
  "name": "Daily - Tägliche Inspiration",
  "short_name": "Daily",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#1a1a2e",
  "theme_color": "#1a1a2e"
}
```

## Performance & Best Practices

### API-Optimierung

- **Async/Await Pattern** für bessere Lesbarkeit
- **Error Handling** mit try-catch Blöcken
- **Loading States** mit visueller Rückmeldung
- **Rate Limiting** beachtet (keine übermäßigen API Calls)

### Code-Qualität

- **Vanilla JavaScript** - keine Framework-Abhängigkeiten
- **Modulare Funktionen** für bessere Wartbarkeit
- **Responsive Breakpoints** für verschiedene Bildschirmgrößen
- **Accessibility** durch semantisches HTML

## Technische Herausforderungen & Lösungen

| Herausforderung            | Lösung                                           |
| -------------------------- | ------------------------------------------------ |
| **CORS-Probleme**          | Proxy-Server oder CORS-fähige APIs gewählt       |
| **API-Authentifizierung**  | Client Credentials Flow für Spotify              |
| **Mobile Performance**     | CSS-Animationen optimiert, minimale Dependencies |
| **Offline-Funktionalität** | Service Worker ready, localStorage für Caching   |

## Zielgruppe & Use Cases

- **Primär**: Mobile Nutzer, die tägliche Inspiration suchen
- **Sekundär**: Desktop-Nutzer für Ambient-Erlebnis
- **Use Cases**: Morgendliche Motivation, Entspannung, Musikentdeckung

## Mögliche Erweiterungen

- [ ] **User Accounts** mit Präferenzen-Speicherung
- [ ] **Offline-Modus** mit Service Worker
- [ ] **Push-Benachrichtigungen** für tägliche Erinnerungen
- [ ] **Soziale Features** (Teilen, Bewerten von Inhalten)
- [ ] **Mehr APIs** (Wetter, Horoskop, Zitate)
- [ ] **Personalisierung** basierend auf Nutzerverhalten

## Kontakt & Support

**Entwickelt von**: Ivayla Markova  
**Universität**: Otto-von-Guericke-Universität Magdeburg  
**Studiengang**: Informatik  
**Projekt**: Service Engineering

---

## Links & Referenzen

- [Advice Slip API Documentation](https://api.adviceslip.com/)
- [Nager.Date API Documentation](https://date.nager.at/Api)
- [Spotify Web API Documentation](https://developer.spotify.com/documentation/web-api/)
- [Firebase Documentation](https://firebase.google.com/docs)
  **© 2025 Ivayla Markova - Alle Rechte vorbehalten**
