import { Box, Group, Text, ThemeIcon } from "@mantine/core";

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

export default function FeatureItem({ icon, title, description, color }: FeatureItemProps) {
    

    return (
        <Group gap={16}>
            <ThemeIcon
                size={48}
                radius="md"
                variant="light"
                color={color}
                style={{ flexShrink: 0 }}
            >
                {icon}
            </ThemeIcon>
            <Box>
                <Text fw={600} size="md" mb={4}>
                    {title}
                </Text>
                <Text size="sm" c="dimmed" lh={1.4}>
                    {description}
                </Text>
            </Box>
        </Group>
    );
}



