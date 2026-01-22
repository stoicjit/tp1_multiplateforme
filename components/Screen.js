import { View, ScrollView, Platform } from "react-native";

export function Screen({ children }) {
  if (Platform.OS === "web") {
    return (
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexDirection: "row", 
          padding: 36,
          gap: 80,
          backgroundColor: "#e8c5a5",
          paddingTop: 60,
          minHeight: "100%",

        }}
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 24,
        backgroundColor: "#e8c5a5",
      }}
    >
      {children}
    </View>
  );
}
