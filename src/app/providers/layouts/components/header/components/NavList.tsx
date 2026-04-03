import { Group, UnstyledButton, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";


export default function NavList() {
    const navigate = useNavigate();
    const links = [
        { label: "Проверка", path: "/verification" },
        { label: "История", path: "/history" },
        { label: "Интеграция API", path: "/api" },
        { label: "Помощь", path: "/help" },
  ];

    return (
        <Group gap={32} visibleFrom="sm" style={{ height: "100%" }}>
            {links.map((link) => {
              const isActive = link.path === window.location.pathname;
              return (
                <UnstyledButton
                  key={link.path}
                  onClick={() => navigate(link.path)}
                >
                  <Text
                    size="sm"
                    fw={isActive ? 600 : 400}
                    style={{
                      color: isActive
                        ? "var(--mantine-color-text-primary)"
                        : "var(--mantine-color-text-secondary)",
                      transition: "color 0.2s",
                    }}
                  >
                    {link.label}
                  </Text>
                </UnstyledButton>
              );
            })}
          </Group>       
    )
}
