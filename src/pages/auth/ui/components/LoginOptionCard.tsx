import { Box, Group, Paper, rem, Text, ThemeIcon } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

interface LoginOptionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  link: string;
}

export default function LoginOptionCard({
  icon,
  title,
  description,
  color,
  link,
}: LoginOptionCardProps) {
  const navigate = useNavigate();

  return (
    <Paper
      p={{ base: 14, sm: 20 }}
      radius="md"
      withBorder
      style={{ cursor: "pointer" }}
      onClick={() => navigate(link)}
    >
      <Group justify="space-between" gap={16} wrap="nowrap">
        <Group gap={16} wrap="nowrap" style={{ flex: 1, minWidth: 0 }}>
          <ThemeIcon size={48} radius="md" variant="light" color={color}>
            {icon}
          </ThemeIcon>
          <Box style={{ minWidth: 0 }}>
            <Text fw={600} size="md" mb={4}>
              {title}
            </Text>
            <Text size="sm" c="dimmed" lineClamp={2}>
              {description}
            </Text>
          </Box>
        </Group>
        <Box visibleFrom="sm">
          <IconChevronRight
            style={{ width: rem(20), height: rem(20) }}
            color="var(--mantine-color-dimmed)"
          />
        </Box>
      </Group>
    </Paper>
  );
}
