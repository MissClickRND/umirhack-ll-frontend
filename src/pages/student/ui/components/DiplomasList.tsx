import { Badge, Box, Button, Group, Paper, Stack, Table, Text, Title } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconPlus, IconShare } from "@tabler/icons-react";
import { useState } from "react";
import { Diploma } from "../../model/type";
import SearchModal from "./SearchModal";
import ShareLinkModal from "./ShareLinkModal";




export default function DiplomasList() {
    const isMobile = useMediaQuery("(max-width: 64em)");
    const [opened, { open, close }] = useDisclosure(false);
    const [shareOpened, { open: openShare, close: closeShare }] = useDisclosure(false);
    const [selectedDiploma, setSelectedDiploma] = useState<Diploma | null>(null);

    const mockData: Diploma[] = [
        {
            id: 1,
            institution: "МГТУ им. Баумана",
            specialty: "Программная инженерия",
            year: "2022",
            diplomaNumber: "БВС 0123456",
            status: true,
        },
        {
            id: 2,
            institution: "СПбГУ",
            specialty: "Информатика и вычислительная техника",
            year: "2020",
            diplomaNumber: "БВС 0987654",
            status: false,
        },
    ];

    const getStatusStyles = (status: boolean) => ({
        backgroundColor: status ? "var(--mantine-color-green-0)" : "var(--mantine-color-red-0)",
        color: status ? "var(--mantine-color-green-9)" : "var(--mantine-color-red-9)",
        padding: "0 16px",
    });

    const handleOpenShare = (diploma: Diploma) => {
        setSelectedDiploma(diploma);
        openShare();
    };

    return (
        <>
            <SearchModal opened={opened} close={close} />
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
                        {isMobile ? (
                            <Stack gap={12}>
                                {mockData.map((row) => (
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
                                        {mockData.map((row) => (
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
