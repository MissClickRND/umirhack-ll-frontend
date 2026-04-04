import { ActionIcon, Button, Group, Modal, Paper, Stack, Text, TextInput } from "@mantine/core";
import { IconCopy, IconDownload } from "@tabler/icons-react";

interface QrPreviewModalProps {
  opened: boolean;
  link: string;
  qrCodeDataUrl: string | null;
  onClose: () => void;
  onCopy: () => void;
  onDownload: () => void;
}

export default function QrPreviewModal({
  opened,
  link,
  qrCodeDataUrl,
  onClose,
  onCopy,
  onDownload,
}: QrPreviewModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="QR-код ссылки"
      centered
      radius="md"
      size={460}
    >
      <Stack gap="md">
        <Paper h={220} radius="md" withBorder>
          <Stack h="100%" align="center" justify="center">
            {qrCodeDataUrl ? (
              <img src={qrCodeDataUrl} alt="QR code" style={{ width: 180, height: 180 }} />
            ) : (
              <Text c="dimmed">QR-код не сформирован</Text>
            )}
          </Stack>
        </Paper>

        <Group gap="xs" wrap="nowrap">
          <TextInput readOnly value={link} style={{ flex: 1 }} />
          <ActionIcon
            size="lg"
            variant="light"
            color="gray"
            onClick={onCopy}
            aria-label="Скопировать ссылку"
          >
            <IconCopy size={16} />
          </ActionIcon>
        </Group>

        <Button
          leftSection={<IconDownload size={16} />}
          onClick={onDownload}
          disabled={!qrCodeDataUrl}
        >
          Скачать QR
        </Button>
      </Stack>
    </Modal>
  );
}
