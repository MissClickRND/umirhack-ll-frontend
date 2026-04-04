import { Button, Stack, Modal, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconSearch, IconPlus, IconUser } from "@tabler/icons-react";
import { useState } from "react";
import {
  useAttachMyDiplomaMutation,
  useLazyGetDiplomaByIdQuery,
} from "@/entities/diploma";

interface SearchModalProps {
  opened: boolean;
  close: () => void;
  onAttached?: () => void;
}

export default function SearchModal({
  opened,
  close,
  onAttached,
}: SearchModalProps) {
  const [value, setValue] = useState("");
  const [fullName, setFullName] = useState("");
  const [searchDiploma, { isFetching: isSearching }] =
    useLazyGetDiplomaByIdQuery();
  const [attachMyDiploma, { isLoading: isAttaching }] =
    useAttachMyDiplomaMutation();

  const formatDiplomaNumber = (input: string) => {
    const digits = input.replace(/\D/g, "").slice(0, 13);

    if (digits.length <= 6) {
      return digits;
    }

    return `${digits.slice(0, 6)} ${digits.slice(6)}`;
  };

  const handleAttachDiploma = async () => {
    const formattedNumber = value.trim();
    const normalizedFullName = fullName.trim();

    if (!formattedNumber) {
      notifications.show({
        title: "Введите номер",
        message: "Укажите номер диплома для привязки",
        color: "orange",
      });
      return;
    }

    if (!/^\d{6}\s\d{7}$/.test(formattedNumber)) {
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

    try {
      const number = formattedNumber.replace(/\s/g, "");
      const diploma = await searchDiploma({
        number,
        fullName: normalizedFullName,
      }).unwrap();
      const diplomaId = Number(diploma?.id);

      if (!Number.isFinite(diplomaId)) {
        notifications.show({
          title: "Ошибка данных",
          message: "Сервер вернул диплом без id. Попробуйте позже",
          color: "red",
        });
        return;
      }

      await attachMyDiploma({ id: diplomaId }).unwrap();
      onAttached?.();

      notifications.show({
        title: "Диплом привязан",
        message: `Номер ${diploma.registrationNumber}`,
        color: "green",
      });

      setValue("");
      setFullName("");
      close();
    } catch {
      notifications.show({
        title: "Ошибка",
        message:
          "Не удалось привязать диплом. Проверьте номер, ФИО и попробуйте снова",
        color: "red",
      });
    }
  };

  return (
    <Modal radius={"md"} opened={opened} onClose={close} centered>
      <Stack gap="lg" style={{ width: "100%", alignItems: "stretch" }}>
        <TextInput
          data-autofocus
          placeholder="123456 7890123"
          value={value}
          onChange={(e) => setValue(formatDiplomaNumber(e.currentTarget.value))}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              void handleAttachDiploma();
            }
          }}
          maxLength={14}
          leftSection={<IconSearch />}
          size="md"
          radius={"md"}
        />

        <TextInput
          placeholder="Иванов Иван Иванович"
          value={fullName}
          onChange={(e) => setFullName(e.currentTarget.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              void handleAttachDiploma();
            }
          }}
          leftSection={<IconUser />}
          size="md"
          radius={"md"}
        />

        <Button
          variant="filled"
          color="brand"
          leftSection={<IconPlus />}
          size="sm"
          loading={isSearching || isAttaching}
          onClick={handleAttachDiploma}
        >
          Добавить
        </Button>
      </Stack>
    </Modal>
  );
}
