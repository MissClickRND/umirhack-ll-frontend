import { Grid, Stack, Badge, ThemeIcon, rem, Title, Text } from "@mantine/core";
import { IconShieldLock, IconDatabase, IconBolt } from "@tabler/icons-react";
import FeatureItem from "./FeatureItem";

export default function Description() {
    return (
        <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap={40}>
                <Badge
                    variant="light"
                    color="brand"
                    size="lg"
                    leftSection={
                        <ThemeIcon size={16} radius="xl" color="brand" variant="filled">
                            <IconShieldLock style={{ width: rem(10), height: rem(10) }} />
                        </ThemeIcon>
                    }
                >
                    Безопасный доступ
                </Badge>

                <Title order={1} size="h1" lh={1.2}>
                    Добро пожаловать в <br />
                    <span style={{ color: "var(--mantine-color-brand-6)" }}>
                        Portal for HR
                    </span>
                </Title>

                <Text size="lg" c="dimmed" lh={1.6}>
                    Проверяйте подлинность дипломов и управляйте документами
                    об образовании в едином защищённом пространстве.
                </Text>

                <Stack gap={24}>
                    <FeatureItem
                        icon={<IconDatabase />}
                        title="Единая база ФРДО"
                        description="Прямая интеграция с федеральным реестром документов об образовании"
                        color="brand"
                    />
                    <FeatureItem
                        icon={<IconShieldLock />}
                        title="Защита данных"
                        description="Шифрование по ГОСТ и соответствие требованиям 152-ФЗ"
                        color="brand"
                    />
                    <FeatureItem
                        icon={<IconBolt />}
                        title="Мгновенная проверка"
                        description="Получите результат верификации менее чем за 30 секунд"
                        color="brand"
                    />
                </Stack>
            </Stack>
        </Grid.Col>
    );
}
