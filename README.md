# SwingMusic Expo App (Server in der App einstellbar)

Diese App nutzt die SwingMusic-API. Du wählst den Server direkt IN der App (Android/iOS):
- Server-URL wird sicher gespeichert (expo-secure-store).
- API-Client nutzt die Basis-URL dynamisch.
- Beim Serverwechsel werden Tokens gelöscht, um Konflikte zu vermeiden.

## Schnellstart

1) Abhängigkeiten installieren
```bash
npm i
```

2) Entwicklung starten
```bash
npm run start
```
- Auf dem Gerät/Emulator öffnet sich zuerst der "Server verbinden"-Screen.
- Gib deine Server-URL ein (http/https; der Slash am Ende wird automatisch ergänzt).
- Danach gelangst du zum Login.

3) APK bauen (Cloud, empfohlen)
```bash
eas login
eas build -p android --profile production-apk
```
- Keystore: "Let EAS handle it" wählen.
- Am Ende bekommst du einen Download-Link zur APK.

4) iOS bauen
```bash
eas build -p ios --profile production
```

## Web (optional)
- Entwicklung:
```bash
npm run web
```
- Statischer Export:
```bash
npm run export:web
# Ergebnis liegt in dist/
```
Hinweise für Web-Streaming:
- <audio> sendet keine Authorization-Header. Nutze Cookie-Session (SameSite=None; Secure) oder signierte Kurzzeit-URLs.
- CORS: Authorization, Range, Content-Range erlauben/exponieren.

## Wichtige Dateien
- src/config/server.ts – Speicherung/Validierung der Server-URL
- src/hooks/useServer.ts – Zustand + Hydration
- src/api/client.ts – Axios mit dynamischem baseURL pro Request
- src/hooks/useAuth.ts – Auth-Flow mit Token-Storage
- src/store/playerStore.ts – Player-Zustand
- src/components/Player/AudioPlayer.tsx – Streaming via expo-av
- src/screens/ServerSetupScreen.tsx – Server-Setup
- src/screens/LoginScreen.tsx – Login + "Server ändern"

## EAS-Projekt
- app.json -> extra.eas.projectId = 61b9b4dd-8fe4-49ef-9a82-df25e0b81720
- .eas.json enthält ein `production-apk` Profil, das eine installierbare APK erzeugt.

## Nächste Schritte
- Suche (/search) implementieren (src/screens/SearchScreen.tsx).
- Library/Playlists anbinden.
- Skip/Prev/Queue-Logik erweitern.