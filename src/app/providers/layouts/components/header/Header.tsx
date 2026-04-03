import {
  Group,
  Container,
  Box,
} from "@mantine/core";
import ProfileButton from "./components/ProfileButton";
import NavList from "./components/NavList";
import Logo from "./components/Logo";

export default function Header() {

 

  return (
    <Box
      component="header"
      py="sm"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        borderBottom: `1px solid var(--mantine-color-outline)`,
      }}
    >
      <Container size="xl">
        <Group justify="space-between" align="center">
          <Logo/>
          <NavList/>
          <ProfileButton/>
        </Group>
      </Container>
    </Box>
  );
}