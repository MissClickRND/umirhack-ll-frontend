import {
  Box,
  Button,
  Group,
  Paper,
  Radio,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
} from "@mantine/core";
import { IconQrcode } from "@tabler/icons-react";
import { Diploma } from "../../../model/type";
import { durationOptions, DurationType } from "./constants";
import { getDiplomaLabel } from "./helpers";

interface DiplomaInfoBlockProps {
  diploma: Diploma | null;
}

export function DiplomaInfoBlock({ diploma }: DiplomaInfoBlockProps) {
  return (
    <Box>
      <Text size="sm" fw={600} mb={6}>
        Диплом
      </Text>
      <Paper p="sm" radius="md" bg="gray.0" withBorder>
        <Text size="sm" fw={600} lineClamp={1}>
          {getDiplomaLabel(diploma)}
        </Text>
      </Paper>
    </Box>
  );
}

interface DurationSelectorBlockProps {
  durationType: DurationType;
  onChange: (value: DurationType) => void;
}

export function DurationSelectorBlock({
  durationType,
  onChange,
}: DurationSelectorBlockProps) {
  return (
    <Box>
      <Text size="sm" fw={600} mb={8}>
        Срок действия ссылки
      </Text>
      <Radio.Group
        value={durationType}
        onChange={(value) => onChange(value as DurationType)}
      >
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
  );
}

interface QrPreviewBlockProps {
  qrCodeDataUrl: string | null;
  onDownload: () => void;
}

export function QrPreviewBlock({ qrCodeDataUrl, onDownload }: QrPreviewBlockProps) {
  return (
    <>
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

      <Button variant="light" radius="md" onClick={onDownload}>
        Скачать QR
      </Button>
    </>
  );
}

interface LinkFieldBlockProps {
  link: string;
  onCopy: () => void;
}

export function LinkFieldBlock({ link, onCopy }: LinkFieldBlockProps) {
  return (
    <Box>
      <Text size="sm" fw={600} mb={6}>
        Ссылка для проверки
      </Text>
      <Group gap="xs" wrap="nowrap">
        <TextInput value={link} readOnly style={{ flex: 1 }} />
        <Button variant="filled" color="blue" radius="md" onClick={onCopy}>
          Копировать
        </Button>
      </Group>
    </Box>
  );
}

interface FooterActionsProps {
  isGenerating: boolean;
  onCancel: () => void;
  onGenerate: () => void;
}

export function FooterActions({
  isGenerating,
  onCancel,
  onGenerate,
}: FooterActionsProps) {
  return (
    <Group grow mt={4}>
      <Button variant="light" color="gray" radius="md" onClick={onCancel}>
        Отмена
      </Button>
      <Button
        variant="filled"
        color="brand"
        radius="md"
        onClick={onGenerate}
        loading={isGenerating}
      >
        Сгенерировать
      </Button>
    </Group>
  );
}
