import { AppText } from "./AppText";

export function Title({ children }) {
  return (
    <AppText style={{ fontSize: 20, fontWeight: "700"}}>
      {children}
    </AppText>
  );
}
