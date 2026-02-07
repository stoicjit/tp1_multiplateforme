import { Stack } from "expo-router";
import { useTheme } from "../../contexts/ThemeContext";

export default function ItemsLayout() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: { 
          backgroundColor: colors.primary 
        },
        headerTintColor: colors.text,
        headerTitleStyle: { 
          fontWeight: "700" 
        },
      }}
    >
      <Stack.Screen 
        name="menu" 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="[id]" 
        options={{ title: "Détails" }} 
      />
    </Stack>
  );
}