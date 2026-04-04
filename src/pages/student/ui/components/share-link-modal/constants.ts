import { QrTokenType } from "@/entities/diploma";

export const PLACEHOLDER_LINK = "Здесь будет ваша ссылка";

export const durationOptions = [
    { value: "one-time", label: "Единоразовый" },
    { value: "7-days", label: "7 дней" },
    { value: "30-days", label: "30 дней" },
    { value: "unlimited", label: "Неограничено" },
] as const;

export type DurationType = (typeof durationOptions)[number]["value"];

export const durationTypeMap: Record<DurationType, QrTokenType> = {
    "one-time": "ONETIME",
    "7-days": "DAYS_7",
    "30-days": "DAYS_30",
    "unlimited": "INFINITE",
};
