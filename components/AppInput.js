import { TextInput, StyleSheet } from "react-native";

export function AppInput({ showError, style, ...props }) {
  return (
    <TextInput
      {...props}
      style={[
        styles.input,
        showError && styles.inputError,
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width:"100vh",
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#dc3545',
  },
});

