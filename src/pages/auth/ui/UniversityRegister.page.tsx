import { useUniversityRegisterMutation } from "@/entities/auth";
import { selectUser } from "@/entities/user/model/userSelectors";
import { setUser } from "@/entities/user/model/userSlice";
import { useAppDispatch, useAppSelector, useNotifications } from "@/shared/lib";
import {
  Button,
  Center,
  Anchor,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  LoadingOverlay,
  Paper,
  Grid,
  Title,
  ThemeIcon,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconClockHour4 } from "@tabler/icons-react";

import { useNavigate } from "react-router-dom";

interface RegisterFormValues {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  short_name: string;
}

export default function UniversityRegister() {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";
  const [register, { isLoading }] = useUniversityRegisterMutation();
  const dispatch = useAppDispatch();
  const { showError, showSuccess } = useNotifications();

  const form = useForm<RegisterFormValues>({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      short_name: "",
    },
    validate: {
      name: (v) =>
        v.trim().length >= 2
          ? null
          : "Название вуза должно содержать минимум 2 символа",
      short_name: (v) =>
        v.trim().length >= 2
          ? null
          : "Краткое название вуза должно содержать минимум 2 символа",
      email: (v) =>
        /^\S+@\S+\.\S+$/.test(v) ? null : "Введите корректный email",
      password: (v) =>
        v.length >= 4 ? null : "Пароль должен содержать минимум 4 символа",
      confirmPassword: (v, values) =>
        v === values.password ? null : "Пароли не совпадают",
    },
  });

  const handleSubmit = async () => {
    try {
      const data = await register({
        accountType: "university",
        email: form.values.email,
        password: form.values.password,
        name: form.values.name.trim(),
        short_name: form.values.short_name.trim(),
      }).unwrap();
      dispatch(setUser(data.user));
      showSuccess("Заявка на регистрацию отправлена");

      form.reset();
    } catch (error: any) {
      showError(error.data.message);
    }
  };

  return (
    <Grid.Col span={{ base: 12, md: 6 }}>
      <Paper
        p={{ base: 20, sm: 28, md: 40 }}
        radius="lg"
        shadow="xl"
        withBorder
      >
        <LoadingOverlay visible={isLoading} />
        <Stack gap="xl">
          <Center>
            <Title order={2}>Зарегистрироваться</Title>
          </Center>

          {user.role !== "NEED_VERIFICATION" && (
            <>
              {" "}
              <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack gap="md">
                  <TextInput
                    size="md"
                    label="Название вуза"
                    placeholder="Южный федеральный университет"
                    radius={"sm"}
                    styles={{ label: { marginBottom: 6 } }}
                    {...form.getInputProps("name")}
                  />

                  <TextInput
                    size="md"
                    label="Краткое название вуза"
                    placeholder="ДГТУ"
                    radius={"sm"}
                    styles={{ label: { marginBottom: 6 } }}
                    {...form.getInputProps("short_name")}
                  />

                  <TextInput
                    size="md"
                    label="Email"
                    placeholder="user@example.com"
                    radius={"sm"}
                    styles={{ label: { marginBottom: 6 } }}
                    {...form.getInputProps("email")}
                  />

                  <Paper
                    p="sm"
                    radius="md"
                    withBorder
                    style={{
                      backgroundColor: isDark
                        ? theme.other.surfaceSecondaryDark
                        : "var(--mantine-color-blue-0)",
                      borderColor: isDark
                        ? theme.other.outlineDark
                        : "var(--mantine-color-blue-2)",
                    }}
                  >
                    <Text fz="sm" c={isDark ? "blue.2" : "blue.9"}>
                      После регистрации мы свяжемся с вами по электронной почте
                      в течение 1-2 рабочих дней для подтверждения данных вуза.
                    </Text>
                  </Paper>

                  <PasswordInput
                    size="md"
                    label="Пароль"
                    placeholder="Минимум 4 символа"
                    radius={"sm"}
                    styles={{ label: { marginBottom: 6 } }}
                    {...form.getInputProps("password")}
                  />

                  <PasswordInput
                    size="md"
                    label="Подтверждение пароля"
                    placeholder="Повторите пароль"
                    radius={"sm"}
                    styles={{ label: { marginBottom: 6 } }}
                    {...form.getInputProps("confirmPassword")}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    radius={"md"}
                    mt="sm"
                    size="md"
                  >
                    Создать аккаунт
                  </Button>
                </Stack>
              </form>
              <Text
                fz="sm"
                c={
                  isDark
                    ? theme.other.textSecondaryDark
                    : theme.other.textSecondary
                }
                ta="center"
              >
                Уже есть аккаунт?{" "}
                <Anchor
                  c={isDark ? "primaryDark.4" : "primary.6"}
                  fw={500}
                  onClick={() => navigate("/auth/login")}
                  style={{ cursor: "pointer" }}
                >
                  Войти
                </Anchor>
              </Text>
            </>
          )}

          {user.role === "NEED_VERIFICATION" && (
            <Paper
              withBorder
              radius="md"
              p="xl"
              style={{
                backgroundColor: isDark
                  ? theme.other.surfaceSecondaryDark
                  : "var(--mantine-color-primary-0)",
                borderColor: isDark
                  ? theme.other.outlineDark
                  : theme.other.outline,
              }}
            >
              <Stack gap="md" align="center">
                <ThemeIcon
                  size={56}
                  radius="xl"
                  color={isDark ? "primaryDark" : "primary"}
                >
                  <IconClockHour4 size={30} />
                </ThemeIcon>

                <Text fw={700} ta="center">
                  Ваша заявка на регистрацию отправлена
                </Text>

                <Text fz="sm" c="dimmed" ta="center">
                  Ожидайте подтверждения. С вами свяжется администратор после
                  проверки данных университета.
                </Text>

                <Button
                  color={isDark ? "primaryDark" : "primary"}
                  onClick={() => navigate("/")}
                >
                  На главную
                </Button>
              </Stack>
            </Paper>
          )}
        </Stack>
      </Paper>
    </Grid.Col>
  );
}
