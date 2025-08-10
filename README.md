# SwingMusic Expo App

Eine moderne, Spotify-inspirierte Expo/React-Native App für SwingMusic mit:
- Auth (POST {BASE_URL}auth/login, Refresh per Interceptor)
- Streaming: GET {BASE_URL}file/<trackhash>?filepath=... (Range-fähig)
- Lyrics: POST {BASE_URL}lyrics { trackhash, filepath }
- Home -> Favoriten-Tracks
- Now Playing mit synchroner LRC-Anzeige (sofern `synced` + LRC vom Server)

## Setup

1) Install
```bash
pnpm i  # oder npm i / yarn
```

2) Env
```bash
cp .env.example .env
# EXPO_PUBLIC_API_URL=https://dein-server.tld/   # mit trailing slash
```

3) Start
```bash
pnpm start
# iOS/Android optional
pnpm ios
pnpm android
```

## Web

Entwicklung:
```bash
pnpm start --web
```

Build & Export:
```bash
npx expo export --platform web
# Deploy dist/ auf z.B. Vercel/Netlify/GitHub Pages
```

Hinweise:
- CORS aktivieren und `Authorization`, `Range`, `Content-Range` Header erlauben. 
- Browser können bei `<audio>` keine `Authorization`-Header mitschicken. Nutze Cookies oder signierte Stream-URLs.

## EAS (Android/iOS)

```bash
npm i -g eas-cli
eas login
eas init  # extra.eas.projectId wird gesetzt
eas build -p android --profile production
eas build -p ios --profile production
```

## Nächste Schritte

- Suche auf euren echten /search Endpunkt mappen (src/screens/SearchScreen.tsx)
- Library/Playlists mit Server-Routen füllen
- Skip/Prev/Queue-Logik verbessern
- Optional: Signierte URLs für Web-Streaming
