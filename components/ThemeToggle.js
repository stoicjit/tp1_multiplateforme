import { Pressable, Text } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Pressable
      onPress={toggleTheme}
      style={{
        padding: 8,
        marginRight: 12,
      }}
    >
      <Text style={{ fontSize: 24 }}>
        {isDark ? '☀️' : '🌙'}
      </Text>
    </Pressable>
  );
}