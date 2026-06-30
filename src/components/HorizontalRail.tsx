import { PropsWithChildren, ReactNode, useEffect, useRef } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

type Props = PropsWithChildren<{
  cardWidth?: number;
  gap?: number;
  autoScrollMs?: number | null;
}>;

export function HorizontalRail({ children, cardWidth = 280, gap = 14, autoScrollMs = 3500 }: Props) {
  const ref = useRef<ScrollView | null>(null);
  const offset = useRef(0);

  useEffect(() => {
    if (!autoScrollMs) return;
    
    const timer = setInterval(() => {
      const next = offset.current + cardWidth + gap;
      const max = Math.max(0, countChildren(children) * (cardWidth + gap) - (cardWidth + gap));
      offset.current = next > max ? 0 : next;
      ref.current?.scrollTo({ x: offset.current, animated: true });
    }, autoScrollMs);

    return () => clearInterval(timer);
  }, [autoScrollMs, cardWidth, gap, children]);

  return (
    <ScrollView
      ref={ref}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.row, { gap }]}
      decelerationRate="fast"
      snapToInterval={cardWidth + gap}
      snapToAlignment="start"
      disableIntervalMomentum
    >
      {children}
    </ScrollView>
  );
}

function countChildren(children: ReactNode) {
  return Array.isArray(children) ? children.length : 1;
}

const styles = StyleSheet.create({
  row: {
    paddingBottom: 4
  }
});
