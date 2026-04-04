import {
  Badge,
  Group,
  Paper,
  Stack,
  Text,
  ThemeIcon,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { IconClockHour4 } from "@tabler/icons-react";

export default function Notification() {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Paper
      withBorder
      radius="lg"
      p={{ base: 16, sm: 20 }}
      w="100%"
      style={{
        backgroundColor: isDark
          ? theme.other.surfaceSecondaryDark
          : "var(--mantine-color-primary-0)",
        borderColor: isDark ? theme.other.outlineDark : theme.other.outline,
      }}
    >
      <Group align="flex-start" gap={12} wrap="nowrap">
        <ThemeIcon
          size={42}
          radius="xl"
          color={isDark ? "primaryDark" : "primary"}
          variant="filled"
        >
          <IconClockHour4 size={22} />
        </ThemeIcon>

        <Stack gap={6} style={{ flex: 1 }}>
          <Group justify="space-between" align="center" gap={8} wrap="wrap">
            <Title order={4}>Ваша заявка рассматривается</Title>
            <Badge color={isDark ? "primaryDark" : "primary"} variant="light">
              На проверке
            </Badge>
          </Group>

          <Text
            size="sm"
            c={
              isDark ? theme.other.textSecondaryDark : theme.other.textSecondary
            }
          >
            В ближайшее время с вами свяжется администратор, что бы подтвердить
            данные. Обычно это занимает 1-2 рабочих дня.
          </Text>
        </Stack>
      </Group>
    </Paper>
  );
}
