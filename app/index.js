import { Screen } from "../components/Screen";
import { Title } from "../components/Title";
import { AppText } from "../components/AppText";
import { AppImage } from "../components/AppImage";
import { AppButton } from "../components";
import { View } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <Screen>
      <View style={{ flex: 1 }}>
        <AppImage source={require("../assets/coffee.jpg")} />
      </View>

      <View
        style={{
          flex: 1,
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <Title>Bienvenue chez Mrs. Bean</Title>

        <AppText>
          Votre coin chaleureux pour le café parfait. Que vous cherchiez un
          espresso intense, un latte crémeux ou un cold brew rafraîchissant,
          chaque boisson est préparée avec passion et soin.
        </AppText>

        <AppText style={{ fontWeight: "700", fontSize: 18, marginBottom: 4 }}>
          ☕ Boisson du jour
        </AppText>

        <AppText>Cappuccino vanille — doux, chaud et réconfortant.</AppText>

        {/* Buttons */}
        <View style={{ flexDirection: "row", gap: 24, marginTop: 24 }}>
          <AppButton
            title="Laisser un review"
            onPress={() => router.push("/form")} // go to form page
          />
          <AppButton
            title="Voir le menu"
            onPress={() => router.push("/items")} // go to items page
          />
        </View>
      </View>
    </Screen>
  );
}

