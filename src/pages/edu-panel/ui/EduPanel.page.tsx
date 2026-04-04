import { useMemo, useState, type ChangeEvent, type DragEvent } from "react";
import {
  Alert,
  Badge,
  Box,
  Button,
  Code,
  Group,
  Loader,
  Paper,
  ScrollArea,
  Select,
  Stack,
  Table,
  Text,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import {
  IconAlertCircle,
  IconFileSpreadsheet,
  IconUpload,
} from "@tabler/icons-react";
import {
  useCreateDiplomaBatchMutation,
  useGetUniversityDiplomasQuery,
  useUpdateDiplomaStatusMutation,
  type DegreeLevel,
  type ICreateDiplomaItem,
} from "@/entities/diploma";
import { selectUser } from "@/entities/user/model/userSelectors";
import { useAppSelector, useNotifications } from "@/shared/lib";
import * as XLSX from "xlsx";

type ParsedRow = {
  fullNameAuthor: string;
  year: number;
  specialty: string;
  registrationNumber: string;
};

const degreeLevelOptions: Array<{ value: DegreeLevel; label: string }> = [
  { value: "BACHELOR", label: "Бакалавр" },
  { value: "MAGISTRACY", label: "Магистратура" },
  { value: "SPECIALIST", label: "Специалитет" },
  { value: "DOCTORATE", label: "Докторантура" },
];

const degreeStatusDiploma = {
  VALID: "Действителен",
  REVOKED: "Отозван",
};

const csvEncodings = ["utf-8", "windows-1251", "koi8-r"] as const;

function normalizeHeaderLine(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-zа-я0-9]+/gi, "")
    .replace(/ё/g, "е");
}

function hasExpectedCsvHeader(text: string): boolean {
  const firstLine = text.split(/\r\n|\n|\r/)[0] ?? "";
  const normalized = normalizeHeaderLine(firstLine);

  return (
    normalized.includes("фио") &&
    normalized.includes("год") &&
    normalized.includes("специальность") &&
    normalized.includes("номердиплома")
  );
}

function decodeCsvBuffer(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  const decodedCandidates: string[] = [];

  for (const encoding of csvEncodings) {
    try {
      const decoded = new TextDecoder(encoding).decode(bytes);
      decodedCandidates.push(decoded);

      if (hasExpectedCsvHeader(decoded)) {
        return decoded;
      }
    } catch {
      // ignore unsupported encodings in runtime
    }
  }

  if (decodedCandidates.length === 0) {
    return new TextDecoder().decode(bytes);
  }

  const ranked = decodedCandidates
    .map((candidate) => ({
      value: candidate,
      score:
        (candidate.match(/[А-Яа-яЁё]/g)?.length ?? 0) -
        (candidate.match(/�/g)?.length ?? 0),
    }))
    .sort((a, b) => b.score - a.score);

  return ranked[0].value;
}

function normalizeRawRow(rawRow: unknown[]): string[] {
  const sanitizeCell = (raw: string) =>
    raw
      .replace(/^\uFEFF/, "")
      .trim()
      .replace(/^"(.*)"$/, "$1")
      .replace(/^'(.*)'$/, "$1")
      .trim();

  const cells = rawRow.map((cell) => sanitizeCell(String(cell ?? "")));

  if (cells.length === 1) {
    const singleCell = cells[0];

    if (singleCell.includes(";")) {
      return singleCell.split(";").map((part) => sanitizeCell(part));
    }

    if (singleCell.includes(",")) {
      return singleCell.split(",").map((part) => sanitizeCell(part));
    }
  }

  return cells;
}

