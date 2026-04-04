import { selectUser } from "@/entities/user/model/userSelectors";
import { useAppSelector } from "@/shared/lib";
import {
  Group,
  UnstyledButton,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";

export default function NavList() {
  const user = useAppSelector(selectUser);
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";
  const location = useLocation();
  const navigate = useNavigate();
  const links = [
    { label: "Главная", path: "/" },
    { label: "Интеграция API", path: "/api" },
    { label: "Личный кабинет", path: "/student", role: "STUDENT" },
    { label: "Панель администратора", path: "/admin", role: "ADMIN" },
    { label: "Панель управления", path: "/edu-panel", role: "UNIVERSITY" },
  ];

  return (
    <Group gap={32} visibleFrom="sm" style={{ height: "100%" }}>
      {links
        .filter((link) => !link.role || link.role === user?.role)
        .map((link) => {
          const isActive = link.path === location.pathname;
          return (
            <UnstyledButton key={link.path} onClick={() => navigate(link.path)}>
              <Text
                size="sm"
                fw={isActive ? 700 : 400}
                style={{
                  color: isActive
                    ? isDark
                      ? theme.other.textPrimaryDark
                      : theme.other.textPrimary
                    : isDark
                      ? theme.other.textSecondaryDark
                      : theme.other.textSecondary,
                  transition: "color 0.2s",
                }}
              >
                {link.label}
              </Text>
            </UnstyledButton>
          );
        })}
    </Group>
  );
}
