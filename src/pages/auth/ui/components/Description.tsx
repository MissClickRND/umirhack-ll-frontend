import { Grid, Stack, Title, Text } from "@mantine/core";
import { IconShieldLock, IconDatabase, IconBolt } from "@tabler/icons-react";
import FeatureItem from "./FeatureItem";

export default function Description() {
  return (
    <Grid.Col span={{ base: 12, md: 6 }}>
      <Stack gap={40}>
        {/* <Badge
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
                </Badge> */}

        <Title order={1} size="h1" lh={1.2}>
          Добро пожаловать в <br />
          <span style={{ color: "var(--mantine-color-brand-5)" }}>
            TrustEDU
          </span>
        </Title>

        <Text size="lg" c="dimmed" lh={1.6}>
          Проверяйте подлинность дипломов и управляйте документами об
          образовании в едином защищённом пространстве.
        </Text>

        <Stack gap={24}>
          <FeatureItem
            icon={<IconDatabase />}
            title="Единая база"
            description="Все документы хранятся в защищённой базе данных, доступной 24/7"
            color="brand"
          />
          <FeatureItem
            icon={<IconShieldLock />}
            title="Защита данных"
            description="Шифрование всех данных по ГОСТ"
            color="brand"
          />
          <FeatureItem
            icon={<IconBolt />}
            title="Мгновенная проверка"
            description="Получите результат мгновенно, без посредников и бумажных справок"
            color="brand"
          />
        </Stack>
      </Stack>
    </Grid.Col>
  );
}
