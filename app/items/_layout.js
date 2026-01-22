import { Stack } from "expo-router";

export default function ItemsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false}} />
      <Stack.Screen name="[id]" options={{ title: "Détails" }} />
    </Stack>
  );
}
