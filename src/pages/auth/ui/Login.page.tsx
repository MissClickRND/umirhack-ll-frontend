import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { setUser } from "@/entities/user";
import { ILoginRequest } from "@/entities/auth/model/type";
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
import { useLoginMutation } from "@/entities/auth";

export default function Login() {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const { showError, showSuccess } = useNotifications();

  const form = useForm<ILoginRequest>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (v) =>
        /^\S+@\S+\.\S+$/.test(v) ? null : "Введите корректный email",
      password: (v) =>
        v.length >= 4 ? null : "Пароль должен содержать минимум 4 символа",
    },
  });

  const handleSubmit = async () => {
    try {
      const data = await login(form.values).unwrap();
      dispatch(setUser(data.user));
      showSuccess("Вы вошли в аккаунт");
      navigate("/");
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
            <Title order={2}>Вход в систему</Title>
          </Center>

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md">
              <TextInput
                size="md"
                label="Email"
                placeholder="user@example.com"
                styles={{ label: { marginBottom: 6 } }}
                radius={"sm"}
                {...form.getInputProps("email")}
              />

              <PasswordInput
                size="md"
                label="Пароль"
                placeholder="Минимум 4 символа"
                radius={"sm"}
                styles={{ label: { marginBottom: 6 } }}
                {...form.getInputProps("password")}
              />

              <Button type="submit" fullWidth radius={"md"} mt="sm" size="md">
                Войти
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
            Нет аккаунта?{" "}
            <Anchor
              c={isDark ? "primaryDark.4" : "primary.6"}
              fw={500}
              onClick={() => navigate("/auth/register")}
              style={{ cursor: "pointer" }}
            >
              Зарегистрироваться
            </Anchor>
          </Text>
        </Stack>
      </Paper>
    </Grid.Col>
  );
}
