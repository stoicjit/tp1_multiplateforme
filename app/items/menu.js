import { SectionList, View, ActivityIndicator, RefreshControl } from "react-native";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";

import { Screen } from "../../components/Screen";
import { Title } from "../../components/Title";
import { AppText } from "../../components/AppText";
import { AppButton } from "../../components/AppButton";
import { useTheme } from "../../contexts/ThemeContext";

import { menuApi } from "../../api/menuApi";
import { ItemRow } from "../../features/items/items.ui";

export default function ItemsList() {
  const router = useRouter();
  const { colors } = useTheme();
  
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    
    const result = await menuApi.getAllItems();
    
    if (result.error) {
      setError(result.error);
      setItems([]);
    } else {
      setItems(result.data);
    }
    
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchItems();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const open = (id) =>
    router.push({
      pathname: "/items/[id]",
      params: { id },
    });

  const sections = [
    {
      title: "Boissons",
      data: items.filter(x => x.category === "boisson"),
    },
    {
      title: "Sandwichs",
      data: items.filter(x => x.category === "sandwich"),
    },
  ];

  // Loading state
  if (loading) {
    return (
      <Screen>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={colors.primary} />
          <AppText style={{ marginTop: 16 }}>Chargement du menu...</AppText>
        </View>
      </Screen>
    );
  }

  // Error state
  if (error) {
    return (
      <Screen>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <AppText style={{ color: colors.error, marginBottom: 16, textAlign: 'center' }}>
            ❌ Erreur: {error}
          </AppText>
          <AppButton title="Réessayer" onPress={fetchItems} />
        </View>
      </Screen>
    );
  }

  // Success state
  return (
    <Screen scrollable={false}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ItemRow item={item} onOpen={open} />
        )}
        renderSectionHeader={({ section }) => (
          <View style={{ marginTop: 24 }}>
            <Title>{section.title}</Title>
          </View>
        )}
        ListEmptyComponent={
          <AppText style={{ textAlign: 'center', marginTop: 20 }}>
            Aucun item dans le menu.
          </AppText>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
          />
        }
      />
    </Screen>
  );
}