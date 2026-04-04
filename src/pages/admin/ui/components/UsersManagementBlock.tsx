import {
  Badge,
  Box,
  Button,
  Group,
  Loader,
  NativeSelect,
  Paper,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useMediaQuery } from "@mantine/hooks";
import { IconRefresh } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import {
  IUserPublic,
  UserRole,
  useGetUsersQuery,
  useUpdateRoleUserMutation,
} from "@/entities/user";

type RoleCode = "ADMIN" | "HR" | "NEED_VERIFICATION" | "STUDENT" | "UNIVERSITY";

const roleOptions: Array<{ value: RoleCode; label: string }> = [
  { value: "HR", label: "HR" },
  { value: "STUDENT", label: "Студент" },
  { value: "ADMIN", label: "Админ" },
  { value: "UNIVERSITY", label: "ВУЗ" },
  { value: "NEED_VERIFICATION", label: "Ждет подтверждения" },
];

const roleLabelColor: Record<RoleCode, string> = {
  ADMIN: "violet",
  HR: "pink",
  NEED_VERIFICATION: "orange",
  STUDENT: "blue",
  UNIVERSITY: "teal",
};

const roleLabel: Record<RoleCode, string> = {
  ADMIN: "Админ",
  HR: "HR",
  NEED_VERIFICATION: "Ждет подтверждения",
  STUDENT: "Студент",
  UNIVERSITY: "ВУЗ",
};

function parseRoleCode(role: string): RoleCode | null {
  if (role in roleLabel) {
    return role as RoleCode;
  }
  return null;
}

function getRoleLabel(role: string) {
  const code = parseRoleCode(role);
  return code ? roleLabel[code] : role;
}

function getRoleColor(role: string) {
  const code = parseRoleCode(role);
  return code ? roleLabelColor[code] : "gray";
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function UsersManagementBlock() {
  const isMobile = useMediaQuery("(max-width: 64em)");
  const {
    data: users = [],
    isLoading,
    isFetching,
    refetch,
  } = useGetUsersQuery();

  const [updateRoleUser, { isLoading: isRoleMutating }] =
    useUpdateRoleUserMutation();
  const [processingRoleId, setProcessingRoleId] = useState<number | null>(null);
  const [roleDrafts, setRoleDrafts] = useState<Record<number, UserRole>>({});

  useEffect(() => {
    setRoleDrafts((prev) => {
      let hasChanges = false;
      const next = { ...prev };

      users.forEach((user) => {
        if (next[user.id] !== user.role) {
          next[user.id] = user.role;
          hasChanges = true;
        }
      });

      return hasChanges ? next : prev;
    });
  }, [users]);

  const handleChangeRole = async (user: IUserPublic) => {
    const nextRole = roleDrafts[user.id] ?? user.role;

    if (!nextRole || nextRole === user.role) {
      return;
    }

    try {
      setProcessingRoleId(user.id);
      await updateRoleUser({ userId: user.id, role: nextRole }).unwrap();
      notifications.show({
        title: "Роль обновлена",
        message: `${user.email}: ${getRoleLabel(String(user.role))} -> ${getRoleLabel(String(nextRole))}`,
        color: "green",
      });
    } catch {
      notifications.show({
        title: "Ошибка",
        message: "Не удалось обновить роль",
        color: "red",
      });
    } finally {
      setProcessingRoleId(null);
    }
  };

  return (
    <Paper p={{ base: 16, sm: 24, md: 32 }} radius="lg" shadow="sm" withBorder>
      <Group justify="space-between" align="center" wrap="wrap" mb="md">
        <Title order={2} size={isMobile ? "h3" : "h2"} fw={700}>
          Все пользователи
        </Title>

        <Button
          variant="light"
          leftSection={<IconRefresh size={16} />}
          onClick={() => refetch()}
          loading={isFetching || isRoleMutating}
          radius="md"
        >
          Обновить
        </Button>
      </Group>

      {isLoading ? (
        <Group justify="center" py="xl">
          <Loader />
        </Group>
      ) : users.length === 0 ? (
        <Text c="dimmed">Список пользователей пуст.</Text>
      ) : isMobile ? (
        <Stack gap={12}>
          {users.map((user) => {
            const selectedRole = roleDrafts[user.id] ?? user.role;

            return (
              <Paper key={user.id} p={14} radius="md" withBorder>
                <Stack gap={10}>
                  <Box>
                    <Text size="xs" c="dimmed">
                      Email
                    </Text>
                    <Text fw={600}>{user.email}</Text>
                  </Box>

                  <Group justify="space-between" align="center">
                    <Box>
                      <Text size="xs" c="dimmed">
                        Текущая роль
                      </Text>
                      <Badge
                        variant="light"
                        color={getRoleColor(String(user.role))}
                      >
                        {getRoleLabel(String(user.role))}
                      </Badge>
                    </Box>
                    <Text size="xs" c="dimmed">
                      Зарегистрирован: {formatDate(user.createdAt)}
                    </Text>
                  </Group>

                  <NativeSelect
                    label="Новая роль"
                    value={selectedRole}
                    onChange={(event) => {
                      const nextValue = event.currentTarget.value as UserRole;
                      setRoleDrafts((prev) => ({
                        ...prev,
                        [user.id]: nextValue,
                      }));
                    }}
                    data={roleOptions}
                  />

                  <Button
                    variant="light"
                    radius="md"
                    disabled={selectedRole === user.role}
                    loading={processingRoleId === user.id}
                    onClick={() => handleChangeRole(user)}
                  >
                    Сохранить роль
                  </Button>
                </Stack>
              </Paper>
            );
          })}
        </Stack>
      ) : (
        <Table.ScrollContainer minWidth={920}>
          <Table withRowBorders>
            <Table.Thead>
              <Table.Tr c="dimmed">
                <Table.Th>Email</Table.Th>
                <Table.Th>Текущая роль</Table.Th>
                <Table.Th>Новая роль</Table.Th>
                <Table.Th>Дата регистрации</Table.Th>
                <Table.Th>Действие</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {users.map((user) => {
                const selectedRole = roleDrafts[user.id] ?? user.role;

                return (
                  <Table.Tr key={user.id}>
                    <Table.Td fw={600}>{user.email}</Table.Td>
                    <Table.Td>
                      <Badge
                        variant="light"
                        color={getRoleColor(String(user.role))}
                      >
                        {getRoleLabel(String(user.role))}
                      </Badge>
                    </Table.Td>
                    <Table.Td miw={220}>
                      <NativeSelect
                        value={selectedRole}
                        onChange={(event) => {
                          const nextValue = event.currentTarget
                            .value as UserRole;
                          setRoleDrafts((prev) => ({
                            ...prev,
                            [user.id]: nextValue,
                          }));
                        }}
                        data={roleOptions}
                      />
                    </Table.Td>
                    <Table.Td>{formatDate(user.createdAt)}</Table.Td>
                    <Table.Td>
                      <Button
                        size="xs"
                        variant="light"
                        disabled={selectedRole === user.role}
                        loading={processingRoleId === user.id}
                        onClick={() => handleChangeRole(user)}
                      >
                        Сохранить
                      </Button>
                    </Table.Td>
                  </Table.Tr>
                );
              })}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      )}
    </Paper>
  );
}
