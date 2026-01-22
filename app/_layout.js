import { Tabs } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: "#591F0B"},
        headerTintColor: "#e8c5a5",
        headerTitleStyle: { fontWeight: "700" },
        tabBarActiveTintColor: "#591F0B",
        tabBarInactiveTintColor: "#666",
        tabBarShowLabel: false,   
        headerTitleAlign: "center",
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

