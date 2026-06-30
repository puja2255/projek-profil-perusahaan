import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { ThemePalette } from "../theme";
import { OrgMember } from "../types";

type Node = OrgMember & { children: Node[] };

type Props = {
  members: OrgMember[];
};

export function OrgTree({ members }: Props) {
  const { palette } = useTheme();
  const tree = buildTree(members);

  return (
    <View style={styles.wrap}>
      {tree.map((node) => (
        <TreeNode key={node.id} node={node} palette={palette} depth={0} />
      ))}
    </View>
  );
}

function TreeNode({ node, palette, depth }: { node: Node; palette: ThemePalette; depth: number }) {
  const isRoot = depth === 0;

  return (
    <View style={styles.nodeWrap}>
      {/* Node card */}
      <View
        style={[
          styles.node,
          {
            backgroundColor: isRoot ? palette.accent : palette.surfaceAlt,
            borderColor: isRoot ? palette.accent : palette.border,
            shadowColor: isRoot ? palette.accent : palette.shadow,
          },
        ]}
      >
        {/* Role badge */}
        <View
          style={[
            styles.roleBox,
            {
              backgroundColor: isRoot ? "rgba(0,0,0,0.18)" : palette.accentSoft,
              borderColor: isRoot ? "rgba(0,0,0,0.2)" : palette.accent,
            },
          ]}
        >
          <Text style={[styles.roleText, { color: isRoot ? "#1f2329" : palette.accent }]}>
            {node.role}
          </Text>
        </View>
        <Text style={[styles.name, { color: isRoot ? "#1f2329" : palette.text }]}>
          {node.name}
        </Text>
      </View>

      {/* Connector line */}
      {node.children.length > 0 && (
        <View style={[styles.connectorVertical, { backgroundColor: palette.accent }]} />
      )}

      {/* Children */}
      {node.children.length > 0 && (
        <View style={styles.children}>
          {/* Horizontal connector bar */}
          {node.children.length > 1 && (
            <View style={[styles.connectorHorizontal, { backgroundColor: palette.accent }]} />
          )}
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} palette={palette} depth={depth + 1} />
          ))}
        </View>
      )}
    </View>
  );
}

function buildTree(members: OrgMember[]): Node[] {
  const map = new Map<number, Node>();
  const roots: Node[] = [];

  members.forEach((member) => {
    map.set(member.id, { ...member, children: [] });
  });

  map.forEach((node) => {
    if (node.parentId) {
      map.get(node.parentId)?.children.push(node);
    } else {
      roots.push(node);
    }
  });

  const sort = (nodes: Node[]) => {
    nodes.sort((a, b) => a.level - b.level || a.order - b.order || a.id - b.id);
    nodes.forEach((node) => sort(node.children));
  };

  sort(roots);
  return roots;
}

const styles = StyleSheet.create({
  wrap: {
    gap: 0,
    alignItems: "center",
  },
  nodeWrap: {
    alignItems: "center",
  },
  node: {
    minWidth: 160,
    maxWidth: 180,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 20,
    borderWidth: 1.5,
    alignItems: "center",
    gap: 6,
    // iOS shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 4,
  },
  roleBox: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
  },
  roleText: {
    fontWeight: "900",
    textAlign: "center",
    fontSize: 10,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  name: {
    fontWeight: "800",
    textAlign: "center",
    fontSize: 13,
    lineHeight: 18,
  },
  connectorVertical: {
    width: 2,
    height: 22,
  },
  connectorHorizontal: {
    position: "absolute",
    top: 0,
    left: "10%",
    right: "10%",
    height: 2,
    opacity: 0.5,
  },
  children: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 14,
    position: "relative",
    paddingTop: 22,
  },
});
