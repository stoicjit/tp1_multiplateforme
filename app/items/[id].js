import { Stack, useLocalSearchParams } from "expo-router";
import { View } from "react-native";

import { Screen } from "../../components/Screen";
import { Title } from "../../components/Title";
import { AppText } from "../../components/AppText";

import { findById } from "../../features/items/items.data";

export default function ItemDetails() {

  const { id } = useLocalSearchParams();
  const item = findById(String(id));

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: "Retour" 
        }} 
      />
      
      <Screen>

        <View style={{gap:20}}>

        <Title>{item ? item.title : "Item introuvable"}</Title>
        <AppText>
            {item ? item.infos.description : "Item introuvable"}        
        </AppText>
        <AppText >
            {item ? item.infos.prix : "Item introuvable"}$        
        </AppText>
        </View>
      </Screen>
    </>
  );
}
