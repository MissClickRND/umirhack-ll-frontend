import {
  Container,
  Grid,
  rem,
  useMantineTheme,
} from "@mantine/core";
import Description from "./components/Description";
import Choose from "./components/Choose";
import { Outlet } from "react-router-dom";


export default function AuthPage() {
    const theme = useMantineTheme();

    return (
        <Container
            bg={theme.other.background}
            fluid
            px={80}
            py={40}
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Grid gutter={60} align="center" justify="center" style={{ width: "100%", maxWidth: rem(1280) }}>
                <Description />
                <Outlet />
            </Grid>
        </Container>
    );
    }

