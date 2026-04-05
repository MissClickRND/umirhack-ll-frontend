import { Button, Group, Paper, Stack, Text } from "@mantine/core";

type LoginCredentials = {
  email: string;
  password: string;
};

type RolePreset = {
  label: string;
  credentials: LoginCredentials;
};

type TestLoginRolePickerProps = {
  onPick: (credentials: LoginCredentials) => void;
};

const ROLE_PRESETS: RolePreset[] = [
  {
    label: "Админ",
    credentials: {
      email: "admin@example.com",
      password: "SuperPassword123",
    },
  },
  {
    label: "Пользователь",
    credentials: {
      email: "user@example.com",
      password: "SuperPassword123",
    },
  },
  {
    label: "Вуз",
    credentials: {
      email: "dstu@example.com",
      password: "SuperPassword123",
    },
  },
];

export default function TestLoginRolePicker({ onPick }: TestLoginRolePickerProps) {
  return (
    <Paper p="xs" radius="md" withBorder>
      <Stack gap={8}>
        <Text size="xs" c="dimmed">
          Быстрый вход для тестирования
        </Text>
        <Group gap="xs">
          {ROLE_PRESETS.map((preset) => (
            <Button
              key={preset.label}
              size="xs"
              variant="light"
              onClick={() => onPick(preset.credentials)}
            >
              {preset.label}
            </Button>
          ))}
        </Group>
      </Stack>
    </Paper>
  );
}
