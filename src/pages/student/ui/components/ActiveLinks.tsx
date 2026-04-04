import {
  Paper,
  Title,
  Text,
  Group,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconLock } from "@tabler/icons-react";
import {
  IUserDiplomaTokenItem,
  useGetUserDiplomaTokensQuery,
  useRevokeDiplomaQrTokenMutation,
} from "@/entities/diploma";
import { useAppSelector } from "@/shared/lib";
import {
  buildVerificationLink,
  createQrDataUrl,
  downloadDataUrl,
} from "./share-link-modal/utils";
import { useMemo, useState } from "react";
import LinksDesktopTable from "./active-links/LinksDesktopTable";
import LinksMobileList from "./active-links/LinksMobileList";
import QrPreviewModal from "./active-links/QrPreviewModal";
import { mapTokensToRows } from "./active-links/utils";

export default function ActiveLinks() {
  const isMobile = useMediaQuery("(max-width: 64em)");
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  const userId = useAppSelector((state) => state.user.id);
  const { data: tokens = [], isLoading, isFetching } = useGetUserDiplomaTokensQuery(Number(userId), {
    skip: !userId,
  });
  const [revokeDiplomaQrToken, { isLoading: isRevokingToken }] = useRevokeDiplomaQrTokenMutation();

  const [revokingTokenId, setRevokingTokenId] = useState<number | null>(null);
  const [selectedToken, setSelectedToken] = useState<IUserDiplomaTokenItem | null>(null);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
  const [isQrModalOpened, setIsQrModalOpened] = useState(false);
  const [isGeneratingQr, setIsGeneratingQr] = useState(false);

  const rows = useMemo(() => mapTokensToRows(tokens), [tokens]);

  const handleCopyLink = async (link: string) => {
    try {
      await navigator.clipboard.writeText(link);
      notifications.show({
        title: "Скопировано",
        message: "Ссылка добавлена в буфер обмена",
        color: "green",
      });
    } catch {
      notifications.show({
        title: "Ошибка",
        message: "Не удалось скопировать ссылку",
        color: "red",
      });
    }
  };

  const handleRevoke = async (tokenId: number) => {
    try {
      setRevokingTokenId(tokenId);
      await revokeDiplomaQrToken(tokenId).unwrap();
      notifications.show({
        title: "Токен отозван",
        message: "Ссылка больше не активна",
        color: "green",
      });
    } catch {
      notifications.show({
        title: "Ошибка",
        message: "Не удалось отозвать токен",
        color: "red",
      });
    } finally {
      setRevokingTokenId(null);
    }
  };

  const handleOpenQr = async (item: IUserDiplomaTokenItem) => {
    try {
      setIsGeneratingQr(true);
      setSelectedToken(item);

      const link = buildVerificationLink(item.token);
      const qrDataUrl = await createQrDataUrl(link);

      setQrCodeDataUrl(qrDataUrl);
      setIsQrModalOpened(true);
    } catch {
      notifications.show({
        title: "Ошибка",
        message: "Не удалось сгенерировать QR-код",
        color: "red",
      });
    } finally {
      setIsGeneratingQr(false);
    }
  };

  const handleDownloadQr = () => {
    if (!qrCodeDataUrl || !selectedToken) {
      return;
    }

    downloadDataUrl(
      qrCodeDataUrl,
      `diploma-${selectedToken.diploma.id}-token-${selectedToken.tokenMeta.id}-qr.png`,
    );
  };

  const handleCloseQrModal = () => {
    setIsQrModalOpened(false);
    setQrCodeDataUrl(null);
    setSelectedToken(null);
  };

  return (
    <>
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
            <IconLock
              size={14}
              color={
                isDark ? theme.other.textSecondaryDark : theme.other.textSecondary
              }
            />
            <Text size="xs" c="dimmed" style={{ whiteSpace: "nowrap" }}>
              Данные защищены и не передаются третьим лицам
            </Text>
          </Group>
        </Group>

        {!userId ? (
          <Text c="dimmed">Не удалось определить пользователя.</Text>
        ) : isLoading || isFetching ? (
          <Text c="dimmed">Загрузка токенов...</Text>
        ) : rows.length === 0 ? (
          <Text c="dimmed">Активные ссылки пока не созданы.</Text>
        ) : isMobile ? (
          <LinksMobileList
            rows={rows}
            isRevokingToken={isRevokingToken}
            revokingTokenId={revokingTokenId}
            isGeneratingQr={isGeneratingQr}
            selectedTokenId={selectedToken?.tokenMeta.id ?? null}
            onCopy={handleCopyLink}
            onRevoke={handleRevoke}
            onOpenQr={handleOpenQr}
          />
        ) : (
          <LinksDesktopTable
            rows={rows}
            isRevokingToken={isRevokingToken}
            revokingTokenId={revokingTokenId}
            isGeneratingQr={isGeneratingQr}
            selectedTokenId={selectedToken?.tokenMeta.id ?? null}
            onCopy={handleCopyLink}
            onRevoke={handleRevoke}
            onOpenQr={handleOpenQr}
          />
        )}
      </Paper>

      <QrPreviewModal
        opened={isQrModalOpened}
        onClose={handleCloseQrModal}
        qrCodeDataUrl={qrCodeDataUrl}
        link={selectedToken ? buildVerificationLink(selectedToken.token) : ""}
        onCopy={() =>
          selectedToken
            ? handleCopyLink(buildVerificationLink(selectedToken.token))
            : undefined
        }
        onDownload={handleDownloadQr}
      />
    </>
  );
}
