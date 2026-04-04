import {
  Stack,
  useMantineTheme,
  Center,
  useMantineColorScheme,
} from "@mantine/core";
import { useState } from "react";
import { useAppSelector } from "@/shared/lib";
import { selectUser } from "@/entities/user/model/userSelectors";
import { IDiploma } from "@/entities/diplomas/model/type";
import SearchDiploma from "./components/SearchDiploma";
import Result from "./components/Result";
import Notification from "./components/Notification";

export default function Main() {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";
  const user = useAppSelector(selectUser);
  const [searchResult, setSearchResult] = useState<IDiploma | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleResult = (diploma: IDiploma | null) => {
    setHasSearched(true);
    setSearchResult(diploma);
  };

  return (
    <Center
      bg={isDark ? theme.other.backgroundDark : theme.other.background}
      h="100%"
      p={{ base: "md", sm: "xl" }}
    >
      <Stack align="center" maw={650} w="100%">
        {user?.role === "NEED_VERIFICATION" && <Notification />}
        <SearchDiploma onResult={handleResult} />
        {hasSearched && (
          <Result
            status={Boolean(searchResult)}
            studentName={searchResult?.fullNameAuthor ?? ""}
            specialty={searchResult?.specialty ?? ""}
            institution={searchResult?.university?.name ?? ""}
            graduationYear={
              searchResult?.issuedAt
                ? String(new Date(searchResult.issuedAt).getFullYear())
                : ""
            }
            degree={searchResult?.degreeLevel ?? ""}
          />
        )}
      </Stack>
    </Center>
  );
}
