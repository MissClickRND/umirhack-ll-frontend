import {
  Stack,
  useMantineTheme,
  Box,
  useMantineColorScheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import { useAppSelector } from "@/shared/lib";
import { selectUser } from "@/entities/user/model/userSelectors";
import { IDiploma } from "@/entities/diploma";
import SearchDiploma from "./components/SearchDiploma";
import Result from "./components/Result";
import Notification from "./components/Notification";

export default function Main() {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";
  const isMobile = useMediaQuery("(max-width: 48em)");
  const user = useAppSelector(selectUser);
  const [searchResult, setSearchResult] = useState<IDiploma | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleResult = (diploma: IDiploma | null) => {
    setHasSearched(true);
    setSearchResult(diploma);
  };

  return (
    <Box
      bg={isDark ? theme.other.backgroundDark : theme.other.background}
      h="100%"
      px={{ base: "md", sm: "xl" }}
      py="xl"
      style={{
        overflowX: "hidden",
        overflowY: isMobile ? "auto" : "hidden",
        boxSizing: "border-box",
        display: "flex",
        alignItems: isMobile ? "stretch" : "center",
        justifyContent: isMobile ? "flex-start" : "center",
      }}
    >
      <Stack align="stretch" maw={650} w="100%" mx="auto">
        {user?.role === "NEED_VERIFICATION" && <Notification />}
        <SearchDiploma onResult={handleResult} />
        {hasSearched && (
          <Result
            status={searchResult?.status}
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
    </Box>
  );
}
