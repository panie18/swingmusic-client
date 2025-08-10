# Build-Fix: Slider-Abhängigkeit

Dieses Update ersetzt `expo-slider` (404 im Yarn-Registry) durch `@react-native-community/slider`.

Installation:

```bash
npm i
npx expo install @react-native-community/slider expo-av expo-secure-store expo-linear-gradient @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs react-native-gesture-handler react-native-safe-area-context react-native-screens expo-status-bar
```

Build (Cloud):

```bash
eas build -p android --profile production-apk
```