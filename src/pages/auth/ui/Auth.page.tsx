import {
  Container,
  Grid,
  rem,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Description from "./components/Description";
import { Outlet } from "react-router-dom";

export default function AuthPage() {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";
  const isTablet = useMediaQuery("(max-width: 64em)");
  const isShortViewport = useMediaQuery("(max-height: 52em)");
  const shouldTopAlign = isTablet || isShortViewport;

  return (
    <Container
      bg={isDark ? theme.other.backgroundDark : theme.other.background}
      fluid
      px={{ base: 16, sm: 24, md: 48, lg: 80 }}
      py={{ base: 24, sm: 28, md: 40 }}
      style={{
        minHeight: "100vh",
        boxSizing: "border-box",
        overflowY: "auto",
        overflowX: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: shouldTopAlign ? "flex-start" : "center",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <Grid
        gutter={{ base: 24, md: 60 }}
        align="center"
        justify="center"
        style={{ width: "100%", maxWidth: rem(1280) }}
      >
        <Description />
        <Outlet />
      </Grid>
    </Container>
  );
}
