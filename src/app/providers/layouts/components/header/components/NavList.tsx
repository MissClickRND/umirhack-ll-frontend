import { selectUser } from "@/entities/user/model/userSelectors";
import { useAppSelector } from "@/shared/lib";
import {
  Group,
  UnstyledButton,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
import { canAccessLink, links } from "../../../model/helper";

export default function NavList() {
  const user = useAppSelector(selectUser);
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Group gap={32} visibleFrom="sm" style={{ height: "100%" }}>
      {links
        .filter((link) => canAccessLink(link, user?.role))
        .map((link) => {
          const isActive = link.path === location.pathname;
          return (
            <UnstyledButton key={link.path} onClick={() => navigate(link.path)}>
              <Text
                size="sm"
                fw={isActive ? 700 : 400}
                style={{
                  color: isActive
                    ? isDark
                      ? theme.other.textPrimaryDark
                      : theme.other.textPrimary
                    : isDark
                      ? theme.other.textSecondaryDark
                      : theme.other.textSecondary,
                  transition: "color 0.2s",
                }}
              >
                {link.label}
              </Text>
            </UnstyledButton>
          );
        })}
    </Group>
  );
}
