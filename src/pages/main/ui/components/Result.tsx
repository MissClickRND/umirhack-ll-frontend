import { DegreeLevel } from "@/entities/diploma";
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
} from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";

interface ResultProps {
  studentName?: string;
  specialty?: string;
  institution?: string;
  graduationYear?: string;
  degree?: string;
  status?: string;
}

export default function Result({
  studentName,
  specialty,
  institution,
  graduationYear,
  degree,
  status,
}: ResultProps) {
  const degreeLabel =
    degree && degree in DegreeLevel
      ? DegreeLevel[degree as keyof typeof DegreeLevel]
      : degree;

  return (
    <Paper p={24} radius="lg" withBorder w={"100%"}>
      <Stack gap={24}>
        <Group justify="space-between" align="center" wrap="wrap" gap={12}>
          <Stack gap={4}>
            <Title order={3} size="h4">
              Результат проверки
            </Title>
          </Stack>

          <Badge
            color="green"
            variant="light"
            size="lg"
            radius="xl"
            fw={600}
            leftSection={
              status === "VALID" ? (
                <ThemeIcon size={14} radius="xl" color="green" variant="filled">
                  <IconCheck />
                </ThemeIcon>
              ) : (
                <ThemeIcon size={14} radius="xl" variant="filled">
                  <IconX />
                </ThemeIcon>
              )
            }
            style={{
              backgroundColor:
                status === "VALID"
                  ? "var(--mantine-color-green-0)"
                  : "var(--mantine-color-red-0)",
              color:
                status === "VALID"
                  ? "var(--mantine-color-green-9)"
                  : "var(--mantine-color-red-9)",
              padding: "0 16px",
            }}
          >
            {status === "VALID" ? "Действителен" : "Недействителен"}
          </Badge>
        </Group>

        <Divider />

        <SimpleGrid
          cols={{ base: 1, sm: 2 }}
          spacing={{ base: 20, sm: 24 }}
          verticalSpacing={20}
        >
          <Stack gap={4}>
            <Text size="xs" fw={500} c="dimmed" tt="uppercase">
              Выпускник
            </Text>
            <Text size="md" fw={600} lh={1.4}>
              {studentName}
            </Text>
          </Stack>

          <Stack gap={4}>
            <Text size="xs" fw={500} c="dimmed" tt="uppercase">
              Специальность
            </Text>
            <Text size="md" fw={600} lh={1.4}>
              {specialty}
            </Text>
          </Stack>

          <Stack gap={4}>
            <Text size="xs" fw={500} c="dimmed" tt="uppercase">
              Учебное заведение
            </Text>
            <Text size="md" fw={600} lh={1.4}>
              {institution}
            </Text>
          </Stack>

          <Stack gap={4}>
            <Text size="xs" fw={500} c="dimmed" tt="uppercase">
              Год выпуска
            </Text>
            <Text size="md" fw={600}>
              {graduationYear}
            </Text>
          </Stack>

          <Stack gap={4}>
            <Text size="xs" fw={500} c="dimmed" tt="uppercase">
              Уровень
            </Text>
            <Text size="md" fw={600}>
              {degreeLabel}
            </Text>
          </Stack>
        </SimpleGrid>
      </Stack>
    </Paper>
  );
}
