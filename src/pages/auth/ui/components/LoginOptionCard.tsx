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
      p={20}
      radius="md"
      withBorder
      style={{ cursor: "pointer" }}
      onClick={() => navigate(link)}
    >
      <Group justify="space-between" gap={16}>
        <Group gap={16}>
          <ThemeIcon size={48} radius="md" variant="light" color={color}>
            {icon}
          </ThemeIcon>
          <Box>
            <Text fw={600} size="md" mb={4}>
              {title}
            </Text>
            <Text size="sm" c="dimmed">
              {description}
            </Text>
          </Box>
        </Group>
        <IconChevronRight
          style={{ width: rem(20), height: rem(20) }}
          color="var(--mantine-color-dimmed)"
        />
      </Group>
    </Paper>
  );
}