function convertFileRows(rows: unknown[][]) {
  const parsedRows: ParsedRow[] = [];
  const errors: string[] = [];

  const [, ...dataRows] = rows;
  let dataEnded = false;

  dataRows.forEach((sourceRow, index) => {
    const rowCells = normalizeRawRow(sourceRow);
    const [
      fullNameAuthor = "",
      yearRaw = "",
      specialty = "",
      registrationNumber = "",
    ] = rowCells;

    const hasData =
      fullNameAuthor.length > 0 ||
      yearRaw.length > 0 ||
      specialty.length > 0 ||
      registrationNumber.length > 0;

    const rowNumber = index + 2;

    if (!hasData) {
      if (parsedRows.length > 0) {
        dataEnded = true;
      }
      return;
    }

    if (dataEnded) {
      errors.push(
        `Строка ${rowNumber}: данные должны идти подряд без пустых строк`,
      );
      return;
    }

    if (!fullNameAuthor) {
      errors.push(`Строка ${rowNumber}: поле ФИО не заполнено`);
    }

    if (!specialty) {
      errors.push(`Строка ${rowNumber}: поле СПЕЦИАЛЬНОСТЬ не заполнено`);
    }

    const year = Number.parseInt(yearRaw, 10);
    if (!Number.isInteger(year) || year < 1900 || year > 2100) {
      errors.push(
        `Строка ${rowNumber}: поле ГОД должно быть числом от 1900 до 2100`,
      );
    }

    if (!/^\d{13}$/.test(registrationNumber)) {
      errors.push(
        `Строка ${rowNumber}: Номер диплома должен содержать ровно 13 цифр`,
      );
    }

    if (
      fullNameAuthor &&
      specialty &&
      Number.isInteger(year) &&
      year >= 1900 &&
      year <= 2100 &&
      /^\d{13}$/.test(registrationNumber)
    ) {
      parsedRows.push({
        fullNameAuthor,
        specialty,
        year,
        registrationNumber,
      });
    }
  });

  return { parsedRows, errors };
}

