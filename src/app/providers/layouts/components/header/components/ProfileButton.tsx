import { useLogoutMutation } from "@/entities/auth";
import { userLogout } from "@/entities/user";
import { selectUser } from "@/entities/user/model/userSelectors";
import { useAppDispatch, useAppSelector } from "@/shared/lib/store";
import {
  Box,
  Menu,
  UnstyledButton,
  Group,
  Avatar,
  Button,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { IconUser, IconMoon, IconSun, IconLogout } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export default function ProfileButton() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const user = useAppSelector(selectUser);
  const theme = useMantineTheme();
  const { setColorScheme, colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Box>
      {user?.email ? (
        // авторизованный пользователь
        <Menu shadow="md" position="bottom-end">
          <Menu.Target>
            <UnstyledButton>
              <Group gap="xs">
                <Avatar radius="xl" size="sm" color="brand">
                  <IconUser size={16} />
                </Avatar>
                <Text
                  size="sm"
                  fw={500}
                  c={
                    isDark
                      ? theme.other.textPrimaryDark
                      : theme.other.textPrimary
                  }
                  visibleFrom="sm"
                >
                  {user?.email}
                </Text>
              </Group>
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            {/* <Menu.Item
              leftSection={<IconUser size={18} />}
              onClick={() => navigate("/profile")}
            >
              Профиль
            </Menu.Item> */}
            <Menu.Item
              leftSection={
                colorScheme === "light" ? (
                  <IconMoon size={18} />
                ) : (
                  <IconSun size={18} />
                )
              }
              onClick={() =>
                setColorScheme(colorScheme === "light" ? "dark" : "light")
              }
            >
              {colorScheme === "light" ? "Темная тема" : "Светлая тема"}
            </Menu.Item>
            <Menu.Item
              leftSection={<IconLogout size={18} />}
              onClick={() => dispatch(userLogout(), logout())}
              color="red"
            >
              Выйти
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      ) : (
        // ...неавторизованный пользователь
        <Button
          variant="filled"
          color={isDark ? "primaryDark" : "primary"}
          leftSection={<IconUser size={18} />}
          onClick={() => navigate("/auth/login")}
          radius={"md"}
        >
          Войти
        </Button>
      )}
    </Box>
  );
}
