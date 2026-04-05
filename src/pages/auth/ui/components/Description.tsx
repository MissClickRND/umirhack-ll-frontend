import {
  Grid,
  Stack,
  Title,
  Text,
  Image,
  useMantineColorScheme,
  useMantineTheme,
  Group,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconShieldLock, IconDatabase, IconBolt } from "@tabler/icons-react";
import FeatureItem from "./FeatureItem";

export default function Description() {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";
  const isTablet = useMediaQuery("(max-width: 64em)");
  const isMobile = useMediaQuery("(max-width: 48em)");

  const sectionGap = isMobile ? 24 : isTablet ? 32 : 40;
  const featuresGap = isMobile ? 16 : 24;
  const titleSize = isMobile ? "1.7rem" : isTablet ? "2.5rem" : "2.6rem";

  return (
    <Grid.Col span={{ base: 12, md: 6 }}>
      <Stack gap={sectionGap}>
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
        <Group
          align="flex-start"
          gap={isMobile ? 10 : 16}
          style={{ flexWrap: isMobile ? "wrap" : "nowrap" }}
        >
          <Image src="/icons/logo.svg" alt="TrustEDU" w={isMobile ? 72 : 110} />
          <Title
            order={1}
            lh={{ base: 1.1, sm: 1.2 }}
            style={{ fontSize: titleSize }}
          >
            Добро пожаловать в <br />
            <Text
              span
              fz={{ base: 32, sm: 50 }}
              fw={600}
              c={theme.primaryColor}
            >
              TrustEDU
            </Text>
          </Title>
        </Group>

        <Text
          visibleFrom="sm"
          size={isMobile ? "md" : "lg"}
          c={isDark ? theme.other.textSecondaryDark : theme.other.textSecondary}
          lh={1.6}
        >
          Проверяйте подлинность дипломов и управляйте документами об
          образовании в едином защищённом пространстве.
        </Text>

        <Stack gap={featuresGap} visibleFrom="sm">
          <FeatureItem
            icon={<IconDatabase />}
            title="Единая база"
            description="Все документы хранятся в защищённой базе данных, доступной 24/7"
            color={isDark ? "primaryDark" : "primary"}
          />
          <FeatureItem
            icon={<IconShieldLock />}
            title="Защита данных"
            description="Шифрование всех данных по ГОСТ, проверка публичным и приватным ключом."
            color={isDark ? "primaryDark" : "primary"}
          />
          <FeatureItem
            icon={<IconBolt />}
            title="Мгновенная проверка"
            description="Получите результат мгновенно, без посредников и бумажных справок"
            color={isDark ? "primaryDark" : "primary"}
          />
        </Stack>
      </Stack>
    </Grid.Col>
  );
}
