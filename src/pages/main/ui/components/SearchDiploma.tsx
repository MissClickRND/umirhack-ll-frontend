import { useState } from "react";
import {
  Stack,
  Paper,
  rem,
  Title,
  TextInput,
  Group,
  Button,
  Text,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  IconSearch,
  IconAlertCircle,
  IconArrowRight,
  IconUser,
} from "@tabler/icons-react";
import { IDiploma, useLazyGetDiplomaByIdQuery } from "@/entities/diploma";

interface SearchDiplomaProps {
  onResult: (diploma: IDiploma | null) => void;
}

export default function SearchDiploma({ onResult }: SearchDiplomaProps) {
  const [numberValue, setNumberValue] = useState("");
  const [fullName, setFullName] = useState("");
  const [triggerSearch, { isFetching }] = useLazyGetDiplomaByIdQuery();

  const formatDiplomaNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 13);
    if (digits.length <= 6) {
      return digits;
    }
    return `${digits.slice(0, 6)} ${digits.slice(6)}`;
  };

  const handleSearch = async () => {
    const formattedNumber = numberValue.trim();
    const normalizedFullName = fullName.trim();
    const isValid = /^\d{6}\s\d{7}$/.test(formattedNumber);

    if (!formattedNumber) {
      notifications.show({
        title: "Введите номер",
        message: "Укажите номер диплома для проверки",
        color: "orange",
      });
      return;
    }

    if (!isValid) {
      notifications.show({
        title: "Неверный формат",
        message: "Формат номера: 123456 7890123",
        color: "orange",
      });
      return;
    }

    if (!normalizedFullName) {
      notifications.show({
        title: "Введите ФИО",
        message: "Укажите ФИО владельца диплома",
        color: "orange",
      });
      return;
    }

    const registrationNumber = formattedNumber.replace(/\s/g, "");

    try {
      const diploma = await triggerSearch({
        number: registrationNumber,
        fullName: normalizedFullName,
      }).unwrap();
      onResult(diploma);
      notifications.show({
        title: "Диплом найден",
        message: `Номер ${diploma.registrationNumber}`,
        color: "green",
      });
    } catch (e: any) {
      onResult(null);
      notifications.show({
        title: "Диплом не найден",
        message:
          e.message === "Too many attempts. Try later"
            ? "Слишком много попыток. Попробуйте позже."
            : "Проверьте номер, ФИО и попробуйте снова",
        color: "red",
      });
    }
  };

  return (
    <Stack w={"100%"}>
      <Paper
        p={{ base: 18, sm: 24, md: 32 }}
        radius="lg"
        shadow="sm"
        withBorder
      >
        <Stack gap={24}>
          <Stack align="center" gap={8} mb={20}>
            <Title ta="center" order={2} size="h2" fw={700}>
              Проверка диплома
            </Title>
            <Text ta={"center"} size="sm" c="dimmed" px={{ base: 0, sm: 20 }}>
              Проверка подлинности документов об образовании по единой базе
              выпускников.
            </Text>
          </Stack>

          <Stack gap={8}>
            <TextInput
              label="Номер диплома"
              placeholder="123456 7890123"
              value={numberValue}
              onChange={(e) =>
                setNumberValue(formatDiplomaNumber(e.currentTarget.value))
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  void handleSearch();
                }
              }}
              maxLength={14}
              leftSection={<IconSearch size={18} />}
              size="md"
              radius="md"
            />

            <TextInput
              label="ФИО владельца"
              mt={8}
              placeholder="Иванов Иван Иванович"
              value={fullName}
              onChange={(e) => setFullName(e.currentTarget.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  void handleSearch();
                }
              }}
              leftSection={<IconUser size={18} />}
              size="md"
              radius="md"
            />
            <Group justify="flex-start" gap={4}>
              <IconAlertCircle size={14} color="var(--mantine-color-dimmed)" />
              <Text size="xs" c="dimmed">
                Проверка происходит мгновенно
              </Text>
            </Group>
          </Stack>

          <Button
            fullWidth
            size="lg"
            color="primary"
            rightSection={<IconArrowRight size={18} />}
            radius="md"
            mt={rem(8)}
            fw={600}
            loading={isFetching}
            onClick={handleSearch}
          >
            Проверить
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
}
