import { Text } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

export function Title({ children, style }) {
  const { colors } = useTheme();

  return (
    <Text 
      style={[
        { 
          fontSize: 24, 
          fontWeight: "bold", 
          color: colors.text,
        }, 
        style
      ]}
    >
      {children}
    </Text>
  );
}