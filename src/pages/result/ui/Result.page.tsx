import { useGetDiplomaByQrTokenQuery } from "@/entities/diploma";
import Result from "@/pages/main/ui/components/Result";
import {
    Alert,
    Box,
    Center,
    Loader,
    Stack,
    Text,
    useMantineColorScheme,
    useMantineTheme,
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { useParams } from "react-router-dom";

export default function ResultPage() {
    const theme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();
    const isDark = colorScheme === "dark";

    const { token } = useParams();
    const {
        data,
        isLoading,
        isFetching,
        error,
    } = useGetDiplomaByQrTokenQuery(token ? token : "", {
        skip: !token,
    });

    let content: React.ReactNode;

    if (!token) {
        content = (
            <Alert color="red" title="Некорректная ссылка" icon={<IconAlertCircle size={16} />}>
                В ссылке отсутствует токен проверки диплома.
            </Alert>
        );
    } else if (isLoading || isFetching) {
        content = (
            <Center py="xl">
                <Stack align="center" gap="xs">
                    <Loader />
                    <Text c="dimmed" size="sm">
                        Загружаем данные диплома...
                    </Text>
                </Stack>
            </Center>
        );
    } else if (error || !data) {
        content = (
            <Alert color="red" title="Ошибка загрузки" icon={<IconAlertCircle size={16} />}>
                Не удалось получить данные по этому QR-токену. Проверьте ссылку и попробуйте снова.
            </Alert>
        );
    } else {
        content = (
            <Result
                studentName={data.fullNameAuthor}
                specialty={data.specialty}
                institution={data.university.name}
                graduationYear={data.issuedAt.split("-")[0]}
                degree={data.degreeLevel}
                status={data.status}
            />
        );
    }

    return (
        <Box
            bg={isDark ? theme.other.backgroundDark : theme.other.background}
            mih="100%"
            px={{ base: "md", sm: "xl" }}
            py="xl"
            style={{ overflowY: "auto", boxSizing: "border-box" }}
        >
            <Center h="100%">
                <Box w="100%" maw={720}>
                    {content}
                </Box>
            </Center>
        </Box>
    );
}