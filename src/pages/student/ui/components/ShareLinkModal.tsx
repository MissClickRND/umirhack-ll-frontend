import { Modal, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { useCreateDiplomaQrTokenMutation } from "@/entities/diploma";
import { Diploma } from "../../model/type";
import {
    DurationType,
    durationTypeMap,
    PLACEHOLDER_LINK,
} from "./share-link-modal/constants";
import {
    buildVerificationLink,
    createQrDataUrl,
    downloadDataUrl,
} from "./share-link-modal/utils";
import { isLinkGenerated } from "./share-link-modal/helpers";
import {
    DiplomaInfoBlock,
    DurationSelectorBlock,
    FooterActions,
    LinkFieldBlock,
    QrPreviewBlock,
} from "./share-link-modal/components";

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

    const handleClose = () => {
        setDurationType("one-time");
        setLink(PLACEHOLDER_LINK);
        setQrCodeDataUrl(null);
        close();
    };

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
        if (!isLinkGenerated(link)) {
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
            onClose={handleClose}
            title="Создать ссылку проверки"
            centered
            radius="md"
            size={520}
        >
            <Stack gap="md">
                <DiplomaInfoBlock diploma={diploma} />

                <DurationSelectorBlock
                    durationType={durationType}
                    onChange={setDurationType}
                />

                <QrPreviewBlock qrCodeDataUrl={qrCodeDataUrl} onDownload={handleDownloadQr} />

                <LinkFieldBlock link={link} onCopy={handleCopy} />

                <FooterActions
                    isGenerating={isGenerating}
                    onCancel={handleClose}
                    onGenerate={generateLink}
                />
            </Stack>
        </Modal>
    );
}
