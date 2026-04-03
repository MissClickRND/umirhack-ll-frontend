import { Group, ThemeIcon, rem, Text} from "@mantine/core";
import { IconUniverse } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";


export default function Logo() {
    const navigate = useNavigate();
    
    return (
        <Group gap="xs" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
            <ThemeIcon
              size="xl"
              radius="md"
              color="brand"
              variant="filled"
            >
              <IconUniverse style={{ width: rem(22), height: rem(22) }} />
            </ThemeIcon>
            <Text
              fw={700}
              size="lg"
            >
              Portal for HR
            </Text>
          </Group>
    )
}
