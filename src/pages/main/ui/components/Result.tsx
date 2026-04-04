import {
  Paper,
  Title,
  Text,
  Badge,
  Group,
  SimpleGrid,
  Divider,
  ThemeIcon,
  Stack,
  rem,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

interface ResultProps {
  studentName?: string;
  specialty?: string;
  institution?: string;
  graduationYear?: string;
  degree?: string;
  status?: boolean;
}

export default function Result({
  studentName = "Иванов Александр Сергеевич",
  specialty = "Программная инженерия (09.03.04)",
  institution = "Московский Государственный Технический Университет",
  graduationYear = "2022",
  degree = "Бакалавр",
  status = true,
}: ResultProps) {


  return (
    <Paper
      p={{ base: 24, sm: 32 }}
      radius="lg"
      withBorder

      w={'100%'}
    >
      <Stack gap={24}>
        <Group justify="space-between" align="center" wrap="nowrap">
          <Stack gap={4}>
            <Title order={3} size="h4">
              Результат проверки
            </Title>
          </Stack>

          <Badge
            color="green"
            variant="light"
            size="md"
            radius="xl"
            fw={600}
            leftSection={
              status ? (
                <ThemeIcon
                  size={14}
                  radius="xl"
                  color="green"
                  variant="filled"
                >
                  <IconCheck style={{ width: rem(8), height: rem(8) }} />
                </ThemeIcon>
              ) : null
            }
            style={{
              backgroundColor: status
                ? "var(--mantine-color-green-0)"
                : "var(--mantine-color-red-0)",
              color: status 
                ? "var(--mantine-color-green-9)"
                : "var(--mantine-color-red-9)",
              padding: "0 16px",
            }}
          >
            {status ? "ДЕЙСТВИТЕЛЕН" : "НЕ НАЙДЕН"}
          </Badge>
        </Group>

        <Divider />

        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={{ base: 20, sm: 24 }} verticalSpacing={20}>
          {/* Выпускник */}
          <Stack gap={4}>
            <Text size="xs" fw={500} c="text-secondary" tt="uppercase">
              Выпускник
            </Text>
            <Text size="md" fw={600} c="text-primary" lh={1.4}>
              {studentName}
            </Text>
          </Stack>

          <Stack gap={4}>
            <Text size="xs" fw={500} c="text-secondary" tt="uppercase">
              Специальность
            </Text>
            <Text size="md" fw={600} c="text-primary" lh={1.4}>
              {specialty}
            </Text>
          </Stack>

          <Stack gap={4} >
            <Text size="xs" fw={500} c="text-secondary" tt="uppercase">
              Учебное заведение
            </Text>
            <Text size="md" fw={600} c="text-primary" lh={1.4}>
              {institution}
            </Text>
          </Stack>

          <Stack gap={4}>
            <Text size="xs" fw={500} c="text-secondary" tt="uppercase">
              Год выпуска
            </Text>
            <Text size="md" fw={600} c="text-primary">
              {graduationYear}
            </Text>
          </Stack>

          <Stack gap={4}>
            <Text size="xs" fw={500} c="text-secondary" tt="uppercase">
              Уровень
            </Text>
            <Text size="md" fw={600} c="text-primary">
              {degree}
            </Text>
          </Stack>
        </SimpleGrid>
      </Stack>
    </Paper>
  );
}