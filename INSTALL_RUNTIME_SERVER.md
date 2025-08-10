## Ziel
Server-URL direkt IN der App einstellen (Android/iOS). Speicherung in SecureStore, dynamische API-Base-URL, Token-Reset beim Serverwechsel.

### 1) Alles ersetzen
- Ersetze dein Projekt mit den bereitgestellten Dateien (oder lösche `src/` und lege es mit diesen Dateien neu an).
- Stelle sicher, dass `app.json` die EAS-Project-ID enthält (hier bereits gesetzt).

### 2) Install & Start
```bash
npm i
npm run start
```
- Auf dem Gerät Server-URL eintragen.
- Danach Login testen und Playback starten.

### 3) APK bauen
```bash
eas login
eas build -p android --profile production-apk
```
- Keystore: "Let EAS handle it".
- APK-Link folgt nach dem Build.

### 4) iOS bauen
```bash
eas build -p ios --profile production
```

### 5) Web (optional)
```bash
npm run web
npm run export:web
```
- Dist-Ordner deployen, optional ZIP erstellen:
  - macOS/Linux: `cd dist && zip -r ../swingmusic-web.zip .`
  - Windows PS: `Compress-Archive -Path dist\* -DestinationPath swingmusic-web.zip`

### Hinweise
- CORS und Range-Header am Server für Web.
- Browser-<audio> sendet keine Authorization-Header: Cookie-Session oder signierte URLs verwenden.
- Serverwechsel löscht Tokens automatisch.