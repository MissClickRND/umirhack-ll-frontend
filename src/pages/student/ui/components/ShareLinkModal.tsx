import { Box, Button, Group, Modal, Paper, Radio, Stack, Text, TextInput, ThemeIcon } from "@mantine/core";
import {IconQrcode } from "@tabler/icons-react";
import { useState } from "react";
import { Diploma } from "../../model/type";

const durationOptions = [
    { value: "one-time", label: "Единоразовый" },
    { value: "7-days", label: "7 дней" },
    { value: "30-days", label: "30 дней" },
    { value: "unlimited", label: "Неограничено" },
];

interface ShareLinkModalProps {
    opened: boolean;
    close: () => void;
    diploma: Diploma | null;
}

export default function ShareLinkModal({ opened, close, diploma }: ShareLinkModalProps) {
    const [durationType, setDurationType] = useState("one-time");
    const [link] = useState("Здесь будет ваша ссылка");

    const generateLink = () => {
        console.log(`Генерация ссылки для диплома ${diploma?.diplomaNumber} с типом действия ${durationType}`);
    }

    const handleCopy = async () => {
        await navigator.clipboard.writeText(link);
    };

    return (
        <Modal
            opened={opened}
            onClose={close}
            title="Создать ссылку проверки"
            centered
            radius="md"
            size={520}
        >
            <Stack gap="md">
                <Box>
                    <Text size="sm" fw={600} mb={6}>
                        Диплом
                    </Text>
                    <Paper p="sm" radius="md" bg="gray.0" withBorder>
                        <Text size="sm" fw={600} lineClamp={1}>
                            {diploma
                                ? `${diploma.diplomaNumber} - ${diploma.institution} - ${diploma.specialty}`
                                : ""}
                        </Text>
                    </Paper>
                </Box>

                <Box>
                    <Text size="sm" fw={600} mb={8}>
                        Срок действия ссылки
                    </Text>
                    <Radio.Group value={durationType} onChange={setDurationType}>
                        <Stack gap={8}>
                            {durationOptions.map((option) => (
                                <Radio key={option.value} value={option.value} label={option.label} />
                            ))}
                        </Stack>
                    </Radio.Group>
                    <Text size="xs" c="dimmed" mt={4}>
                        Ссылка автоматически деактивируется после истечения срока
                    </Text>
                </Box>

                <Paper h={140} radius="md" withBorder bg="gray.0">
                    <Stack h="100%" align="center" justify="center" gap={4}>
                        <ThemeIcon size={42} variant="light" radius="md" color="gray">
                            <IconQrcode size={24} />
                        </ThemeIcon>
                        <Text size="xs" c="dimmed" fw={600}>
                            QR КОД
                        </Text>
                    </Stack>
                </Paper>

                <Box>
                    <Text size="sm" fw={600} mb={6}>
                        Ссылка для проверки
                    </Text>
                    <Group gap="xs" wrap="nowrap">
                        <TextInput value={link} readOnly style={{ flex: 1 }} />
                        <Button variant="filled" color="blue" radius="md" onClick={handleCopy}>
                            Копировать
                        </Button>
                    </Group>
                </Box>


                <Group grow mt={4}>
                    <Button variant="light" color="gray" radius="md" onClick={close}>
                        Отмена
                    </Button>
                    <Button variant="filled" color="brand" radius="md" onClick={generateLink}>
                        Готово
                    </Button>
                </Group>
            </Stack>
        </Modal>
    );
}
