import { Image, Platform } from "react-native";

export function AppImage({ source }) {
  return (
    <Image
      source={source}
      style={{
        width: Platform.select({
          web: "100%",
          default: "100%",
        }),
        height: Platform.select({
          web: "100%",
          default: 290,
        }),
        borderRadius: Platform.select({
          web: 24,
          default: 16,
        }),
      }}
      resizeMode="cover"
    />
  );
}
