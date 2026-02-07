import { SafeAreaView, View } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { useResponsive } from "../hooks/useResponsive";

export function Screen({ children }) {
  const { colors } = useTheme();
  const { isDesktop } = useResponsive();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View 
        style={{ 
          flex: 1,
          padding: 20,
          backgroundColor: colors.background,
          // Center content on desktop with max width
          ...(isDesktop && {
            maxWidth: 1200,
            width: '100%',
            alignSelf: 'center',
          }),
        }}
      >
        {children}
      </View>
    </SafeAreaView>
  );
}