import { ActionIcon, Button, Group, Table, Text } from "@mantine/core";
import { IconCopy, IconEye } from "@tabler/icons-react";
import StatusBadge from "./StatusBadge";
import { ActiveLinkRow } from "./types";

interface LinksDesktopTableProps {
  rows: ActiveLinkRow[];
  isRevokingToken: boolean;
  revokingTokenId: number | null;
  isGeneratingQr: boolean;
  selectedTokenId: number | null;
  onCopy: (link: string) => void;
  onRevoke: (tokenId: number) => void;
  onOpenQr: (row: ActiveLinkRow) => void;
}

export default function LinksDesktopTable({
  rows,
  isRevokingToken,
  revokingTokenId,
  isGeneratingQr,
  selectedTokenId,
  onCopy,
  onRevoke,
  onOpenQr,
}: LinksDesktopTableProps) {
  return (
    <Table.ScrollContainer minWidth={920}>
      <Table withRowBorders>
        <Table.Thead>
          <Table.Tr c="dimmed">
            <Table.Th>Диплом</Table.Th>
            <Table.Th>Ссылка/Токен</Table.Th>
            <Table.Th>Создан</Table.Th>
            <Table.Th>Действителен до</Table.Th>
            <Table.Th>Статус</Table.Th>
            <Table.Th ta="center">Действия</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {rows.map((row) => (
            <Table.Tr key={row.tokenMeta.id}>
              <Table.Td fw={600}>{row.diplomaNumber}</Table.Td>
              <Table.Td>
                <Group gap={6} wrap="nowrap">
                  <Text style={{ maxWidth: 280, overflow: "hidden", textOverflow: "ellipsis" }}>
                    {row.shortLink}
                  </Text>
                  <ActionIcon
                    variant="subtle"
                    color="gray"
                    onClick={() => onCopy(row.link)}
                    aria-label="Скопировать ссылку"
                  >
                    <IconCopy size={14} />
                  </ActionIcon>
                </Group>
              </Table.Td>
              <Table.Td>{row.createdAtLabel}</Table.Td>
              <Table.Td>{row.validUntilLabel}</Table.Td>
              <Table.Td>
                <StatusBadge status={row.status} />
              </Table.Td>
              <Table.Td>
                <Group gap={8} miw={120} justify="center">
                  {row.status === "active" ? (
                    <Button
                      variant="light"
                      size="xs"
                      radius="md"
                      color="red"
                      loading={isRevokingToken && revokingTokenId === row.tokenMeta.id}
                      onClick={() => onRevoke(row.tokenMeta.id)}
                    >
                      Отозвать
                    </Button>
                  ) : (
                    <Text c="dimmed" size="sm" fw={500}>
                      -
                    </Text>
                  )}
                  <ActionIcon
                    variant="light"
                    radius="md"
                    color="gray"
                    size="sm"
                    loading={isGeneratingQr && selectedTokenId === row.tokenMeta.id}
                    onClick={() => onOpenQr(row)}
                  >
                    <IconEye size={16} />
                  </ActionIcon>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
