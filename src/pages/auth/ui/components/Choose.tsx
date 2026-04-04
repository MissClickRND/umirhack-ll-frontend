import {
  Grid,
  Paper,
  Stack,
  Title,
  Text,
  Box,
  Anchor,
  useMantineColorScheme,
} from "@mantine/core";
import { IconBuildingBank, IconSchool } from "@tabler/icons-react";
import LoginOptionCard from "./LoginOptionCard";

export default function Choose() {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Grid.Col span={{ base: 12, md: 6 }}>
      <Paper
        p={{ base: 20, sm: 28, md: 40 }}
        radius="lg"
        shadow="xl"
        withBorder
      >
        <Stack gap={32}>
          <Stack gap={8} align="center">
            <Title order={2} size="h3" ta="center">
              Регистрация нового аккаунта
            </Title>
            <Text size="sm" c="dimmed" ta="center">
              Выберите тип учётной записи
            </Text>
          </Stack>

          <Stack gap={16}>
            <LoginOptionCard
              link="/auth/register/student"
              icon={<IconSchool />}
              title="Студент"
              description="Проверка своих документов об образовании"
              color="secondary"
            />
            <LoginOptionCard
              link="/auth/register/university"
              icon={<IconBuildingBank />}
              title="Учебное заведение"
              description="Управление записями и выдача документов"
              color={isDark ? "primaryDark" : "primary"}
            />
          </Stack>

          <Box mt={16}>
            <Text size="xs" c="dimmed" ta="center" lh={1.5}>
              Входя в систему, вы соглашаетесь с{" "}
              <Anchor
                href="/terms"
                size="xs"
                c={isDark ? "primaryDark.4" : "primary.6"}
              >
                условиями использования
              </Anchor>{" "}
              и{" "}
              <Anchor
                href="/privacy"
                size="xs"
                c={isDark ? "primaryDark.4" : "primary.6"}
              >
                политикой конфиденциальности
              </Anchor>
            </Text>
          </Box>
        </Stack>
      </Paper>
    </Grid.Col>
  );
}
