import {
    Badge,
    Box,
    Button,
    Group,
    Loader,
    Paper,
    Stack,
    Table,
    Text,
    Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useMediaQuery } from "@mantine/hooks";
import { IconCheck, IconRefresh, IconUserShield, IconX } from "@tabler/icons-react";
import { useState } from "react";
import {
    IVerificationUser,
    UserRole,
    useGetVerifyRequestsQuery,
    useUpdateRoleUserMutation,
    useVerifyRequestMutation,
} from "@/entities/user";

const roleLabelColor: Record<UserRole, string> = {
    ADMIN: "violet",
    HR: "pink",
    NEED_VERIFICATION: "orange",
    STUDENT: "blue",
    UNIVERSITY: "teal",
};

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

export default function VerificationRequestsBlock() {
    const isMobile = useMediaQuery("(max-width: 64em)");
    const {
        data: verifyRequests = [],
        isLoading,
        isFetching,
        refetch,
    } = useGetVerifyRequestsQuery();
    const [verifyRequest, { isLoading: isVerifyMutating }] = useVerifyRequestMutation();
    const [updateRoleUser, { isLoading: isRoleMutating }] = useUpdateRoleUserMutation();
    const [processingVerifyId, setProcessingVerifyId] = useState<number | null>(null);

    const handleVerifyAction = async (user: IVerificationUser, action: "approve" | "reject") => {
        try {
            setProcessingVerifyId(user.id);

            if (action === "approve") {
                await verifyRequest({ id: user.id, body: { action } }).unwrap();
            } else {
                await updateRoleUser({ userId: user.id, role: "HR" }).unwrap();
            }

            notifications.show({
                title: action === "approve" ? "Заявка одобрена" : "Заявка отклонена",
                message: `Пользователь ${user.email}`,
                color: action === "approve" ? "green" : "red",
            });
        } catch {
            notifications.show({
                title: "Ошибка",
                message: "Не удалось обработать заявку",
                color: "red",
            });
        } finally {
            setProcessingVerifyId(null);
        }
    };

    return (
        <Paper p={{ base: 16, sm: 24, md: 32 }} radius="lg" shadow="sm" withBorder>
            <Group justify="space-between" align="center" wrap="wrap" mb="md">
                <Group gap="xs">
                    <IconUserShield size={18} color="var(--mantine-color-brand-6)" />
                    <Title order={2} size={isMobile ? "h3" : "h2"} fw={700}>
                        Заявки на верификацию
                    </Title>
                </Group>

                <Button
                    variant="light"
                    leftSection={<IconRefresh size={16} />}
                    onClick={() => refetch()}
                    loading={isFetching || isVerifyMutating || isRoleMutating}
                    radius="md"
                >
                    Обновить
                </Button>
            </Group>

            {isLoading ? (
                <Group justify="center" py="xl">
                    <Loader />
                </Group>
            ) : verifyRequests.length === 0 ? (
                <Text c="dimmed">Нет заявок на верификацию.</Text>
            ) : isMobile ? (
                <Stack gap={12}>
                    {verifyRequests.map((item) => (
                        <Paper key={item.id} p={14} radius="md" withBorder>
                            <Stack gap={10}>
                                <Box>
                                    <Text size="xs" c="dimmed">
                                        Email
                                    </Text>
                                    <Text fw={600}>{item.email}</Text>
                                </Box>

                                <Group justify="space-between" align="center" wrap="nowrap">
                                    <Box>
                                        <Text size="xs" c="dimmed">
                                            Университет
                                        </Text>
                                        <Text>{item.university?.shortName ?? "Не указан"}</Text>
                                    </Box>
                                    <Badge variant="light" color={roleLabelColor[item.role]}>
                                        {item.role}
                                    </Badge>
                                </Group>

                                <Box>
                                    <Text size="xs" c="dimmed">
                                        Дата регистрации
                                    </Text>
                                    <Text>{formatDate(item.createdAt)}</Text>
                                </Box>

                                <Group grow>
                                    <Button
                                        leftSection={<IconCheck size={16} />}
                                        color="green"
                                        radius="md"
                                        variant="light"
                                        loading={processingVerifyId === item.id}
                                        onClick={() => handleVerifyAction(item, "approve")}
                                    >
                                        Принять
                                    </Button>
                                    <Button
                                        leftSection={<IconX size={16} />}
                                        color="red"
                                        radius="md"
                                        variant="light"
                                        loading={processingVerifyId === item.id}
                                        onClick={() => handleVerifyAction(item, "reject")}
                                    >
                                        Отклонить
                                    </Button>
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
                                <Table.Th>Email</Table.Th>
                                <Table.Th>Роль</Table.Th>
                                <Table.Th>Университет</Table.Th>
                                <Table.Th>Дата регистрации</Table.Th>
                                <Table.Th>Действия</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {verifyRequests.map((item) => (
                                <Table.Tr key={item.id}>
                                    <Table.Td fw={600}>{item.email}</Table.Td>
                                    <Table.Td>
                                        <Badge variant="light" color={roleLabelColor[item.role]}>
                                            {item.role}
                                        </Badge>
                                    </Table.Td>
                                    <Table.Td>{item.university?.name ?? "Не указан"}</Table.Td>
                                    <Table.Td>{formatDate(item.createdAt)}</Table.Td>
                                    <Table.Td>
                                        <Group gap={8}>
                                            <Button
                                                size="xs"
                                                variant="light"
                                                color="green"
                                                leftSection={<IconCheck size={14} />}
                                                loading={processingVerifyId === item.id}
                                                onClick={() => handleVerifyAction(item, "approve")}
                                            >
                                                Принять
                                            </Button>
                                            <Button
                                                size="xs"
                                                variant="light"
                                                color="red"
                                                leftSection={<IconX size={14} />}
                                                loading={processingVerifyId === item.id}
                                                onClick={() => handleVerifyAction(item, "reject")}
                                            >
                                                Отклонить
                                            </Button>
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
