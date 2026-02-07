import { Text } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

export function AppText({ children, style, ...props }) {
  const { colors } = useTheme();

  return (
    <Text 
      style={[
        { color: colors.text, fontSize: 16 }, 
        style
      ]} 
      {...props}
    >
      {children}
    </Text>
  );
}
