import { useStudentRegisterMutation } from "@/entities/auth";
import { setUser } from "@/entities/user/model/userSlice";
import { useAppDispatch, useNotifications } from "@/shared/lib";
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
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";

import { useNavigate } from "react-router-dom";

interface RegisterFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function StudentRegister() {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";
  const isCompactLaptop = useMediaQuery("(max-width: 90em)");
  const [register, { isLoading }] = useStudentRegisterMutation();
  const dispatch = useAppDispatch();
  const { showError, showSuccess } = useNotifications();
  const inputSize = isCompactLaptop ? "sm" : "md";
  const actionsSize = isCompactLaptop ? "sm" : "md";
  const contentGap = isCompactLaptop ? "md" : "xl";

  const form = useForm<RegisterFormValues>({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
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
        accountType: "student",
        email: form.values.email,
        password: form.values.password,
      }).unwrap();
      dispatch(setUser(data.user));
      showSuccess("Вы зарегистрировались в аккаунт");
      navigate("/");
      form.reset();
    } catch (error: any) {
      showError(error.data.message);
    }
  };

  return (
    <Grid.Col span={{ base: 12, md: 6 }}>
      <Paper
        p={{ base: 16, sm: 22, md: 26, lg: 32 }}
        radius="lg"
        shadow="xl"
        withBorder
      >
        <LoadingOverlay visible={isLoading} />
        <Stack gap={contentGap}>
          <Center>
            <Title order={2}>Зарегистрироваться</Title>
          </Center>

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md">
              <TextInput
                size={inputSize}
                label="Email"
                placeholder="user@example.com"
                radius={"sm"}
                styles={{ label: { marginBottom: 6 } }}
                {...form.getInputProps("email")}
              />

              <PasswordInput
                size={inputSize}
                label="Пароль"
                placeholder="Минимум 4 символа"
                radius={"sm"}
                styles={{ label: { marginBottom: 6 } }}
                {...form.getInputProps("password")}
              />

              <PasswordInput
                size={inputSize}
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
                size={actionsSize}
              >
                Создать аккаунт
              </Button>
            </Stack>
          </form>

          <Text
            fz="sm"
            c={
              isDark ? theme.other.textSecondaryDark : theme.other.textSecondary
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
        </Stack>
      </Paper>
    </Grid.Col>
  );
}
