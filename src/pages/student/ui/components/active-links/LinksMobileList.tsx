import { ActionIcon, Box, Button, Group, Paper, Stack, Text } from "@mantine/core";
import { IconCopy, IconEye } from "@tabler/icons-react";
import StatusBadge from "./StatusBadge";
import { ActiveLinkRow } from "./types";

interface LinksMobileListProps {
  rows: ActiveLinkRow[];
  isRevokingToken: boolean;
  revokingTokenId: number | null;
  isGeneratingQr: boolean;
  selectedTokenId: number | null;
  onCopy: (link: string) => void;
  onRevoke: (tokenId: number) => void;
  onOpenQr: (row: ActiveLinkRow) => void;
}

export default function LinksMobileList({
  rows,
  isRevokingToken,
  revokingTokenId,
  isGeneratingQr,
  selectedTokenId,
  onCopy,
  onRevoke,
  onOpenQr,
}: LinksMobileListProps) {
  return (
    <Stack gap={12}>
      {rows.map((row) => (
        <Paper key={row.tokenMeta.id} p={14} radius="md" withBorder>
          <Stack gap={10}>
            <Group justify="space-between" align="flex-start" wrap="nowrap">
              <Box>
                <Text size="xs" c="dimmed">
                  Диплом
                </Text>
                <Text fw={600}>{row.diplomaNumber}</Text>
              </Box>
              <StatusBadge status={row.status} />
            </Group>

            <Box>
              <Text size="xs" c="dimmed">
                Ссылка/Токен
              </Text>
              <Group gap={6} wrap="nowrap">
                <Text style={{ wordBreak: "break-all" }}>{row.shortLink}</Text>
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  onClick={() => onCopy(row.link)}
                  aria-label="Скопировать ссылку"
                >
                  <IconCopy size={14} />
                </ActionIcon>
              </Group>
            </Box>

            <Group justify="space-between" align="center" wrap="nowrap">
              <Box>
                <Text size="xs" c="dimmed">
                  Создан
                </Text>
                <Text>{row.createdAtLabel}</Text>
              </Box>
              <Box>
                <Text size="xs" c="dimmed" ta="right">
                  Действителен до
                </Text>
                <Text ta="right">{row.validUntilLabel}</Text>
              </Box>
            </Group>

            <Group grow>
              {row.status === "active" ? (
                <Button
                  variant="light"
                  size="sm"
                  radius="md"
                  color="red"
                  loading={isRevokingToken && revokingTokenId === row.tokenMeta.id}
                  onClick={() => onRevoke(row.tokenMeta.id)}
                >
                  Отозвать
                </Button>
              ) : (
                <Button variant="light" size="sm" radius="md" disabled>
                  Неактивна
                </Button>
              )}
              <ActionIcon
                variant="light"
                radius="md"
                color="gray"
                size="lg"
                loading={isGeneratingQr && selectedTokenId === row.tokenMeta.id}
                onClick={() => onOpenQr(row)}
              >
                <IconEye size={16} />
              </ActionIcon>
            </Group>
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
}
