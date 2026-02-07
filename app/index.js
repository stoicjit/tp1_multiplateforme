import { Link } from "expo-router";
import { Screen } from "../components/Screen";
import { Title } from "../components/Title";
import { AppText } from "../components/AppText";
import { AppImage } from "../components/AppImage";
import { AppButton } from "../components";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { useResponsive } from "../hooks/useResponsive";


export default function HomeScreen() {
  const router = useRouter();
  const { isMobile } = useResponsive();

  return (
    <Screen>
      <View style={{ 
        flex: 1,
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? 0 : 24,
      }}>
        {/* Image Section */}
        <View style={{ flex: 1 }}>
          <AppImage source={require("../assets/coffee.jpg")} />
        </View>

        {/* Content Section */}
        <View
          style={{
            flex: 1,
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            padding: isMobile ? 0 : 20,
          }}
        >
          <Title>Bienvenue chez Mrs. Bean</Title>

          <AppText>
            Votre coin chaleureux pour le café parfait. Que vous cherchiez un
            espresso intense, un latte crémeux ou un cold brew rafraîchissant,
            chaque boisson est préparée avec passion et soin.
          </AppText>

          <View style={{ 
            flexDirection: isMobile ? 'column' : 'row',
            gap: 24, 
            marginTop: 24,
            width: isMobile ? '100%' : 'auto',
          }}>
            <AppButton
              title="Laisser un review"
              onPress={() => router.push("/form")}
            />
            <AppButton
              title="Voir le menu"
              onPress={() => router.push("/items")}
            />
          </View>
        </View>
      </View>
    </Screen>
  );
}