import { SafeAreaView, View, ScrollView } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { useResponsive } from "../hooks/useResponsive";

export function Screen({ children, scrollable = true }) {
  const { colors } = useTheme();
  const { isDesktop } = useResponsive();

  const contentStyle = {
    flexGrow: 1,
    padding: 20,
    backgroundColor: colors.background,
    ...(isDesktop && {
      maxWidth: 1200,
      width: '100%',
      alignSelf: 'center',
    }),
  };

  if (!scrollable) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <View style={[{ flex: 1 }, contentStyle]}>
          {children}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView 
        style={{ flex: 1 }} 
        contentContainerStyle={contentStyle}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}