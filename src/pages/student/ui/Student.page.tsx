import { Box, Stack, useMantineTheme } from "@mantine/core";
import DiplomasList from "./components/DiplomasList";
import ActiveLinks from "./components/ActiveLinks";


export default function Student() {
    const theme = useMantineTheme();

    return (
      <Box bg={theme.other.background} h="100%" px={{ base: "md", sm: "xl" }} py="xl" style={{ overflowY: "auto" }}>
        <Stack align="stretch" w="100%" maw={1200} mx="auto">
            <DiplomasList />
            <ActiveLinks />
        </Stack>
      </Box>
    );
}