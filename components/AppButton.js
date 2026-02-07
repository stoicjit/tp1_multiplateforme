import { Pressable } from "react-native";
import { AppText } from "./AppText";
import { useTheme } from "../contexts/ThemeContext";

export function AppButton({ title, onPress, disabled = false }) {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={{
        backgroundColor: disabled ? colors.buttonDisabled : colors.primary,
        padding: 14,
        borderRadius: 8,
        alignItems: "center",
      }}
    >
      <AppText style={{ 
        color: disabled ? colors.textSecondary : '#FFFFFF',
        fontWeight: "600" 
      }}>
        {title}
      </AppText>
    </Pressable>
  );
}
