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
          backgroundColor: "var(--mantine-color-body)",
          borderBottom: "1px solid var(--mantine-color-gray-2)",
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
              <Burger hiddenFrom="sm" opened={opened} onClick={toggle} aria-label="Открыть меню" />
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
                      backgroundColor: isActive ? "var(--mantine-color-brand-0)" : "transparent",
                    }}
                  >
                    <Text fw={isActive ? 600 : 500} c={isActive ? "brand.7" : "text-primary"}>
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