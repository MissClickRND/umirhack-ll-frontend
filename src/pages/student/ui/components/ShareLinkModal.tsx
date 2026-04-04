import { Box, Button, Group, Modal, Paper, Radio, Stack, Text, TextInput, ThemeIcon } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {IconQrcode } from "@tabler/icons-react";
import { useState } from "react";
import { useCreateDiplomaQrTokenMutation } from "@/entities/diploma";
import { Diploma } from "../../model/type";
import {
    durationOptions,
    DurationType,
    durationTypeMap,
    PLACEHOLDER_LINK,
} from "./share-link-modal/constants";
import {
    buildVerificationLink,
    createQrDataUrl,
    downloadDataUrl,
} from "./share-link-modal/utils";

interface ShareLinkModalProps {
    opened: boolean;
    close: () => void;
    diploma: Diploma | null;
}

export default function ShareLinkModal({ opened, close, diploma }: ShareLinkModalProps) {
    const [durationType, setDurationType] = useState<DurationType>("one-time");
    const [link, setLink] = useState(PLACEHOLDER_LINK);
    const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
    const [createDiplomaQrToken, { isLoading: isGenerating }] = useCreateDiplomaQrTokenMutation();

    const generateLink = async () => {
        const diplomaId = Number(diploma?.id);

        if (!Number.isFinite(diplomaId)) {
            notifications.show({
                title: "Ошибка",
                message: "Не удалось определить диплом для генерации ссылки",
                color: "red",
            });
            return;
        }

        try {
            const tokenPayload = await createDiplomaQrToken({
                id: diplomaId,
                type: durationTypeMap[durationType],
            }).unwrap();

            const token = tokenPayload?.token;

            if (!token) {
                throw new Error("Token is missing in response");
            }

            const verificationLink = buildVerificationLink(token);
            const qrDataUrl = await createQrDataUrl(verificationLink);

            setLink(verificationLink);
            setQrCodeDataUrl(qrDataUrl);

            notifications.show({
                title: "Ссылка сгенерирована",
                message: "QR-код готов",
                color: "green",
            });
        } catch {
            notifications.show({
                title: "Ошибка",
                message: "Не удалось сгенерировать ссылку",
                color: "red",
            });
        }
    };

    const handleCopy = async () => {
        if (link === PLACEHOLDER_LINK) {
            notifications.show({
                title: "Нет ссылки",
                message: "Сначала сгенерируйте ссылку",
                color: "orange",
            });
            return;
        }

        await navigator.clipboard.writeText(link);
        notifications.show({
            title: "Скопировано",
            message: "Ссылка добавлена в буфер обмена",
            color: "green",
        });
    };

    const handleDownloadQr = () => {
        if (!qrCodeDataUrl) {
            notifications.show({
                title: "Нет QR-кода",
                message: "Сначала сгенерируйте QR-код",
                color: "orange",
            });
            return;
        }

        downloadDataUrl(qrCodeDataUrl, `diploma-${diploma?.id ?? "token"}-qr.png`);
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
                    <Radio.Group value={durationType} onChange={(value) => setDurationType(value as DurationType)}>
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
                        {qrCodeDataUrl ? (
                            <img src={qrCodeDataUrl} alt="QR code" style={{ width: 120, height: 120 }} />
                        ) : (
                            <>
                                <ThemeIcon size={42} variant="light" radius="md" color="gray">
                                    <IconQrcode size={24} />
                                </ThemeIcon>
                                <Text size="xs" c="dimmed" fw={600}>
                                    QR КОД
                                </Text>
                            </>
                        )}
                    </Stack>
                </Paper>

                <Button variant="light" radius="md" onClick={handleDownloadQr}>
                    Скачать QR
                </Button>

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
                    <Button variant="filled" color="brand" radius="md" onClick={generateLink} loading={isGenerating}>
                        Сгенерировать
                    </Button>
                </Group>
            </Stack>
        </Modal>
    );
}
