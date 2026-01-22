import { Text } from "react-native";

export function AppText({ children, style }) {
  return (
    <Text style={[{ fontSize: 16, color: "#111", fontStyle:"italic" }, style]}>
      {children}
    </Text>
  );
}
