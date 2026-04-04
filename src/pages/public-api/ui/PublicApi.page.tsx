import {
  Badge,
  Box,
  Code,
  Group,
  Paper,
  Stack,
  Table,
  Text,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";

const getDiplomaPath = "/employer/public/verify/:diplomaNumber";
const postVerifyPath = "/employer/public/verify";

const getResponseExample = `{
  "id": 2,
  "fullNameAuthor": "Иванов Иван Сергеевич",
  "registrationNumber": "1111111111111",
  "specialty": "ИиВТ",
  "degreeLevel": "BACHELOR",
  "status": "REVOKED",
  "university": {
    "id": 1,
    "name": "Донской Государственный Технический Университет",
    "shortName": "ДГТУ"
  }
}`;

const postSingleRequestExample = `{
  "diplomaNumber": "1111111111111"
}`;

const postBatchRequestExample = `{
  "diplomaNumbers": [
    "1111111111111",
    "2222222222222"
  ]
}`;

const postResponseSingleExample = `[
  {
    "id": 2,
    "fullNameAuthor": "Иванов Иван Сергеевич",
    "registrationNumber": "1111111111111",
    "specialty": "ИиВТ",
    "degreeLevel": "BACHELOR",
    "status": "REVOKED",
    "university": {
      "id": 1,
      "name": "Донской Государственный Технический Университет",
      "shortName": "ДГТУ"
    }
  }
]`;

const postResponseBatchExample = `[
  {
    "id": 2,
    "fullNameAuthor": "Иванов Иван Сергеевич",
    "registrationNumber": "1111111111111",
    "specialty": "ИиВТ",
    "degreeLevel": "BACHELOR",
    "status": "REVOKED",
    "university": {
      "id": 1,
      "name": "Донской Государственный Технический Университет",
      "shortName": "ДГТУ"
    }
  },
  {
    "id": 3,
    "fullNameAuthor": "Петров Петр Николаевич",
    "registrationNumber": "2222222222222",
    "specialty": "Информационная безопасность",
    "degreeLevel": "MASTER",
    "status": "VALID",
    "university": {
      "id": 1,
      "name": "Донской Государственный Технический Университет",
      "shortName": "ДГТУ"
    }
  }
]`;

export default function PublicApiPage() {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  const apiBaseUrl = (import.meta.env.VITE_API_URL ?? window.location.origin)
    .toString()
    .replace(/\/+$/, "");

  return (
    <Box
      bg={isDark ? theme.other.backgroundDark : theme.other.background}
      h="100%"
      px={{ base: "md", sm: "xl" }}
      py="xl"
      style={{ overflowY: "auto" }}
    >
      <Stack align="stretch" w="100%" maw={1100} mx="auto" gap="lg">
        <Paper
          p={{ base: 16, sm: 24, md: 32 }}
          radius="lg"
          shadow="sm"
          withBorder
        >
          <Stack gap="sm">
            <Group gap="xs">
              <Badge color="green" variant="light">
                Public API
              </Badge>
            </Group>
            <Title order={1}>Наш публичный API</Title>
            <Text c="dimmed">
              Публичный API позволяет автоматизировать процесс проверки дипломов
              и интегрировать его в ваши HR-системы. Ниже вы найдете подробную
              документацию по каждому endpoint, примеры запросов и ответов, а
              также описание возможных кодов ошибок.
            </Text>
          </Stack>
        </Paper>

        <Paper
          p={{ base: 16, sm: 24, md: 32 }}
          radius="lg"
          shadow="sm"
          withBorder
        >
          <Stack gap="md">
            <Title order={3}>1. Подключение</Title>
            <Text fw={600}>Base URL</Text>
            <Code block>{apiBaseUrl}</Code>
          </Stack>
        </Paper>

        <Paper
          p={{ base: 16, sm: 24, md: 32 }}
          radius="lg"
          shadow="sm"
          withBorder
        >
          <Stack gap="md">
            <Group gap="xs">
              <Badge color="teal">GET</Badge>
              <Code>{getDiplomaPath}</Code>
            </Group>

            <Text fw={600}>Описание</Text>
            <Text>Возвращает детальную информацию о дипломе по номеру.</Text>

            <Text fw={600}>Параметры</Text>
            <Table withRowBorders>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Параметр</Table.Th>
                  <Table.Th>Тип</Table.Th>
                  <Table.Th>Описание</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                <Table.Tr>
                  <Table.Td>diplomaNumber</Table.Td>
                  <Table.Td>string</Table.Td>
                  <Table.Td>Номер диплома, ровно 13 цифр</Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>

            <Text fw={600}>Ответ</Text>
            <Code block>{getResponseExample}</Code>
          </Stack>
        </Paper>

        <Paper
          p={{ base: 16, sm: 24, md: 32 }}
          radius="lg"
          shadow="sm"
          withBorder
        >
          <Stack gap="md">
            <Group gap="xs">
              <Badge color="orange">POST</Badge>
              <Code>{postVerifyPath}</Code>
            </Group>

            <Text fw={600}>Описание</Text>
            <Text>
              Универсальный endpoint: принимает либо один номер диплома, либо
              массив номеров. Ответ всегда приходит массивом детальных объектов
              дипломов.
            </Text>

            <Text fw={600}>Body запроса (один номер)</Text>
            <Code block>{postSingleRequestExample}</Code>

            <Text fw={600}>Ответ</Text>
            <Code block>{postResponseSingleExample}</Code>

            <Text fw={600}>Body запроса (массив номеров)</Text>
            <Code block>{postBatchRequestExample}</Code>

            <Text fw={600}>Ответ</Text>
            <Code block>{postResponseBatchExample}</Code>
          </Stack>
        </Paper>

        <Paper
          p={{ base: 16, sm: 24, md: 32 }}
          radius="lg"
          shadow="sm"
          withBorder
        >
          <Stack gap="md">
            <Title order={3}>Коды ответов</Title>
            <Table withRowBorders>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Код</Table.Th>
                  <Table.Th>Когда возвращается</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                <Table.Tr>
                  <Table.Td>200</Table.Td>
                  <Table.Td>Успешная проверка запроса</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>400</Table.Td>
                  <Table.Td>Неверный формат номера</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>404</Table.Td>
                  <Table.Td>GET/POST: диплом по номеру не найден</Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
}
