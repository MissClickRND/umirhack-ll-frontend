import { Center, Stack, useMantineTheme } from "@mantine/core";
import DiplomasList from "./components/DiplomasList";


export default function Student() {
    const theme = useMantineTheme()

    return (
      <Center bg={theme.other.background} h="100%" p={'xl'}>
        <Stack align="center" >
            <DiplomasList/>
        </Stack>
      </Center>
    );
}