import {
  Stack,
  useMantineTheme,
  Center,
  useMantineColorScheme,
} from "@mantine/core";
import SearchDiploma from "./components/SearchDiploma";
import Result from "./components/Result";
import { useAppSelector } from "@/shared/lib";
import { selectUser } from "@/entities/user/model/userSelectors";
import Notification from "./components/Notification";

export default function Main() {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";
  const state = useAppSelector((state) => state.check);
  const user = useAppSelector(selectUser);

  return (
    <Center
      bg={isDark ? theme.other.backgroundDark : theme.other.background}
      h="100%"
      p={{ base: "md", sm: "xl" }}
    >
      <Stack align="center" maw={650} w="100%">
        {user?.role === "NEED_VERIFICATION" && <Notification />}
        <SearchDiploma />
        {state.isChecked && <Result />}
      </Stack>
    </Center>
  );
}
