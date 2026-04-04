import {
  Burger,
  Collapse,
  Divider,
  Container,
  Box,
  Group,
  Stack,
  Text,
  UnstyledButton,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import ProfileButton from "./components/ProfileButton";
import NavList from "./components/NavList";
import Logo from "./components/Logo";
import { useLocation, useNavigate } from "react-router-dom";

const links = [
  { label: "Проверка", path: "/" },
  { label: "Интеграция API", path: "/api" },
];

export default function Header() {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";
  const [opened, { close, toggle }] = useDisclosure(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string) => {
    navigate(path);
    close();
  };

  return (
    <>
      <Box
        component="header"
        py="sm"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 200,
          backgroundColor: isDark
            ? theme.other.surfaceDark
            : theme.other.surface,
          borderBottom: `1px solid ${isDark ? theme.other.outlineDark : theme.other.outline}`,
        }}
      >
        <Container size="xl">
          <Group justify="space-between" align="center" wrap="nowrap">
            <Logo />
            <NavList />
            <Group gap="xs" wrap="nowrap">
              <Box visibleFrom="sm">
                <ProfileButton />
              </Box>
              <Burger
                hiddenFrom="sm"
                opened={opened}
                onClick={toggle}
                aria-label="Открыть меню"
              />
            </Group>
          </Group>

          <Collapse in={opened} hiddenFrom="sm">
            <Stack gap="xs" pt="sm" pb="xs">
              {links.map((link) => {
                const isActive = location.pathname === link.path;

                return (
                  <UnstyledButton
                    key={link.path}
                    onClick={() => handleNavigate(link.path)}
                    style={{
                      borderRadius: 8,
                      padding: "10px 12px",
                      backgroundColor: isActive
                        ? isDark
                          ? "var(--mantine-color-primaryDark-8)"
                          : "var(--mantine-color-primary-0)"
                        : "transparent",
                    }}
                  >
                    <Text
                      fw={isActive ? 600 : 500}
                      c={
                        isActive
                          ? isDark
                            ? "primaryDark.2"
                            : "primary.7"
                          : isDark
                            ? theme.other.textPrimaryDark
                            : theme.other.textPrimary
                      }
                    >
                      {link.label}
                    </Text>
                  </UnstyledButton>
                );
              })}

              <Divider my="sm" />
              <ProfileButton />
            </Stack>
          </Collapse>
        </Container>
      </Box>
    </>
  );
}
