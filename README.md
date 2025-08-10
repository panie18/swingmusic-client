# SwingMusic Expo App – Build Fix

Dieses Update ersetzt `expo-slider` durch `@react-native-community/slider`, da `expo-slider` im EAS Build nicht aus dem Registry auflösbar war.

Installationshinweise:

```bash
npm i
npx expo install @react-native-community/slider expo-av expo-secure-store expo-linear-gradient @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs react-native-gesture-handler react-native-safe-area-context react-native-screens expo-status-bar
```

Danach wie gewohnt entwickeln bzw. bauen:

```bash
npm run start
# oder
EAS_LOGIN=1 eas build -p android --profile production-apk
```