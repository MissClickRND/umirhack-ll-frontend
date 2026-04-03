import { Grid, Paper, Stack, Title, Text, Box, Anchor } from "@mantine/core";
import { IconSalad, IconBuildingBank } from "@tabler/icons-react";
import LoginOptionCard from "./LoginOptionCard";

export default function Choose() {
    return (
        <Grid.Col span={{ base: 12, md: 6 }}>
            <Paper p={40} radius="lg" shadow="xl" withBorder>
                <Stack gap={32}>
                    <Stack gap={8} align="center">
                        <Title order={2} size="h3" ta="center">
                            Вход в систему
                        </Title>
                        <Text size="sm" c="dimmed" ta="center">
                            Выберите тип учётной записи для входа
                        </Text>
                    </Stack>

                    <Stack gap={16}>
                        <LoginOptionCard
                            icon={<IconSalad />}
                            title="Студент"
                            description="Проверка своих документов об образовании"
                            color="secondary"
                        />
                        <LoginOptionCard
                            icon={<IconBuildingBank />}
                            title="Учебное заведение"
                            description="Управление записями и выдача документов"
                            color="brand"
                        />
                    </Stack>

                    <Box mt={16}>
                        <Text size="xs" c="dimmed" ta="center" lh={1.5}>
                            Входя в систему, вы соглашаетесь с{" "}
                            <Anchor href="/terms" size="xs" c="brand.6">
                                условиями использования
                            </Anchor>{" "}
                            и{" "}
                            <Anchor href="/privacy" size="xs" c="brand.6">
                                политикой конфиденциальности
                            </Anchor>
                        </Text>
                    </Box>
                </Stack>
            </Paper>
        </Grid.Col>
    );
}