export default function EduPanelPage() {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";
  const user = useAppSelector(selectUser);
  const { showError, showSuccess } = useNotifications();

  const [rows, setRows] = useState<ParsedRow[]>([]);
  const [parseErrors, setParseErrors] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string>("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [degreeLevel, setDegreeLevel] = useState<DegreeLevel>("BACHELOR");

  const [createBatch, { isLoading: isCreating }] =
    useCreateDiplomaBatchMutation();
  const [updateStatus, { isLoading: isRevoking }] =
    useUpdateDiplomaStatusMutation();

  const universityId = user.universityId ?? null;

  const {
    data: universityDiplomas,
    isLoading: isLoadingDiplomas,
    isFetching: isFetchingDiplomas,
  } = useGetUniversityDiplomasQuery(universityId ?? 0, {
    skip: universityId === null,
  });

  const payload = useMemo<{ diplomas: ICreateDiplomaItem[] }>(() => {
    if (!universityId) {
      return { diplomas: [] };
    }

    return {
      diplomas: rows.map((row) => ({
        fullNameAuthor: row.fullNameAuthor,
        registrationNumber: row.registrationNumber,
        universityId,
        issuedAt: `${row.year}-06-01`,
        specialty: row.specialty,
        degreeLevel,
      })),
    };
  }, [degreeLevel, rows, universityId]);

  const parseFile = async (file: File) => {
    try {
      const buffer = await file.arrayBuffer();
      const isCsv = file.name.toLowerCase().endsWith(".csv");
      const workbook = isCsv
        ? XLSX.read(decodeCsvBuffer(buffer), { type: "string", raw: false })
        : XLSX.read(buffer, { type: "array" });
      const firstSheetName = workbook.SheetNames[0];

      if (!firstSheetName) {
        setRows([]);
        setParseErrors(["Файл не содержит листов"]);
        return;
      }

      const worksheet = workbook.Sheets[firstSheetName];
      const rawRows = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        defval: "",
        raw: false,
      }) as unknown[][];

      if (rawRows.length <= 1) {
        setRows([]);
        setParseErrors(["Файл не содержит строк данных после заголовка"]);
        return;
      }

      const { parsedRows, errors } = convertFileRows(rawRows);

      setRows(parsedRows);
      setParseErrors(errors);
      setFileName(file.name);

      if (parsedRows.length > 0) {
        showSuccess(`Прочитано записей: ${parsedRows.length}`);
      }
    } catch {
      setRows([]);
      setParseErrors(["Не удалось прочитать файл. Используйте CSV или Excel"]);
    }
  };

  const onFileInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    await parseFile(file);
    event.target.value = "";
  };

  const onDropFile = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
    const file = event.dataTransfer.files?.[0];

    if (!file) {
      return;
    }

    await parseFile(file);
  };

  const onCreateDiplomas = async () => {
    if (!universityId) {
      showError("У аккаунта не найден universityId. Перелогиньтесь.");
      return;
    }

    if (payload.diplomas.length === 0) {
      showError("Нет валидных строк для отправки");
      return;
    }

    try {
      const result = await createBatch(payload).unwrap();
      showSuccess(`Создано дипломов: ${result.count}`);
      setRows([]);
      setParseErrors([]);
      setFileName("");
    } catch (error: any) {
      showError(error?.data?.message ?? "Не удалось создать дипломы");
    }
  };

  const onRevoke = async (id: number) => {
    if (!universityId) {
      showError("У аккаунта не найден universityId");
      return;
    }

    try {
      await updateStatus({
        id,
        universityId,
        status: "REVOKED",
      }).unwrap();
      showSuccess("Диплом отозван");
    } catch (error: any) {
      showError(error?.data?.message ?? "Не удалось отозвать диплом");
    }
  };

  return (
    <Box
      bg={isDark ? theme.other.backgroundDark : theme.other.background}
      h="100%"
      px={{ base: "md", sm: "xl" }}
      py="xl"
      style={{ overflowY: "auto" }}
    >
      <Stack align="stretch" w="100%" maw={1250} mx="auto" gap="lg">
        <Paper
          p={{ base: 16, sm: 24, md: 32 }}
          radius="lg"
          shadow="sm"
          withBorder
        >
          <Stack gap="md">
            <Group justify="space-between" align="flex-start">
              <Stack gap={4}>
                <Title order={2}>Загрузка дипломов</Title>
                <Text c="dimmed" size="sm">
                  Поддерживаются CSV/XLS/XLSX. Колонки: ФИО, ГОД, СПЕЦИАЛЬНОСТЬ,
                  НОМЕР ДИПЛОМА (13 цифр).
                </Text>
              </Stack>
              <Select
                label="Уровень образования"
                value={degreeLevel}
                onChange={(value) => {
                  if (!value) {
                    return;
                  }
                  setDegreeLevel(value as DegreeLevel);
                }}
                data={degreeLevelOptions}
                w={220}
              />
            </Group>

            <Paper
              withBorder
              radius="md"
              p="xl"
              style={{
                borderStyle: "dashed",
                borderColor: isDragOver
                  ? "var(--mantine-color-primary-5)"
                  : isDark
                    ? theme.other.outlineDark
                    : theme.other.outline,
                backgroundColor: isDragOver
                  ? isDark
                    ? "rgba(100, 47, 200, 0.15)"
                    : "var(--mantine-color-primary-0)"
                  : isDark
                    ? theme.other.surfaceSecondaryDark
                    : theme.other.surfaceSecondary,
              }}
              onDragOver={(event) => {
                event.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={onDropFile}
            >
              <Stack align="center" gap={10}>
                <IconFileSpreadsheet size={30} />
                <Text fw={600}>Перетащите файл в эту область</Text>
                <Text c="dimmed" size="sm" ta="center">
                  Или выберите файл вручную
                </Text>

                <Button
                  component="label"
                  leftSection={<IconUpload size={16} />}
                  variant="light"
                >
                  Выбрать файл
                  <input
                    hidden
                    type="file"
                    accept=".csv,.xls,.xlsx"
                    onChange={onFileInputChange}
                  />
                </Button>

                {fileName ? (
                  <Text size="sm" c="dimmed">
                    Загружен файл: {fileName}
                  </Text>
                ) : null}
              </Stack>
            </Paper>

            {parseErrors.length > 0 ? (
              <Alert
                icon={<IconAlertCircle size={16} />}
                color="red"
                title="Ошибки в файле"
                variant="light"
              >
                <Stack gap={4}>
                  {parseErrors.slice(0, 8).map((message) => (
                    <Text key={message} size="sm">
                      {message}
                    </Text>
                  ))}
                  {parseErrors.length > 8 ? (
                    <Text size="sm">
                      И еще {parseErrors.length - 8} ошибок…
                    </Text>
                  ) : null}
                </Stack>
              </Alert>
            ) : null}

            {!universityId ? (
              <Alert
                icon={<IconAlertCircle size={16} />}
                color="yellow"
                title="Нет universityId"
                variant="light"
              >
                У пользователя отсутствует привязка к вузу
              </Alert>
            ) : null}

            {rows.length > 0 ? (
              <>
                <Table.ScrollContainer minWidth={900}>
                  <Table withRowBorders>
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>ФИО</Table.Th>
                        <Table.Th>Год</Table.Th>
                        <Table.Th>Специальность</Table.Th>
                        <Table.Th>Номер диплома</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {rows.map((row, index) => (
                        <Table.Tr key={`${row.registrationNumber}_${index}`}>
                          <Table.Td>{row.fullNameAuthor}</Table.Td>
                          <Table.Td>{row.year}</Table.Td>
                          <Table.Td>{row.specialty}</Table.Td>
                          <Table.Td>{row.registrationNumber}</Table.Td>
                        </Table.Tr>
                      ))}
                    </Table.Tbody>
                  </Table>
                </Table.ScrollContainer>
              </>
            ) : null}

            <Group justify="flex-end">
              <Button
                onClick={onCreateDiplomas}
                loading={isCreating}
                disabled={payload.diplomas.length === 0 || !universityId}
              >
                Создать
              </Button>
            </Group>
          </Stack>
        </Paper>

        <Paper
          p={{ base: 16, sm: 24, md: 32 }}
          radius="lg"
          shadow="sm"
          withBorder
        >
          <Stack gap="md">
            <Group justify="space-between">
              <Title order={3}>Дипломы моего университета</Title>
              {isLoadingDiplomas || isFetchingDiplomas ? (
                <Loader size="sm" />
              ) : null}
            </Group>

            {!universityId ? (
              <Text c="dimmed">
                Нет universityId для загрузки списка дипломов.
              </Text>
            ) : null}

            {universityId &&
            !isLoadingDiplomas &&
            (universityDiplomas?.length ?? 0) === 0 ? (
              <Text c="dimmed">Пока нет созданных дипломов.</Text>
            ) : null}

            {universityId && (universityDiplomas?.length ?? 0) > 0 ? (
              <Table.ScrollContainer minWidth={980}>
                <Table withRowBorders>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>ФИО</Table.Th>
                      <Table.Th>Год</Table.Th>
                      <Table.Th>Специальность</Table.Th>
                      <Table.Th>Номер диплома</Table.Th>
                      <Table.Th>Статус</Table.Th>
                      <Table.Th>Действие</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {universityDiplomas?.map((diploma) => {
                      const year = new Date(diploma.issuedAt).getFullYear();
                      const isRevoked = diploma.status === "REVOKED";

                      return (
                        <Table.Tr key={diploma.id}>
                          <Table.Td>{diploma.fullNameAuthor}</Table.Td>
                          <Table.Td>{year}</Table.Td>
                          <Table.Td>{diploma.specialty}</Table.Td>
                          <Table.Td>{diploma.registrationNumber}</Table.Td>
                          <Table.Td>
                            <Badge
                              color={isRevoked ? "red" : "green"}
                              variant="light"
                            >
                              {
                                degreeStatusDiploma[
                                  diploma.status as keyof typeof degreeStatusDiploma
                                ]
                              }
                            </Badge>
                          </Table.Td>
                          <Table.Td>
                            <Button
                              size="xs"
                              color="red"
                              variant="light"
                              loading={isRevoking}
                              disabled={isRevoked}
                              onClick={() => onRevoke(diploma.id)}
                            >
                              {isRevoked ? "Уже отозван" : "Отозвать"}
                            </Button>
                          </Table.Td>
                        </Table.Tr>
                      );
                    })}
                  </Table.Tbody>
                </Table>
              </Table.ScrollContainer>
            ) : null}
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
}
