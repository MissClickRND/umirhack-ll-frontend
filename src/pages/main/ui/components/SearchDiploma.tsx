import { useState } from "react";
import {
  Stack,
  Paper,
  rem,
  Title,
  TextInput,
  Group,
  Button,
  Text,
} from "@mantine/core";
import {
  IconSearch,
  IconAlertCircle,
  IconArrowRight,
} from "@tabler/icons-react";

export default function SearchDiploma() {
  const [query, setQuery] = useState("");

  return (
    <Stack w={"100%"}>
      <Paper
        p={{ base: 18, sm: 24, md: 32 }}
        radius="lg"
        shadow="sm"
        withBorder
      >
        <Stack gap={24}>
          <Stack align="center" gap={8} mb={20}>
            <Title ta="center" order={2} size="h2" fw={700}>
              Проверка диплома
            </Title>
            <Text ta={"center"} size="sm" c="dimmed" px={{ base: 0, sm: 20 }}>
              Проверка подлинности документов об образовании по единой базе
              выпускников.
            </Text>
          </Stack>

          <Stack gap={8}>
            <Text ta="left" size="sm" fw={500}>
              Идентификатор документа
            </Text>
            <TextInput
              placeholder="Введите номер диплома"
              value={query}
              onChange={(e) => setQuery(e.currentTarget.value)}
              leftSection={<IconSearch size={18} />}
              size="md"
              radius="md"
            />
            <Group justify="flex-start" gap={4}>
              <IconAlertCircle size={14} color="var(--mantine-color-dimmed)" />
              <Text size="xs" c="dimmed">
                Проверка занимает менее 30 секунд
              </Text>
            </Group>
          </Stack>

          <Button
            fullWidth
            size="lg"
            color="primary"
            rightSection={<IconArrowRight size={18} />}
            radius="md"
            mt={rem(8)}
            fw={600}
          >
            Проверить
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
}
