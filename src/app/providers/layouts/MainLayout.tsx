import { Box } from "@mantine/core";
import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";

export default function MainLayout() {
  return (
    <Box style={{ minheight: "100dvh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Box
        component="main"
        style={{
          flex: "1 1 auto",
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
