import { TextInput } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

export function AppInput({ showError, style, ...props }) {
  const { colors } = useTheme();

  return (
    <TextInput
      style={[
        {
          borderWidth: 1,
          borderColor: showError ? colors.error : colors.border,
          backgroundColor: colors.surface,
          color: colors.text,
          padding: 12,
          borderRadius: 8,
          fontSize: 16,
        },
        style,
      ]}
      placeholderTextColor={colors.textSecondary}
      {...props}
    />
  );
}
