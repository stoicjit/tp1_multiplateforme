import { Tabs } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { ThemeProvider, useTheme } from "../contexts/ThemeContext";
import { ThemeToggle } from "../components/ThemeToggle";



function ThemedTabs() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: "700" },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarShowLabel: false,   
        headerTitleAlign: "center",
        tabBarStyle: { 
          backgroundColor: colors.background,
          borderTopColor: colors.border,
        },
        headerRight: () => <ThemeToggle />,
      }}
    >
      <Tabs.Screen
        name="form"
        options={{
          title: "Review",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="form" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="coffee" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="items"
        options={{
          title: "Menu",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="list" size={size} color={color} />
          ),
        }}
      />
    </Tabs>

  );
}

export default function TabsLayout() {
  return (
    <ThemeProvider>
      <ThemedTabs />
    </ThemeProvider>
  );
}