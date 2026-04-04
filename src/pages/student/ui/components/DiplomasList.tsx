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
    useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconPlus, IconShare } from "@tabler/icons-react";
import { useState } from "react";
import { Diploma } from "../../model/type";
import SearchModal from "./SearchModal";
import ShareLinkModal from "./ShareLinkModal";
import { useAppSelector } from "@/shared/lib";
import { selectUser } from "@/entities/user/model/userSelectors";
import { useGetUserDiplomasQuery } from "@/entities/diploma";




export default function DiplomasList() {
    const isMobile = useMediaQuery("(max-width: 64em)");
    const { colorScheme } = useMantineColorScheme();
    const isDark = colorScheme === "dark";
    const user = useAppSelector(selectUser);
    const [opened, { open, close }] = useDisclosure(false);
    const [shareOpened, { open: openShare, close: closeShare }] = useDisclosure(false);
    const [selectedDiploma, setSelectedDiploma] = useState<Diploma | null>(null);
    const { data: diplomas = [], isLoading, refetch } = useGetUserDiplomasQuery(user?.id ?? 0, {
        skip: !user?.id,
    });

    const data: Diploma[] = diplomas.map((diploma) => ({
        id: diploma.id,
        institution: diploma.university?.name ?? "Не указано",
        specialty: diploma.specialty,
        year: diploma.issuedAt ? String(new Date(diploma.issuedAt).getFullYear()) : "-",
        diplomaNumber: diploma.registrationNumber,
        status: diploma.status === "VALID" || diploma.status === "ISSUED",
    }));

    const getStatusStyles = (status: boolean) => ({
        backgroundColor: status
            ? isDark
                ? "rgba(64, 192, 87, 0.18)"
                : "var(--mantine-color-green-0)"
            : isDark
                ? "rgba(250, 82, 82, 0.18)"
                : "var(--mantine-color-red-0)",
        color: status
            ? isDark
                ? "var(--mantine-color-green-2)"
                : "var(--mantine-color-green-9)"
            : isDark
                ? "var(--mantine-color-red-2)"
                : "var(--mantine-color-red-9)",
        padding: "0 16px",
    });

    const handleOpenShare = (diploma: Diploma) => {
        setSelectedDiploma(diploma);
        openShare();
    };

    return (
        <>
            <SearchModal opened={opened} close={close} onAttached={refetch} />
            <ShareLinkModal opened={shareOpened} close={closeShare} diploma={selectedDiploma} />
            <Stack w="100%">
                <Paper p={{ base: 16, sm: 24, md: 32 }} radius="lg" shadow="sm" withBorder>
                    <Group justify="space-between" align="center" wrap="nowrap">
                        <Title order={2} size={isMobile ? "h3" : "h2"} fw={700}>
                            Мои дипломы
                        </Title>
                        <Button
                            w={30}
                            h={30}
                            p={0}
                            radius="50%"
                            variant="light"
                            onClick={open}
                        >
                            <IconPlus size={16} />
                        </Button>
                    </Group>


                    <Stack mt={24} gap={16}>
                        {isLoading ? (
                            <Group justify="center" py="xl">
                                <Loader />
                            </Group>
                        ) : data.length === 0 ? (
                            <Text c="dimmed">У вас пока нет прикреплённых дипломов.</Text>
                        ) : isMobile ? (
                            <Stack gap={12}>
                                {data.map((row) => (
                                    <Paper key={row.id} p={14} radius="md" withBorder>
                                        <Stack gap={10}>
                                            <Box>
                                                <Text size="xs" c="dimmed">
                                                    Учебное заведение
                                                </Text>
                                                <Text fw={600}>{row.institution}</Text>
                                            </Box>

                                            <Box>
                                                <Text size="xs" c="dimmed">
                                                    Специальность
                                                </Text>
                                                <Text>{row.specialty}</Text>
                                            </Box>

                                            <Group justify="space-between" align="center" wrap="nowrap">
                                                <Box>
                                                    <Text size="xs" c="dimmed">
                                                        Год
                                                    </Text>
                                                    <Text>{row.year}</Text>
                                                </Box>
                                                <Badge
                                                    variant="light"
                                                    miw={110}
                                                    size="sm"
                                                    radius="xl"
                                                    fw={600}
                                                    fz={10}
                                                    style={getStatusStyles(row.status)}
                                                >
                                                    {row.status ? "действителен" : "не найден"}
                                                </Badge>
                                            </Group>

                                            <Box>
                                                <Text size="xs" c="dimmed">
                                                    Номер диплома
                                                </Text>
                                                <Text fw={600}>{row.diplomaNumber}</Text>
                                            </Box>

                                            <Button
                                                fullWidth
                                                size="sm"
                                                radius="md"
                                                rightSection={<IconShare size={16} />}
                                                onClick={() => handleOpenShare(row)}
                                            >
                                                Поделиться
                                            </Button>
                                        </Stack>
                                    </Paper>
                                ))}
                            </Stack>
                        ) : (
                            <Table.ScrollContainer minWidth={900}>
                                <Table withRowBorders>
                                    <Table.Thead>
                                        <Table.Tr c="dimmed">
                                            <Table.Th>Учебное заведение</Table.Th>
                                            <Table.Th>Специальность</Table.Th>
                                            <Table.Th>Год</Table.Th>
                                            <Table.Th>Номер диплома</Table.Th>
                                            <Table.Th>Статус</Table.Th>
                                            <Table.Th>Действия</Table.Th>
                                        </Table.Tr>
                                    </Table.Thead>

                                    <Table.Tbody>
                                        {data.map((row) => (
                                            <Table.Tr key={row.id}>
                                                <Table.Td fw={500}>{row.institution}</Table.Td>
                                                <Table.Td>{row.specialty}</Table.Td>
                                                <Table.Td>{row.year}</Table.Td>
                                                <Table.Td fw={600}>{row.diplomaNumber}</Table.Td>
                                                <Table.Td>
                                                    <Badge
                                                        variant="light"
                                                        miw={110}
                                                        size="sm"
                                                        radius="xl"
                                                        fw={600}
                                                        fz={10}
                                                        style={getStatusStyles(row.status)}
                                                    >
                                                        {row.status ? "действителен" : "не найден"}
                                                    </Badge>
                                                </Table.Td>
                                                <Table.Td>
                                                    <Button
                                                        size="xs"
                                                        radius="md"
                                                        rightSection={<IconShare size={18} />}
                                                        onClick={() => handleOpenShare(row)}
                                                    >
                                                        Поделиться
                                                    </Button>
                                                </Table.Td>
                                            </Table.Tr>
                                        ))}
                                    </Table.Tbody>
                                </Table>
                            </Table.ScrollContainer>
                        )}
                    </Stack>
                </Paper>
            </Stack></>
    );
}
