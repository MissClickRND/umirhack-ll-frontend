import { Group, Image, Text } from "@mantine/core";

import { useNavigate } from "react-router-dom";

export default function Logo() {
  const navigate = useNavigate();

  return (
    <Group gap="xs" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
      <Image w={40} h={40} src="/icons/logo.svg" alt="TrustEDU" />
      <Text fw={700} size="xl">
        TrustEDU
      </Text>
    </Group>
  );
}
