import { Pressable, Text, StyleSheet } from "react-native";

export function AppButton({
  title,
  onPress,
  disabled,
  style,
  textStyle,
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        disabled && styles.buttonDisabled,
        style,
      ]}
    >
      <Text style={[styles.text, textStyle]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#591F0B",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  text: {
    color: "white",
    fontWeight: "700",
  },
});
