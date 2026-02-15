import { Stack, useLocalSearchParams } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";

import { Screen } from "../../components/Screen";
import { Title } from "../../components/Title";
import { AppText } from "../../components/AppText";
import { AppButton } from "../../components/AppButton";
import { useTheme } from "../../contexts/ThemeContext";

import { menuApi } from "../../services/menuApi";

export default function ItemDetails() {
  const { id } = useLocalSearchParams();
  const { colors } = useTheme();
  
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      setError(null);
      
      const result = await menuApi.getItemById(String(id));
      
      if (result.error) {
        setError(result.error);
        setItem(null);
      } else {
        setItem(result.data);
      }
      
      setLoading(false);
    };

    fetchItem();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <>
        <Stack.Screen options={{ title: "" }} />
        <Screen>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={colors.primary} />
            <AppText style={{ marginTop: 16 }}>Chargement...</AppText>
          </View>
        </Screen>
      </>
    );
  }

  // Error state
  if (error || !item) {
    return (
      <>
        <Stack.Screen options={{ title: "" }} />
        <Screen>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            <AppText style={{ color: colors.error, marginBottom: 16, textAlign: 'center' }}>
              ❌ {error || "Item introuvable"}
            </AppText>
          </View>
        </Screen>
      </>
    );
  }

  // Success state
  return (
    <>
      <Stack.Screen options={{ title: item.title }} />
      <Screen>
        <View style={{ gap: 20 }}>
          <Title>{item.title}</Title>
          <AppText>{item.description}</AppText>
          <AppText style={{ fontSize: 24, fontWeight: 'bold', color: colors.primary }}>
            {item.prix.toFixed(2)} $
          </AppText>
        </View>
      </Screen>
    </>
  );
}