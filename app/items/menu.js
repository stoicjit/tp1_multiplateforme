import { SectionList,View } from "react-native";
import { useRouter } from "expo-router";

import { Screen } from "../../components/Screen";
import { Title } from "../../components/Title";
import { AppText } from "../../components/AppText";

import { ITEMS } from "../../features/items/items.data";
import { ItemRow } from "../../features/items/items.ui";

export default function ItemsList() {
  const router = useRouter();

  const open = (id) =>
    router.push({
      pathname: "/items/[id]",
      params: { id },
    });

  const sections = [
    {
      title: "Boissons",
      data: ITEMS.filter(x => x.category === "boisson"),
    },
    {
      title: "Sandwichs",
      data: ITEMS.filter(x => x.category === "sandwich"),
    },

  ];

  return (
    <Screen>
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
        ListEmptyComponent={<AppText>Aucun item.</AppText>}
      />
    </Screen>
  );
}
