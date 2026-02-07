import { View, Switch } from "react-native";
import { useTheme } from "../contexts/ThemeContext";


export function ThemeToggle() {
  const { isDark, toggleTheme, colors } = useTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginRight: 12,
      }}
    >
      <Switch
        value={isDark}
        onValueChange={toggleTheme}
        trackColor={{ 
          false: '#f4f4f5', 
          true: '#303136'     
        }}
        thumbColor={isDark ? '#5b5981' : '#b96702'}
        ios_backgroundColor="#f4f4f5"
      />
    </View>
  );
}