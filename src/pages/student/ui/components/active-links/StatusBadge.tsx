import { Badge, useMantineColorScheme } from "@mantine/core";
import { LinkStatus } from "./types";

interface StatusBadgeProps {
  status: LinkStatus;
}

const getStatusLabel = (status: LinkStatus): string => {
  switch (status) {
    case "active":
      return "Активна";
    case "revoked":
      return "Отозвана";
    case "expired":
      return "Истекла";
  }
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";
  const isActive = status === "active";

  return (
    <Badge
      variant="light"
      radius="xl"
      size="sm"
      fw={600}
      fz={10}
      miw={110}
      style={{
        backgroundColor: isActive
          ? isDark
            ? "rgba(64, 192, 87, 0.18)"
            : "var(--mantine-color-green-0)"
          : isDark
            ? "rgba(250, 82, 82, 0.18)"
            : "var(--mantine-color-red-0)",
        color: isActive
          ? isDark
            ? "var(--mantine-color-green-2)"
            : "var(--mantine-color-green-9)"
          : isDark
            ? "var(--mantine-color-red-2)"
            : "var(--mantine-color-red-9)",
        padding: "0 16px",
      }}
    >
      {getStatusLabel(status)}
    </Badge>
  );
}
