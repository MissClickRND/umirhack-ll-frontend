import { Button, Stack, Modal, TextInput } from "@mantine/core";
import { IconSearch, IconPlus } from "@tabler/icons-react";
import { useState } from "react";



export default function SearchModal({ opened, close }: { opened: boolean; close: () => void }) {
    const [value, setValue] = useState("");

    return (
        <Modal radius={'md'} opened={opened} onClose={close} centered> 
                <Stack gap="lg" style={{ width: "100%", alignItems: "stretch" }}>
                    <TextInput
                        data-autofocus
                        placeholder="Введите номер диплома"
                        value={value}
                        onChange={(e) => setValue(e.currentTarget.value)}
                        leftSection={<IconSearch/>}
                        size="md"
                        radius={'md'}
                    />

                    <Button
                        variant="filled"
                        color="brand"
                        leftSection={<IconPlus/>}
                        size="sm"
                    >
                        Добавить
                    </Button>
                </Stack>
        </Modal>
    )
}