import { Image } from "react-native";
import { useResponsive } from "../hooks/useResponsive";

export function AppImage({ source }) {
  const { isMobile } = useResponsive();

  return (
    <Image
      source={source}
      style={{
        width: "100%",
        height: isMobile ? 290 : "90%",
        borderRadius: isMobile ? 16 : 24,
      }}
      resizeMode="cover"
    />
  );
}