import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "@screens/HomeScreen";
import SearchScreen from "@screens/SearchScreen";
import LibraryScreen from "@screens/LibraryScreen";
import NowPlayingScreen from "@screens/NowPlayingScreen";
import LoginScreen from "@screens/LoginScreen";
import ServerSetupScreen from "@screens/ServerSetupScreen";
import { colors } from "@theme/theme";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@hooks/useAuth";
import { useServer, useServerHydration } from "@hooks/useServer";
import { View, ActivityIndicator } from "react-native";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textDim,
        tabBarIcon: ({ color, size }) => {
          const map: Record<string, keyof typeof Ionicons.glyphMap> = {
            Home: "home",
            Search: "search",
            Library: "library"
          };
          const name = map[route.name] || "musical-notes";
          return <Ionicons name={name} color={color} size={size} />;
        }
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Library" component={LibraryScreen} />
    </Tab.Navigator>
  );
}

export default function RootNav() {
  useServerHydration();
  const serverLoading = useServer((s) => s.loading);
  const baseUrl = useServer((s) => s.baseUrl);
  const user = useAuth((s) => s.user);

  if (serverLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color={colors.accent} />
      </View>
    );
  }

  const hasServer = !!baseUrl;

  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator>
        {!hasServer ? (
          <Stack.Screen name="ServerSetup" component={ServerSetupScreen} options={{ headerShown: false }} />
        ) : !user ? (
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        ) : (
          <>
            <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
            <Stack.Screen name="NowPlaying" component={NowPlayingScreen} options={{ headerTransparent: true, headerTitle: "" }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}