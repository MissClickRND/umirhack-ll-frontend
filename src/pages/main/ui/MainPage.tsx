import { Stack, useMantineTheme, Center } from "@mantine/core";
import SearchDiploma from "./components/SearchDiploma";
import Result from "./components/Result";
import { useAppSelector } from "@/shared/lib";

export default function Main() {
    const theme = useMantineTheme();
    const state = useAppSelector((state) => state.check);
  
    return (
      <Center bg={theme.other.background} h="100%" p={'xl'}>
        <Stack align="center" maw={650}>
          <SearchDiploma/>
          {state.isChecked && <Result/>}
        </Stack>
      </Center>
    );
}
