import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

export function SectionBlock({ children }: PropsWithChildren) {
  return <View style={styles.block}>{children}</View>;
}

const styles = StyleSheet.create({
  block: {
    marginBottom: 28
  }
});
