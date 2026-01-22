import { Pressable } from "react-native";
import { AppText } from "../../components/AppText";

export function ItemRow({ item, onOpen }) {
  return (
    <Pressable
      onPress={() => onOpen(item.id)}
      style={{ padding: 14, borderBottomWidth: 1, borderColor: "#eee" }}
    >
      <AppText style={{ fontWeight: "700" }}>{item.title}</AppText>
 
    </Pressable>
  );
}
