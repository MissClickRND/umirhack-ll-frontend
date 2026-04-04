
import { Box, Stack, useMantineTheme } from "@mantine/core";
import UsersManagementBlock from "./components/UsersManagementBlock";
import VerificationRequestsBlock from "./components/VerificationRequestsBlock";

export default function Admin() {
    const theme = useMantineTheme();

    return (
        <Box bg={theme.other.background} h="100%" px={{ base: "md", sm: "xl" }} py="xl" style={{ overflowY: "auto" }}>
            <Stack w="100%" maw={1200} mx="auto" gap="lg">
                <VerificationRequestsBlock />
                <UsersManagementBlock />
            </Stack>
        </Box>
    );
}