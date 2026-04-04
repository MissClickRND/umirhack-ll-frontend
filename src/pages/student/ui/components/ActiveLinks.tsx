import {
  Box,
  Paper,
  Title,
  Text,
  Table,
  Badge,
  Button,
  ActionIcon,
  Group,
  Stack,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconLock, IconEye } from "@tabler/icons-react";
import { LinkHistoryItem } from "../../model/type";





const data: LinkHistoryItem[] = [
  {
    id: 1,
    diplomaNumber: "БВС 0123456",
    token: "verify.edu/x7k9m2",
    createdAt: "13 апр, 14:30",
    validUntil: "14 апр, 14:30",
    status: "active",
  },
  {
    id: 2,
    diplomaNumber: "БВС 0987654",
    token: "verify.edu/a3n8p1",
    createdAt: "10 апр, 09:15",
    validUntil: "11 апр, 09:15",
    status: "revoked",
  },
  {
    id: 3,
    diplomaNumber: "БВС 0123456",
    token: "verify.edu/m5q7r9",
    createdAt: "08 апр, 16:45",
    validUntil: "09 апр, 16:45",
    status: "expired",
  },
];

export default function ActiveLinks () {
  const isMobile = useMediaQuery("(max-width: 64em)");

  const getStatusStyles = (status: LinkHistoryItem["status"]) => {
    const isActive = status === "active";

    return {
      backgroundColor: isActive ? "var(--mantine-color-green-0)" : "var(--mantine-color-red-0)",
      color: isActive ? "var(--mantine-color-green-9)" : "var(--mantine-color-red-9)",
      padding: "0 16px",
    };
  };

  const renderStatusBadge = (status: LinkHistoryItem["status"]) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="light" radius="xl" size="sm" fw={600} fz={10} miw={110} style={getStatusStyles(status)}>
            Активна
          </Badge>
        );
      case "revoked":
        return (
          <Badge variant="light" radius="xl" size="sm" fw={600} fz={10} miw={110} style={getStatusStyles(status)}>
            Отозвана
          </Badge>
        );
      case "expired":
        return (
          <Badge variant="light" radius="xl" size="sm" fw={600} fz={10} miw={110} style={getStatusStyles(status)}>
            Истекла
          </Badge>
        );
    }
  };

  return (
    <Paper
      w="100%"
      p={{ base: 16, sm: 24, md: 32 }}
      radius="lg"
      shadow="sm"
      withBorder
    >

      <Group justify="space-between" align="center" mb="md" wrap="nowrap">
        <Title order={2} size={isMobile ? "h3" : "h2"} fw={700}>
          Активные ссылки и история
        </Title>
        <Group gap={6} visibleFrom="sm">
          <IconLock size={14} color="var(--mantine-color-text-secondary)" />
          <Text size="xs" c="dimmed" style={{ whiteSpace: "nowrap" }}>
            Данные защищены и не передаются третьим лицам
          </Text>
        </Group>
      </Group>

      {isMobile ? (
        <Stack gap={12}>
          {data.map((row) => (
            <Paper key={row.id} p={14} radius="md" withBorder>
              <Stack gap={10}>
                <Group justify="space-between" align="flex-start" wrap="nowrap">
                  <Box>
                    <Text size="xs" c="dimmed">
                      Диплом
                    </Text>
                    <Text fw={600}>{row.diplomaNumber}</Text>
                  </Box>
                  {renderStatusBadge(row.status)}
                </Group>

                <Box>
                  <Text size="xs" c="dimmed">
                    Ссылка/Токен
                  </Text>
                  <Text>{row.token}</Text>
                </Box>

                <Group justify="space-between" align="center" wrap="nowrap">
                  <Box>
                    <Text size="xs" c="dimmed">
                      Создан
                    </Text>
                    <Text>{row.createdAt}</Text>
                  </Box>
                  <Box>
                    <Text size="xs" c="dimmed" ta="right">
                      Действителен до
                    </Text>
                    <Text ta="right">{row.validUntil}</Text>
                  </Box>
                </Group>

                <Group grow>
                  {row.status === "active" ? (
                    <Button variant="light" size="sm" radius="md" color="red">
                      Отозвать
                    </Button>
                  ) : (
                    <Button variant="light" size="sm" radius="md" disabled>
                      Неактивна
                    </Button>
                  )}
                  <ActionIcon variant="light" radius="md" color="gray" size="lg">
                    <IconEye size={16} />
                  </ActionIcon>
                </Group>
              </Stack>
            </Paper>
          ))}
        </Stack>
      ) : (
        <Table.ScrollContainer minWidth={920}>
          <Table withRowBorders>
            <Table.Thead>
              <Table.Tr c="dimmed">
                <Table.Th>Диплом</Table.Th>
                <Table.Th>Ссылка/Токен</Table.Th>
                <Table.Th>Создан</Table.Th>
                <Table.Th>Действителен до</Table.Th>
                <Table.Th>Статус</Table.Th>
                <Table.Th ta="center">Действия</Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {data.map((row) => (
                <Table.Tr key={row.id}>
                  <Table.Td fw={600}>{row.diplomaNumber}</Table.Td>
                  <Table.Td>{row.token}</Table.Td>
                  <Table.Td>{row.createdAt}</Table.Td>
                  <Table.Td>{row.validUntil}</Table.Td>
                  <Table.Td>{renderStatusBadge(row.status)}</Table.Td>
                  <Table.Td>
                    <Group gap={8} miw={120} justify="center">
                      {row.status === "active" ? (
                        <Button variant="light" size="xs" radius="md" color="red">
                          Отозвать
                        </Button>
                      ) : (
                        <Text c="dimmed" size="sm" fw={500}>
                          —
                        </Text>
                      )}
                      <ActionIcon variant="light" radius="md" color="gray" size="sm">
                        <IconEye size={16} />
                      </ActionIcon>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      )}
    </Paper>
  );
}