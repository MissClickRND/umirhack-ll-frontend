import {
  Box,
  Stack,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import DiplomasList from "./components/DiplomasList";
import ActiveLinks from "./components/ActiveLinks";

export default function Student() {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Box
      bg={isDark ? theme.other.backgroundDark : theme.other.background}
      h="100%"
      px={{ base: "md", sm: "xl" }}
      py="xl"
      style={{ overflowY: "auto" }}
    >
      <Stack align="stretch" w="100%" maw={1200} mx="auto">
        <DiplomasList />
        <ActiveLinks />
      </Stack>
    </Box>
  );
}
